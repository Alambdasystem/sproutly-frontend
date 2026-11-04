import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {bundleConfig,unsignedBundleGradle} from './bundle-preparation.mjs';

const sdk=process.env.ANDROID_HOME||process.env.ANDROID_SDK_ROOT;
if(!sdk||!process.env.JAVA_HOME)throw new Error('Android SDK and JDK are required on the CI machine.');
const env={...process.env,ANDROID_HOME:sdk,NODE_ENV:'production',EXPO_PUBLIC_API_URL:'https://sproutly-backend-neva.onrender.com'};
function run(command,args,stdio='inherit') {
 const result=spawnSync(command,args,{env,stdio,encoding:'utf8'});
 if(result.status!==0)throw new Error(`${command} failed (${result.status??'could not start'}).`);
 return result.stdout||'';
}
const config=bundleConfig(JSON.parse(await readFile('app.json','utf8')),env.BUILD_NUMBER,env.SPROUTLY_RELEASE_VERSION);
await writeFile('app.json',JSON.stringify(config,null,2)+'\n');
run('npx',['expo','prebuild','--platform','android','--no-install']);
await writeFile('android/local.properties',`sdk.dir=${sdk}\n`);
const gradle='android/app/build.gradle';
await writeFile(gradle,unsignedBundleGradle(await readFile(gradle,'utf8')));
run(process.platform==='win32'?'android/gradlew.bat':'android/gradlew',['-p','android','bundleRelease','--no-daemon','--max-workers=2','-PreactNativeArchitectures=arm64-v8a,armeabi-v7a']);
const source='android/app/build/outputs/bundle/release/app-release.aab';
const entries=run('jar',['tf',source],'pipe').split(/\r?\n/);
if(!entries.includes('BundleConfig.pb')||!entries.includes('base/manifest/AndroidManifest.xml'))throw new Error('Not an Android App Bundle.');
if(entries.some(name=>/^META-INF\/.*\.(SF|RSA|DSA|EC)$/i.test(name)))throw new Error('CI output was unexpectedly signed; do not use a debug or unrelated key.');
await mkdir('release-candidate',{recursive:true});
const name=`Sproutly-${config.expo.version}-code${config.expo.android.versionCode}-UNSIGNED.aab`;
await copyFile(source,'release-candidate/'+name);
const sha256=createHash('sha256').update(await readFile(source)).digest('hex');
await writeFile('release-candidate/bundle-build.json',JSON.stringify({package:config.expo.android.package,version:config.expo.version,versionCode:config.expo.android.versionCode,sourceCommit:env.CM_COMMIT||null,buildId:env.CM_BUILD_ID||null,artifact:name,sha256,signature:'UNSIGNED — sign privately before any Play upload',physicalDeviceQa:false},null,2)+'\n');
console.log(`Unsigned bundle prepared: ${name}\nSHA-256: ${sha256}\nThis is an intermediate artifact, not a store submission.`);
