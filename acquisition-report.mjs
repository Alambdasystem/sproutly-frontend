import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

const types = new Set(['beta_opt_in','native_first_launch','install_verified','activation','session']);
const cohorts = new Set(['beta','qa','demo','staff']);
const channels = new Set(['linkedin_personal','linkedin_page','linkedin_group','organic','direct','unknown']);
const platforms = new Set(['android','ios','web']);
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const day = time => Math.floor(Date.parse(time)/86400000);
function timestamp(value) {
  return typeof value==='string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,19)===value.slice(0,19);
}
function requireValue(ok, message) {if(!ok)throw new Error(message);}
const hasEvidence = event => typeof event.evidenceRef==='string' && event.evidenceRef.trim().length>0
  && typeof event.reviewedBy==='string' && event.reviewedBy.trim().length>0;

// Input is a PRIVATE, manually reviewed pilot ledger, not a claim of connected telemetry.
// Public output contains aggregate counts only. Never commit the input or evidence.
export function acquisitionReport(ledger) {
  requireValue(timestamp(ledger.asOf),'A valid UTC asOf is required.');
  requireValue(Array.isArray(ledger.observations),'observations must be an array.');
  requireValue(ledger.apkDownloads===null || Number.isSafeInteger(ledger.apkDownloads)&&ledger.apkDownloads>=0,'apkDownloads must be null or a nonnegative integer.');
  requireValue(ledger.apkDownloads===null || typeof ledger.apkDownloadEvidenceRef==='string'&&ledger.apkDownloadEvidenceRef.trim(),'Download totals require a source reference.');
  requireValue(Array.isArray(ledger.storeReports),'storeReports must be an array.');
  const asOf=Date.parse(ledger.asOf), seen=new Set(), excluded=new Set();
  for(const e of ledger.observations) {
    requireValue(e&&uuid.test(e.id)&&uuid.test(e.subject),'Each observation needs opaque UUID id and subject.');
    requireValue(!seen.has(e.id),'Duplicate observation ID.');seen.add(e.id);
    requireValue(types.has(e.type)&&cohorts.has(e.cohort)&&platforms.has(e.platform)&&channels.has(e.channel),'Invalid observation classification.');
    requireValue(timestamp(e.at)&&Date.parse(e.at)<=asOf,'Observation time must be valid and not after asOf.');
    requireValue(typeof e.build==='string'&&e.build.trim(),'Build is required.');
    requireValue(hasEvidence(e),'Every observation requires reviewed evidence.');
    if(e.cohort!=='beta')excluded.add(e.subject);
    if(e.type==='install_verified') {
      requireValue(e.platform!=='web','A website visit is not a native install.');
      requireValue(typeof e.firstTime==='boolean','Install firstTime classification is required.');
      requireValue(['device_observed','tester_evidence_review'].includes(e.method),'Install verification method is required.');
    }
    if(e.type==='activation')requireValue(['plant_saved_and_journal','seed_project_saved_and_care'].includes(e.action),'Activation must meet the agreed product milestone.');
  }
  const eligible=ledger.observations.filter(e=>!excluded.has(e.subject)).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
  const installs=new Map();
  for(const e of eligible)if(e.type==='install_verified'&&e.firstTime&&!installs.has(e.subject))installs.set(e.subject,e);
  const unique=type=>new Set(eligible.filter(e=>e.type===type).map(e=>e.subject)).size;
  const activated=new Set();
  const retention={};
  for(const days of [1,7]) {
    let denominator=0,returned=0;
    for(const [subject,install] of installs) {
      // UTC calendar-day cohort; wait until the entire return day has elapsed.
      const target=day(install.at)+days;
      if(day(ledger.asOf)<=target)continue;
      denominator++;
      if(eligible.some(e=>e.subject===subject&&e.type==='session'&&e.platform!=='web'&&day(e.at)===target))returned++;
    }
    retention['D'+days]={eligible:denominator,returned,rate:denominator?returned/denominator:null};
  }
  for(const e of eligible)if(e.type==='activation'&&installs.has(e.subject)&&Date.parse(e.at)>=Date.parse(installs.get(e.subject).at))activated.add(e.subject);
  const storeReports=ledger.storeReports.map(r=>{
    requireValue(['google_play','app_store'].includes(r.store)&&timestamp(r.from)&&timestamp(r.through)&&Date.parse(r.from)<=Date.parse(r.through)&&Date.parse(r.through)<=asOf,'Store report period is invalid.');
    requireValue(Number.isSafeInteger(r.firstTimeInstalls)&&r.firstTimeInstalls>=0&&typeof r.qaExcluded==='boolean'&&hasEvidence(r),'Store totals require reviewed evidence and explicit QA treatment.');
    return {store:r.store,from:r.from,through:r.through,firstTimeInstalls:r.firstTimeInstalls,qaExcluded:r.qaExcluded};
  });
  const byChannel={},byPlatform={};
  for(const e of installs.values()){byChannel[e.channel]=(byChannel[e.channel]||0)+1;byPlatform[e.platform]=(byPlatform[e.platform]||0)+1;}
  return {asOf:ledger.asOf,measurement:'reviewed_pilot_ledger',population:'unknown',apkDownloads:ledger.apkDownloads,
    optedInBetaParticipants:unique('beta_opt_in'),provisionalNativeFirstLaunches:new Set(eligible.filter(e=>e.type==='native_first_launch'&&e.platform!=='web').map(e=>e.subject)).size,
    verifiedFirstTimePilotInstalls:installs.size,activatedVerifiedPilotUsers:activated.size,byChannel,byPlatform,retention,
    excludedQaDemoStaffSubjects:excluded.size,storeReports,
    combinedPilotAndStoreInstalls:null,
    notes:['Downloads, provisional first launches and store totals are separate measures.',
      'Pilot verification relies on evidence review, not device attestation. Unresolved identities must not be counted twice.',
      'Store reports are separate periods, never summed here. Verify QA exclusions before acquisition claims.']};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href) {
  try {
    requireValue(process.argv.length===3,'Usage: node acquisition-report.mjs /private/path/ledger.json');
    console.log(JSON.stringify(acquisitionReport(JSON.parse(await readFile(process.argv[2],'utf8'))),null,2));
  } catch(error) {console.error(error instanceof SyntaxError?'Invalid ledger JSON.':error.message);process.exitCode=1;}
}
