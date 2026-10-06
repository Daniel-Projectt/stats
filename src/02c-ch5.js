/* ================================================================ Chapter 5 · Discrete Probability Distributions */
CH.c5 = {n:"5", title:"Discrete Probability Distributions", short:"Ch 5", ref:"Sections 5-1 to 5-3",
 notes:[
  {id:"c5-rv", h:"5-1 · Discrete or continuous random variable", body:
   '<div class="point"><b>The point</b><p>A <mark>random variable</mark> is a number that depends on chance. If you <mark>count</mark> it, it is <b>discrete</b>. If you <mark>measure</mark> it, it is <b>continuous</b>.</p><p class="able"><b>Be able to</b> classify a variable, say exactly what is counted or measured, and tell the variable from one of its values.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th></th><th>Discrete</th><th>Continuous</th></tr></thead><tbody>'+
   '<tr><td class="head">How</td><td class="sm">You <mark>count</mark>: 0, 1, 2, 3…</td><td class="sm">You <mark>measure</mark>: any value in a range</td></tr>'+
   '<tr><td class="head">Examples</td><td class="sm">Hits to a website, people in a restaurant, runs in a game</td><td class="sm">Time for a bulb to burn out, distance a ball travels, weight</td></tr>'+
   '<tr><td class="head">Test</td><td class="sm">No values in between (no 2.5 people)</td><td class="sm">Always a value in between (2.5, 2.51…)</td></tr></tbody></table></div>'+
   '<ul><li><mark>Not a random variable at all</mark>: a category such as hair color. It is not a number.</li>'+
   '<li>A limit does not change the type: the number of people in a restaurant that holds 150 is still a count, so discrete.</li>'+
   '<li><b>Variable vs value:</b> the variable is the rule, “x = the number of defects in a box”. A value is one result, “x = 3”.</li></ul>'},

  {id:"c5-valid", h:"5-1 · Is it a valid probability distribution?", body:
   '<div class="point"><b>The point</b><p>A table of values and probabilities is a probability distribution only if it passes <mark>three checks</mark>.</p><p class="able"><b>Be able to</b> run the three checks and name the one that fails.</p></div>'+
   '<ol><li>The values of x are <mark>numbers</mark>, not categories.</li>'+
   '<li><mark>Every P(x) is between 0 and 1</mark>, inclusive.</li>'+
   '<li>The probabilities <mark>add up to exactly 1</mark> (a tiny rounding gap such as 0.999 is fine).</li></ol>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>x</th><th>P(x)</th></tr></thead><tbody>'+
   '<tr><td class="num">0</td><td class="num">0.1</td></tr><tr><td class="num">1</td><td class="num">0.3</td></tr><tr><td class="num">2</td><td class="num">0.4</td></tr><tr><td class="num">3</td><td class="num">0.2</td></tr></tbody></table></div>'+
   '<p>Numbers ✓, each between 0 and 1 ✓, sum 0.1 + 0.3 + 0.4 + 0.2 = <b>1</b> ✓. <mark>Valid.</mark> If the sum were 0.9, or one value were −0.1, it would not be.</p>'},

  {id:"c5-mean", h:"5-1 · Mean, variance and standard deviation", body:
   '<div class="point"><b>The point</b><p>The probabilities act as <mark>weights</mark>. <mark>Mean: μ = Σ x·P(x)</mark>. <mark>Variance: σ² = Σ x²·P(x) − μ²</mark>. Standard deviation: σ = '+SQ('variance')+'.</p><p class="able"><b>Be able to</b> compute all three, say what they mean, and give the units.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>x</th><th>P(x)</th><th>x·P(x)</th><th>x²·P(x)</th></tr></thead><tbody>'+
   '<tr><td class="num">0</td><td class="num">0.1</td><td class="num">0</td><td class="num">0</td></tr>'+
   '<tr><td class="num">1</td><td class="num">0.3</td><td class="num">0.3</td><td class="num">0.3</td></tr>'+
   '<tr><td class="num">2</td><td class="num">0.4</td><td class="num">0.8</td><td class="num">1.6</td></tr>'+
   '<tr><td class="num">3</td><td class="num">0.2</td><td class="num">0.6</td><td class="num">1.8</td></tr>'+
   '<tr><td class="head">Sum</td><td class="num">1</td><td class="num"><b>1.7</b></td><td class="num"><b>3.7</b></td></tr></tbody></table></div>'+
   '<ol><li><b>Mean</b> = <mark>1.7</mark>.</li><li><b>Variance</b> = 3.7 − 1.7² = 3.7 − 2.89 = <mark>0.81</mark>.</li><li><b>Standard deviation</b> = '+SQ('0.81')+' = <mark>0.9</mark>.</li></ol>'+
   '<ul><li>Keep the <b>unrounded</b> mean until the end, or the answer drifts.</li>'+
   '<li><b>Units:</b> if x is in customers, the mean and the standard deviation are in <mark>customers</mark>; the variance is in <mark>customers squared</mark>, which is why we take the square root.</li>'+
   '<li><b>Significantly high</b>: μ + 2σ or more. <b>Significantly low</b>: μ − 2σ or less. Here 1.7 + 1.8 = 3.5 and 1.7 − 1.8 = −0.1.</li></ul>'+
   '<h3 class="sub" id="c5-meanxl">In Excel</h3>'+
   '<p>With x in A2:A5 and P(x) in B2:B5: mean '+XL('=SUMPRODUCT(A2:A5,B2:B5)')+', standard deviation '+XL('=SQRT(SUMPRODUCT(A2:A5^2,B2:B5)-D2^2)')+' with the mean in D2.</p>'},

  {id:"c5-ev", h:"5-1 · Expected value", body:
   '<div class="point"><b>The point</b><p>The <mark>expected value</mark> is the mean of the distribution: the <mark>average you would get over a very large number of repetitions</mark>. It is a long-run average, not a prediction for one try.</p><p class="able"><b>Be able to</b> explain what an expected value is and is not, and compare two risky choices.</p></div>'+
   '<ul><li>It <mark>need not be a possible value</mark>: an expected 1.7 customers, or 2.5 children.</li>'+
   '<li>It <mark>need not be the most likely value</mark>, and it is <mark>never guaranteed</mark> on any one trial.</li></ul>'+
   '<p><b>Example.</b> A $10 raffle ticket has a 1% chance to win $500. Net gain: +$490 with probability 0.01, −$10 with probability 0.99. Expected value = 490(0.01) + (−10)(0.99) = 4.90 − 9.90 = <mark>−$5</mark>. No single ticket loses $5; that is the average loss per ticket over many tickets.</p>'+
   '<p><b>Insurance.</b> A $500,000 policy with a 0.00031 chance of paying costs the company 500,000 × 0.00031 = $155 on average. To expect a $300 return it charges 155 + 300 = <b>$455</b>.</p>'+
   '<div class="exam-tip"><b>Compare the variation too</b>Option A: a sure $100. Option B: $200 or $0, each with probability 0.5. Both have an expected value of <b>$100</b>, but A has a standard deviation of 0 and B of $100. <mark>Same average, very different risk.</mark></div>'},

  {id:"c5-binreq", h:"5-2 · The binomial requirements", body:
   '<div class="point"><b>The point</b><p>A binomial distribution counts <mark>successes in a fixed number of trials</mark>. It applies only when <mark>four requirements</mark> all hold.</p><p class="able"><b>Be able to</b> check the four requirements, define the trial and the success, and identify n, p and x.</p></div>'+
   '<ol><li>A <mark>fixed number of trials</mark> (n).</li>'+
   '<li>The trials are <mark>independent</mark>.</li>'+
   '<li>Each trial has <mark>two outcomes</mark>: success or failure.</li>'+
   '<li>The <mark>probability of success (p) is the same</mark> on every trial.</li></ol>'+
   '<ul><li><b>n</b> = number of trials · <b>p</b> = probability of success on one trial · <b>q</b> = 1 − p · <b>x</b> = number of successes, from 0 to n.</li>'+
   '<li>“Success” is just the outcome you are counting. It can be a bad thing, like a defect.</li></ul>'+
   '<p><b>Example.</b> 10 customers, each with a 30% chance of buying: the trial is one customer, a success is a purchase, n = 10, p = 0.3.</p>'+
   '<div class="exam-tip"><b>What breaks it</b>“Keep going <b>until</b> the first success”: no fixed n. Recording a rating from 1 to 5: more than two outcomes. Drawing without replacement from a small group: not independent.</div>'+
   '<h3 class="sub" id="c5-five">The 5% guideline</h3>'+
   '<p>Sampling without replacement is technically dependent. If the sample is <mark>no more than 5% of the population</mark>, treat it as independent anyway. 15 senators out of 100 is 15%: <b>not</b> binomial.</p>'},

  {id:"c5-binxl", h:"5-2 · Binomial probabilities in Excel; the five phrases", body:
   '<div class="point"><b>The point</b><p><mark>=BINOM.DIST(x, n, p, FALSE)</mark> gives <b>exactly</b> x. <mark>=BINOM.DIST(x, n, p, TRUE)</mark> gives <b>x or fewer</b>. Every other phrase is built from the TRUE version.</p><p class="able"><b>Be able to</b> translate each phrase into the right endpoint and explain any complement.</p></div>'+
   '<h3 class="sub" id="c5-phrases">The five phrases (n = 10, p = 0.3)</h3>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>Phrase</th><th>Means</th><th>Excel → answer</th></tr></thead><tbody>'+
   '<tr><td class="head">Exactly 3</td><td class="sm">x = 3</td><td class="sm">'+XL('=BINOM.DIST(3,10,0.3,FALSE)')+'<span class="ans">0.2668</span></td></tr>'+
   '<tr><td class="head">At most 3</td><td class="sm">x ≤ 3</td><td class="sm">'+XL('=BINOM.DIST(3,10,0.3,TRUE)')+'<span class="ans">0.6496</span></td></tr>'+
   '<tr><td class="head">Fewer than 3</td><td class="sm">x ≤ <mark>2</mark></td><td class="sm">'+XL('=BINOM.DIST(2,10,0.3,TRUE)')+'<span class="ans">0.3828</span></td></tr>'+
   '<tr><td class="head">At least 4</td><td class="sm">x ≥ 4</td><td class="sm">'+XL('=1-BINOM.DIST(3,10,0.3,TRUE)')+'<span class="ans">0.3504</span></td></tr>'+
   '<tr><td class="head">More than 3</td><td class="sm">x ≥ <mark>4</mark></td><td class="sm">'+XL('=1-BINOM.DIST(3,10,0.3,TRUE)')+'<span class="ans">0.3504</span></td></tr></tbody></table></div>'+
   '<ul><li><b>Why the complement:</b> Excel only adds up from 0. “At least 4” is everything <b>except</b> 0 through 3, so take 1 minus “3 or fewer”.</li>'+
   '<li><b>The trap:</b> for “at least k”, subtract the cumulative value at <mark>k − 1</mark>, not at k.</li>'+
   '<li>By hand: P(x) = (number of ways) × pˣ × qⁿ⁻ˣ. For n = 3, p = 0.4, x = 1: 3 × 0.4 × 0.6² = 0.432.</li></ul>'},

  {id:"c5-binmean", h:"5-2 · Binomial mean and standard deviation; when the model fails", body:
   '<div class="point"><b>The point</b><p>For a binomial you do not need the table: <mark>μ = n·p</mark> and <mark>σ = '+SQ('n·p·q')+'</mark>, with q = 1 − p.</p><p class="able"><b>Be able to</b> compute and interpret both, and explain how a correct formula can still mislead.</p></div>'+
   '<ul><li><b>26 births, p = 0.5:</b> μ = 26 × 0.5 = <b>13</b>; σ = '+SQ('26 × 0.5 × 0.5')+' = '+SQ('6.5')+' = <b>2.5</b>.</li>'+
   '<li><b>18 peas, p = 0.75:</b> μ = <b>13.5</b>; σ = '+SQ('18 × 0.75 × 0.25')+' = <b>1.8</b>.</li>'+
   '<li><b>Interpret:</b> over many groups of 26 births the average is 13 girls, typically within about 2.5 of that.</li>'+
   '<li><b>Range rule:</b> significantly low ≤ μ − 2σ (13 − 5.1 = 7.9); significantly high ≥ μ + 2σ (18.1).</li></ul>'+
   '<h3 class="sub" id="c5-binfail">When the model fails</h3>'+
   '<p>Excel will <mark>always return a number</mark>, even when the situation is not binomial. If the trials are <mark>not independent</mark> (one customer’s purchase influences the next) or <mark>p changes</mark> (a tired inspector misses more), the formula still computes, but it is answering a question about a world that does not exist. <b>Check the four requirements before trusting the output.</b></p>'},

  {id:"c5-poi", h:"5-3 · When Poisson fits", body:
   '<div class="point"><b>The point</b><p>The Poisson distribution counts <mark>how many events happen in an interval</mark> of time, distance, area or volume: calls per hour, typos per page, potholes per mile.</p><p class="able"><b>Be able to</b> recognize a Poisson setting, check its requirements, and tell an event count from a waiting time.</p></div>'+
   '<ul><li><b>The variable</b> is the <mark>number of occurrences in the interval</mark>: 0, 1, 2, … with no upper limit.</li>'+
   '<li><b>Requirements:</b> the events occur <mark>independently</mark> of one another, at a <mark>reasonably constant average rate</mark> across the interval.</li>'+
   '<li>One number describes it: <b>μ</b>, the mean number of events per interval.</li></ul>'+
   '<p><b>Fits:</b> customers arriving at a steady 4 per hour. <b>Does not fit:</b> arrivals that surge at lunch (rate not constant) or people arriving in groups (not independent).</p>'+
   '<div class="exam-tip"><b>Counts, not waiting times</b>“How <b>many</b> calls arrive in an hour?” is a count: Poisson, discrete. “How <b>long</b> until the next call?” is a waiting time: continuous, and not Poisson.</div>'},

  {id:"c5-poixl", h:"5-3 · Rescale the rate, then use Excel", body:
   '<div class="point"><b>The point</b><p>First make the mean match <mark>the interval the question asks about</mark>. Then use <mark>=POISSON.DIST(x, mean, FALSE)</mark> for exactly x, or TRUE for x or fewer.</p><p class="able"><b>Be able to</b> convert a rate to a new interval and compute Poisson probabilities.</p></div>'+
   '<p><b>Rescaling.</b> A store gets <b>4 customers per hour</b>.</p>'+
   '<ul><li>In <b>half an hour</b>: μ = 4 × 0.5 = <mark>2</mark>.</li><li>In <b>two hours</b>: μ = 4 × 2 = <mark>8</mark>.</li>'+
   '<li>Given a total: 8,000 arrivals over 19,170 time units is μ = 8,000 ÷ 19,170 = 0.417 per unit. <b>μ is per one interval, never the raw total.</b></li></ul>'+
   '<h3 class="sub" id="c5-poidist">POISSON.DIST (mean 4 per hour)</h3>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>Question</th><th>Excel → answer</th></tr></thead><tbody>'+
   '<tr><td class="head">Exactly 2 in an hour</td><td class="sm">'+XL('=POISSON.DIST(2,4,FALSE)')+'<span class="ans">0.1465</span></td></tr>'+
   '<tr><td class="head">At most 2 in an hour</td><td class="sm">'+XL('=POISSON.DIST(2,4,TRUE)')+'<span class="ans">0.2381</span></td></tr>'+
   '<tr><td class="head">At least 1 in an hour</td><td class="sm">'+XL('=1-POISSON.DIST(0,4,TRUE)')+'<span class="ans">0.9817</span></td></tr>'+
   '<tr><td class="head">None in half an hour</td><td class="sm">'+XL('=POISSON.DIST(0,2,FALSE)')+'<span class="ans">0.1353</span></td></tr></tbody></table></div>'+
   '<p>By hand: P(x) = '+FR('μˣ · e⁻ᵘ','x!')+', where <b>e ≈ 2.71828</b> is a fixed constant. Keep the <b>event</b>, the <b>interval</b> and the <b>units</b> consistent from start to finish.</p>'},

  {id:"c5-poivs", h:"5-3 · Poisson’s mean and variance; Poisson vs binomial", body:
   '<div class="point"><b>The point</b><p>In a Poisson distribution the <mark>variance equals the mean</mark>, so the <mark>standard deviation is '+SQ('μ')+'</mark>. One number gives you everything.</p><p class="able"><b>Be able to</b> state these relationships and tell a Poisson count from a binomial count.</p></div>'+
   '<ul><li>Mean 4 per hour → variance <b>4</b>, standard deviation '+SQ('4')+' = <b>2</b>.</li>'+
   '<li>Mean 12 per day → standard deviation '+SQ('12')+' = <b>3.46</b>.</li></ul>'+
   '<h3 class="sub" id="c5-vs">Poisson vs binomial</h3>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th></th><th>Binomial</th><th>Poisson</th></tr></thead><tbody>'+
   '<tr><td class="head">Counts</td><td class="sm">Successes in <mark>n fixed trials</mark></td><td class="sm">Events in an <mark>interval</mark></td></tr>'+
   '<tr><td class="head">Possible values</td><td class="sm">0, 1, …, <mark>n</mark> (it stops at n)</td><td class="sm">0, 1, 2, … <mark>no upper limit</mark></td></tr>'+
   '<tr><td class="head">Needs</td><td class="sm">n and p</td><td class="sm">only μ</td></tr>'+
   '<tr><td class="head">Mean · SD</td><td class="sm">np · '+SQ('npq')+'</td><td class="sm">μ · '+SQ('μ')+'</td></tr>'+
   '<tr><td class="head">Assumes</td><td class="sm">Independent trials, same p, two outcomes</td><td class="sm">Independent events, steady rate</td></tr></tbody></table></div>'+
   '<p><b>The quick test:</b> can you say how many trials there were? “10 customers, how many buy” has a clear n: binomial. “Calls in an hour” has no number of trials: Poisson.</p>'}
 ],
 decks:[
  {id:"terms", label:"Terms & rules", cards:[
   ["Random variable","A number whose value depends on chance","g51-1"],
   ["Discrete random variable","One you count: 0, 1, 2…","g51-1"],
   ["Continuous random variable","One you measure: any value in a range","g51-1"],
   ["Hair color, as a variable","Not a random variable: it is a category, not a number","g51-1"],
   ["Three checks for a distribution","Numeric x, each P(x) from 0 to 1, and the sum is 1","g51-2"],
   ["Mean of a discrete distribution","Σ x·P(x)","g51-3"],
   ["Variance of a discrete distribution","Σ x²·P(x) − μ²","g51-3"],
   ["Standard deviation","The square root of the variance","g51-3"],
   ["Units of the variance","The original units squared","g51-3"],
   ["Expected value","The long-run average over many repetitions","g51-4"],
   ["Binomial: the four requirements","Fixed n, independent, two outcomes, same p","g52-1"],
   ["n, p, x in a binomial","Trials, chance of success on one trial, number of successes","g52-1"],
   ["The 5% guideline","A sample of at most 5% of the population can be treated as independent","g52-1"],
   ["BINOM.DIST with FALSE","The probability of exactly x","g52-2"],
   ["BINOM.DIST with TRUE","The probability of x or fewer","g52-2"],
   ["“At least 4”, in Excel","1 − BINOM.DIST(3, n, p, TRUE)","g52-2"],
   ["“Fewer than 3”, in Excel","BINOM.DIST(2, n, p, TRUE)","g52-2"],
   ["Binomial mean","n·p","g52-3"],
   ["Binomial standard deviation","√(n·p·q)","g52-3"],
   ["Poisson distribution","Counts events in an interval of time, distance or area","g53-1"],
   ["Poisson requirements","Independent events at a steady average rate","g53-1"],
   ["Rescaling a Poisson mean","Multiply the rate by the new interval’s length","g53-2"],
   ["POISSON.DIST(x, μ, FALSE)","The probability of exactly x events","g53-2"],
   ["Poisson variance","Equal to the mean","g53-3"],
   ["Poisson standard deviation","√μ","g53-3"],
   ["Binomial vs Poisson values","Binomial stops at n; Poisson has no upper limit","g53-3"]]},
  {id:"numbers", label:"Worked numbers", cards:[
   ["x: 0,1,2,3 with P: 0.1, 0.3, 0.4, 0.2 — the mean","1.7","g51-3"],
   ["Same table — the variance","3.7 − 1.7² = 0.81","g51-3"],
   ["Same table — the standard deviation","√0.81 = 0.9","g51-3"],
   ["$10 raffle ticket, 1% chance of $500: expected value","−$5","g51-4"],
   ["$500,000 policy, 0.00031 chance, want $300: the price","155 + 300 = $455","g51-4"],
   ["15 senators from 100, without replacement","Not binomial: 15% is over the 5% guideline","g52-1"],
   ["n = 10, p = 0.3: exactly 3","0.2668","g52-2"],
   ["n = 10, p = 0.3: at most 3","0.6496","g52-2"],
   ["n = 10, p = 0.3: at least 4","1 − 0.6496 = 0.3504","g52-2"],
   ["n = 10, p = 0.3: fewer than 3","0.3828","g52-2"],
   ["n = 3, p = 0.4: exactly 1","3 × 0.4 × 0.6² = 0.432","g52-2"],
   ["26 births, p = 0.5: mean and SD","13 and 2.5","g52-3"],
   ["18 peas, p = 0.75: mean and SD","13.5 and 1.8","g52-3"],
   ["4 per hour, in half an hour","μ = 2","g53-2"],
   ["Mean 4: exactly 2 events","0.1465","g53-2"],
   ["Mean 4: at most 2 events","0.2381","g53-2"],
   ["Mean 2: no events","0.1353","g53-2"],
   ["Poisson mean 4: the standard deviation","√4 = 2","g53-3"]]}
 ]
};

