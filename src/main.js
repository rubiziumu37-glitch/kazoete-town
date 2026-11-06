// ==============================
// 設定（ここの数字を変えると遊び方が変わる）
// ==============================
const SETTEI = {
  saveKey: 'kazoete-town_save_v1',   // 保存の名前（変えない）
  coinClear: 10,                     // クリアでもらえるコイン
  coinFirstBonus: 20,                // はじめてクリアしたときの追加コイン
  logMax: 500                        // 端末に残す記録の最大数
};

// ==============================
// データ（IDは消さない・変えない）
// ==============================
// 色（色で分けるステージで使う）
const IRO = {
  aka:['あか','#e5605a'], kiiro:['きいろ','#f2c94c'], midori:['みどり','#62b56b'],
  murasaki:['むらさき','#9a6fc8'], orenji:['オレンジ','#f29a3c'], pinku:['ピンク','#f29bb5']
};
// 題材：9題材×6種類。[ID, よみ, 画像, 色]
const DAIZAI = {
  kudamono:{unit:'人', kinds:[['ringo','りんご','C1_ringo','aka'],['banana','バナナ','C1_banana','kiiro'],['mikan','みかん','C1_mikan','orenji'],['budo','ぶどう','C1_budo','murasaki'],['ichigo','いちご','C1_ichigo','aka'],['momo','もも','C1_momo','pinku']]},
  yasai:{unit:'人', kinds:[['ninjin','にんじん','C2_ninjin','orenji'],['tomato','トマト','C2_tomato','aka'],['kyuri','きゅうり','C2_kyuri','midori'],['nasu','なす','C2_nasu','murasaki'],['tamanegi','たまねぎ','C2_tamanegi',null],['kyabetsu','キャベツ','C2_kyabetsu','midori']]},
  tenki:{unit:'日', kinds:[['hare','はれ','C3_hare'],['kumori','くもり','C3_kumori'],['ame','あめ','C3_ame'],['yuki','ゆき','C3_yuki'],['kaminari','かみなり','C3_kaminari'],['niji','にじ','C3_niji']]},
  dobutsu:{unit:'人', kinds:[['inu','いぬ','C4_inu'],['neko','ねこ','C4_neko'],['usagi','うさぎ','C4_usagi'],['hamster','ハムスター','C4_hamster'],['kotori','ことり','C4_kotori'],['kingyo','きんぎょ','C4_kingyo']]},
  norimono:{unit:'だい', kinds:[['jidosha','じどうしゃ','C5_jidosha'],['bus','バス','C5_bus'],['densha','でんしゃ','C5_densha'],['jitensha','じてんしゃ','C5_jitensha'],['hikoki','ひこうき','C5_hikoki'],['fune','ふね','C5_fune']]},
  kyushoku:{unit:'人', kinds:[['curry','カレー','C6_curry'],['ramen','ラーメン','C6_ramen'],['hamburg','ハンバーグ','C6_hamburg'],['karaage','からあげ','C6_karaage'],['agepan','あげパン','C6_agepan'],['jelly','ゼリー','C6_jelly']]},
  hana:{unit:'人', kinds:[['tulip','チューリップ','C7_tulip'],['himawari','ひまわり','C7_himawari'],['sakura','さくら','C7_sakura'],['asagao','あさがお','C7_asagao'],['bara','バラ','C7_bara'],['tanpopo','たんぽぽ','C7_tanpopo']]},
  asobi:{unit:'人', kinds:[['ball','ボール','C8_ball'],['nawatobi','なわとび','C8_nawatobi'],['ichirinsha','いちりんしゃ','C8_ichirinsha'],['hulahoop','フラフープ','C8_hulahoop'],['kendama','けんだま','C8_kendama'],['koma','こま','C8_koma']]},
  bunbogu:{unit:'こ', kinds:[['enpitsu','えんぴつ','C9_enpitsu'],['keshigomu','けしゴム','C9_keshigomu'],['note','ノート','C9_note'],['hasami','はさみ','C9_hasami'],['jogi','じょうぎ','C9_jogi'],['nori','のり','C9_nori']]}
};
const KIND = {};   // 種類ID → [ID, よみ, 画像, 色]
Object.values(DAIZAI).forEach(d=>d.kinds.forEach(k=>KIND[k[0]]=k));
// 色で分けるときに使う種類（色ごと）
const IRO_KINDS = {aka:['ringo','ichigo','tomato'], kiiro:['banana'], midori:['kyuri','kyabetsu'], murasaki:['budo','nasu'], orenji:['mikan','ninjin']};

// 水晶の精（パートナーにも依頼主にもなる）
const SEI = {
  shizuku:{name:'しずく', file:'S1_shizuku', kotoba:'おっとり'},
  momo:{name:'もも', file:'S2_momo', kotoba:'げんき'},
  sumire:{name:'すみれ', file:'S3_sumire', kotoba:'かしこい'}
};
// 町の人（依頼主）
const HITO = {
  P1:['おとこのこ','P1_otokonoko'], P2:['おんなのこ','P2_onnanoko'], P3:['パンやさん','P3_panyasan'],
  P4:['ゆうびんやさん','P4_yubinyasan'], P5:['おばあちゃん','P5_obaasan'], P6:['せんせい','P6_sensei']
};

// 建物：ID → 名前と画像
const TATEMONO = {
  panya:['パンや','01_panya'], toshokan:['としょかん','02_toshokan'], hanaya:['はなや','03_hanaya'],
  yubinkyoku:['ゆうびんきょく','04_yubinkyoku'], gakko:['がっこう','05_gakko'], suisho_tou:['すいしょうの とう','06_suisho_tou'],
  yaoya:['やおや','A01_yaoya'], cakeya:['ケーキや','A02_cakeya'], cafe:['カフェ','A03_cafe'], aisuya:['アイスや','A04_aisuya'],
  kudamonoya:['くだものや','A05_kudamonoya'], juice_yatai:['ジュースの やたい','A06_juice_yatai'],
  byoin:['びょういん','B01_byoin'], shobosho:['しょうぼうしょ','B02_shobosho'], koban:['こうばん','B03_koban'],
  eki:['えき','B04_eki'], basutei:['バスてい','B05_basutei'], tokeidai:['とけいだい','B06_tokeidai'],
  koen:['こうえん','C01_koen'], kanransha:['かんらんしゃ','C02_kanransha'], merry:['メリーゴーランド','C03_merry'],
  funsui:['ふんすい','C04_funsui'], pool:['プール','C05_pool'], fureai:['ふれあい ごや','C06_fureai_goya'],
  bijutsukan:['びじゅつかん','D01_bijutsukan'], ongaku:['おんがく ホール','D02_ongaku_hall'], tenmondai:['てんもんだい','D03_tenmondai'],
  hakubutsukan:['はくぶつかん','D04_hakubutsukan'], honya:['ほんや','D05_honya'], bunboguya:['ぶんぼうぐや','D06_bunboguya'],
  fusha:['ふうしゃ','E01_fusha'], naya:['なや','E02_naya_hatake'], onshitsu:['おんしつ','E03_onshitsu'],
  bokujo:['ぼくじょう','E04_bokujo_goya'], ido:['いど','E05_ido'], todai:['とうだい','E06_todai'],
  suisho_funsui:['すいしょうの ふんすい','F01_suisho_funsui'], suisho_gaito:['すいしょうの がいとう','F02_suisho_gaito'],
  dokutsu:['すいしょうの どうくつ','F03_suisho_dokutsu'], kikyu:['ききゅう','F04_kikyu'],
  suisho_onshitsu:['すいしょうの おんしつ','F05_suisho_onshitsu'], niji_mon:['にじの もん','F06_niji_mon']
};
// 地区（段階ごとに1つ）。slots は建物の足もとの位置（土台画像に対する％）。奥（上）から手前（下）の順
const CHIKU = [
  {no:1, name:'はじまりの まち', bg:'img/dodai/1.jpg', reward:['panya','yaoya','hanaya','yubinkyoku','cakeya','cafe','kudamonoya','toshokan'],
   slots:[[35,26],[59,29],[69.5,40],[20,45],[33,46],[77,57],[37,69],[53,69]]},
  {no:2, name:'はなの まち', bg:'img/dodai/2.jpg', reward:['gakko','aisuya','juice_yatai','byoin','shobosho','koban','eki','basutei'],
   slots:[[42.5,27],[62,32],[79,38],[24.6,39],[69.5,57],[43,57],[24,58],[55,72]]},
  {no:3, name:'みずべの まち', bg:'img/dodai/3.jpg', reward:['tokeidai','koen','kanransha','merry','funsui','pool','fureai','todai'],
   slots:[[42.8,27],[62,32],[80.5,42],[17,44],[64.4,53],[25.8,60],[35,72],[48,74]]},
  {no:4, name:'もりの まち', bg:'img/dodai/4.jpg', reward:['bijutsukan','ongaku','tenmondai','hakubutsukan','honya','bunboguya','fusha','naya'],
   slots:[[42.4,28],[62,32],[24.5,40],[81,42],[69,57],[24,59],[42,60],[54,73]]},
  {no:5, name:'すいしょうの やま', bg:'img/dodai/5.jpg', reward:['onshitsu','bokujo','suisho_funsui','suisho_gaito','dokutsu','kikyu','suisho_onshitsu','suisho_tou'],
   slots:[[42.8,29],[61.7,33],[23.5,40],[79,40],[70,57],[24,58],[42,59],[53,72]]}
];

