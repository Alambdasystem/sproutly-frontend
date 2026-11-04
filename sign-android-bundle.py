"""Validate a CI AAB and sign locally; credentials never enter CI or command text."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import struct
import subprocess
import xml.etree.ElementTree as ET
import zipfile

CERT = '9fc8d7beb48216a0810a84d46076b856f2930c77f03152d0786a13dca4dcf0fb'
NS = '{http://schemas.android.com/apk/res/android}'


def run(args, env=None):
    result = subprocess.run(args, env=env, capture_output=True, text=True, check=False)
    if result.returncode:
        raise RuntimeError(f'{Path(args[0]).name} failed with exit {result.returncode}; no signing credentials were logged.')
    return result.stdout + result.stderr


def fingerprint(output):
    match = re.search(r'SHA256:\s*([A-Fa-f0-9:]+)', output)
    if not match:
        raise RuntimeError('Certificate fingerprint missing.')
    return match.group(1).replace(':', '').lower()


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--bundle', required=True, type=Path)
    p.add_argument('--metadata', required=True, type=Path)
    p.add_argument('--commit', required=True)
    p.add_argument('--bundletool', required=True, type=Path)
    p.add_argument('--credentials', required=True, type=Path)
    p.add_argument('--keystore', required=True, type=Path)
    p.add_argument('--output', required=True, type=Path)
    args = p.parse_args()
    for executable in ['java', 'keytool', 'jarsigner']:
        if not shutil.which(executable):
            raise RuntimeError(f'A full JDK is required; {executable} is not on PATH.')
    if args.output.exists():
        raise RuntimeError('Output already exists; choose a new path to preserve prior verification evidence.')
    meta = json.loads(args.metadata.read_text())
    if meta.get('package') != 'com.alambda.sproutly' or meta.get('sourceCommit') != args.commit:
        raise RuntimeError('Package/source commit does not match the expected CI receipt.')
    if meta.get('sha256') != sha(args.bundle) or meta.get('artifact') != args.bundle.name:
        raise RuntimeError('Downloaded artifact does not match CI metadata.')
    if not isinstance(meta.get('versionCode'), int) or meta['versionCode'] <= 6:
        raise RuntimeError('Candidate must update the published pilot version code.')
    with zipfile.ZipFile(args.bundle) as z:
        if len(z.namelist()) != len(set(z.namelist())):
            raise RuntimeError('Duplicate ZIP entries are not accepted.')
        if any(re.match(r'META-INF/.*\.(SF|RSA|DSA|EC)$', n, re.I) for n in z.namelist()):
            raise RuntimeError('Expected the unsigned CI intermediate.')
        alignments = []
        for name in z.namelist():
            if name.startswith('base/lib/arm64-v8a/') and name.endswith('.so'):
                data = z.read(name)
                if data[:6] != b'\x7fELF\x02\x01':
                    raise RuntimeError('Unexpected native library format.')
                header = struct.unpack_from('<16sHHIQQQIHHHHHH', data)
                phoff, entsize, count = header[5], header[9], header[10]
                loads = [struct.unpack_from('<IIQQQQQQ', data, phoff + i * entsize) for i in range(count)]
                loads = [entry for entry in loads if entry[0] == 1]
                if not loads or any(e[7] < 16384 or e[2] % 16384 != e[3] % 16384 for e in loads):
                    raise RuntimeError(f'ARM64 library is not 16 KB ELF aligned: {Path(name).name}')
                alignments.append({'library': Path(name).name, 'minimumLoadAlignment': min(e[7] for e in loads)})
        if not alignments:
            raise RuntimeError('No ARM64 libraries found.')
    tool = ['java', '-jar', str(args.bundletool.resolve())]
    run(tool + ['validate', '--bundle=' + str(args.bundle.resolve())])
    manifest = ET.fromstring(run(tool + ['dump', 'manifest', '--bundle=' + str(args.bundle.resolve())]))
    app = manifest.find('application')
    sdk = manifest.find('uses-sdk')
    if (manifest.get('package') != meta['package'] or manifest.get(NS + 'versionName') != meta['version']
            or int(manifest.get(NS + 'versionCode', '0')) != meta['versionCode']):
        raise RuntimeError('Binary manifest differs from build metadata.')
    if app is None or app.get(NS + 'debuggable', 'false') != 'false' or app.get(NS + 'allowBackup') != 'false':
        raise RuntimeError('Debuggable/backup release guard failed.')
    permissions = [{'name': e.get(NS + 'name'), 'maxSdkVersion': e.get(NS + 'maxSdkVersion')}
                   for e in manifest.findall('uses-permission')]
    forbidden = {'android.permission.SYSTEM_ALERT_WINDOW', 'android.permission.MANAGE_EXTERNAL_STORAGE',
                 'android.permission.READ_MEDIA_IMAGES', 'android.permission.READ_MEDIA_VIDEO'}
    if any(e['name'] in forbidden for e in permissions):
        raise RuntimeError('Bundle declares an unexpected restricted permission; review before signing.')
    creds = json.loads(args.credentials.read_text())
    if creds.get('applicationId') != meta['package'] or creds.get('alias') != 'sproutly-release':
        raise RuntimeError('Signing recovery file belongs to a different app/key alias.')
    env = dict(os.environ, SPROUTLY_LOCAL_STORE_PASS=creds['storePassword'], SPROUTLY_LOCAL_KEY_PASS=creds['keyPassword'])
    cert = run(['keytool', '-J-Duser.language=en', '-list', '-v', '-keystore', str(args.keystore.resolve()),
                '-storepass:env', 'SPROUTLY_LOCAL_STORE_PASS', '-alias', creds['alias']], env)
    if fingerprint(cert) != CERT:
        raise RuntimeError('Recovered signing certificate does not match the published pilot.')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    run(['jarsigner', '-J-Duser.language=en', '-keystore', str(args.keystore.resolve()),
         '-storepass:env', 'SPROUTLY_LOCAL_STORE_PASS', '-keypass:env', 'SPROUTLY_LOCAL_KEY_PASS',
         '-signedjar', str(args.output.resolve()), str(args.bundle.resolve()), creds['alias']], env)
    verification = run(['jarsigner', '-J-Duser.language=en', '-verify', '-verbose', '-certs', str(args.output.resolve())])
    if 'jar verified.' not in verification.lower() or 'unsigned entries' in verification.lower():
        raise RuntimeError('Signed bundle did not verify fully.')
    signed_cert = run(['keytool', '-J-Duser.language=en', '-printcert', '-jarfile', str(args.output.resolve())])
    if fingerprint(signed_cert) != CERT:
        raise RuntimeError('Signed output certificate mismatch.')
    run(tool + ['validate', '--bundle=' + str(args.output.resolve())])
    report = {**meta, 'artifact': args.output.name, 'signature': 'verified — original Sproutly certificate',
              'certificateSha256': CERT, 'unsignedSha256': meta['sha256'], 'sha256': sha(args.output),
              'targetSdk': sdk.get(NS + 'targetSdkVersion') if sdk is not None else None,
              'minSdk': sdk.get(NS + 'minSdkVersion') if sdk is not None else None,
              'permissions': permissions, 'arm64Libraries16Kb': alignments,
              'bundletoolValidated': True, 'physicalDeviceQa': False, 'storeSubmission': None}
    report_path = args.output.with_name(args.output.name + '.verification.json')
    report_path.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps({'artifact': args.output.name, 'version': meta['version'], 'versionCode': meta['versionCode'],
                      'sha256': report['sha256'], 'certificateSha256': CERT, 'report': str(report_path)}, indent=2))


if __name__ == '__main__':
    main()
