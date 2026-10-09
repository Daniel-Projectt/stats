/* ================================================================ Exam Prep: the 31-question practice exam
   Daniel's own practice exam (8-oct), one question or small group of parts per objective, with
   numbers he has not seen. Each part is asked alone; the answer stays hidden until he taps.
   hint = the note from his last study session; trap = one of his seven known traps, named
   when the answer is shown. test.js recomputes every number in the answers.                   */
var PREP_TRAPS = {
 1:"Right-tail area: do one minus first.",
 2:"Read the area inside the z table, not the edges.",
 3:"A sample mean uses σ ÷ √n, not plain σ.",
 4:"Unbiased: mean, proportion, variance. Biased: median, range, standard deviation.",
 5:"With replacement, repeats count and order matters.",
 6:"Use the exact table value, not a rule of thumb.",
 7:"“At least” and “more than”: one minus, and the number typed is one below where you start."
};
var PREP = [
 {obj:"4-1", t:"Outcomes and events", stem:"A spinner has 8 equal sections numbered 1 to 8.", parts:[
   ["What is the sample space?", "{1, 2, 3, 4, 5, 6, 7, 8}"],
   ["Give one outcome and one event.", "Outcome: for example “a 5”. Event: for example “even” = {2, 4, 6, 8}."],
   ["What is P(spinning a 9)? What is P(spinning 8 or less)?", "<b>0</b> (impossible) and <b>1</b> (certain)."]]},
 {obj:"4-1", t:"Three ways to get a probability", stem:"Which method fits each, and what is the probability where you can compute it?", parts:[
   ["Rolling a 3 on a fair die.", "Equally likely outcomes: 1 ÷ 6 ≈ <b>0.167</b>."],
   ["18 of the last 360 customers complained.", "Past data: 18 ÷ 360 = <b>0.05</b>."],
   ["A manager says “I’d guess a 60% chance the new product sells out.”", "Informed judgment (subjective): <b>0.60</b>."]]},
 {obj:"4-1", t:"Law of large numbers", stem:"A fair coin has landed tails 6 times in a row. A friend says heads is “due.”", parts:[
   ["Are they right? What does the law of large numbers actually say?", "No. Each flip is still <b>0.5</b>. Over many flips the proportion settles near 0.5, but nothing is “due”: early streaks get diluted, not paid back."]]},
 {obj:"4-2", t:"Addition rule", stem:"Draw one card from a standard deck. Face cards are jack, queen and king.", parts:[
   ["What is P(face card or diamond)?", "Face cards 12, diamonds 13, overlap 3 (the jack, queen and king of diamonds). (12 + 13 − 3) ÷ 52 = 22 ÷ 52 ≈ <b>0.423</b>."],
   ["Why do you subtract the overlap?", "Those three cards were counted twice, once as face cards and once as diamonds, so you take them out once."]]},
 {obj:"4-2", t:"Multiplication rule", stem:"A bag has 6 green and 4 yellow marbles. You draw two.", hint:"Without replacement, the top AND the bottom both drop by one on the second draw.", parts:[
   ["P(both green) without replacement?", "6/10 × 5/9 = <b>0.333</b>."],
   ["P(both green) with replacement?", "6/10 × 6/10 = <b>0.36</b>."],
   ["Rolling a 2 and rolling a 5 on one die are mutually exclusive. Are they independent or dependent, and why?", "<b>Dependent.</b> Knowing you rolled a 2 makes a 5 impossible, so one changes the other’s chance."]]},
 {obj:"4-3", t:"Complements", stem:"Each of 6 laptops has a 15% chance of being defective.", hint:"Go through “none”. Use the calculator’s power key for 0.85 to the 6th.", parts:[
   ["P(at least one defective)?", "P(none) = 0.85⁶ = 0.3771, so 1 − 0.3771 = <b>0.6229</b>."],
   ["Is P(exactly one defective) bigger or smaller than that? Why?", "<b>Smaller.</b> Exactly one = 6 × 0.15 × 0.85⁵ = 0.3993. “At least one” also includes 2, 3 and more defective."]]},
 {obj:"4-3", t:"Two-way table", stem:"A company has 250 employees: 150 full-time (90 of them trained) and 100 part-time (30 of them trained).", parts:[
   ["P(full-time and trained)?", "90 ÷ 250 = <b>0.36</b>."],
   ["P(trained given full-time)?", "90 ÷ 150 = <b>0.60</b>."],
   ["P(full-time given trained)?", "Trained in total = 90 + 30 = 120, so 90 ÷ 120 = <b>0.75</b>."],
   ["Why does “trained given full-time” use 150 on the bottom, not 250?", "“Given full-time” means the full-timers are the whole world now."]]},
 {obj:"4-3", t:"Bayes and base rates", two:true, stem:"4% of loan applicants default. A screening test puts in the reject pile 85% of applicants who will default, and 10% of applicants who won’t.", hint:"Skip the formula. Imagine 1,000 applicants and build the reject pile: everyone the test rejected, rightly or wrongly.", parts:[
   ["Imagine 1,000 applicants. How many defaulters and how many good applicants?", "<b>40</b> defaulters and <b>960</b> good applicants."],
   ["How many of each land in the reject pile?", "85% of 40 = <b>34</b>, and 10% of 960 = <b>96</b>. The reject pile holds 130."],
   ["An applicant is in the reject pile. What is the chance they will actually default?", "34 ÷ 130 ≈ <b>0.262</b>."],
   ["Write it as one Excel formula.", "<code>=0.85*0.04/(0.85*0.04+0.10*0.96)</code>"],
   ["Why is the answer so much lower than 85%, and what should the bank do with a rejected applicant?", "Defaulting is rare, so the false alarms (96) outnumber the real catches (34). Being in the pile means take a second look, not reject outright. P(rejected given default) = 0.85 is a different question from P(default given rejected) = 0.26."]]},
 {obj:"4-4", t:"Counting and factorials", stem:"", hint:"Different lists → multiply. Same group with no reuse → count down for the number of spots.", parts:[
   ["A T-shirt comes in 5 colors, 3 sizes and 2 styles. How many different shirts?", "5 × 3 × 2 = <b>30</b>."],
   ["How many ways can 7 different books be lined up on a shelf? Excel formula?", "7! = <b>5,040</b>. <code>=FACT(7)</code>"],
   ["Is the T-shirt answer a count or a probability? How can you tell?", "A count: it is a whole number of outcomes, not a number between 0 and 1."]]},
 {obj:"4-4", t:"Permutations and combinations", stem:"From 9 people:", hint:"Count down for the number of spots; divide by k! if order doesn’t matter.", parts:[
   ["Pick a captain and a co-captain. How many ways? Excel?", "9 × 8 = <b>72</b>. <code>=PERMUT(9,2)</code>"],
   ["Pick a team of 4 with no roles. How many ways? Excel?", "(9 × 8 × 7 × 6) ÷ 4! = 3,024 ÷ 24 = <b>126</b>. <code>=COMBIN(9,4)</code>"],
   ["A 4-digit PIN where digits can repeat. How many PINs?", "Repeats allowed, so just multiply: 10⁴ = <b>10,000</b>."]]},

 {obj:"5-1", t:"Discrete or continuous", stem:"Discrete or continuous?", parts:[
   ["The number of returns a store gets in a day.", "<b>Discrete</b>: you count it."],
   ["The weight of a package.", "<b>Continuous</b>: you measure it."],
   ["For the returns, what is the variable, and what is one value?", "Variable: x = the number of returns in a day. One value: for example x = 4."]]},
 {obj:"5-1", t:"Valid distribution", stem:"Is each a valid probability distribution? Why or why not?", parts:[
   ["x = 0, 1, 2, 3 with P = 0.25, 0.35, 0.30, 0.15", "<b>Not valid</b>: the probabilities add to 1.05."],
   ["x = 0, 1, 2 with P = 0.6, 0.5, −0.1", "<b>Not valid.</b> The sum is exactly 1, but −0.1 is negative, and a probability cannot be below 0. Passing the sum check is not enough."],
   ["x = 0, 1, 2 with P = 0.2, 0.5, 0.3", "<b>Valid</b>: every probability is between 0 and 1, and they add to 1."]]},
 {obj:"5-1", t:"Mean, variance, standard deviation", stem:"Use x = 0, 1, 2 with P = 0.2, 0.5, 0.3.", hint:"Go slowly, one step at a time: square each x, multiply by its probability, add them up, then subtract the mean squared.", parts:[
   ["The mean.", "0(0.2) + 1(0.5) + 2(0.3) = <b>1.1</b>."],
   ["The variance, one step at a time.", "Square each x: 0, 1, 4. Times its probability: 0(0.2) + 1(0.5) + 4(0.3) = 1.7. Subtract the mean squared: 1.7 − 1.1² = 1.7 − 1.21 = <b>0.49</b>."],
   ["The standard deviation. Which one is in squared units?", "√0.49 = <b>0.7</b>, in the original units. The <b>variance</b> is the one in squared units."]]},
 {obj:"5-1", t:"Expected value", stem:"", parts:[
   ["A $5 raffle ticket has a 2% chance to win $100. What is the expected value per ticket?", "Net +$95 with probability 0.02, net −$5 with probability 0.98: 95(0.02) + (−5)(0.98) = 1.90 − 4.90 = <b>−$3</b> per ticket."],
   ["Will anyone actually lose exactly that amount?", "No. Each ticket either wins $95 net or loses $5. −$3 is the long-run average."],
   ["Option A: a sure $50. Option B: a 50/50 chance of $100 or $0. Same expected value? Which is riskier, and how would you show it?", "Both have an expected value of <b>$50</b>. B is riskier: the standard deviation of A is 0 and of B is $50. Compare the spread, not just the mean."]]},
 {obj:"5-2", t:"Binomial setup", stem:"A salesperson makes 12 calls; each call has a 25% chance of a sale, independently.", parts:[
   ["What is a trial and what is a success?", "A trial is one call; a success is a sale."],
   ["What are n, p and x?", "n = 12, p = 0.25, x = the number of sales."],
   ["Check all four binomial conditions.", "A fixed number of trials ✓, independent trials ✓, two outcomes each ✓, the same p every time ✓."]]},
 {obj:"5-2", t:"Binomial in Excel", stem:"Same setup: n = 12, p = 0.25. Give the Excel formula and the answer.", hint:"If the phrase counts UP (at least, more than): one minus, and the number you type is one BELOW where you start.", parts:[
   ["Exactly 3 sales.", "<code>=BINOM.DIST(3,12,0.25,FALSE)</code> = <b>0.2581</b>"],
   ["At most 3.", "<code>=BINOM.DIST(3,12,0.25,TRUE)</code> = <b>0.6488</b>"],
   ["Fewer than 3.", "<code>=BINOM.DIST(2,12,0.25,TRUE)</code> = <b>0.3907</b>"],
   ["At least 4.", "<code>=1-BINOM.DIST(3,12,0.25,TRUE)</code> = <b>0.3512</b>", 7],
   ["More than 5.", "<code>=1-BINOM.DIST(5,12,0.25,TRUE)</code> = <b>0.0544</b>", 7]]},
 {obj:"5-2", t:"Binomial mean and standard deviation", stem:"Same salesperson: 12 calls, p = 0.25.", parts:[
   ["Mean and standard deviation of the number of sales.", "Mean = 12 × 0.25 = <b>3</b>. Standard deviation = √(12 × 0.25 × 0.75) = √2.25 = <b>1.5</b>."],
   ["Suppose the salesperson gets discouraged after each “no,” so the chance of a sale drops. Excel still gives a number. What is wrong?", "p is no longer constant and the trials are not independent, so the binomial model does not fit. Excel’s number answers the wrong question."]]},
 {obj:"5-3", t:"When Poisson fits", stem:"Poisson or not?", parts:[
   ["Number of typos per page.", "<b>Poisson.</b>"],
   ["How long until the next customer arrives.", "<b>Not Poisson</b>: that is a waiting time, not a count."],
   ["Number of customers per hour at a café that gets slammed at lunch.", "<b>Not a good fit</b>: the rate is not steady."],
   ["Number of potholes per mile of road.", "<b>Poisson</b>: events per stretch of distance."]]},
 {obj:"5-3", t:"Poisson in Excel", stem:"A help desk averages 6 calls per hour.", hint:"First rescale the mean to the time the question asks about.", parts:[
   ["What is the mean for 20 minutes?", "6 × (20 ÷ 60) = <b>2</b>."],
   ["P(no calls in 20 minutes)? Excel?", "<code>=POISSON.DIST(0,2,FALSE)</code> = <b>0.1353</b>"],
   ["P(exactly 3 calls in an hour)? Excel?", "<code>=POISSON.DIST(3,6,FALSE)</code> = <b>0.0892</b>"],
   ["P(at least 2 calls in an hour)? Excel?", "<code>=1-POISSON.DIST(1,6,TRUE)</code> = <b>0.9826</b>", 7]]},
 {obj:"5-3", t:"Poisson and binomial", stem:"", parts:[
   ["A Poisson count has mean 9. What are the variance and standard deviation?", "Variance = <b>9</b>, standard deviation = √9 = <b>3</b>."],
   ["“Of 20 shoppers, how many buy?” versus “how many shoppers per hour?” Which is binomial and which is Poisson? What is the most each one can be?", "Of 20 shoppers: <b>binomial</b>, and x can be at most 20. Per hour: <b>Poisson</b>, with no upper limit."]]},

 {obj:"6-1", t:"The standard normal", stem:"", hint:"A z-score is a distance in standard deviations, not a percentile.", parts:[
   ["What are the mean and standard deviation of the standard normal?", "Mean <b>0</b>, standard deviation <b>1</b>."],
   ["What does z = 2 mean in plain words?", "Two standard deviations above the mean. It is a distance, not a percentile."],
   ["What is the probability of getting exactly z = 1.000…? Why?", "<b>0.</b> Only a range has area; probability is area, not the height of the curve."],
   ["Is the area left of −1.5 equal to the area right of +1.5?", "Yes, by symmetry."]]},
 {obj:"6-1", t:"Areas, and going backwards", stem:"", parts:[
   ["Area to the left of z = 1.25.", "<b>0.8944</b>", 2],
   ["Area to the right of z = 1.25.", "1 − 0.8944 = <b>0.1056</b>", 1],
   ["Area between −1.25 and 1.25.", "0.8944 − 0.1056 = <b>0.7887</b> (0.7888 from the rounded table values)."],
   ["What z is the 80th percentile? Excel?", "z ≈ <b>0.84</b>. <code>=NORM.S.INV(0.80)</code> gives 0.8416."]]},
 {obj:"6-2", t:"Standardizing", stem:"Pizza delivery times are normal with mean 40 minutes and standard deviation 8.", parts:[
   ["z-score for 44 minutes?", "(44 − 40) ÷ 8 = <b>0.5</b>."],
   ["P(one delivery takes more than 44 minutes)? Excel? Say it in a sentence.", "1 − 0.6915 = <b>0.3085</b>. <code>=1-NORM.DIST(44,40,8,TRUE)</code> About 31% of deliveries take more than 44 minutes.", 1],
   ["P(a delivery takes more than 56 minutes)? Give the exact value, not a rule of thumb.", "z = 2, so 1 − 0.9772 = <b>0.0228</b>. Not 2.5%.", 6]]},
 {obj:"6-2", t:"Finding a cutoff", stem:"Same deliveries: mean 40, standard deviation 8.", hint:"NORM.INV wants the area to the LEFT. Top X% → feed 1 − X. Bottom X% stays as it is.", parts:[
   ["What time marks the slowest 10%? Excel?", "The slowest 10% is the top 10%, so feed 0.90: <code>=NORM.INV(0.90,40,8)</code> = <b>50.3 minutes</b> (40 + 1.282 × 8)."],
   ["What time marks the fastest 25%? Excel?", "The bottom 25% stays as it is: <code>=NORM.INV(0.25,40,8)</code> = <b>34.6 minutes</b>."],
   ["Which of NORM.DIST and NORM.INV goes from a value to a probability, and which from a probability to a value?", "<b>NORM.DIST</b>: value → probability. <b>NORM.INV</b>: probability → value."]]},
 {obj:"6-3", t:"Population, sample, sampling distribution", stem:"The store looks at all deliveries ever made, then records 16 deliveries this week, then imagines the average of every possible set of 16.", parts:[
   ["Which is the population, the sample, and the sampling distribution?", "All deliveries ever = the <b>population</b>. The 16 = a <b>sample</b>. The averages of every possible set of 16 = the <b>sampling distribution</b>."],
   ["The average of all deliveries ever: parameter or statistic? The average of the 16: parameter or statistic?", "All deliveries ever (μ): a <b>parameter</b>. The 16 (x̄): a <b>statistic</b>."]]},
 {obj:"6-3", t:"Bias and variability", stem:"", parts:[
   ["Explain bias and variability using darts.", "Bias: the whole cluster sits away from the bullseye. Variability: how spread out the cluster is."],
   ["Which are unbiased: sample mean, median, proportion, range, variance, standard deviation?", "Unbiased: <b>mean, proportion, variance</b>. Biased: median, range, standard deviation.", 4],
   ["Does a bigger sample fix bias?", "No. A bigger sample shrinks variability, not bias."]]},
 {obj:"6-3", t:"Samples with replacement", stem:"A tiny population is {2, 4, 6}.", parts:[
   ["How many samples of size 2 are there with replacement, if order matters? List them.", "3 × 3 = <b>9</b>: (2,2) (2,4) (2,6) (4,2) (4,4) (4,6) (6,2) (6,4) (6,6).", 5]]},
 {obj:"6-4", t:"Central limit theorem", stem:"", parts:[
   ["What does the central limit theorem say, in one sentence?", "Sample means become approximately normal as n grows, whatever the shape of the population."],
   ["Does it make the individual deliveries normal?", "No. It is about means only."],
   ["Which needs a bigger n to look normal: a skewed population or a symmetric one?", "A <b>skewed</b> one. Over 30 is the usual guide."]]},
 {obj:"6-4", t:"Standard error", stem:"σ = 8.", parts:[
   ["Standard error for n = 16? For n = 64?", "8 ÷ √16 = <b>2</b>, and 8 ÷ √64 = <b>1</b>."],
   ["What is the difference between σ and the standard error?", "σ is the spread of individuals; the standard error is the spread of sample means."],
   ["To cut the standard error in half, how much bigger must the sample be?", "<b>4 times</b> as big."]]},
 {obj:"6-4", t:"One delivery or a sample mean", stem:"Deliveries: mean 40, standard deviation 8.", parts:[
   ["P(one delivery takes more than 44 minutes)?", "z = 0.5, so <b>0.3085</b>."],
   ["P(the mean of 16 deliveries is more than 44 minutes)? Excel?", "Standard error = 8 ÷ √16 = 2, so z = (44 − 40) ÷ 2 = 2, giving <b>0.0228</b>. <code>=1-NORM.DIST(44,40,8/SQRT(16),TRUE)</code>", 3],
   ["What should you check before using a normal model for the mean of 16?", "A random sample, independent observations, and a population that is normal or a large n (over 30). Here the population is normal, so n = 16 is fine."]]},
 {obj:"6-5", t:"Histogram and quantile plot", stem:"", parts:[
   ["What histogram shape and quantile-plot pattern support a normal model?", "A bell-shaped histogram, and quantile-plot points close to a straight line."],
   ["What patterns raise concerns?", "A systematic curve, such as an S shape, or points far off the line."],
   ["Do the graphs prove the data is normal?", "No. Graphs support or question a model; they never prove it."]]}
];