// ==============================
// 段階とステージ（依頼）
// ==============================
// flow：遊ぶ順番。kanten 分け方を選ぶ / wake 分ける / kazoe 数える / hyo 表にする / hyo2 二次元の表
//       order 多い順にならべる / graph 棒グラフ / title 表題を選ぶ / kotae 答える
// set.type：kind 種類で / color 色で / choose 自分で選ぶ / data カードなし（表やグラフがはじめからある）/ two 2つのクラス
// q：答える問い。most いちばん多い / least いちばん少ない / enough たりる / howmany いくつ / total ぜんぶで / sonota その他は
//    diff いくつ多い / statement 正しい文 / cls_most 1くみで多い / row_total あわせて / all_most あわせて多い / cls_total くみの合計
const DAN = {
  1:{name:'わけて かぞえよう', stages:[
    {client:'P3', title:'パーティーの くだもの', set:{type:'kind', daizai:'kudamono', n:3}, cards:5, flow:['wake','kazoe','kotae'], q:['most'],
     req:'パーティーで いちばん にんきの くだものを だしたいの。みんなに きいた カードを わけて、いちばん おおいのを おしえて！'},
    {client:'P5', title:'かごの やさい', set:{type:'kind', daizai:'yasai', n:3, pick:['ninjin','tomato','kyuri','nasu','tamanegi']}, cards:6, flow:['wake','kazoe','kotae'], q:['enough'], unit:'こ',
     req:'カレーを つくるよ。{T}が {N}こ いるんだけど、かごの なかに たりるかな？'},
    {client:'P6', title:'かいたい どうぶつ', set:{type:'kind', daizai:'dobutsu', n:3}, cards:7, flow:['wake','kazoe','kotae'], q:['most'],
     req:'クラスで かいたい どうぶつを きいたよ。いちばん おおいのは どれかな？'},
    {client:'P4', title:'つくえの ぶんぼうぐ', set:{type:'kind', daizai:'bunbogu', n:3}, cards:8, flow:['wake','kazoe','kotae'], q:['enough'],
     req:'てがみを かくのに {T}が {N}こ いるの。つくえの うえに たりるかな？'},
    {client:'SEI1', title:'いろの なかま', set:{type:'color', colors:['aka','kiiro','midori']}, cards:8, flow:['wake','kazoe','kotae'], q:['most'], unit:'こ',
     req:'こんどは しゅるいじゃなくて、いろで わけてみて！ あか・きいろ・みどり、どの いろが いちばん おおいかな？'},
    {client:'P1', title:'あかい もの', set:{type:'color', colors:['aka','midori','murasaki']}, cards:9, flow:['wake','kazoe','kotae'], q:['howmany'], target:'aka', unit:'こ',
     req:'あかい ものを あつめてるんだ。いろで わけて、あかい ものが ぜんぶで いくつ あるか おしえて！'},
    {client:'P2', title:'みどりの もの', set:{type:'choose', correct:'color', colors:['aka','midori','kiiro']}, cards:10, flow:['kanten','wake','kazoe','kotae'], q:['howmany'], target:'midori', unit:'こ',
     req:'みどりの ものは いくつ あるかな？ どうやって わけたら わかりやすいか、かんがえてね。'},
    {client:'SEI2', title:'にんきの くだもの', set:{type:'choose', correct:'kind', kinds:['ringo','ichigo','banana']}, cards:10, flow:['kanten','wake','kazoe','kotae'], q:['most'],
     req:'いちばん にんきの くだものは どれ？ どうやって わけたら わかるかな？'}
  ]},
  2:{name:'ひょうに しよう', stages:[
    {client:'P6', title:'すきな あそび', set:{type:'kind', daizai:'asobi', n:3}, cards:10, flow:['wake','hyo','kotae'], q:['total','most'],
     req:'みんなの すきな あそびを ひょうに まとめて！ ぜんぶで なん人 いるかも しりたいな。'},
    {client:'SEI1', title:'すきな 花', set:{type:'kind', daizai:'hana', n:3}, cards:11, flow:['wake','hyo','kotae'], q:['most','total'],
     req:'はなやさんに たのまれたの。すきな 花を ひょうに して、いちばん にんきの 花を おしえて！'},
    {client:'P1', title:'のりもの しらべ', set:{type:'kind', daizai:'norimono', n:4}, cards:12, flow:['wake','hyo','kotae'], q:['total','howmany'],
     req:'がっこうの まえを とおった のりものを しらべたよ。ひょうに まとめてね。'},
    {client:'P2', title:'すきな きゅうしょく', set:{type:'kind', daizai:'kyushoku', n:4}, cards:13, flow:['wake','hyo','kotae'], q:['most','total'],
     req:'すきな きゅうしょくを ひょうに して！ いちばん にんきの メニューを しりたいの。'},
    {client:'P3', title:'すきな くだもの', set:{type:'kind', daizai:'kudamono', n:5, sonota:true}, cards:12, flow:['wake','hyo','kotae'], q:['sonota','most'],
     req:'すきな くだものを ひょうに して。1人しか いない ものは「その他」に まとめてね。'},
    {client:'P5', title:'かいたい どうぶつ', set:{type:'kind', daizai:'dobutsu', n:5, sonota:true}, cards:13, flow:['wake','hyo','kotae'], q:['sonota','total'],
     req:'かいたい どうぶつを ひょうに して。すくない ものは「その他」に まとめてね。'},
    {client:'P4', title:'こんげつの 天気', set:{type:'kind', daizai:'tenki', n:5, sonota:true}, cards:14, flow:['wake','hyo','kotae'], q:['most','sonota','total'],
     req:'こんげつの 天気を ひょうに して。すくない 天気は「その他」に まとめてね。'},
    {client:'SEI2', title:'すきな やさい', set:{type:'kind', daizai:'yasai', n:5, sonota:true}, cards:15, flow:['wake','hyo','kotae'], q:['total','most','sonota'],
     req:'すきな やさいを ひょうに して！ すくない ものは「その他」に まとめてね。'}
  ]},
  3:{name:'ぼうグラフに しよう', stages:[
    {client:'P3', title:'すきな くだもの', set:{type:'kind', daizai:'kudamono', n:4}, cards:12, flow:['wake','hyo','graph','kotae'], q:['most'],
     req:'すきな くだものを ぼうグラフに して！ ぼうの たかさで くらべたいの。'},
    {client:'SEI1', title:'すきな 花', set:{type:'kind', daizai:'hana', n:4}, cards:13, flow:['wake','hyo','graph','kotae'], q:['least'],
     req:'すきな 花を ぼうグラフに して。いちばん すくない 花は どれかな？'},
    {client:'P6', title:'すきな あそび', set:{type:'kind', daizai:'asobi', n:4}, cards:14, flow:['wake','hyo','order','graph','kotae'], q:['most','least'],
     req:'すきな あそびを ぼうグラフに して。おおい じゅんに ならべると みやすいよ。'},
    {client:'P1', title:'のりもの しらべ', set:{type:'kind', daizai:'norimono', n:4}, cards:15, flow:['wake','hyo','order','graph','title','kotae'], q:['most'],
     req:'のりものを ぼうグラフに して。おおい じゅんに ならべて、だいめいも つけてね。'},
    {client:'P2', title:'すきな きゅうしょく', set:{type:'kind', daizai:'kyushoku', n:5, sonota:true}, cards:16, flow:['wake','hyo','order','graph','title','kotae'], q:['most','least'],
     req:'すきな きゅうしょくを ぼうグラフに して。「その他」は いちばん さいごに おくのが きまりだよ。'},
    {client:'P5', title:'かいたい どうぶつ', set:{type:'kind', daizai:'dobutsu', n:5, sonota:true}, cards:17, flow:['wake','hyo','order','graph','title','kotae'], q:['least','most'],
     req:'かいたい どうぶつを ぼうグラフに して。おおい じゅんに、「その他」は さいごだよ。'},
    {client:'P4', title:'こんげつの 天気', set:{type:'kind', daizai:'tenki', n:5, sonota:true}, cards:18, flow:['wake','hyo','order','graph','title','kotae'], q:['most','least'], unit:'日',
     req:'こんげつの 天気を ぼうグラフに して。どんな 天気が おおかったか ひと目で わかるように してね。'},
    {client:'SEI2', title:'すきな やさい', set:{type:'kind', daizai:'yasai', n:5, sonota:true}, cards:20, flow:['wake','hyo','order','graph','title','kotae'], q:['most','least'],
     req:'さいごの グラフづくりだよ！ すきな やさいを、おおい じゅんの ぼうグラフに してね。'}
  ]},
  4:{name:'グラフを よもう', stages:[
    {client:'P6', title:'すきな あそび', set:{type:'data', daizai:'asobi', n:4, sum:[15,17]}, flow:['kotae'], q:['most','least','howmany'],
     req:'クラスで しらべた ぼうグラフだよ。よく みて、しつもんに こたえてね。'},
    {client:'P3', title:'すきな パンの ぐ', set:{type:'data', daizai:'kudamono', n:4, sum:[15,18]}, flow:['kotae'], q:['howmany','most','least'],
     req:'あたらしい パンに いれる くだものを きめたいの。グラフを よんで おしえて！'},
    {client:'SEI1', title:'すきな 花', set:{type:'data', daizai:'hana', n:4, sum:[16,19]}, flow:['kotae'], q:['diff','most','howmany'],
     req:'はなの グラフを みて。どの 花が どれだけ おおいか くらべてみよう。'},
    {client:'P1', title:'のりもの しらべ', set:{type:'data', daizai:'norimono', n:5, sum:[17,20]}, flow:['kotae'], q:['diff','least','diff'],
     req:'のりものの かずを グラフに したよ。ちがいを よみとってね。'},
    {client:'P2', title:'すきな きゅうしょく', set:{type:'data', daizai:'kyushoku', n:5, sum:[17,20]}, flow:['kotae'], q:['total','diff','most'],
     req:'きゅうしょくの グラフだよ。ぜんぶで なん人かも わかるかな？'},
    {client:'P5', title:'かいたい どうぶつ', set:{type:'data', daizai:'dobutsu', n:5, sum:[16,20]}, flow:['kotae'], q:['diff','total','howmany'],
     req:'どうぶつの グラフを みて、おしえて ほしいことが あるの。'},
    {client:'P4', title:'こんげつの 天気', set:{type:'data', daizai:'tenki', n:5, sum:[18,20]}, flow:['kotae'], q:['statement','diff','total'], unit:'日',
     req:'天気の グラフから わかる ことを えらんでね。'},
    {client:'SEI2', title:'すきな やさい', set:{type:'data', daizai:'yasai', n:5, sum:[18,20]}, flow:['kotae'], q:['statement','statement','diff'],
     req:'グラフから わかる ことは どれ？ ただしい ものを えらんでね。'}
  ]},
  5:{name:'チャレンジ', stages:[
    {client:'P6', title:'1めもりが 2の グラフ', set:{type:'data', daizai:'asobi', n:4, step:2, vmax:12, sum:[20,26]}, flow:['graph','kotae'], q:['most','howmany'], scale:2,
     req:'かずが おおいから、1めもりを 2人に した グラフを つくって！ ひょうを みてね。'},
    {client:'P3', title:'1めもりが 2の グラフ', set:{type:'data', daizai:'kudamono', n:4, step:2, vmax:14, sum:[22,30]}, flow:['graph','kotae'], q:['howmany','diff'], scale:2,
     req:'1めもりが 2の ぼうグラフだよ。ひょうの かずに あわせて つくってね。'},
    {client:'SEI1', title:'1めもりが 5の グラフ', set:{type:'data', daizai:'hana', n:4, step:5, vmax:25, sum:[40,60]}, flow:['kotae'], q:['howmany','most','diff'], scale:5,
     req:'がっこう ぜんたいで しらべた グラフだよ。1めもりは 5人。よく みてね。'},
    {client:'P4', title:'1めもりが 5の グラフ', set:{type:'data', daizai:'norimono', n:4, step:5, vmax:30, sum:[45,70]}, flow:['kotae'], q:['diff','howmany','least'], scale:5,
     req:'1しゅうかんの のりものの グラフだよ。1めもりが いくつか きを つけてね。'},
    {client:'P2', title:'2つの クラス', set:{type:'two', daizai:'kudamono', n:3, cell:[2,5]}, flow:['hyo2','kotae'], q:['cls_most','row_total'],
     req:'1くみと 2くみで すきな くだものを しらべたよ。ひとつの ひょうに まとめてね。'},
    {client:'P1', title:'2つの クラス', set:{type:'two', daizai:'asobi', n:3, cell:[2,6]}, flow:['hyo2','kotae'], q:['all_most','cls_total'],
     req:'2つの クラスの すきな あそびを、ひとつの ひょうに まとめて！'},
    {client:'P5', title:'2つの クラス', set:{type:'two', daizai:'dobutsu', n:3, cell:[2,6]}, flow:['hyo2','kotae'], q:['cls_most','all_most','row_total'],
     req:'かいたい どうぶつを クラスべつに しらべたよ。ひょうに まとめて くらべてね。'},
    {client:'SEI2', title:'2つの クラス', set:{type:'two', daizai:'kyushoku', n:3, cell:[3,6]}, flow:['hyo2','kotae'], q:['all_most','cls_most','cls_total'],
     req:'さいごの おねがい！ 2つの クラスの すきな きゅうしょくを ひょうに まとめて、くらべてね。'}
  ]}
};
const CLASSES = [['c1','1くみ'],['c2','2くみ']];
const TITLE_DECOY = ['すきな いろ しらべ','クラスの せの たかさ','きょうの じかんわり','あさの てんき'];

