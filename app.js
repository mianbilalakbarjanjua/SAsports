/* 3D tilt on product cards (runs first, independent of everything else) */
(function(){try{if(!matchMedia('(hover:hover)').matches)return;let cur=null;
const off=()=>{if(cur){cur.style.transform='';cur.classList.remove('tilt');cur=null}};
document.addEventListener('pointermove',e=>{if(e.pointerType&&e.pointerType!=='mouse')return;const c=e.target.closest&&e.target.closest('.pc');if(cur&&cur!==c)off();if(!c)return;cur=c;c.classList.add('tilt');const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+(x*18).toFixed(2)+'deg) rotateX('+(-y*18).toFixed(2)+'deg) scale(1.06)'});
document.addEventListener('mouseleave',off);window.addEventListener('blur',off)}catch(e){}})();
let WA='923434762195';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let CUR='PKR';try{CUR=localStorage.getItem('sa_cur')||'PKR'}catch(e){}
let RATES={USD:0.0036,GBP:0.0027,EUR:0.0031};const SYM={USD:'$',GBP:'£',EUR:'€'};
const pkr=n=>'Rs. '+n.toLocaleString('en-PK'),pk=n=>(CUR==='PKR'||!RATES[CUR])?pkr(n):SYM[CUR]+(n*RATES[CUR]).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const BASE=document.body.dataset.base||'',PAGECAT=document.body.dataset.cat||'';
const CATS=[['bats','Bats',['Premium','Classic'],'bats'],['pads','Pads',['Classic','Colour','Limited'],'pads'],['gloves','Gloves',['Wicketkeeping','Batting'],'gloves'],['balls','Balls',['Match','Practice'],'balls'],['protect','Helmets & Guards',['Helmets','Guards'],'helmets-guards'],['kits','Bags & Kits',['Kit Bags','Full Kits','Accessories'],'bags-kits']];
const SITE='https://www.sasports.store/',esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const rel=s=>String(s||'').replace(/^\//,''),href=l=>!l?'#':/^(https?:|#|tel:)/.test(l)?l:BASE+rel(l),isVid=f=>/\.(mp4|webm|mov|m4v)$/i.test(f||'');
let P=[],PM={},H=null,pR=0,hR=0,sub='',si=0,tm;
const FALLBACK=[
['bats','Premium','bat-apex','SA Apex Series',18500,'Multi-grain English willow blade with a deep edge and a big, forgiving middle.'],
['bats','Premium','bat-le','SA Limited Edition',24500,'Our top-spec blade. Hand-selected willow, long barrel, pro-level pick-up.'],
['bats','Premium','bat-pro','SA Pro',14500,'The all-rounder: balanced, quick off the bat and ready for hard-ball cricket.'],
['bats','Premium','bat-31','SA Pro Elite',16500,'Refined Pro profile with a thicker spine for power through the line.'],
['bats','Classic','bat-cricket','SA Cricket Classic',9500,'A clean everyday blade for club cricketers and serious practice.'],
['bats','Classic','bat-blue','SA Cricket Blue Series',8500,'Bold blue SA branding on a light, lively blade. Great for rising players.'],
['bats','Classic','bat-sports','SA Sports Heritage',11500,'Traditional shaping with the SA Sports label. Solid, reliable, proven.'],
['pads','Classic','pads-black','SA Pro Pads, Black',5800,'Lightweight, high-density foam with a contoured fit and secure straps.'],
['pads','Classic','pads-white','SA Pro Pads, White',5800,'Classic white match pads. Light on the legs, firm on impact.'],
['pads','Classic','pads-black2','SA Match Pads, Black',5200,'Ribbed protection and flexible knee roll for quick running.'],
['pads','Colour','pads-blue','SA Colour Pads, Royal Blue',5500,'Stand out at the crease. Same SA protection in a vivid royal blue.'],
['pads','Colour','pads-red','SA Colour Pads, Red',5500,'Bold red pads built to the same comfortable, protective spec.'],
['pads','Limited','pads-le','SA Limited Edition Pads, Black',7500,'Premium diamond-quilted shell with gold Limited Edition detailing.'],
['pads','Limited','pads-white2','SA Limited Edition Pads, White',6800,'Premium white pads with extra cushioning and a sculpted knee roll.'],
['gloves','Wicketkeeping','wk-gloves','SA Keeping Gloves, Player Edition',6500,'Soft palm, wide sweet spot and a snug wrist for clean takes.'],
['gloves','Wicketkeeping','wk-gloves2','SA Keeping Gloves, Player Edition Pro',7200,'Gold and green Player Edition with reinforced fingers and padded back.'],
['gloves','Batting','bat-gloves','SA Batting Gloves',4800,'Flexible finger protection and breathable palm for long innings.'],
['balls','Match','ball-red','SA Match Ball, Dark Red',1950,'Four-piece leather ball with a tight, durable seam and gold SA stamp.'],
['balls','Match','ball-set','SA Match Ball, Red',1850,'Bright red match ball for nets and tournament play.'],
['balls','Match','ball-box','SA Match Balls, Box of 6',10500,'A box of six hard-ball red cricket balls, best value for clubs and academies.'],
['balls','Practice','ball-pink','SA Practice Ball, Pink',1650,'Pink leather ball, easy to track in low light and evening sessions.'],
['protect','Helmets','helmet','SA Helmet, Steel Grille',5500,'Tough shell, padded interior and a steel grille with clear sight lines.'],
['protect','Guards','guard-white','SA Thigh Guard, White',2200,'Slim, comfortable thigh protection for batters who move freely.'],
['protect','Guards','guard-black','SA Thigh Guard, Black and Gold',2800,'Hard-shell guard with extra cushioning and a secure strap.'],
['protect','Guards','guard-pro','SA Pro Thigh Guard',2600,'Contoured protection with a padded inner pocket.'],
['kits','Kit Bags','bag-player','SA Kit Bag, Player Edition',9500,'Roomy backpack-style bag with separate bat and shoe compartments.'],
['kits','Kit Bags','bag-red','SA Complete Red Kit Set',48500,'Matching red bag, pads, gloves and bat. Everything in one set.'],
['kits','Full Kits','kit1','SA Complete Player Kit, Black',58000,'Bat, pads, gloves, helmet, guard and bag. Ready for the first ball.'],
['kits','Full Kits','kit3','SA Complete Player Kit, White',52000,'A full white kit with wicketkeeping gloves, pads, helmet and bag.'],
['kits','Full Kits','kit4','SA Pro Combo Kit',55000,'Premium combo of bat, protection and kit bag at a bundled price.'],
['kits','Accessories','cover','SA Bat Cover and Grips Pack',1200,'Protective bat cover with spare grips to keep your blade fresh.']
];
function setProducts(raw){const seen={};P=(raw||[]).filter(x=>x&&x.name&&!x.hidden).map((x,i)=>{let id=slug(x.name)||('p'+i);if(seen[id])id+='-'+i;seen[id]=1;const st=(x.stock===''||x.stock==null||isNaN(+x.stock))?null:Math.max(0,+x.stock),r=rel(x.image);return{id,c:x.category,s:x.sub,rel:r,image:BASE+r,n:String(x.name),p:+x.price||0,old:+x.old_price||0,d:String(x.description||''),stock:st,best:!!x.bestseller,nw:!!x.new_launch,sz:String(x.size||''),g:(x.gallery||[]).map(v=>typeof v==='string'?v:(v&&v.image)).filter(Boolean).map(rel),f:(x.features||[]).map(v=>typeof v==='string'?v:(v&&v.f)).filter(Boolean),o:(x.options||[]).filter(q=>q&&q.name&&(q.values||[]).length).map(q=>({n:q.name,v:q.values.map(z=>typeof z==='string'?z:(z&&z.v)).filter(Boolean)}))}});PM={};P.forEach(p=>PM[p.id]=p);pR=1;redraw();drawCart()}
function injectLD(){const c=CATS.find(x=>x[0]===PAGECAT);if(!c)return;let e=document.getElementById('ld-items');if(!e){e=document.createElement('script');e.type='application/ld+json';e.id='ld-items';document.head.appendChild(e)}e.textContent=JSON.stringify({'@context':'https://schema.org','@type':'ItemList',name:'SA Sports '+c[1],itemListElement:P.filter(p=>p.c===PAGECAT).map((p,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'Product',name:p.n,description:p.d,image:SITE+p.rel,brand:{'@type':'Brand',name:'SA Sports'},offers:{'@type':'Offer',url:SITE+c[3]+'/',priceCurrency:'PKR',price:String(p.p),availability:p.stock===0?'https://schema.org/OutOfStock':'https://schema.org/InStock'}}}))})}
const PURL=id=>BASE+'product/?p='+encodeURIComponent(id);
const card=p=>{const so=p.stock===0,low=p.stock!=null&&p.stock>0&&p.stock<=10,sale=p.old>p.p;return `<article class="pc" data-pv="${esc(p.id)}"><div class="im">${so?'<span class="bd so">Sold out</span>':sale?'<span class="bd">Sale</span>':low?`<span class="bd lo">Only ${p.stock} left</span>`:''}<img src="${esc(p.image)}" alt="${esc(p.n)}" loading="lazy">${so?'':`<button class="qa" data-add="${esc(p.id)}" aria-label="Add to cart">+</button>`}</div><h3><a href="${esc(PURL(p.id))}">${esc(p.n)}</a></h3><div class="pr">${pk(p.p)}${sale?` <s>${pk(p.old)}</s>`:''}</div></article>`};
const car=(h,c='')=>`<div class="cw"><button class="ar l" data-sc="-1" aria-label="Previous">‹</button><div class="car ${c}">${h}</div><button class="ar r" data-sc="1" aria-label="Next">›</button></div>`;
function redraw(){if(document.body.dataset.page==='product'){if(pR)renderProduct()}else if(PAGECAT){render();if(pR)injectLD()}else if(pR&&hR)renderHome()}
function render(){const c=CATS.find(x=>x[0]===PAGECAT);if(!c||!$('#grid'))return;const L=P.filter(p=>p.c===PAGECAT&&(!sub||p.s===sub));
$('#tabS').innerHTML=[['','All']].concat(c[2].map(s=>[s,s])).map(t=>`<button class="${sub===t[0]?'on':''}" data-sub="${esc(t[0])}">${esc(t[1])}</button>`).join('');
$('#grid').innerHTML=L.map(card).join('')||'<p class="sub">No products here yet.</p>'}
function setAnn(){const a=(H&&H.announcements||[]).filter(Boolean);if(!a.length||!$('#at'))return;let i=0;const s=()=>$('#at').textContent=a[(i+a.length)%a.length];s();$('#ap').onclick=()=>{i--;s()};$('#an').onclick=()=>{i++;s()};setInterval(()=>{i++;s()},5000)}
function go(n){const S=$$('.sl'),D=$$('.dots i');if(!S.length)return;si=(n+S.length)%S.length;S.forEach((s,i)=>{s.classList.toggle('on',i===si);const v=s.querySelector('video');if(v){if(i===si)v.play().catch(()=>{});else v.pause()}});D.forEach((d,i)=>d.classList.toggle('on',i===si));clearInterval(tm);if(S.length>1)tm=setInterval(()=>go(si+1),7000)}
function renderHome(){const sl=(H.slides||[]).filter(s=>s&&(s.image||s.video)),on=(id,h,vis)=>{const e=$(id);if(e){e.innerHTML=h;const s=e.closest('section,.blk,.ab');if(s)s.hidden=!vis}};
$('#hero').innerHTML=sl.map((s,i)=>{const im=s.image?BASE+rel(s.image):'',m=s.mobile_image?BASE+rel(s.mobile_image):im,md=s.video?`<video src="${esc(BASE+rel(s.video))}" poster="${esc(im)}" muted loop playsinline preload="metadata"></video>`:`<picture><source media="(max-width:760px)" srcset="${esc(m)}"><img src="${esc(im)}" alt="${esc(s.title||'SA Sports')}" ${i?'loading="lazy"':'fetchpriority="high"'}></picture>`;return `<a class="sl" href="${esc(href(s.link))}">${md}${s.title?`<span class="st">${esc(s.title)}</span>`:''}</a>`}).join('')+(sl.length>1?'<button class="ar l" id="hp" aria-label="Previous">‹</button><button class="ar r" id="hn" aria-label="Next">›</button><div class="dots">'+sl.map((_,i)=>`<i data-d="${i}"></i>`).join('')+'</div>':'');
$('#hero').hidden=!sl.length;go(0);
const C=(H.collections||[]).filter(c=>c&&c.image);on('#cols',C.map(c=>`<a class="ct" href="${esc(href(c.link))}"><img src="${esc(BASE+rel(c.image))}" alt="${esc(c.title)}" loading="lazy"><span>${esc(c.title)}</span></a>`).join(''),C.length);
let b=P.filter(p=>p.best);if(!b.length)b=P.slice(0,4);on('#best','<div class="grid">'+b.map(card).join('')+'</div>',b.length);
let n=P.filter(p=>p.nw);if(!n.length)n=P.slice(-6);on('#newl',car(n.map(card).join('')),n.length);
const T=(H.trusted||[]).filter(t=>t&&t.image);$('#trt').textContent=H.trusted_title||'Trusted by Players';on('#trl',car(T.map(t=>`<figure><img src="${esc(BASE+rel(t.image))}" alt="${esc(t.caption||'')}" loading="lazy">${t.caption?`<figcaption>${esc(t.caption)}</figcaption>`:''}</figure>`).join(''),'big'),T.length);
$('#abh').textContent=H.about_title||'About SA Sports';$('#abp').textContent=H.about_text||'';if(H.about_image)$('#abi').src=BASE+rel(H.about_image);
const V=(H.videos||[]).filter(v=>v&&v.file);$('#vt').textContent=H.videos_title||'Quality you can count on';on('#vg',V.map(v=>isVid(v.file)?`<video src="${esc(BASE+rel(v.file))}" muted loop playsinline preload="metadata"></video>`:`<img src="${esc(BASE+rel(v.file))}" alt="" loading="lazy">`).join(''),V.length);
const G=(H.gallery||[]).filter(g=>g&&g.image);on('#gal',car(G.map(g=>`<img src="${esc(BASE+rel(g.image))}" alt="" loading="lazy">`).join('')),G.length);
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?e.target.play().catch(()=>{}):e.target.pause()),{threshold:.4});$$('#vg video').forEach(v=>io.observe(v))}
document.addEventListener('click',e=>{const s=e.target.closest('[data-sub]'),a=e.target.closest('[data-add]'),v=e.target.closest('[data-pv]'),c=e.target.closest('[data-sc]'),d=e.target.closest('[data-d]');
if(s){sub=s.dataset.sub;render()}if(a&&!a.disabled){const q=PM[a.dataset.add];if(q&&q.o.length){location.href=PURL(q.id);return}add(a.dataset.add);return}if(v&&!e.target.closest('a'))location.href=PURL(v.dataset.pv);const th=e.target.closest('[data-gi]');if(th){$('#gm img').src=th.dataset.gi;$$('.ths button').forEach(b=>b.classList.toggle('on',b===th))}
if(e.target.id==='pdpAdd')pdpAdd();
if(c){const w=c.closest('.cw').querySelector('.car');w.scrollBy({left:c.dataset.sc*w.clientWidth*.8,behavior:'smooth'})}
if(d)go(+d.dataset.d);if(e.target.id==='hn')go(si+1);if(e.target.id==='hp')go(si-1)});
const sb=$('#sbtn');if(sb){sb.onclick=()=>{const s=$('#srch');s.hidden=!s.hidden;if(!s.hidden)$('#sq').focus()};$('#sq').oninput=e=>{const k=s=>s.toLowerCase().replace(/[^a-z0-9]/g,''),q=k(e.target.value);$('#sr').innerHTML=q?'<div class="grid">'+P.filter(p=>k(p.n).includes(q)||k(p.d).includes(q)).slice(0,12).map(card).join('')+'</div>':''}}
/* product viewer */
let pid='';function pv(i){const p=PM[i];if(!p)return;pid=i;$('#pi').src=p.image;$('#pi').alt=p.n;$('#pa').disabled=p.stock===0;$('#pa').textContent=p.stock===0?'Sold out':'Add to cart';$('#pn').textContent=p.n;$('#pd').textContent=p.d;$('#pp').textContent=pk(p.p);let x=$('#pex');if(!x){x=document.createElement('div');x.id='pex';$('#pa').before(x)}
x.innerHTML=(p.sz?`<div class="pz"><b>Size:</b> ${esc(p.sz)}</div>`:'')+(p.f.length?'<ul class="pf">'+p.f.map(t=>`<li>${esc(t)}</li>`).join('')+'</ul>':'')+p.o.map((q,k)=>`<label class="po">${esc(q.n)}<select data-po="${k}">${q.v.map(z=>`<option>${esc(z)}</option>`).join('')}</select></label>`).join('');$('#pv').showModal()}
function ens(k){if(!PM[k]&&k.indexOf('~')>0){const b=PM[k.split('~')[0]];if(b)PM[k]=Object.assign({},b,{n:b.n+' ('+k.split('~')[1]+')'})}}
$('#px').onclick=()=>$('#pv').close();$('#pv').addEventListener('click',e=>{if(e.target.id==='pv')e.target.close()});$('#pa').onclick=()=>{const p=PM[pid],ch=$$('#pex select').map((s,k)=>p.o[k].n+': '+s.value);let key=pid;if(ch.length)key=pid+'~'+ch.join(', ').replace(/[^\w ,:.\-]/g,'');ens(key);add(key);$('#pv').close()};

