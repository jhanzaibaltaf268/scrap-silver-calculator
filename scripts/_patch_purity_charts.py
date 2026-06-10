"""Adds interactive multi-purity calculator widget to all translated purity chart pages."""
import re, os

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

LANGS = {
    'de': {
        'file': 'de/silber-reinheitstabelle.html',
        'widget_title': 'Sofort-Mehrfachreinheitsrechner',
        'subtitle': 'Gewicht eingeben, um den Schmelzwert aller Silberreinheiten auf einen Blick zu sehen.',
        'label_weight': 'Gewicht',
        'label_unit': 'Einheit',
        'opt_g': 'Gramm',
        'opt_oz': 'Feinunzen',
        'opt_dwt': 'Pennygewicht',
        'opt_kg': 'Kilogramm',
        'table_title': 'Silberreinheits-Referenztabelle',
    },
    'es': {
        'file': 'es/tabla-de-pureza-de-la-plata.html',
        'widget_title': 'Calculadora Multi-Pureza Instantánea',
        'subtitle': 'Ingresa un peso para ver el valor de fusión en todos los estándares de plata con el precio en vivo.',
        'label_weight': 'Peso',
        'label_unit': 'Unidad',
        'opt_g': 'Gramos',
        'opt_oz': 'Onzas Troy',
        'opt_dwt': 'Pennyweight',
        'opt_kg': 'Kilogramos',
        'table_title': 'Tabla de Referencia de Pureza de Plata',
    },
    'fr': {
        'file': 'fr/tableau-de-purete-de-l-argent.html',
        'widget_title': 'Calculateur Multi-Pureté Instantané',
        'subtitle': "Entrez un poids pour voir la valeur de fusion de chaque standard d'argent au prix spot actuel.",
        'label_weight': 'Poids',
        'label_unit': 'Unité',
        'opt_g': 'Grammes',
        'opt_oz': 'Onces Troy',
        'opt_dwt': 'Pennyweight',
        'opt_kg': 'Kilogrammes',
        'table_title': "Tableau de Référence de Pureté de l'Argent",
    },
    'it': {
        'file': 'it/grafico-della-purezza-dellargento.html',
        'widget_title': 'Calcolatore Multi-Purezza Istantaneo',
        'subtitle': "Inserisci un peso per vedere il valore di fusione per ogni standard d'argento al prezzo spot attuale.",
        'label_weight': 'Peso',
        'label_unit': 'Unità',
        'opt_g': 'Grammi',
        'opt_oz': 'Once Troy',
        'opt_dwt': 'Pennyweight',
        'opt_kg': 'Chilogrammi',
        'table_title': "Tabella di Riferimento della Purezza dell'Argento",
    },
    'pt': {
        'file': 'pt/gráfico-de-pureza-de-prata.html',
        'widget_title': 'Calculadora Multi-Pureza Instantânea',
        'subtitle': 'Insira um peso para ver o valor de fusão de cada padrão de prata ao preço spot atual.',
        'label_weight': 'Peso',
        'label_unit': 'Unidade',
        'opt_g': 'Gramas',
        'opt_oz': 'Onças Troy',
        'opt_dwt': 'Pennyweight',
        'opt_kg': 'Quilogramas',
        'table_title': 'Tabela de Referência de Pureza da Prata',
    },
    'ru': {
        'file': 'ru/таблица-чистоты-серебра.html',
        'widget_title': 'Мгновенный мультикалькулятор чистоты',
        'subtitle': 'Введите вес — получите стоимость по всем стандартам серебра по текущей спотовой цене.',
        'label_weight': 'Вес',
        'label_unit': 'Единица',
        'opt_g': 'Граммы',
        'opt_oz': 'Тройские унции',
        'opt_dwt': 'Пеннивейт',
        'opt_kg': 'Килограммы',
        'table_title': 'Справочная таблица чистоты серебра',
    },
    'tr': {
        'file': 'tr/gümüş-saflık-tablosu.html',
        'widget_title': 'Anlık Çoklu Saflık Hesaplayıcısı',
        'subtitle': 'Güncel spot fiyatla tüm gümüş standartlarındaki ergitme değerini görmek için bir ağırlık girin.',
        'label_weight': 'Ağırlık',
        'label_unit': 'Birim',
        'opt_g': 'Gram',
        'opt_oz': 'Troy Ons',
        'opt_dwt': 'Pennyweight',
        'opt_kg': 'Kilogram',
        'table_title': 'Gümüş Saflık Referans Tablosu',
    },
}