// ==============================
// 保存（端末の中だけ）。形を変えるときは項目を足すだけにする
// ==============================
let SAVE = {version:1, last:null, players:{}};
let canSave = true;
function loadSave(){
  try{
    const raw = localStorage.getItem(SETTEI.saveKey);
    if(raw){ const d = JSON.parse(raw); if(d && d.players) SAVE = d; }
  }catch(e){ canSave = false; }
  // あとから足した項目を、前の記録にも入れる
  Object.values(SAVE.players).forEach(p=>{
    if(p.partner===undefined) p.partner = null;
    if(p.yomiage===undefined) p.yomiage = false;
    if(!p.chiku) p.chiku = {opened:[1]};
    if(p.stopDan===undefined) p.stopDan = 0;            // 先生が止めた段階（③）
    if(!Array.isArray(p.settei)) p.settei = [];         // 読みこんだ せっていコードのID（③）
    if(!p.kaimono) p.kaimono = ['H01','R1'];          // おみせで かったもの（②-3）
    if(!p.house) p.house = {};
    if(!p.house.look) p.house.look = 'H01';
    if(!Array.isArray(p.house.garden)) p.house.garden = [];
    if(!p.house.room) p.house.room = {};
    if(!p.house.room.bg) p.house.room.bg = 'R1';
    if(!Array.isArray(p.house.room.items)) p.house.room.items = [];
  });
}
function writeSave(){
  try{ localStorage.setItem(SETTEI.saveKey, JSON.stringify(SAVE)); canSave = true; }catch(e){ canSave = false; }
}
function newPlayer(no, nick){
  return {
    no, nick, created: Date.now(),
    partner: null,               // えらんだ水晶の精
    yomiage: false,              // 読み上げ（使わない。前の記録との形をそろえるために残す）
    startDan: 1,                 // （使わない。前の記録との形をそろえるために残す）
    stopDan: 0,                  // 先生が止めた段階（0＝止めない）
    settei: [],                  // 読みこんだ せっていコードのID（コインを2回 足さないため）
    coins: 0,
    chiku: {opened:[1]},         // 開いた地区（＝段階）
    owned: [],                   // もらった建物のID
    placed: {},                  // 置いた場所 "地区-場所番号" → 建物ID
    cleared: {},                 // "段-ステージ" → クリア回数
    kaimono: ['H01','R1'],       // おみせで かったもの（さいしょから こやと ちいさな へや）
    house: {look:'H01', garden:[], room:{bg:'R1', items:[]}},  // 自分の家：garden と items は {id, x, y}（場面の中の%）
    log: []
  };
}
function me(){ return SAVE.players[SAVE.last]; }
function addLog(rec){
  const p = me(); if(!p) return;
  p.log.push(rec);
  if(p.log.length > SETTEI.logMax) p.log.splice(0, p.log.length - SETTEI.logMax);
}

