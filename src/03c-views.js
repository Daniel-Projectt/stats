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
  var html = '<div class="gprog"><span class="count" id="gCount"></span><div class="bar"><i id="gBar" style="width:0"></i></div></div>';
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
  progress();
}
function goTo(path){
  var parts = path.split("/");
  currentMode[parts[0]] = parts[1];
  showTopic(parts[0]);
  window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"});
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
renderGuide(); renderKit();

var ON_SHOW = {"exam/mock":function(){ if(!engines.mock) renderMockSetup(); }};
var KEYS = {"exam/mock":function(e){ return engines.mock ? engines.mock.keys(e) : false; }};
var TOPICS = ["guide","exam","kit"];
var currentTopic = "guide", currentMode = {guide:"overview", kit:"card", exam:"mock"};
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
