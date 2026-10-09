/* ================================================================ small helpers */
function segWire(sel, attr, fn){
  var seg = $(sel); if(!seg) return;
  seg.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button["+attr+"]") : null;
    if(!b) return;
    $$("button", seg).forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
    fn(b.getAttribute(attr));
  });
}
function divider(){ return '<div class="divider"><span>&#9670;</span></div>'; }
function getJSON(k, dflt){ try{ var v = store.get(k); return v ? JSON.parse(v) : dflt; }catch(e){ return dflt; } }
function li(x){ return "<li>"+x+"</li>"; }

/* ================================================================ guide */
function renderGuide(){
  var done = getJSON("guide", {}), total = 0;
  GUIDE.sections.forEach(function(s){ total += s.items.length; });
  var html = '<div class="realcall"><div><b>The exam questions are in his practice quizzes</b><span>The professor said the exact questions are all there: 48 questions across Chapters 4, 5 and 6.</span></div><button class="btn primary" type="button" id="gReal">Practice the 48</button><button class="btn" type="button" id="gFix">Fix my misses</button></div>'+
    '<div class="gprog"><span class="count" id="gCount"></span><div class="bar"><i id="gBar" style="width:0"></i></div></div>';
  GUIDE.sections.forEach(function(s){
    html += '<div class="gsec"><h2>'+s.h+'</h2>'+divider();
    s.items.forEach(function(it){
      var m = /^([\d-]+) · (.*)$/.exec(it.t);
      html += '<div class="gitem obj'+(done[it.id] ? " ok" : "")+'" data-gi="'+it.id+'">'+
        '<input type="checkbox" aria-label="I can do '+strip(it.t)+'" data-g="'+it.id+'"'+(done[it.id] ? " checked" : "")+'>'+
        '<div class="gbody"><button class="gopen" type="button" aria-expanded="false"><span class="nb">'+m[1]+'</span><span class="gt">'+m[2]+'</span></button>'+
          '<div class="gans" hidden><p class="gs"><b>In short</b>'+it.short+'</p>'+
          '<div class="gex"><b>Example</b>'+EX[it.id].map(function(x){ return '<p>'+x+'</p>'; }).join("")+'</div></div></div></div>';
    });
    html += '</div>';
  });
  html += '<div class="gsec"><div class="toolbar">'+
      '<button class="btn primary" type="button" data-go="exam/mock">Practice questions</button>'+
      '<button class="btn" type="button" id="gAll">Open all</button>'+
      '<button class="btn" type="button" id="gPrint">Print this list</button>'+
    '</div></div>';
  $("#guideRoot").innerHTML = html;
  function progress(){
    var d = getJSON("guide", {}), n = Object.keys(d).filter(function(k){ return d[k]; }).length;
    $("#gCount").innerHTML = "Ready on <b>"+n+" of "+total+"</b>";
    $("#gBar").style.width = (n/total*100) + "%";
  }
  function setOpen(item, open){ $(".gans", item).hidden = !open; $(".gopen", item).setAttribute("aria-expanded", String(open)); }
  $$("#guideRoot .gopen").forEach(function(b){
    b.addEventListener("click", function(){ var item = b.closest(".gitem"); setOpen(item, $(".gans", item).hidden); });
  });
  $("#gAll").addEventListener("click", function(){
    var open = $$("#guideRoot .gans").some(function(a){ return a.hidden; });
    $$("#guideRoot .gitem").forEach(function(item){ setOpen(item, open); });
    $("#gAll").textContent = open ? "Close all" : "Open all";
  });
  $$("#guideRoot input[data-g]").forEach(function(cb){
    cb.addEventListener("change", function(){
      var d = getJSON("guide", {}); d[cb.getAttribute("data-g")] = cb.checked; store.set("guide", JSON.stringify(d));
      cb.closest(".gitem").classList.toggle("ok", cb.checked); progress();
    });
  });
  $$("#guideRoot [data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(b.getAttribute("data-go")); });
  });
  $("#gPrint").addEventListener("click", function(){ window.print(); });
  $("#gReal").addEventListener("click", function(){ goTo("exam/mock"); startRealAll(); });
  $("#gFix").addEventListener("click", function(){ goTo("fix/run"); });
  progress();
}
function goTo(path){
  var parts = path.split("/");
  currentMode[parts[0]] = parts[1];
  showTopic(parts[0]);
  window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"});
}