// ==============================
// 小さな道具
// ==============================
const $app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const zen2han = s => String(s).replace(/[０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).trim();
const shuffle = a => { for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const rnd = n => Math.floor(Math.random()*n);
const sum = a => a.reduce((x,y)=>x+y,0);
const cardImg = f => `img/card/${f}.webp`;
const tateImg = id => `img/tatemono/${TATEMONO[id][1]}.webp`;
const seiImg = (id, kao='futsu') => `img/sei/${SEI[id].file}_${kao}.webp`;
const COIN = 'img/icon/I1_coin.webp';
function coinPill(){ return `<span class="pill"><img src="${COIN}" alt="">${me().coins}</span>`; }
function otherSei(){ const p = me(); return Object.keys(SEI).filter(k=>k!==p.partner); }
function clientInfo(code){
  if(code==='SEI1' || code==='SEI2'){ const id = otherSei()[code==='SEI1'?0:1]; return {name:SEI[id].name, img:seiImg(id,'futsu')}; }
  return {name:HITO[code][0], img:`img/hito/${HITO[code][1]}.webp`};
}
function speak(text){ /* このアプリでは読み上げを使わない（2026-11-03 決定） */ }

// ニックネームは自分で打たず、ことばの組み合わせから選ぶ（実名が入らないように）
const NA_MAE = ['ふわふわ','きらきら','ぴかぴか','にこにこ','ぽかぽか','すいすい','わくわく','のんびり','ころころ','ぴょんぴょん','もくもく','ほかほか'];
const NA_ATO = ['うさぎ','りす','こぐま','ひよこ','いるか','ぺんぎん','かめ','こねこ','こいぬ','ことり','くじら','たぬき','ぱんだ','らっこ'];
function randomNick(not){
  const used = new Set(Object.values(SAVE.players).map(p=>p.nick).concat(not?[not]:[]));
  for(let t=0;t<50;t++){ const n = NA_MAE[rnd(NA_MAE.length)] + NA_ATO[rnd(NA_ATO.length)]; if(!used.has(n)) return n; }
  return NA_MAE[rnd(NA_MAE.length)] + NA_ATO[rnd(NA_ATO.length)];
}

// ドラッグの共通のしくみ（マウスでも指でも）
function makeDraggable(el, targetSel, onDrop, onTap, onStart){
  el.addEventListener('pointerdown', e=>{
    if(e.button>0) return;
    e.preventDefault();
    const sx=e.clientX, sy=e.clientY, r=el.getBoundingClientRect();
    let ghost=null, over=null;
    const findTarget = (x,y)=>{ const t=document.elementFromPoint(x,y); return t ? t.closest(targetSel) : null; };
    const move = ev=>{
      if(!ghost && Math.hypot(ev.clientX-sx, ev.clientY-sy) > 8){
        ghost = el.cloneNode(true); ghost.classList.add('ghost'); ghost.classList.remove('sel','glow');
        Object.assign(ghost.style,{width:r.width+'px',height:r.height+'px',position:'fixed',zIndex:50,pointerEvents:'none',margin:0});
        document.body.appendChild(ghost); el.style.opacity=.3; if(onStart) onStart();
      }
      if(ghost){
        ghost.style.left=(ev.clientX-r.width/2)+'px'; ghost.style.top=(ev.clientY-r.height/2)+'px';
        const t = findTarget(ev.clientX, ev.clientY);
        if(t!==over){ if(over) over.classList.remove('over'); over=t; if(over) over.classList.add('over'); }
      }
    };
    const stop = ()=>{ window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', cancel); if(over) over.classList.remove('over'); };
    const up = ev=>{ stop();
      if(ghost){ ghost.remove(); el.style.opacity=''; onDrop(findTarget(ev.clientX, ev.clientY), ev); }
      else onTap(); };
    const cancel = ()=>{ stop(); if(ghost){ ghost.remove(); el.style.opacity=''; onDrop(null); } };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', cancel);
  });
}

// ==============================
// 画面：はじめ
// ==============================
let draftNick = null;
let draftNo = '';
function showTitle(err=''){
  const list = Object.values(SAVE.players).filter(p=>!p.teacher).sort((a,b)=>a.no-b.no);
  if(!draftNick) draftNick = randomNick();
  const notice = setteiNotice; setteiNotice = null;
  $app.innerHTML = `
  <div class="title-bg" style="background-image:url('${CHIKU[0].bg}')"></div>
  <div class="title-top"><button class="pill" id="settei">せっていを いれる</button><button class="pill" id="sensei">せんせい</button></div>
  <div class="title-wrap"><div class="title-card">
    <div class="logo">かぞえて<span>タウン</span><small>かぞえて、くらべて、まちを そだてよう</small></div>
    <div class="title-sei">${Object.keys(SEI).map((id,i)=>`<img src="${seiImg(id, i===1?'ureshii':'futsu')}" alt="${SEI[id].name}">`).join('')}</div>
    ${notice ? `<div class="panel notice"><b>せっていを いれました</b>${notice.map(x=>`<div>${esc(x)}</div>`).join('')}</div>` : ''}
    ${list.length ? `<div class="panel"><h3 style="margin-bottom:8px">つづきから</h3><div class="who-list">
      ${list.map(p=>`<button data-who="${p.no}">${p.no}ばん ${esc(p.nick)}</button>`).join('')}</div></div>` : ''}
    <div class="panel" style="display:flex;flex-direction:column;gap:12px">
      <h3>はじめて あそぶ</h3>
      <label class="field">しゅっせき ばんごう<input id="in-no" inputmode="numeric" maxlength="3" placeholder="れい：5" value="${esc(draftNo)}"></label>
      <div class="field">ニックネーム
        <div class="bar"><span class="pill" style="font-size:1.3rem" id="nick">${esc(draftNick)}</span>
        <button class="btn sub small" id="reroll">ほかの なまえ</button></div></div>
      <div class="err">${esc(err)}</div>
      <button class="btn" id="go">はじめる</button>
    </div>
    ${canSave ? '' : '<p class="sub-msg">この たんまつでは きろくを ほぞん できません。あそぶことは できます。</p>'}
  </div></div>`;
  $app.querySelector('#settei').onclick = showSetteiInput;
  $app.querySelector('#sensei').onclick = ()=>showTeacherLogin();
  $app.querySelectorAll('[data-who]').forEach(b=>b.onclick=()=>{ SAVE.last = b.dataset.who; writeSave(); curChiku = Math.max(...me().chiku.opened); me().partner ? showTown() : showPartner(true); });
  $app.querySelector('#reroll').onclick = ()=>{ draftNo = $app.querySelector('#in-no').value; draftNick = randomNick(draftNick); showTitle(); };
  $app.querySelector('#go').onclick = ()=>{
    draftNo = $app.querySelector('#in-no').value;
    const no = parseInt(zen2han(draftNo),10);
    if(!(no>=1 && no<=99)) return showTitle('ばんごうは 1から99で いれてね');
    if(SAVE.players[no]) return showTitle(`${no}ばんは もう あるよ。「つづきから」を えらんでね`);
    SAVE.players[no] = newPlayer(no, draftNick); SAVE.last = String(no);
    draftNick = null; draftNo = ''; curChiku = 1; writeSave(); showPartner(true);
  };
}

// ==============================
// 画面：パートナーえらび
// ==============================
function showPartner(first){
  const p = me(); let sel = p.partner;
  const draw = ()=>{
    $app.innerHTML = `<div class="title-wrap"><div class="title-card" style="width:min(720px,100%)"><div class="panel" style="display:flex;flex-direction:column;gap:14px">
      <h2 style="text-align:center">いっしょに まちを まわる パートナーを えらんでね</h2>
      <div class="sei-pick">${Object.entries(SEI).map(([id,s])=>`<button data-sei="${id}" class="${sel===id?'sel':''}">
        <img src="${seiImg(id, sel===id?'ureshii':'futsu')}" alt="">${s.name}<small>${s.kotoba}</small></button>`).join('')}</div>
      <p class="sub-msg">えらばなかった 2人は、まちで おねがいを してくるよ。あとから かえられるよ</p>
      <div class="bar" style="justify-content:center">
        ${first ? '' : '<button class="btn sub" id="cancel">かえない</button>'}
        <button class="btn" id="ok" ${sel?'':'disabled'}>この こに する</button></div>
    </div></div></div>`;
    $app.querySelectorAll('[data-sei]').forEach(b=>b.onclick=()=>{ sel=b.dataset.sei; draw(); });
    $app.querySelector('#ok').onclick=()=>{ p.partner=sel; writeSave(); showTown(); };
    const c=$app.querySelector('#cancel'); if(c) c.onclick=showTown;
  };
  draw();
}

// ニックネームをかえる
function showRename(cand){
  const p = me();
  $app.innerHTML = `<div class="title-wrap"><div class="title-card"><div class="panel" style="display:flex;flex-direction:column;gap:14px;align-items:center">
    <h2>ニックネームを かえる</h2>
    <p class="sub-msg">いまの なまえ：${esc(p.nick)}</p>
    <span class="pill" style="font-size:1.6rem;padding:10px 22px">${esc(cand)}</span>
    <div class="bar" style="justify-content:center">
      <button class="btn sub" id="re">ほかの なまえ</button>
      <button class="btn" id="ok">これに する</button></div>
    <button class="btn sub" id="cancel">かえない</button>
  </div></div></div>`;
  $app.querySelector('#re').onclick = ()=>showRename(randomNick(cand));
  $app.querySelector('#ok').onclick = ()=>{ p.nick = cand; writeSave(); showTown(); };
  $app.querySelector('#cancel').onclick = showTown;
}

// ==============================
// 画面：まち（地区を切りかえて、建物を置く）
// ==============================
let curChiku = 1;
let pickId = null, pickFrom = null;
function chikuTabs(onPick, cur, label){
  const p = me();
  return `<div class="tabs">${CHIKU.map(c=>{ const open = p.chiku.opened.includes(c.no);
    return `<button data-tab="${c.no}" class="${cur===c.no?'on':''}" ${open?'':'disabled'}>${open ? (label?label(c):c.name) : '？'}</button>`; }).join('')}</div>`;
}
function showTown(){
  const p = me(); const c = CHIKU[curChiku-1];
  const placedIds = Object.values(p.placed);
  const free = p.owned.filter(id => !placedIds.includes(id) && c.reward.includes(id));
  const placing = !!pickId;
  $app.innerHTML = `
  <div class="bar"><h2>${esc(c.name)}</h2><span class="sp"></span>${coinPill()}
    <button class="partner-btn" id="partner" aria-label="パートナーを かえる"><img src="${seiImg(p.partner)}" alt="">${SEI[p.partner].name}</button>
    <button class="pill" id="rename" aria-label="ニックネームを かえる">${p.no}ばん ${esc(p.nick)} ✎</button>
    <button class="btn sub" id="bye">おわる</button></div>
  <div class="bar town-go"><button class="btn sub" id="shop"><img src="img/icon/I3_fukuro.webp" alt="">おみせ</button>
    <button class="btn sub" id="home"><img src="${shinaImg(p.house.look)}" alt="">わたしの いえ</button><span class="sp"></span>${p.teacher?'<span class="pill">せんせいの おためし</span>':'<button class="btn sub small" id="miseru">せんせいに みせる</button>'}<button class="btn" id="play">あそぶ</button></div>
  ${chikuTabs(null, curChiku)}
  <div class="town-wrap">
    <div class="town ${placing?'placing':''}" style="background-image:url('${c.bg}')">
      ${c.slots.map((s,i)=>{ const id = p.placed[`${c.no}-${i}`];
        return `<button class="slot ${id?'':'empty'} ${pickFrom===i?'pick':''}" data-slot="${i}" style="left:${s[0]}%;top:${s[1]}%" aria-label="${id?TATEMONO[id][0]:'あいている ばしょ'}">${id?`<img src="${tateImg(id)}" alt="">`:''}</button>`;}).join('')}
    </div>
    <div class="msg">${placing ? 'ひかっている ばしょを タップして おこう' : (free.length ? 'したの たてものを、まちに ドラッグするか タップして おこう' : '')}</div>
    <div class="tray">${free.length ? free.map(id=>`<button data-own="${id}" class="${pickId===id&&pickFrom===null?'sel':''}" aria-label="${TATEMONO[id][0]}"><img src="${tateImg(id)}" alt=""></button>`).join('')
      : '<span class="none">おねがいを かなえると たてものが もらえるよ</span>'}</div>
  </div>`;
  $app.querySelector('#bye').onclick = ()=>{ pickId=null; pickFrom=null; showTitle(); };
  $app.querySelector('#play').onclick = ()=>{ pickId=null; pickFrom=null; showStages(curChiku); };
  const ms = $app.querySelector('#miseru'); if(ms) ms.onclick = showMiseru;
  $app.querySelector('#shop').onclick = ()=>{ pickId=null; pickFrom=null; showShop(); };
  $app.querySelector('#home').onclick = ()=>{ pickId=null; pickFrom=null; showHouse(); };
  $app.querySelector('#rename').onclick = ()=>showRename(randomNick(p.nick));
  $app.querySelector('#partner').onclick = ()=>showPartner(false);
  $app.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{ curChiku=+b.dataset.tab; pickId=null; pickFrom=null; showTown(); });
  const town = $app.querySelector('.town');
  $app.querySelectorAll('[data-own]').forEach(b=>makeDraggable(b, '.slot.empty',
    sl=>{ town.classList.remove('placing');
      if(sl){ p.placed[`${c.no}-${sl.dataset.slot}`] = b.dataset.own; pickId=null; pickFrom=null; writeSave(); }
      showTown(); },
    ()=>{ pickFrom=null; pickId = (pickId===b.dataset.own) ? null : b.dataset.own; showTown(); },
    ()=>town.classList.add('placing')));
  $app.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{
    const i = +b.dataset.slot, key = `${c.no}-${i}`, here = p.placed[key];
    if(pickId && !here){
      if(pickFrom!==null) delete p.placed[`${c.no}-${pickFrom}`];
      p.placed[key] = pickId; pickId=null; pickFrom=null; writeSave(); showTown();
    }else if(here){
      if(pickFrom===i){ pickId=null; pickFrom=null; } else { pickId=here; pickFrom=i; }
      showTown();
    }
  });
}

// ==============================
// 画面：ステージえらび
// ==============================
function stageOpen(dan, s){
  const p=me();
  if(p.teacher) return true;                       // 先生の おためしは ぜんぶ ひらく
  if(!p.chiku.opened.includes(dan) || !danAllowed(p, dan)) return false;
  return s===1 || (p.cleared[`${dan}-${s-1}`]||0)>0;
}
function showStages(dan){
  const p = me(); const c = CHIKU[dan-1]; const D = DAN[dan];
  $app.innerHTML = `
  <div class="bar"><button class="btn sub" id="back">← まちへ</button><h2>だい${dan}だん　${esc(D.name)}</h2><span class="sp"></span>${coinPill()}</div>
  ${chikuTabs(null, dan, cc=>`だい${cc.no}だん`)}
  <div class="stages">
    ${D.stages.map((st,k)=>{ const s=k+1, open=stageOpen(dan,s), done=(p.cleared[`${dan}-${s}`]||0)>0, cl=clientInfo(st.client);
      return `<button class="stage ${open?'':'lock'} ${done?'done':''}" data-s="${s}" ${open?'':'disabled'}>
        <span class="who"><img src="${cl.img}" alt=""><img class="b" src="${tateImg(c.reward[k])}" alt=""></span>
        ${s}. ${esc(st.title)}<span class="st">${done?'かなえた！':(open?esc(cl.name)+'の おねがい':'まだ あかない')}</span></button>`;}).join('')}
  </div>
  ${danAllowed(p, dan) ? '' : '<p class="newchiku" style="text-align:center">ここは せんせいと いっしょに ひらこう</p>'}
  <p class="sub-msg">おねがいを かなえると、えの たてものが もらえるよ。8つ かなえると つぎの まちが ひらくよ</p>`;
  $app.querySelector('#back').onclick = ()=>{ curChiku=dan; showTown(); };
  $app.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>showStages(+b.dataset.tab));
  $app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>startStage(dan, +b.dataset.s));
}

