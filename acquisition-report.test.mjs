import {test} from 'node:test';
import assert from 'node:assert/strict';
import {acquisitionReport} from './acquisition-report.mjs';
let serial=0;
const subject=n=>`00000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
const event=(type,overrides={})=>({id:subject(++serial),subject:subject(900),type,cohort:'beta',platform:'android',channel:'linkedin_personal',build:'0.1.5/6',at:'2026-11-01T12:00:00Z',evidenceRef:'PRIVATE-SYNTHETIC-TEST',reviewedBy:'test-only',...(type==='install_verified'?{firstTime:true,method:'device_observed'}:{}),...overrides});
const ledger=observations=>({asOf:'2026-11-10T00:00:00Z',apkDownloads:null,storeReports:[],observations});
test('downloads and provisional events cannot become installs; repeated installs deduplicate by person',()=>{
 const input=ledger([event('native_first_launch'),event('install_verified'),event('install_verified',{platform:'ios',channel:'direct'}),event('install_verified',{subject:subject(901),firstTime:false})]);
 input.apkDownloads=30;input.apkDownloadEvidenceRef='synthetic';
 const r=acquisitionReport(input);assert.equal(r.apkDownloads,30);assert.equal(r.verifiedFirstTimePilotInstalls,1);assert.equal(r.provisionalNativeFirstLaunches,1);assert.deepEqual(r.byChannel,{linkedin_personal:1});assert.equal(r.combinedPilotAndStoreInstalls,null);
});
test('QA/demo/staff exclusions apply across all records for a person, even if later misclassified beta',()=>{
 const r=acquisitionReport(ledger([event('install_verified'),event('session',{cohort:'qa'}),event('install_verified',{subject:subject(902),cohort:'demo'}),event('beta_opt_in',{subject:subject(903),cohort:'staff'})]));
 assert.equal(r.verifiedFirstTimePilotInstalls,0);assert.equal(r.excludedQaDemoStaffSubjects,3);assert.equal(r.optedInBetaParticipants,0);
});
test('retention uses completed UTC cohort days and activation requires the milestone after installation',()=>{
 const input=ledger([event('install_verified'),event('session',{at:'2026-11-02T02:00:00Z'}),event('session',{at:'2026-11-08T01:00:00Z'}),event('activation',{at:'2026-11-01T13:00:00Z',action:'plant_saved_and_journal'}),event('install_verified',{subject:subject(901),at:'2026-11-09T01:00:00Z'})]);
 const r=acquisitionReport(input);assert.deepEqual(r.retention.D1,{eligible:1,returned:1,rate:1});assert.deepEqual(r.retention.D7,{eligible:1,returned:1,rate:1});assert.equal(r.activatedVerifiedPilotUsers,1);
});
test('invalid, future, web-install, unreviewed and duplicate evidence fail rather than inflating totals',()=>{
 for(const changes of [{platform:'web'},{evidenceRef:''},{at:'2026-11-11T00:00:00Z'},{at:'2026-02-30T00:00:00Z'},{method:'download'}])assert.throws(()=>acquisitionReport(ledger([event('install_verified',changes)])));
 const e=event('install_verified');assert.throws(()=>acquisitionReport(ledger([e,e])));
});
test('store totals remain independent and public reports contain no private identity or evidence',()=>{
 const input=ledger([event('install_verified')]);input.storeReports=[{store:'google_play',from:'2026-11-01T00:00:00Z',through:'2026-11-09T23:59:59Z',firstTimeInstalls:8,qaExcluded:false,evidenceRef:'private-report',reviewedBy:'private-reviewer'}];
 const r=acquisitionReport(input);assert.equal(r.storeReports[0].firstTimeInstalls,8);assert.equal(r.storeReports[0].qaExcluded,false);assert.equal(r.verifiedFirstTimePilotInstalls,1);assert.equal(r.combinedPilotAndStoreInstalls,null);assert.doesNotMatch(JSON.stringify(r),/private-report|private-reviewer|00000000/);
});
