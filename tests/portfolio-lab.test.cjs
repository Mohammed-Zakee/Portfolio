const assert = require('node:assert/strict');
const lab = require('../assets/portfolio-lab.js');
for (const [text,label] of [['Friendly and good','Positive'],['Bad and slow','Negative'],['A table by the window','Neutral'],['good bad','Mixed'],['not good','Negative'],['not bad','Positive'],['','Neutral'],["isn't good",'Negative']]) assert.equal(lab.sentiment(text).label,label,text);
assert.equal(lab.sentiment('<img src=x onerror=alert(1)>').label,'Neutral');
assert.equal(lab.sentiment('not very good').label,'Positive','Document the immediate-word negation limitation');
assert.deepEqual(lab.transactions(20,123,0.12),lab.transactions(20,123,0.12),'Fixed seed must reproduce data');
assert.equal(lab.training.length,400); assert.equal(lab.evaluation.length,200);
assert.ok(lab.training.every(r=>!r.anomaly));
assert.ok(!lab.training.some(r=>lab.evaluation.some(x=>x.id===r.id)),'No record overlap between training and evaluation');
for(const key of ['amount','velocity']) {
 const values=lab.training.map(r=>key==='amount'?Math.log1p(r[key]):r[key]);
 assert.ok(Math.abs(lab.fit[key].mean-values.reduce((a,b)=>a+b,0)/400)<1e-10,'Fit only the training set');
}
const low=lab.evaluate(.5),normal=lab.evaluate(2),high=lab.evaluate(4.5);
assert.equal(normal.tp+normal.fp+normal.fn+normal.tn,200);
assert.equal(normal.tp+normal.fn,lab.evaluation.filter(r=>r.anomaly).length);
assert.ok(low.tp>=normal.tp && normal.tp>=high.tp);
assert.ok(low.fp>=normal.fp && normal.fp>=high.fp);
assert.ok(low.fn<=normal.fn && normal.fn<=high.fn);
assert.equal(normal.tp,17);assert.equal(normal.fp,0);assert.equal(normal.fn,5);assert.equal(normal.tn,178);
assert.equal(normal.precision,1);assert.equal(normal.recall,17/22);
assert.equal(lab.evaluate(1e9).precision,null,'Zero alerts must not imply perfect precision');
assert.ok(lab.transactionScore({amount:1,velocity:0}).score===0);
console.log('Review behavior, synthetic reproducibility, training isolation, metric arithmetic, and threshold checks passed.');
