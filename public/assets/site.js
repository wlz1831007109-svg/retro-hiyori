(function(){
const script=document.currentScript?.src||'';
const root=script.includes('/assets/')?script.split('/assets/')[0]+'/':'';
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const href=p=>root+p;

/* Load phase 06 global refinements on every page that already loads site.js. */
if(!document.querySelector('link[data-phase6]')){
  const l=document.createElement('link'); l.rel='stylesheet'; l.href=href('assets/phase6-commerce.css'); l.dataset.phase6='1'; document.head.appendChild(l);
}

/* One navigation system across the whole archive / shop. */
const nav=$('.nav');
if(nav){nav.innerHTML=`
<a href="${href('works.html')}" data-section="works">作品を探す</a>
<a href="${href('history.html')}" data-section="history">中国書画史</a>
<a href="${href('artists.html')}" data-section="artists">画家事典</a>
<a href="${href('learn.html')}" data-section="learn">中国書画を知る</a>
<a href="${href('wholesale.html')}" data-section="wholesale">卸売</a>`;}
const drawer=$('.mobile-drawer');
if(drawer){drawer.innerHTML=`<button class="drawer-close" aria-label="閉じる">×</button>
<a href="${href('index.html')}">ホーム</a><a href="${href('works.html')}">作品を探す</a><a href="${href('history.html')}">中国書画史</a><a href="${href('artists.html')}">画家事典</a><a href="${href('formats.html')}">書画の形式</a><a href="${href('learn.html')}">中国書画を知る</a><a href="${href('journal.html')}">文化読みもの</a><a href="${href('wholesale.html')}">卸売・大口注文</a><a href="${href('about.html')}">Retro日和について</a><a href="${href('guide.html')}">ご利用案内</a><a href="${href('contact.html')}">お問い合わせ</a>`;}
const header=$('.site-header');
if(header&&!$('.culture-subnav')){
  const sub=document.createElement('div'); sub.className='culture-subnav';
  sub.innerHTML=`<div class="wrap"><a href="${href('formats.html')}" data-sub="formats">書画の形式</a><a href="${href('journal.html')}" data-sub="journal">文化読みもの</a><a href="${href('about.html')}" data-sub="about">私たちについて</a><a href="${href('guide.html')}" data-sub="guide">ご利用案内</a><a href="${href('contact.html')}" data-sub="contact">お問い合わせ</a></div>`;
  header.insertAdjacentElement('afterend',sub);
}
const path=location.pathname.toLowerCase();
let sec=''; if(path.includes('/products/')||path.endsWith('/works.html'))sec='works'; else if(path.includes('/dynasties/')||path.endsWith('/history.html'))sec='history'; else if(path.includes('/artists/')||path.endsWith('/artists.html'))sec='artists'; else if(path.endsWith('/learn.html')||path.endsWith('/formats.html')||path.endsWith('/journal.html'))sec='learn'; else if(path.endsWith('/wholesale.html'))sec='wholesale';
if(sec) $(`.nav [data-section="${sec}"]`)?.classList.add('active');
['formats','journal','about','guide','contact'].forEach(k=>{if(path.endsWith('/'+k+'.html'))$(`[data-sub="${k}"]`)?.classList.add('active')});

/* Unified footer copy and links. */
const foot=$('.footer .foot-grid');
if(foot){foot.innerHTML=`<div><a class="brand invert" href="${href('index.html')}"><span class="seal-logo">日和</span><span><b>Retro日和</b><small>中国書画専門店</small></span></a><p class="foot-note">中国書画を、知る。選ぶ。つなぐ。<br>文化を学べる専門店として、肉筆作品・工芸品・卸売まで幅広くご案内します。</p><div class="foot-trust"><span>肉筆 / 工芸品を区分表示</span><span>在庫確認後にお支払い</span><span>卸売・大口相談対応</span></div></div><div><div class="foot-title">EXPLORE</div><a href="${href('works.html')}">作品を探す</a><a href="${href('history.html')}">中国書画史</a><a href="${href('artists.html')}">画家事典</a><a href="${href('formats.html')}">書画の形式</a><a href="${href('journal.html')}">文化読みもの</a></div><div><div class="foot-title">SERVICE</div><a href="${href('wholesale.html')}">卸売・大口注文</a><a href="${href('guide.html')}">ご利用案内</a><a href="${href('contact.html')}">お問い合わせ</a><a href="${href('cart.html')}">注文籠</a><a class="social-link" href="https://www.instagram.com/retro_hiyori/" target="_blank" rel="noopener">Instagram @retro_hiyori</a></div><div><div class="foot-title">POLICY</div><a href="${href('about.html')}">Retro日和について</a><a href="${href('legal.html')}">特定商取引法に基づく表記</a><a href="${href('privacy.html')}">プライバシーポリシー</a><a href="${href('returns.html')}">返品・キャンセル</a></div>`;}
const copyright=$('.footer .copyright'); if(copyright){copyright.innerHTML='<span>© 2026 Retro日和. All rights reserved.</span><span>Kobe, Japan / Chinese Painting & Calligraphy Archive + Shop</span>';}

/* drawers / search */
function closeLayers(){ $('.mobile-drawer')?.classList.remove('open'); $('.search-panel')?.classList.remove('open'); document.body.classList.remove('no-scroll'); }
$('.menu-btn')?.addEventListener('click',()=>{$('.mobile-drawer')?.classList.add('open');document.body.classList.add('no-scroll')});
$('.drawer-close')?.addEventListener('click',closeLayers);
$$('.search-open').forEach(b=>b.addEventListener('click',()=>{$('.search-panel')?.classList.add('open');document.body.classList.add('no-scroll');setTimeout(()=>$('#global-search')?.focus(),50)}));
$('.search-close')?.addEventListener('click',closeLayers);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLayers()});
$('.search-panel')?.addEventListener('click',e=>{if(e.target.classList.contains('search-panel'))closeLayers()});
const inp=$('#global-search'),res=$('#search-results');
if(inp&&res){inp.addEventListener('input',()=>{let q=inp.value.trim().toLowerCase();res.innerHTML='';if(!q)return;let arr=(window.RETRO_SEARCH||[]).filter(x=>(x.title+' '+x.sub+' '+x.type).toLowerCase().includes(q)).slice(0,12);if(!arr.length){res.innerHTML='<div style="padding:22px 0;color:#746a60;font-size:12px">該当する作品・画家・時代が見つかりませんでした。</div>';return}arr.forEach(x=>{let a=document.createElement('a');a.className='search-result';a.href=href(x.url);a.innerHTML=(x.img?`<img src="${href(x.img)}" alt="">`:'<div class="search-mark">日和</div>')+`<div><small>${x.type}</small><b>${x.title}</b><small>${x.sub||''}</small></div>`;res.appendChild(a)})})}