// ==============================
// ステージ：問題のデータを作る
// ==============================
let G = null;
function makeCounts(total, n, opt={}){
  // グループごとの数。opt.unique＝全部ちがう数 / opt.max＝1つの上限 / 最大はいつも1つだけ
  const mx = opt.max||8;
  for(let t=0;t<800;t++){
    const a = Array(n).fill(opt.min||1); let r = total - sum(a); if(r<0) break;
    for(;r>0;r--) a[rnd(n)]++;
    if(Math.max(...a)>mx) continue;
    const big = Math.max(...a), small = Math.min(...a);
    if(a.filter(v=>v===big).length!==1) continue;
    if(opt.uniqueMin && a.filter(v=>v===small).length!==1) continue;
    if(opt.unique && new Set(a).size!==n) continue;
    return a;
  }
  return null;
}
function pickKinds(st){
  const s = st.set;
  const pool = s.kinds || s.pick || DAIZAI[s.daizai].kinds.map(k=>k[0]);
  return s.kinds ? pool.slice() : shuffle(pool.slice()).slice(0, s.n);
}
function buildData(dan, st){
  const s = st.set; let cards=[], kinds=[], colors=[], vals=null, groupsKind=null, two=null;
  if(s.type==='kind' || (s.type==='choose' && s.correct==='kind')){
    kinds = pickKinds(st);
    let cnt;
    const needOrder = st.flow.includes('order');
    if(s.sonota){
      // 多いもの3つ（ちがう数・3以上）＋1〜2の少ないもの2つ（その他になる）
      for(let t=0;t<500;t++){
        const small=[1+rnd(2),1]; const main = makeCounts(st.cards - sum(small), 3, {min:3, max:8, unique:needOrder, uniqueMin:st.q.includes('least')});
        if(main){ cnt = main.concat(small); break; }
      }
      if(!cnt) cnt = [Math.max(3,st.cards-9), 4, 3, 1, 1];
    }else{
      cnt = makeCounts(st.cards, kinds.length, {max: dan===1?6:8, unique: needOrder || st.q.includes('least'), uniqueMin: st.q.includes('least')});
    }
    kinds.forEach((k,i)=>{ for(let j=0;j<cnt[i];j++) cards.push({kind:k}); });
    colors = [...new Set(kinds.map(k=>KIND[k][3]).filter(Boolean))];
    G.sonotaKinds = s.sonota ? kinds.slice(3) : [];
  }else if(s.type==='color' || s.type==='choose'){
    colors = s.colors.slice();
    const cnt = makeCounts(st.cards, colors.length, {max:6});
    colors.forEach((c,i)=>{ for(let j=0;j<cnt[i];j++){ const ks=IRO_KINDS[c]; cards.push({kind: ks[rnd(ks.length)]}); } });
    kinds = [...new Set(cards.map(c=>c.kind))];
  }else if(s.type==='data'){
    kinds = pickKinds(st);
    const step = s.step||1;
    for(let t=0;t<2000;t++){
      const a = kinds.map(()=> step*(1+rnd(Math.floor((s.vmax||10)/step))));
      const tot = sum(a);
      if(tot<s.sum[0] || tot>s.sum[1]) continue;
      if(new Set(a).size!==a.length) continue;
      vals = a; break;
    }
    if(!vals) vals = kinds.map((_,i)=>step*(i+1));
  }else if(s.type==='two'){
    kinds = pickKinds(st);
    for(let t=0;t<2000;t++){
      const m = kinds.map(()=>CLASSES.map(()=> s.cell[0]+rnd(s.cell[1]-s.cell[0]+1)));
      const c1 = m.map(r=>r[0]), c2 = m.map(r=>r[1]), rt = m.map(r=>r[0]+r[1]);
      const uniqMax = a=>a.filter(v=>v===Math.max(...a)).length===1;
      if(!uniqMax(c1) || !uniqMax(c2) || !uniqMax(rt)) continue;
      if(sum(c1)===sum(c2)) continue;
      two = m; break;
    }
    kinds.forEach((k,i)=>CLASSES.forEach((c,j)=>{ for(let x=0;x<two[i][j];x++) cards.push({kind:k, cls:c[0]}); }));
  }
  cards = shuffle(cards).map((c,i)=>({uid:'c'+i, kind:c.kind, color:KIND[c.kind][3], cls:c.cls}));
  Object.assign(G, {cards, kinds, colors, dataVals:vals, two});
}

// ==============================
// ステージのはじまり
// ==============================
function startStage(dan, s){
  const st = DAN[dan].stages[s-1];
  G = { dan, s, st, unit: st.unit || (st.set.daizai ? DAIZAI[st.set.daizai].unit : 'こ'),
        placed:{}, sel:null, glow:null, mark:false, marks:{}, flowIdx:0, t0:Date.now(), pkao:'futsu', pline:'',
        rec:{t:Date.now(), dan, stage:s, client:st.client, q:st.q.join('+'), kantenMiss:0, sortMiss:0, countUnder:0, countOver:0,
             tableMiss:0, orderMiss:0, graphMiss:0, titleMiss:0, help:{1:0,2:0,3:0}, helpFirstSec:null, qs:[]} };
  buildData(dan, st);
  G.kanten = st.set.type==='choose' ? null : (st.set.type==='color' ? 'color' : 'kind');
  if(st.set.type==='data'){
    G.groups = G.kinds.map(k=>({key:k, label:KIND[k][1], img:KIND[k][2]}));
    G.vals = {}; G.groups.forEach((g,i)=>G.vals[g.key]=G.dataVals[i]);
    G.hyoVals = Object.assign({}, G.vals); G.hyoDone = true; G.hyoTotal = sum(G.dataVals);
    G.colOrder = G.groups.map(g=>g.key);
    if(!st.flow.includes('graph')){ G.graph = Object.assign({}, G.vals); G.graphDone = true; G.titleText = st.title; }
  }else if(st.set.type==='two'){
    G.groups = G.kinds.map(k=>({key:k, label:KIND[k][1], img:KIND[k][2]}));
  }else if(G.kanten){
    G.groups = groupsFor(G.kanten);
  }
  if(G.groups && G.kanten) G.groups.forEach(g=>G.placed[g.key]=[]);
  // 「たりる？」の問題：ねらう種類と、いる数
  if(st.q.includes('enough')){
    const gk = G.kinds[rnd(G.kinds.length)]; const have = G.cards.filter(c=>c.kind===gk).length;
    G.target = gk; G.need = Math.max(1, have + [-1,0,1,1][rnd(4)]);
  }
  if(st.target) G.target = st.target;
  G.reqText = st.req.replace('{T}', G.target ? (IRO[G.target]?IRO[G.target][0]:KIND[G.target][1]) : '').replace('{N}', G.need||'');
  G.phase = st.flow[0];
  enterPhase();
}
function groupsFor(kanten){
  if(kanten==='color') return G.colors.map(c=>({key:c, label:IRO[c][0], iro:IRO[c][1]}));
  return G.kinds.map(k=>({key:k, label:KIND[k][1], img:KIND[k][2]}));
}
function groupOf(card){ return G.kanten==='color' ? card.color : card.kind; }
function gInfo(key){ return (G.rows||G.groups).find(g=>g.key===key) || G.groups.find(g=>g.key===key); }
function gLabel(g){ return g.img ? `<img src="${cardImg(g.img)}" alt="">${esc(g.label)}` : (g.iro ? `<span class="iro" style="background:${g.iro}"></span>${esc(g.label)}` : esc(g.label)); }
function countOf(key){ return G.vals ? G.vals[key] : G.placed[key].length; }

// 次の場面へ
function nextPhase(){
  G.flowIdx++; G.phase = G.st.flow[G.flowIdx]; G.pkao='futsu'; G.pline=''; G.mark=false; G.glow=null;
  enterPhase();
}
function enterPhase(){
  const ph = G.phase;
  if(ph==='kazoe'){ G.countIdx=0; }
  if(ph==='hyo'){
    // 表の行：その他があるときは、少ないものをまとめた行をつくる
    G.vals = {}; G.groups.forEach(g=>G.vals[g.key]=G.placed[g.key].length);
    if(G.sonotaKinds && G.sonotaKinds.length){
      const main = G.groups.filter(g=>!G.sonotaKinds.includes(g.key));
      G.rows = main.concat([{key:'sonota', label:'その他'}]);
      G.vals.sonota = sum(G.sonotaKinds.map(k=>G.vals[k]));
    }else G.rows = G.groups.slice();
    G.hyoVals = {}; G.hyoIdx = 0; G.hyoTotal = null;
  }
  if(ph==='hyo2'){
    G.cells = []; G.kinds.forEach((k,i)=>CLASSES.forEach((c,j)=>G.cells.push({k, c:c[0], j, v:G.two[i][j]})));
    G.kinds.forEach((k,i)=>G.cells.push({k, c:'tot', v:G.two[i][0]+G.two[i][1]}));
    G.cellVals = {}; G.cellIdx = 0;
  }
  if(ph==='order'){ G.orderList = []; }
  if(ph==='graph'){
    const rows = G.rows || G.groups;
    if(!G.colOrder) G.colOrder = rows.map(g=>g.key);
    G.graph = {}; G.colOrder.forEach(k=>G.graph[k]=0); G.badCols = [];
    if(!G.vals) G.vals = Object.assign({}, G.hyoVals);
  }
  if(ph==='title'){ G.titleOpts = shuffle([G.st.title+' しらべ'].concat(shuffle(TITLE_DECOY.slice()).slice(0,2))); }
  if(ph==='kotae'){ G.qs = G.st.q.map(makeQuestion); G.qIdx = 0; G.qStart = Date.now(); G.qTried = false; }
  showPlay();
}

// ==============================
// 問いをつくる
// ==============================
function mainRows(){ return (G.rows || G.groups).filter(g=>g.key!=='sonota'); }
function makeQuestion(type){
  const rows = mainRows(); const v = k=>G.vals[k]; const U = G.unit;
  const name = k=>gInfo(k).label;
  const allRows = G.rows || G.groups;
  if(type==='most'){ const k = rows.reduce((a,b)=>v(a.key)>=v(b.key)?a:b).key; return {type, text:'いちばん おおいのは どれ？', kind:'choice', opts:rows.map(g=>g.key), ans:k}; }
  if(type==='least'){ const k = rows.reduce((a,b)=>v(a.key)<=v(b.key)?a:b).key; return {type, text:'いちばん すくないのは どれ？', kind:'choice', opts:rows.map(g=>g.key), ans:k}; }
  if(type==='enough'){ const have=G.placed[G.target].length; return {type, text:`${KIND[G.target][1]}は ${G.need}${U} いるよ。たりる？`, kind:'yesno', ans: have>=G.need?'yes':'no'}; }
  if(type==='howmany'){ const k = G.target || rows[rnd(rows.length)].key; return {type, text:`${name(k)}は なん${U}？`.replace('なんこ','いくつ'), kind:'pad', ans:v(k), target:k}; }
  if(type==='total'){ return {type, text:`ぜんぶで なん${U}？`.replace('なんこ','いくつ'), kind:'pad', ans:sum(allRows.map(g=>v(g.key)))}; }
  if(type==='sonota'){ return {type, text:`「その他」は なん${U}？`.replace('なんこ','いくつ'), kind:'pad', ans:v('sonota')}; }
  if(type==='diff'){
    const s = shuffle(rows.slice()).slice(0,2).sort((a,b)=>v(b.key)-v(a.key));
    return {type, text:`${name(s[0].key)}は ${name(s[1].key)}より なん${U} おおい？`.replace('なんこ','いくつ'), kind:'pad', ans:v(s[0].key)-v(s[1].key), pair:[s[0].key,s[1].key]};
  }
  if(type==='statement'){
    const mx = rows.reduce((a,b)=>v(a.key)>=v(b.key)?a:b).key;
    const notMx = rows.filter(g=>g.key!==mx)[rnd(rows.length-1)].key;
    const s = shuffle(rows.slice()).slice(0,2).sort((a,b)=>v(b.key)-v(a.key)); const d = v(s[0].key)-v(s[1].key);
    const tot = sum(allRows.map(g=>v(g.key)));
    const cands = [
      [`${name(mx)}が いちばん おおい`, true], [`${name(notMx)}が いちばん おおい`, false],
      [`${name(s[0].key)}は ${name(s[1].key)}より ${d}${U} おおい`, true], [`${name(s[0].key)}は ${name(s[1].key)}より ${d+2}${U} おおい`, false],
      [`ぜんぶで ${tot}${U}`, true], [`ぜんぶで ${tot+3}${U}`, false]
    ];
    const t = rnd(3); const pickTrue = cands[t*2]; const falses = [0,1,2].filter(i=>i!==t).map(i=>cands[i*2+1]);
    const opts = shuffle([pickTrue].concat(falses));
    return {type, text:'グラフから わかる ことで、ただしいのは どれ？', kind:'text', opts:opts.map(o=>o[0]), ans:pickTrue[0]};
  }
  // 2つのクラス
  const ki = k=>G.kinds.indexOf(k);
  if(type==='cls_most'){ const j = rnd(2); const col = G.kinds.map(k=>G.two[ki(k)][j]); const k = G.kinds[col.indexOf(Math.max(...col))];
    return {type, text:`${CLASSES[j][1]}で いちばん おおいのは どれ？`, kind:'choice', opts:G.kinds.slice(), ans:k}; }
  if(type==='all_most'){ const rt = G.kinds.map(k=>sum(G.two[ki(k)])); const k = G.kinds[rt.indexOf(Math.max(...rt))];
    return {type, text:'2つの クラス あわせて いちばん おおいのは どれ？', kind:'choice', opts:G.kinds.slice(), ans:k}; }
  if(type==='row_total'){ const k = G.kinds[rnd(G.kinds.length)];
    return {type, text:`${KIND[k][1]}は 2つの クラス あわせて なん${U}？`.replace('なんこ','いくつ'), kind:'pad', ans:sum(G.two[ki(k)])}; }
  if(type==='cls_total'){ const j = rnd(2);
    return {type, text:`${CLASSES[j][1]}は ぜんぶで なん${U}？`.replace('なんこ','いくつ'), kind:'pad', ans:sum(G.two.map(r=>r[j]))}; }
}