/* ================================================================ exam prep: one part at a time, self-checked */
function prepState(){ var s = getJSON("prep", null); return (s && typeof s.q === "number" && s.marks) ? s : {q:0, p:0, shown:false, marks:{}, only:null}; }
function prepSave(s){ store.set("prep", JSON.stringify(s)); }
function prepOrder(s){ return s.only && s.only.length ? s.only : PREP.map(function(_, i){ return i; }); }
function renderPrep(){
  var s = prepState(), order = prepOrder(s), root = $("#prepRoot");
  function score(){ var n = 0; order.forEach(function(i){ if(s.marks[i] === 1) n++; }); return n; }
  if(s.q >= order.length){
    var missed = order.filter(function(i){ return s.marks[i] !== 1; });
    root.innerHTML = '<div class="quizWrap"><div class="result card-corners">'+CORNERS+
      '<div class="big">'+score()+'/'+order.length+'</div><div class="rsub">'+(order.length === PREP.length ? 'objectives' : 'of the ones you missed')+'</div>'+
      (missed.length ? '<p class="verdict">Go back over these, then try them again.</p><div class="misslist">'+missed.map(function(i){ return '<div><span class="g">'+PREP[i].obj+'</span><span class="t"><b>'+PREP[i].t+'</b>Question '+(i+1)+'</span></div>'; }).join("")+'</div>'
                     : '<p class="verdict">Every one. You are ready.</p>')+
      '<div class="toolbar" style="margin:26px 0 0">'+(missed.length ? '<button class="btn primary" type="button" id="prepMiss">Try the misses again</button>' : '')+'<button class="btn" type="button" id="prepAgain">Start over</button></div></div></div>';
    if($("#prepMiss")) $("#prepMiss").addEventListener("click", function(){ var m = {}; prepSave({q:0, p:0, shown:false, marks:m, only:missed}); renderPrep(); });
    $("#prepAgain").addEventListener("click", function(){ prepSave({q:0, p:0, shown:false, marks:{}, only:null}); renderPrep(); });
    return;
  }
  var idx = order[s.q], Q = PREP[idx], last = s.p >= Q.parts.length - 1;
  var done = s.q, sofar = (done > 0 && done % 8 === 0) ? '<p class="prepscore">So far: <b>'+score()+' of '+done+'</b></p>' : '';
  var html = '<div class="quizWrap"><div class="qcard card-corners prep">'+CORNERS+
    '<div class="qnum">Question '+(s.q+1)+' of '+order.length+'</div>'+
    '<div class="qtags"><span class="qtag">'+Q.obj+'</span><span class="qtag sec">'+Q.t+'</span></div>'+sofar+
    (Q.stem ? '<p class="qtext">'+Q.stem+'</p>' : '')+
    '<ol class="preparts" type="a">';
  Q.parts.forEach(function(p, i){
    if(i > s.p) return;
    var open = i < s.p || s.shown;
    html += '<li'+(i === s.p ? ' class="cur"' : '')+'><p class="pq">'+p[0]+'</p>'+
      (open ? '<p class="pa"><b>Answer</b>'+p[1]+'</p>'+(p[2] ? '<p class="ptrap"><b>Your trap</b>'+PREP_TRAPS[p[2]]+'</p>' : '') : '')+'</li>';
  });
  html += '</ol>'+
    (Q.hint ? '<p class="phint" id="prepHintBox" hidden><b>From your notes</b>'+Q.hint+'</p>' : '')+
    '<div class="qfoot prepfoot">';
  if(!s.shown) html += (Q.hint ? '<button class="btn" type="button" id="prepHint">Hint</button>' : '')+'<button class="btn primary" type="button" id="prepShow">Show answer</button>';
  else if(!last) html += '<button class="btn primary" type="button" id="prepNext">Next part &rsaquo;</button>';
  else html += '<span class="label">Did you get this question?</span><button class="btn primary" type="button" id="prepYes">Got it</button><button class="btn" type="button" id="prepNo">Missed it</button>';
  html += '</div></div></div>';
  root.innerHTML = html;
  if($("#prepHint")) $("#prepHint").addEventListener("click", function(){ $("#prepHintBox").hidden = false; $("#prepHint").hidden = true; });
  if($("#prepShow")) $("#prepShow").addEventListener("click", function(){ s.shown = true; prepSave(s); renderPrep(); });
  if($("#prepNext")) $("#prepNext").addEventListener("click", function(){ s.p++; s.shown = false; prepSave(s); renderPrep(); });
  function mark(v){ s.marks[idx] = v; s.q++; s.p = 0; s.shown = false; prepSave(s); renderPrep(); var top = $("#prepRoot"); if(top && top.scrollIntoView) top.scrollIntoView({behavior:"smooth", block:"start"}); }
  if($("#prepYes")) $("#prepYes").addEventListener("click", function(){ mark(1); });
  if($("#prepNo")) $("#prepNo").addEventListener("click", function(){ mark(0); });
}

