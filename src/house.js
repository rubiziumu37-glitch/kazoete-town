
// ==============================
// ②-3 お店と自分の家
// ==============================

// 品物の一覧： [ID, なまえ, 画像, 売り場, 入荷する町, ねだん, 大きさ(場面の横はばに対する%), ゆかに しく物か]
// 売り場： ie＝家の見た目 / niwa＝にわ / kagu＝家具 / heya＝へや
const SHINA_LIST = [
  // 家の見た目（H01は さいしょから もっている）
  ['H01','こや','ie/H01_koya','ie',1,0,24],
  ['H02','あかい やねの いえ','ie/H02_akayane','ie',1,100,26],
  ['H03','あおい やねの いえ','ie/H03_aoyane','ie',1,100,26],
  ['H04','れんがの いえ','ie/H04_renga','ie',2,150,26],
  ['H05','2かいだての いえ','ie/H05_nikaidate','ie',2,150,27],
  ['H06','テラスの ある いえ','ie/H06_terrace','ie',3,200,31],
  ['H07','はなばたけの やねの いえ','ie/H07_hanabatake_yane','ie',3,200,27],
  ['H08','ツリーハウス','ie/H08_treehouse','ie',4,250,29],
  ['H09','きのこの いえ','ie/H09_kinoko','ie',4,250,27],
  ['H10','ようかん','ie/H10_yokan','ie',4,250,28],
  ['H11','ガラスの とう','ie/H11_glass_tou','ie',5,300,27],
  ['H12','すいしょうの おしろ','ie/H12_suisho_oshiro','ie',5,300,31],
  // にわ
  ['G01','きの さく','niwa/G01_kinosaku','niwa',1,40,14],
  ['G02','しろい さく','niwa/G02_picket','niwa',1,40,14],
  ['G03','かだん','niwa/G03_hanadan','niwa',1,40,12],
  ['G04','ゆうびんうけ','niwa/G04_yubinuke','niwa',1,40,6],
  ['G05','ベンチ','niwa/G05_bench','niwa',1,40,12],
  ['G06','がいとう','niwa/G06_gaito','niwa',1,40,7],
  ['G07','まるい き','niwa/G07_marui_ki','niwa',2,50,13],
  ['G08','みの なる き','niwa/G08_mi_no_ki','niwa',2,50,13],
  ['G09','いけ','niwa/G09_ike','niwa',2,50,16,1],
  ['G10','とびいし','niwa/G10_tobiishi','niwa',2,50,11,1],
  ['G11','ブランコ','niwa/G11_buranko','niwa',3,60,14],
  ['G12','すばこ','niwa/G12_subako','niwa',3,60,6],
  ['G13','いぬごや','niwa/G13_inugoya','niwa',3,60,11],
  ['G14','うえきばち','niwa/G14_uekibachi','niwa',4,70,9],
  ['G15','やさいばたけ','niwa/G15_yasai_hatake','niwa',4,70,14,1],
  ['G16','ばらの アーチ','niwa/G16_bara_arch','niwa',4,70,13],
  ['G17','ハンモック','niwa/G17_hammock','niwa',5,80,15],
  ['G18','すいしょうの ランタン','niwa/G18_suisho_lantern','niwa',5,80,7],
  // 家具
  ['K01','ベッド','kagu/K01_bed','kagu',1,30,17],
  ['K02','てんがいの ベッド','kagu/K02_tengai_bed','kagu',1,30,18],
  ['K03','ソファ','kagu/K03_sofa','kagu',1,30,16],
  ['K04','いす','kagu/K04_isu1','kagu',1,30,8],
  ['K05','クッション','kagu/K05_cushion','kagu',1,30,8],
  ['K06','ラグ','kagu/K06_rug','kagu',1,30,20,1],
  ['K07','テーブル','kagu/K07_dining_table','kagu',1,30,14],
  ['K08','テーブルの いす','kagu/K08_isu2','kagu',1,30,8],
  ['K09','キッチン','kagu/K09_kitchen','kagu',2,35,17],
  ['K10','れいぞうこ','kagu/K10_reizoko','kagu',2,35,9],
  ['K11','しょっきだな','kagu/K11_shokkidana','kagu',2,35,12],
  ['K12','ケーキの テーブル','kagu/K12_cake_table','kagu',2,35,11],
  ['K13','つくえ','kagu/K13_tsukue','kagu',2,35,13],
  ['K14','ほんだな','kagu/K14_hondana','kagu',2,35,11],
  ['K15','おもちゃばこ','kagu/K15_omochabako','kagu',2,35,10],
  ['K16','つみき','kagu/K16_tsumiki','kagu',2,35,7],
  ['K17','ちきゅうぎ','kagu/K17_chikyugi','kagu',3,40,7],
  ['K18','ピアノ','kagu/K18_piano','kagu',3,40,15],
  ['K19','はちうえの き','kagu/K19_kanyo_shokubutsu','kagu',3,40,9],
  ['K20','スタンドライト','kagu/K20_floor_lamp','kagu',3,40,7],
  ['K21','だんろ','kagu/K21_danro','kagu',3,40,14],
  ['K22','すいそう','kagu/K22_suiso','kagu',3,40,10],
  ['K23','はしらどけい','kagu/K23_hashiradokei','kagu',3,40,7],
  ['K24','たからばこ','kagu/K24_takarabako','kagu',4,50,9],
  ['K25','まど','kagu/K25_mado_curtain','kagu',4,50,12],
  ['K26','まるい まど','kagu/K26_marumado','kagu',4,50,10],
  ['K27','え','kagu/K27_e','kagu',4,50,9],
  ['K28','かべどけい','kagu/K28_kabedokei','kagu',4,50,6],
  ['K29','かべの たな','kagu/K29_kabe_tana','kagu',4,50,12],
  ['K30','ガーランド','kagu/K30_garland','kagu',4,50,15],
  ['K31','すいしょうの ランプ','kagu/K31_suisho_lamp','kagu',5,60,7],
  ['K32','すいしょうの テーブル','kagu/K32_suisho_table','kagu',5,60,12],
  ['K33','モビール','kagu/K33_mobile','kagu',5,60,8],
  ['K34','にじの ラグ','kagu/K34_niji_rug','kagu',5,60,20,1],
  ['K35','すいしょうの ほんだな','kagu/K35_suisho_hondana','kagu',5,60,12],
  ['K36','すいしょうの いす','kagu/K36_suisho_isu','kagu',5,60,9],
  // へや（R1は さいしょから。R3は R2を かってから）
  ['R1','ちいさな へや','heya/1','heya',1,0,0],
  ['R2','ふつうの へや','heya/2','heya',2,200,0],
  ['R3','ひろい へや','heya/3','heya',4,400,0],
];
const SHINA = {};
SHINA_LIST.forEach(a=>{ SHINA[a[0]] = {id:a[0], name:a[1], file:a[2], cat:a[3], chiku:a[4], price:a[5], size:a[6], flat:!!a[7]}; });
const URIBA = [['ie','いえ'],['niwa','にわ'],['kagu','かぐ'],['heya','へや']];
const HEYA_MAX = {R1:8, R2:16, R3:24};     // へやに おける かぐの かず
const NIWA_BG = null;                       // 庭の土台の絵（できたら 'img/niwa_bg.jpg' にする）
const shinaImg = id => SHINA[id].cat==='heya' ? `img/${SHINA[id].file}.jpg` : `img/${SHINA[id].file}.webp`;

