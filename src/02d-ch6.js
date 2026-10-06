/* ================================================================ Chapter 6 · Normal Probability Distributions */
CH.c6 = {n:"6", title:"Normal Probability Distributions", short:"Ch 6", ref:"Sections 6-1 to 6-5",
 notes:[
  {id:"c6-std", h:"6-1 · The standard normal distribution", body:
   '<div class="point"><b>The point</b><p>The <mark>standard normal</mark> is the bell curve with <mark>mean 0 and standard deviation 1</mark>. It is symmetric about 0, and the <mark>total area under it is 1</mark>. A probability is an <mark>area</mark> under the curve.</p><p class="able"><b>Be able to</b> state its four properties and explain why probability is area, not height.</p></div>'+
   '<ul><li><b>z-score:</b> a value on this curve. z = 1.5 means 1.5 standard deviations above the mean; z = −2 means 2 below.</li>'+
   '<li><b>Symmetry:</b> half the area (0.5) lies on each side of 0, and the area left of −1 equals the area right of +1.</li>'+
   '<li><b>Total area 1</b> because the curve covers 100% of the possibilities.</li></ul>'+
   '<div class="exam-tip"><b>Area, not height</b>The height of the curve at a point is <b>not</b> a probability. For a continuous variable, the chance of any <b>single exact value</b> is 0. Only a <b>range</b> has a probability: the area above it. That is also why P(z &lt; 1) and P(z ≤ 1) are the same.</div>'+
   '<p><b>Worth remembering:</b> about <mark>68%</mark> of the area is within 1 standard deviation of the mean, <mark>95%</mark> within 2, and 99.7% within 3.</p>'},

  {id:"c6-area", h:"6-1 · Areas and z-scores, both directions", body:
   '<div class="point"><b>The point</b><p>Everything is built from one thing: the <mark>area to the left</mark> of a z-score (the cumulative area). Right, between and percentile questions are all made from it.</p><p class="able"><b>Be able to</b> find the area left of, right of and between z-scores, and go from an area back to z.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>Want</th><th>Do</th><th>Example</th></tr></thead><tbody>'+
   '<tr><td class="head">Left of z</td><td class="sm">The cumulative area · '+XL('=NORM.S.DIST(z,TRUE)')+'</td><td class="sm">P(z &lt; 1.00) = <b>0.8413</b></td></tr>'+
   '<tr><td class="head">Right of z</td><td class="sm"><mark>1 − left</mark></td><td class="sm">P(z &gt; 1.00) = 1 − 0.8413 = <b>0.1587</b></td></tr>'+
   '<tr><td class="head">Between</td><td class="sm"><mark>left of the upper − left of the lower</mark></td><td class="sm">P(−1 &lt; z &lt; 1) = 0.8413 − 0.1587 = <b>0.6827</b></td></tr></tbody></table></div>'+
   '<h3 class="sub" id="c6-inv">From an area back to z</h3>'+
   '<ul><li>Use '+XL('=NORM.S.INV(area to the left)')+'. A <mark>percentile is an area to the left</mark>: the 95th percentile is '+XL('=NORM.S.INV(0.95)')+' = <b>1.645</b>.</li>'+
   '<li>If the question gives an area on the <b>right</b>, convert it first: the top 5% starts where 0.95 lies to the left.</li>'+
   '<li>The middle 95% leaves 2.5% in each tail, so the cutoffs are '+XL('=NORM.S.INV(0.975)')+' = <b>±1.960</b>.</li></ul>'+
   '<p>z-scores to know: 90% → <b>1.282</b> · 95% → <b>1.645</b> · 97.5% → <b>1.960</b> · 99% → <b>2.326</b>.</p>'+
   '<h3 class="sub" id="c6-areatool">On the Normal Distribution Explorer</h3>'+
   '<ol><li>Tick <b>Use standard normal: μ = 0, σ = 1</b>.</li><li>Choose <b>Find probability</b> or <b>Find cutoff</b>.</li><li>Pick <b>Left tail</b>, <b>Right tail</b>, <b>Between two cutoffs</b> or <b>Two tails</b>, and type the z or the probability.</li></ol>'},

  {id:"c6-z", h:"6-2 · Standardize, then find the probability", body:
   '<div class="point"><b>The point</b><p>Any normal distribution turns into the standard one with <mark>z = (x − μ) ÷ σ</mark>: how many standard deviations x is from the mean.</p><p class="able"><b>Be able to</b> standardize a value, find its probability, and say the answer in the story’s own words.</p></div>'+
   '<p><b>Example.</b> Test scores are normal with mean 100 and standard deviation 15.</p>'+
   '<ul><li><b>Below 115:</b> z = (115 − 100) ÷ 15 = 1.00 → area left = <mark>0.8413</mark>. About 84% score below 115.</li>'+
   '<li><b>Above 130:</b> z = (130 − 100) ÷ 15 = 2.00 → 1 − 0.9772 = <mark>0.0228</mark>. About 2.3% score above 130.</li>'+
   '<li><b>Between 85 and 115:</b> z from −1 to 1 → <mark>0.6827</mark>.</li></ul>'+
   '<h3 class="sub" id="c6-zxl">NORM.DIST</h3>'+
   '<p>Excel does the standardizing for you: '+XL('=NORM.DIST(x, μ, σ, TRUE)')+' is the area to the <b>left</b> of x.</p>'+
   '<ul><li>'+XL('=NORM.DIST(115,100,15,TRUE)')+' → 0.8413</li><li>'+XL('=1-NORM.DIST(130,100,15,TRUE)')+' → 0.0228</li>'+
   '<li>'+XL('=NORM.DIST(115,100,15,TRUE)-NORM.DIST(85,100,15,TRUE)')+' → 0.6827</li></ul>'+
   '<p><b>Interpret</b>: never stop at the number. “0.0228” becomes “about 2.3% of test-takers score above 130.”</p>'},

  {id:"c6-cut", h:"6-2 · From a probability to a cutoff value", body:
   '<div class="point"><b>The point</b><p>Two opposite questions: <mark>value → probability</mark> (“what share is below 115?”) and <mark>probability → value</mark> (“what score is the 90th percentile?”). The second runs the formula backwards: <mark>x = μ + z·σ</mark>.</p><p class="able"><b>Be able to</b> find a cutoff from a percentile, and tell which of the two questions you are being asked.</p></div>'+
   '<p><b>Example.</b> Scores are normal, mean 100, standard deviation 15. What score marks the <b>top 10%</b>?</p>'+
   '<ol><li>Turn it into an area to the <b>left</b>: top 10% → <mark>0.90</mark> to the left.</li>'+
   '<li>Find z: '+XL('=NORM.S.INV(0.90)')+' = 1.282.</li>'+
   '<li>Convert: x = 100 + 1.282 × 15 = <mark>119.2</mark>.</li></ol>'+
   '<p>In one step: '+XL('=NORM.INV(0.90,100,15)')+' → 119.2. The bottom 10% is '+XL('=NORM.INV(0.10,100,15)')+' → 80.8.</p>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>The question gives…</th><th>and asks for…</th><th>Use</th></tr></thead><tbody>'+
   '<tr><td class="sm">a <b>value</b> (x)</td><td class="sm">a probability, percent or area</td><td class="sm">NORM.DIST · on the tool, <b>Find probability</b></td></tr>'+
   '<tr><td class="sm">a <b>probability</b> or percentile</td><td class="sm">a value, score or cutoff</td><td class="sm">NORM.INV · on the tool, <b>Find cutoff</b></td></tr></tbody></table></div>'+
   '<p>The answer to a cutoff question is in the <mark>original units</mark> (points, dollars, inches), never a number between 0 and 1.</p>'},

  {id:"c6-samp", h:"6-3 · Three distributions; parameter vs statistic", body:
   '<div class="point"><b>The point</b><p>Keep three things apart: the <mark>population</mark> (everyone), <mark>one sample</mark> (the values you drew), and the <mark>sampling distribution</mark> (what a statistic does across <b>all</b> possible samples).</p><p class="able"><b>Be able to</b> tell the three apart and separate a parameter from a statistic.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><tbody>'+
   '<tr><td class="head">Population distribution</td><td class="sm">The values of <b>every individual</b>. It has the true mean μ and standard deviation σ.</td></tr>'+
   '<tr><td class="head">One sample</td><td class="sm">The <b>n values you happened to get</b>. It has a mean x̄ and a standard deviation s.</td></tr>'+
   '<tr><td class="head">Sampling distribution</td><td class="sm">The distribution of a <b>statistic</b> (such as x̄) over <mark>all possible samples of the same size</mark>.</td></tr></tbody></table></div>'+
   '<h3 class="sub" id="c6-param">Parameter vs statistic</h3>'+
   '<ul><li>A <mark><b>p</b>arameter</mark> describes a <mark><b>p</b>opulation</mark>: μ, σ, p. It is fixed, and usually unknown.</li>'+
   '<li>A <mark><b>s</b>tatistic</mark> describes a <mark><b>s</b>ample</mark>: x̄, s, p̂. It changes from sample to sample.</li></ul>'+
   '<p>On the <b>Sampling Distribution Explorer</b> the three panels are exactly these three: the population, the current sample, and the sampling distribution building up.</p>'},

  {id:"c6-bias", h:"6-3 · Sampling variability; bias vs variability", body:
   '<div class="point"><b>The point</b><p>Each random sample contains <mark>different individuals</mark>, so each gives a slightly different estimate. That is <b>sampling variability</b>, and it is normal, not a mistake.</p><p class="able"><b>Be able to</b> explain why estimates differ and distinguish bias from variability.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><tbody>'+
   '<tr><td class="head">Bias</td><td class="sm">The estimates are <mark>off-center</mark>: on average they miss the target in one direction.</td></tr>'+
   '<tr><td class="head">Variability</td><td class="sm">How much the estimates <mark>scatter</mark> from sample to sample.</td></tr></tbody></table></div>'+
   '<ul><li>An <mark>unbiased estimator</mark> is <b>centered on its target</b> across repeated samples. It is right <b>on average</b>, not right in every sample.</li>'+
   '<li><b>Unbiased:</b> the sample mean x̄, the sample proportion p̂, the sample variance s².</li>'+
   '<li><b>Biased:</b> the sample median, range and standard deviation tend to miss their targets.</li>'+
   '<li>A larger sample reduces <b>variability</b>. It does <b>not</b> fix <b>bias</b>.</li></ul>'+
   '<p>Think of darts: bias is the whole cluster sitting away from the bullseye; variability is how spread out the cluster is.</p>'},

  {id:"c6-clt", h:"6-4 · The central limit theorem", body:
   '<div class="point"><b>The point</b><p>Take samples of size n and compute each sample’s mean. As n grows, <mark>the distribution of those sample means becomes approximately normal</mark>, whatever shape the population has.</p><p class="able"><b>Be able to</b> say what the theorem is about, what it needs, and what it does not claim.</p></div>'+
   '<ul><li>It concerns <mark>sample means</mark>, from <b>independent</b> observations, of a population with a <b>finite variance</b>.</li>'+
   '<li>It does <mark>not make individual observations normal</mark>. A skewed population stays skewed; only the <b>means</b> pile up into a bell.</li>'+
   '<li><b>How good the approximation is</b> depends on n and on the population’s shape:'+
   '<ul><li>Population already normal: the means are normal for <b>any</b> n.</li>'+
   '<li>Population not normal: the usual guide is <mark>n &gt; 30</mark>; a very skewed population needs more.</li></ul></li></ul>'+
   '<h3 class="sub" id="c6-clttool">On the Sampling Distribution Explorer</h3>'+
   '<ol><li>Set <b>Population shape</b> to <b>Right-skewed</b>.</li><li>With <b>Sample size (n)</b> = 2, press <b>Run 10,000 samples</b>: the pile of means is still lopsided.</li><li>Switch to n = <b>30</b> and run again: now it is bell-shaped, though the population has not changed.</li></ol>'},

  {id:"c6-se", h:"6-4 · The mean and standard error of the sample mean", body:
   '<div class="point"><b>The point</b><p>Sample means are centered on the population mean: <mark>μ<sub>x̄</sub> = μ</mark>. Their spread is the <mark>standard error: σ<sub>x̄</sub> = σ ÷ '+SQ('n')+'</mark>.</p><p class="able"><b>Be able to</b> compute the standard error and explain how it differs from σ.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><tbody>'+
   '<tr><td class="head">σ</td><td class="sm">The spread of <mark>individual values</mark> in the population.</td></tr>'+
   '<tr><td class="head">Standard error</td><td class="sm">The spread of <mark>sample means</mark>. Always smaller than σ when n &gt; 1.</td></tr></tbody></table></div>'+
   '<p><b>Example.</b> σ = 15.</p>'+
   '<ul><li>n = 25 → 15 ÷ 5 = <b>3</b></li><li>n = 36 → 15 ÷ 6 = <b>2.5</b></li><li>n = 100 → 15 ÷ 10 = <b>1.5</b></li></ul>'+
   '<p><b>Why a bigger sample shrinks it:</b> in a large sample the unusually high and unusually low values <mark>average out</mark>, so the mean lands close to μ nearly every time. To cut the standard error in half you need <b>four times</b> the sample size, because of the square root.</p>'},

  {id:"c6-which", h:"6-4 · One observation or a sample mean?", body:
   '<div class="point"><b>The point</b><p>Read the question for one phrase. “<b>One</b> randomly selected…” → use <mark>σ</mark>. “The <b>mean of a sample</b> of n…” → use the <mark>standard error, σ ÷ '+SQ('n')+'</mark>.</p><p class="able"><b>Be able to</b> choose the right spread, compute the probability, and check the conditions.</p></div>'+
   '<p><b>Example.</b> Scores are normal with μ = 100 and σ = 15.</p>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>Question</th><th>Spread</th><th>z</th><th>Probability</th></tr></thead><tbody>'+
   '<tr><td class="sm"><b>One person</b> scores above 105</td><td class="sm">σ = 15</td><td class="sm">(105 − 100) ÷ 15 = 0.33</td><td class="num">0.3694</td></tr>'+
   '<tr><td class="sm">The <b>mean of 36 people</b> is above 105</td><td class="sm">15 ÷ '+SQ('36')+' = <mark>2.5</mark></td><td class="sm">(105 − 100) ÷ 2.5 = 2.00</td><td class="num">0.0228</td></tr></tbody></table></div>'+
   '<p>Same cutoff, very different answers: an average of 36 people being that high is far rarer than one person being that high.</p>'+
   '<ul><li>Excel: '+XL('=1-NORM.DIST(105,100,15/SQRT(36),TRUE)')+' → 0.0228.</li>'+
   '<li><b>On the Normal Distribution Explorer:</b> type <b>2.5</b> in the <b>Standard deviation (σ)</b> box, not 15.</li></ul>'+
   '<h3 class="sub" id="c6-cond">Conditions to check first</h3>'+
   '<ol><li>The sample is <mark>random</mark>.</li><li>The observations are <mark>independent</mark> (sampling at most 5% of the population).</li>'+
   '<li>The population is <mark>normal</mark>, <b>or</b> the sample is <mark>large (n &gt; 30)</mark>.</li></ol>'},

  {id:"c6-plot", h:"6-5 · Assessing normality with graphs", body:
   '<div class="point"><b>The point</b><p>Before using a normal model, <mark>look at the data</mark>. Two graphs do the job: a <mark>histogram</mark> and a <mark>normal quantile plot</mark>.</p><p class="able"><b>Be able to</b> read both graphs and explain what supports or questions a normal model.</p></div>'+
   '<div class="tblwrap"><table class="tbl n0"><thead><tr><th>Graph</th><th>Supports normal</th><th>Raises concerns</th></tr></thead><tbody>'+
   '<tr><td class="head">Histogram</td><td class="sm">Roughly <mark>bell-shaped</mark> and symmetric</td><td class="sm">Strong skew, several peaks, values far from the rest</td></tr>'+
   '<tr><td class="head">Normal quantile plot</td><td class="sm">Points close to a <mark>straight line</mark></td><td class="sm">A <mark>systematic curve</mark> (an S or a bend), or points far off the line</td></tr></tbody></table></div>'+
   '<ul><li><b>Why a line means normal:</b> the plot pairs each data value with the z-score a normal distribution would put there. If the data are normal, the two rise in step, which draws a straight line.</li>'+
   '<li><b>A systematic curve</b> means the data are stretched on one side: skewed.</li>'+
   '<li><b>One or two far-off points</b> are possible outliers.</li>'+
   '<li>Small wiggles are expected. Look for a <b>pattern</b>, not perfection.</li></ul>'+
   '<div class="exam-tip"><b>Graphs are not proof</b>A straight-looking plot <mark>supports</mark> a normal model; it does not prove the population is normal. With a small sample, almost anything can look roughly straight.</div>'}
 ],
 decks:[
  {id:"terms", label:"Terms & rules", cards:[
   ["Standard normal distribution","The bell curve with mean 0 and standard deviation 1","g61-1"],
   ["Total area under a normal curve","1","g61-1"],
   ["Probability, on a density curve","An area under the curve, not its height","g61-1"],
   ["P(one exact value) for a continuous variable","0","g61-1"],
   ["z-score","The number of standard deviations from the mean","g61-1"],
   ["Area to the right of z","1 − the area to the left","g61-2"],
   ["Area between two z-scores","Left of the upper − left of the lower","g61-2"],
   ["A percentile, as an area","The area to the left of the value","g61-2"],
   ["NORM.S.INV","Goes from an area on the left to its z-score","g61-2"],
   ["Standardizing formula","z = (x − μ) ÷ σ","g62-1"],
   ["NORM.DIST(x, μ, σ, TRUE)","The area to the left of x","g62-1"],
   ["Cutoff formula","x = μ + z·σ","g62-2"],
   ["NORM.INV(area, μ, σ)","The value with that much area to its left","g62-2"],
   ["Parameter","A number describing a population","g63-1"],
   ["Statistic","A number describing a sample","g63-1"],
   ["Sampling distribution","A statistic’s distribution over all possible samples of one size","g63-1"],
   ["Sampling variability","Different samples give different estimates","g63-2"],
   ["Bias","Estimates that are off-center on average","g63-2"],
   ["Unbiased estimator","Centered on its target across repeated samples","g63-2"],
   ["Central limit theorem","Sample means become approximately normal as n grows","g64-1"],
   ["Guide for a non-normal population","Use n greater than 30","g64-1"],
   ["Mean of the sample means","Equal to the population mean, μ","g64-2"],
   ["Standard error of the mean","σ ÷ √n","g64-2"],
   ["Spread to use for one individual","σ","g64-3"],
   ["Spread to use for a sample mean","σ ÷ √n","g64-3"],
   ["Normal quantile plot, if normal","Points fall close to a straight line","g65-1"],
   ["A systematic curve in a quantile plot","A sign the data are not normal","g65-1"]]},
  {id:"numbers", label:"Worked numbers", cards:[
   ["P(z < 1.00)","0.8413","g61-2"],
   ["P(z > 1.00)","1 − 0.8413 = 0.1587","g61-2"],
   ["P(−1 < z < 1)","0.6827","g61-2"],
   ["z at the 95th percentile","1.645","g61-2"],
   ["z cutoffs for the middle 95%","±1.960","g61-2"],
   ["Mean 100, SD 15: z for x = 115","(115 − 100) ÷ 15 = 1.00","g62-1"],
   ["Mean 100, SD 15: P(x > 130)","0.0228","g62-1"],
   ["Mean 100, SD 15: P(85 < x < 115)","0.6827 (same as z from −1 to 1)","g62-1"],
   ["Mean 100, SD 15: the 90th percentile","100 + 1.282 × 15 = 119.2","g62-2"],
   ["Mean 100, SD 15: the bottom 10% cutoff","80.8","g62-2"],
   ["σ = 15, n = 25: standard error","15 ÷ 5 = 3","g64-2"],
   ["σ = 15, n = 36: standard error","15 ÷ 6 = 2.5","g64-2"],
   ["σ = 15, n = 100: standard error","15 ÷ 10 = 1.5","g64-2"],
   ["To halve the standard error","Take four times the sample size","g64-2"],
   ["Mean 100, SD 15: P(one score > 105)","0.3694","g64-3"],
   ["Mean 100, SD 15, n = 36: P(x̄ > 105)","z = 2.00 → 0.0228","g64-3"],
   ["Within 1, 2 and 3 SDs of the mean","About 68%, 95% and 99.7%","g61-1"]]}
 ]
};

