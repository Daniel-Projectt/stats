/* ================================================================ Chapter 4 · Probability */
CH.c4 = {n:"4", title:"Probability", short:"Ch 4", ref:"Sections 4-1 to 4-4",
 notes:[
  {id:"c4-basics", h:"4-1 · Outcome, event, sample space; zero to one", body:
   '<div class="point"><b>The point</b><p>Three words for three sizes: an <mark>outcome</mark> is one single result, an <mark>event</mark> is any group of outcomes you care about, and the <mark>sample space</mark> is the list of every possible outcome. A probability is a number <mark>from 0 to 1</mark>.</p><p class="able"><b>Be able to</b> label the outcome, the event and the sample space in a story, and say what a probability of 0, 0.5 or 1 means.</p></div>'+
   '<ul><li><b>Roll one die.</b> Sample space: {1, 2, 3, 4, 5, 6}. One outcome: “a 4”. An event: “an even number” = {2, 4, 6}.</li>'+
   '<li>An event made of exactly one outcome is a <b>simple event</b>.</li></ul>'+
   '<h3 class="sub" id="c4-scale">Zero to one</h3>'+
   '<div class="tblwrap"><table class="tbl n0"><tbody>'+
   '<tr><td class="head">0</td><td class="sm"><mark>Impossible</mark>: rolling a 7 on one die.</td></tr>'+
   '<tr><td class="head">0.05 or less</td><td class="sm">Unlikely enough to call <b>significant</b> if it happens.</td></tr>'+
   '<tr><td class="head">0.5</td><td class="sm">As likely as not: heads on a fair coin.</td></tr>'+
   '<tr><td class="head">1</td><td class="sm"><mark>Certain</mark>: rolling a number below 7.</td></tr></tbody></table></div>'+
   '<p>A probability can <mark>never be negative or bigger than 1</mark>. If your answer is 1.3 or −0.2, something went wrong.</p>'},

  {id:"c4-approach", h:"4-1 · Three ways to find a probability", body:
   '<div class="point"><b>The point</b><p>Which method you use depends on <mark>what information you have</mark>: equal chances, past data, or neither.</p><p class="able"><b>Be able to</b> find a probability each way and say which approach a situation calls for.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>Approach</th><th>Use it when</th><th>How</th></tr></thead><tbody>'+
   '<tr><td class="head">Classical</td><td class="sm">Every outcome is <mark>equally likely</mark> (dice, cards, a fair coin)</td><td class="sm">'+FR('ways the event can happen','total outcomes')+'</td></tr>'+
   '<tr><td class="head">Relative frequency</td><td class="sm">You have <mark>data from past trials</mark></td><td class="sm">'+FR('times it happened','times you tried')+'</td></tr>'+
   '<tr><td class="head">Subjective</td><td class="sm">Neither: a one-time event</td><td class="sm">An <mark>informed judgment</mark> from what you know</td></tr></tbody></table></div>'+
   '<ul><li><b>Classical:</b> P(heart from a deck) = 13 ÷ 52 = <b>0.25</b>.</li>'+
   '<li><b>Relative frequency:</b> 30 of 600 orders were returned → P(return) ≈ 30 ÷ 600 = <b>0.05</b>. It is an <b>estimate</b>; more data makes it better.</li>'+
   '<li><b>Subjective:</b> “There is a 70% chance our new store breaks even in year one.”</li></ul>'},

  {id:"c4-lln", h:"4-1 · The law of large numbers", body:
   '<div class="point"><b>The point</b><p>As a procedure is repeated <mark>again and again</mark>, the relative frequency of an event <mark>settles toward its true probability</mark>. It is a statement about the long run only.</p><p class="able"><b>Be able to</b> state the law and explain why it promises nothing about the next trial.</p></div>'+
   '<ul><li>Flip a coin 10 times and you might see 70% heads. Flip it 10,000 times and you will be very near 50%.</li>'+
   '<li>This is why a relative-frequency estimate from <b>many</b> trials is trusted more than one from a few.</li></ul>'+
   '<h3 class="sub" id="c4-gambler">The gambler’s fallacy</h3>'+
   '<ul><li>After five heads in a row, tails is <mark>not “due”</mark>. The coin has no memory; the next flip is still 0.5.</li>'+
   '<li>The early streak is never paid back. It is <mark>diluted</mark>: five extra heads matter a lot in 10 flips and almost nothing in 10,000.</li>'+
   '<li>So the long-run pattern <b>neither guarantees the next result nor requires earlier outcomes to balance</b>.</li></ul>'},

  {id:"c4-add", h:"4-2 · The addition rule (“or”)", body:
   '<div class="point"><b>The point</b><p><mark>P(A or B) = P(A) + P(B) − P(A and B)</mark>. “Or” means A, or B, or both. Outcomes that are in both get counted twice when you add, so you <mark>subtract the overlap once</mark>.</p><p class="able"><b>Be able to</b> use the rule, find the overlap, and explain the subtraction.</p></div>'+
   '<ul><li><b>One card: P(king or heart).</b> Kings 4, hearts 13, and the <b>king of hearts</b> is in both. (4 + 13 − 1) ÷ 52 = 16 ÷ 52 = <b>0.308</b>.</li>'+
   '<li><b>Mutually exclusive</b> (disjoint) events cannot happen together, so the overlap is 0 and you just add: P(king or queen) = 4/52 + 4/52 = <b>0.154</b>.</li></ul>'+
   '<div class="exam-tip"><b>Why subtract once</b>Adding P(A) and P(B) counts the shared outcomes two times. Subtracting P(A and B) one time leaves each of them counted exactly once.</div>'},

  {id:"c4-mult", h:"4-2 · The multiplication rule (“and”); independent vs mutually exclusive", body:
   '<div class="point"><b>The point</b><p><mark>P(A and B) = P(A) × P(B given A)</mark>. If the events are <mark>independent</mark>, the second chance does not change, and it is simply P(A) × P(B).</p><p class="able"><b>Be able to</b> multiply for “and”, tell independent from mutually exclusive, and handle with and without replacement.</p></div>'+
   '<h3 class="sub" id="c4-indep">Independent vs mutually exclusive</h3>'+
   '<div class="tblwrap"><table class="tbl n0"><tbody>'+
   '<tr><td class="head">Independent</td><td class="sm">One happening <mark>does not change the chance</mark> of the other. Two coin flips.</td></tr>'+
   '<tr><td class="head">Mutually exclusive</td><td class="sm">They <mark>cannot both happen</mark>. One card being both a king and a queen.</td></tr></tbody></table></div>'+
   '<p>They are <b>not the same thing</b>, and they clash: if A and B are mutually exclusive and each has a chance above 0, then knowing A happened drops B’s chance to 0. B’s chance changed, so the events are <mark>dependent</mark>.</p>'+
   '<h3 class="sub" id="c4-replace">Replacement</h3>'+
   '<ul><li><b>With replacement</b> the pool is the same each time: independent. Two aces: 4/52 × 4/52 = <b>0.0059</b>.</li>'+
   '<li><b>Without replacement</b> the pool shrinks: dependent. Two aces: 4/52 × <mark>3/51</mark> = <b>0.0045</b>.</li>'+
   '<li><b>The 5% guideline:</b> when the sample is no more than 5% of a large population, you may treat the picks as independent.</li></ul>'},

  {id:"c4-comp", h:"4-3 · Complements and “at least one”", body:
   '<div class="point"><b>The point</b><p>The complement of an event is <mark>everything else</mark>: P(not A) = 1 − P(A). For “at least one”, the complement is <mark>“none”</mark>, which is far easier to compute.</p><p class="able"><b>Be able to</b> state the complement of an event and find P(at least one) = 1 − P(none).</p></div>'+
   '<h3 class="sub" id="c4-atleast">At least one</h3>'+
   '<ol><li>Say the opposite: the opposite of “at least one defect” is “<b>no defects at all</b>”.</li>'+
   '<li>Find P(none) by multiplying.</li><li>Subtract from 1.</li></ol>'+
   '<p><b>Example.</b> Each of 5 parts has a 10% chance of being defective, independently. P(none) = 0.9⁵ = 0.5905, so <mark>P(at least one) = 1 − 0.5905 = 0.4095</mark>.</p>'+
   '<div class="exam-tip"><b>At least one is not exactly one</b>“At least one” means 1 or 2 or 3 or more. “Exactly one” is just the single case: here 5 × 0.1 × 0.9⁴ = 0.3281, a smaller number.</div>'},

  {id:"c4-cond", h:"4-3 · Conditional and joint probability from a table", body:
   '<div class="point"><b>The point</b><p>A <mark>joint</mark> probability is A <b>and</b> B together, out of everyone. A <mark>conditional</mark> probability is A <b>given</b> B: out of B’s group only.</p><p class="able"><b>Be able to</b> read both off a two-way table and explain the denominator.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th></th><th>Returned</th><th>Kept</th><th>Total</th></tr></thead><tbody>'+
   '<tr><td class="head">Online</td><td class="num">30</td><td class="num">70</td><td class="num">100</td></tr>'+
   '<tr><td class="head">In store</td><td class="num">10</td><td class="num">90</td><td class="num">100</td></tr>'+
   '<tr><td class="head">Total</td><td class="num">40</td><td class="num">160</td><td class="num">200</td></tr></tbody></table></div>'+
   '<ul><li><b>Joint:</b> P(online <b>and</b> returned) = 30 ÷ <mark>200</mark> = <b>0.15</b>.</li>'+
   '<li><b>Conditional:</b> P(returned <b>given</b> online) = 30 ÷ <mark>100</mark> = <b>0.30</b>.</li>'+
   '<li><b>The other way round:</b> P(online <b>given</b> returned) = 30 ÷ <mark>40</mark> = <b>0.75</b>. A different question, a different answer.</li></ul>'+
   '<div class="exam-tip"><b>Why that denominator</b>“Given online” tells you the order was online, so the in-store orders are out of the picture. The online row (100) is now the whole group you are choosing from.</div>'+
   '<p>As a formula: P(A | B) = P(A and B) ÷ P(B) = 0.15 ÷ 0.50 = 0.30.</p>'},

  {id:"c4-bayes", h:"4-3 · Bayes’ theorem", body:
   '<div class="point"><b>The point</b><p>Bayes’ theorem <mark>turns a conditional probability around</mark>: from P(evidence given the source) to P(source given the evidence). Those two are <mark>different numbers</mark>, and mixing them up is the classic mistake.</p><p class="able"><b>Be able to</b> update a probability with Bayes and say which direction each number runs.</p></div>'+
   '<p>'+FR('P(evidence | A) × P(A)','P(evidence | A) × P(A) + P(evidence | not A) × P(not A)')+' = P(A | evidence)</p>'+
   '<ul><li><b>Prior</b> P(A): what you believed before the evidence (the base rate).</li>'+
   '<li><b>Posterior</b> P(A | evidence): the updated belief.</li>'+
   '<li>The top of the fraction is the <b>true flags</b>; the bottom is <b>all the flags</b>, true and false.</li></ul>'+
   '<p><b>Example.</b> 2% of transactions are fraud. The system flags 90% of fraud and 5% of honest ones. A transaction is flagged. P(fraud | flag) = (0.90 × 0.02) ÷ (0.90 × 0.02 + 0.05 × 0.98) = 0.018 ÷ 0.067 = <mark>0.269</mark>.</p>'+
   '<div class="exam-tip"><b>Do not confuse them</b>P(flag | fraud) = 0.90 is how good the system is at catching fraud. P(fraud | flag) = 0.269 is what a flag actually tells you. They answer opposite questions.</div>'},

  {id:"c4-screen", h:"4-3 · Screening with a table; why base rates matter", body:
   '<div class="point"><b>The point</b><p>Skip the formula: <mark>imagine 10,000 cases</mark> and fill in a table. The answer is one cell divided by a row or column total.</p><p class="able"><b>Be able to</b> build the table, read the updated probability, and explain what a low base rate does to it.</p></div>'+
   '<h3 class="sub" id="c4-table">The 10,000 table</h3>'+
   '<p>Same fraud system: base rate 2%, catches 90% of fraud, wrongly flags 5% of honest transactions.</p>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th></th><th>Flagged</th><th>Not flagged</th><th>Total</th></tr></thead><tbody>'+
   '<tr><td class="head">Fraud</td><td class="num">180</td><td class="num">20</td><td class="num">200</td></tr>'+
   '<tr><td class="head">Honest</td><td class="num">490</td><td class="num">9,310</td><td class="num">9,800</td></tr>'+
   '<tr><td class="head">Total</td><td class="num">670</td><td class="num">9,330</td><td class="num">10,000</td></tr></tbody></table></div>'+
   '<ol><li>Split 10,000 by the base rate: 2% → <b>200</b> fraud, 9,800 honest.</li>'+
   '<li>Apply each rate: 90% of 200 = <b>180</b>; 5% of 9,800 = <b>490</b>.</li>'+
   '<li>Read down the flagged column: 180 ÷ 670 = <mark>0.269</mark>.</li></ol>'+
   '<p>In Excel it is the same arithmetic: '+XL('=0.9*0.02/(0.9*0.02+0.05*0.98)')+'.</p>'+
   '<h3 class="sub" id="c4-base">Why base rates matter</h3>'+
   '<ul><li>Fraud is <mark>rare</mark>, so the honest group is huge. Even a small 5% error rate on a huge group (490) swamps the true catches (180).</li>'+
   '<li>So most flags are <mark>false alarms</mark>, even with a good system. Raise the base rate and the same system becomes far more believable.</li>'+
   '<li><b>The decision:</b> a flag is a reason to <b>look again</b>, not to freeze the account. A second, independent check is worth its cost.</li></ul>'},

  {id:"c4-count", h:"4-4 · The counting rule and factorials", body:
   '<div class="point"><b>The point</b><p>To count how many ways a multi-step thing can happen, <mark>multiply the number of choices at each stage</mark>. A factorial, <mark>n!</mark>, counts the orders of n different items.</p><p class="able"><b>Be able to</b> identify the choices at each stage, use n!, and keep counts apart from probabilities.</p></div>'+
   '<ul><li><b>Counting rule:</b> 4 shirts and 3 pants → 4 × 3 = <b>12</b> outfits.</li>'+
   '<li><b>A code:</b> 2 letters then 3 digits, repeats allowed → 26 × 26 × 10 × 10 × 10 = <b>676,000</b>.</li>'+
   '<li><b>Factorial:</b> 5! = 5 × 4 × 3 × 2 × 1 = <b>120</b> ways to line up 5 people. In Excel '+XL('=FACT(5)')+'. And 0! = 1.</li></ul>'+
   '<div class="exam-tip"><b>Counting is not probability</b>Multiplying choices gives a <mark>whole number of outcomes</mark> (12 outfits). Multiplying probabilities gives a <mark>number between 0 and 1</mark>. To turn a count into a probability, divide: favorable outcomes ÷ total outcomes.</div>'},

  {id:"c4-perm", h:"4-4 · Permutations vs combinations", body:
   '<div class="point"><b>The point</b><p>Ask two things first: <mark>does order matter?</mark> and <mark>can items repeat?</mark> Order matters → <b>permutation</b>. Order does not matter → <b>combination</b>.</p><p class="able"><b>Be able to</b> choose the method, compute it, and use counts to build a probability.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th></th><th>Order matters?</th><th>Formula</th><th>10 choose 3</th></tr></thead><tbody>'+
   '<tr><td class="head">Permutation</td><td class="sm"><mark>Yes</mark>: ranks, titles, a schedule</td><td class="sm">'+FR('n!','(n − r)!')+'</td><td class="sm">10 × 9 × 8 = <b>720</b> · '+XL('=PERMUT(10,3)')+'</td></tr>'+
   '<tr><td class="head">Combination</td><td class="sm"><mark>No</mark>: a team, a committee, a hand</td><td class="sm">'+FR('n!','r!(n − r)!')+'</td><td class="sm">720 ÷ 3! = <b>120</b> · '+XL('=COMBIN(10,3)')+'</td></tr></tbody></table></div>'+
   '<ul><li>Choosing a president, a VP and a treasurer from 10 people: order matters → <b>720</b>.</li>'+
   '<li>Choosing a committee of 3 from 10 people: the same three are one committee in any order → <b>120</b>.</li>'+
   '<li><b>Repetition allowed</b> (a PIN, a license plate): use plain multiplication instead, like 10 × 10 × 10 × 10.</li>'+
   '<li><b>From counts to a probability:</b> one winning ticket out of all the combinations is 1 ÷ COMBIN(n, r).</li></ul>'+
   '<p>There are always <mark>fewer combinations than permutations</mark>, because the combinations stop counting the different orders.</p>'}
 ],
 decks:[
  {id:"terms", label:"Terms & rules", cards:[
   ["Outcome","One single result of a procedure","g41-1"],
   ["Event","Any collection of outcomes","g41-1"],
   ["Sample space","The list of every possible outcome","g41-1"],
   ["A probability of 0","The event is impossible","g41-1"],
   ["A probability of 1","The event is certain","g41-1"],
   ["Classical approach","Equally likely outcomes: favorable ÷ total","g41-2"],
   ["Relative frequency approach","From past data: times it happened ÷ times tried","g41-2"],
   ["Subjective probability","An informed judgment, for a one-time event","g41-2"],
   ["Law of large numbers","Over many trials the relative frequency nears the true probability","g41-3"],
   ["Gambler’s fallacy","Believing an outcome is “due” after a streak","g41-3"],
   ["Addition rule","P(A or B) = P(A) + P(B) − P(A and B)","g42-1"],
   ["Mutually exclusive events","Events that cannot both happen","g42-1"],
   ["Multiplication rule","P(A and B) = P(A) × P(B given A)","g42-2"],
   ["Independent events","One happening does not change the other’s chance","g42-2"],
   ["Sampling without replacement","The pool shrinks, so the picks are dependent","g42-2"],
   ["Complement rule","P(not A) = 1 − P(A)","g43-1"],
   ["P(at least one)","1 − P(none)","g43-1"],
   ["Joint probability","A and B together, out of the grand total","g43-2"],
   ["Conditional probability","A given B: the cell ÷ B’s total","g43-2"],
   ["Bayes’ theorem","Turns P(evidence | source) into P(source | evidence)","g43-3"],
   ["Prior probability","The belief before the evidence: the base rate","g43-3"],
   ["Base rate","How common the condition is to begin with","g43-4"],
   ["False positive","A flag on a case that is actually fine","g43-4"],
   ["Multiplication counting rule","Multiply the choices at each stage","g44-1"],
   ["n! (factorial)","The number of ways to order n different items","g44-1"],
   ["Permutation","A selection where order matters","g44-2"],
   ["Combination","A selection where order does not matter","g44-2"]]},
  {id:"numbers", label:"Worked numbers", cards:[
   ["P(heart) from one card","13 ÷ 52 = 0.25","g41-2"],
   ["30 returns in 600 orders: P(return)","30 ÷ 600 = 0.05","g41-2"],
   ["P(king or heart)","(4 + 13 − 1) ÷ 52 = 0.308","g42-1"],
   ["P(king or queen)","4/52 + 4/52 = 0.154 (no overlap)","g42-1"],
   ["Two aces, with replacement","4/52 × 4/52 = 0.0059","g42-2"],
   ["Two aces, without replacement","4/52 × 3/51 = 0.0045","g42-2"],
   ["5 parts, 10% defective each: at least one defect","1 − 0.9⁵ = 0.4095","g43-1"],
   ["5 parts, 10% defective each: exactly one defect","5 × 0.1 × 0.9⁴ = 0.3281","g43-1"],
   ["Table: P(online and returned)","30 ÷ 200 = 0.15","g43-2"],
   ["Table: P(returned | online)","30 ÷ 100 = 0.30","g43-2"],
   ["Table: P(online | returned)","30 ÷ 40 = 0.75","g43-2"],
   ["Fraud 2%, catches 90%, false flags 5%: P(fraud | flag)","180 ÷ 670 = 0.269","g43-3"],
   ["In 10,000 transactions at a 2% base rate","200 fraud and 9,800 honest","g43-4"],
   ["4 shirts and 3 pants","4 × 3 = 12 outfits","g44-1"],
   ["5!","120","g44-1"],
   ["2 letters then 3 digits, repeats allowed","26 × 26 × 10 × 10 × 10 = 676,000","g44-1"],
   ["President, VP, treasurer from 10","PERMUT(10,3) = 720","g44-2"],
   ["A committee of 3 from 10","COMBIN(10,3) = 120","g44-2"]]}
 ]
};

