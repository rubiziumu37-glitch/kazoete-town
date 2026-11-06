# index.html を組み立てる（見た目＝base.css＋extra.css、動き＝main.js）
import pathlib
d = pathlib.Path(__file__).parent
base = (d/'base.css').read_text(encoding='utf-8')
extra = (d/'extra.css').read_text(encoding='utf-8')
js = (d/'main.js').read_text(encoding='utf-8')
# ②-3 お店と家（はじまりの loadSave より前に読みこむ）
house = (d/'house.js').read_text(encoding='utf-8') + (d/'teacher.js').read_text(encoding='utf-8')
# QRを つくる 部品（qrcode-generator 1.4.4, MIT）
qrlib = (d/'qrcode.min.js').read_text(encoding='utf-8')
head_js, tail_js = js.rsplit('loadSave();', 1)
js = qrlib + '\n' + head_js + house + '\nloadSave();' + tail_js
head = (d/'head.html').read_text(encoding='utf-8')
html = head + '<style>\n' + base + '\n' + extra + '\n</style>\n\n<div id="app"></div>\n\n<script>\n' + js + '</script>\n'
(d.parent/'index.html').write_text(html, encoding='utf-8')
print('ok', len(html))