QB = QB.concat([
 /* 6-1 standard normal */
 {tp:"c6",sec:"g61-1",t:"mc",q:"The standard normal distribution has:",a:"mean 0 and standard deviation 1",w:["mean 1 and standard deviation 0","mean 0 and standard deviation 0","mean 1 and standard deviation 1"],e:"Those two values are what make a normal distribution “standard”."},
 {tp:"c6",sec:"g61-1",t:"mc",q:"The total area under any normal curve is:",a:"1",w:["0.5","100","it depends on σ"],e:"The curve covers every possible value, so the total probability is 1."},
 {tp:"c6",sec:"g61-1",t:"mc",q:"For a continuous variable, a probability corresponds to:",a:"an area under the curve",w:["the height of the curve","the peak of the curve","the width of the curve"],e:"Only a range of values has a probability, and that is the area above it."},
 {tp:"c6",sec:"g61-1",t:"mc",q:"Because the standard normal curve is symmetric, the area to the left of z = 0 is:",a:"0.5",w:["0","1","0.6827"],e:"Half the area lies on each side of the mean."},
 {tp:"c6",sec:"g61-1",t:"tf",q:"For a normal distribution, P(z < 1) and P(z ≤ 1) are equal.",a:true,e:"True — the probability of one exact value is 0, so including the endpoint changes nothing."},
 /* 6-1 areas */
 {tp:"c6",sec:"g61-2",t:"mc",q:"The area to the left of z = 1.00 is 0.8413. The area to the right of z = 1.00 is:",a:"0.1587",w:["0.8413","0.3413","0.6827"],e:"Right = 1 − left = 1 − 0.8413."},
 {tp:"c6",sec:"g61-2",t:"mc",q:"P(−1 < z < 1) is approximately:",a:"0.6827",w:["0.8413","0.9545","0.5000"],e:"Left of 1 minus left of −1: 0.8413 − 0.1587."},
 {tp:"c6",sec:"g61-2",t:"mc",q:"Which Excel formula gives the z-score at the 95th percentile?",a:"=NORM.S.INV(0.95)",w:["=NORM.S.DIST(0.95,TRUE)","=NORM.S.INV(0.05)","=NORM.S.DIST(95,TRUE)"],e:"A percentile is an area to the left, and INV goes from area to z: 1.645."},
 {tp:"c6",sec:"g61-2",t:"mc",q:"To find the z-score that cuts off the top 5%, the area to enter (to the left) is:",a:"0.95",w:["0.05","0.975","0.50"],e:"The top 5% begins where 95% of the area lies to the left."},
 {tp:"c6",sec:"g61-2",t:"mc",q:"The z-scores that enclose the middle 95% of the standard normal are about:",a:"±1.96",w:["±1.645","±1.00","±2.326"],e:"The middle 95% leaves 2.5% in each tail, so use the 97.5th percentile."},
 {tp:"c6",sec:"g61-2",ap:true,t:"mc",q:"On the Normal Distribution Explorer, which setting finds P(z > 1.5)?",a:"Right tail, with standard normal ticked",w:["Left tail, with standard normal ticked","Find cutoff, with 1.5 as the probability","Between, from 0 up to 1.5"],e:"“Greater than” is the area above the cutoff, the right tail; the answer is 0.0668."},
 /* 6-2 standardize */
 {tp:"c6",sec:"g62-1",t:"mc",q:"Scores have mean 100 and standard deviation 15. The z-score of 130 is:",a:"2.00",w:["30","0.50","1.30"],e:"z = (130 − 100) ÷ 15 = 2.00."},
 {tp:"c6",sec:"g62-1",t:"mc",q:"Scores are normal with mean 100 and standard deviation 15. P(score < 115) is:",a:"0.8413",w:["0.1587","0.6827","0.5000"],e:"z = 1.00, and the area to its left is 0.8413."},
 {tp:"c6",sec:"g62-1",t:"mc",q:"Which formula gives P(x > 130) for a normal with mean 100 and standard deviation 15?",a:"=1-NORM.DIST(130,100,15,TRUE)",w:["=NORM.DIST(130,100,15,TRUE)","=NORM.INV(130,100,15)","=NORM.DIST(130,100,15,FALSE)"],e:"NORM.DIST gives the left area, so subtract it from 1 for the right tail."},
 {tp:"c6",sec:"g62-1",t:"mc",q:"A z-score of −1.5 means the value is:",a:"1.5 standard deviations below the mean",w:["1.5 units below the mean","1.5 percent below the mean","1.5 standard deviations above the mean"],e:"The sign gives the direction; the size counts standard deviations."},
 {tp:"c6",sec:"g62-1",ap:true,t:"mc",q:"Delivery times are normal with mean 500 minutes and standard deviation 100. A result of 0.0668 for P(time > 650) means:",a:"about 6.7% of deliveries take over 650 minutes",w:["the average delivery is 6.7 minutes late","650 minutes is the 6.7th percentile","about 6.7% of deliveries take under 650 minutes"],e:"z = 1.5 and the right-tail area is 0.0668, stated in the story’s terms."},
 /* 6-2 cutoff */
 {tp:"c6",sec:"g62-2",t:"mc",q:"Scores are normal with mean 100 and standard deviation 15. The score at the 90th percentile is about:",a:"119.2",w:["113.5","90.0","124.7"],e:"100 + 1.282 × 15 = 119.2."},
 {tp:"c6",sec:"g62-2",t:"mc",q:"Which Excel function goes from a probability to a value?",a:"=NORM.INV",w:["=NORM.DIST","=BINOM.DIST","=POISSON.DIST"],e:"INV is the inverse: you supply the area to the left and it returns x."},
 {tp:"c6",sec:"g62-2",t:"mc",q:"A company wants the cutoff for its top 10% of sales reps. Which area goes into NORM.INV?",a:"0.90",w:["0.10","0.05","0.95"],e:"NORM.INV needs the area to the left, and the top 10% starts at the 90th percentile."},
 {tp:"c6",sec:"g62-2",t:"mc",q:"“What percent of scores are below 115?” asks for:",a:"a probability, from a value",w:["a value, from a probability","a standard error","a sample size"],e:"A value is given and an area is wanted, so use NORM.DIST."},
 {tp:"c6",sec:"g62-2",t:"tf",q:"The answer to a cutoff question is a number between 0 and 1.",a:false,e:"False — a cutoff is a value in the original units, such as points or dollars."},
 /* 6-3 three distributions */
 {tp:"c6",sec:"g63-1",t:"mc",q:"A number that describes a whole population is called a:",a:"parameter",w:["statistic","sample","variable"],e:"Parameter goes with population; statistic goes with sample."},
 {tp:"c6",sec:"g63-1",t:"mc",q:"The sample mean x̄ from one survey of 50 customers is a:",a:"statistic",w:["parameter","population","sampling distribution"],e:"It is computed from a sample and would change with a different sample."},
 {tp:"c6",sec:"g63-1",t:"mc",q:"The sampling distribution of the mean is the distribution of:",a:"sample means over all possible samples",w:["individual values in one sample","individual values in the population","one sample mean over time"],e:"It describes how the statistic varies across repeated samples of one size."},
 {tp:"c6",sec:"g63-1",t:"mc",q:"Which symbol is a parameter?",a:"μ",w:["x̄","s","p̂"],e:"μ is the population mean; x̄, s and p̂ are computed from samples."},
 {tp:"c6",sec:"g63-1",t:"tf",q:"A parameter changes every time a new sample is taken.",a:false,e:"False — a parameter is a fixed feature of the population; it is the statistic that varies."},
 /* 6-3 bias */
 {tp:"c6",sec:"g63-2",t:"mc",q:"Two random samples from the same population give different means because:",a:"they contain different individuals",w:["one sample was done wrong","the population mean changed","sample means are always biased"],e:"That is sampling variability, a normal feature of random sampling."},
 {tp:"c6",sec:"g63-2",t:"mc",q:"An unbiased estimator is one whose values:",a:"center on the target across many samples",w:["equal the target in every sample","have no variability at all","always fall above the target"],e:"Unbiased means correct on average, not correct each time."},
 {tp:"c6",sec:"g63-2",t:"mc",q:"Increasing the sample size mainly reduces:",a:"variability",w:["bias","the population mean","the parameter"],e:"A bigger sample tightens the scatter of estimates but cannot fix a biased method."},
 {tp:"c6",sec:"g63-2",t:"mc",q:"Which of these is an unbiased estimator?",a:"The sample mean",w:["The sample range","The sample median","The sample standard deviation"],e:"The sample mean, proportion and variance target their parameters on average."},
 {tp:"c6",sec:"g63-2",ap:true,t:"mc",q:"A scale reads 2 pounds too heavy every time, with very little scatter. Its readings show:",a:"high bias and low variability",w:["low bias and high variability","low bias and low variability","high bias and high variability"],e:"The readings are tightly grouped but centered away from the true weight."},
 /* 6-4 CLT */
 {tp:"c6",sec:"g64-1",t:"mc",q:"The central limit theorem describes the distribution of:",a:"sample means",w:["individual observations","population parameters","sample sizes"],e:"It says sample means become approximately normal as n increases."},
 {tp:"c6",sec:"g64-1",t:"mc",q:"A population is strongly right-skewed. For samples of size 50, the sample means are:",a:"approximately normal",w:["strongly right-skewed","exactly uniform","impossible to describe"],e:"With n above 30 the central limit theorem applies even to a skewed population."},
 {tp:"c6",sec:"g64-1",t:"mc",q:"If the population itself is normal, the sample means are normal for:",a:"any sample size",w:["only n greater than 30","only n greater than 100","no sample size"],e:"A normal population gives normally distributed means even for small n."},
 {tp:"c6",sec:"g64-1",t:"mc",q:"The usual guideline for applying the central limit theorem to a non-normal population is:",a:"n greater than 30",w:["n greater than 5","n at most 5% of N","n equal to the mean"],e:"Thirty is the common rule of thumb; very skewed populations may need more."},
 {tp:"c6",sec:"g64-1",t:"tf",q:"The central limit theorem says that with a large enough sample, the individual observations become normally distributed.",a:false,e:"False — individuals keep the population’s shape; only the distribution of sample means approaches normal."},
 /* 6-4 standard error */
 {tp:"c6",sec:"g64-2",t:"mc",q:"A population has σ = 15. The standard error of the mean for n = 25 is:",a:"3",w:["15","0.6","75"],e:"σ ÷ √n = 15 ÷ 5 = 3."},
 {tp:"c6",sec:"g64-2",t:"mc",q:"The mean of the sampling distribution of x̄ equals:",a:"the population mean μ",w:["μ ÷ √n","the sample size n","the standard error"],e:"Sample means are centered on the population mean: an unbiased estimator."},
 {tp:"c6",sec:"g64-2",t:"mc",q:"As the sample size increases, the standard error:",a:"decreases",w:["increases","stays the same","becomes equal to σ"],e:"Dividing by a larger √n makes the spread of sample means smaller."},
 {tp:"c6",sec:"g64-2",t:"mc",q:"To cut the standard error in half, the sample size must be:",a:"four times as large",w:["twice as large","half as large","ten times as large"],e:"Because of the square root, √(4n) = 2√n halves the standard error."},
 {tp:"c6",sec:"g64-2",t:"mc",q:"The standard error measures the spread of:",a:"sample means",w:["individual values","population parameters","the raw data in one sample"],e:"σ describes individuals; the standard error describes how sample means vary."},
 {tp:"c6",sec:"g64-2",ap:true,t:"mc",q:"On the Sampling Distribution Explorer, changing n from 5 to 30 makes the “Sampling dist. SD”:",a:"smaller",w:["larger","unchanged","equal to the population SD"],e:"A larger sample averages out extremes, so the sample means cluster more tightly."},
 /* 6-4 which spread */
 {tp:"c6",sec:"g64-3",t:"mc",q:"Scores are normal with μ = 100 and σ = 15. For the probability that ONE randomly chosen score exceeds 105, use a spread of:",a:"15",w:["2.5","3","5"],e:"A single individual uses the population standard deviation."},
 {tp:"c6",sec:"g64-3",t:"mc",q:"Scores are normal with μ = 100 and σ = 15. For the probability that the MEAN of 36 scores exceeds 105, use a spread of:",a:"2.5",w:["15","36","0.42"],e:"A sample mean uses the standard error: 15 ÷ √36 = 2.5."},
 {tp:"c6",sec:"g64-3",t:"mc",q:"With μ = 100, σ = 15 and n = 36, P(x̄ > 105) is:",a:"0.0228",w:["0.3694","0.9772","0.5000"],e:"z = (105 − 100) ÷ 2.5 = 2.00, and the area to the right is 0.0228."},
 {tp:"c6",sec:"g64-3",t:"mc",q:"Which is NOT something to check before using a normal model for a sample mean?",a:"That the sample mean equals μ",w:["That the sample is random","That observations are independent","That n is large or the population is normal"],e:"The sample mean rarely equals μ exactly; the conditions are about how the data were gathered."},
 {tp:"c6",sec:"g64-3",ap:true,t:"mc",q:"To find P(x̄ > 105) for n = 36 on the Normal Distribution Explorer (μ = 100, σ = 15), what goes in the standard deviation box?",a:"2.5",w:["15","36","105"],e:"Enter the standard error, 15 ÷ √36, because the question is about a sample mean."},
 {tp:"c6",sec:"g64-3",t:"tf",q:"A sample mean of 36 values being above 105 is less likely than a single value being above 105, when μ = 100.",a:true,e:"True — means vary less than individuals: 0.0228 compared with 0.3694."},
 /* 6-5 plots */
 {tp:"c6",sec:"g65-1",t:"mc",q:"In a normal quantile plot, data from a normal distribution appear as points that:",a:"lie close to a straight line",w:["form a bell shape","form a clear S-curve","are scattered at random"],e:"Normal data rise in step with the expected z-scores, drawing a line."},
 {tp:"c6",sec:"g65-1",t:"mc",q:"A normal quantile plot shows a clear, systematic curve. This suggests the data are:",a:"not from a normal distribution",w:["from a normal distribution","perfectly symmetric","too few to plot"],e:"A systematic bend indicates skewness or another departure from normal."},
 {tp:"c6",sec:"g65-1",t:"mc",q:"A histogram that supports a normal model looks:",a:"roughly bell-shaped and symmetric",w:["flat across all values","strongly skewed right","split into two peaks"],e:"A single symmetric mound is the bell shape of a normal distribution."},
 {tp:"c6",sec:"g65-1",t:"mc",q:"One point lies far from the line in an otherwise straight quantile plot. It is most likely:",a:"an outlier worth checking",w:["proof the data are normal","a sign n is too large","the population mean"],e:"Unusual observations stand apart from the pattern and deserve a closer look."},
 {tp:"c6",sec:"g65-1",t:"tf",q:"A roughly straight normal quantile plot proves that the population is normally distributed.",a:false,e:"False — graphs can support a normal model but never prove it, especially with a small sample."},
 {tp:"c6",sec:"g62-2",ap:true,t:"mc",q:"A bank offers a premium card to customers in the top 5% of income. Incomes are normal with mean 60 and standard deviation 10 (in thousands). Which formula gives the cutoff?",a:"=NORM.INV(0.95,60,10)",w:["=NORM.INV(0.05,60,10)","=NORM.DIST(0.95,60,10,TRUE)","=NORM.DIST(60,10,0.95,TRUE)"],e:"A cutoff comes from NORM.INV, and the top 5% starts where 95% of the area lies to the left: about 76.4."},
 {tp:"c6",sec:"g63-1",ap:true,t:"mc",q:"A firm surveys 200 of its 50,000 customers and finds an average spend of $84. The $84 is:",a:"a statistic, from one sample",w:["a parameter, from the population","a sampling distribution","the population mean itself"],e:"It was computed from a sample of 200, and another sample would give a slightly different figure."},
 {tp:"c6",sec:"g65-1",ap:true,t:"mc",q:"An analyst plans a normal model for 40 daily sales figures, but the quantile plot bends sharply upward at its right end. What should she conclude?",a:"The data look skewed, so be cautious",w:["The data are normal, so go ahead","The sample is too large to judge","The plot proves the mean is too high"],e:"A systematic bend away from the line is the warning sign of a non-normal, skewed distribution."}
]);