// ==============================
// 画面のパーツ
// ==============================
function stepBar(){ const n = G.st.flow.length; return `<div class="step">${G.st.flow.map((_,i)=>`<i class="${i<=G.flowIdx?'on':''}"></i>`).join('')}</div>`; }
function partnerHtml(){
  const p = me();
  return `<div class="partner"><img id="pimg" src="${seiImg(p.partner,G.pkao)}" alt="${SEI[p.partner].name}">
    <div class="p-line" id="pline">${esc(G.pline)}</div><button class="btn sub hint" id="hint">ヒント</button></div>`;
}
function iraiHtml(){
  const cl = clientInfo(G.st.client);
  let txt = esc(G.reqText);
  if(G.target && KIND[G.target]) txt = txt.replace(esc(KIND[G.target][1]), `<span class="need"><img src="${cardImg(KIND[G.target][2])}" alt="">${esc(KIND[G.target][1])}</span>`);
  return `<div class="irai"><img class="client" src="${cl.img}" alt="${esc(cl.name)}">
    <div class="fukidashi"><b>${esc(cl.name)}</b><br>${txt}</div>${partnerHtml()}</div>`;
}
function boxHtml(g, cls='', num=null, markable=false){
  const items = G.placed[g.key].map(uid=>{ const c=G.cards.find(x=>x.uid===uid); const mk=(G.marks[g.key]||[]).indexOf(uid);
    return `<button class="m" data-m="${uid}" data-g="${g.key}" tabindex="-1"><img src="${cardImg(KIND[c.kind][2])}" alt="">${mk>=0?`<b>${mk+1}</b>`:''}</button>`; }).join('');
  return `<div class="box ${cls}" data-box="${g.key}" role="button" tabindex="0"><h3>${gLabel(g)}</h3><div class="in">${items}</div>${num!==null?`<div class="num">${num}</div>`:''}</div>`;
}
function padHtml(max, attr){
  const n = Math.max(10, Math.ceil(max/10)*10);
  return `<div class="pad ${n>10?'wide':''}">${Array.from({length:n},(_,i)=>`<button data-${attr}="${i+1}">${i+1}</button>`).join('')}</div>`;
}
// 表（1つの観点）
function hyoHtml(active){
  const rows = G.rows || G.groups;
  const filled = k => G.hyoVals[k]!==undefined;
  const tot = G.hyoTotal;
  return `<div class="wrap-x"><table class="hyo"><caption>${esc(G.titleText || G.st.title)}</caption>
    <tr><th>しゅるい</th><th>${esc(G.unit==='こ'?'かず':'にんずう')}<span class="unit">（${esc(G.unit)}）</span></th></tr>
    ${rows.map((g,i)=>`<tr><th><span class="lab">${gLabel(g)}</span></th><td class="${active&&i===G.hyoIdx?'on':''} ${filled(g.key)?'ok':''}">${filled(g.key)?G.hyoVals[g.key]:''}</td></tr>`).join('')}
    ${G.st.flow.includes('hyo') || G.st.set.type==='data' ? `<tr class="total"><th>ごうけい</th><td class="${active&&G.hyoIdx===rows.length?'on':''} ${tot!==null&&tot!==undefined?'ok':''}">${tot!==null&&tot!==undefined?tot:''}</td></tr>` : ''}
  </table></div>`;
}
// 2つのクラスの表
function hyo2Html(active){
  return `<div class="wrap-x"><table class="hyo"><caption>${esc(G.st.title)}（${esc(G.unit)}）</caption>
    <tr><th>しゅるい</th>${CLASSES.map(c=>`<th>${c[1]}</th>`).join('')}<th>ごうけい</th></tr>
    ${G.kinds.map(k=>`<tr><th><span class="lab"><img src="${cardImg(KIND[k][2])}" alt="">${esc(KIND[k][1])}</span></th>
      ${CLASSES.map(c=>c[0]).concat(['tot']).map(c=>{ const idx = G.cells.findIndex(x=>x.k===k&&x.c===c); const v = G.cellVals[idx];
        return `<td class="${active&&idx===G.cellIdx?'on':''} ${v!==undefined?'ok':''}">${v!==undefined?v:''}</td>`; }).join('')}</tr>`).join('')}
  </table></div>`;
}
// ぼうグラフ
function graphHtml(edit){
  const rows = G.rows || G.groups;
  const order = G.colOrder || rows.map(g=>g.key);
  const sc = G.st.scale || 1;
  const vmax = Math.max(...order.map(k=>G.vals[k]));
  const nRows = Math.max(5, Math.ceil(vmax/sc/5)*5);
  const u = nRows>10 ? 20 : 26;
  const vals = G.graph || G.vals;
  return `<div class="graph" style="--u:${u}px;--rows:${nRows}">
    <div class="gt ${G.titleText?'':'empty'}">${G.titleText ? esc(G.titleText) : '（だいめい）'}</div>
    <div class="ggrid">
      <div class="yaxis" style="height:calc(${u}px * ${nRows})"><span class="yu">（${esc(G.unit)}）</span>
        ${Array.from({length:nRows},(_,i)=>`<span>${nRows<=10 || (i+1)%2===0 ? (i+1)*sc : ''}</span>`).join('')}</div>
      <div class="plot">${order.map(k=>{ const n = Math.round(vals[k]/sc);
        return `<button class="col ${edit?'can':''} ${(G.badCols||[]).includes(k)?'bad':''}" data-col="${k}" ${edit?'':'tabindex="-1"'} aria-label="${esc(gInfo(k).label)}">${'<i class="blk"></i>'.repeat(n)}</button>`; }).join('')}</div>
      <div></div>
      <div class="xlabels">${order.map(k=>`<div>${gInfo(k).img?`<img src="${cardImg(gInfo(k).img)}" alt="">`:''}${esc(gInfo(k).label)}</div>`).join('')}</div>
      ${edit?`<div></div><div class="minus">${order.map(k=>`<button data-minus="${k}" aria-label="${esc(gInfo(k).label)}を へらす">−</button>`).join('')}</div>`:''}
    </div>
  </div>`;
}

