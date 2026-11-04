// AAB-only CI preparation. The recovered private key stays off the build service.
export function unsignedBundleGradle(source) {
  if(source.includes('SPROUTLY_KEYSTORE_PATH'))throw new Error('Use a clean unsigned prebuild; signing configuration was already applied.');
  const at=source.indexOf('    buildTypes {');
  if(at<0)throw new Error('Missing Android build types.');
  const before=source.slice(0,at),rest=source.slice(at);
  const blocks=[...rest.matchAll(/\n        release \{([\s\S]*?)\n        \}/g)];
  if(blocks.length!==1)throw new Error('Unrecognized release template; bundle build stopped.');
  const block=blocks[0][0];
  const bindings=[...block.matchAll(/signingConfig\s+([^\n]+)/g)];
  if(bindings.length!==1||!['signingConfigs.debug','null'].includes(bindings[0][1].trim()))throw new Error('Unrecognized release signing; bundle build stopped.');
  return before+rest.replace(block,block.replace('signingConfig signingConfigs.debug','signingConfig null'));
}

export function bundleConfig(config,buildNumber,version) {
  if(config?.expo?.android?.package!=='com.alambda.sproutly')throw new Error('Unexpected Android package.');
  const run=Number(buildNumber),base=config.expo.android.versionCode;
  if(buildNumber===undefined||String(buildNumber).trim()===''||!Number.isSafeInteger(run)||run<0)throw new Error('A nonnegative Codemagic BUILD_NUMBER is required.');
  if(!Number.isSafeInteger(base)||base<6||!Number.isSafeInteger(base+run+1))throw new Error('Invalid versionCode baseline.');
  if(!/^\d+\.\d+\.\d+$/.test(version||''))throw new Error('Release version must be explicit.');
  const result=structuredClone(config);
  result.expo.version=version;
  result.expo.android.versionCode=base+run+1;
  return result;
}
