/* ================================================================ the cheat sheet: read the question, spot the clue, make the move
   Built from the professor's 48 practice questions (he said the exam questions are all there)
   and the essay rubric. Each line: the words to look for, what to do, and the mistake the wrong
   choices are built on. test.js checks every line against a real question.                    */
var CHEAT_STEPS = [
 "<b>What is it asking for?</b> A probability, a count, a cutoff value, an Excel formula, or a reason.",
 "<b>Find the clue word</b> in the tables below. It tells you the move.",
 "<b>Cross out what cannot be right</b>: a probability above 1 or below 0, a formula that skips a step, a choice with “always” or “guarantees”.",
 "<b>Check the units and the question</b>: per hour or per day? One person or a sample mean? At least or exactly?"
];
var CHEAT = [
 {h:"Chapter 4 · Probability", rows:[
  ["“or”", "Add the two, then subtract the overlap <b>once</b>.", "Adding without subtracting; subtracting twice."],
  ["“and”, “both”", "Multiply. Without replacement, the top <b>and</b> the bottom drop by one.", "Keeping the same fraction; using + instead of ×."],
  ["“neither”, “none”", "Turn each chance into its miss (1 − p), then multiply the misses.", "Multiplying the hits (that is “both”)."],
  ["“at least one”", "1 − P(none).", "Computing “exactly one”."],
  ["“given”, “of those who…”, “a flagged item is…”", "Divide by <b>that group only</b>, not by everyone.", "Dividing by the grand total."],
  ["“40% of coupon users were…” → wants <b>all</b> customers who did both", "Multiply by that group’s share of everyone.", "Using the 40% alone."],
  ["Two groups, two rates, “it happened — which group?”", "The pile: (share × rate) ÷ (share × rate + other share × other rate).", "rate ÷ (rate + rate), with no shares; or stopping at share × rate."],
  ["A lower base rate (rarer defect, rarer fraud)", "A positive result is <b>less</b> believable there: more of the positives are false alarms.", "“Same test, so same answer.”"],
  ["“never both”, “cannot both”", "Mutually exclusive, and <b>dependent</b>. Complementary only if nothing else is possible.", "Calling them independent."],
  ["Multiplying two chances — is it allowed?", "Only if independent. A <b>shared cause</b> breaks it.", "“Different probabilities” or “many customers” as the reason."],
  ["A streak; “it’s due”", "The next one is still the same chance. Long-run balance is not a correction.", "“Must even out.”"],
  ["A group, a committee, a subcommittee", "Order does not matter: <code>=COMBIN(n,r)</code>.", "The bigger number, which is the permutation."],
  ["Roles, titles, chair and recorder", "Order matters: count down, <code>=PERMUT(n,r)</code>.", "The combination."],
  ["“Sample space” for two flips", "All four ordered outcomes: HH, HT, TH, TT.", "Leaving out TH."]]},
 {h:"Chapter 5 · Discrete distributions", rows:[
  ["Is this table valid?", "Every probability between 0 and 1 <b>and</b> they add to 1. Both.", "“It adds to 1, so it is fine.”"],
  ["“Expected”", "Each value × its probability, added up. A <b>loss is negative</b>. It is a long-run average and need not be a possible value.", "Forgetting the loss; picking the most likely value."],
  ["Is it binomial?", "Fixed number of trials, independent, two outcomes, same p. “<b>Until</b>…” is not; many outcomes is not unless you name one as success.", "“Any repeated thing is binomial.”"],
  ["Binomial mean and standard deviation", "Mean = n × p. Standard deviation = √(n × p × (1 − p)).", "Giving the variance (before the square root)."],
  ["“exactly k”", "<code>BINOM.DIST(k, n, p, FALSE)</code>", "TRUE."],
  ["“at most k”, “k or fewer”", "<code>BINOM.DIST(k, n, p, TRUE)</code>", ""],
  ["“fewer than k”", "TRUE at <b>k − 1</b>.", "TRUE at k."],
  ["“at least k”", "<b>1 −</b> TRUE at <b>k − 1</b>. With F: 1 − F(k − 1).", "1 − F(k); or no “1 −”."],
  ["“more than k”", "<b>1 −</b> TRUE at k.", ""],
  ["Events “per hour”, “per day”, in an interval", "Poisson. <b>Convert the rate</b> to the time asked first, then <code>POISSON.DIST(x, mean, FALSE)</code>.", "Using the rate as given; swapping x and the mean."],
  ["Which one is Poisson?", "A <b>count of events</b> in a fixed stretch. Not a waiting time, an amount or a percentage.", "“Minutes until the next customer.”"],
  ["The interval gets k times longer", "Mean × k, variance × k, standard deviation × √k.", "“All three × k.”"],
  ["Counted or measured?", "Counted: discrete. Measured: continuous. A category (party, color): not a random variable.", ""]]},
 {h:"Chapter 6 · Normal and sampling", rows:[
  ["The height of the curve", "Not a probability. Probability is <b>area</b>; one exact value has probability 0.", "“Height = probability.”"],
  ["“less than x”", "<code>NORM.DIST(x, mean, sd, TRUE)</code>", "FALSE (that is the height)."],
  ["“greater than x”, “exceeds”", "<b>1 −</b> <code>NORM.DIST(x, mean, sd, TRUE)</code>", "Forgetting the “1 −”."],
  ["“between a and b”", "NORM.DIST at the upper <b>minus</b> NORM.DIST at the lower.", "Adding them."],
  ["A cutoff for the “top X%”", "<code>NORM.INV(1 − X, mean, sd)</code>. The function wants the area to the <b>left</b>.", "Feeding X itself."],
  ["A cutoff for the “bottom X%”", "<code>NORM.INV(X, mean, sd)</code>, as it is.", ""],
  ["“one randomly selected…”, “an individual”", "Use the standard deviation as given.", "Dividing by √n."],
  ["“the mean of n…”, “a sample mean”", "Use the standard error: sd ÷ <b>√n</b>.", "sd alone; or sd ÷ n."],
  ["The mean of all the sample means", "Equals the population mean. Sample size changes the spread, not the center.", "Dividing or multiplying by n."],
  ["Four times the sample size", "The standard error is cut in <b>half</b>.", "“Divided by four.”"],
  ["Central limit theorem", "The <b>sample means</b> become roughly normal. Individuals stay as they were. 30 is a guide, not a guarantee.", "“The population becomes normal.”"],
  ["Biased or unbiased?", "Unbiased: <b>mean, proportion, variance</b>. Tight but off-target is biased; spread out but centered can be unbiased.", "“Close together, so unbiased.”"],
  ["Does it look normal?", "Bell-shaped histogram <b>and</b> a roughly straight quantile plot. A clear curve means not normal. Graphs never prove it.", "“The plot proves it.”"]]}
];
var CHEAT_TELL = "In his worded questions, choices with <b>always, never, must, guarantees, proves, automatically</b> are almost always the wrong ones. The right answer usually explains a reason and leaves room (“can”, “may”, “approximately”).";
var CHEAT_ESSAY = [
 "<b>Question 17 (a machine):</b> show the calculation with units matched → compare the two probabilities and say what it means for the machine → name one assumption, how it could fail, and why that matters.",
 "<b>Question 18 (sample means):</b> center = the population mean → shape roughly normal, because the population is normal or n is over 30, with a random, independent sample → individuals keep the population’s shape and sd; the means are bell-shaped and narrower (sd ÷ √n)."
];