/* ================================================================ fix my misses: ten skills, three in a row each */
var FIX_NEED = 3, fixOpen = null, fixQ = null, fixAnswered = false;
function fixState(){ var s = getJSON("fix", {}); return (s && typeof s === "object") ? s : {}; }
function renderFix(){
  var st = fixState(), done = FIX.filter(function(k){ return (st[k.id] || 0) >= FIX_NEED; }).length;
  var html = '<div class="gprog"><span class="count">Fixed <b>'+done+' of '+FIX.length+'</b></span><div class="bar"><i style="width:'+(done / FIX.length * 100)+'%"></i></div></div>';
  FIX.forEach(function(k){
    var n = Math.min(st[k.id] || 0, FIX_NEED), ok = n >= FIX_NEED, open = fixOpen === k.id;
    html += '<div class="fixcard'+(ok ? " ok" : "")+(open ? " open" : "")+'" data-fix="'+k.id+'">'+
      '<div class="fixhead"><div><div class="fixt">'+k.t+'</div><div class="fixfrom">'+k.from+'</div></div>'+
        '<span class="fixpips" aria-label="'+n+' of '+FIX_NEED+' in a row">'+[0, 1, 2].map(function(i){ return '<i'+(i < n ? ' class="on"' : '')+'></i>'; }).join("")+'</span></div>'+
      '<p class="fixrule"><b>The rule</b>'+k.rule+'</p>';
    if(open && fixQ){
      html += '<div class="fixq"><p class="qtext">'+fixQ.text+'</p><div class="opts">'+
        fixQ.opts.map(function(o, i){ return '<button class="opt'+(fixAnswered ? (o.ok ? " correct" : (fixQ.picked === i ? " wrong" : "")) : "")+'" type="button" data-fo="'+i+'"'+(fixAnswered ? " disabled" : "")+'><span class="k">'+(i + 1)+'</span>'+o.html+'</button>'; }).join("")+'</div>'+
        (fixAnswered ? '<p class="feedback">'+(fixQ.opts[fixQ.picked].ok ? "<b>Correct.</b> " : "<b>Not this one.</b> ")+fixQ.explain+'</p>'+
          '<div class="toolbar" style="justify-content:center"><button class="btn primary" type="button" data-fnext="1">'+(ok ? "One more" : "Next problem")+'</button><button class="btn" type="button" data-fclose="1">Close</button></div>' : '')+'</div>';
    } else {
      html += '<div class="toolbar" style="justify-content:center"><button class="btn'+(ok ? "" : " primary")+'" type="button" data-fstart="'+k.id+'">'+(ok ? "Fixed — practice again" : (n ? "Keep going" : "Practice"))+'</button></div>';
    }
    html += '</div>';
  });
  html += '<div class="toolbar" style="justify-content:center;margin-top:18px"><button class="btn" type="button" id="fixReset">Start all ten over</button></div>';
  $("#fixRoot").innerHTML = html;
  function ask(id){ fixOpen = id; fixQ = FIX.filter(function(k){ return k.id === id; })[0].gen(); fixAnswered = false; renderFix(); }
  $$("#fixRoot [data-fstart]").forEach(function(b){ b.addEventListener("click", function(){ ask(b.getAttribute("data-fstart")); }); });
  $$("#fixRoot [data-fo]").forEach(function(b){ b.addEventListener("click", function(){
    if(fixAnswered) return;
    var i = +b.getAttribute("data-fo"), s = fixState(); fixQ.picked = i; fixAnswered = true;
    s[fixOpen] = fixQ.opts[i].ok ? Math.min(FIX_NEED, (s[fixOpen] || 0) + 1) : 0;      /* a miss resets the streak */
    store.set("fix", JSON.stringify(s)); renderFix();
  }); });
  if($("#fixRoot [data-fnext]")) $("#fixRoot [data-fnext]").addEventListener("click", function(){ ask(fixOpen); });
  if($("#fixRoot [data-fclose]")) $("#fixRoot [data-fclose]").addEventListener("click", function(){ fixOpen = null; fixQ = null; renderFix(); });
  $("#fixReset").addEventListener("click", function(){ store.set("fix", "{}"); fixOpen = null; fixQ = null; renderFix(); });
}
function fixKeys(e){
  if(!fixOpen || !fixQ) return false;
  if(/^[1-4]$/.test(e.key) && !fixAnswered){ var b = $$("#fixRoot [data-fo]")[+e.key - 1]; if(b){ b.click(); return true; } }
  if(e.key === "Enter" && fixAnswered){ var n = $("#fixRoot [data-fnext]"); if(n){ n.click(); return true; } }
  return false;
}

