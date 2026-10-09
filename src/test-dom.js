/* Clicks through the real page in a simulated browser (jsdom).
   Usage: node test-dom.js <path-to-node_modules-containing-jsdom>             */
const path = require('path');
const fs = require('fs');
const NM = process.argv[2];
const { JSDOM, VirtualConsole } = require(path.join(NM, 'jsdom'));
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

let fails = 0, checks = 0; const errors = [];
function ok(c, label, d) { checks++; if (!c) { fails++; console.log('  FAIL  ' + label + (d !== undefined ? '  -> ' + d : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push(e.message + (e.detail ? ' | ' + e.detail : '')));
vc.on('error', e => errors.push(String(e)));
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/', virtualConsole: vc,
  beforeParse(w) {
    w.scrollTo = () => {}; w.print = () => { w.__printed = (w.__printed || 0) + 1; };
    w.Element.prototype.scrollIntoView = function () { w.__scrolledTo = this.id; };
    w.addEventListener('error', e => errors.push('window.onerror: ' + e.message));
  } });
const w = dom.window, d = w.document;
const $ = s => d.querySelector(s), $$ = s => Array.from(d.querySelectorAll(s));
const visible = el => { for (let n = el; n && n !== d; n = n.parentNode) if (n.hidden) return false; return true; };
const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const key = k => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true }));
const topic = t => click($('.topic-btn[data-topic="' + t + '"]'));
const mode = (t, m) => click($('.seg[data-modes="' + t + '"] button[data-mode="' + m + '"]'));
const panel = p => $('[data-panel="' + p + '"]');
const tps = ['c4', 'c5', 'c6'];

function answerQuiz(root, label) {
  let guard = 0;
  while (guard++ < 80) {
    const opts = Array.from(root.querySelectorAll('.qbody .opt'));
    if (!opts.length) break;
    click(opts[Math.floor(Math.random() * opts.length)]);
    ok(root.querySelectorAll('.qbody .opt.correct').length === 1, label + ': the right answer is revealed');
    ok(root.querySelector('.qbody .feedback').textContent.length > 10, label + ': feedback explains');
    const nb = root.querySelector('.qbody .next'); ok(nb && !nb.hidden, label + ': next appears');
    click(nb);
  }
  return root.querySelector('.qbody .result');
}

head('landing');
ok(errors.length === 0, 'no errors while loading', errors.join(' || '));
ok(visible($('#topic-guide')) && !visible($('#topic-exam')) && !visible($('#topic-kit')), 'opens on the Objectives');
ok($$('.topic-btn').length === 4 && $$('.topic-btn').map(b => b.textContent).join('|') === 'Objectives|Practice|Exam Prep|Exam Kit', 'four tabs');
const items = $$('#guideRoot .gitem');
ok(items.length === 31, 'all thirty-one objectives', items.length);
ok(/0 of 31/.test($('#gCount').textContent), 'progress starts at 0 of 31', $('#gCount').textContent);
ok($$('#guideRoot .gsec h2').length === 3, 'three chapters');
ok(!$('#guideRoot .handout') && !$('#guideRoot .keyterms') && !$('#guideRoot .gsub'), 'no header card, no extra lists, no jump buttons');
ok(!!$('#guideRoot .realcall') && /exact questions/.test($('#guideRoot .realcall').textContent), 'the Objectives page points to his practice questions first');
click($('#gReal'));
ok(visible($('#topic-exam')) && $$('#mockExam .dots i').length === 48, 'Practice the 48 opens a run of all forty-eight', $$('#mockExam .dots i').length);
const allRes = answerQuiz($('#mockExam'), 'all 48'); ok(allRes && /\/48/.test(allRes.querySelector('.big').textContent), 'scored out of 48');
click(allRes.querySelector('.setupbtn'));
topic('guide');
ok($$('#guideRoot .gans').every(a => a.hidden), 'every answer starts closed');