/* full product page: /product/?p=slug */
function renderProduct(){const m=$('#pdp');if(!m)return;const id=new URLSearchParams(location.search).get('p'),p=PM[id];
if(!p){m.innerHTML='<h1>Product not found</h1><p class="cp"><a href="'+BASE+'">Back to the shop</a></p>';return}
const so=p.stock===0,sale=p.old>p.p,low=p.stock!=null&&p.stock>0&&p.stock<=10,imgs=[p.image].concat(p.g.map(r=>BASE+r)),c=CATS.find(x=>x[0]===p.c)||[];
document.title=p.n+' | SA Sports Sialkot';const md=document.querySelector('meta[name=description]');if(md)md.content=p.d.slice(0,155);
let L=P.filter(x=>x.id!==p.id&&x.c===p.c).sort((a,b)=>(b.s===p.s)-(a.s===p.s));if(L.length<6)L=L.concat(P.filter(x=>x.id!==p.id&&x.c!==p.c).slice(0,8-L.length));
const sel=m.querySelectorAll('[data-po]'),keep=[...sel].map(s=>s.value);
m.innerHTML=`<nav class="bc"><a href="${BASE}">Home</a> › ${c[3]?`<a href="${BASE+c[3]}/">${esc(c[1])}</a> › `:''}<span>${esc(p.n)}</span></nav>
<div class="pdg"><div><div class="gm" id="gm"><img src="${esc(imgs[0])}" alt="${esc(p.n)}"></div>${imgs.length>1?'<div class="ths">'+imgs.map((s,i)=>`<button type="button" data-gi="${esc(s)}" class="${i?'':'on'}"><img src="${esc(s)}" alt=""></button>`).join('')+'</div>':''}</div>
<div class="pdi"><h1>${esc(p.n)}</h1>${p.s?`<span class="tag">${esc(p.s)}</span>`:''}${p.best?'<span class="tag g">Bestseller</span>':''}${p.nw?'<span class="tag g">New</span>':''}
<div class="pr big">${pk(p.p)}${sale?` <s>${pk(p.old)}</s>`:''}</div>
<p class="avl ${so?'no':''}">${so?'Sold out':low?'Only '+p.stock+' left in stock':'In stock, ready to ship'}</p>
<p class="pdd">${esc(p.d)}</p>${p.sz?`<p><b>Size:</b> ${esc(p.sz)}</p>`:''}
${p.f.length?'<h3>Key features</h3><ul class="pf">'+p.f.map(t=>`<li>${esc(t)}</li>`).join('')+'</ul>':''}
${p.o.map((q,k)=>`<label class="po">${esc(q.n)}<select data-po="${k}">${q.v.map(z=>`<option>${esc(z)}</option>`).join('')}</select></label>`).join('')}
<div class="pdb"><button class="add" id="pdpAdd" ${so?'disabled':''}>${so?'Sold out':'Add to cart'}</button><a class="btn wab" id="pdpWa" target="_blank" rel="noopener">Order on WhatsApp</a></div>
<ul class="trust"><li>Made in Sialkot by the manufacturer</li><li>Cash on delivery across Pakistan</li><li>Worldwide delivery</li><li>7-day return and exchange</li></ul></div></div>
${L.length?`<section class="rel"><h2>Related products</h2>${car(L.map(card).join(''))}</section>`:''}`;
m.querySelectorAll('[data-po]').forEach((s,k)=>{if(keep[k])s.value=keep[k]});
$('#pdpWa').href=wl('Hello SA Sports, I am interested in '+p.n+' ('+pkr(p.p)+'). '+location.href);
const g=$('#gm');g.onmousemove=e=>{const r=g.getBoundingClientRect();g.firstChild.style.transformOrigin=((e.clientX-r.left)/r.width*100)+'% '+((e.clientY-r.top)/r.height*100)+'%'};
let e=document.getElementById('ld-p');if(!e){e=document.createElement('script');e.type='application/ld+json';e.id='ld-p';document.head.appendChild(e)}
e.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Product',name:p.n,description:p.d,image:imgs.map(s=>new URL(s,location.href).href),brand:{'@type':'Brand',name:'SA Sports'},offers:{'@type':'Offer',url:location.href,priceCurrency:'PKR',price:String(p.p),availability:so?'https://schema.org/OutOfStock':'https://schema.org/InStock'}})}
function pdpAdd(){const p=PM[new URLSearchParams(location.search).get('p')];if(!p||p.stock===0)return;const ch=$$('#pdp select[data-po]').map((s,k)=>p.o[k].n+': '+s.value);let key=p.id;if(ch.length)key=p.id+'~'+ch.join(', ').replace(/[^\w ,:.\-]/g,'');ens(key);add(key);$('#cart').classList.add('open')}
/* cart (shared between all pages through localStorage) */
let cart={};try{cart=JSON.parse(localStorage.getItem('sa_cart')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('sa_cart',JSON.stringify(cart))}catch(e){}};
function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('on');setTimeout(()=>x.classList.remove('on'),1600)}
function add(i,n=1){const p=PM[i];if(!p)return;let q=(cart[i]||0)+n;if(n>0&&p.stock===0){toast('Sold out');return}if(n>0&&p.stock!=null&&q>p.stock){q=p.stock;toast('Only '+p.stock+' available')}else if(n>0)toast('Added to cart');if(q<=0)delete cart[i];else cart[i]=q;save();drawCart()}
function drawCart(){Object.keys(cart).forEach(ens);if(P.length)Object.keys(cart).forEach(k=>{if(!PM[k])delete cart[k]});const ids=Object.keys(cart).filter(i=>PM[i]);let t=0,n=0;
$('#ci').innerHTML=ids.length?ids.map(i=>{const p=PM[i],q=cart[i];t+=p.p*q;n+=q;return `<div class="it"><img src="${esc(p.image)}" alt=""><div><b>${esc(p.n)}</b><div class="q"><button onclick="add('${i}',-1)" aria-label="Less">−</button>${q}<button onclick="add('${i}',1)" aria-label="More">+</button></div></div><b>${pk(p.p*q)}</b></div>`}).join(''):'<p class="note" style="padding:30px 0">Your cart is empty. Add something from the collection.</p>';
$('#tot').textContent=pk(t);$('#cn').textContent=n;$('#cf').style.display=ids.length?'':'none'}
$('#openCart').onclick=()=>$('#cart').classList.add('open');$('#closeCart').onclick=()=>$('#cart').classList.remove('open');
$('#go').onclick=()=>{const ids=Object.keys(cart).filter(i=>PM[i]);if(!ids.length)return;const f={n:$('#fn').value.trim(),p:$('#fp').value.trim(),c:$('#fc').value.trim(),a:$('#fa').value.trim()};
if(!f.n||!f.p||!f.c||!f.a){toast('Please fill name, phone, city and address');return}
let t=0;const lines=ids.map((i,k)=>{const p=PM[i],q=cart[i];t+=p.p*q;return `${k+1}. ${p.n} x${q} = ${pkr(p.p*q)}`}),oid='SA-'+Date.now().toString().slice(-6);
const m=`*NEW ORDER ${oid} | SA Sports website*\n\n${lines.join('\n')}\n\n*Total: ${pkr(t)}*${CUR!=='PKR'?' (about '+pk(t)+')':''}\n\n*Name:* ${f.n}\n*Phone:* ${f.p}\n*City:* ${f.c}\n*Address:* ${f.a}\n*Payment:* ${payTxt()}${$('#fm').value.trim()?'\n*Notes:* '+$('#fm').value.trim():''}`;
window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`,'_blank');cart={};save();drawCart();$('#cart').classList.remove('open');toast('Order ready in WhatsApp. Press Send there.')};
const wl=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
[['waTop','Hello SA Sports, I would like to place an order.'],['waGuide','Hello SA Sports, please recommend a bat. My height/weight/style: '],['waFoot','Hello SA Sports,'],['waFloat','Hello SA Sports, I have a question.']].forEach(([id,t])=>{const a=$('#'+id);if(a){a.href=wl(t);a.target='_blank';a.rel='noopener'}});

const cs=$('#cur');if(cs){cs.value=CUR;cs.onchange=()=>{CUR=cs.value;try{localStorage.setItem('sa_cur',CUR)}catch(e){};redraw();drawCart()}}
const nl=$('#nl');if(nl)nl.onsubmit=e=>{e.preventDefault();window.open(wl('Hello SA Sports, please add me to your club. My number / email: '+nl.elements[0].value),'_blank')};
const wc=$('#waCustom');if(wc){wc.href=wl('Hello SA Sports, I want a customized bat. Details: ');wc.target='_blank'}
fetch(BASE+'settings.json',{cache:'no-cache'}).then(r=>r.json()).then(s=>{['USD','GBP','EUR'].forEach(k=>{const v=+s[k.toLowerCase()];if(v>0)RATES[k]=v});const w=$('#wsnote');if(w&&s.wholesale_note)w.textContent=s.wholesale_note;
if(/^\d{8,15}$/.test(String(s.whatsapp||''))){WA=String(s.whatsapp);$$('a[href*="wa.me/"]').forEach(l=>l.href=l.href.replace(/wa\.me\/\d+/,'wa.me/'+WA))}
if(s.phone_display)$$('[data-phone]').forEach(e=>e.textContent=s.phone_display);if(s.footer_note)$$('[data-foot]').forEach(e=>e.textContent=s.footer_note);
if($('#hero')){if(s.seo_title)document.title=s.seo_title;const m=document.querySelector('meta[name=description]');if(m&&s.seo_description)m.content=s.seo_description}redraw();drawCart()}).catch(()=>{});
fetch(BASE+'home.json',{cache:'no-cache'}).then(r=>r.json()).then(d=>{H=d;hR=1;setAnn();redraw()}).catch(()=>{});
const rv=$('#revList');if(rv)fetch(BASE+'reviews.json',{cache:'no-cache'}).then(r=>r.json()).then(d=>{const L=(d.reviews||[]).filter(x=>x&&x.name&&x.text);if(!L.length)return;rv.innerHTML=L.map(x=>{const n=Math.max(1,Math.min(5,+x.rating||5));return `<div class="rev"><span class="stars" aria-label="${n} out of 5">${'★'.repeat(n)}${'☆'.repeat(5-n)}</span><p>${esc(x.text)}</p><b>${esc(x.name)}</b><small>${esc(x.city||'')}</small></div>`}).join('');$('#reviews').hidden=false}).catch(()=>{});
const ws=$('#wsForm');if(ws)ws.onsubmit=e=>{e.preventDefault();const g=n=>(ws.elements[n].value||'').trim(),cats=[...ws.querySelectorAll('input[name=cat]:checked')].map(c=>c.value).join(', ');window.open(wl(`Hello SA Sports, I would like WHOLESALE rates.\n\nName: ${g('n')}\nShop / business: ${g('b')}\nCity / country: ${g('c')}\nInterested in: ${cats||'-'}\nApproximate quantity: ${g('q')||'-'}${g('m')?'\nNote: '+g('m'):''}`),'_blank')};
const tr=$('#trForm');if(tr)tr.onsubmit=e=>{e.preventDefault();const g=n=>(tr.elements[n].value||'').trim();window.open(wl(`Hello SA Sports, please tell me the status of my order ${g('o')}.${g('n')?'\nName: '+g('n'):''}${g('t')?'\nCourier tracking number (if any): '+g('t'):''}`),'_blank')};
fetch(BASE+'products.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>setProducts(d.products)).catch(()=>setProducts(FALLBACK.map(a=>({category:a[0],sub:a[1],image:'img/'+a[2]+'.webp',name:a[3],price:a[4],description:a[5]}))));

/* payments: the owner's accounts come from payments.json (edited in /admin) */
const CARD='Visa / Mastercard debit card';let PAY={cod:true,cod_label:'Cash on delivery (Pakistan)',international:true,methods:[],instructions:''};
const payTxt=()=>{const v=($('#fy')||{}).value||'';return v+((v&&v!==PAY.cod_label&&!/^International/.test(v))?' (customer will send the payment screenshot here)':'')};
function payInit(){const y=$('#fy');if(!y)return;const M=(PAY.methods||[]).filter(m=>m&&m.enabled!==false&&(m.number||m.iban)),L=[];
if(PAY.cod!==false)L.push(PAY.cod_label||'Cash on delivery (Pakistan)');if(PAY.card_enabled&&/^https:\/\//.test(PAY.card_link||''))L.push(CARD);M.forEach(m=>L.push(m.type+' transfer'));if(PAY.international!==false)L.push('International order (payment arranged on WhatsApp)');
y.innerHTML=L.map(x=>`<option>${esc(x)}</option>`).join('');let b=$('#payinfo');if(!b){y.insertAdjacentHTML('afterend','<div id="payinfo" class="payinfo" hidden></div>');b=$('#payinfo')}
const show=()=>{if(y.value===CARD){const tt=Object.keys(cart).filter(i=>PM[i]).reduce((q,i)=>q+PM[i].p*cart[i],0);b.innerHTML=`<b>Pay by Visa / Mastercard debit card</b><div>Total to pay: <span>${pkr(tt)}</span></div><a class="cpy" href="${esc(PAY.card_link)}" target="_blank" rel="noopener">Pay by card</a><p class="note">${esc(PAY.card_note||'Enter exactly the total above on the secure payment page, then send the receipt screenshot in the WhatsApp chat that opens. We confirm the payment and start your order.')}</p>`;b.hidden=false;return}const m=M.find(x=>x.type+' transfer'===y.value);if(!m){b.hidden=true;return}const rows=[['Account title',m.account_title],[m.type==='Bank Account'?'Bank':'',m.bank_name],['Account / wallet number',m.number],['IBAN',m.iban]].filter(r=>r[1]);
b.innerHTML=`<b>${esc(m.type)}</b>${rows.map(r=>`<div>${r[0]?esc(r[0])+': ':''}<span>${esc(r[1])}</span></div>`).join('')}<button type="button" class="cpy">Copy number</button><p class="note">${esc(PAY.instructions||'Send the exact total, then send the payment screenshot in the WhatsApp chat that opens. We start your order after we confirm the payment.')}</p>`;b.hidden=false;b.querySelector('.cpy').onclick=()=>{const t=m.number||m.iban;navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>toast('Copied'))}};y.onchange=show;window.__showPay=show;show()}
payInit();fetch(BASE+'payments.json',{cache:'no-cache'}).then(r=>r.json()).then(d=>{PAY=Object.assign(PAY,d);payInit()}).catch(()=>{});

const _dc=drawCart;drawCart=function(){_dc();if(window.__showPay)window.__showPay()};

/* editable page texts (pages.json, edited in /admin) */
fetch(BASE+'pages.json',{cache:'no-cache'}).then(r=>r.json()).then(d=>{$$('[data-t]').forEach(e=>{const v=e.dataset.t.split('.').reduce((o,k)=>o&&o[k],d);if(v)e.textContent=v});
$$('[data-body]').forEach(e=>{const v=(e.dataset.body.split('.').reduce((o,k)=>o&&o[k],d)||'');if(v)e.innerHTML=mdx(v)})}).catch(()=>{});
function mdx(t){return String(t).split(/\n\s*\n/).map(b=>{b=b.trim();if(/^##\s/.test(b))return '<h2>'+esc(b.replace(/^##\s*/,''))+'</h2>';if(/^[-*]\s/.test(b))return '<ul>'+b.split('\n').map(l=>'<li>'+esc(l.replace(/^[-*]\s*/,''))+'</li>').join('')+'</ul>';return '<p>'+esc(b).replace(/\n/g,'<br>')+'</p>'}).join('')}