/* ================================================================ the two essay questions */
function renderEssays(){
  $("#essayRoot").innerHTML =
    '<div class="note-sec"><div class="point"><b>The point</b><p>The exam ends with <mark>two essay questions, 10 points each</mark>. The rubric says exactly what earns the points, so write one short paragraph for each line of it, in order.</p><p class="able"><b>Be able to</b> hit all three lines of each rubric without looking.</p></div></div>'+
    ESSAYS.map(function(e, i){
      return '<div class="note-sec essay"><h2>'+e.q+' &middot; '+e.pts+' points</h2>'+divider()+
        '<p class="lead">'+e.about+'</p>'+
        '<div class="tblwrap"><table class="tbl n0 rub"><thead><tr><th>The rubric line</th><th>What to write</th></tr></thead><tbody>'+
        e.rows.map(function(r){ return '<tr><td class="sm"><b>'+r[0]+'</b><span class="rpts">'+r[1]+' points</span><i>'+r[2]+'</i></td><td class="sm">'+r[3]+'</td></tr>'; }).join("")+
        '</tbody></table></div>'+
        '<h3 class="sub">A template</h3><ol class="esteps">'+e.steps.map(li).join("")+'</ol>'+
        '<h3 class="sub">Practice</h3><p class="eprompt">'+e.prompt+'</p>'+
        '<div class="toolbar" style="justify-content:center"><button class="btn primary" type="button" data-essay="'+i+'">Show a full-credit answer</button></div>'+
        '<div class="eanswer" id="essayAns'+i+'" hidden>'+e.answer.map(function(x){ return '<p>'+x+'</p>'; }).join("")+'</div></div>';
    }).join("")+
    '<p class="note">The rubric gives the criteria, not the questions. The two practice questions here are written to fit it; the real ones will use different numbers and may use a different setting.</p>';
  $$("#essayRoot [data-essay]").forEach(function(b){
    b.addEventListener("click", function(){ var a = $("#essayAns"+b.getAttribute("data-essay")); a.hidden = !a.hidden; b.textContent = a.hidden ? "Show a full-credit answer" : "Hide the answer"; });
  });
}

/* ================================================================ practice exam */
var mockCfg = getJSON("mockcfg", {n:25, types:"all", topic:"all"});
function mockGen(){ return mockQuestions({n:mockCfg.n, types:mockCfg.types, topics:mockCfg.topic === "all" ? [] : [mockCfg.topic]}); }
function startMock(keys){
  engines.mock = makeQuiz($("#mockExam"), mockGen, {showTopic:true, againLabel:"New practice exam", onSetup:renderMockSetup});
  engines.mock.start(keys || null);
}
/* ================================================================ the cheat sheet */
function renderCheat(){
  $("#kitCheat").innerHTML =
    '<div class="note-sec cheat"><div class="point"><b>The point</b><p>Every question has a <mark>clue word</mark> that tells you the move. Find it, make the move, then check the choices for the usual mistake.</p></div>'+
    '<h3 class="sub">How to read any question</h3><ol class="esteps">'+CHEAT_STEPS.map(li).join("")+'</ol>'+
    CHEAT.map(function(s){
      return '<h3 class="sub">'+s.h+'</h3><div class="tblwrap"><table class="tbl n0 cheatt"><thead><tr><th>If it says</th><th>Do this</th><th>The trap</th></tr></thead><tbody>'+
        s.rows.map(function(r){ return '<tr><td class="sm cq">'+r[0]+'</td><td class="sm">'+r[1]+'</td><td class="sm ctrap">'+(r[2] || "")+'</td></tr>'; }).join("")+'</tbody></table></div>';
    }).join("")+
    '<h3 class="sub">One more tell</h3><p>'+CHEAT_TELL+'</p>'+
    '<h3 class="sub">The two essays</h3><ul class="esteps">'+CHEAT_ESSAY.map(li).join("")+'</ul>'+
    '<div class="toolbar" style="justify-content:center;margin-top:18px"><button class="btn" type="button" id="cheatPrint">Print the cheat sheet</button></div></div>';
  $("#cheatPrint").addEventListener("click", function(){ document.body.classList.add("printcheat"); window.print(); setTimeout(function(){ document.body.classList.remove("printcheat"); }, 800); });
}

