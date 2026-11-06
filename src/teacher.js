
// ==============================
// ③ 先生の側：せっていコード・きろくコード・先生画面・おためし
// ==============================
const TSETTEI = {
  teacherKey: 'kazoete-town_teacher_v1',     // 先生の端末に ためる 記録の保存の名前（変えない）
  passSalt: 'kazoete-town:',                 // あいことばに まぜる 文字
  passDefaultHash: 'f2bc89a26a56f491a7698fe515aa61b2b871f23a2d7930d4f34309abb602438a',  // さいしょの あいことば「kazoe」
  pageUrl: 'https://rubiziumu37-glitch.github.io/kazoete-town/',   // せっていQRに入れる アドレス
  kirokuMax: 200,                            // きろくコード（文字）に入れる 回数
  teacherLogMax: 1000                        // 先生の端末に 1人あたり ためる 回数
};
// 問題の種類の よみかた
const QLABEL = {
  most:'いちばん おおい', least:'いちばん すくない', enough:'たりる？', howmany:'いくつ（1つの数）', total:'ぜんぶで',
  sonota:'「その他」の数', diff:'ちがい（いくつ おおい）', statement:'ただしい文を えらぶ',
  cls_most:'クラスで いちばん おおい', all_most:'あわせて いちばん おおい', row_total:'あわせて いくつ（2つのクラス）', cls_total:'クラスの ぜんぶ'
};