WIDGET_TEMPLATE = (
    '\n      <!-- Interactive multi-purity calculator -->\n'
    '      <div class="calc-widget" style="max-width:100%;">\n'
    '        <div class="calc-widget-title"><span class="icon">&#x26A1;</span> {widget_title}</div>\n'
    '        <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px;">{subtitle}</p>\n'
    '        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;align-items:flex-end;">\n'
    '          <div>\n'
    '            <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.06em;">{label_weight}</label>\n'
    '            <input type="number" id="multi-weight" value="10" min="0.01" step="0.01"\n'
    '              style="width:120px;padding:10px 14px;border:1px solid var(--border-medium);border-radius:10px;background:var(--bg-secondary);color:#fff;font-size:16px;font-weight:600;outline:none;">\n'
    '          </div>\n'
    '          <div>\n'
    '            <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.06em;">{label_unit}</label>\n'
    '            <select id="multi-unit" style="padding:10px 14px;border:1px solid var(--border-medium);border-radius:10px;background:var(--bg-secondary);color:#fff;font-size:14px;outline:none;cursor:pointer;">\n'
    '              <option value="g">{opt_g}</option>\n'
    '              <option value="oz">{opt_oz}</option>\n'
    '              <option value="dwt">{opt_dwt}</option>\n'
    '              <option value="kg">{opt_kg}</option>\n'
    '            </select>\n'
    '          </div>\n'
    '          <div style="font-size:12px;color:var(--text-muted);">Spot: <strong id="multi-spot" style="color:#f0f4f8;">...</strong></div>\n'
    '        </div>\n'
    '        <div id="purity-bars" style="display:flex;flex-direction:column;gap:8px;"></div>\n'
    '      </div>\n\n'
    '      <!-- Full reference table -->\n'
    '      <div class="calc-widget" style="max-width:100%;margin-top:0;">\n'
    '        <div class="calc-widget-title"><span class="icon">&#x1F4CA;</span> {table_title}</div>\n'
    '        <div class="purity-table-wrap">\n'
)