/* ================================================================ exam kit */
function renderKit(){
  function side(title, rows){
    return '<div class="fcard card-corners">'+CORNERS+'<div class="fcside">'+title+'</div><table class="fct"><tbody>'+
      rows.map(function(r){ return r.length === 1 ? '<tr class="fch"><td colspan="2">'+r[0]+'</td></tr>' : '<tr><td class="fck">'+r[0]+'</td><td class="fcv">'+r[1].replace(/\s{2,}/g, "<br>")+'</td></tr>'; }).join("")+'</tbody></table></div>';
  }
  $("#kitCard").innerHTML =
    '<div class="note-sec"><div class="point"><b>The point</b><p>You may bring <mark>one flashcard</mark>. First decide which kind of problem it is (the headings), then find the question, then copy the formula. Copy it by hand; writing it is half the studying.</p><p class="able"><b>Before the exam</b>cover it and see how much you can already write from memory. What you can, leave off and use the space for what you cannot.</p></div></div>'+
    '<div class="fcwrap">'+side("Front · probability, binomial, Poisson", KIT.card.front)+side("Back · normal, sample means, essays", KIT.card.back)+'</div>'+
    '<div class="note-sec" style="margin-top:26px"><h3 class="sub">If you still have space</h3><p>Fill it in this order: the two essays (20 points), the word questions, then the two worked examples.</p></div>'+
    '<div class="fcwrap fcone">'+side("Extra · essays, word questions, worked examples", KIT.card.extra)+'</div>'+
    '<div class="toolbar" style="justify-content:center;margin-top:18px"><button class="btn" type="button" id="kitPrint">Print this card</button></div>';
  $("#kitPrint").addEventListener("click", function(){ document.body.classList.add("printkit"); window.print(); setTimeout(function(){ document.body.classList.remove("printkit"); }, 800); });
  $("#kitTools").innerHTML = KIT.tools.map(function(t){
    return '<div class="note-sec"><h2>'+t.name+'</h2>'+divider()+
      '<p class="toolwhat">'+t.what+' <a class="toollink" href="'+t.url+'" target="_blank" rel="noopener">Open the tool</a></p>'+
      t.uses.map(function(u){ return '<details class="work"><summary>'+u[0]+'</summary><ol>'+u[1].map(function(x){ return '<li>'+x+'</li>'; }).join("")+'</ol></details>'; }).join("")+'</div>';
  }).join("");
  $("#kitWhich").innerHTML =
    '<div class="note-sec"><div class="point"><b>The point</b><p>Most lost points come from <mark>picking the wrong method</mark>, not from the arithmetic. Find the clue words first, then the method follows.</p><p class="able"><b>Be able to</b> name the method for a question before touching a calculator.</p></div>'+
    '<div class="tblwrap"><table class="tbl n0 which"><thead><tr><th>The question says…</th><th>It is…</th><th>Use</th></tr></thead><tbody>'+
    KIT.which.map(function(w){ return '<tr><td class="sm">'+w[0]+'</td><td class="head">'+w[1]+'</td><td class="sm">'+w[2]+'</td></tr>'; }).join("")+'</tbody></table></div></div>';
}