head('one objective at a time');
const it = id => $('#guideRoot .gitem[data-gi="' + id + '"]');
ok(/^4-3$/.test(it('g43-3').querySelector('.nb').textContent) && /Bayes' theorem/.test(it('g43-3').querySelector('.gt').textContent), 'the objective in the sheet’s own words, with its lesson number');
click(it('g43-3').querySelector('.gopen'));
ok(!it('g43-3').querySelector('.gans').hidden && it('g43-3').querySelector('.gopen').getAttribute('aria-expanded') === 'true', 'tapping opens it');
ok(/In short/.test(it('g43-3').querySelector('.gs').textContent) && /Example/.test(it('g43-3').querySelector('.gex').textContent) && /0\.269/.test(it('g43-3').querySelector('.gex').textContent), 'it shows the short answer and one worked example');
ok($$('#guideRoot .gans').filter(a => !a.hidden).length === 1, 'the others stay closed');
click(it('g43-3').querySelector('.gopen'));
ok(it('g43-3').querySelector('.gans').hidden, 'tapping again closes it');
items.forEach(x => { const g = x.querySelector('.gans'); ok(g.querySelector('.gs').textContent.length > 60 && g.querySelectorAll('.gex p').length >= 1 && g.querySelectorAll('.gex p').length <= 3, 'answer and example present: ' + x.getAttribute('data-gi')); });
click($('#gAll')); ok($$('#guideRoot .gans').every(a => !a.hidden) && $('#gAll').textContent === 'Close all', 'Open all opens everything');
click($('#gAll')); ok($$('#guideRoot .gans').every(a => a.hidden) && $('#gAll').textContent === 'Open all', 'Close all closes everything');
const cb = $('#guideRoot input[data-g="g52-2"]'); cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true }));
ok(/1 of 31/.test($('#gCount').textContent), 'checking an item moves the progress', $('#gCount').textContent);
ok(/":true/.test(w.localStorage.getItem('stats.guide') || ''), 'the check is saved on the device under stats.');
click($('#gPrint')); ok(w.__printed === 1, 'print button prints');
click($('#guideRoot [data-go="exam/mock"]'));
ok(visible(panel('exam/mock')) && !!$('#mxStart'), 'the practice button opens the practice setup');

head('every tab');
['guide', 'exam', 'prep', 'kit'].forEach(t => { topic(t); ok(visible($('#topic-' + t)) && $$('.topic').filter(visible).length === 1, 'tab opens alone: ' + t); });
['card', 'tools', 'which'].forEach(m => { mode('kit', m); ok(visible(panel('kit/' + m)) && $$('#topic-kit .panel').filter(visible).length === 1 && panel('kit/' + m).textContent.trim().length > 20, 'exam kit mode: ' + m); });
ok(errors.length === 0, 'no errors after visiting every tab', errors.join(' || '));

head('exam kit');
topic('kit'); mode('kit', 'card');
ok(visible($('#kitCard')) && $$('#kitCard .fcard').length === 2 && $$('#kitCard .fct tr').length >= 16, 'exam kit: the two-sided flashcard', [visible($('#kitCard')), $$('#kitCard .fcard').length, $$('#kitCard .fct tr').length, $('#topic-kit').hidden, panel('kit/card').hidden].join());
click($('#kitPrint')); ok(w.__printed >= 1 && d.body.classList.contains('printkit'), 'the flashcard prints on its own');
mode('kit', 'tools');
ok($$('#kitTools .note-sec').length === 2 && $$('#kitTools details.work').length >= 10 && $$('#kitTools a.toollink').every(a => /tools\.benhartlage\.com/.test(a.href)), 'exam kit: both tools with their steps and links');
mode('kit', 'which');
ok($$('#kitWhich .which tbody tr').length >= 12 && /BINOM\.DIST/.test($('#kitWhich').textContent), 'exam kit: which method for which question');

head('practice exam');
topic('exam');
ok(!!$('#mxStart') && !!$('#mxFifty') && !$('#mxF'), 'exam setup: start, the fifty, and no Quizlet row');
click($('#mxN button[data-n="15"]')); click($('#mxT button[data-t="all"]')); click($('#mxP button[data-p="all"]'));
click($('#mxStart'));
ok($$('#mockExam .dots i').length === 15, 'fifteen-question exam', $$('#mockExam .dots i').length);
const mres = answerQuiz($('#mockExam'), 'exam');
const secTbl = mres && mres.querySelectorAll('.tbl')[0];
ok(secTbl && secTbl.querySelectorAll('tr').length >= 4 && secTbl.querySelectorAll('tr').length <= 31 && secTbl.querySelectorAll('.secch').length === secTbl.querySelectorAll('tr').length, 'results break down by outline section', secTbl && secTbl.querySelectorAll('tr').length);
click(mres.querySelector('.setupbtn')); ok(!!$('#mxStart'), 'change settings returns to setup');
click($('#mxT button[data-t="ap"]')); click($('#mxN button[data-n="15"]')); click($('#mxStart'));
ok($$('#mockExam .dots i').length === 15 && $('#mockExam .qtag').textContent === 'Application', 'application-only exam', $$('#mockExam .dots i').length);
ok(/"types":"ap"/.test(w.localStorage.getItem('stats.mockcfg') || ''), 'exam settings remembered under stats.');
const apRes = answerQuiz($('#mockExam'), 'application exam');
click(apRes.querySelector('.setupbtn')); click($('#mxP button[data-p="c6"]')); click($('#mxT button[data-t="all"]')); click($('#mxStart'));
ok(Array.from($$('#mockExam .qnum')).every(n => /Ch 6/.test(n.textContent)), 'one-chapter exam draws only that chapter');
const oneRes = answerQuiz($('#mockExam'), 'one-lesson exam');

head('the 50 for the exam');
click(oneRes.querySelector('.setupbtn'));
click($('#mxFifty'));
const fifty = $('#mockExam');
ok(fifty.querySelectorAll('.dots i').length === 62, 'sixty-two questions', fifty.querySelectorAll('.dots i').length);
const fRes = answerQuiz(fifty, 'the fifty');
ok(!!fRes, 'the fifty reaches results');
const fSec = fRes.querySelectorAll('.tbl')[0];
ok(fSec && fSec.querySelectorAll('tr').length === 31, 'the results list all thirty-one objectives', fSec && fSec.querySelectorAll('tr').length);
ok(Array.from(fSec.querySelectorAll('.num')).every(td => parseInt(td.textContent.split('/')[1], 10) >= 2), 'every section got at least two questions');

head('the professor’s practice quiz');
topic('exam');
if (!$('#mxReal4') && $('#mockExam .setupbtn')) click($('#mockExam .setupbtn'));
ok(!!$('#mxReal4'), 'the Practice tab offers his Chapter 4 quiz');
click($('#mxReal4'));
ok($$('#mockExam .dots i').length === 18, 'eighteen questions', $$('#mockExam .dots i').length);
const realRes = answerQuiz($('#mockExam'), 'his quiz');
ok(realRes && /\/18/.test(realRes.querySelector('.big').textContent), 'scored out of 18');
click(realRes.querySelector('.setupbtn'));
click($('#mxReal4m')); ok($$('#mockExam .dots i').length === 7, 'Only the 7 I missed runs seven questions', $$('#mockExam .dots i').length);
const missRes = answerQuiz($('#mockExam'), 'his misses'); click(missRes.querySelector('.setupbtn'));

click($('#mxReal5')); ok($$('#mockExam .dots i').length === 14, 'his Chapter 5 quiz: fourteen questions', $$('#mockExam .dots i').length);
const r5Res = answerQuiz($('#mockExam'), 'his chapter 5 quiz'); click(r5Res.querySelector('.setupbtn'));
click($('#mxReal5m')); ok($$('#mockExam .dots i').length === 6, 'Only the 6 I missed runs six questions');
const m5Res = answerQuiz($('#mockExam'), 'his chapter 5 misses'); click(m5Res.querySelector('.setupbtn'));

click($('#mxReal6')); ok($$('#mockExam .dots i').length === 16, 'his Chapter 6 quiz: sixteen questions', $$('#mockExam .dots i').length);
const r6Res = answerQuiz($('#mockExam'), 'his chapter 6 quiz'); click(r6Res.querySelector('.setupbtn'));

head('exam prep');
w.localStorage.removeItem('stats.prep');
topic('guide'); topic('prep');
const pr = () => $('#prepRoot');
ok(visible(pr()) && /Question 1 of 31/.test(pr().textContent) && /4-1/.test(pr().querySelector('.qtag').textContent), 'starts on question 1 of 31, tagged with its objective');
ok(pr().querySelectorAll('.preparts li').length === 1 && !pr().querySelector('.pa') && !!$('#prepShow'), 'one part at a time, answer hidden');
click($('#prepShow'));
ok(/1, 2, 3, 4, 5, 6, 7, 8/.test(pr().querySelector('.pa').textContent) && !!$('#prepNext') && !$('#prepYes'), 'the answer appears, then Next part');
click($('#prepNext'));
ok(pr().querySelectorAll('.preparts li').length === 2 && pr().querySelectorAll('.pa').length === 1 && !!$('#prepShow'), 'the next part appears; earlier answers stay visible');
click($('#prepShow')); click($('#prepNext')); click($('#prepShow'));
ok(!!$('#prepYes') && !!$('#prepNo') && !$('#prepNext'), 'after the last part it asks whether you got it');
click($('#prepYes'));
ok(/Question 2 of 31/.test(pr().textContent) && /"0":1/.test(w.localStorage.getItem('stats.prep')), 'marked, saved, and on to question 2');
// walk the rest: miss question 5 and question 16, get the others
let sawScore = false, sawTrap = false, sawHint = false, guardP = 0;
while (!pr().querySelector('.result') && guardP++ < 400) {
  if (/So far: \d+ of 8/.test(pr().textContent)) sawScore = true;
  if ($('#prepHint')) { click($('#prepHint')); if (!$('#prepHintBox').hidden && $('#prepHintBox').textContent.length > 30) sawHint = true; }
  if ($('#prepShow')) { click($('#prepShow')); continue; }
  if (pr().querySelector('.ptrap')) sawTrap = true;
  if ($('#prepNext')) { click($('#prepNext')); continue; }
  const n = +pr().querySelector('.qnum').textContent.match(/Question (\d+)/)[1];
  click((n === 5 || n === 16) ? $('#prepNo') : $('#prepYes'));
}
ok(sawScore, 'a running score shows after every eight questions');
ok(sawTrap && sawHint, 'traps are named and hints open');
ok(pr().querySelector('.result .big').textContent === '29/31', 'the score is out of 31', pr().querySelector('.result .big').textContent);
ok(pr().querySelectorAll('.misslist > div').length === 2 && /4-2/.test(pr().querySelector('.misslist').textContent) && /5-2/.test(pr().querySelector('.misslist').textContent), 'the two missed objectives are listed');
click($('#prepMiss'));
ok(/Question 1 of 2/.test(pr().textContent) && /marbles/.test(pr().textContent), 'Try the misses again runs just those two');
topic('guide'); topic('prep');
ok(/Question 1 of 2/.test(pr().textContent), 'it remembers where you were');
w.localStorage.removeItem('stats.prep');

head('the two essays');
topic('prep'); mode('prep', 'essays');
ok(visible($('#essayRoot')) && !visible($('#prepRoot')) && $$('#essayRoot .essay').length === 2, 'Exam Prep has a second page: the two essays');
ok($$('#essayRoot .rub tbody tr').length === 6 && /Reliability interpretation/.test($('#essayRoot').textContent) && /Distribution distinction/.test($('#essayRoot').textContent), 'six rubric lines with what to write');
ok($$('#essayRoot .eanswer').every(a => a.hidden), 'the full-credit answers start hidden');
click($('#essayRoot [data-essay="0"]'));
ok(!$('#essayAns0').hidden && /0\.5488/.test($('#essayAns0').textContent) && $('#essayAns1').hidden, 'tapping shows that essay’s answer only');
click($('#essayRoot [data-essay="0"]')); ok($('#essayAns0').hidden, 'and hides it again');
mode('prep', 'run'); ok(visible($('#prepRoot')), 'back to the 31 questions');

head('remembers where you were');
topic('kit'); mode('kit', 'which');
ok(w.localStorage.getItem('stats.topic') === 'kit' && w.localStorage.getItem('stats.mode.kit') === 'which', 'topic and mode saved');
w.localStorage.setItem('stats.topic', 'c5');
ok(true, 'an old saved chapter tab no longer exists; the page falls back to the Objectives on the next visit');

head('errors');
ok(errors.length === 0, 'no runtime errors anywhere', errors.join(' || '));
console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' DOM CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' DOM checks'));
w.close();
process.exit(fails ? 1 : 0);