// ==============================
// あそぶ画面
// ==============================
function showPlay(){
  const {st, phase} = G;
  const head = `<div class="bar"><button class="btn sub" id="quit">やめる</button><h2>${esc(st.title)}</h2><span class="sp"></span>${stepBar()}</div>`;
  let body = '';
  if(phase==='kanten'){
    body = `<div class="msg" id="msg">どうやって わけたら いいかな？</div>
      <div class="cards">${G.cards.map(c=>`<div class="card"><img src="${cardImg(KIND[c.kind][2])}" alt=""><span>${KIND[c.kind][1]}</span></div>`).join('')}</div>
      <div class="choices"><button data-kanten="kind"><img src="${cardImg(KIND[G.kinds[0]][2])}" alt="">しゅるいで わける</button>
        <button data-kanten="color"><span class="iro" style="background:conic-gradient(${IRO.aka[1]} 0 33%,${IRO.kiiro[1]} 0 66%,${IRO.midori[1]} 0)"></span>いろで わける</button></div>`;
  }else if(phase==='wake'){
    const used = Object.values(G.placed).flat();
    const left = G.cards.filter(c=>!used.includes(c.uid));
    body = `<div class="msg" id="msg">カードを おなじ なかまの はこに いれよう</div>
      <div class="cards">${left.map(c=>`<div class="card ${G.sel===c.uid?'sel':''} ${G.glow&&groupOf(c)===G.glow?'glow':''}" data-c="${c.uid}" role="button" tabindex="0" aria-label="${KIND[c.kind][1]}"><img src="${cardImg(KIND[c.kind][2])}" alt=""><span>${KIND[c.kind][1]}</span></div>`).join('')}</div>
      <div class="boxes" style="--n:${G.groups.length}">${G.groups.map(g=>boxHtml(g, G.glow===g.key?'glow':'')).join('')}</div>`;
  }else if(phase==='kazoe'){
    const g = G.groups[G.countIdx];
    body = `<div class="msg" id="msg">${esc(g.label)}の はこには いくつ ある？</div>
      <div class="boxes" style="--n:${G.groups.length}">${G.groups.map((gg,i)=>boxHtml(gg, (i===G.countIdx?'on':'')+(i<G.countIdx?' ok':''), i<G.countIdx ? G.placed[gg.key].length : '')).join('')}</div>
      ${G.mark?'<p class="sub-msg">かぞえた カードを タップすると、ばんごうが つくよ</p>':''}
      ${padHtml(10,'n')}`;
  }else if(phase==='hyo'){
    const rows = G.rows; const onTotal = G.hyoIdx===rows.length; const r = rows[G.hyoIdx];
    const msg = onTotal ? 'ごうけいは いくつ？ ぜんぶ たしてみよう'
      : r.key==='sonota' ? `「その他」は、${G.sonotaKinds.map(k=>KIND[k][1]).join('と ')}を あわせた かずだよ。いくつ？`
      : `${r.label}は いくつ？ ひょうに かこう`;
    const activeBox = r && r.key!=='sonota' ? r.key : null;
    body = `<div class="msg" id="msg">${esc(msg)}</div>
      <div class="boxes" style="--n:${G.groups.length}">${G.groups.map(g=>boxHtml(g, (g.key===activeBox || (r&&r.key==='sonota'&&G.sonotaKinds.includes(g.key)))?'on':'')).join('')}</div>
      ${G.mark?'<p class="sub-msg">かぞえた カードを タップすると、ばんごうが つくよ</p>':''}
      <div class="work"><div>${hyoHtml(true)}</div><div>${padHtml(onTotal ? sum(rows.map(g=>G.vals[g.key])) : 10,'h')}</div></div>`;
  }else if(phase==='hyo2'){
    const cell = G.cells[G.cellIdx];
    const msg = cell.c==='tot' ? `${KIND[cell.k][1]}は 2つの クラス あわせて いくつ？` : `${CLASSES[cell.j][1]}の ${KIND[cell.k][1]}は いくつ？`;
    body = `<div class="msg" id="msg">${esc(msg)}</div>
      <div class="classes">${CLASSES.map((c,j)=>`<div class="cls ${c[0]}"><h3>${c[1]}</h3><div class="in">${G.cards.filter(x=>x.cls===c[0]).map(x=>{ const mk=(G.marks[c[0]]||[]).indexOf(x.uid);
        return `<button class="m ${G.glow&&cell.c===c[0]&&x.kind===cell.k?'glow':''}" data-m2="${x.uid}" data-cl="${c[0]}" tabindex="-1"><img src="${cardImg(KIND[x.kind][2])}" alt="">${mk>=0?`<b>${mk+1}</b>`:''}</button>`; }).join('')}</div></div>`).join('')}</div>
      <div class="work"><div>${hyo2Html(true)}</div><div>${padHtml(20,'h2')}</div></div>`;
  }else if(phase==='order'){
    const rest = mainRows().filter(g=>!G.orderList.includes(g.key));
    body = `<div class="msg" id="msg">おおい じゅんに タップして ならべよう</div>
      <div class="work"><div>${hyoHtml(false)}</div><div style="display:flex;flex-direction:column;gap:12px">
      <div class="order-line">${G.orderList.length ? G.orderList.map((k,i)=>`<span>${i+1}. ${gLabel(gInfo(k))}</span>`).join('') : '<span class="sub-msg">ここに ならぶよ</span>'}</div>
      <div class="order-row">${mainRows().map(g=>`<button data-ord="${g.key}" class="${G.orderList.includes(g.key)?'done':''} ${G.glow===g.key?'glow':''}" ${G.orderList.includes(g.key)?'disabled':''}>${g.img?`<img src="${cardImg(g.img)}" alt="">`:''}${esc(g.label)}</button>`).join('')}</div>
      ${G.rows.some(g=>g.key==='sonota') ? '<p class="sub-msg">「その他」は さいごに なるよ</p>' : ''}</div></div>`;
  }else if(phase==='graph'){
    const sc = G.st.scale||1;
    body = `<div class="msg" id="msg">${sc>1?`1めもりは ${sc}${esc(G.unit)}。`:''}ぼうを タップして、ひょうと おなじ たかさに しよう</div>
      <div class="work"><div>${hyoHtml(false)}</div><div style="display:flex;flex-direction:column;gap:10px;align-items:center">${graphHtml(true)}
      <button class="btn" id="gdone">できた！</button></div></div>`;
  }else if(phase==='title'){
    body = `<div class="msg" id="msg">グラフに だいめいを つけよう。どれが あう？</div>
      <div class="work one">${graphHtml(false)}</div>
      <div class="choices text">${G.titleOpts.map(t=>`<button data-title="${esc(t)}">${esc(t)}</button>`).join('')}</div>`;
  }else if(phase==='kotae'){
    const q = G.qs[G.qIdx];
    const show = G.st.set.type==='two' ? hyo2Html(false)
      : (G.st.flow.includes('graph') || G.st.set.type==='data') ? graphHtml(false)
      : G.st.flow.includes('hyo') ? hyoHtml(false)
      : `<div class="boxes" style="--n:${G.groups.length}">${G.groups.map(gg=>boxHtml(gg, 'ok'+(G.target===gg.key?' target':''), G.placed[gg.key].length)).join('')}</div>`;
    const opts = q.kind==='choice' ? `<div class="choices">${q.opts.map(k=>{ const g = gInfo(k) || {label:KIND[k][1], img:KIND[k][2]};
        return `<button data-k="${k}">${g.img?`<img src="${cardImg(g.img)}" alt="">`:(g.iro?`<span class="iro" style="background:${g.iro}"></span>`:'')}${esc(g.label)}</button>`; }).join('')}</div>`
      : q.kind==='yesno' ? `<div class="choices"><button data-k="yes" style="font-size:1.5rem">たりる</button><button data-k="no" style="font-size:1.5rem">たりない</button></div>`
      : q.kind==='text' ? `<div class="choices text">${q.opts.map(t=>`<button data-k="${esc(t)}">${esc(t)}</button>`).join('')}</div>`
      : padHtml(Math.max(q.ans, 10), 'a');
    body = `<div class="work one">${show}</div>
      ${G.qs.length>1?`<div class="qcount">しつもん ${G.qIdx+1} / ${G.qs.length}</div>`:''}
      <div class="msg" id="msg">${esc(q.text)}</div>${opts}`;
  }
  $app.innerHTML = head + `<div class="play">${iraiHtml()}${body}</div>`;
  bindPlay();
}
function say(t, kao){ const m=document.getElementById('msg'); if(m) m.textContent=t; if(kao) partnerSays(kao,''); }
function partnerSays(kao, line){
  G.pkao = kao; G.pline = line;
  const im=document.getElementById('pimg'); if(im) im.src=seiImg(me().partner,kao);
  const pl=document.getElementById('pline'); if(pl) pl.textContent=line;
}
function shake(el){ if(!el) return; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
function useHelp(n){ G.rec.help[n]++; if(G.rec.helpFirstSec===null) G.rec.helpFirstSec = Math.round((Date.now()-G.t0)/1000); }
function oops(line, msg, el){ partnerSays('komatta', line); say(msg); shake(el); }

function bindPlay(){
  $app.querySelector('#quit').onclick = ()=>endStage(false);
  $app.querySelector('#hint').onclick = onHint;
  const ph = G.phase;
  if(ph==='kanten'){
    $app.querySelectorAll('[data-kanten]').forEach(b=>b.onclick=()=>{
      if(b.dataset.kanten===G.st.set.correct){
        G.kanten = b.dataset.kanten; G.groups = groupsFor(G.kanten); G.groups.forEach(g=>G.placed[g.key]=[]);
        nextPhase(); partnerSays('ouen','いい わけかた！');
      }else{
        G.rec.kantenMiss++; b.classList.add('bad');
        oops('それだと こまるかも', G.st.set.correct==='color' ? 'しゅるいで わけると、おなじ いろが ばらばらに なっちゃうよ' : 'いろで わけると、ちがう くだものが まざっちゃうよ', b);
      }
    });
  }else if(ph==='wake'){
    $app.querySelectorAll('[data-c]').forEach(el=>{
      makeDraggable(el, '[data-box]', bx=>{ if(bx) dropTo(el.dataset.c, bx.dataset.box); },
        ()=>{ G.sel = (G.sel===el.dataset.c) ? null : el.dataset.c; showPlay(); });
      el.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ G.sel=el.dataset.c; showPlay(); }});
    });
    $app.querySelectorAll('[data-box]').forEach(bx=>{
      const go=()=>{ if(!G.sel){ say('さきに カードを えらんでね'); return; } dropTo(G.sel, bx.dataset.box); };
      bx.addEventListener('click', go);
      bx.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') go(); });
    });
  }else if(ph==='kazoe' || ph==='hyo'){
    if(ph==='kazoe') $app.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>answerCount(+b.dataset.n));
    else $app.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>answerHyo(+b.dataset.h, b));
    if(G.mark) $app.querySelectorAll('.box.on [data-m]').forEach(m=>m.onclick=e=>{ e.stopPropagation();
      const arr = G.marks[m.dataset.g] = G.marks[m.dataset.g]||[]; const i = arr.indexOf(m.dataset.m);
      if(i>=0) arr.splice(i,1); else arr.push(m.dataset.m); showPlay(); });
  }else if(ph==='hyo2'){
    $app.querySelectorAll('[data-h2]').forEach(b=>b.onclick=()=>answerHyo2(+b.dataset.h2, b));
    $app.querySelectorAll('[data-m2]').forEach(m=>m.onclick=()=>{ if(!G.mark) return;
      const arr = G.marks[m.dataset.cl] = G.marks[m.dataset.cl]||[]; const i = arr.indexOf(m.dataset.m2);
      if(i>=0) arr.splice(i,1); else arr.push(m.dataset.m2); showPlay(); });
  }else if(ph==='order'){
    $app.querySelectorAll('[data-ord]').forEach(b=>b.onclick=()=>{
      const rest = mainRows().filter(g=>!G.orderList.includes(g.key));
      const best = rest.reduce((a,c)=>G.vals[a.key]>=G.vals[c.key]?a:c).key;
      if(b.dataset.ord===best){
        G.orderList.push(best); G.glow=null;
        if(G.orderList.length===mainRows().length){
          G.colOrder = G.orderList.concat(G.rows.some(g=>g.key==='sonota')?['sonota']:[]);
          nextPhase(); partnerSays('ureshii','きれいに ならんだね');
        }else showPlay();
      }else{ G.rec.orderMiss++; oops('あれれ？','のこりの なかで いちばん おおいのは どれかな？ ひょうを みてね', b); }
    });
  }else if(ph==='graph'){
    const sc = G.st.scale||1;
    const vmax = Math.max(...G.colOrder.map(k=>G.vals[k])); const cap = Math.max(5, Math.ceil(vmax/sc/5)*5)*sc;
    $app.querySelectorAll('[data-col]').forEach(b=>b.onclick=()=>{ const k=b.dataset.col; if(G.graph[k]+sc<=cap){ G.graph[k]+=sc; G.badCols=G.badCols.filter(x=>x!==k); showPlay(); } });
    $app.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>{ const k=b.dataset.minus; if(G.graph[k]>0){ G.graph[k]-=sc; showPlay(); } });
    $app.querySelector('#gdone').onclick = ()=>{
      const bad = G.colOrder.filter(k=>G.graph[k]!==G.vals[k]);
      if(!bad.length){ G.graphDone=true; nextPhase(); partnerSays('ureshii','すてきな グラフ！'); }
      else{ G.rec.graphMiss++; G.badCols = bad; showPlay(); oops('もうすこし！', `いろが ついた ぼうの たかさを、ひょうと くらべてみよう`); }
    };
  }else if(ph==='title'){
    $app.querySelectorAll('[data-title]').forEach(b=>b.onclick=()=>{
      if(b.dataset.title===G.st.title+' しらべ'){ G.titleText=b.dataset.title; nextPhase(); partnerSays('ureshii','ぴったりの だいめい！'); }
      else{ G.rec.titleMiss++; b.classList.add('bad'); oops('うーん','グラフに かいてある ものと あっているかな？', b); }
    });
  }else if(ph==='kotae'){
    $app.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>answerQ(b, b.dataset.k));
    $app.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>answerQ(b, +b.dataset.a));
  }
}

