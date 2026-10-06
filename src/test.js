const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let fails = 0, checks = 0;
function ok(cond, label, detail) { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + detail : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

// ---------- load ----------
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('NO SCRIPT'); process.exit(1); }
const src = m[1];
try { new vm.Script(src); } catch (e) { console.log('JS PARSE ERROR: ' + e.message); process.exit(1); }
const sandbox = { module: { exports: {} }, console };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const A = sandbox.module.exports;
console.log('script parsed and loaded, exports: ' + Object.keys(A).length);
const tps = ['c4', 'c5', 'c6'];
const body = tp => A.CH[tp].notes.map(n => n.body).join(' ');
const allBodies = tps.map(body).join(' ');
const anchorExists = id => tps.some(tp => A.CH[tp].notes.some(n => n.id === id)) || allBodies.includes('id="' + id + '"');
const strip = s => String(s).replace(/<[^>]+>/g, '');

// ---------- 1. the course and its guide ----------
head('the course and the objectives sheet');
ok(/Statistics for Business/.test(A.COURSE.code) && /4 · 5 · 6/.test(A.COURSE.term) && /Probability/.test(A.COURSE.exam), 'course and chapters');
ok(A.COURSE.rules.length === 4 && /two tools/.test(A.COURSE.rules[0]) && /one flashcard/.test(A.COURSE.rules[1]) && /Excel/.test(A.COURSE.rules[2]), 'what the exam allows: two tools, one flashcard; Excel by name');
ok(A.GUIDE.sections.length === 3 && A.GUIDE.sections.map(s => s.tp).join() === tps.join(), 'three chapters, in order');
ok(A.KEYTERMS.length === 18 && A.KEYTERMS.every(k => k.q && k.a && /=/.test(k.a)), 'eighteen which-Excel-formula questions, each answered with a formula', A.KEYTERMS.length);
const OBJ = {c4: 11, c5: 10, c6: 10};
A.GUIDE.sections.forEach(s => {
  ok(s.items.length === OBJ[s.tp], 'one guide item per numbered objective for ' + s.tp, s.items.length);
  s.items.forEach(it => {
    ok(it.short && it.short.length > 60, 'item has a one-breath answer: ' + it.t);
    ok(A.CH[s.tp].notes.some(n => n.id === it.a), 'item points at a note section: ' + it.t, it.a);
    ok(it.subs.length >= 1 && it.subs.every(sb => sb[0] && anchorExists(sb[1])), 'every subsection anchor exists: ' + it.t, it.subs.map(sb => sb[1]).join(','));
  });
});
const items = A.GUIDE.sections.flatMap(s => s.items);
ok(items.length === 31 && new Set(items.map(i => i.id)).size === 31, 'thirty-one objectives, unique ids', items.length);
ok(Object.keys(A.SEC_CHAPTER).length === 31, 'the engine knows all thirty-one');
['Be able to distinguish an outcome, an event, and the sample space', 'explain why it is subtracted once', 'positive-probability mutually exclusive', 'distinguish at least one from exactly one', 'uses the specified subgroup as its denominator', 'Bayes\' theorem', 'base rates affect the updated probability', 'Distinguish permutations from combinations',
 'distinguish a discrete random variable from a continuous random variable', 'Check the possible values, each probability, and their sum', 'using probabilities as weights', 'Explain expected value as a long-run average', 'check all binomial requirements', 'Translate exactly, at most, fewer than, at least, and more than', 'when the model\'s assumptions fail', 'Recognize when Poisson is appropriate', 'Adjust an average event rate to the requested interval', 'Explain the Poisson relationships among mean, variance, and standard deviation',
 'mean zero, standard deviation one, symmetry, and total area one', 'Find areas left, right, and between z-scores', 'Standardize an observation from a normal population', 'Find a cutoff in original measurement units', 'Distinguish a parameter from a statistic', 'Distinguish bias from variability', 'central limit theorem concerns sample means', 'Identify the mean and standard error of the sample mean', 'Calculate a probability for one observation or for a sample mean', 'normal quantile plot'].forEach(v => ok(items.some(i => i.t.includes(v)), 'objective in the sheet’s words: ' + v));
