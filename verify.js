"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {audit}=require('./evidence/review/audit-implementation');
const root=__dirname,sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'PUBLICATION-MANIFEST.json'),'utf8'));
for(const [relative,entry]of Object.entries(manifest.files)){
 const file=path.resolve(root,relative),local=path.relative(root,file);assert.ok(local&&!path.isAbsolute(local)&&!local.split(path.sep).includes('..'));
 const bytes=fs.readFileSync(file);assert.equal(bytes.length,entry.bytes);assert.equal(sha(bytes),entry.sha256,'Checksum mismatch: '+relative);
}
const original=fs.readFileSync(path.join(root,'evidence/MANIFEST.json'));
assert.equal(sha(original),manifest.original_packet_manifest_sha256,'Original packet manifest changed');
const index=JSON.parse(fs.readFileSync(path.join(root,'evidence/evidence-index.json'),'utf8'));
let primary=0,reproductions=0;
for(const run of index.runs)primary+=audit(path.join(root,'evidence/runs',run.id)).rows.length;
for(const id of manifest.reproduction_runs){assert.match(id,/^exp004-[A-Za-z0-9-]+$/);reproductions+=audit(path.join(root,'reproductions',id)).rows.length;}
assert.equal(primary,96);console.log(JSON.stringify({verification:'passed',inventoried_files:Object.keys(manifest.files).length,primary_sessions:primary,reproduction_sessions:reproductions,note:'Offline checksum and recorded-state replay; not original-host authentication or live-model re-execution'}));