// ヒント：場面ごとに、パートナーが手助けする
function onHint(){
  const ph = G.phase;
  if(ph==='kanten'){ partnerSays('ouen','おねがいの ことばを もういちど よんでみてね'); return; }
  if(ph==='wake'){
    useHelp(2);   // 手助け2：同じなかまが光る
    const used = Object.values(G.placed).flat();
    const base = G.sel ? G.cards.find(c=>c.uid===G.sel) : G.cards.find(c=>!used.includes(c.uid));
    if(!base) return;
    G.glow = groupOf(base); G.pkao='ouen'; G.pline='ひかっているのが おなじ なかまだよ'; showPlay(); return;
  }
  if(ph==='kazoe' || ph==='hyo' || ph==='hyo2'){
    useHelp(1);   // 手助け1：数えたものに印
    G.mark = true; if(ph==='hyo2') G.glow = true;
    G.pkao='ouen'; G.pline = ph==='hyo2' ? 'ひかっている カードを タップして かぞえよう' : 'ひとつずつ タップして かぞえよう'; showPlay(); return;
  }
  if(ph==='order'){
    useHelp(2);
    const rest = mainRows().filter(g=>!G.orderList.includes(g.key));
    G.glow = rest.reduce((a,c)=>G.vals[a.key]>=G.vals[c.key]?a:c).key; G.pkao='ouen'; G.pline='ひかっているのが いちばん おおいよ'; showPlay(); return;
  }
  if(ph==='graph'){
    useHelp(3);
    const sc = G.st.scale||1;
    partnerSays('ouen', sc>1 ? `1かい タップで ${sc}${G.unit} ふえるよ。${G.vals[G.colOrder[0]]}なら ${G.vals[G.colOrder[0]]/sc}かいだね` : 'ひょうの かずと おなじ かずだけ タップしよう'); return;
  }
  if(ph==='title'){ partnerSays('ouen','なにを しらべた グラフか かんがえよう'); return; }
  if(ph==='kotae'){
    useHelp(3);
    const q = G.qs[G.qIdx];
    const line = {most:'いちばん たかい ぼう（いちばん 大きい かず）を さがそう', least:'いちばん ひくい ぼう（いちばん 小さい かず）を さがそう',
      enough:'いる かずと、ある かずを くらべよう', howmany:'ぼうの てっぺんから よこに たどって、めもりを よもう',
      total:'ぜんぶの かずを たそう', sonota:'その他の かずを みてね', diff:'2つの かずの ちがいは、おおい ほうから すくない ほうを ひくよ',
      statement:'1つずつ グラフと くらべて たしかめよう', cls_most:'その クラスの たての れつを みよう', all_most:'ごうけいの れつを みよう',
      row_total:'2つの クラスの かずを たそう', cls_total:'その クラスの かずを ぜんぶ たそう'}[q.type];
    partnerSays('ouen', line);
  }
}

// 分ける
function dropTo(uid, boxKey){
  const card = G.cards.find(c=>c.uid===uid); if(!card) return;
  if(groupOf(card)!==boxKey){
    G.rec.sortMiss++; G.sel=null; G.pkao='komatta'; G.pline='あれれ？'; showPlay();
    say('ちがう なかまの はこ みたい。もういちど'); shake($app.querySelector(`[data-box="${boxKey}"]`)); return; }
  G.placed[boxKey].push(uid); G.sel=null;
  if(G.glow && !G.cards.some(c=>groupOf(c)===G.glow && !Object.values(G.placed).flat().includes(c.uid))) G.glow=null;
  G.pkao='futsu'; G.pline='';
  const allIn = Object.values(G.placed).flat().length===G.cards.length;
  showPlay();
  if(allIn){ say('ぜんぶ わけられた！','ureshii'); setTimeout(()=>{ if(G && G.phase==='wake') nextPhase(); }, 900); }
}
// 数える（だい1だん）
function answerCount(n){
  const g = G.groups[G.countIdx]; const right = G.placed[g.key].length;
  if(n===right){
    G.countIdx++; G.pkao='ureshii'; G.pline='';
    if(G.countIdx>=G.groups.length){ G.vals={}; G.groups.forEach(gg=>G.vals[gg.key]=G.placed[gg.key].length); nextPhase(); }
    else{ showPlay(); say(`せいかい！ ${G.groups[G.countIdx].label}の はこは いくつ？`); }
  }else{
    if(n<right) G.rec.countUnder++; else G.rec.countOver++;
    oops('もういちど かぞえよう', n<right ? 'もうすこし ありそう。ゆびで さしながら かぞえてみよう' : 'すこし おおいかも。ゆびで さしながら かぞえてみよう', $app.querySelector('.box.on'));
  }
}
// 表にかく（だい2・3だん）
function answerHyo(n, btn){
  const rows = G.rows;
  if(G.hyoIdx < rows.length){
    const r = rows[G.hyoIdx];
    if(n===G.vals[r.key]){ G.hyoVals[r.key]=n; G.hyoIdx++; G.pkao='ureshii'; G.pline=''; G.mark=false; showPlay(); }
    else{ G.rec.tableMiss++; if(n<G.vals[r.key]) G.rec.countUnder++; else G.rec.countOver++;
      oops('もういちど', r.key==='sonota' ? 'その他に まとめる ものを、ぜんぶ たしてみよう' : 'はこの カードを もういちど かぞえよう', btn); }
  }else{
    const tot = sum(rows.map(g=>G.vals[g.key]));
    if(n===tot){ G.hyoTotal=tot; nextPhase(); partnerSays('ureshii','ひょうが できたね！'); }
    else{ G.rec.tableMiss++; oops('もういちど','ひょうの かずを ぜんぶ たしてみよう', btn); }
  }
}
function answerHyo2(n, btn){
  const cell = G.cells[G.cellIdx];
  if(n===cell.v){ G.cellVals[G.cellIdx]=n; G.cellIdx++; G.mark=false; G.glow=null; G.pkao='ureshii'; G.pline='';
    if(G.cellIdx>=G.cells.length){ G.vals={}; G.kinds.forEach((k,i)=>G.vals[k]=G.two[i][0]+G.two[i][1]); nextPhase(); partnerSays('ureshii','ひとつの ひょうに まとまったね！'); }
    else showPlay(); }
  else{ G.rec.tableMiss++; oops('もういちど', cell.c==='tot' ? '1くみと 2くみの かずを たそう' : 'その クラスの カードを もういちど かぞえよう', btn); }
}
// 答える
function answerQ(btn, val){
  const q = G.qs[G.qIdx];
  const ok = q.kind==='pad' ? val===q.ans : val===q.ans;
  if(!G.qTried){ G.rec.qs.push({type:q.type, ok, sec:Math.round((Date.now()-G.qStart)/100)/10}); G.qTried = true; }
  if(ok){
    G.qIdx++; G.qTried=false; G.qStart=Date.now();
    if(G.qIdx>=G.qs.length){ endStage(true); return; }
    G.pkao='ureshii'; G.pline='せいかい！'; showPlay(); return;
  }
  btn.classList.add('bad');
  oops('', q.type==='enough' ? `はこには ${G.placed[G.target].length}こ。いるのは ${G.need}こ。くらべてみよう` : 'もういちど よく みてみよう', btn);
}

// ==============================
// ステージのおわり：記録・コイン・建物・つぎの地区
// ==============================
function endStage(cleared){
  const p = me(); const key = `${G.dan}-${G.s}`;
  const first = cleared && !(p.cleared[key]>0);
  const okN = G.rec.qs.filter(x=>x.ok).length;
  const rec = Object.assign({}, G.rec, {result: cleared?'clear':'quit', sec: Math.round((Date.now()-G.rec.t)/1000),
    readOk: G.rec.qs.length ? okN===G.rec.qs.length : null, readRate: G.rec.qs.length ? Math.round(okN/G.rec.qs.length*100) : null,
    vals: G.vals || null, kanten: G.kanten});
  addLog(rec);
  let gain = 0, newB = null, newChiku = null, stopHere = false;
  if(cleared){
    p.cleared[key] = (p.cleared[key]||0) + 1;
    gain = SETTEI.coinClear + (first ? SETTEI.coinFirstBonus : 0); p.coins += gain;
    const b = CHIKU[G.dan-1].reward[G.s-1];
    if(first && !p.owned.includes(b)){ p.owned.push(b); newB = b; }
    if(G.s===DAN[G.dan].stages.length && G.dan<5 && !p.chiku.opened.includes(G.dan+1)){
      if(danAllowed(p, G.dan+1)){ p.chiku.opened.push(G.dan+1); newChiku = G.dan+1; } else stopHere = true; }
  }
  writeSave();
  if(!cleared){ const d=G.dan; G=null; showStages(d); return; }
  const cl = clientInfo(G.st.client);
  $app.innerHTML = `<div class="clear"><div class="panel">
    <div class="big">おねがい かなえた！</div>
    <div class="pair"><img src="${cl.img}" alt=""><img src="${seiImg(p.partner,'ureshii')}" alt=""></div>
    <p style="font-weight:700;font-size:1.2rem">${esc(cl.name)}「ありがとう！ たすかったよ」</p>
    <div class="coinline"><img src="${COIN}" alt="">＋${gain}${first?'<span class="sub-msg">（はじめての ボーナス こみ）</span>':''}</div>
    ${newB ? `<img class="reward" src="${tateImg(newB)}" alt=""><h2>${esc(TATEMONO[newB][0])}を もらった！</h2>
      <button class="btn" id="put">まちに おく</button>` : '<p class="sub-msg">たてものは もう もっているよ</p>'}
    ${stopHere ? '<p class="newchiku">つぎの まちは、せんせいと いっしょに ひらこう</p>' : ''}
    ${newChiku ? `<p class="newchiku">あたらしい まち「${esc(CHIKU[newChiku-1].name)}」が ひらいた！</p>` : ''}
    <div class="bar" style="justify-content:center"><button class="btn sub" id="again">もういちど</button><button class="btn sub" id="list">ステージえらび</button></div>
  </div></div>`;
  const dan = G.dan, s = G.s; G=null;
  const put = $app.querySelector('#put'); if(put) put.onclick=()=>{ curChiku=dan; pickId=newB; pickFrom=null; showTown(); };
  $app.querySelector('#again').onclick=()=>startStage(dan, s);
  $app.querySelector('#list').onclick=()=>showStages(newChiku||dan);
}

// ==============================
// はじまり
// ==============================
loadSave();
setteiFromUrl().then(()=>showTitle());   // 同じ端末を何人かで使うので、いつも はじめの画面から