ok(items.every(i => /^[456]-[1-5] · /.test(i.t)), 'every objective carries its section number');
ok(Object.values(A.SEC_TITLES).every(t => t.length < 90 && /^[456]-[1-5] · /.test(t)), 'short names for tags and card backs (the note headings)');

// ---------- 2. the lessons ----------
head('lessons');
const noteIds = [];
tps.forEach(tp => {
  const c = A.CH[tp];
  ok(c.n && c.title && c.short, 'lesson header: ' + tp);
  const want = A.GUIDE.sections.find(x => x.tp === tp).items.length;
  ok(c.notes.length === want, 'one note section per objective: ' + tp, c.notes.length);
  c.notes.forEach(n => {
    ok(n.id.indexOf(tp + '-') === 0, 'note id prefixed: ' + n.id); noteIds.push(n.id);
    ok(n.body.length > 300, 'note has substance: ' + n.h, n.body.length);
    ok(n.body.indexOf('<div class="point"><b>The point</b>') === 0, 'section opens with “The point”: ' + n.h);
    ok(/<p class="able"><b>Be able to<\/b>/.test(n.body), 'section says what to be able to do: ' + n.h);
    ok(/<mark>/.test(n.body), 'section has at least one highlight: ' + n.h);
  });
  ok(c.decks.length === 2 && c.decks.every(d => d.id && d.label && d.match !== false && d.cards.length >= 8), 'two decks with cards in play: ' + tp, c.decks.map(d => d.cards.length).join(','));
  c.decks.forEach(d => {
    ok(d.cards.every(x => x.length === 3 && x[0] && x[1] && A.SEC_CHAPTER[x[2]] === tp), 'every card has front, back and a section of its lesson: ' + tp + '/' + d.id);
    ok(new Set(d.cards.map(x => x[0])).size === d.cards.length, 'card fronts unique: ' + tp + '/' + d.id);
  });
  ok(A.PAIRSETS[tp].pairs.length >= 15, 'enough pairs to match: ' + tp, A.PAIRSETS[tp].pairs.length);
  ok(new Set(A.PAIRSETS[tp].pairs.map(p => p[1])).size === A.PAIRSETS[tp].pairs.length, 'pair meanings unique: ' + tp);
});
ok(new Set(noteIds).size === noteIds.length, 'note ids unique across lessons');
const subIds = [...new Set((allBodies.match(/ id="([a-z0-9-]+)"/g) || []).map(s => s.slice(5, -1)))];
ok(new Set(subIds.concat(noteIds)).size === subIds.length + noteIds.length, 'subsection ids do not collide with section ids');
// every number on the page, recomputed here
const allB = tps.map(body).join(' ') + JSON.stringify(A.KEYTERMS) + JSON.stringify(A.QB) + JSON.stringify(tps.map(tp => A.CH[tp].decks));
const Cn = (n, k) => { let r = 1; for (let x = 1; x <= k; x++) r = r * (n - k + x) / x; return r; };
const bin = (x, n, p) => Cn(n, x) * p ** x * (1 - p) ** (n - x), binc = (x, n, p) => { let t = 0; for (let k = 0; k <= x; k++) t += bin(k, n, p); return t; };
const fct = n => n < 2 ? 1 : n * fct(n - 1), poi = (x, m) => m ** x * Math.exp(-m) / fct(x), poic = (x, m) => { let t = 0; for (let k = 0; k <= x; k++) t += poi(k, m); return t; };
const erf = x => { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
const phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
const inv = p => { let lo = -8, hi = 8; for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2; phi(m) < p ? lo = m : hi = m; } return (lo + hi) / 2; };
const shown = (value, digits, label) => ok(allB.includes(value.toFixed(digits)), 'computed and on the page: ' + label + ' = ' + value.toFixed(digits));
shown(bin(3, 10, 0.3), 4, 'binomial exactly 3 of 10'); shown(binc(3, 10, 0.3), 4, 'binomial at most 3'); shown(1 - binc(3, 10, 0.3), 4, 'binomial at least 4'); shown(binc(2, 10, 0.3), 4, 'binomial fewer than 3');
shown(bin(1, 3, 0.4), 3, 'binomial n=3 p=.4 x=1'); shown(binc(2, 20, 0.1), 4, 'binomial 2 or fewer of 20');
shown(poi(2, 4), 4, 'Poisson exactly 2, mean 4'); shown(poic(2, 4), 4, 'Poisson at most 2'); shown(1 - poi(0, 4), 4, 'Poisson at least 1'); shown(poi(0, 2), 4, 'Poisson none, mean 2'); shown(poi(0, 3), 4, 'Poisson none, mean 3');
shown(phi(1), 4, 'P(z < 1)'); shown(1 - phi(1), 4, 'P(z > 1)'); shown(phi(1) - phi(-1), 4, 'P(−1 < z < 1)'); shown(1 - phi(2), 4, 'P(z > 2)'); shown(1 - phi(1.5), 4, 'P(z > 1.5)'); shown(1 - phi(5 / 15), 4, 'one score above 105');
shown(inv(0.95), 3, 'z at 95%'); shown(inv(0.9), 3, 'z at 90%'); shown(inv(0.975), 3, 'z at 97.5%'); shown(inv(0.99), 3, 'z at 99%');
shown(100 + inv(0.9) * 15, 1, '90th percentile of N(100, 15)'); shown(100 + inv(0.1) * 15, 1, '10th percentile of N(100, 15)');
shown(1 - 0.9 ** 5, 4, 'at least one of five'); shown(5 * 0.1 * 0.9 ** 4, 4, 'exactly one of five'); shown(0.018 / 0.067, 3, 'P(fraud | flag)'); shown(95 / 590, 3, 'P(condition | positive)');
shown(4 / 52 * 3 / 51, 4, 'two aces without replacement'); shown(4 / 52 * 4 / 52, 4, 'two aces with replacement'); shown(16 / 52, 3, 'king or heart');
ok(fct(5) === 120 && fct(6) === 720 && Cn(10, 3) === 120 && 10 * 9 * 8 === 720 && 26 * 26 * 1000 === 676000 && Cn(52, 5) === 2598960, 'the counts: 5!, 6!, 10C3, 10P3, the code, 52C5');
ok(Math.abs((0 * .1 + 1 * .3 + 2 * .4 + 3 * .2) - 1.7) < 1e-9 && Math.abs((0 + .3 + 1.6 + 1.8) - 1.7 ** 2 - 0.81) < 1e-9, 'the worked distribution: mean 1.7, variance 0.81, SD 0.9');
ok(Math.abs(490 * 0.01 - 10 * 0.99 + 5) < 1e-9 && Math.abs(500000 * 0.00031 - 155) < 1e-6, 'expected values: the raffle (−$5) and the policy ($155 + $300)');
ok(Math.abs(Math.sqrt(6.5) - 2.5495) < 1e-3 && Math.abs(Math.sqrt(18 * .75 * .25) - 1.837) < 1e-3 && Math.abs(13 - 2 * Math.sqrt(6.5) - 7.9) < 0.01, 'binomial mean and SD examples (births, peas, the low cutoff)');
ok(15 / Math.sqrt(25) === 3 && 15 / Math.sqrt(36) === 2.5 && 15 / Math.sqrt(100) === 1.5 && Math.abs(8000 / 19170 - 0.417) < 0.001, 'standard errors and the rescaled Poisson mean');
ok(200 + 9800 === 10000 && 0.9 * 200 === 180 && 0.05 * 9800 === 490 && 180 + 490 === 670 && 0.05 * 9900 === 495, 'the 10,000 tables add up');
ok(A.KIT.card.front.length >= 8 && A.KIT.card.back.length >= 8 && A.KIT.tools.length === 2 && A.KIT.which.length >= 12, 'the exam kit: a two-sided flashcard, two tools, a which-method table');
ok(A.KIT.tools.every(t => /^https:\/\/tools\.benhartlage\.com\//.test(t.url) && t.uses.length >= 4 && t.uses.every(u => u[1].length >= 2)), 'each tool has its link and step-by-step uses');
ok(/σ ÷ √n/.test(JSON.stringify(A.KIT)) && /Standard deviation \(σ\)/.test(JSON.stringify(A.KIT.tools[0])), 'the kit says to enter the standard error in the tool’s σ box for a sample mean');
ok(!/Samuel|Goliath|derivative|Rolle’s|Larson|Calculus/i.test(html), 'nothing left over from the template pages');
ok(/--gold:#6b4c7c/.test(html) && /--rose-wash:#f3edf6/.test(html), 'the accent is a soft plum');

// ---------- 3. every question belongs to a section ----------
head('every question belongs to a section');
for (let i = 0; i < A.QB.length; i++) ok(A.QB[i] && typeof A.QB[i] === 'object', 'no empty slot in the question list at #' + i);
A.QB.forEach((q, i) => ok(q.sec && A.SEC_CHAPTER[q.sec] === q.tp, 'question #' + i + ' carries a section of its own lesson', q.sec + ' / ' + strip(q.q).slice(0, 60)));
Object.keys(A.SEC_CHAPTER).forEach(id => {
  const n = A.QB.filter(q => q.sec === id).length;
  ok(n >= 4, 'at least four questions for “' + A.SEC_TITLES[id] + '”', n);
  ok(A.CH[A.SEC_CHAPTER[id]].decks.some(d => d.cards.some(c => c[2] === id)), 'at least one flashcard for “' + A.SEC_TITLES[id] + '”');
});
tps.forEach(tp => {
  const mine = A.QB.filter(q => q.tp === tp);
  ok(mine.filter(q => q.ap).length >= 1, 'application questions on ' + tp, mine.filter(q => q.ap).length);
  ok(mine.filter(q => q.t === 'tf').length >= 2, 'true/false on ' + tp, mine.filter(q => q.t === 'tf').length);
});
console.log('  questions per section: ' + Object.keys(A.SEC_CHAPTER).map(id => id.replace(/^g/, '') + '=' + A.QB.filter(q => q.sec === id).length).join(' '));

// ---------- 4. question bank ----------
head('question bank');
A.QB.forEach((q, i) => {
  ok(tps.includes(q.tp), 'known lesson #' + i);
  ok(q.q && q.e && strip(q.e).length >= 20, 'question and a real explanation #' + i, strip(q.q).slice(0, 50) + ' || ' + q.e);
  if (q.t === 'mc') {
    ok(q.w.length === 3, 'three wrong answers #' + i, q.q);
    ok(!q.w.includes(q.a), 'right answer not among the wrong #' + i, q.q);
    ok(new Set([q.a].concat(q.w)).size === 4, 'four distinct options #' + i, q.q);
  } else ok(q.t === 'tf' && typeof q.a === 'boolean', 'true/false has a boolean answer #' + i);
});
ok(new Set(A.QB.map(q => q.q)).size === A.QB.length, 'no duplicate questions');
// an exam asks about the earth, not about where things sat on a slide
const META = /means the same thing|which pair of names|is another name for|two namings|sits at the center|in figure \d|on the slide, which/i;
A.QB.forEach((q, i) => ok(!META.test(q.q), 'question #' + i + ' asks a concept, not the page’s own wording', q.q));
A.QB.filter(q => q.t === 'tf').forEach((q, i) => {
  const rest = String(q.e).replace(/^(True|False)\s*[—-]\s*/, '');
  const stem = new Set(strip(q.q).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(x => x.length > 4));
  const said = strip(rest).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(x => x.length > 4);
  const echo = said.length ? said.filter(x => stem.has(x)).length / said.length : 0;
  ok(echo < 0.75, 'true/false #' + i + ' is not answered by its own wording', q.q + ' || ' + q.e);
});
console.log('  questions: ' + A.QB.length);

// ---------- 5. option length must not give the answer away ----------
head('option length is not a tell');
const mcq = A.QB.filter(q => q.t === 'mc');
const olen = s => strip(s).length;
const longestShare = mcq.filter(q => olen(q.a) > Math.max(...q.w.map(olen))).length / mcq.length;
const lenRatio = mcq.reduce((t, q) => t + olen(q.a) / (q.w.reduce((u, x) => u + olen(x), 0) / q.w.length), 0) / mcq.length;
ok(longestShare <= 0.40, 'the right answer is not usually the longest option', (longestShare * 100).toFixed(1) + '% (chance 25%)');
ok(lenRatio <= 1.20, 'the right answer is not much wordier than the wrong ones', lenRatio.toFixed(2) + ' (ideal 1.00)');
mcq.forEach((q, i) => ok(!(olen(q.a) > 60 && q.w.some(x => olen(x) < 20)), 'no throwaway distractor beside a long answer', q.q));
console.log('  right answer longest: ' + (longestShare * 100).toFixed(1) + '%   length ratio: ' + lenRatio.toFixed(2));

// ---------- 6. generators ----------
head('question generators (100 runs)');
const secs = Object.keys(A.SEC_CHAPTER);
for (let r = 0; r < 100; r++) {
  const tp = tps[r % tps.length];
  const qs = A.topicQuestions(tp, null, 10);
  ok(qs.length === 10, tp + ': ten questions', qs.length);
  ok(new Set(qs.map(q => q.key)).size === 10, tp + ': no repeats');
  ok(qs.every(q => q.tp === tp && q.sec && A.SEC_CHAPTER[q.sec] === tp), tp + ': all from this lesson, each with a section');
  ok(qs.every(q => q.opts && q.opts.filter(o => o.ok).length === 1), tp + ': one right option each');
  const means = qs.map(q => A.meaningOf(q));
  let clash = 0;
  for (let x = 0; x < means.length; x++) for (let y = x + 1; y < means.length; y++) if (A.sameThing(means[x], means[y])) clash++;
  ok(clash === 0, tp + ': no two questions asking the same thing', clash);
  const back = A.questionsByKeys(qs.map(q => q.key));
  ok(back.length === 10 && back.every((q, i) => q.key === qs[i].key), tp + ': questions rebuild from their keys');
  const n = [15, 25, 40, 60][r % 4];
  const mx = A.mockQuestions({ n: n, types: 'all' });
  ok(mx.length === n, 'exam of ' + n, mx.length);
  ok(new Set(mx.map(q => q.tp)).size === 3, 'exam spans all three chapters', [...new Set(mx.map(q => q.tp))].join(','));
  ok(A.mockQuestions({ n: 20, types: 'ap' }).every(q => q.ap), 'application-only exam');
  ok(A.mockQuestions({ n: 20, types: 'tf' }).every(q => q.kind === 'tf'), 'true/false-only exam');
  ok(A.mockQuestions({ n: 15, types: 'all', topics: [tp] }).every(q => q.tp === tp), 'one-lesson exam');
}
for (let r = 0; r < 40; r++) {
  const f = A.finalFifty(62);
  ok(f.length === 62, 'the sixty-two is sixty-two', f.length);
  ok(new Set(f.map(q => q.key)).size === 62, 'no repeated question in the sixty-two');
  const covered = new Set(f.map(q => q.sec));
  ok(covered.size === secs.length, 'the fifty covers every section of every outline', covered.size + '/' + secs.length);
  secs.forEach(s => ok(f.filter(q => q.sec === s).length >= 2, 'at least two on ' + A.SEC_TITLES[s], f.filter(q => q.sec === s).length));
  const means = f.map(q => A.meaningOf(q));
  let clash = 0;
  for (let x = 0; x < means.length; x++) for (let y = x + 1; y < means.length; y++) if (A.sameThing(means[x], means[y])) clash++;
  ok(clash === 0, 'no two questions in the fifty ask the same thing', clash);
}
tps.forEach(tp => {
  for (let r = 0; r < 20; r++) {
    const d = A.deckFor(tp, A.CH[tp].decks[0].id);
    ok(d.length === A.CH[tp].decks[0].cards.length && d.every(c => c.front && c.back && /Objective · /.test(c.back)), tp + ': deck renders with its section on the back');
    const m = A.matchRound(tp, 6);
    ok(m.items.length === 6 && new Set(m.items.map(x => x.right)).size === 6, tp + ': match round of six');
  }
});

// ---------- 7. verdicts and wording ----------
head('verdicts');
ok(A.VERDICTS.length === 5 && A.VERDICTS[0].min === 100 && A.VERDICTS[4].min === 0, 'five verdict tiers');
const lines = A.VERDICTS.flatMap(v => v.t.concat([v.a])).join(' | ');
ok(!/cheeks|goat|bruh|cooked|twin|\bbro\b|\bchat\b|aura|npc|\bnah\b|ain.t|dawg|no cap|lock in|\bL\b|mid\./i.test(lines), 'no slang anywhere in the verdicts', lines);
ok(/<b>Correct\.<\/b>/.test(src) && /<b>Not this one\.<\/b>/.test(src), 'answer feedback is plain');

// ---------- 8. markup ----------
head('markup');
ok((html.match(/class="topic-btn"/g) || []).length === 6, 'six tabs: guide, exam kit, three chapters, practice exam');
['guide', 'kit'].concat(tps, ['exam']).forEach(t => ok(html.includes('data-topic="' + t + '"') && html.includes('id="topic-' + t + '"'), 'tab and section: ' + t));
tps.forEach(tp => ['Notes', 'Cards', 'Match', 'Quiz'].forEach(s => ok(html.includes('id="' + tp + s + '"'), 'root exists: ' + tp + s)));
ok(/data-topic="guide"\s+aria-selected="true"/.test(html), 'Guide is the default tab');
ok(html.includes('id="flourish"') && html.includes('id="emblem"') && html.includes('class="emblem"'), 'ornaments and the earth emblem present');
ok(html.indexOf('--gold:#6b4c7c') > html.indexOf('--gold:#9a7a44'), 'the plum override comes after the gold base, so it wins');
ok(/id="kitCard"/.test(html) && /id="kitTools"/.test(html) && /id="kitWhich"/.test(html), 'the exam kit panels exist');
ok(html.includes('rel="manifest"') && html.includes('sw.js') && fs.existsSync(path.join(ROOT, 'sw.js')) && fs.existsSync(path.join(ROOT, 'manifest.webmanifest')), 'PWA pieces: manifest and service worker');
ok(/stats-v\d+/.test(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8')), 'the service worker has its own cache name');
ok(/Statistics for Business/.test(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8')), 'the manifest is this page’s');
ok(html.includes('og:image') && html.includes('/stats/preview.png'), 'link preview metadata');
ok(!/�/.test(html), 'no broken characters');
ok(!/licensed under|CC BY|Public Domain Mark|openverse/.test(html), 'no image-credit boilerplate leaked in from the slides');
console.log('  file size: ' + (html.length / 1024).toFixed(1) + ' KB');

console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' checks'));
process.exit(fails ? 1 : 0);