function hasShina(id){ return me().kaimono.includes(id); }
function shinaOpen(id){
  const p = me(), s = SHINA[id];
  if(!p.chiku.opened.includes(s.chiku)) return false;
  if(id==='R3' && !hasShina('R2')) return false;
  return true;
}
function bestRoom(){ return hasShina('R3') ? 'R3' : (hasShina('R2') ? 'R2' : 'R1'); }

// ==============================
// 画面：おみせ
// ==============================
let shopCat = 'ie';
function showShop(cat){
  if(cat) shopCat = cat;
  const p = me();
  const list = SHINA_LIST.filter(a=>a[3]===shopCat).map(a=>SHINA[a[0]]);
  $app.innerHTML = `
  <div class="bar"><button class="btn sub" id="back">← まちへ</button><h2>おみせ</h2><span class="sp"></span>${coinPill()}
    <button class="btn" id="home">わたしの いえ</button></div>
  <div class="tabs">${URIBA.map(([k,n])=>`<button data-uri="${k}" class="${shopCat===k?'on':''}">${n}</button>`).join('')}</div>
  <div class="shop">
    ${list.map(s=>{
      const have = hasShina(s.id), open = shinaOpen(s.id);
      if(!open && !have){
        const why = (s.id==='R3' && p.chiku.opened.includes(4)) ? 'ふつうの へやの つぎ' : `${s.chiku}つめの まちで にゅうか`;
        return `<div class="shina lock"><div class="ph">？</div><b>？？？</b><span class="why">${why}</span></div>`;
      }
      return `<button class="shina ${have?'have':''}" data-buy="${s.id}" ${have?'disabled':''}>
        <div class="ph ${s.cat==='heya'?'wide':''}"><img src="${shinaImg(s.id)}" alt=""></div><b>${esc(s.name)}</b>
        ${have ? '<span class="why">もっている</span>' : `<span class="price ${p.coins<s.price?'short':''}"><img src="${COIN}" alt="">${s.price}</span>`}</button>`;
    }).join('')}
  </div>
  <p class="sub-msg">あたらしい まちが ひらくと、しなものが ふえるよ。コインは おねがいを かなえると もらえるよ</p>`;
  $app.querySelector('#back').onclick = showTown;
  $app.querySelector('#home').onclick = ()=>showHouse();
  $app.querySelectorAll('[data-uri]').forEach(b=>b.onclick=()=>showShop(b.dataset.uri));
  $app.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buyAsk(b.dataset.buy));
}
function buyAsk(id){
  const p = me(), s = SHINA[id], can = p.coins >= s.price;
  const d = document.createElement('div'); d.className = 'modal';
  d.innerHTML = `<div class="panel">
    <div class="ph ${s.cat==='heya'?'wide':''}"><img src="${shinaImg(id)}" alt=""></div>
    <h2>${esc(s.name)}</h2>
    <div class="coinline"><img src="${COIN}" alt="">${s.price}</div>
    <p class="sub-msg">${can ? `かうと コインは ${p.coins} → ${p.coins - s.price} に なるよ` : `コインが あと ${s.price - p.coins} たりないよ`}</p>
    <div class="bar" style="justify-content:center"><button class="btn sub" id="no">やめる</button>${can?'<button class="btn" id="yes">かう</button>':''}</div>
  </div>`;
  document.body.appendChild(d);
  d.querySelector('#no').onclick = ()=>d.remove();
  const y = d.querySelector('#yes');
  if(y) y.onclick = ()=>{
    p.coins -= s.price; p.kaimono.push(id);
    if(s.cat==='heya') p.house.room.bg = bestRoom();
    writeSave(); d.remove(); showBought(id);
  };
}
function showBought(id){
  const s = SHINA[id];
  const d = document.createElement('div'); d.className = 'modal';
  const go = s.cat==='kagu'||s.cat==='heya' ? 'heya' : 'niwa';
  d.innerHTML = `<div class="panel">
    <div class="big">かった！</div>
    <div class="ph ${s.cat==='heya'?'wide':''}"><img src="${shinaImg(id)}" alt=""></div>
    <h2>${esc(s.name)}</h2>
    <p class="sub-msg">${s.cat==='ie' ? 'わたしの いえで きせかえ できるよ' : (s.cat==='heya' ? `かぐが ${HEYA_MAX[id]}こまで おけるように なったよ` : 'わたしの いえで おいてね')}</p>
    <div class="bar" style="justify-content:center"><button class="btn sub" id="more">おみせに もどる</button><button class="btn" id="go">わたしの いえへ</button></div>
  </div>`;
  document.body.appendChild(d);
  d.querySelector('#more').onclick = ()=>{ d.remove(); showShop(); };
  d.querySelector('#go').onclick = ()=>{ d.remove(); houseTab = go; houseSel = null; showHouse(); };
}

