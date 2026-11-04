import {test} from 'node:test';
import assert from 'node:assert/strict';
import {unsignedBundleGradle,bundleConfig} from './bundle-preparation.mjs';
import {applyReleaseSigning} from './release-signing.mjs';
const template=`android {
    signingConfigs {
        debug {
            keyAlias 'androiddebugkey'
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.debug
            minifyEnabled false
        }
    }
}`;
test('CI bundle removes only release signing; normal production signing still requires its own path',()=>{
 const output=unsignedBundleGradle(template);
 assert.match(output,/release \{\n            signingConfig null/);
 assert.match(output,/debug \{\n            signingConfig signingConfigs.debug/);
 assert.equal(unsignedBundleGradle(output),output);
 assert.match(applyReleaseSigning(template),/signingConfig signingConfigs.release/);
 assert.throws(()=>unsignedBundleGradle(applyReleaseSigning(template)));
 assert.throws(()=>unsignedBundleGradle(template.replace('        release {','        unknown {')));
});
test('candidate versions increase from the published baseline without mutating source config',()=>{
 const config={expo:{version:'0.1.5',android:{package:'com.alambda.sproutly',versionCode:6}}};
 assert.equal(bundleConfig(config,'1','0.1.6').expo.android.versionCode,8);
 assert.equal(bundleConfig(config,'2','0.1.6').expo.android.versionCode,9);
 assert.equal(config.expo.android.versionCode,6);
 for(const n of [undefined,'','-1','1.5','nope'])assert.throws(()=>bundleConfig(config,n,'0.1.6'));
 assert.throws(()=>bundleConfig({expo:{android:{package:'wrong',versionCode:6}}},'1','0.1.6'));
});
