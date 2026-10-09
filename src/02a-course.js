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
 /* his own help card. 9-oct: he asked for it divided by the type of distribution and then by the type of
    question, with the formulas written in words (no Greek letters, no P(A), no F(k)).
    A row with one item is a heading; the others are [the question, the formula]. */
 card:{
  front:[
   ["Plain probability · no distribution"],
   ["A or B", "chance of A + chance of B − chance of both"],
   ["A and B", "chance of A × chance of B     no replacement: top and bottom each go down by 1"],
   ["Neither", "(1 − chance of A) × (1 − chance of B)"],
   ["At least one", "1 − chance of none"],
   ["Given…", "how many are in both ÷ how many are in the given group"],
   ["Which group was it?", "(group share × group rate) ÷ (the same product added up for every group)"],
   ["How many ways?", "order does not matter: =COMBIN(total, chosen)     order matters: =PERMUT(total, chosen)"],
   ["A table of values and chances"],
   ["Is it valid?", "every chance between 0 and 1, and they add up to 1"],
   ["Expected value", "each value × its chance, then add them all     a loss is a negative value"],
   ["Binomial · yes or no, a fixed number of tries"],
   ["Mean", "tries × chance"],
   ["Standard deviation", "square root of (tries × chance × (1 − chance))"],
   ["Exactly 3", "=BINOM.DIST(3, tries, chance, FALSE)"],
   ["3 or fewer", "=BINOM.DIST(3, tries, chance, TRUE)"],
   ["Fewer than 3", "=BINOM.DIST(2, tries, chance, TRUE)"],
   ["At least 3", "=1 − BINOM.DIST(2, tries, chance, TRUE)"],
   ["More than 3", "=1 − BINOM.DIST(3, tries, chance, TRUE)"],
   ["Poisson · a count per hour, per day, per page"],
   ["First", "average for the time asked = rate × length of time"],
   ["Exactly 3", "=POISSON.DIST(3, average, FALSE)"],
   ["3 or fewer", "=POISSON.DIST(3, average, TRUE)"],
   ["At least 3", "=1 − POISSON.DIST(2, average, TRUE)"],
   ["Spread", "variance = average     standard deviation = square root of the average"],
   ["Time twice as long", "average × 2     variance × 2     standard deviation × square root of 2"]],
  back:[
   ["Normal · the bell curve, ONE value"],
   ["z-score", "(value − mean) ÷ standard deviation"],
   ["Less than", "=NORM.DIST(value, mean, standard deviation, TRUE)"],
   ["Greater than", "=1 − NORM.DIST(value, mean, standard deviation, TRUE)"],
   ["Between two values", "NORM.DIST of the upper − NORM.DIST of the lower"],
   ["Cutoff, top 10%", "=NORM.INV(0.90, mean, standard deviation)"],
   ["Cutoff, bottom 10%", "=NORM.INV(0.10, mean, standard deviation)"],
   ["Value from a z-score", "mean + z-score × standard deviation"],
   ["Sample means · the AVERAGE of a group"],
   ["Center", "the population mean, unchanged"],
   ["Standard error", "standard deviation ÷ square root of the sample size"],
   ["z-score", "(sample mean − population mean) ÷ standard error"],
   ["Less than", "=NORM.DIST(sample mean, mean, standard deviation/SQRT(sample size), TRUE)"],
   ["Greater than", "=1 − that same formula"],
   ["4 times the sample", "the standard error is cut in half"],
   ["Is it a bell?", "yes when the population is normal or the sample is over 30"],
   ["Unbiased", "mean, proportion, variance     not: median, range, standard deviation"],
   ["The two essays"],
   ["Essay 17", "the calculation, units matched → compare the two and say what it means → one assumption, how it fails, why it matters"],
   ["Essay 18", "center = the population mean → shape: a bell, and why → one value keeps the standard deviation, an average uses the standard error"]],
  /* 9-oct: his card had a third of a side left, so these fill it: the two essays sentence by sentence,
     the word questions, and his two weakest calculations worked out. */
  extra:[
   ["Essay 17 · a machine (10 points), write these 5 sentences"],
   ["1 · the model", "“This is a count of events in time, so I use Poisson. The rate is ___ per ___.”"],
   ["2 · first chance", "“For one ___ the average is rate × time = ___. =POISSON.DIST(number, average, FALSE) = ___.”"],
   ["3 · second chance", "the same for the other length of time, in the same units"],
   ["4 · compare", "“___ is about ___ times more likely than ___. So the machine is reliable over ___ but not over ___.”"],
   ["5 · assumption", "“This assumes the events are independent and the rate is steady. If the machine wears out, or one failure causes another, they cluster and my answer is off.”"],
   ["Essay 18 · sample means (10 points), write these 5 sentences"],
   ["1 · center", "“The sample means center on the population mean, ___, because the sample mean is unbiased.”"],
   ["2 · spread", "“The standard error is standard deviation ÷ square root of the sample size = ___.”"],
   ["3 · shape", "“It is approximately normal because the sample is over 30 (central limit theorem)”, or “because the population is normal”"],
   ["4 · conditions", "“The sample must be random and the observations independent.”"],
   ["5 · the difference", "“Single values keep the population’s shape and standard deviation. The averages are a different distribution: bell-shaped and narrower.”"],
   ["Word questions · no calculation"],
   ["Cannot both happen", "mutually exclusive, and so NOT independent"],
   ["Independent", "one does not change the chance of the other     a shared cause breaks it"],
   ["After a streak", "the next one still has the same chance     nothing is “due”"],
   ["Is it binomial?", "fixed number of tries, independent, two outcomes, same chance     “until…” is not"],
   ["Is it Poisson?", "a COUNT in a fixed time or space     not a waiting time, an amount or a percent"],
   ["Height of the bell", "not a chance     the chance is the AREA     one exact value = 0"],
   ["Central limit theorem", "about the AVERAGES, never about single values     30 is a guide, not a guarantee"],
   ["Close together but off target", "biased     spread out but centered can be unbiased"],
   ["Usually wrong", "choices with always, never, must, guarantees, proves, automatically"],
   ["Worked: which group was it?"],
   ["The story", "Plant L makes 30%, 4% bad     Plant M makes 70%, 1% bad     a part is bad: from L?"],
   ["The steps", "0.30 × 0.04 = 0.012     0.70 × 0.01 = 0.007     pile = 0.019     0.012 ÷ 0.019 = 0.63"],
   ["Worked: expected value"],
   ["The story", "30% chance to win 90,000     70% chance to lose 3,000"],
   ["The steps", "0.30 × 90,000 = 27,000     0.70 × −3,000 = −2,100     add: 24,900"]]
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

/* One worked example per objective, with the same numbers the chapter files use (test.js recomputes them). */
var EX = {
 "g41-1":["Roll one die. <b>Sample space:</b> {1, 2, 3, 4, 5, 6}. <b>One outcome:</b> “a 4”. <b>An event:</b> “an even number” = {2, 4, 6}.", "P(rolling a 7) = <b>0</b>, impossible. P(rolling below 7) = <b>1</b>, certain."],
 "g41-2":["<b>Equally likely:</b> P(heart from a deck) = 13 ÷ 52 = <b>0.25</b>.", "<b>Past data:</b> 30 of 600 orders were returned → 30 ÷ 600 = <b>0.05</b>.", "<b>Judgment:</b> “a 70% chance our new store breaks even.”"],
 "g41-3":["Flip a coin 10 times and you might see 70% heads. Flip it 10,000 times and you will be very near 50%.", "After five heads in a row, the next flip is still <b>0.5</b>. Tails is not “due”."],
 "g42-1":["One card: P(king or heart). Kings 4, hearts 13, and the king of hearts is in both.", "(4 + 13 − 1) ÷ 52 = 16 ÷ 52 = <b>0.308</b>."],
 "g42-2":["Two aces <b>with</b> replacement (independent): 4/52 × 4/52 = <b>0.0059</b>.", "Two aces <b>without</b> replacement (dependent): 4/52 × 3/51 = <b>0.0045</b>."],
 "g43-1":["Each of 5 parts has a 10% chance of being defective. P(none) = 0.9⁵ = 0.5905, so P(at least one) = 1 − 0.5905 = <b>0.4095</b>.", "Exactly one is a smaller event: 5 × 0.1 × 0.9⁴ = <b>0.3281</b>."],
 "g43-2":["200 orders: 100 online (30 returned) and 100 in store (10 returned).", "<b>Joint:</b> P(online and returned) = 30 ÷ 200 = <b>0.15</b>.", "<b>Conditional:</b> P(returned given online) = 30 ÷ 100 = <b>0.30</b>. The other way round, P(online given returned) = 30 ÷ 40 = <b>0.75</b>."],
 "g43-3":["2% of transactions are fraud. The system flags 90% of fraud and 5% of honest ones. A transaction is flagged.", "P(fraud given flag) = (0.90 × 0.02) ÷ (0.90 × 0.02 + 0.05 × 0.98) = 0.018 ÷ 0.067 = <b>0.269</b>.", "P(flag given fraud) = 0.90 is a different question."],
 "g43-4":["Same system, 10,000 transactions: 200 fraud and 9,800 honest. Flagged: 90% of 200 = 180, and 5% of 9,800 = 490.", "180 ÷ (180 + 490) = 180 ÷ 670 = <b>0.269</b>. In Excel: <code>=0.9*0.02/(0.9*0.02+0.05*0.98)</code>.", "Fraud is rare, so most flags are false alarms: look again before acting."],
 "g44-1":["4 shirts and 3 pants → 4 × 3 = <b>12</b> outfits.", "5 people in a line → 5! = 5 × 4 × 3 × 2 × 1 = <b>120</b>. In Excel <code>=FACT(5)</code>."],
 "g44-2":["From 10 people. A president, a VP and a treasurer (order matters): 10 × 9 × 8 = <b>720</b>, <code>=PERMUT(10,3)</code>.", "A committee of 3 (order does not matter): 720 ÷ 3! = <b>120</b>, <code>=COMBIN(10,3)</code>."],
 "g51-1":["“The number of defects in a box” is <b>discrete</b>: you count it. “The time for a bulb to burn out” is <b>continuous</b>: you measure it.", "The variable is the rule, x = the number of defects. One value is x = 3."],
 "g51-2":["x = 0, 1, 2, 3 with P(x) = 0.1, 0.3, 0.4, 0.2.", "The values are numbers ✓, each probability is between 0 and 1 ✓, and 0.1 + 0.3 + 0.4 + 0.2 = <b>1</b> ✓. Valid."],
 "g51-3":["x = 0, 1, 2, 3 with P(x) = 0.1, 0.3, 0.4, 0.2.", "Mean = 0(0.1) + 1(0.3) + 2(0.4) + 3(0.2) = <b>1.7</b>.", "Variance = 3.7 − 1.7² = <b>0.81</b> (squared units). Standard deviation = √0.81 = <b>0.9</b> (original units)."],
 "g51-4":["A $10 raffle ticket has a 1% chance to win $500. Expected value = 490(0.01) + (−10)(0.99) = <b>−$5</b> per ticket, on average. No single ticket loses $5.", "A sure $100 and a 50/50 chance at $200 or $0 both have an expected value of $100, but standard deviations of <b>0</b> and <b>$100</b>."],
 "g52-1":["10 customers, each with a 30% chance of buying. The trial is one customer; a success is a purchase.", "<b>n = 10</b>, <b>p = 0.3</b>, x = the number who buy. Fixed n ✓, independent ✓, two outcomes ✓, same p ✓."],
 "g52-2":["n = 10, p = 0.3.", "Exactly 3: <code>=BINOM.DIST(3,10,0.3,FALSE)</code> = <b>0.2668</b>. At most 3: <code>=BINOM.DIST(3,10,0.3,TRUE)</code> = <b>0.6496</b>.", "Fewer than 3: <code>=BINOM.DIST(2,10,0.3,TRUE)</code> = <b>0.3828</b>. At least 4: <code>=1-BINOM.DIST(3,10,0.3,TRUE)</code> = <b>0.3504</b>."],
 "g52-3":["26 births, p = 0.5.", "Mean = 26 × 0.5 = <b>13</b>. Standard deviation = √(26 × 0.5 × 0.5) = √6.5 = <b>2.5</b>."],
 "g53-1":["<b>Fits:</b> customers arriving at a steady 4 per hour. <b>Does not fit:</b> arrivals that surge at lunch, or people arriving in groups.", "“How many calls in an hour?” is a count: Poisson. “How long until the next call?” is a waiting time: not Poisson."],
 "g53-2":["A store gets 4 customers per hour. In half an hour the mean is 4 × 0.5 = <b>2</b>.", "Exactly 2 in an hour: <code>=POISSON.DIST(2,4,FALSE)</code> = <b>0.1465</b>. None in half an hour: <code>=POISSON.DIST(0,2,FALSE)</code> = <b>0.1353</b>.", "At least 1 in an hour: <code>=1-POISSON.DIST(0,4,TRUE)</code> = <b>0.9817</b>."],
 "g53-3":["Mean 4 per hour → variance <b>4</b>, standard deviation √4 = <b>2</b>.", "“10 customers, how many buy” has a clear n: binomial, and x stops at 10. “Calls in an hour” has no number of trials: Poisson, with no upper limit."],
 "g61-1":["z = 1.5 means 1.5 standard deviations above the mean. The area left of −1 equals the area right of +1.", "The chance of one exact value is <b>0</b>; only a range has a probability, the area above it."],
 "g61-2":["Left of z = 1.00: <b>0.8413</b>. Right of it: 1 − 0.8413 = <b>0.1587</b>. Between −1 and 1: 0.8413 − 0.1587 = <b>0.6827</b>.", "Backwards: the 95th percentile is <code>=NORM.S.INV(0.95)</code> = <b>1.645</b>."],
 "g62-1":["Test scores are normal with mean 100 and standard deviation 15.", "Below 115: z = (115 − 100) ÷ 15 = 1.00 → <b>0.8413</b>. About 84% score below 115. <code>=NORM.DIST(115,100,15,TRUE)</code>", "Above 130: z = 2.00 → 1 − 0.9772 = <b>0.0228</b>."],
 "g62-2":["Mean 100, standard deviation 15. What score marks the top 10%?", "Top 10% means 0.90 to the left. z = 1.282, so x = 100 + 1.282 × 15 = <b>119.2</b>. In one step: <code>=NORM.INV(0.90,100,15)</code>."],
 "g63-1":["All students’ scores: the <b>population</b>, with mean μ. The 36 scores you drew: one <b>sample</b>, with mean x̄. The x̄ from every possible sample of 36: the <b>sampling distribution</b>.", "μ is a parameter; x̄ is a statistic."],
 "g63-2":["Think of darts. <b>Bias</b>: the whole cluster sits away from the bullseye. <b>Variability</b>: how spread out the cluster is.", "The sample mean is unbiased: right on average, not in every sample. A larger sample shrinks variability; it does not fix bias."],
 "g64-1":["Take a right-skewed population. With n = 2 the pile of sample means is still lopsided; with n = 30 it is bell-shaped.", "The population itself has not changed: only the means become normal."],
 "g64-2":["σ = 15. n = 25 → 15 ÷ 5 = <b>3</b>. n = 36 → 15 ÷ 6 = <b>2.5</b>. n = 100 → 15 ÷ 10 = <b>1.5</b>.", "To cut the standard error in half you need four times the sample size."],
 "g64-3":["Scores are normal with μ = 100 and σ = 15.", "One person above 105: z = (105 − 100) ÷ 15 = 0.33 → <b>0.3694</b>.", "The mean of 36 people above 105: standard error 15 ÷ √36 = 2.5, z = 2.00 → <b>0.0228</b>. <code>=1-NORM.DIST(105,100,15/SQRT(36),TRUE)</code>"],
 "g65-1":["A bell-shaped histogram and quantile-plot points close to a straight line <b>support</b> a normal model.", "An S-shaped curve, or points far off the line, <b>raise concerns</b>. Either way the graphs are not proof."]
};
