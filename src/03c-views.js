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
  var html =
    '<div class="handout card-corners">'+CORNERS+
      '<div class="hcourse">'+COURSE.code+' &middot; '+COURSE.term+'</div>'+
      '<h2>'+COURSE.exam+'</h2><p class="hscope">'+COURSE.scope+'</p>'+
      '<ul class="hrules">'+COURSE.rules.map(li).join("")+'</ul>'+
    '</div>'+
    '<p class="note">'+COURSE.about+'</p>'+
    '<details class="keyterms"><summary>Which Excel formula? &mdash; 18 to try, tap each to check your answer</summary><ol>'+
      KEYTERMS.map(function(k){ return '<li><span class="kn">'+k.n+'</span><p>'+k.q+'</p><button class="btn reveal" type="button">Show answer</button><p class="ka" hidden>'+k.a+'</p></li>'; }).join("")+
    '</ol></details>'+
    '<div class="gprog"><span class="count" id="gCount"></span><div class="bar"><i id="gBar" style="width:0"></i></div></div>';
  GUIDE.sections.forEach(function(s){
    html += '<div class="gsec"><h2>'+s.h+'</h2>'+divider();
    s.items.forEach(function(it){
      html += '<div class="gitem'+(done[it.id] ? " ok" : "")+'" data-gi="'+it.id+'">'+
        '<input type="checkbox" aria-label="I can explain '+strip(it.t)+'" data-g="'+it.id+'"'+(done[it.id] ? " checked" : "")+'>'+
        '<div><div class="gt">'+it.t+'</div>'+
          '<div class="gs">'+it.short+'</div>'+
          '<div class="gsub">'+it.subs.map(function(sb){ return '<button class="btn" type="button" data-go="'+s.tp+'/notes" data-a="'+sb[1]+'">'+sb[0]+'</button>'; }).join("")+'</div></div>'+
        '<button class="btn" type="button" data-go="'+s.tp+'/notes" data-a="'+it.a+'">Study it</button></div>';
    });
    html += '</div>';
  });
  html += '<div class="gsec"><div class="toolbar">'+
      '<button class="btn primary" type="button" data-go="exam/mock">Practice exam</button>'+
      '<button class="btn" type="button" id="gPrint">Print this list</button>'+
    '</div></div>';
  $("#guideRoot").innerHTML = html;
  $$("#guideRoot .keyterms .reveal").forEach(function(b){ b.addEventListener("click", function(){ var a = b.nextElementSibling; a.hidden = !a.hidden; b.textContent = a.hidden ? "Show answer" : "Hide"; }); });
  function progress(){
    var d = getJSON("guide", {}), n = Object.keys(d).filter(function(k){ return d[k]; }).length;
    $("#gCount").innerHTML = "Ready on <b>"+n+" of "+total+"</b>";
    $("#gBar").style.width = (n/total*100) + "%";
  }
  $$("#guideRoot input[data-g]").forEach(function(cb){
    cb.addEventListener("change", function(){
      var d = getJSON("guide", {}); d[cb.getAttribute("data-g")] = cb.checked; store.set("guide", JSON.stringify(d));
      cb.closest(".gitem").classList.toggle("ok", cb.checked); progress();
    });
  });
  $$("#guideRoot [data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(b.getAttribute("data-go"), b.getAttribute("data-a")); });
  });
  $("#gPrint").addEventListener("click", function(){ window.print(); });
  progress();
}
function goTo(path, anchor){
  var parts = path.split("/"), t = parts[0], m = parts[1];
  currentMode[t] = m;
  showTopic(t);
  if(!anchor){ window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"}); return; }
  setTimeout(function(){
    var el = document.getElementById(anchor);
    if(!el) return;
    var sec = el.closest ? el.closest(".note-sec") : null;       /* the notes show one section at a time: open the right one */
    if(sec && NOTE_OPEN[t]) NOTE_OPEN[t](sec.id, false);
    el.scrollIntoView({behavior:"smooth", block:"start"});
    el.classList.add("flashhit"); setTimeout(function(){ el.classList.remove("flashhit"); }, 1800);
  }, 60);
}

/* ================================================================ chapter notes */
/* One section on screen at a time. Pick the lesson (4-1, 4-2 …), then one of its two to four
   sections; Previous and Next walk through the chapter in order.                              */
var NOTE_OPEN = {};
function lessonOf(s){ return strip(s.h).split(" · ")[0]; }
function noteTitle(s){ return strip(s.h).replace(/“|”/g,"").replace(/^[\d-]+ · /, ""); }
function renderNotes(tp){
  var c = CH[tp], lessons = [];
  c.notes.forEach(function(s){ if(lessons.indexOf(lessonOf(s)) < 0) lessons.push(lessonOf(s)); });
  $("#"+tp+"Notes").innerHTML =
    '<div class="lessonbar"><span class="label">Lesson</span><div class="seg lessons">'+lessons.map(function(l){ return '<button type="button" data-lesson="'+l+'" aria-pressed="false">'+l+'</button>'; }).join("")+'</div></div>'+
    '<div class="secnav">'+c.notes.map(function(s){ return '<a href="#'+s.id+'" data-a="'+s.id+'" data-lesson="'+lessonOf(s)+'">'+noteTitle(s)+'</a>'; }).join("")+'</div>'+
    c.notes.map(function(s, i){
      return '<div class="note-sec" id="'+s.id+'" hidden><h2>'+s.h+'</h2>'+divider()+s.body+
        '<div class="secstep"><button class="btn" type="button" data-step="'+(i-1)+'"'+(i === 0 ? ' disabled' : '')+'>&lsaquo; Previous</button>'+
        '<span class="count">'+(i+1)+' of '+c.notes.length+'</span>'+
        '<button class="btn primary" type="button" data-step="'+(i+1)+'"'+(i === c.notes.length-1 ? ' disabled' : '')+'>Next &rsaquo;</button></div></div>';
    }).join("");
  var root = $("#"+tp+"Notes");
  function open(id, scroll){
    var sec = c.notes.filter(function(s){ return s.id === id; })[0] || c.notes[0], les = lessonOf(sec);
    $$(".note-sec", root).forEach(function(n){ n.hidden = (n.id !== sec.id); });
    $$(".lessons button", root).forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-lesson") === les)); });
    $$(".secnav a", root).forEach(function(a2){ a2.hidden = (a2.getAttribute("data-lesson") !== les); a2.classList.toggle("on", a2.getAttribute("data-a") === sec.id); });
    store.set("note."+tp, sec.id);
    if(scroll){ var top = $(".lessonbar", root); if(top && top.scrollIntoView) top.scrollIntoView({behavior:"smooth", block:"start"}); }
  }
  NOTE_OPEN[tp] = open;
  $$(".lessons button", root).forEach(function(b){
    b.addEventListener("click", function(){ var l = b.getAttribute("data-lesson"); open(c.notes.filter(function(s){ return lessonOf(s) === l; })[0].id, false); });
  });
  $$(".secnav a", root).forEach(function(a2){ a2.addEventListener("click", function(e){ e.preventDefault(); open(a2.getAttribute("data-a"), false); }); });
  $$(".secstep button", root).forEach(function(b){ b.addEventListener("click", function(){ var s = c.notes[parseInt(b.getAttribute("data-step"), 10)]; if(s) open(s.id, true); }); });
  open(store.get("note."+tp), false);
}

/* ================================================================ practice exam */
var mockCfg = getJSON("mockcfg", {n:25, types:"all", topic:"all"});
function mockGen(){ return mockQuestions({n:mockCfg.n, types:mockCfg.types, topics:mockCfg.topic === "all" ? [] : [mockCfg.topic]}); }
function startMock(keys){
  engines.mock = makeQuiz($("#mockExam"), mockGen, {showTopic:true, againLabel:"New practice exam", onSetup:renderMockSetup});
  engines.mock.start(keys || null);
}
/* ================================================================ exam kit */
function renderKit(){
  function side(title, rows){
    return '<div class="fcard card-corners">'+CORNERS+'<div class="fcside">'+title+'</div><table class="fct"><tbody>'+
      rows.map(function(r){ return '<tr><td class="fck">'+r[0]+'</td><td class="fcv">'+r[1].replace(/\s{2,}/g, "<br>")+'</td></tr>'; }).join("")+'</tbody></table></div>';
  }
  $("#kitCard").innerHTML =
    '<div class="note-sec"><div class="point"><b>The point</b><p>You may bring <mark>one flashcard</mark>. Spend it on what is easy to forget under pressure: the formulas, the Excel functions and the phrases that change an endpoint. Copy it by hand; writing it is half the studying.</p><p class="able"><b>Before the exam</b>cover it and see how much you can already write from memory. What you can, leave off and use the space for what you cannot.</p></div></div>'+
    '<div class="fcwrap">'+side("Front · probability and discrete distributions", KIT.card.front)+side("Back · normal, sampling and Excel", KIT.card.back)+'</div>'+
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
  engines.mock = null;
}

/* ================================================================ wiring */
var engines = {};
CHAPTERS.forEach(function(tp){
  var seg = $('.seg[data-decks="'+tp+'"]'), cur = CH[tp].decks[0].id;
  seg.innerHTML = CH[tp].decks.map(function(d, i){ return '<button type="button" data-deck="'+d.id+'" aria-pressed="'+(i === 0)+'">'+d.label+'</button>'; }).join("");
  engines[tp+"Cards"] = makeCards($("#"+tp+"Cards")); engines[tp+"Cards"].load(deckFor(tp, cur));
  segWire('.seg[data-decks="'+tp+'"]', "data-deck", function(v){ cur = v; engines[tp+"Cards"].load(deckFor(tp, v)); });
  $('[data-shuffle="'+tp+'"]').addEventListener("click", function(){ engines[tp+"Cards"].load(deckFor(tp, cur)); });
  engines[tp+"Match"] = makeMatch($("#"+tp+"Match"), function(){ return matchRound(tp, 6); });
  engines[tp+"Quiz"]  = makeQuiz($("#"+tp+"Quiz"), function(){ return topicQuestions(tp, null, 10); });
  renderNotes(tp);
});
renderGuide(); renderKit();

var ON_SHOW = {"exam/mock":function(){ if(!engines.mock) renderMockSetup(); }};
var KEYS = {"exam/mock":function(e){ return engines.mock ? engines.mock.keys(e) : false; }};
CHAPTERS.forEach(function(tp){
  ON_SHOW[tp+"/match"] = function(){ engines[tp+"Match"].ensure(); };
  ON_SHOW[tp+"/quiz"]  = function(){ engines[tp+"Quiz"].ensure(); };
  KEYS[tp+"/cards"] = function(e){ return engines[tp+"Cards"].keys(e); };
  KEYS[tp+"/quiz"]  = function(e){ return engines[tp+"Quiz"].keys(e); };
});
var TOPICS = ["guide","kit","c4","c5","c6","exam"];
var currentTopic = "guide", currentMode = {guide:"overview", kit:"card", c4:"notes", c5:"notes", c6:"notes", exam:"mock"};
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
