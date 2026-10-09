/* ================================================================ Fix My Misses
   Daniel's 13 real misses on the professor's Chapter 4 and 5 practice quizzes (he did not guess
   on those), turned into ten skills. Each skill: the one rule, which of his questions it comes
   from, and a generator of fresh problems. Every wrong choice is the specific mistake that
   produces it. Three right in a row marks the skill fixed. test.js recomputes every answer
   from the numbers the generator reports in "vals".                                          */
function fxNum(x, d){ var s = x.toFixed(d === undefined ? 3 : d); return s; }
function fxPct(p){ return (Math.round(p * 1000) / 10) + "%"; }
function fxMoney(x){ return (x < 0 ? "−$" : "$") + Math.abs(Math.round(x)).toLocaleString("en-US"); }
function fxInt(x){ return Math.round(x).toLocaleString("en-US"); }
function fxFact(n){ return n < 2 ? 1 : n * fxFact(n - 1); }
/* four distinct choices: the right one, then the named mistakes; a spare is used if two collide */
function fxOpts(right, wrongs, spares){
  var seen = {}, out = [{html:right, ok:true}]; seen[right] = 1;
  wrongs.concat(spares || []).forEach(function(w){ if(out.length < 4 && w && !seen[w]){ seen[w] = 1; out.push({html:w, ok:false}); } });
  return shuffle(out);
}
var FIX = [
 {id:"bayes", t:"Bayes: build the pile", from:"Chapter 4 quiz, questions 3, 12 and 18",
  rule:"Weight each rate by the size of its group. Then divide the piece you want by the whole pile.",
  gen:function(){
    var a = pick([0.1, 0.2, 0.25, 0.3, 0.4], 1)[0], r1 = pick([0.3, 0.4, 0.5, 0.6, 0.8], 1)[0], r2 = pick([0.05, 0.08, 0.1, 0.2], 1)[0];
    var ctx = pick([
      [fxPct(a)+" of a product’s sales come from store A and the rest from store B. "+fxPct(r1)+" of store A’s units are defective, and "+fxPct(r2)+" of store B’s. A unit turns out to be defective. What is the probability it came from store A?", "store A", "store B", "defective"],
      [fxPct(a)+" of accounts are premium and the rest are basic. "+fxPct(r1)+" of premium accounts and "+fxPct(r2)+" of basic accounts buy the add-on. An account bought the add-on. What is the probability it is premium?", "premium", "basic", "buyers"],
      [fxPct(a)+" of applicants are high-risk and the rest are low-risk. A screen rejects "+fxPct(r1)+" of high-risk applicants and "+fxPct(r2)+" of low-risk ones. An applicant was rejected. What is the probability they are high-risk?", "high-risk", "low-risk", "rejected"]], 1)[0];
    var x = 1000 * a * r1, y = 1000 * (1 - a) * r2, right = x / (x + y);
    return {vals:{a:a, r1:r1, r2:r2}, text:ctx[0],
      opts:fxOpts(fxNum(right), [fxNum(r1 / (r1 + r2)), fxNum(a * r1), fxNum(r1)], [fxNum(1 - right), fxNum(a)]),
      explain:"Picture 1,000. "+fxInt(1000 * a)+" are "+ctx[1]+" and "+fxInt(1000 * (1 - a))+" are "+ctx[2]+". The "+ctx[3]+" pile: "+fxPct(r1)+" of "+fxInt(1000 * a)+" = "+fxInt(x)+", plus "+fxPct(r2)+" of "+fxInt(1000 * (1 - a))+" = "+fxInt(y)+". So "+fxInt(x)+" ÷ "+fxInt(x + y)+" = <b>"+fxNum(right)+"</b>. Using "+fxNum(r1 / (r1 + r2))+" forgets the group sizes; "+fxNum(a * r1)+" stops before dividing by the pile."};
  }},
 {id:"neither", t:"“Neither”: multiply the misses", from:"Chapter 4 quiz, question 8",
  rule:"Neither means missing both. Turn each chance into its miss (1 − p), then multiply the misses.",
  gen:function(){
    var p1 = pick([0.6, 0.7, 0.5, 0.8], 1)[0], p2 = pick([0.5, 0.4, 0.3, 0.25].filter(function(x){ return Math.abs(p1 + x - 1) > 1e-9; }), 1)[0], right = (1 - p1) * (1 - p2);   /* never p1 + p2 = 1: there "both" and "neither" would be the same number */
    return {vals:{p1:p1, p2:p2}, text:"A prospect is reached by email with probability "+p1+" and by a social ad with probability "+p2+". The two are independent. What is the probability the prospect receives neither?",
      opts:fxOpts(fxNum(right), [fxNum(p1 * p2), fxNum(1 - p1 * p2), fxNum(1 - p1)], [fxNum(1 - p2), fxNum(1 - right)]),
      explain:"Miss the email: 1 − "+p1+" = "+fxNum(1 - p1, 2)+". Miss the ad: 1 − "+p2+" = "+fxNum(1 - p2, 2)+". Miss both: "+fxNum(1 - p1, 2)+" × "+fxNum(1 - p2, 2)+" = <b>"+fxNum(right)+"</b>. "+fxNum(p1 * p2)+" is receiving both, not neither."};
  }},
 {id:"or", t:"“Or”: take the overlap out once", from:"Chapter 4 quiz, question 14",
  rule:"Add the two groups, then subtract the ones that are in both, once.",
  gen:function(){
    var N = pick([100, 150, 200], 1)[0], d1 = pick([5, 6, 8, 10], 1)[0], d2 = pick([12, 15, 18, 20], 1)[0], right = (N + d2) / (2 * N);
    return {vals:{N:N, d1:d1, d2:d2}, text:"A sample has "+N+" wood and "+N+" graphite rackets. "+d1+" of the wood and "+d2+" of the graphite are defective. One racket is chosen at random. What is the probability it is wood or defective?",
      opts:fxOpts(fxNum(right), [fxNum((N + d1 + d2) / (2 * N)), fxNum((d1 + d2) / (2 * N)), fxNum(0.5)], [fxNum(d2 / (2 * N)), fxNum(1 - right)]),
      explain:"Wood: "+N+". Defective: "+(d1 + d2)+". In both (defective wood): "+d1+". So ("+N+" + "+(d1 + d2)+" − "+d1+") ÷ "+(2 * N)+" = <b>"+fxNum(right)+"</b>. "+fxNum((N + d1 + d2) / (2 * N))+" counts the "+d1+" defective wood rackets twice."};
  }},
 {id:"none", t:"“None” without replacement", from:"Chapter 4 quiz, question 15",
  rule:"Count the good ones. Each pick, the top and the bottom both drop by one. Multiply.",
  gen:function(){
    var N = pick([20, 30, 40, 50], 1)[0], k = pick([4, 5, 6, 8], 1)[0], g = N - k;
    var right = (g / N) * ((g - 1) / (N - 1)) * ((g - 2) / (N - 2));
    return {vals:{N:N, k:k}, text:"An auditor randomly selects 3 returns from "+N+", of which "+k+" contain errors. What is the probability that none of the 3 contains an error?",
      opts:fxOpts(fxNum(right, 4), [fxNum(Math.pow(g / N, 3), 4), fxNum((k / N) * ((k - 1) / (N - 1)) * ((k - 2) / (N - 2)), 4), fxNum(1 - right, 4)], [fxNum(g / N, 4), fxNum(Math.pow(k / N, 3), 4)]),
      explain:g+" returns have no errors. "+g+"/"+N+" × "+(g - 1)+"/"+(N - 1)+" × "+(g - 2)+"/"+(N - 2)+" = <b>"+fxNum(right, 4)+"</b>. "+fxNum(Math.pow(g / N, 3), 4)+" is what you get with replacement, keeping "+g+"/"+N+" each time."};
  }},
 {id:"count", t:"Group or roles?", from:"Chapter 4 quiz, question 16",
  rule:"Roles or ranks: order matters, count down (permutation). Just a group: divide by the orders of the group (combination).",
  gen:function(){
    var n = pick([8, 9, 10, 12], 1)[0], r = pick([3, 4], 1)[0], roles = Math.random() < 0.5, perm = 1, i;
    for(i = 0; i < r; i++) perm *= (n - i);
    var comb = perm / fxFact(r), right = roles ? perm : comb;
    var names = r === 3 ? "a chair, a recorder and a presenter" : "a chair, a vice-chair, a recorder and a presenter";
    return {vals:{n:n, r:r, roles:roles}, text:roles ? "From "+n+" board members, how many ways can you choose "+names+"?" : "From "+n+" board members, how many different subcommittees of "+r+" are possible?",
      opts:fxOpts(fxInt(right), [fxInt(roles ? comb : perm), fxInt(Math.pow(n, r)), fxInt(fxFact(r))], [fxInt(n * r), fxInt(right * 2)]),
      explain:(roles ? "Different roles, so order matters: count down for "+r+" spots = <b>"+fxInt(perm)+"</b>. In Excel =PERMUT("+n+","+r+"). "+fxInt(comb)+" would be a plain group with no roles."
                     : "No roles, so order does not matter: count down for "+r+" spots = "+fxInt(perm)+", then divide by "+r+"! = "+fxFact(r)+" to get <b>"+fxInt(comb)+"</b>. In Excel =COMBIN("+n+","+r+"). "+fxInt(perm)+" is the answer if order mattered.")};
  }},
 {id:"rescale", t:"Poisson: convert the rate first", from:"Chapter 5 quiz, questions 8 and 14",
  rule:"Ask “per what?” Make the mean match the time the question asks about, then use POISSON.DIST(x, mean, FALSE).",
  gen:function(){
    var c = pick([[6, "per hour", "a 20-minute interval", 1/3], [3, "per hour", "a 20-minute interval", 1/3], [12, "per hour", "a 15-minute interval", 1/4], [4, "per hour", "a 30-minute interval", 1/2], [24, "per day (24 hours)", "one hour", 1/24], [19.2, "per day (24 hours)", "one hour", 1/24], [8, "per 40-hour week", "one 8-hour shift", 1/5]], 1)[0];
    var m = Math.round(c[0] * c[3] * 1000) / 1000, x = pick([0, 1, 2, 3], 1)[0], asNumber = (x === 0 && Math.random() < 0.6), p0 = Math.exp(-m);
    if(asNumber) return {vals:{rate:c[0], f:c[3], x:0, number:true}, text:"A steady, independent process averages "+c[0]+" events "+c[1]+". What is the probability of 0 events in "+c[2]+"?",
      opts:fxOpts(fxNum(p0, 4), [fxNum(Math.exp(-c[0]), 4), fxNum(1 - p0, 4), fxNum(m * Math.exp(-m), 4)], [fxNum(p0 / 2, 4), fxNum(Math.min(0.9999, p0 * 1.3), 4)]),
      explain:"Convert first: "+c[0]+" "+c[1]+" is a mean of <b>"+m+"</b> for "+c[2]+". Then =POISSON.DIST(0,"+m+",FALSE) = <b>"+fxNum(p0, 4)+"</b>. "+fxNum(Math.exp(-c[0]), 4)+" uses the rate without converting it."};
    var E = function(a, b, t){ return "POISSON.DIST("+a+", "+b+", "+t+")"; };
    return {vals:{rate:c[0], f:c[3], x:x, number:false}, text:"A steady, independent process averages "+c[0]+" events "+c[1]+". Which Excel expression gives the probability of exactly "+x+" events in "+c[2]+"?",
      opts:fxOpts(E(x, m, "FALSE"), [E(x, c[0], "FALSE"), E(x, m, "TRUE"), E(m, x, "FALSE")], [E(x + 1, m, "FALSE"), E(x, c[0], "TRUE")]),
      explain:"Convert first: "+c[0]+" "+c[1]+" is a mean of <b>"+m+"</b> for "+c[2]+". Exactly "+x+" uses FALSE: <b>"+E(x, m, "FALSE")+"</b>. Keeping "+c[0]+" as the mean answers a different stretch of time; TRUE gives "+x+" or fewer."};
  }},
 {id:"scale", t:"Poisson: a longer interval", from:"Chapter 5 quiz, question 4",
  rule:"Mean and variance grow with the interval. The standard deviation is the square root of the variance, so it grows by the square root.",
  gen:function(){
    var k = pick([2, 3, 4, 9], 1)[0], w = ["", "", "doubles", "triples", "becomes four times as long", "", "", "", "", "becomes nine times as long"][k];
    var rt = (k === 4 || k === 9) ? String(Math.sqrt(k)) : "√"+k;
    return {vals:{k:k}, text:"Calls follow a Poisson model with a steady rate. The observation interval "+w+". What happens to the count’s mean, variance and standard deviation?",
      opts:fxOpts("Mean × "+k+", variance × "+k+", standard deviation × "+rt, ["All three are multiplied by "+k, "Mean × "+k+"; the variance and standard deviation stay the same", "Mean × "+k+", variance × "+rt+", standard deviation × "+rt], ["Nothing changes, because the rate per minute is the same"]),
      explain:"In a Poisson model the variance equals the mean, so both are multiplied by "+k+". The standard deviation is √variance, so it is multiplied by √"+k+((k === 4 || k === 9) ? " = "+rt : "")+", not by "+k+"."};
  }},
 {id:"poisson", t:"What Poisson counts", from:"Chapter 5 quiz, question 6",
  rule:"Poisson is a count of events (0, 1, 2…) in a fixed stretch of time or space. Not a time, an amount or a percentage.",
  gen:function(){
    var right = pick(["The number of customers arriving during a fixed hour", "The number of defects in one roll of fabric", "The number of emails received in a day", "The number of accidents at an intersection in a month", "The number of typos on a page"], 1)[0];
    var wrong = pick(["The exact number of minutes until the next customer arrives", "The average purchase amount in dollars and cents", "The percentage of revenue from online orders", "The weight of a package in pounds", "The number of sales in 20 calls, each with the same chance", "The time between two phone calls"], 3);
    return {vals:{right:right}, text:"Events happen independently at a steady rate. Which of these can be a Poisson random variable?",
      opts:fxOpts(right, wrong),
      explain:"<b>"+right+"</b> is a count of events in a fixed stretch. A waiting time, an amount and a percentage are not counts of events, and a count out of a fixed number of trials is binomial."};
  }},
 {id:"ev", t:"Expected value with a loss", from:"Chapter 5 quiz, question 11",
  rule:"Multiply each outcome by its probability and add. A loss goes in as a negative number.",
  gen:function(){
    var A = pick([39000, 25000, 50000, 18000], 1)[0], B = pick([8000, 5000, 12000, 6000], 1)[0], p = pick([0.7, 0.6, 0.8, 0.75], 1)[0];
    var right = p * A - (1 - p) * B;
    return {vals:{A:A, B:B, p:p}, text:"A job promises a profit of "+fxMoney(A)+" with probability "+p+", or a loss of "+fxMoney(B)+" with probability "+fxNum(1 - p, 2)+". What is the expected profit?",
      opts:fxOpts(fxMoney(right), [fxMoney(p * A), fxMoney(p * A + (1 - p) * B), fxMoney(A - B)], [fxMoney(right + 1000), fxMoney(A * (1 - p))]),
      explain:p+" × "+fxInt(A)+" = "+fxInt(p * A)+". "+fxNum(1 - p, 2)+" × (−"+fxInt(B)+") = −"+fxInt((1 - p) * B)+". Together: <b>"+fxMoney(right)+"</b>. "+fxMoney(p * A)+" leaves the loss out; "+fxMoney(p * A + (1 - p) * B)+" adds it instead of subtracting."};
  }},
 {id:"atleast", t:"“At least” in Excel", from:"Chapter 5 quiz, question 13, and your homework",
  rule:"If the phrase counts up (at least, more than): one minus the cumulative value, and the number you type is one below where you start.",
  gen:function(){
    var n = pick([10, 12, 15, 20], 1)[0], p = pick([0.5, 0.25, 0.3, 0.4], 1)[0], k = pick([3, 4, 5, 6], 1)[0], more = Math.random() < 0.4;
    var start = more ? k + 1 : k, E = function(a, t, one){ return (one ? "1 − " : "")+"BINOM.DIST("+a+", "+n+", "+p+", "+t+")"; };
    return {vals:{n:n, p:p, k:k, more:more}, text:"n = "+n+" trials, p = "+p+". Which Excel expression gives the probability of "+(more ? "more than "+k : "at least "+k)+" successes?",
      opts:fxOpts(E(start - 1, "TRUE", true), [E(start, "TRUE", true), E(start - 1, "TRUE", false), E(k, "FALSE", false)], [E(start - 2, "TRUE", true), E(start, "TRUE", false)]),
      explain:(more ? "More than "+k : "At least "+k)+" starts at "+start+" and counts up. One minus everything below it, 0 through "+(start - 1)+": <b>"+E(start - 1, "TRUE", true)+"</b>. Typing "+start+" instead would also throw away "+start+" itself."};
  }}
];
