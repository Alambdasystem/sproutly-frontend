// Fail closed if Expo changes the generated Gradle template. Never ship its debug key.
const productionConfig = `        release {
            storeFile file(System.getenv('SPROUTLY_KEYSTORE_PATH'))
            storePassword System.getenv('SPROUTLY_STORE_PASSWORD')
            keyAlias 'sproutly-release'
            keyPassword System.getenv('SPROUTLY_KEY_PASSWORD')
        }`;

export function applyReleaseSigning(source) {
  const marker = '    signingConfigs {';
  if (source.split(marker).length !== 2) throw new Error('Unexpected signingConfigs template; release stopped.');
  if (!source.includes(productionConfig)) {
    if (source.includes("storeFile file(System.getenv('SPROUTLY_KEYSTORE_PATH'))")) {
      throw new Error('Unrecognized production signing configuration; release stopped.');
    }
    source = source.replace(marker, `${marker}\n${productionConfig}`);
  }
  const buildTypes = source.indexOf('    buildTypes {');
  if (buildTypes < 0) throw new Error('Missing buildTypes; release stopped.');
  const before = source.slice(0, buildTypes);
  let rest = source.slice(buildTypes);
  const releases = [...rest.matchAll(/\n        release \{([\s\S]*?)\n        \}/g)];
  if (releases.length !== 1) throw new Error('Unexpected release build type; release stopped.');
  const block = releases[0][0];
  const bindings = [...block.matchAll(/signingConfig signingConfigs\.(\w+)/g)];
  if (bindings.length !== 1 || !['debug', 'release'].includes(bindings[0][1])) {
    throw new Error('Unrecognized release signing binding; release stopped.');
  }
  rest = rest.replace(block, block.replace('signingConfig signingConfigs.debug', 'signingConfig signingConfigs.release'));
  return before + rest;
}