/* ================================================================ the two essay questions (Exam 2 essay rubric, pasted 8-oct)
   The rubric names the criteria and their points, not the questions themselves. "say" is what
   each criterion asks for in plain words; the practice question is ours, with a full-credit
   answer. test.js recomputes its numbers.                                                    */
var ESSAYS = [
 {q:"Question 17", pts:10, about:"A probability about a machine: calculate it, say what it means, and name the weak spot in the model.",
  rows:[
   ["Probability calculation", 4, "Show the calculation and report the probability with consistent units.", "Write the model and its numbers, the formula with the numbers in it, and the answer. If the rate is “per week” and the question is “per shift”, convert it first and say so."],
   ["Reliability interpretation", 3, "Compare the two probabilities and explain what the comparison means for the machine.", "Put the two numbers side by side, say which is bigger and by about how much, then say what that means for the machine in plain words."],
   ["Assumption and limitation", 3, "Explain a realistic way the model assumption could fail and why it matters.", "Name the assumption (events independent, rate or chance constant), give one real way it breaks, and say what that does to your answer."]],
  steps:["Name the model and the numbers: what you are counting, and n and p, or the mean for the time asked about.",
   "Show the work: the formula or the Excel function with the numbers in it, then the probability.",
   "Do the same for the second probability, in the same units.",
   "Compare them in one sentence, and say what it means for the machine.",
   "Name one assumption, one realistic way it fails, and why the answer would then be off."],
  prompt:"A packaging machine averages 3 breakdowns per 40-hour week. Find the probability of no breakdowns in one 8-hour shift, and the probability of no breakdowns in a full week. Compare them, and discuss one assumption.",
  answer:["<b>Model.</b> Breakdowns in a stretch of time: a Poisson count. The rate is 3 per 40 hours.",
   "<b>One shift.</b> Convert the rate to the shift: 3 × (8 ÷ 40) = 0.6 breakdowns per shift. P(none) = <code>=POISSON.DIST(0,0.6,FALSE)</code> = <b>0.5488</b>.",
   "<b>One week.</b> The mean is 3 per week. P(none) = <code>=POISSON.DIST(0,3,FALSE)</code> = <b>0.0498</b>.",
   "<b>Compare.</b> A breakdown-free shift happens about 55% of the time; a breakdown-free week only about 5% of the time, roughly eleven times less likely. The machine is fairly dependable over a single shift, but over a whole week a breakdown is close to certain, so maintenance should be planned every week.",
   "<b>Assumption.</b> Poisson assumes breakdowns happen independently and at a steady rate. That can fail if the machine wears or heats up as the week goes on, or if one breakdown damages a part and causes another. Then breakdowns cluster and the true chance of a trouble-free week is not 0.0498, so the number would mislead whoever plans the repairs."]},
 {q:"Question 18", pts:10, about:"The sampling distribution of the sample mean: where it centers, what shape it has and when, and how it differs from the individual values.",
  rows:[
   ["Center of sample means", 3, "Identify the center of the sampling distribution and explain its relation to the population.", "The sample means center on the population mean. Say why: the sample mean is an unbiased estimator, so it targets the population mean."],
   ["Shape and conditions", 4, "Explain the expected shape and the relevant sampling conditions.", "Approximately normal, because the population is normal or the sample is larger than 30 (central limit theorem). Conditions: a random sample and independent observations. Give the spread too: σ ÷ √n."],
   ["Distribution distinction", 3, "Distinguish the distribution of a statistic from the distribution of individual observations.", "Individual values keep the population’s shape and its spread, σ. The sample means are a different distribution: bell-shaped and narrower, with spread σ ÷ √n. The theorem does not make the individuals normal."]],
  steps:["Center: the mean of the sample means equals the population mean. Give the number.",
   "Spread: the standard error, σ ÷ √n. Give the number.",
   "Shape: approximately normal, and the reason (normal population, or n over 30).",
   "Conditions: random sample, independent observations.",
   "The difference: individuals keep the population’s shape and σ; sample means are bell-shaped and narrower."],
  prompt:"Customer wait times are skewed to the right, with a mean of 12 minutes and a standard deviation of 6 minutes. A manager takes random samples of 36 customers and records each sample’s mean. Describe the sampling distribution of the sample mean, and explain how it differs from the distribution of individual wait times.",
  answer:["<b>Center.</b> The sample means center on the population mean, <b>12 minutes</b>. The sample mean is an unbiased estimator: across many samples it targets the population mean.",
   "<b>Spread.</b> The standard error is 6 ÷ √36 = <b>1 minute</b>.",
   "<b>Shape.</b> Approximately normal. The population is skewed, but the sample size, 36, is larger than 30, so the central limit theorem applies.",
   "<b>Conditions.</b> The samples must be random and the observations independent, for example by sampling a small share of all customers.",
   "<b>The difference.</b> Individual wait times stay skewed to the right, with a standard deviation of 6 minutes; one customer can easily wait 20. The means of 36 customers form a different distribution: bell-shaped and much narrower, almost always within about 2 minutes of 12. The theorem is about the means, not about the individual customers."]}
];

