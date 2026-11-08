"use strict";
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto"),assert=require("node:assert/strict");
const {audit}=require("./review/audit-implementation");
const root=__dirname,sha=b=>crypto.createHash("sha256").update(b).digest("hex");
const bytes=fs.readFileSync(path.join(root,"MANIFEST.json")),manifest=JSON.parse(bytes),args=process.argv.slice(2);
if(args.length){assert.equal(args.length,2);assert.equal(args[0],"--expected-manifest-sha256");assert.match(args[1],/^[a-f0-9]{64}$/i);assert.equal(sha(bytes),args[1].toLowerCase(),"Manifest differs from retained digest");}
const found=[];
function walk(dir){for(const name of fs.readdirSync(dir)){const file=path.join(dir,name),s=fs.lstatSync(file);if(s.isDirectory())walk(file);else{assert.ok(s.isFile());const rel=path.relative(root,file).split(path.sep).join("/");if(rel!=="MANIFEST.json")found.push(rel);}}}
walk(root);assert.deepEqual(found.sort(),Object.keys(manifest.files).sort());
for(const [rel,entry] of Object.entries(manifest.files)){const file=path.resolve(root,rel),local=path.relative(root,file);assert.ok(local&&!path.isAbsolute(local)&&!local.split(path.sep).includes(".."));const data=fs.readFileSync(file);assert.equal(data.length,entry.bytes);assert.equal(sha(data),entry.sha256,"Mismatch: "+rel);}
const index=JSON.parse(fs.readFileSync(path.join(root,"evidence-index.json"),"utf8"));let sessions=0;
for(const run of index.runs){assert.match(run.id,/^exp004-[A-Za-z0-9-]+$/);const result=audit(path.join(root,"runs",run.id));assert.equal(result.rows.length,run.sessions);assert.equal(result.rows.filter(r=>r.status==="completed").length,run.completed);sessions+=result.rows.length;}
assert.equal(sessions,96);console.log(JSON.stringify({verification:"passed",files:found.length,sessions,manifest_sha256:sha(bytes)}));
