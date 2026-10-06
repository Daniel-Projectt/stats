/* ================================================================ the course
   Statistics for Business — the exam on Chapters 4, 5 and 6. Built from the three
   "Chapter Objectives" sheets (their section headings and objectives are the guide
   below, in their words). On the exam he may use two web tools — the Normal
   Distribution Explorer and the Sampling Distribution Explorer at
   tools.benhartlage.com — and one flashcard; the Exam Kit tab is built around that.
   The section numbers follow Triola's Elementary Statistics (4-1 … 6-5).            */

/* ---- small helpers for writing math in plain HTML ---- */
function FR(n, d){ return '<span class="fr"><span>'+n+'</span><span>'+d+'</span></span>'; }  /* a stacked fraction */
function SQ(x){ return '√<span class="ov">'+x+'</span>'; }                                   /* a square root      */
function XL(f){ return '<code class="xl">'+f.replace(/([,(])/g, '$1<wbr>')+'</code>'; }                                    /* an Excel formula   */
var CH = {}, QB = [];

var COURSE = {
 code:"Statistics for Business", term:"Chapters 4 · 5 · 6",
 exam:"Exam &mdash; Probability, Discrete Distributions, the Normal",
 scope:"Chapter 4: probability rules, conditional probability, Bayes and counting. Chapter 5: discrete distributions, binomial and Poisson. Chapter 6: the normal distribution, sampling distributions and the central limit theorem.",
 rules:[
  "<b>You may use two tools</b>: the <b>Normal Distribution Explorer</b> and the <b>Sampling Distribution Explorer</b> (tools.benhartlage.com) &mdash; the Exam Kit tab shows which buttons to press for each kind of question.",
  "<b>You may bring one flashcard.</b> The Exam Kit tab has a ready one: the formulas and Excel functions worth the space.",
  "<b>The objectives ask for Excel by name</b>: binomial, Poisson and normal probabilities. Know which function, and when the last input is TRUE or FALSE.",
  "<b>Half of every objective is &ldquo;explain&rdquo;</b>: why the overlap is subtracted once, why base rates matter, why a larger sample shrinks the spread. Expect to say it in words, not only compute."],
 about:"Each heading below is a chapter of the objectives sheets, and each item is one objective, in the sheet’s words. The notes, flashcards, quizzes and practice exam all stay inside them. Every number on this page was computed and checked."
};

/* "Which Excel formula?" — asked as questions, answered on a tap */
var KEYTERMS = [
 {n:1,  q:"How many ways to arrange 5 different things in a row?", a:"=FACT(5) → 120"},
 {n:2,  q:"How many ordered ways to pick 3 from 10 (order matters)?", a:"=PERMUT(10,3) → 720"},
 {n:3,  q:"How many groups of 3 from 10 (order does not matter)?", a:"=COMBIN(10,3) → 120"},
 {n:4,  q:"Mean of a discrete distribution, x in A2:A7 and P(x) in B2:B7", a:"=SUMPRODUCT(A2:A7,B2:B7)"},
 {n:5,  q:"Standard deviation of that distribution (the mean is in D2)", a:"=SQRT(SUMPRODUCT(A2:A7^2,B2:B7)-D2^2)"},
 {n:6,  q:"Binomial: exactly 3 successes in 10 trials, p = 0.3", a:"=BINOM.DIST(3,10,0.3,FALSE) → 0.2668"},
 {n:7,  q:"Binomial: at most 3 successes in 10 trials, p = 0.3", a:"=BINOM.DIST(3,10,0.3,TRUE) → 0.6496"},
 {n:8,  q:"Binomial: at least 4 successes in 10 trials, p = 0.3", a:"=1-BINOM.DIST(3,10,0.3,TRUE) → 0.3504  (one less than 4, then the complement)"},
 {n:9,  q:"Binomial: fewer than 3 successes in 10 trials, p = 0.3", a:"=BINOM.DIST(2,10,0.3,TRUE) → 0.3828  (fewer than 3 means 2 or less)"},
 {n:10, q:"Poisson: exactly 2 events when the average is 4", a:"=POISSON.DIST(2,4,FALSE) → 0.1465"},
 {n:11, q:"Poisson: at most 2 events when the average is 4", a:"=POISSON.DIST(2,4,TRUE) → 0.2381"},
 {n:12, q:"Standard normal: area to the left of z = 1.00", a:"=NORM.S.DIST(1,TRUE) → 0.8413"},
 {n:13, q:"Standard normal: area to the right of z = 1.00", a:"=1-NORM.S.DIST(1,TRUE) → 0.1587"},
 {n:14, q:"Standard normal: the z-score at the 95th percentile", a:"=NORM.S.INV(0.95) → 1.645"},
 {n:15, q:"Normal with mean 100 and SD 15: P(x < 115)", a:"=NORM.DIST(115,100,15,TRUE) → 0.8413"},
 {n:16, q:"Normal with mean 100 and SD 15: P(x > 130)", a:"=1-NORM.DIST(130,100,15,TRUE) → 0.0228"},
 {n:17, q:"Normal with mean 100 and SD 15: the 90th percentile", a:"=NORM.INV(0.90,100,15) → 119.2"},
 {n:18, q:"Sample mean, n = 36 from mean 100, SD 15: P(x̄ > 105)", a:"=1-NORM.DIST(105,100,15/SQRT(36),TRUE) → 0.0228  (the spread is σ/√n = 2.5)"}
];

/* One item per objective on the sheets. "a" is the note section; "subs" its subsections. */
var GUIDE = {sections:[
 {h:"Chapter 4 · Probability", tp:"c4", items:[
  {id:"g41-1", t:"4-1 · Be able to distinguish an outcome, an event, and the sample space. Interpret probabilities from zero to one, including impossible and certain events.", a:"c4-basics",
   short:"An outcome is one single result; an event is any collection of outcomes; the sample space is every possible outcome. Probabilities run from 0 (impossible) to 1 (certain).", subs:[["Outcome, event, sample space","c4-basics"],["Zero to one","c4-scale"]]},
  {id:"g41-2", t:"4-1 · Be able to find probabilities using equally likely outcomes, observed relative frequencies, or informed judgment. Explain which approach fits the available information.", a:"c4-approach",
   short:"Equally likely outcomes: count, favorable ÷ total. Past data: times it happened ÷ times tried. Neither available: an informed judgment (subjective).", subs:[["The three approaches","c4-approach"]]},
  {id:"g41-3", t:"4-1 · Understand the law of large numbers. Explain why a long-run pattern neither guarantees the next result nor requires earlier outcomes to balance immediately.", a:"c4-lln",
   short:"Over many trials the relative frequency settles near the true probability. It says nothing about the next trial, and nothing is ever “due”: early streaks are diluted, not paid back.", subs:[["The law","c4-lln"],["The gambler’s fallacy","c4-gambler"]]},
  {id:"g42-1", t:"4-2 · Be able to calculate the probability of one event or another using the addition rule. Identify their overlap and explain why it is subtracted once.", a:"c4-add",
   short:"P(A or B) = P(A) + P(B) − P(A and B). Outcomes in both A and B get counted twice when you add, so the overlap is subtracted once. No overlap (mutually exclusive): just add.", subs:[["The addition rule","c4-add"]]},
  {id:"g42-2", t:"4-2 · Be able to use the multiplication rule for events occurring together. Distinguish independent events from mutually exclusive events; explain why positive-probability mutually exclusive events are dependent. Explain how replacement affects successive probabilities.", a:"c4-mult",
   short:"P(A and B) = P(A) × P(B given A). Independent: one does not change the other’s chance. Mutually exclusive: they cannot both happen, so knowing one happened makes the other impossible: dependent. With replacement the chances stay the same; without, they change.", subs:[["The multiplication rule","c4-mult"],["Independent vs mutually exclusive","c4-indep"],["Replacement","c4-replace"]]},
  {id:"g43-1", t:"4-3 · Be able to use a complement, including for at least one occurrence. State the complementary event and distinguish at least one from exactly one.", a:"c4-comp",
   short:"P(not A) = 1 − P(A). The complement of “at least one” is “none”, so P(at least one) = 1 − P(none). “Exactly one” is a different, smaller event.", subs:[["Complements","c4-comp"],["At least one","c4-atleast"]]},
  {id:"g43-2", t:"4-3 · Given a two-way table or description, be able to find conditional and joint probabilities. Explain why a conditional probability uses the specified subgroup as its denominator.", a:"c4-cond",
   short:"Joint (A and B): the cell ÷ the grand total. Conditional (A given B): the cell ÷ B’s total, because once you are told B happened, B’s group is the whole world you are choosing from.", subs:[["Reading a two-way table","c4-cond"]]},
  {id:"g43-3", t:"4-3 · Be able to use Bayes' theorem to update a probability. Distinguish the probability of evidence given a source from the probability of that source given the evidence.", a:"c4-bayes",
   short:"Bayes turns P(evidence given source) into P(source given evidence). They are different numbers: a test that flags 95% of the sick does not mean 95% of the flagged are sick.", subs:[["Bayes’ theorem","c4-bayes"]]},
  {id:"g43-4", t:"4-3 · Use a table or Excel to combine prior probabilities with conditional rates in a screening or business setting. Explain why base rates affect the updated probability and its decision implications.", a:"c4-screen",
   short:"Imagine 10,000 cases, split them by the base rate, apply each rate, then read the flagged row. When the condition is rare, most flags are false alarms, so a flag calls for a second look, not a verdict.", subs:[["The 10,000 table","c4-screen"],["Why base rates matter","c4-base"]]},
  {id:"g44-1", t:"4-4 · Be able to count outcomes using the multiplication counting rule and factorials. Identify the choices at each stage and distinguish counting outcomes from multiplying event probabilities.", a:"c4-count",
   short:"Multiply the number of choices at each stage. n! counts the orders of n different items. Counting gives a whole number of outcomes; multiplying probabilities gives a number between 0 and 1.", subs:[["The counting rule and factorials","c4-count"]]},
  {id:"g44-2", t:"4-4 · Distinguish permutations from combinations. Explain whether order matters and repetition is allowed before choosing a counting method or using counts to find a probability.", a:"c4-perm",
   short:"Order matters: permutations (president, VP, treasurer). Order does not matter: combinations (a committee of 3). Repetition allowed: plain multiplication, like a PIN.", subs:[["Permutations vs combinations","c4-perm"]]}]},

 {h:"Chapter 5 · Discrete Probability Distributions", tp:"c5", items:[
  {id:"g51-1", t:"5-1 · Be able to distinguish a discrete random variable from a continuous random variable. Define precisely what is counted or measured; distinguish the variable from one observed value.", a:"c5-rv",
   short:"Discrete: you count it (0, 1, 2…). Continuous: you measure it (time, weight, distance). The variable is the rule (“number of defects in a box”); a value is one result (“3”).", subs:[["Count or measure","c5-rv"]]},
  {id:"g51-2", t:"5-1 · Given values and probabilities, determine whether they form a valid discrete probability distribution. Check the possible values, each probability, and their sum.", a:"c5-valid",
   short:"Three checks: the values are numbers, every probability is between 0 and 1, and the probabilities add to exactly 1.", subs:[["The three checks","c5-valid"]]},
  {id:"g51-3", t:"5-1 · Be able to calculate and interpret the mean, variance, and standard deviation of a discrete probability distribution using probabilities as weights. Distinguish original measurement units from squared units.", a:"c5-mean",
   short:"Mean = Σ x·P(x). Variance = Σ x²·P(x) − mean². Standard deviation = √variance. Variance is in squared units; the standard deviation is back in the original units.", subs:[["Mean, variance, standard deviation","c5-mean"],["In Excel","c5-meanxl"]]},
  {id:"g51-4", t:"5-1 · Explain expected value as a long-run average, which need not be possible on one trial, most likely, or guaranteed. Compare uncertain outcomes using both expected value and variation.", a:"c5-ev",
   short:"Expected value is the average over many, many repetitions. It can be a value you never actually get (1.7 children). Two choices with the same expected value can differ in risk: compare the standard deviations too.", subs:[["Expected value","c5-ev"]]},
  {id:"g52-1", t:"5-2 · Be able to check all binomial requirements: fixed trial count, independent trials, two outcome categories per trial (success/failure), and constant success probability. Define the trial and success; identify n, p, and the success count.", a:"c5-binreq",
   short:"Four checks: a fixed number of trials n, independent trials, two outcomes each, the same p every time. n = trials, p = chance of success on one trial, x = number of successes.", subs:[["The four requirements","c5-binreq"],["The 5% guideline","c5-five"]]},
  {id:"g52-2", t:"5-2 · Be able to find binomial probabilities using Excel. Translate exactly, at most, fewer than, at least, and more than into events with correct endpoints; explain any complement used.", a:"c5-binxl",
   short:"=BINOM.DIST(x, n, p, FALSE) is exactly x; TRUE is x or fewer. At most 3 → TRUE at 3. Fewer than 3 → TRUE at 2. At least 4 → 1 − TRUE at 3. More than 3 → 1 − TRUE at 3.", subs:[["BINOM.DIST","c5-binxl"],["The five phrases","c5-phrases"]]},
  {id:"g52-3", t:"5-2 · Calculate and interpret binomial mean and standard deviation. Explain why a valid Excel calculation can give a misleading answer when the model's assumptions fail.", a:"c5-binmean",
   short:"Mean = n·p. Standard deviation = √(n·p·q), with q = 1 − p. Excel will always return a number; if the trials are not independent or p changes, that number answers the wrong question.", subs:[["Mean and standard deviation","c5-binmean"],["When the model fails","c5-binfail"]]},
  {id:"g53-1", t:"5-3 · Recognize when Poisson is appropriate for counting events in an interval. Assess independence and a reasonably constant average rate; distinguish event counts from waiting times.", a:"c5-poi",
   short:"Poisson counts events in an interval of time, distance or area: calls per hour, defects per meter. Events must be independent and arrive at a steady average rate. It counts events; it is not the time between them.", subs:[["When Poisson fits","c5-poi"]]},
  {id:"g53-2", t:"5-3 · Adjust an average event rate to the requested interval and calculate Poisson probabilities using Excel. Keep the event, exposure interval, and units consistent.", a:"c5-poixl",
   short:"Rescale the mean to the interval asked about (4 per hour is 2 per half hour, 8 per two hours), then =POISSON.DIST(x, mean, FALSE or TRUE).", subs:[["Rescale the rate","c5-poixl"],["POISSON.DIST","c5-poidist"]]},
  {id:"g53-3", t:"5-3 · Explain the Poisson relationships among mean, variance, and standard deviation. Distinguish its interval count from binomial successes in fixed trials, including their possible values and assumptions.", a:"c5-poivs",
   short:"Poisson: variance = mean, so standard deviation = √mean. Binomial counts successes in n fixed trials, so x stops at n; Poisson counts events in an interval and has no upper limit.", subs:[["Mean = variance","c5-poivs"],["Poisson vs binomial","c5-vs"]]}]},

 {h:"Chapter 6 · Normal Probability Distributions", tp:"c6", items:[
  {id:"g61-1", t:"6-1 · Understand the standard normal distribution: mean zero, standard deviation one, symmetry, and total area one. Distinguish an area probability from a curve's height.", a:"c6-std",
   short:"The standard normal is the bell curve with mean 0 and standard deviation 1. It is symmetric and the total area under it is 1. Probability is area under the curve, never the height.", subs:[["The standard normal","c6-std"]]},
  {id:"g61-2", t:"6-1 · Find areas left, right, and between z-scores. Given a probability or percentile, find the corresponding z-score and explain which tail or cumulative area is needed.", a:"c6-area",
   short:"Left of z: the cumulative area. Right: 1 − left. Between: left of the upper minus left of the lower. Going backwards, a percentile is the area to the LEFT.", subs:[["Areas","c6-area"],["From an area back to z","c6-inv"],["On the tool","c6-areatool"]]},
  {id:"g62-1", t:"6-2 · Standardize an observation from a normal population using its mean and standard deviation. Use Excel for probabilities and interpret the results in the original setting.", a:"c6-z",
   short:"z = (x − μ) ÷ σ: how many standard deviations x is from the mean. =NORM.DIST(x, μ, σ, TRUE) gives the area to the left; then say it in the story’s words.", subs:[["Standardize","c6-z"],["NORM.DIST","c6-zxl"]]},
  {id:"g62-2", t:"6-2 · Find a cutoff in original measurement units from a percentile or probability. Distinguish finding a probability from finding the value associated with a probability.", a:"c6-cut",
   short:"Value → probability uses NORM.DIST. Probability → value uses NORM.INV (or x = μ + z·σ). Always feed the area to the LEFT: the top 10% is the 90th percentile.", subs:[["Finding a cutoff","c6-cut"]]},
  {id:"g63-1", t:"6-3 · Distinguish a population distribution, one sample's observed values, and a sampling distribution of a statistic across repeated samples. Distinguish a parameter from a statistic.", a:"c6-samp",
   short:"Population distribution: every individual. A sample: the values you happened to draw. Sampling distribution: the statistic (like x̄) from every possible sample. A parameter describes a population; a statistic describes a sample.", subs:[["Three distributions","c6-samp"],["Parameter vs statistic","c6-param"]]},
  {id:"g63-2", t:"6-3 · Explain why random samples produce different estimates. Distinguish bias from variability: an unbiased estimator is centered on its target across repeated samples, not correct in every sample.", a:"c6-bias",
   short:"Different samples contain different individuals, so the estimate moves. Bias is being off-center on average; variability is how much the estimates scatter. Unbiased means right on average, not right every time.", subs:[["Bias and variability","c6-bias"]]},
  {id:"g64-1", t:"6-4 · Explain how the central limit theorem concerns sample means with independent observations and finite variance. It does not make individual observations normal; sample size and population shape affect approximation quality.", a:"c6-clt",
   short:"The CLT: sample means become approximately normal as n grows, whatever the population’s shape. It is about means, not individuals. Skewed populations need a larger n (n > 30 is the usual guide).", subs:[["The central limit theorem","c6-clt"],["On the simulator","c6-clttool"]]},
  {id:"g64-2", t:"6-4 · Identify the mean and standard error of the sample mean. Distinguish population standard deviation from standard error and explain why larger samples reduce the spread of sample means.", a:"c6-se",
   short:"Sample means center on μ. Their spread is the standard error, σ ÷ √n. σ is the spread of individuals; the standard error is the spread of sample means. A bigger n averages out the extremes.", subs:[["Standard error","c6-se"]]},
  {id:"g64-3", t:"6-4 · Calculate a probability for one observation or for a sample mean using the appropriate spread. Check random sampling, independence, population shape, and sample size before using a normal model.", a:"c6-which",
   short:"One individual: use σ. A sample mean: use σ ÷ √n. Check the sample is random and independent, and that the population is normal or n is large (over 30).", subs:[["One value or a mean?","c6-which"],["Conditions","c6-cond"]]},
  {id:"g65-1", t:"6-5 · Use a histogram and normal quantile plot to assess a normal model. Explain why an approximately linear quantile pattern supports normality while systematic curvature or unusual observations raise concerns; graphs are not proof.", a:"c6-plot",
   short:"A bell-shaped histogram and a roughly straight-line quantile plot support a normal model. Systematic curves or far-off points warn against it. Graphs support or question a model; they never prove it.", subs:[["Assessing normality","c6-plot"]]}]}
]};

/* ================================================================ the exam kit
   What he may bring (one flashcard) and use (two tools), turned into something to act on. */
var KIT = {
 card:{
  front:[
   ["Addition", "P(A or B) = P(A) + P(B) − P(A and B)"],
   ["Multiplication", "P(A and B) = P(A) × P(B | A)"],
   ["Complement", "P(at least one) = 1 − P(none)"],
   ["Conditional", "P(A | B) = P(A and B) ÷ P(B)   (cell ÷ B’s total)"],
   ["Bayes", "10,000 table → flagged-and-true ÷ all flagged"],
   ["Counting", "order matters: nPr = n!/(n−r)!     no order: nCr = n!/[r!(n−r)!]"],
   ["Any discrete", "μ = Σ x·P(x)     σ = √(Σ x²·P(x) − μ²)"],
   ["Binomial", "μ = np     σ = √(npq)     needs: fixed n, independent, 2 outcomes, same p"],
   ["Poisson", "σ = √μ     rescale μ to the interval asked"]],
  back:[
   ["z-score", "z = (x − μ) ÷ σ          cutoff: x = μ + z·σ"],
   ["Sample mean", "use σ ÷ √n  (standard error), not σ"],
   ["Significant", "high: μ + 2σ or more     low: μ − 2σ or less     or P(that or more extreme) ≤ 0.05"],
   ["Excel: binomial", "=BINOM.DIST(x, n, p, FALSE exact / TRUE ≤ x)"],
   ["Excel: Poisson", "=POISSON.DIST(x, μ, FALSE / TRUE)"],
   ["Excel: normal", "=NORM.DIST(x, μ, σ, TRUE) left area    =NORM.INV(area left, μ, σ)"],
   ["Phrases", "at most 3 → ≤ 3     fewer than 3 → ≤ 2     at least 4 → 1 − (≤ 3)     more than 3 → 1 − (≤ 3)"],
   ["Percentile", "always the area to the LEFT (top 10% = 0.90)"],
   ["z to know", "90% → 1.282 · 95% → 1.645     97.5% → 1.960 · 99% → 2.326"]]
 },
 tools:[
  {name:"Normal Distribution Explorer", url:"https://tools.benhartlage.com/normal-area/",
   what:"Your calculator for every normal-curve question in Chapter 6. It works both ways and prints the matching Excel formula.",
   uses:[
    ["P(x is below a value)", ["Type the <b>Mean (μ)</b> and <b>Standard deviation (σ)</b>.", "Choose <b>Find probability — start with a value</b>.", "Choose <b>Left tail — below a cutoff</b>.", "Type the value in <b>Cutoff (x)</b>. Read the shaded probability."]],
    ["P(x is above a value)", ["Same setup.", "Choose <b>Right tail — above a cutoff</b>.", "Type the cutoff and read the probability."]],
    ["P(x is between two values)", ["Same setup.", "Choose <b>Between two cutoffs</b>.", "Type the lower and the <b>Upper cutoff (x)</b>."]],
    ["A z-score question (standard normal)", ["Tick <b>Use standard normal: μ = 0, σ = 1</b>.", "Enter cutoffs as <b>Standardized values (z)</b>.", "Pick left tail, right tail or between."]],
    ["A percentile or cutoff (going backwards)", ["Choose <b>Find cutoff — start with a probability</b>.", "Pick the tail that matches the story: <b>Left tail</b> for a percentile, <b>Right tail</b> for “the top 10%”.", "Type the probability as a decimal (0.90, not 90). Read the cutoff."]],
    ["The middle 95% (two cutoffs equally far out)", ["Choose <b>Find cutoff</b> and <b>Two tails — equally far from the mean</b>, or <b>Between</b> with 0.95.", "Read both cutoffs."]],
    ["A probability about a SAMPLE MEAN", ["First work out the standard error: <b>σ ÷ √n</b>.", "Type that number in the <b>Standard deviation (σ)</b> box, not σ itself.", "Then proceed as for any other probability."]]]},
  {name:"Sampling Distribution Explorer", url:"https://tools.benhartlage.com/sampling-distribution/",
   what:"A simulator, not a calculator. It draws thousands of samples and shows what their means do: the picture behind Sections 6-3 and 6-4.",
   uses:[
    ["See the central limit theorem", ["Set <b>Population shape</b> to <b>Right-skewed</b> (or Bimodal).", "Set <b>Sample size (n)</b> to 2 and press <b>Run 10,000 samples</b>: the pile of means is still lopsided.", "Change n to <b>30</b> and run again: the pile is now bell-shaped, though the population is not."]],
    ["See the standard error shrink", ["Keep one population. Run with n = 5, note the <b>Sampling dist. SD</b>.", "Run with n = 30: it is smaller. It should match <b>Population SD ÷ √n</b>."]],
    ["See “unbiased”", ["Compare <b>Population mean</b> with <b>Sampling dist. mean</b>: they agree, whatever n is.", "Individual samples miss; the average of all the sample means does not."]],
    ["Check a standard error you computed", ["Read <b>Population SD</b>, divide by √n yourself.", "Compare with the <b>Observed Standard Error</b> after 10,000 or 100,000 samples."]]]}
 ],
 which:[
  ["“or”, “either”", "Addition rule", "P(A) + P(B) − P(both)"],
  ["“and”, “both”, one after another", "Multiplication rule", "P(A) × P(B | A)"],
  ["“at least one”", "Complement", "1 − P(none)"],
  ["“given that”, “of those who…”", "Conditional", "cell ÷ that group’s total"],
  ["a test, screen or flag with a base rate", "Bayes / 10,000 table", "true flags ÷ all flags"],
  ["“how many ways”, order matters", "Permutation", "=PERMUT(n, r)"],
  ["“how many ways”, a group or committee", "Combination", "=COMBIN(n, r)"],
  ["a table of x and P(x)", "Discrete distribution", "SUMPRODUCT for the mean"],
  ["n trials, success or failure, same p", "Binomial", "=BINOM.DIST(x, n, p, …)"],
  ["events per hour, per page, per mile", "Poisson", "=POISSON.DIST(x, μ, …)"],
  ["normal, one value, “what probability”", "Normal → probability", "Normal Explorer or =NORM.DIST"],
  ["normal, “what value”, percentile, top 5%", "Normal → cutoff", "Normal Explorer or =NORM.INV"],
  ["“a sample of n… the mean is”", "Sample mean", "same, but σ ÷ √n"]]
};