QB = QB.concat([
 /* 4-1 basics */
 {tp:"c4",sec:"g41-1",t:"mc",q:"A die is rolled. Which of these is the sample space?",a:"{1, 2, 3, 4, 5, 6}",w:["{2, 4, 6}","Rolling a 4","The number 6"],e:"The sample space lists every possible outcome; {2, 4, 6} is an event and “a 4” is one outcome."},
 {tp:"c4",sec:"g41-1",t:"mc",q:"A die is rolled. “Getting an even number” is best called:",a:"an event",w:["an outcome","the sample space","a parameter"],e:"An event is a collection of outcomes: here 2, 4 and 6."},
 {tp:"c4",sec:"g41-1",t:"mc",q:"An event has probability 0. That means it is:",a:"impossible",w:["certain","unlikely but possible","as likely as not"],e:"0 is impossible, 1 is certain, and everything else falls between them."},
 {tp:"c4",sec:"g41-1",t:"mc",q:"Which of these cannot be a probability?",a:"1.2",w:["0","0.999","0.05"],e:"Probabilities run from 0 to 1 inclusive, so 1.2 is not possible."},
 {tp:"c4",sec:"g41-1",t:"tf",q:"An outcome and an event are always the same thing.",a:false,e:"False — an outcome is one single result, while an event can contain many of them."},
 /* 4-1 approaches */
 {tp:"c4",sec:"g41-2",t:"mc",q:"A store finds that 30 of its last 600 orders were returned. Estimating P(return) = 0.05 uses which approach?",a:"Relative frequency",w:["Classical","Subjective","Complement"],e:"It comes from observed past data: times it happened divided by times tried."},
 {tp:"c4",sec:"g41-2",t:"mc",q:"P(drawing a heart from a full deck) = 13/52 uses which approach?",a:"Classical",w:["Relative frequency","Subjective","Bayes’ theorem"],e:"Every card is equally likely, so you count favorable outcomes over total outcomes."},
 {tp:"c4",sec:"g41-2",t:"mc",q:"An analyst says a brand-new product has a 60% chance of success. Which approach is that?",a:"Subjective",w:["Classical","Relative frequency","Law of large numbers"],e:"A one-time event with no equal outcomes and no past trials calls for informed judgment."},
 {tp:"c4",sec:"g41-2",t:"mc",q:"The classical approach requires that the outcomes be:",a:"equally likely",w:["mutually exclusive only","observed many times","independent trials"],e:"Counting favorable over total only works when each outcome has the same chance."},
 {tp:"c4",sec:"g41-2",ap:true,t:"mc",q:"A factory wants the chance that a machine breaks down next month. It has three years of breakdown records. Which approach fits best?",a:"Relative frequency, from the records",w:["Classical, since outcomes are equal","Subjective, since it is the future","None: it cannot be estimated"],e:"Past data is available, and breakdown and no breakdown are not equally likely."},
 /* 4-1 law of large numbers */
 {tp:"c4",sec:"g41-3",t:"mc",q:"The law of large numbers says that as the number of trials grows, the relative frequency of an event:",a:"tends toward its true probability",w:["becomes exactly equal to 0.5","corrects for earlier streaks","stops changing after 30 trials"],e:"It is a long-run tendency, not a correction and not a guarantee for any single trial."},
 {tp:"c4",sec:"g41-3",t:"mc",q:"A fair coin lands heads five times in a row. The probability of heads on the next flip is:",a:"0.5",w:["less than 0.5","more than 0.5","0.03"],e:"The coin has no memory; each flip is independent of the ones before."},
 {tp:"c4",sec:"g41-3",t:"mc",q:"Why does an early streak not need to be “balanced out”?",a:"It is diluted by the many later trials",w:["Later trials reverse it exactly","The probability shifts to fix it","Streaks cannot happen by chance"],e:"Five extra heads are a big share of 10 flips and a tiny share of 10,000."},
 {tp:"c4",sec:"g41-3",t:"tf",q:"According to the law of large numbers, a result that has not happened for a long time becomes more likely on the next trial.",a:false,e:"False — that is the gambler’s fallacy; independent trials do not remember the past."},
 {tp:"c4",sec:"g41-3",ap:true,t:"mc",q:"Which estimate of a defect rate deserves more trust?",a:"12 defects in 4,000 units",w:["1 defect in 10 units","0 defects in 5 units","They are equally reliable"],e:"By the law of large numbers, more trials bring the relative frequency closer to the true rate."},
 /* 4-2 addition */
 {tp:"c4",sec:"g42-1",t:"mc",q:"P(A) = 0.5, P(B) = 0.4 and P(A and B) = 0.2. What is P(A or B)?",a:"0.7",w:["0.9","0.2","1.1"],e:"0.5 + 0.4 − 0.2 = 0.7; the overlap is subtracted once."},
 {tp:"c4",sec:"g42-1",t:"mc",q:"One card is drawn. P(king or heart) is:",a:"16/52",w:["17/52","13/52","4/52"],e:"4 kings + 13 hearts − 1 king of hearts = 16 cards."},
 {tp:"c4",sec:"g42-1",t:"mc",q:"Why is P(A and B) subtracted in the addition rule?",a:"The overlap was counted twice",w:["The overlap cannot occur","Probabilities must be under 0.5","A and B are independent"],e:"Adding P(A) and P(B) counts shared outcomes two times, so one copy is removed."},
 {tp:"c4",sec:"g42-1",t:"mc",q:"If A and B are mutually exclusive, P(A or B) equals:",a:"P(A) + P(B)",w:["P(A) × P(B)","P(A) + P(B) − 1","1 − P(A) × P(B)"],e:"With no overlap, P(A and B) is 0 and nothing is subtracted."},
 {tp:"c4",sec:"g42-1",t:"tf",q:"In the addition rule, “A or B” includes the case where both A and B happen.",a:true,e:"True — in probability “or” is inclusive: one, the other, or both together."},
 /* 4-2 multiplication */
 {tp:"c4",sec:"g42-2",t:"mc",q:"Two cards are drawn without replacement. P(both are aces) is:",a:"4/52 × 3/51",w:["4/52 × 4/52","4/52 + 3/51","4/52 × 4/51"],e:"After one ace is gone, 3 aces remain among 51 cards."},
 {tp:"c4",sec:"g42-2",t:"mc",q:"Events A and B are independent, with P(A) = 0.3 and P(B) = 0.5. P(A and B) is:",a:"0.15",w:["0.80","0.65","0.20"],e:"For independent events you multiply: 0.3 × 0.5 = 0.15."},
 {tp:"c4",sec:"g42-2",t:"mc",q:"Two events are independent when:",a:"one does not change the other’s probability",w:["they cannot happen together","their probabilities add to 1","they have equal probabilities"],e:"“Cannot happen together” describes mutually exclusive events, a different idea."},
 {tp:"c4",sec:"g42-2",t:"mc",q:"A and B are mutually exclusive and each has a positive probability. They must be:",a:"dependent",w:["independent","complements","equally likely"],e:"If A happens, B’s chance drops to 0, so A changes B’s probability."},
 {tp:"c4",sec:"g42-2",t:"mc",q:"Sampling with replacement makes successive selections:",a:"independent, with the same probabilities",w:["dependent, with smaller probabilities","mutually exclusive each time","impossible to multiply"],e:"Putting the item back restores the pool, so each draw has the same chances."},
 {tp:"c4",sec:"g42-2",t:"tf",q:"Independent events and mutually exclusive events mean the same thing.",a:false,e:"False — independent is about chances not changing; mutually exclusive is about never occurring together."},
 /* 4-3 complement */
 {tp:"c4",sec:"g43-1",t:"mc",q:"What is the complement of “at least one of the 5 parts is defective”?",a:"None of the 5 parts is defective",w:["Exactly one part is defective","All 5 parts are defective","At most one part is defective"],e:"The opposite of “one or more” is “zero”."},
 {tp:"c4",sec:"g43-1",t:"mc",q:"Each of 5 independent parts has a 0.10 chance of a defect. P(at least one defect) is:",a:"0.4095",w:["0.5905","0.5000","0.3281"],e:"1 − 0.9⁵ = 1 − 0.5905 = 0.4095."},
 {tp:"c4",sec:"g43-1",t:"mc",q:"If P(rain) = 0.35, then P(no rain) is:",a:"0.65",w:["0.35","0.50","1.35"],e:"The complement rule: 1 − 0.35 = 0.65."},
 {tp:"c4",sec:"g43-1",t:"mc",q:"“At least one” and “exactly one” differ because at least one also includes:",a:"two or more",w:["zero","none of them","only the first trial"],e:"At least one means 1, 2, 3 and so on; exactly one is a single case."},
 {tp:"c4",sec:"g43-1",ap:true,t:"mc",q:"A website has three independent servers, each up 80% of the time. Which calculation gives P(at least one server is down)?",a:"1 − 0.8³",w:["1 − 0.2³","0.2 × 3","0.8³"],e:"The complement of “at least one down” is “all three up”, 0.8³ = 0.512, so the answer is 0.488."},
 /* 4-3 conditional */
 {tp:"c4",sec:"g43-2",t:"mc",q:"Of 200 orders, 100 were online; 30 online orders were returned. P(returned | online) is:",a:"0.30",w:["0.15","0.75","0.20"],e:"Given online, the denominator is the 100 online orders: 30 ÷ 100."},
 {tp:"c4",sec:"g43-2",t:"mc",q:"Same table: 30 online orders were returned out of 200 orders in all. P(online and returned) is:",a:"0.15",w:["0.30","0.75","0.50"],e:"A joint probability uses the grand total: 30 ÷ 200."},
 {tp:"c4",sec:"g43-2",t:"mc",q:"Same table: 40 orders were returned in all, 30 of them online. P(online | returned) is:",a:"0.75",w:["0.30","0.15","0.40"],e:"Given returned, the denominator is the 40 returned orders: 30 ÷ 40."},
 {tp:"c4",sec:"g43-2",t:"mc",q:"Why does a conditional probability use the subgroup as its denominator?",a:"The condition narrows the group to that subgroup",w:["The grand total is not known","It makes the answer larger","Subgroups are always independent"],e:"Once you are told B happened, only B’s cases are still possible."},
 {tp:"c4",sec:"g43-2",t:"tf",q:"P(A | B) and P(B | A) are always equal.",a:false,e:"False — they divide by different totals; in the returns table they are 0.30 and 0.75."},
 /* 4-3 Bayes */
 {tp:"c4",sec:"g43-3",t:"mc",q:"Bayes’ theorem is used to find:",a:"P(source | evidence) from P(evidence | source)",w:["P(A or B) from P(A) and P(B)","the number of combinations","the mean of a distribution"],e:"It reverses the direction of a conditional probability."},
 {tp:"c4",sec:"g43-3",t:"mc",q:"A system flags 90% of fraud. That number, 0.90, is:",a:"P(flag | fraud)",w:["P(fraud | flag)","P(fraud and flag)","P(fraud)"],e:"It starts from fraud and asks about the flag, so fraud is the given condition."},
 {tp:"c4",sec:"g43-3",t:"mc",q:"2% of transactions are fraud; the system flags 90% of fraud and 5% of honest ones. P(fraud | flagged) is about:",a:"0.27",w:["0.90","0.02","0.95"],e:"0.018 ÷ (0.018 + 0.049) = 0.269: most flags are false alarms."},
 {tp:"c4",sec:"g43-3",t:"mc",q:"In Bayes’ theorem, the prior probability is:",a:"the probability before the evidence",w:["the probability after the evidence","the false positive rate","always equal to 0.5"],e:"The prior is the base rate; the posterior is the updated value."},
 {tp:"c4",sec:"g43-3",t:"tf",q:"If a test detects 95% of people who have a condition, then 95% of people who test positive have it.",a:false,e:"False — that confuses P(positive | condition) with P(condition | positive), which depends on the base rate."},
 /* 4-3 screening */
 {tp:"c4",sec:"g43-4",t:"mc",q:"A condition affects 1% of 10,000 people. How many have it?",a:"100",w:["10","1,000","99"],e:"1% of 10,000 is 100; the other 9,900 do not have it."},
 {tp:"c4",sec:"g43-4",t:"mc",q:"1% have a condition; the test catches 95% of them and wrongly flags 5% of the rest. In 10,000 people, the false positives number:",a:"495",w:["95","5","500"],e:"5% of the 9,900 without the condition is 495."},
 {tp:"c4",sec:"g43-4",t:"mc",q:"With 95 true positives and 495 false positives, P(condition | positive) is:",a:"0.161",w:["0.950","0.192","0.839"],e:"95 ÷ (95 + 495) = 95 ÷ 590 = 0.161."},
 {tp:"c4",sec:"g43-4",t:"mc",q:"Why are most positives false when a condition is rare?",a:"The healthy group is so much larger",w:["The test stops working","Rare conditions are never caught","The rates no longer apply"],e:"A small error rate applied to a huge group outnumbers the true cases."},
 {tp:"c4",sec:"g43-4",ap:true,t:"mc",q:"A fraud flag is right only about 27% of the time. What is the sensible business decision?",a:"Review flagged cases before acting",w:["Freeze every flagged account","Ignore the flags entirely","Stop screening transactions"],e:"A flag raises the chance from 2% to 27%: worth a second look, not a verdict."},
 /* 4-4 counting */
 {tp:"c4",sec:"g44-1",t:"mc",q:"A menu has 4 starters, 5 mains and 3 desserts. How many different three-course meals?",a:"60",w:["12","20","125"],e:"Multiply the choices at each stage: 4 × 5 × 3."},
 {tp:"c4",sec:"g44-1",t:"mc",q:"How many ways can 6 different books be arranged on a shelf?",a:"720",w:["36","120","6"],e:"6! = 6 × 5 × 4 × 3 × 2 × 1 = 720."},
 {tp:"c4",sec:"g44-1",t:"mc",q:"A code is 2 letters followed by 3 digits, with repeats allowed. How many codes?",a:"676,000",w:["468,000","6,760","1,352"],e:"26 × 26 × 10 × 10 × 10."},
 {tp:"c4",sec:"g44-1",t:"mc",q:"The value of 0! is:",a:"1",w:["0","undefined","10"],e:"By definition 0! = 1: there is one way to arrange nothing."},
 {tp:"c4",sec:"g44-1",t:"tf",q:"Multiplying the number of choices at each stage gives a probability between 0 and 1.",a:false,e:"False — it gives a whole-number count of outcomes; a probability needs a favorable count divided by a total."},
 /* 4-4 perms and combs */
 {tp:"c4",sec:"g44-2",t:"mc",q:"A president, vice president and treasurer are chosen from 10 people. How many ways?",a:"720",w:["120","30","1,000"],e:"Order matters because the roles differ: 10 × 9 × 8."},
 {tp:"c4",sec:"g44-2",t:"mc",q:"A committee of 3 is chosen from 10 people. How many ways?",a:"120",w:["720","30","1,000"],e:"Order does not matter: COMBIN(10,3) = 720 ÷ 6."},
 {tp:"c4",sec:"g44-2",t:"mc",q:"Which Excel function counts selections when order does not matter?",a:"=COMBIN(n, r)",w:["=PERMUT(n, r)","=FACT(n)","=BINOM.DIST(n, r)"],e:"COMBIN is for groups; PERMUT is for ordered arrangements."},
 {tp:"c4",sec:"g44-2",t:"mc",q:"For the same n and r, the number of combinations is:",a:"never more than the permutations",w:["always more than the permutations","always equal to n!","always equal to n × r"],e:"Combinations ignore the r! different orders that permutations count."},
 {tp:"c4",sec:"g44-2",ap:true,t:"mc",q:"A lottery picks 5 numbers from 52 and the order does not matter. The chance that one ticket wins is:",a:"1 ÷ COMBIN(52, 5)",w:["1 ÷ PERMUT(52, 5)","5 ÷ 52","1 ÷ 52⁵"],e:"There are 2,598,960 equally likely groups of five, so one ticket has 1 in 2,598,960."},
 {tp:"c4",sec:"g42-1",ap:true,t:"mc",q:"In a survey, 60% of customers own a laptop, 40% own a tablet and 25% own both. What share own at least one of the two?",a:"75%",w:["100%","35%","50%"],e:"Addition rule: 60 + 40 − 25 = 75; the 25% who own both would otherwise be counted twice."},
 {tp:"c4",sec:"g42-2",ap:true,t:"mc",q:"A box holds 3 defective and 7 good parts. Two are taken without replacement. Which gives P(both are defective)?",a:"3/10 × 2/9",w:["3/10 × 3/10","3/10 + 2/9","3/10 × 2/10"],e:"After one defective part is removed, 2 defective remain among 9 parts."},
 {tp:"c4",sec:"g43-2",ap:true,t:"mc",q:"Of 80 managers, 20 hold an MBA; of 120 other staff, 12 do. Given that an employee holds an MBA, the chance they are a manager is:",a:"20/32",w:["20/80","20/200","32/200"],e:"The condition narrows the group to the 32 MBA holders, 20 of whom are managers."}
]);