// ---- コードの 作り方：JSON → 縮める（deflate） → URLに 入れられる文字 ----
function b64u(bytes){ let s=''; bytes.forEach(b=>s+=String.fromCharCode(b)); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function unb64u(t){ t=t.replace(/-/g,'+').replace(/_/g,'/'); while(t.length%4) t+='='; const s=atob(t); return Uint8Array.from(s, c=>c.charCodeAt(0)); }
async function streamBytes(bytes, stream){ const r = new Blob([bytes]).stream().pipeThrough(stream); return new Uint8Array(await new Response(r).arrayBuffer()); }
async function packCode(prefix, obj){
  const raw = new TextEncoder().encode(JSON.stringify(obj));
  if(window.CompressionStream){ try{ return prefix + 'Z' + b64u(await streamBytes(raw, new CompressionStream('deflate-raw'))); }catch(e){} }
  return prefix + 'J' + b64u(raw);
}
// 貼られた文の中から コードを ぜんぶ 見つける（何人分でも）
function findCodes(text, prefix){ const re = new RegExp(prefix + '[ZJ][A-Za-z0-9_-]+', 'g'); return String(text).match(re) || []; }
async function unpackCode(code, prefix){
  const body = code.slice(prefix.length + 1), flag = code[prefix.length];
  let bytes = unb64u(body);
  if(flag==='Z') bytes = await streamBytes(bytes, new DecompressionStream('deflate-raw'));
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function hashPass(t){
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(TSETTEI.passSalt + String(t).trim()));
  return Array.from(new Uint8Array(d)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
function qrSvg(text){
  try{ const q = qrcode(0, 'L'); q.addData(text); q.make(); return q.createSvgTag({cellSize:4, margin:3, scalable:true}); }
  catch(e){ return '<p class="sub-msg">QRが つくれませんでした（文字の コードを つかってね）</p>'; }
}
async function copyText(t, btn){
  let ok = false;
  try{ await navigator.clipboard.writeText(t); ok = true; }catch(e){}
  if(!ok){ const ta = btn.closest('.panel').querySelector('textarea'); if(ta){ ta.focus(); ta.select(); try{ ok = document.execCommand('copy'); }catch(e){} } }
  btn.textContent = ok ? 'コピーした！' : 'えらんだので、コピーしてね';
}

// ---- 子ども：止める段階 ----
function danAllowed(p, dan){ return p.teacher || !p.stopDan || dan <= p.stopDan; }
// 8つ かなえた 段階の つぎの町を、止められていなければ ひらく
function syncOpen(p){
  for(let d=1; d<5; d++){
    const all = DAN[d].stages.every((_,k)=>(p.cleared[`${d}-${k+1}`]||0)>0);
    if(all && danAllowed(p, d+1) && !p.chiku.opened.includes(d+1)) p.chiku.opened.push(d+1);
  }
  p.chiku.opened.sort((a,b)=>a-b);
}

// ---- 子ども：せっていコードを 入れる ----
async function applySetteiText(text){
  const codes = findCodes(text, 'KZS1');
  if(!codes.length) return ['せっていコードが みつからないよ'];
  const out = [];
  for(const c of codes){
    let d; try{ d = await unpackCode(c, 'KZS1'); }catch(e){ out.push('コードが こわれているよ'); continue; }
    Object.entries(d.k||{}).forEach(([no, v])=>{
      const p = SAVE.players[no]; if(!p || p.teacher) return;
      const [stop, coin] = v; const msg = [];
      p.stopDan = stop||0;
      msg.push(stop ? `だい${stop}だんまで` : 'とめる だんかい なし');
      if(coin && !p.settei.includes(d.id)){ p.coins = Math.max(0, p.coins + coin); msg.push(`コイン ${coin>0?'＋':''}${coin}`); }
      if(!p.settei.includes(d.id)) p.settei.push(d.id);
      if(p.settei.length > 50) p.settei.splice(0, p.settei.length - 50);
      syncOpen(p);
      out.push(`${no}ばん ${p.nick}：${msg.join('　')}`);
    });
  }
  writeSave();
  return out.length ? out : ['この たんまつに いる ばんごうは コードに はいって いなかったよ'];
}
function showSetteiInput(){
  $app.innerHTML = `<div class="title-wrap"><div class="title-card"><div class="panel" style="display:flex;flex-direction:column;gap:12px">
    <h2>せっていを いれる</h2>
    <p class="sub-msg">せんせいから もらった せっていコードを はりつけてね</p>
    <textarea id="code" rows="4" class="code-box" placeholder="KZS1…"></textarea>
    <div id="res" class="res"></div>
    <div class="bar" style="justify-content:center"><button class="btn sub" id="back">もどる</button><button class="btn" id="go">いれる</button></div>
  </div></div></div>`;
  $app.querySelector('#back').onclick = ()=>showTitle();
  $app.querySelector('#go').onclick = async ()=>{
    const r = await applySetteiText($app.querySelector('#code').value);
    $app.querySelector('#res').innerHTML = r.map(x=>`<div>${esc(x)}</div>`).join('');
  };
}
// アドレスに ?s=… が ついて ひらかれたとき（QRを カメラで よんだとき）
let setteiNotice = null;
async function setteiFromUrl(){
  try{
    const s = new URLSearchParams(location.search).get('s');
    if(!s) return;
    setteiNotice = await applySetteiText(s);
    history.replaceState(null, '', location.pathname);
  }catch(e){}
}

// ---- 子ども：きろくコード ----
function lastProgress(p){
  let best = null;
  Object.keys(p.cleared).forEach(k=>{ const [d,s] = k.split('-').map(Number); if(!best || d*10+s > best[0]*10+best[1]) best=[d,s]; });
  return best ? `${best[0]}-${best[1]}` : '';
}
function qStats(logs){
  const q = {};
  logs.forEach(r=>(r.qs||[]).forEach(x=>{ q[x.type] = q[x.type] || [0,0]; q[x.type][1]++; if(x.ok) q[x.type][0]++; }));
  return q;
}
function recentRate(logs, n=10){
  const all = []; logs.forEach(r=>(r.qs||[]).forEach(x=>all.push(x.ok)));
  const last = all.slice(-n); return last.length ? Math.round(last.filter(Boolean).length / last.length * 100) : null;
}
function kidSummary(p){
  const last = p.log.length ? p.log[p.log.length-1].t : null;
  return {v:1, no:p.no, nick:p.nick, coins:p.coins, cl:Object.keys(p.cleared).length, pr:lastProgress(p), t:last, r10:recentRate(p.log), q:qStats(p.log), stop:p.stopDan||0};
}
function showMiseru(){
  const p = me();
  const d = document.createElement('div'); d.className = 'modal';
  d.innerHTML = `<div class="panel miseru"><h2>せんせいに みせる</h2><p class="sub-msg">つくっています…</p></div>`;
  document.body.appendChild(d);
  (async ()=>{
    const sum = kidSummary(p);
    const qr = await packCode('KZQ1', sum);
    const full = await packCode('KZK1', Object.assign({}, sum, {full:1, opened:p.chiku.opened, cleared:p.cleared, log:p.log.slice(-TSETTEI.kirokuMax)}));
    d.innerHTML = `<div class="panel miseru">
      <h2>せんせいに みせる</h2>
      <div class="qr">${qrSvg(qr)}</div>
      <p class="sub-msg">${p.no}ばん ${esc(p.nick)}　せんせいの カメラで よんでもらってね</p>
      <details><summary>もじの コード（くわしい きろく）</summary>
        <p class="sub-msg">コピーして、せんせいに だしてね（Classroomなど）</p>
        <textarea readonly rows="4" class="code-box">${esc(full)}</textarea>
        <button class="btn small" id="cp">コピーする</button></details>
      <button class="btn sub" id="close">とじる</button></div>`;
    d.querySelector('#close').onclick = ()=>d.remove();
    d.querySelector('#cp').onclick = e=>copyText(full, e.currentTarget);
  })();
}

// ==============================
// 先生の端末の 保存
// ==============================
let TS = null;
function loadTS(){
  try{ TS = JSON.parse(localStorage.getItem(TSETTEI.teacherKey)||'null'); }catch(e){ TS = null; }
  if(!TS || typeof TS!=='object') TS = {};
  if(!TS.kids) TS.kids = {};
  if(!TS.edit) TS.edit = {};
  if(!TS.passHash) TS.passHash = null;
}
function writeTS(){ try{ localStorage.setItem(TSETTEI.teacherKey, JSON.stringify(TS)); }catch(e){} }
// 子どもの きろくを 先生の 端末に まぜる（同じ記録は 二重に しない）
function mergeKid(d){
  const no = String(d.no); if(!/^\d+$/.test(no)) return null;
  const k = TS.kids[no] = TS.kids[no] || {logs:[]};
  if(!k.t || (d.t||0) >= k.t){ ['nick','coins','cl','pr','t','r10','q','stop'].forEach(f=>{ if(d[f]!==undefined) k[f]=d[f]; }); }
  if(d.full && Array.isArray(d.log)){
    const seen = new Set(k.logs.map(r=>r.t+'|'+r.dan+'|'+r.stage));
    d.log.forEach(r=>{ const key=r.t+'|'+r.dan+'|'+r.stage; if(!seen.has(key)){ k.logs.push(r); seen.add(key); } });
    k.logs.sort((a,b)=>a.t-b.t);
    if(k.logs.length > TSETTEI.teacherLogMax) k.logs.splice(0, k.logs.length - TSETTEI.teacherLogMax);
    k.fullAt = Date.now();
  }
  k.readAt = Date.now();
  return no;
}
async function readKirokuText(text){
  const out = [];
  for(const pre of ['KZK1','KZQ1']){
    for(const c of findCodes(text, pre)){
      try{ const d = await unpackCode(c, pre); const no = mergeKid(d); out.push(no ? `${no}ばん ${d.nick}（${pre==='KZK1'?'くわしい きろく '+(d.log||[]).length+'回':'QRの まとめ'}）` : 'ばんごうが ない コード'); }
      catch(e){ out.push('こわれた コードが ありました'); }
    }
  }
  writeTS();
  return out;
}

// ==============================
// 先生画面
// ==============================
const fmtDay = t => { if(!t) return '—'; const d = new Date(t); return `${d.getMonth()+1}/${d.getDate()}`; };
const fmtPr = pr => { if(!pr) return 'まだ'; const [d,s] = pr.split('-'); return `だい${d}だん ${s}`; };
function showTeacherLogin(err=''){
  loadTS();
  $app.innerHTML = `<div class="title-wrap"><div class="title-card"><div class="panel" style="display:flex;flex-direction:column;gap:12px">
    <h2>せんせいの がめん</h2>
    <label class="field">あいことば<input id="pw" type="password" autocomplete="off"></label>
    <div class="err">${esc(err)}</div>
    <div class="bar" style="justify-content:center"><button class="btn sub" id="back">もどる</button><button class="btn" id="go">はいる</button></div>
  </div></div></div>`;
  const go = async ()=>{
    const h = await hashPass($app.querySelector('#pw').value);
    if(h === (TS.passHash || TSETTEI.passDefaultHash)) showTeacher('ichiran'); else showTeacherLogin('あいことばが ちがいます');
  };
  $app.querySelector('#go').onclick = go;
  $app.querySelector('#pw').onkeydown = e=>{ if(e.key==='Enter') go(); };
  $app.querySelector('#back').onclick = ()=>showTitle();
}
let tTab = 'ichiran';
function showTeacher(tab){
  if(tab) tTab = tab;
  const tabs = [['ichiran','クラスの いちらん'],['yomu','きろくを よみこむ'],['settei','せっていコード'],['sonota','そのほか']];
  $app.innerHTML = `<div class="bar"><h2>せんせいの がめん</h2><span class="sp"></span><button class="btn sub" id="out">おわる</button></div>
    <div class="tabs">${tabs.map(([k,n])=>`<button data-tt="${k}" class="${tTab===k?'on':''}">${n}</button>`).join('')}</div>
    <div id="tbody" class="tpanel"></div>`;
  $app.querySelector('#out').onclick = ()=>{ stopCamera(); showTitle(); };
  $app.querySelectorAll('[data-tt]').forEach(b=>b.onclick=()=>{ stopCamera(); showTeacher(b.dataset.tt); });
  const box = $app.querySelector('#tbody');
  ({ichiran:tIchiran, yomu:tYomu, settei:tSettei, sonota:tSonota})[tTab](box);
}
function kidNos(){ return Object.keys(TS.kids).sort((a,b)=>a-b); }
function tIchiran(box){
  const nos = kidNos();
  if(!nos.length){ box.innerHTML = '<div class="panel"><p>まだ きろくが ありません。「きろくを よみこむ」から 子どもの コードを 読みこんでください。</p></div>'; return; }
  box.innerHTML = `<div class="panel wrap-x"><table class="ttable">
    <thead><tr><th>ばん</th><th>ニックネーム</th><th>すすみ</th><th>かなえた</th><th>「読む」正答率<br><small>最近10問</small></th><th>さいごに あそんだ日</th><th>コイン</th><th>止める</th></tr></thead>
    <tbody>${nos.map(no=>{ const k = TS.kids[no];
      return `<tr data-k="${no}"><td>${no}</td><td>${esc(k.nick||'')}</td><td>${fmtPr(k.pr)}</td><td>${k.cl??'—'} / 40</td>
        <td class="${k.r10!=null && k.r10<60 ? 'low':''}">${k.r10==null?'—':k.r10+'%'}</td><td>${fmtDay(k.t)}</td><td>${k.coins??'—'}</td><td>${k.stop?`だい${k.stop}だん`:'—'}</td></tr>`; }).join('')}</tbody></table>
    <p class="sub-msg">行を おすと、一人ずつの カルテが ひらきます。正答率 60%より 下は 色が つきます。</p></div>`;
  box.querySelectorAll('[data-k]').forEach(r=>r.onclick=()=>showKarte(r.dataset.k));
}
function showKarte(no){
  const k = TS.kids[no];
  const fromLogs = k.logs && k.logs.length;
  const q = fromLogs ? qStats(k.logs) : (k.q||{});
  // 問題の種類ごとの 平均秒数と 最近5回
  const per = {};
  (k.logs||[]).forEach(r=>(r.qs||[]).forEach(x=>{ (per[x.type] = per[x.type] || []).push(x); }));
  const order = Object.keys(QLABEL).filter(t=>q[t]);
  $app.innerHTML = `<div class="bar"><button class="btn sub" id="back">← いちらんへ</button><h2>${no}ばん ${esc(k.nick||'')} の カルテ</h2></div>
    <div class="panel">
      <p>${fmtPr(k.pr)}まで ／ かなえた ${k.cl??'—'} ／ さいごに あそんだ日 ${fmtDay(k.t)} ／ 「読む」正答率（最近10問）${k.r10==null?'—':k.r10+'%'}</p>
      <p class="sub-msg" style="text-align:left">${fromLogs ? `くわしい きろく ${k.logs.length}回分から 計算` : 'QRの まとめから（くわしい きろくを 読みこむと、秒数と 最近の ○× も 出ます）'}</p>
      ${order.length ? `<div class="wrap-x"><table class="ttable karte">
        <thead><tr><th>問題の しゅるい</th><th>正答</th><th>正答率</th><th>平均の 秒数</th><th>最近5回</th></tr></thead>
        <tbody>${order.map(t=>{ const [ok,n] = q[t]; const rate = Math.round(ok/n*100); const xs = per[t]||[];
          const avg = xs.length ? Math.round(xs.reduce((a,x)=>a+(x.sec||0),0)/xs.length) : null;
          return `<tr><th>${QLABEL[t]}</th><td>${ok} / ${n}</td><td><span class="rbar"><i style="width:${rate}%"></i></span>${rate}%</td>
            <td>${avg==null?'—':avg+'秒'}</td><td class="ox">${xs.slice(-5).map(x=>x.ok?'<b class="o">○</b>':'<b class="x">×</b>').join('') || '—'}</td></tr>`; }).join('')}</tbody></table></div>`
        : '<p>まだ 答えた 問題が ありません。</p>'}
    </div>
    <div class="bar"><span class="sp"></span><button class="btn sub small" id="del">この子の きろくを 先生の 端末から けす</button></div>`;
  $app.querySelector('#back').onclick = ()=>showTeacher('ichiran');
  const del = $app.querySelector('#del'); let armed = false;
  del.onclick = ()=>{ if(!armed){ armed = true; del.textContent = 'もう いちど おすと けします'; return; } delete TS.kids[no]; writeTS(); showTeacher('ichiran'); };
}
function tYomu(box){
  box.innerHTML = `<div class="panel" style="display:flex;flex-direction:column;gap:10px">
      <h3>カメラで QRを よむ（その場で）</h3>
      <p class="sub-msg" style="text-align:left">子どもの「せんせいに みせる」の QRを、つぎつぎに うつしてください。</p>
      <div class="bar"><button class="btn" id="cam">カメラを ひらく</button></div>
      <div id="camwrap"></div>
    </div>
    <div class="panel" style="display:flex;flex-direction:column;gap:10px">
      <h3>もじの コードを はりつける（くわしい きろく）</h3>
      <p class="sub-msg" style="text-align:left">Classroomなどに 出された コードを、何人分でも まとめて はりつけて ください。</p>
      <textarea id="paste" rows="6" class="code-box" placeholder="KZK1…"></textarea>
      <div class="bar"><button class="btn" id="read">よみこむ</button></div>
    </div>
    <div id="res" class="res"></div>`;
  const res = box.querySelector('#res');
  const show = list=>{ res.innerHTML = list.length ? list.map(x=>`<div>✓ ${esc(x)}</div>`).join('') : '<div>コードが みつかりませんでした</div>'; };
  box.querySelector('#read').onclick = async ()=>show(await readKirokuText(box.querySelector('#paste').value));
  box.querySelector('#cam').onclick = ()=>startCamera(box.querySelector('#camwrap'), async text=>{
    const r = await readKirokuText(text); if(r.length) res.insertAdjacentHTML('afterbegin', r.map(x=>`<div>✓ ${esc(x)}</div>`).join(''));
  });
}
// ---- カメラで QRを よむ（BarcodeDetector が なければ jsQR を 読みこむ） ----
let camStream = null, camTimer = null;
function stopCamera(){ if(camTimer){ clearTimeout(camTimer); camTimer=null; } if(camStream){ camStream.getTracks().forEach(t=>t.stop()); camStream=null; } }
function loadJsQR(){
  return new Promise((ok,ng)=>{ if(window.jsQR) return ok(); const s=document.createElement('script'); s.src='lib/jsQR.min.js'; s.onload=ok; s.onerror=ng; document.head.appendChild(s); });
}
async function startCamera(wrap, onText){
  stopCamera();
  wrap.innerHTML = '<p class="sub-msg">カメラを じゅんび しています…</p>';
  try{ camStream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}, audio:false}); }
  catch(e){ wrap.innerHTML = '<p class="err">カメラが つかえませんでした。もじの コードで 読みこんでください。</p>'; return; }
  wrap.innerHTML = '<video playsinline muted class="cam"></video><div class="bar"><button class="btn sub small" id="camstop">カメラを とじる</button><span class="sub-msg" id="camst">QRを うつしてください</span></div>';
  const v = wrap.querySelector('video'); v.srcObject = camStream; await v.play().catch(()=>{});
  wrap.querySelector('#camstop').onclick = ()=>{ stopCamera(); wrap.innerHTML=''; };
  let det = null;
  try{ if('BarcodeDetector' in window && (await BarcodeDetector.getSupportedFormats()).includes('qr_code')) det = new BarcodeDetector({formats:['qr_code']}); }catch(e){}
  if(!det){ try{ await loadJsQR(); }catch(e){ wrap.querySelector('#camst').textContent='QRを よむ しくみが 読みこめませんでした'; return; } }
  const cv = document.createElement('canvas'), cx = cv.getContext('2d', {willReadFrequently:true});
  const seen = new Set();
  const tick = async ()=>{
    if(!camStream) return;
    let text = null;
    try{
      if(v.videoWidth){
        if(det){ const r = await det.detect(v); if(r[0]) text = r[0].rawValue; }
        else { cv.width = v.videoWidth; cv.height = v.videoHeight; cx.drawImage(v,0,0); const im = cx.getImageData(0,0,cv.width,cv.height); const r = jsQR(im.data, im.width, im.height); if(r) text = r.data; }
      }
    }catch(e){}
    if(text && !seen.has(text)){ seen.add(text); const st = wrap.querySelector('#camst'); if(st) st.textContent = 'よみこみました！ つぎの QRを うつしてください'; await onText(text); }
    camTimer = setTimeout(tick, 250);
  };
  tick();
}
function tSettei(box){
  const nos = Array.from(new Set(kidNos().concat(Object.keys(TS.edit)))).sort((a,b)=>a-b);
  const row = no=>{ const e = TS.edit[no] || {stop:(TS.kids[no]&&TS.kids[no].stop)||0, coin:0}; const k = TS.kids[no]||{};
    return `<tr data-no="${no}"><td>${no}</td><td>${esc(k.nick||'')}</td>
      <td><select data-f="stop">${[0,1,2,3,4].map(d=>`<option value="${d}" ${e.stop==d?'selected':''}>${d?`だい${d}だんまで`:'とめない'}</option>`).join('')}</select></td>
      <td class="coinedit"><button data-c="-10">−10</button><input data-f="coin" inputmode="numeric" value="${e.coin||0}"><button data-c="10">＋10</button></td></tr>`; };
  box.innerHTML = `<div class="panel" style="display:flex;flex-direction:column;gap:10px">
    <p class="sub-msg" style="text-align:left">番号ごとに きめて、「コードを つくる」を おします。1つの コードに クラス全員分が 入ります。コインは コード1つにつき 1回だけ 足し引きされます。</p>
    <div class="wrap-x"><table class="ttable"><thead><tr><th>ばん</th><th>ニックネーム</th><th>ここまでで 止める</th><th>コインを ふやす・へらす</th></tr></thead>
      <tbody>${nos.map(row).join('')}</tbody></table></div>
    <div class="bar"><label class="field" style="flex-direction:row;align-items:center;gap:8px">ばんごうを たす<input id="addno" inputmode="numeric" maxlength="2" style="width:5em"></label><button class="btn sub small" id="add">たす</button></div>
    <div class="bar"><span class="sp"></span><button class="btn" id="make">コードを つくる</button></div>
  </div><div id="sout"></div>`;
  const save = ()=>{ box.querySelectorAll('tr[data-no]').forEach(tr=>{ const no = tr.dataset.no;
    TS.edit[no] = {stop:+tr.querySelector('[data-f=stop]').value, coin:parseInt(zen2han(tr.querySelector('[data-f=coin]').value),10)||0}; }); writeTS(); };
  box.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{ const i = b.parentNode.querySelector('input'); i.value = (parseInt(zen2han(i.value),10)||0) + (+b.dataset.c); save(); });
  box.querySelectorAll('select,input[data-f]').forEach(i=>i.onchange=save);
  box.querySelector('#add').onclick = ()=>{ const n = parseInt(zen2han(box.querySelector('#addno').value),10); if(n>=1 && n<=99){ save(); TS.edit[n] = TS.edit[n] || {stop:0, coin:0}; writeTS(); tSettei(box); } };
  box.querySelector('#make').onclick = async ()=>{
    save();
    const k = {}; Object.entries(TS.edit).forEach(([no,e])=>{ k[no] = [e.stop||0, e.coin||0]; });
    const code = await packCode('KZS1', {id: Date.now().toString(36), k});
    const url = TSETTEI.pageUrl + '?s=' + code;
    // コインは 1回だけ 足し引きするので、つぎの コードの ために 0に もどす
    Object.values(TS.edit).forEach(e=>{ e.coin = 0; }); writeTS();
    box.querySelectorAll('input[data-f=coin]').forEach(i=>{ i.value = 0; });
    box.querySelector('#sout').innerHTML = `<div class="panel miseru">
      <h3>せっていコード（${Object.keys(k).length}人分）</h3>
      <div class="qr big">${qrSvg(url)}</div>
      <p class="sub-msg">子どもの 端末の カメラで よむと、ゲームが ひらいて 設定されます（GitHub Pagesに 置いてから）</p>
      <textarea readonly rows="3" class="code-box">${esc(code)}</textarea>
      <div class="bar" style="justify-content:center"><button class="btn small" id="cp">もじの コードを コピー</button></div>
      <p class="sub-msg">もじの コードは、はじめの 画面の「せっていを いれる」に はりつけます。コインの 欄は、つぎの コードの ために 0に もどしました（この コードには 入っています）。</p></div>`;
    box.querySelector('#cp').onclick = e=>copyText(code, e.currentTarget);
  };
}
function tSonota(box){
  box.innerHTML = `<div class="panel" style="display:flex;flex-direction:column;gap:10px">
      <h3>おためしで あそぶ</h3>
      <p class="sub-msg" style="text-align:left">先生 専用の 番号で、40ステージが ぜんぶ ひらいた 状態で あそべます。子どもの 一覧と きろくには 入りません。</p>
      <div class="bar"><button class="btn" id="try">おためしで あそぶ</button></div></div>
    <div class="panel" style="display:flex;flex-direction:column;gap:10px">
      <h3>あいことばを かえる</h3>
      <p class="sub-msg" style="text-align:left">この 端末の 先生画面だけで かわります。あいことばは、うっかり 開かないための 目かくしです。</p>
      <label class="field">あたらしい あいことば<input id="p1" type="password" autocomplete="off"></label>
      <label class="field">もう いちど<input id="p2" type="password" autocomplete="off"></label>
      <div class="err" id="perr"></div>
      <div class="bar"><button class="btn sub" id="pch">かえる</button></div></div>
    <div class="panel" style="display:flex;flex-direction:column;gap:10px">
      <h3>先生の 端末の きろくを ぜんぶ けす</h3>
      <p class="sub-msg" style="text-align:left">読みこんだ 子どもの きろくと、せっていの 下書きを けします。子どもの 端末の きろくは けえません。</p>
      <div class="bar"><button class="btn sub" id="wipe">ぜんぶ けす</button></div></div>`;
  box.querySelector('#try').onclick = ()=>{
    let p = SAVE.players.sensei;
    if(!p){ p = SAVE.players.sensei = newPlayer('sensei', 'せんせい'); p.teacher = true; p.partner = 'shizuku'; p.coins = 3000; }
    p.chiku.opened = [1,2,3,4,5];
    SAVE.last = 'sensei'; writeSave(); curChiku = 1; showTown();
  };
  box.querySelector('#pch').onclick = async ()=>{
    const a = box.querySelector('#p1').value.trim(), b = box.querySelector('#p2').value.trim(), er = box.querySelector('#perr');
    if(a.length < 4){ er.textContent = '4文字 以上に してください'; return; }
    if(a !== b){ er.textContent = '2つが ちがいます'; return; }
    TS.passHash = await hashPass(a); writeTS(); er.textContent = 'かえました'; er.style.color = 'var(--mint-koi)';
  };
  const w = box.querySelector('#wipe'); let armed = false;
  w.onclick = ()=>{ if(!armed){ armed = true; w.textContent = 'もう いちど おすと けします'; return; } TS.kids = {}; TS.edit = {}; writeTS(); w.textContent = 'けしました'; };
}
