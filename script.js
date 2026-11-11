/* Shop-Logik: Routing, Produktliste, Warenkorb, Checkout-UI. Kein Build nötig. */
(function(){
"use strict";
const S=window.SHOP, L=window.LEGAL, $=s=>document.querySelector(s), main=$("#main");
const fmt=n=>new Intl.NumberFormat("de-AT",{style:"currency",currency:S.currency}).format(n);
// Alle Texte aus Daten werden escaped, damit kein HTML/JS eingeschleust werden kann.
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const state={q:"",cat:"",sort:"new"};

/* ---------- Warenkorb (nur Produkt-IDs und Mengen im localStorage) ---------- */
const KEY="shop_cart_v1";
function load(){try{const c=JSON.parse(localStorage.getItem(KEY));return Array.isArray(c)?c.filter(i=>i&&byId(i.id)&&Number.isInteger(i.qty)&&i.qty>0):[]}catch(e){return[]}}
function save(c){try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}updateCount()}
const byId=id=>S.products.find(p=>p.id===id);
function add(id){const c=load(),i=c.find(x=>x.id===id);i?i.qty=Math.min(i.qty+1,99):c.push({id,qty:1});save(c)}
function setQty(id,q){let c=load();q=Math.min(q,99);c=q<1?c.filter(x=>x.id!==id):c.map(x=>x.id===id?{id,qty:q}:x);save(c)}
const total=()=>load().reduce((s,i)=>s+byId(i.id).price*i.qty,0);
function updateCount(){$("#cartCount").textContent=load().reduce((s,i)=>s+i.qty,0)}

/* ---------- Bausteine ---------- */
const catName=id=>(S.categories.find(c=>c.id===id)||{name:id}).name;
function card(p){
  const rating=p.reviewCount>0&&p.rating?`<span class="badge">★ ${esc(p.rating)} (${esc(p.reviewCount)})</span>`:"";
  const old=p.oldPrice&&p.oldPrice>p.price?`<span class="old">${fmt(p.oldPrice)}</span>`:"";
  return `<article class="card"><a class="img" href="#/product/${esc(p.id)}"><img src="${esc(p.image)}" alt="Platzhalterbild: ${esc(p.name)}" loading="lazy"></a>
  <div class="body"><span class="badge">${esc(catName(p.category))}</span><h3><a href="#/product/${esc(p.id)}">${esc(p.name)}</a></h3>${rating}
  <div class="price">${fmt(p.price)}${old}</div><button class="btn" data-add="${esc(p.id)}">In den Warenkorb</button></div></article>`;
}
const byNew=(a,b)=>b.added.localeCompare(a.added);

/* ---------- Seiten ---------- */
function home(){
  const best=S.products.filter(p=>p.bestseller).slice(0,4), neu=[...S.products].filter(p=>p.isNew).sort(byNew).slice(0,4);
  return `<section class="hero"><div><h1>${esc(S.tagline)}</h1><p>Demo-Startseite. Ersetze Texte und Produkte in products.js durch deine echten Inhalte.</p><a class="btn" href="#/shop">Produkte ansehen</a></div>
  <div class="hero-art" role="img" aria-label="Platzhalter für Hero-Bild">Platzhalter für Hero-Bild</div></section>
  <section><h2>Kategorien</h2><div class="cats">${S.categories.map(c=>`<a class="cat" href="#/shop/${esc(c.id)}">${esc(c.name)}</a>`).join("")}</div></section>
  <section><h2>Bestseller</h2><p class="note">Demo-Kennzeichnung. Setze „bestseller“ nur bei belegbaren Verkaufszahlen.</p><br><div class="grid">${best.map(card).join("")}</div></section>
  <section><h2>Neuheiten</h2><div class="grid">${neu.map(card).join("")}</div></section>
  <section class="prose"><h2>Über die Marke</h2><p>Platzhaltertext. Erzähle hier wahrheitsgemäß, wofür deine Marke steht.</p><a class="btn ghost" href="#/page/ueber">Mehr erfahren</a></section>
  <section class="newsletter"><h2>Newsletter</h2><p>Vorbereitete Funktion: Anmeldung erst mit Backend und Einwilligung nach DSGVO möglich.</p>
  <form id="nl"><label class="sr" for="nlm">E-Mail</label><input id="nlm" type="email" placeholder="E-Mail-Adresse" required><button class="btn ghost" style="background:var(--accent-ink);color:var(--accent)">Anmelden</button></form><p id="nlmsg" role="status"></p></section>`;
}
function shop(){
  let list=S.products.filter(p=>(!state.cat||p.category===state.cat)&&(!state.q||(p.name+" "+p.description).toLowerCase().includes(state.q.toLowerCase())));
  list.sort(state.sort==="asc"?(a,b)=>a.price-b.price:state.sort==="desc"?(a,b)=>b.price-a.price:byNew);
  return `<section><h2>Shop</h2><div class="toolbar"><label class="sr" for="fc">Kategorie</label><select id="fc"><option value="">Alle Kategorien</option>${S.categories.map(c=>`<option value="${esc(c.id)}"${c.id===state.cat?" selected":""}>${esc(c.name)}</option>`).join("")}</select>
  <label class="sr" for="fs">Sortierung</label><select id="fs"><option value="new"${state.sort==="new"?" selected":""}>Neuheiten</option><option value="asc"${state.sort==="asc"?" selected":""}>Preis aufsteigend</option><option value="desc"${state.sort==="desc"?" selected":""}>Preis absteigend</option></select></div>
  ${state.q?`<p>Suche: „${esc(state.q)}“ <a href="#/shop" id="clr">zurücksetzen</a></p>`:""}
  ${list.length?`<div class="grid">${list.map(card).join("")}</div>`:`<p>Keine Produkte gefunden. Ändere Suche oder Filter.</p>`}</section>`;
}
function product(id){
  const p=byId(id); if(!p)return `<section><h2>Produkt nicht gefunden</h2><a class="btn" href="#/shop">Zum Shop</a></section>`;
  const old=p.oldPrice&&p.oldPrice>p.price?`<span class="old">${fmt(p.oldPrice)}</span>`:"";
  return `<section class="detail"><img src="${esc(p.image)}" alt="Platzhalterbild: ${esc(p.name)}"><div><span class="badge">${esc(catName(p.category))}</span><h1 style="font-size:2.2rem">${esc(p.name)}</h1>
  <p class="price" style="font-size:1.5rem">${fmt(p.price)}${old}</p><p>${esc(p.description)}</p><p class="muted" style="color:var(--muted)">Preis inkl. USt., zzgl. Versand [Versandkosten einzutragen].</p>
  <button class="btn" data-add="${esc(p.id)}">In den Warenkorb</button> <a class="btn ghost" href="#/shop">Zurück</a></div></section>`;
}
function cart(){
  const c=load(); if(!c.length)return `<section><h2>Warenkorb</h2><p>Dein Warenkorb ist leer.</p><a class="btn" href="#/shop">Produkte ansehen</a></section>`;
  return `<section><h2>Warenkorb</h2><table class="table"><thead><tr><th>Produkt</th><th>Menge</th><th>Summe</th></tr></thead><tbody>${c.map(i=>{const p=byId(i.id);return `<tr><td><a href="#/product/${esc(p.id)}">${esc(p.name)}</a><br>${fmt(p.price)}</td>
  <td><span class="qty"><button data-q="${esc(p.id)}" data-d="-1" aria-label="Menge verringern">−</button><span>${i.qty}</span><button data-q="${esc(p.id)}" data-d="1" aria-label="Menge erhöhen">+</button></span> <button class="btn ghost" data-rm="${esc(p.id)}">Entfernen</button></td><td>${fmt(p.price*i.qty)}</td></tr>`}).join("")}</tbody></table>
  <p class="price" style="font-size:1.3rem;text-align:right">Gesamt: ${fmt(total())}</p><p style="text-align:right"><a class="btn" href="#/checkout">Zur Kasse</a></p></section>`;
}
function checkout(){
  if(!load().length)return cart();
  return `<section><h2>Kasse</h2><p class="note">Demo: Es werden keine Zahlungen verarbeitet und keine Daten gespeichert oder gesendet.</p><br>
  <div class="panel"><form class="form" id="co" novalidate><label>Name<input name="n" required autocomplete="name"></label><label>E-Mail<input name="e" type="email" required autocomplete="email"></label>
  <label>Adresse<input name="a" required autocomplete="street-address"></label><label>Zahlungsart<select disabled><option>Wird mit seriösem Zahlungsanbieter ergänzt</option></select></label>
  <p>Gesamt: <strong>${fmt(total())}</strong></p><button class="btn" type="submit">Bestellung prüfen (Demo)</button><p id="comsg" role="status"></p></form></div></section>`;
}
function legal(k){
  const p=L.pages[k]; if(!p)return `<section><h2>Seite nicht gefunden</h2></section>`;
  return `<section class="prose"><h1 style="font-size:2.2rem">${esc(p.title)}</h1><p class="note">${esc(L.notice)}</p><br>${p.body.map(t=>`<p>${esc(t)}</p>`).join("")}</section>`;
}

/* ---------- Router ---------- */
function route(){
  const [,r,a]=(location.hash||"#/").split("/"); let h;
  if(r==="shop"){state.cat=a||state.cat;if(!a&&location.hash==="#/shop"&&!state.keepQ)state.q=state.q;h=shop()}
  else if(r==="product")h=product(a);else if(r==="cart")h=cart();else if(r==="checkout")h=checkout();else if(r==="page")h=legal(a);else h=home();
  main.innerHTML=h; document.title=S.brand+" – Demo-Shop"; window.scrollTo(0,0); bind();
}
function bind(){
  const fc=$("#fc"),fs=$("#fs"); if(fc)fc.onchange=()=>{state.cat=fc.value;main.innerHTML=shop();bind()};
  if(fs)fs.onchange=()=>{state.sort=fs.value;main.innerHTML=shop();bind()};
  const clr=$("#clr"); if(clr)clr.onclick=()=>{state.q="";$("#q").value=""};
  const nl=$("#nl"); if(nl)nl.onsubmit=e=>{e.preventDefault();$("#nlmsg").textContent="Newsletter ist in der Demo noch nicht aktiv. Es wurde nichts gespeichert."};
  const co=$("#co"); if(co)co.onsubmit=e=>{e.preventDefault();const ok=co.checkValidity();$("#comsg").textContent=ok?"Demo beendet: Es wurde keine Bestellung ausgelöst.":"Bitte alle Felder korrekt ausfüllen."};
}
main.addEventListener("click",e=>{
  const t=e.target.closest("button"); if(!t)return;
  if(t.dataset.add){add(t.dataset.add);t.textContent="Hinzugefügt ✓";setTimeout(()=>t.textContent="In den Warenkorb",1200)}
  else if(t.dataset.q){const i=load().find(x=>x.id===t.dataset.q);setQty(t.dataset.q,i.qty+Number(t.dataset.d));route()}
  else if(t.dataset.rm){setQty(t.dataset.rm,0);route()}
});
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();state.q=$("#q").value.trim();state.cat="";if(location.hash==="#/shop")route();else location.hash="#/shop"});
$("#logo").textContent=S.brand;$("#footBrand").textContent=S.brand;
window.addEventListener("hashchange",route);updateCount();route();
})();