QB = QB.concat([
 /* 5-1 discrete vs continuous */
 {tp:"c5",sec:"g51-1",t:"mc",q:"The number of hits to a website in a week is:",a:"a discrete random variable",w:["a continuous random variable","not a random variable","a parameter"],e:"Hits are counted in whole numbers, so the variable is discrete."},
 {tp:"c5",sec:"g51-1",t:"mc",q:"The time it takes a light bulb to burn out is:",a:"a continuous random variable",w:["a discrete random variable","not a random variable","a binomial variable"],e:"Time is measured and can take any value in a range."},
 {tp:"c5",sec:"g51-1",t:"mc",q:"The hair color of adults in the United States is:",a:"not a random variable",w:["a discrete random variable","a continuous random variable","a Poisson variable"],e:"Hair color is a category, and a random variable must be a number."},
 {tp:"c5",sec:"g51-1",t:"mc",q:"The number of people in a restaurant that seats 150 is discrete because:",a:"people are counted in whole numbers",w:["the restaurant has a limit of 150","the number changes over time","it is measured each hour"],e:"The capacity only caps the count; counting is what makes it discrete."},
 {tp:"c5",sec:"g51-1",t:"tf",q:"“x = the number of defects in a box” is the random variable, while “3 defects” is one value of it.",a:true,e:"True — the variable is the rule for assigning a number; a value is a single observed result."},
 /* 5-1 valid */
 {tp:"c5",sec:"g51-2",t:"mc",q:"A table lists x = 0, 1, 2 with P(x) = 0.2, 0.5, 0.4. Is it a probability distribution?",a:"No, the probabilities sum to 1.1",w:["Yes, every value is positive","No, x must start at 1","Yes, each is under 1"],e:"0.2 + 0.5 + 0.4 = 1.1, and the sum must be exactly 1."},
 {tp:"c5",sec:"g51-2",t:"mc",q:"Which is required of every P(x) in a probability distribution?",a:"It lies between 0 and 1 inclusive",w:["It is greater than 0.05","It is a whole number","It is less than the mean"],e:"A probability can be 0 or 1 or anything between, never outside."},
 {tp:"c5",sec:"g51-2",t:"mc",q:"A table has P(x) values 0.031, 0.148, 0.321, 0.321, 0.148, 0.031. Their sum is:",a:"1.000",w:["0.969","1.031","0.500"],e:"They add to exactly 1, so that requirement is satisfied."},
 {tp:"c5",sec:"g51-2",t:"mc",q:"A table lists the categories red, blue and green with probabilities that sum to 1. It fails because:",a:"the variable is not numerical",w:["the sum is not equal to 1","a probability is negative","there are only three rows"],e:"A random variable must take numerical values, not categories."},
 /* 5-1 mean/var/sd */
 {tp:"c5",sec:"g51-3",t:"mc",q:"For x = 0, 1, 2, 3 with P(x) = 0.1, 0.3, 0.4, 0.2, the mean is:",a:"1.7",w:["1.5","2.0","3.7"],e:"0(0.1) + 1(0.3) + 2(0.4) + 3(0.2) = 1.7."},
 {tp:"c5",sec:"g51-3",t:"mc",q:"For that same table, Σ x²·P(x) = 3.7 and the mean is 1.7. The standard deviation is:",a:"0.9",w:["0.81","1.92","1.4"],e:"Variance = 3.7 − 2.89 = 0.81, and its square root is 0.9."},
 {tp:"c5",sec:"g51-3",t:"mc",q:"If x is measured in customers, the variance is measured in:",a:"customers squared",w:["customers","percent","no units at all"],e:"Squaring the distances squares the units; the square root restores them."},
 {tp:"c5",sec:"g51-3",t:"mc",q:"Which Excel formula gives the mean of a distribution with x in A2:A5 and P(x) in B2:B5?",a:"=SUMPRODUCT(A2:A5,B2:B5)",w:["=AVERAGE(A2:A5)","=SUM(B2:B5)","=AVERAGE(B2:B5)"],e:"SUMPRODUCT multiplies each x by its probability and adds the results."},
 {tp:"c5",sec:"g51-3",t:"mc",q:"A distribution has mean 4.0 and standard deviation 1.4. By the range rule of thumb, which value is significantly high?",a:"7",w:["5","6","4"],e:"The cutoff is 4.0 + 2(1.4) = 6.8, and only 7 is at or above it."},
 {tp:"c5",sec:"g51-3",t:"tf",q:"When finding the standard deviation, you should round the mean first and then use the rounded value.",a:false,e:"False — carry the unrounded mean through the calculation and round only the final answer."},
 /* 5-1 expected value */
 {tp:"c5",sec:"g51-4",t:"mc",q:"The expected value of a random variable is best described as:",a:"the long-run average outcome",w:["the most likely outcome","the outcome of the next trial","the largest possible outcome"],e:"It is the average over a very large number of repetitions."},
 {tp:"c5",sec:"g51-4",t:"mc",q:"A $10 raffle ticket has a 1% chance of winning $500. The expected net gain is:",a:"−$5",w:["+$5","−$10","+$490"],e:"490(0.01) + (−10)(0.99) = 4.90 − 9.90 = −5."},
 {tp:"c5",sec:"g51-4",t:"mc",q:"A family’s expected number of children is 1.7. This shows that an expected value:",a:"need not be a possible outcome",w:["must be a whole number","is always the most likely","is guaranteed each time"],e:"No family has 1.7 children; it is an average across many families."},
 {tp:"c5",sec:"g51-4",t:"mc",q:"An insurer pays $500,000 with probability 0.00031 and wants an expected return of $300. It should charge:",a:"$455",w:["$155","$300","$500,300"],e:"Expected payout is 500,000 × 0.00031 = 155, plus the 300 wanted."},
 {tp:"c5",sec:"g51-4",ap:true,t:"mc",q:"Investment A returns $100 for sure. Investment B returns $200 or $0 with equal chances. How do they compare?",a:"Same expected value, but B is riskier",w:["B has the higher expected value","A has the higher expected value","Same expected value and same risk"],e:"Both average $100, but B’s standard deviation is $100 and A’s is zero."},
 /* 5-2 requirements */
 {tp:"c5",sec:"g52-1",t:"mc",q:"Which is NOT a requirement of a binomial distribution?",a:"The probability of success is 0.5",w:["A fixed number of trials","Independent trials","Two outcomes per trial"],e:"p must stay the same on every trial, but it can be any value from 0 to 1."},
 {tp:"c5",sec:"g52-1",t:"mc",q:"Ten customers each have a 30% chance of buying. What are n and p?",a:"n = 10 and p = 0.3",w:["n = 0.3 and p = 10","n = 3 and p = 0.1","n = 10 and p = 3"],e:"n is the number of trials and p the chance of success on one trial."},
 {tp:"c5",sec:"g52-1",t:"mc",q:"A coin is tossed until the first head appears. This is not binomial because:",a:"the number of trials is not fixed",w:["there are more than two outcomes","the tosses are not independent","p is not equal to 0.5"],e:"“Until” means n is not set in advance."},
 {tp:"c5",sec:"g52-1",t:"mc",q:"15 senators are chosen without replacement from 100, and gender is recorded. This is:",a:"not binomial: the selections are dependent",w:["binomial by the 5% guideline","not binomial: three outcomes","not binomial: n is not fixed"],e:"15 of 100 is 15%, above 5%, so the picks cannot be treated as independent."},
 {tp:"c5",sec:"g52-1",t:"tf",q:"In a binomial setting, a “success” must be a desirable outcome.",a:false,e:"False — a success is simply the outcome being counted, such as a defective item."},
 /* 5-2 Excel and phrases */
 {tp:"c5",sec:"g52-2",t:"mc",q:"Which formula gives P(exactly 3 successes) when n = 10 and p = 0.3?",a:"=BINOM.DIST(3,10,0.3,FALSE)",w:["=BINOM.DIST(3,10,0.3,TRUE)","=BINOM.DIST(10,3,0.3,FALSE)","=1-BINOM.DIST(3,10,0.3,TRUE)"],e:"FALSE asks for exactly x; the order of inputs is x, n, p."},
 {tp:"c5",sec:"g52-2",t:"mc",q:"Which formula gives P(at least 4 successes) when n = 10 and p = 0.3?",a:"=1-BINOM.DIST(3,10,0.3,TRUE)",w:["=1-BINOM.DIST(4,10,0.3,TRUE)","=BINOM.DIST(4,10,0.3,TRUE)","=BINOM.DIST(4,10,0.3,FALSE)"],e:"At least 4 is everything except 0 through 3, so subtract the cumulative value at 3."},
 {tp:"c5",sec:"g52-2",t:"mc",q:"“Fewer than 3 successes” means the same as:",a:"2 or fewer",w:["3 or fewer","exactly 3","4 or more"],e:"Fewer than 3 excludes 3 itself, so the top value is 2."},
 {tp:"c5",sec:"g52-2",t:"mc",q:"With n = 10 and p = 0.3, P(at most 3) = 0.6496. P(more than 3) is:",a:"0.3504",w:["0.6496","0.2668","0.3828"],e:"More than 3 is the complement of at most 3: 1 − 0.6496."},
 {tp:"c5",sec:"g52-2",t:"mc",q:"A binomial has n = 3 and p = 0.40. P(exactly 1 success) is:",a:"0.432",w:["0.400","0.288","0.144"],e:"3 ways × 0.40 × 0.60² = 3 × 0.40 × 0.36 = 0.432."},
 {tp:"c5",sec:"g52-2",ap:true,t:"mc",q:"A manager wants the chance that 2 or fewer of 20 shipments arrive late, when each is late 10% of the time. Which formula?",a:"=BINOM.DIST(2,20,0.1,TRUE)",w:["=BINOM.DIST(2,20,0.1,FALSE)","=1-BINOM.DIST(2,20,0.1,TRUE)","=BINOM.DIST(20,2,0.1,TRUE)"],e:"“2 or fewer” is cumulative, so TRUE at x = 2; the result is 0.6769."},
 /* 5-2 mean and sd */
 {tp:"c5",sec:"g52-3",t:"mc",q:"In 26 births with P(girl) = 0.5, the mean number of girls is:",a:"13",w:["6.5","26","2.5"],e:"μ = n·p = 26 × 0.5 = 13."},
 {tp:"c5",sec:"g52-3",t:"mc",q:"In 26 births with P(girl) = 0.5, the standard deviation is about:",a:"2.5",w:["6.5","13","3.6"],e:"σ = √(26 × 0.5 × 0.5) = √6.5 ≈ 2.5."},
 {tp:"c5",sec:"g52-3",t:"mc",q:"For 18 peas with p = 0.75 of a green pod, the standard deviation is:",a:"1.8",w:["3.4","13.5","3.7"],e:"σ = √(18 × 0.75 × 0.25) = √3.375 ≈ 1.8."},
 {tp:"c5",sec:"g52-3",t:"mc",q:"With mean 13 and standard deviation 2.55, the cutoff for a significantly low number of girls is:",a:"7.9",w:["10.5","5.0","18.1"],e:"μ − 2σ = 13 − 5.1 = 7.9."},
 {tp:"c5",sec:"g52-3",ap:true,t:"mc",q:"A manager uses BINOM.DIST for sales calls, but each success makes the next one more likely. What is the problem?",a:"The trials are not independent",w:["Excel cannot compute it","There are too many trials","The mean is not a whole number"],e:"Excel still returns a number, but the binomial model does not describe dependent trials."},
 {tp:"c5",sec:"g52-3",t:"tf",q:"If Excel returns a value from BINOM.DIST, the situation must satisfy the binomial requirements.",a:false,e:"False — Excel computes whatever it is given; checking the assumptions is up to you."},
 /* 5-3 Poisson fits */
 {tp:"c5",sec:"g53-1",t:"mc",q:"Which situation is best modeled by a Poisson distribution?",a:"Calls arriving at a help desk per hour",w:["Heads in 10 coin tosses","The weight of a shipment","The time until the next call"],e:"It counts events in an interval at a steady average rate."},
 {tp:"c5",sec:"g53-1",t:"mc",q:"A Poisson model requires that events occur:",a:"independently at a constant average rate",w:["in exactly n fixed trials","with two outcomes per trial","at perfectly even intervals"],e:"Independence and a steady rate are the two key assumptions."},
 {tp:"c5",sec:"g53-1",t:"mc",q:"“How long until the next customer arrives?” is not a Poisson variable because it is:",a:"a waiting time, not a count",w:["a count with no limit","a binomial success","always a whole number"],e:"Poisson counts events; a waiting time is a continuous measurement."},
 {tp:"c5",sec:"g53-1",t:"mc",q:"Customers arrive mostly in a rush at noon and rarely otherwise. Why is Poisson a poor fit over the whole day?",a:"The average rate is not constant",w:["The count has no upper limit","The events are too frequent","The count is a whole number"],e:"Poisson assumes a reasonably steady rate across the interval."},
 /* 5-3 rescale and Excel */
 {tp:"c5",sec:"g53-2",t:"mc",q:"A store averages 4 customers per hour. The Poisson mean for a half-hour period is:",a:"2",w:["4","8","0.5"],e:"Scale the rate to the interval: 4 × 0.5 = 2."},
 {tp:"c5",sec:"g53-2",t:"mc",q:"With a mean of 4 per hour, which formula gives P(exactly 2 customers in an hour)?",a:"=POISSON.DIST(2,4,FALSE)",w:["=POISSON.DIST(4,2,FALSE)","=POISSON.DIST(2,4,TRUE)","=BINOM.DIST(2,4,0.5,FALSE)"],e:"The inputs are x, then the mean, then FALSE for exactly."},
 {tp:"c5",sec:"g53-2",t:"mc",q:"There are 8,000 arrivals over 19,170 time units. The mean per time unit is:",a:"about 0.417",w:["8,000","about 2.40","19,170"],e:"Divide the total by the number of intervals: 8,000 ÷ 19,170."},
 {tp:"c5",sec:"g53-2",t:"mc",q:"With a mean of 4 per hour, P(at least 1 customer in an hour) is:",a:"0.9817",w:["0.0183","0.1465","0.2381"],e:"1 − P(0) = 1 − 0.0183 = 0.9817."},
 {tp:"c5",sec:"g53-2",ap:true,t:"mc",q:"A website averages 6 errors per day. For the chance of no errors in a 12-hour period, which mean should be used?",a:"3",w:["6","12","0.5"],e:"Half a day is half the interval, so the mean is 6 × 0.5 = 3; then P(0) = 0.0498."},
 {tp:"c5",sec:"g53-2",t:"tf",q:"In the Poisson formula, e is a number you calculate from the data.",a:false,e:"False — e is a fixed mathematical constant, approximately 2.71828."},
 /* 5-3 relationships */
 {tp:"c5",sec:"g53-3",t:"mc",q:"A Poisson distribution has mean 9. Its standard deviation is:",a:"3",w:["9","81","4.5"],e:"The variance equals the mean, so σ = √9 = 3."},
 {tp:"c5",sec:"g53-3",t:"mc",q:"In a Poisson distribution, the variance is:",a:"equal to the mean",w:["the square of the mean","half of the mean","always equal to 1"],e:"That is the special Poisson relationship; the standard deviation is its square root."},
 {tp:"c5",sec:"g53-3",t:"mc",q:"Which values can a Poisson random variable take?",a:"0, 1, 2, … with no upper limit",w:["0, 1, 2, … up to n","any decimal value at all","only values between 0 and 1"],e:"Unlike a binomial count, a Poisson count is not capped at a number of trials."},
 {tp:"c5",sec:"g53-3",t:"mc",q:"Which situation is binomial rather than Poisson?",a:"Defective items among 50 inspected",w:["Defects per square meter","Accidents per month","Emails received per hour"],e:"Fifty inspected items is a fixed number of trials with two outcomes each."},
 {tp:"c5",sec:"g53-3",t:"tf",q:"A binomial random variable can never exceed its number of trials, but a Poisson random variable has no such cap.",a:true,e:"True — binomial x runs from 0 to n, while a Poisson count can be any whole number."},
 {tp:"c5",sec:"g51-2",ap:true,t:"mc",q:"A manager lists the chances of 0, 1, 2 and 3 late deliveries as 0.4, 0.3, 0.1 and 0.1. What should she conclude?",a:"It is not valid: the sum is 0.9",w:["It is valid as it stands","Late deliveries are continuous","The mean must be exactly 0.9"],e:"The probabilities of all possible values must add to 1, so one of her figures is off."},
 {tp:"c5",sec:"g53-1",ap:true,t:"mc",q:"A call center receives a steady 20 calls an hour, each independent of the others. Which model fits the number of calls in a 15-minute window?",a:"Poisson, with a mean of 5",w:["Binomial, with n = 20","Poisson, with a mean of 20","Normal, with a mean of 20"],e:"It counts events in an interval, and a quarter of an hour has a quarter of the rate: 20 × 0.25 = 5."}
]);