// ==============================
// 画面：わたしの いえ（にわ ／ へや）
// ==============================
let houseTab = 'niwa';
let houseSel = null;     // えらんでいる（しまう ボタンを出す）もの
function showHouse(tab){
  if(tab){ houseTab = tab; houseSel = null; }
  const p = me(), h = p.house;
  const niwa = houseTab==='niwa';
  const placedList = niwa ? h.garden : h.room.items;
  const placedIds = placedList.map(o=>o.id);
  const cat = niwa ? 'niwa' : 'kagu';
  const free = p.kaimono.filter(id=>SHINA[id].cat===cat && !placedIds.includes(id));
  const room = h.room.bg, max = HEYA_MAX[room];
  const full = !niwa && placedList.length >= max;
  // 手前の ものほど あとに かく（ゆかに しく ものは いちばん うしろ）
  const order = placedList.slice().sort((a,b)=> (SHINA[b.id].flat - SHINA[a.id].flat) || (a.y - b.y));
  const looks = p.kaimono.filter(id=>SHINA[id].cat==='ie');
  $app.innerHTML = `
  <div class="bar"><button class="btn sub" id="back">← まちへ</button><h2>${esc(p.nick)}の いえ</h2><span class="sp"></span>${coinPill()}
    <button class="btn" id="shop">おみせ</button></div>
  <div class="tabs"><button data-ht="niwa" class="${niwa?'on':''}">にわ</button><button data-ht="heya" class="${niwa?'':'on'}">へや</button></div>
  <div class="scene ${niwa?'niwa':'heya'}" style="${niwa ? (NIWA_BG?`background-image:url('${NIWA_BG}')`:'') : `background-image:url('${shinaImg(room)}')`}">
    ${niwa ? `<div class="house" style="width:${SHINA[h.look].size}%"><img src="${shinaImg(h.look)}" alt="${esc(SHINA[h.look].name)}"></div>` : ''}
    ${order.map(o=>`<button class="put ${houseSel===o.id?'sel':''}" data-put="${o.id}" style="left:${o.x}%;top:${o.y}%;width:${SHINA[o.id].size}%" aria-label="${esc(SHINA[o.id].name)}"><img src="${shinaImg(o.id)}" alt=""></button>`).join('')}
    ${houseSel ? (()=>{ const o = placedList.find(v=>v.id===houseSel); return o ? `<button class="btn small shimau" id="shimau" style="left:${o.x}%;top:${Math.min(o.y+2,92)}%">しまう</button>` : ''; })() : ''}
  </div>
  ${niwa && looks.length>1 ? `<div class="looks"><span>いえの みため：</span>${looks.map(id=>`<button data-look="${id}" class="${h.look===id?'on':''}" aria-label="${esc(SHINA[id].name)}"><img src="${shinaImg(id)}" alt=""></button>`).join('')}</div>` : ''}
  <div class="msg" id="msg">${houseSel ? 'うごかすときは ドラッグ、しまうときは「しまう」' : (full ? `へやが いっぱい（${max}こ）。ひろい へやに すると もっと おけるよ` : (free.length ? 'したの ものを ドラッグして おこう' : ''))}</div>
  ${!niwa ? `<p class="sub-msg">${esc(SHINA[room].name)}：かぐ ${placedList.length} ／ ${max}こ</p>` : ''}
  <div class="tray">${free.length ? free.map(id=>`<button data-free="${id}" class="${full?'off':''}" aria-label="${esc(SHINA[id].name)}"><img src="${shinaImg(id)}" alt=""></button>`).join('')
    : `<span class="none">${niwa ? 'おみせで にわの ものを かえるよ' : 'おみせで かぐを かえるよ'}</span>`}</div>`;

  $app.querySelector('#back').onclick = ()=>{ houseSel=null; showTown(); };
  $app.querySelector('#shop').onclick = ()=>{ houseSel=null; showShop(niwa ? 'niwa' : 'kagu'); };
  $app.querySelectorAll('[data-ht]').forEach(b=>b.onclick=()=>showHouse(b.dataset.ht));
  $app.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{ h.look = b.dataset.look; writeSave(); showHouse(); });
  const scene = $app.querySelector('.scene');
  scene.addEventListener('pointerdown', e=>{ if(e.target===scene && houseSel){ houseSel=null; showHouse(); } });
  const sm = $app.querySelector('#shimau');
  if(sm) sm.onclick = ()=>{
    const i = placedList.findIndex(v=>v.id===houseSel); if(i>=0) placedList.splice(i,1);
    houseSel = null; writeSave(); showHouse();
  };
  // おいた場所を、場面の中の%で きめる（画面の大きさが かわっても 同じ ばしょ）
  const posFrom = (ev, el)=>{
    const r = scene.getBoundingClientRect(), hgt = el.getBoundingClientRect().height;
    const x = (ev.clientX - r.left) / r.width * 100;
    const y = (ev.clientY + hgt/2 - r.top) / r.height * 100;
    return {x: Math.round(Math.min(96, Math.max(4, x))*10)/10, y: Math.round(Math.min(100, Math.max(10, y))*10)/10};
  };
  $app.querySelectorAll('[data-free]').forEach(b=>{
    if(full){ b.onclick = ()=>say(`へやが いっぱい（${max}こ）だよ`); return; }
    makeDraggable(b, '.scene', (t, ev)=>{
      if(t && ev){ const pos = posFrom(ev, b); placedList.push({id:b.dataset.free, x:pos.x, y:pos.y}); houseSel=null; writeSave(); }
      showHouse();
    }, ()=>{
      // タップしたときは、まん中あたりに おく
      placedList.push({id:b.dataset.free, x:30 + rnd(40), y:niwa ? 82 : 75}); houseSel = b.dataset.free; writeSave(); showHouse();
    });
  });
  $app.querySelectorAll('[data-put]').forEach(b=>{
    makeDraggable(b, '.scene', (t, ev)=>{
      const o = placedList.find(v=>v.id===b.dataset.put);
      if(o && t && ev){ const pos = posFrom(ev, b); o.x = pos.x; o.y = pos.y; writeSave(); }
      showHouse();
    }, ()=>{ houseSel = (houseSel===b.dataset.put) ? null : b.dataset.put; showHouse(); });
  });
}
