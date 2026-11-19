const WA='923434762195',$=s=>document.querySelector(s);
let CUR='PKR';try{CUR=localStorage.getItem('sa_cur')||'PKR'}catch(e){}
let RATES={USD:0.0036,GBP:0.0027,EUR:0.0031};const SYM={USD:'$',GBP:'£',EUR:'€'};
const pkr=n=>'Rs. '+n.toLocaleString('en-PK'),pk=n=>(CUR==='PKR'||!RATES[CUR])?pkr(n):SYM[CUR]+(n*RATES[CUR]).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const BASE=document.body.dataset.base||'',PAGECAT=document.body.dataset.cat||'';
/* categories: [id, name, background key, sub-categories, folder] */
const CATS=[['bats','Bats','bat',['Premium','Classic'],'bats'],['pads','Pads','stad',['Classic','Colour','Limited'],'pads'],['gloves','Gloves','keep',['Wicketkeeping','Batting'],'gloves'],['balls','Balls','ball',['Match','Practice'],'balls'],['protect','Helmets & Guards','macro',['Helmets','Guards'],'helmets-guards'],['kits','Bags & Kits','kit',['Kit Bags','Full Kits','Accessories'],'bags-kits']];
const SUBBG={Wicketkeeping:'keep',Batting:'bat',Helmets:'bat',Guards:'macro',Practice:'bowl',Premium:'bat',Classic:'stad','Full Kits':'kit'};
let P=[],PM={};
/* Products live in products.json (edited from /admin). FALLBACK is used only if products.json cannot be loaded. */
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
const SITE='https://www.sasports.store/',esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function setProducts(raw){const seen={};P=(raw||[]).filter(x=>x&&x.name&&!x.hidden).map((x,i)=>{let id=slug(x.name)||('p'+i);if(seen[id])id+='-'+i;seen[id]=1;const st=(x.stock===''||x.stock==null||isNaN(+x.stock))?null:Math.max(0,+x.stock),rel=String(x.image||'').replace(/^\//,'');return{id,c:x.category,s:x.sub,rel,image:BASE+rel,n:String(x.name),p:+x.price||0,d:String(x.description||''),stock:st}});PM={};P.forEach(p=>PM[p.id]=p);
if(PAGECAT){render();injectLD()}else{document.querySelectorAll('[data-n]').forEach(e=>{e.textContent=P.filter(p=>p.c===e.dataset.n).length+' products'})}drawCart()}
function injectLD(){const c=CATS.find(x=>x[0]===PAGECAT);let e=document.getElementById('ld-items');if(!e){e=document.createElement('script');e.type='application/ld+json';e.id='ld-items';document.head.appendChild(e)}e.textContent=JSON.stringify({'@context':'https://schema.org','@type':'ItemList',name:'SA Sports '+c[1],itemListElement:P.filter(p=>p.c===PAGECAT).map((p,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'Product',name:p.n,description:p.d,image:SITE+p.rel,brand:{'@type':'Brand',name:'SA Sports'},offers:{'@type':'Offer',url:SITE+c[4]+'/',priceCurrency:'PKR',price:String(p.p),availability:p.stock===0?'https://schema.org/OutOfStock':'https://schema.org/InStock'}}}))})}
const mob=matchMedia('(max-width:860px)'),HAS=['bat','bowl','keep','stad','kit'];
const bgf=k=>BASE+'img/'+(mob.matches&&HAS.includes(k)?'m-':'h-')+k+'.webp';
/* crossfading background: the new layer fades in while the old one fades out, so there is never a visible cut */
let layer=0,cur='',cycle,HERO=['bat','keep','bowl','kit','stad','ball'],hi=0,heroOn=true;
function setBg(k){if(k===cur)return;cur=k;const im=new Image(),u=bgf(k);im.onload=()=>{if(k!==cur)return;layer^=1;const a=$('#b'+layer),o=$('#b'+(layer^1));a.style.backgroundImage=`url(${u})`;a.classList.add('on');o.classList.remove('on')};im.src=u}
mob.addEventListener('change',()=>{const k=cur;cur='';setBg(k)});
$('#dust').innerHTML=Array.from({length:26},()=>`<i style="left:${Math.random()*100}%;animation-duration:${9+Math.random()*12}s;animation-delay:-${Math.random()*14}s;transform:scale(${.6+Math.random()*1.6})"></i>`).join('');
if($('#ring')){
 setBg(HERO[0]);cycle=setInterval(()=>{if(heroOn)setBg(HERO[++hi%HERO.length])},7500);
 new IntersectionObserver(e=>{heroOn=e[0].isIntersecting;if(heroOn)setBg(HERO[hi%HERO.length])},{threshold:.35}).observe($('.hero'));
 const RING=['bat-apex','pads-red','wk-gloves','helmet','ball-set','bag-player','bat-le','pads-blue'];
 $('#ring').innerHTML=RING.map((r,i)=>`<a href="#cats" style="--i:${i};--r:${Math.round(innerWidth<860?210:310)}px"><div><img src="img/${r}.webp" alt="" loading="eager"></div></a>`).join('');
 $('#mq').innerHTML=Array(2).fill(['Premium cricket bats','Custom made to your game','Complete gear','Worldwide delivery','Sialkot, Pakistan'].map(t=>`<span>${t}</span><span>◆</span>`).join('')).join('');
 const tl=$('#tilt'),st=$('#stage');st.addEventListener('pointermove',e=>{const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tl.style.transform=`rotateX(${-y*16+8}deg) rotateY(${x*30}deg)`});tl.style.transform='rotateX(8deg)';st.addEventListener('pointerleave',()=>tl.style.transform='rotateX(8deg)');
}else if(PAGECAT){const c=CATS.find(x=>x[0]===PAGECAT);if(c)setBg(c[2])}else if(document.body.dataset.bg){setBg(document.body.dataset.bg)}
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card,.cat');if(!c||e.pointerType==='touch')return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateX(${-y*10}deg) rotateY(${x*12}deg) translateZ(8px)`});
document.addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest('.card,.cat');if(c)c.style.transform=''});
/* category page: products of this category only, with sub-category tabs */
let sub='';
function render(){const c=CATS.find(x=>x[0]===PAGECAT);if(!c||!$('#grid'))return;const L=P.filter(p=>p.c===PAGECAT&&(!sub||p.s===sub));
$('#tabS').innerHTML=[['','All']].concat(c[3].map(s=>[s,s])).map(t=>`<button class="${sub===t[0]?'on':''}" data-sub="${esc(t[0])}">${esc(t[1])}</button>`).join('');
$('#grid').innerHTML=L.map(p=>{const so=p.stock===0,low=p.stock!=null&&p.stock>0&&p.stock<=10;return `<article class="card"><div class="im" data-pv="${esc(p.id)}">${so?'<span class="bdg so">Sold out</span>':low?`<span class="bdg">Only ${p.stock} left</span>`:''}<img src="${esc(p.image)}" alt="${esc(p.n)}" loading="lazy"></div><div class="t"><h3>${esc(p.n)}</h3><p>${esc(p.d)}</p><div class="row"><span class="pr">${pk(p.p)}</span><button class="add" data-add="${esc(p.id)}"${so?' disabled':''}>${so?'Sold out':'Add to cart'}</button></div></div></article>`}).join('')||'<p class="sub">No products here yet.</p>'}
document.addEventListener('click',e=>{const s=e.target.closest('[data-sub]'),a=e.target.closest('[data-add]'),v=e.target.closest('[data-pv]');
if(s){sub=s.dataset.sub;render();const c=CATS.find(x=>x[0]===PAGECAT);if(c)setBg(SUBBG[sub]||c[2])}if(a&&!a.disabled){add(a.dataset.add)}if(v){pv(v.dataset.pv)}});
/* product viewer */
let pid='';function pv(i){const p=PM[i];if(!p)return;pid=i;$('#pi').src=p.image;$('#pi').alt=p.n;$('#pa').disabled=p.stock===0;$('#pa').textContent=p.stock===0?'Sold out':'Add to cart';$('#pn').textContent=p.n;$('#pd').textContent=p.d;$('#pp').textContent=pk(p.p);$('#pv').showModal()}
$('#px').onclick=()=>$('#pv').close();$('#pv').addEventListener('click',e=>{if(e.target.id==='pv')e.target.close()});$('#pa').onclick=()=>{add(pid);$('#pv').close()};
/* cart (shared between all pages through localStorage) */
let cart={};try{cart=JSON.parse(localStorage.getItem('sa_cart')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('sa_cart',JSON.stringify(cart))}catch(e){}};
function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('on');setTimeout(()=>x.classList.remove('on'),1600)}
function add(i,n=1){const p=PM[i];if(!p)return;let q=(cart[i]||0)+n;if(n>0&&p.stock===0){toast('Sold out');return}if(n>0&&p.stock!=null&&q>p.stock){q=p.stock;toast('Only '+p.stock+' available')}else if(n>0)toast('Added to cart');if(q<=0)delete cart[i];else cart[i]=q;save();drawCart()}
function drawCart(){if(P.length)Object.keys(cart).forEach(k=>{if(!PM[k])delete cart[k]});const ids=Object.keys(cart).filter(i=>PM[i]);let t=0,n=0;
$('#ci').innerHTML=ids.length?ids.map(i=>{const p=PM[i],q=cart[i];t+=p.p*q;n+=q;return `<div class="it"><img src="${esc(p.image)}" alt=""><div><b>${esc(p.n)}</b><div class="q"><button onclick="add('${i}',-1)" aria-label="Less">−</button>${q}<button onclick="add('${i}',1)" aria-label="More">+</button></div></div><b>${pk(p.p*q)}</b></div>`}).join(''):'<p class="note" style="padding:30px 0">Your cart is empty. Add something from the collection.</p>';
$('#tot').textContent=pk(t);$('#cn').textContent=n;$('#cf').style.display=ids.length?'':'none'}
$('#openCart').onclick=()=>$('#cart').classList.add('open');$('#closeCart').onclick=()=>$('#cart').classList.remove('open');
$('#go').onclick=()=>{const ids=Object.keys(cart).filter(i=>PM[i]);if(!ids.length)return;const f={n:$('#fn').value.trim(),p:$('#fp').value.trim(),c:$('#fc').value.trim(),a:$('#fa').value.trim()};
if(!f.n||!f.p||!f.c||!f.a){toast('Please fill name, phone, city and address');return}
let t=0;const lines=ids.map((i,k)=>{const p=PM[i],q=cart[i];t+=p.p*q;return `${k+1}. ${p.n} x${q} = ${pkr(p.p*q)}`}),oid='SA-'+Date.now().toString().slice(-6);
const m=`*NEW ORDER ${oid} | SA Sports website*\n\n${lines.join('\n')}\n\n*Total: ${pkr(t)}*${CUR!=='PKR'?' (about '+pk(t)+')':''}\n\n*Name:* ${f.n}\n*Phone:* ${f.p}\n*City:* ${f.c}\n*Address:* ${f.a}\n*Payment:* ${$('#fy').value}${$('#fm').value.trim()?'\n*Notes:* '+$('#fm').value.trim():''}`;
window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`,'_blank');cart={};save();drawCart();$('#cart').classList.remove('open');toast('Order ready in WhatsApp. Press Send there.')};
const wl=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
[['waTop','Hello SA Sports, I would like to place an order.'],['waGuide','Hello SA Sports, please recommend a bat. My height/weight/style: '],['waFoot','Hello SA Sports,'],['waFloat','Hello SA Sports, I have a question.']].forEach(([id,t])=>{const a=$('#'+id);if(a){a.href=wl(t);a.target='_blank';a.rel='noopener'}});
const cs=$('#cur');if(cs){cs.value=CUR;cs.onchange=()=>{CUR=cs.value;try{localStorage.setItem('sa_cur',CUR)}catch(e){};if(PAGECAT)render();drawCart()}}
fetch(BASE+'settings.json',{cache:'no-cache'}).then(r=>r.json()).then(s=>{['USD','GBP','EUR'].forEach(k=>{const v=+s[k.toLowerCase()];if(v>0)RATES[k]=v});const w=$('#wsnote');if(w&&s.wholesale_note)w.textContent=s.wholesale_note;if(PAGECAT)render();drawCart()}).catch(()=>{});
const rv=$('#revList');if(rv)fetch(BASE+'reviews.json',{cache:'no-cache'}).then(r=>r.json()).then(d=>{const L=(d.reviews||[]).filter(x=>x&&x.name&&x.text);if(!L.length)return;rv.innerHTML=L.map(x=>{const n=Math.max(1,Math.min(5,+x.rating||5));return `<div class="rev"><span class="stars" aria-label="${n} out of 5">${'★'.repeat(n)}${'☆'.repeat(5-n)}</span><p>${esc(x.text)}</p><b>${esc(x.name)}</b><small>${esc(x.city||'')}</small></div>`}).join('');$('#reviews').hidden=false}).catch(()=>{});
const ws=$('#wsForm');if(ws)ws.onsubmit=e=>{e.preventDefault();const g=n=>(ws.elements[n].value||'').trim(),cats=[...ws.querySelectorAll('input[name=cat]:checked')].map(c=>c.value).join(', ');window.open(wl(`Hello SA Sports, I would like WHOLESALE rates.\n\nName: ${g('n')}\nShop / business: ${g('b')}\nCity / country: ${g('c')}\nInterested in: ${cats||'-'}\nApproximate quantity: ${g('q')||'-'}${g('m')?'\nNote: '+g('m'):''}`),'_blank')};
const tr=$('#trForm');if(tr)tr.onsubmit=e=>{e.preventDefault();const g=n=>(tr.elements[n].value||'').trim();window.open(wl(`Hello SA Sports, please tell me the status of my order ${g('o')}.${g('n')?'\nName: '+g('n'):''}${g('t')?'\nCourier tracking number (if any): '+g('t'):''}`),'_blank')};
fetch(BASE+'products.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>setProducts(d.products)).catch(()=>setProducts(FALLBACK.map(a=>({category:a[0],sub:a[1],image:'img/'+a[2]+'.webp',name:a[3],price:a[4],description:a[5]}))));