/* all three of the professor's practice quizzes in one run */
function startRealAll(){
  engines.mock = makeQuiz($("#mockExam"), function(){ return realQuiz(0); }, {showTopic:true, againLabel:"Again, reshuffled", onSetup:renderMockSetup});
  engines.mock.start(null);
}
/* the one-button exam: 50 questions, all sixteen study-guide sections covered */
function startFifty(){
  engines.mock = makeQuiz($("#mockExam"), function(){ return finalFifty(62); }, {showTopic:true, againLabel:"Another sixty-two", onSetup:renderMockSetup});
  engines.mock.start(null);
}
function renderMockSetup(){
  var root = $("#mockExam");
  function seg(id, attr, val, list){
    return '<div class="seg" id="'+id+'">'+list.map(function(o){ return '<button type="button" '+attr+'="'+o[0]+'" aria-pressed="'+(String(o[0]) === String(val))+'">'+o[1]+'</button>'; }).join("")+'</div>';
  }
  root.innerHTML = '<div class="quizWrap"><div class="qcard card-corners">'+CORNERS+
    '<div class="qnum">Practice exam</div><p class="qtext">Set it up, then answer across the chapters. Each run is drawn fresh.</p>'+
    '<div class="fifty realall"><button class="btn primary" type="button" id="mxRealAll">All 48 of the professor&rsquo;s questions</button>'+
      '<p><b>Start here.</b> He said the exact exam questions are all in his practice quizzes. These are those three quizzes together, word for word, with his explanations, in a new order each time.</p>'+
      '<button class="btn" type="button" id="mxRealAgain">Only the 17 I missed last time</button><p class="lastrun">Your last full run: 31 of 48.</p></div>'+
    '<div class="fifty"><button class="btn primary" type="button" id="mxReal4">The professor&rsquo;s practice quiz &mdash; Chapter 4</button>'+
      '<p>His own 18 questions from Canvas, word for word, with his explanations, in a new order each time. You scored 11 of 18 the first time.</p>'+
      '<button class="btn" type="button" id="mxReal4m">Only the 7 I missed</button></div>'+
    '<div class="fifty"><button class="btn primary" type="button" id="mxReal5">The professor&rsquo;s practice quiz &mdash; Chapter 5</button>'+
      '<p>His own 14 questions from Canvas, word for word, with his explanations. You scored 8 of 14 the first time.</p>'+
      '<button class="btn" type="button" id="mxReal5m">Only the 6 I missed</button></div>'+
    '<div class="fifty"><button class="btn primary" type="button" id="mxReal6">The professor&rsquo;s practice quiz &mdash; Chapter 6</button>'+
      '<p>His own 16 questions from Canvas, word for word, with his explanations, in a new order each time.</p></div>'+
    '<div class="fifty"><button class="btn primary" type="button" id="mxFifty">The 62 &mdash; two from every objective</button>'+
      '<p>Sixty-two questions: two from each of the 31 objectives on the sheets, so nothing is skipped. Drawn fresh each time.</p></div>'+
    '<div class="setup">'+
      '<p class="orline">or set one up yourself</p>'+
      '<div class="row"><span class="label">Length</span><br>'+seg("mxN","data-n",mockCfg.n,[[15,"15"],[25,"25"],[40,"40"],[60,"60"]])+'</div>'+
      '<div class="row"><span class="label">Question types</span><br>'+seg("mxT","data-t",mockCfg.types,[["all","Everything"],["mc","Multiple choice"],["tf","True / false"],["ap","Application"]])+'</div>'+
      '<div class="row"><span class="label">Section</span><br>'+seg("mxP","data-p",mockCfg.topic,[["all","All three"]].concat(CHAPTERS.map(function(tp){ return [tp, "Ch. "+CH[tp].n]; })))+'</div>'+
      '<div class="row" style="margin-top:22px"><button class="btn primary" type="button" id="mxStart">Start</button></div>'+
    '</div></div></div>';
  segWire("#mxN","data-n",function(v){ mockCfg.n = parseInt(v,10); store.set("mockcfg", JSON.stringify(mockCfg)); });
  segWire("#mxT","data-t",function(v){ mockCfg.types = v; store.set("mockcfg", JSON.stringify(mockCfg)); });
  segWire("#mxP","data-p",function(v){ mockCfg.topic = v; store.set("mockcfg", JSON.stringify(mockCfg)); });
  $("#mxStart").addEventListener("click", function(){ startMock(null); });
  $("#mxFifty").addEventListener("click", startFifty);
  $("#mxRealAll").addEventListener("click", startRealAll);
  $("#mxRealAgain").addEventListener("click", function(){
    engines.mock = makeQuiz($("#mockExam"), function(){ return realQuiz(0, "again"); }, {showTopic:true, againLabel:"Again, reshuffled", onSetup:renderMockSetup});
    engines.mock.start(null);
  });
  $("#mxReal6").addEventListener("click", function(){
    engines.mock = makeQuiz($("#mockExam"), function(){ return realQuiz(6); }, {showTopic:true, againLabel:"Again, reshuffled", onSetup:renderMockSetup});
    engines.mock.start(null);
  });
  $("#mxReal5m").addEventListener("click", function(){
    engines.mock = makeQuiz($("#mockExam"), function(){ return realQuiz(5, true); }, {showTopic:true, againLabel:"Again, reshuffled", onSetup:renderMockSetup});
    engines.mock.start(null);
  });
  $("#mxReal5").addEventListener("click", function(){
    engines.mock = makeQuiz($("#mockExam"), function(){ return realQuiz(5); }, {showTopic:true, againLabel:"Again, reshuffled", onSetup:renderMockSetup});
    engines.mock.start(null);
  });
  $("#mxReal4m").addEventListener("click", function(){
    engines.mock = makeQuiz($("#mockExam"), function(){ return realQuiz(4, true); }, {showTopic:true, againLabel:"Again, reshuffled", onSetup:renderMockSetup});
    engines.mock.start(null);
  });
  $("#mxReal4").addEventListener("click", function(){
    engines.mock = makeQuiz($("#mockExam"), function(){ return realQuiz(4); }, {showTopic:true, againLabel:"Again, reshuffled", onSetup:renderMockSetup});
    engines.mock.start(null);
  });
  engines.mock = null;
}

