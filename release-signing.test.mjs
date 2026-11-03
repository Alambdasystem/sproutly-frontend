import {test} from 'node:test';
import assert from 'node:assert/strict';
import {applyReleaseSigning} from './release-signing.mjs';
const template = `android {
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
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
test('release uses production key while debug remains separate; applying twice is safe',()=>{
  const output=applyReleaseSigning(template);
  assert.match(output,/release \{\n            signingConfig signingConfigs.release/);
  assert.match(output,/debug \{\n            signingConfig signingConfigs.debug/);
  assert.equal(output,applyReleaseSigning(output));
});
test('unknown or missing release signing cannot silently retain a debug binding',()=>{
  assert.throws(()=>applyReleaseSigning(template.replace('        release {','        changedRelease {')));
  assert.throws(()=>applyReleaseSigning(template.replaceAll('signingConfigs.debug','signingConfigs.unknown')));
  assert.throws(()=>applyReleaseSigning(template.replace('    signingConfigs {','    renamedSigningConfigs {')));
});