NEW_JS = """const PURITIES=[
  {mark:'999',name:'Fine Silver',pct:99.9,link:'/999-silver-calculator/'},
  {mark:'980',name:'980 Silver',pct:98.0,link:'/silver-melt-value-calculator/'},
  {mark:'970',name:'970 Silver',pct:97.0,link:'/silver-melt-value-calculator/'},
  {mark:'958',name:'Britannia',pct:95.8,link:'/958-silver-calculator/'},
  {mark:'950',name:'950 Silver',pct:95.0,link:'/silver-melt-value-calculator/'},
  {mark:'925',name:'Sterling',pct:92.5,link:'/925-silver-calculator/'},
  {mark:'900',name:'Coin Silver',pct:90.0,link:'/900-silver-calculator/'},
  {mark:'875',name:'875 Silver',pct:87.5,link:'/silver-melt-value-calculator/'},
  {mark:'835',name:'European',pct:83.5,link:'/835-silver-calculator/'},
  {mark:'800',name:'European',pct:80.0,link:'/800-silver-calculator/'},
  {mark:'750',name:'750 Silver',pct:75.0,link:'/silver-melt-value-calculator/'},
  {mark:'500',name:'500 Silver',pct:50.0,link:'/silver-melt-value-calculator/'}
];
function getWeightInGrams(){
  var w=parseFloat(document.getElementById('multi-weight').value)||10;
  var u=document.getElementById('multi-unit').value;
  if(u==='oz')return w*31.1035;
  if(u==='dwt')return w*1.55517;
  if(u==='kg')return w*1000;
  return w;
}
function renderBars(spot){
  var ppg=spot/31.1035,wg=getWeightInGrams(),maxVal=ppg*0.999*wg;
  var el=document.getElementById('purity-bars');
  if(!el)return;
  el.innerHTML=PURITIES.map(function(p){
    var val=ppg*(p.pct/100)*wg,bp=(val/maxVal*100).toFixed(1);
    var col=p.pct>=95?'#34d399':p.pct>=90?'#a78bfa':p.pct>=80?'#60a5fa':'#94a3b8';
    return '<div style="display:flex;align-items:center;gap:10px;">'
      +'<div style="width:48px;text-align:right;font-size:13px;font-weight:700;color:#f0f4f8;flex-shrink:0;">'+p.mark+'</div>'
      +'<div style="flex:1;background:rgba(255,255,255,.07);border-radius:6px;height:28px;position:relative;overflow:hidden;">'
      +'<div style="position:absolute;left:0;top:0;height:100%;width:'+bp+'%;background:'+col+';border-radius:6px;opacity:.85;transition:width .3s ease;"></div>'
      +'<span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;font-weight:600;color:#fff;white-space:nowrap;">'
      +'$'+val.toFixed(2)+' <span style="font-weight:400;font-size:11px;opacity:.7;">('+p.pct+'%)</span></span>'
      +'</div>'
      +'<a href="'+p.link+'" style="font-size:12px;color:var(--accent-primary);white-space:nowrap;text-decoration:none;flex-shrink:0;">Calc &rarr;</a>'
      +'</div>';
  }).join('');
}
function update(){
  var spot=SilverPrice.getPrice();if(!spot)return;
  var ppg=spot/31.1035;
  var ms=document.getElementById('multi-spot');
  if(ms)ms.textContent='$'+spot.toFixed(2)+'/oz';
  document.getElementById('purity-chart').innerHTML=PURITIES.map(function(p){
    var g=ppg*p.pct/100,oz=spot*p.pct/100,ten=g*10;
    return '<tr><td><strong>'+p.mark+'</strong></td><td>'+p.name+'</td><td>'+p.pct+'%</td>'
      +'<td>$'+g.toFixed(4)+'</td><td>$'+oz.toFixed(2)+'</td><td>$'+ten.toFixed(2)+'</td>'
      +'<td><a href="'+p.link+'" style="color:var(--accent-blue)">Calc &rarr;</a></td></tr>';
  }).join('');
  renderBars(spot);
}
document.getElementById('multi-weight').addEventListener('input',function(){var s=SilverPrice.getPrice();if(s)renderBars(s);});
document.getElementById('multi-unit').addEventListener('change',function(){var s=SilverPrice.getPrice();if(s)renderBars(s);});
SilverPrice.onPriceUpdate(function(){update();});update();"""

updated = []
skipped = []

for lang, cfg in LANGS.items():
    fpath = cfg['file']
    if not os.path.exists(fpath):
        skipped.append(f'{lang}: {fpath} NOT FOUND')
        continue

    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()

    if 'id="purity-bars"' in html:
        skipped.append(f'{lang}: already has widget')
        continue

    # Build widget HTML
    widget_html = WIDGET_TEMPLATE.format(**cfg)

    # Replace old single calc-widget (table only) with widget + table div
    old_pattern = re.compile(
        r'<div class="calc-widget" style="max-width:100%;">\s*'
        r'<div class="calc-widget-title"><span class="icon">.*?</span>[^<]*</div>\s*'
        r'<table class="purity-table"[^>]*>',
        re.DOTALL
    )
    m = old_pattern.search(html)
    if not m:
        skipped.append(f'{lang}: old widget pattern not found')
        continue

    html = html[:m.start()] + widget_html + '        <table class="purity-table" style="margin:0;">' + html[m.end():]

    # Close purity-table-wrap + new calc-widget after the table
    html = html.replace(
        '<tbody id="purity-chart"></tbody>\n        </table>\n      </div>',
        '<tbody id="purity-chart"></tbody>\n        </table>\n        </div>\n      </div>',
        1
    )

    # Replace JS update() block — handles both arrow and function() callback styles
    old_js = re.compile(
        r'function update\(\)\{.*?SilverPrice\.onPriceUpdate\([^;]+\);update\(\);',
        re.DOTALL
    )
    if old_js.search(html):
        html = old_js.sub(NEW_JS, html, count=1)
    else:
        skipped.append(f'{lang}: JS pattern not found')
        continue

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(html)
    updated.append(f'{lang}: {fpath}')

print('UPDATED:')
for s in updated: print(' ', s)
print('\nSKIPPED:')
for s in skipped: print(' ', s)