/* ================================================================ wiring */
var engines = {};
renderGuide(); renderKit(); renderCheat(); renderPrep(); renderEssays(); renderFix();

var ON_SHOW = {"exam/mock":function(){ if(!engines.mock) renderMockSetup(); }};
var KEYS = {"exam/mock":function(e){ return engines.mock ? engines.mock.keys(e) : false; }, "fix/run":fixKeys};
var TOPICS = ["guide","exam","fix","prep","kit"];
var currentTopic = "guide", currentMode = {guide:"overview", kit:"cheat", exam:"mock", prep:"run", fix:"run"};
function showMode(topic, mode){
  currentMode[topic] = mode;
  $$('.seg[data-modes="'+topic+'"] button').forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode)); });
  $$('#topic-'+topic+' .panel').forEach(function(p){ p.hidden = (p.getAttribute("data-panel") !== topic+"/"+mode); });
  var id = topic+"/"+mode;
  if(ON_SHOW[id]) ON_SHOW[id]();
  store.set("mode."+topic, mode);
}
function showTopic(id){
  currentTopic = id;
  $$(".topic-btn").forEach(function(b){ b.setAttribute("aria-selected", String(b.getAttribute("data-topic") === id)); });
  $$(".topic").forEach(function(s){ s.hidden = (s.id !== "topic-"+id); });
  showMode(id, currentMode[id]);
  store.set("topic", id);
}
$$(".topic-btn").forEach(function(b){
  b.addEventListener("click", function(){ showTopic(b.getAttribute("data-topic")); window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"}); });
});
$$(".seg[data-modes]").forEach(function(seg){
  seg.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button[data-mode]") : null;
    if(b) showMode(seg.getAttribute("data-modes"), b.getAttribute("data-mode"));
  });
});
document.addEventListener("keydown", function(e){
  var t = e.target, tag = (t && t.tagName) || "";
  if(/INPUT|TEXTAREA|SELECT/.test(tag)) return;
  if(tag === "BUTTON" && (e.key === " " || e.key === "Enter")) return;
  var h = KEYS[currentTopic+"/"+currentMode[currentTopic]];
  if(h && h(e)) e.preventDefault();
});

/* ---- come back to where you were ---- */
(function(){
  var t = store.get("topic");
  TOPICS.forEach(function(k){ var m = store.get("mode."+k); if(m && $('.seg[data-modes="'+k+'"] button[data-mode="'+m+'"]')) currentMode[k] = m; });
  showTopic(t && TOPICS.indexOf(t) >= 0 ? t : "guide");
})();

/* ---- offline copy: the service worker keeps the page on the phone ---- */
if("serviceWorker" in navigator && /^https?:/.test(location.protocol)){
  navigator.serviceWorker.register("sw.js").catch(function(){});
}
