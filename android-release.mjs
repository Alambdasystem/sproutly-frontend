import {spawnSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
for(const key of ['ANDROID_HOME','JAVA_HOME','SPROUTLY_KEYSTORE_PATH','SPROUTLY_STORE_PASSWORD','SPROUTLY_KEY_PASSWORD'])if(!process.env[key])throw new Error(`${key} must be set. Signing material must remain outside this repository.`);
function run(cmd,args){const r=spawnSync(cmd,args,{stdio:'inherit',env:{...process.env,EXPO_PUBLIC_API_URL:'https://sproutly-backend-neva.onrender.com'}});if(r.status!==0)process.exit(r.status||1)}
run('npx',['expo','prebuild','--platform','android','--no-install']);
const path='android/app/build.gradle';let s=await readFile(path,'utf8');
if(!s.includes("storeFile file(System.getenv('SPROUTLY_KEYSTORE_PATH'))"))s=s.replace('    signingConfigs {',`    signingConfigs {
        release {
            storeFile file(System.getenv('SPROUTLY_KEYSTORE_PATH'))
            storePassword System.getenv('SPROUTLY_STORE_PASSWORD')
            keyAlias 'sproutly-release'
            keyPassword System.getenv('SPROUTLY_KEY_PASSWORD')
        }`);
s=s.replace('signingConfig signingConfigs.debug\n            def enableShrinkResources','signingConfig signingConfigs.release\n            def enableShrinkResources');
await writeFile(path,s);
run(process.platform==='win32'?'android/gradlew.bat':'android/gradlew',['-p','android','assembleRelease','--no-daemon','--max-workers=2','-PreactNativeArchitectures=arm64-v8a,armeabi-v7a']);