/* cart */
function cart(){try{return JSON.parse(localStorage.getItem('retro_cart')||'[]')}catch(e){return[]}}
function save(c){localStorage.setItem('retro_cart',JSON.stringify(c));updateCount()}
function updateCount(){let n=cart().reduce((a,b)=>a+(b.qty||1),0);$$('[data-cart-count]').forEach(e=>e.textContent=n)} updateCount();
if(document.body.dataset.clearCart==='true'){localStorage.removeItem('retro_cart');updateCount();}
$$('[data-add-cart]').forEach(b=>b.addEventListener('click',()=>{let sku=b.dataset.addCart,c=cart(),f=c.find(x=>x.sku===sku);if(f)f.qty=(f.qty||1)+1;else c.push({sku,qty:1});save(c);const old=b.textContent;b.textContent='注文籠に追加しました';setTimeout(()=>b.textContent=old||'注文籠に入れる',1200)}));
const main=$('[data-main]');$$('[data-thumb]').forEach(t=>t.addEventListener('click',()=>{if(main)main.src=t.src}));
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');let f=b.dataset.filter;$$('[data-product-card]').forEach(c=>{c.style.display=(f==='all'||(c.dataset.tags||'').includes(f))?'block':'none'})}));
const cartBox=$('#cart-items');
if(cartBox){const db=window.RETRO_PRODUCTS||[];let c=cart();function draw(){cartBox.innerHTML='';let total=0;if(!c.length){cartBox.innerHTML=`<div class="empty"><div class="eyebrow">YOUR BASKET</div><h2 style="font-weight:400">注文籠は空です。</h2><p>作品ページから、気になる作品をまとめて追加できます。</p><a class="btn" href="${href('works.html')}">作品を見る</a></div>`;$('#cart-total').textContent='¥0';if($('#order-summary'))$('#order-summary').value='';if($('#order-total-field'))$('#order-total-field').value='¥0';return}c.forEach(it=>{let p=db.find(x=>x.sku===it.sku);if(!p)return;let qty=it.qty||1;total+=p.price*qty;let d=document.createElement('div');d.className='cart-item';d.innerHTML=`<img src="${href(p.img)}" alt=""><div><div class="meta">${p.sku}${p.method?' / '+p.method:''}</div><b>${p.title}</b><div><button type="button" data-minus="${p.sku}" aria-label="数量を減らす">−</button> <span>${qty}</span> <button type="button" data-plus="${p.sku}" aria-label="数量を増やす">＋</button> <button type="button" data-remove="${p.sku}">削除</button></div></div><div class="cart-price">¥${(p.price*qty).toLocaleString()}</div>`;cartBox.appendChild(d)});$('#cart-total').textContent='¥'+total.toLocaleString();if($('#order-total-field'))$('#order-total-field').value='¥'+total.toLocaleString();if($('#order-summary'))$('#order-summary').value=c.map(it=>{let p=db.find(x=>x.sku===it.sku);return p?`${p.sku} ${p.title} × ${it.qty||1} = ¥${(p.price*(it.qty||1)).toLocaleString()}`:''}).filter(Boolean).join('\n')+`\n合計 ¥${total.toLocaleString()}`;$$('[data-plus]').forEach(b=>b.onclick=()=>{let f=c.find(x=>x.sku===b.dataset.plus);if(f)f.qty=(f.qty||1)+1;save(c);draw()});$$('[data-minus]').forEach(b=>b.onclick=()=>{let f=c.find(x=>x.sku===b.dataset.minus);if(f)f.qty=Math.max(1,(f.qty||1)-1);save(c);draw()});$$('[data-remove]').forEach(b=>b.onclick=()=>{c=c.filter(x=>x.sku!==b.dataset.remove);save(c);draw()})}draw();
  $('#order-form')?.addEventListener('submit',e=>{const status=$('#order-status');if(!cart().length){e.preventDefault();if(status)status.textContent='注文籠に作品を追加してから送信してください。';return}if(status)status.textContent='';});
}

/* Forms: disable duplicate submit after browser validation has passed. */
$$('form[data-formsubmit]').forEach(f=>f.addEventListener('submit',()=>{const b=f.querySelector('button[type="submit"]');if(b){b.dataset.original=b.textContent;b.textContent='送信中…';b.disabled=true;}}));
})();
