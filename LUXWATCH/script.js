const products = [
 {id:1,name:"Classic Silver",category:"Klassik",type:"Erkaklar",price:890000,old:1090000,label:"BESTSELLER",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"},
 {id:2,name:"Golden Heritage",category:"Klassik",type:"Erkaklar",price:1250000,label:"PREMIUM",img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=85"},
 {id:3,name:"Rose Elegance",category:"Ayollar",type:"Ayollar",price:970000,label:"NEW",img:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=85"},
 {id:4,name:"Midnight Black",category:"Erkaklar",type:"Erkaklar",price:1150000,img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85"},
 {id:5,name:"Urban Sport",category:"Sport",type:"Erkaklar",price:760000,label:"SPORT",img:"https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=700&q=85"},
 {id:6,name:"Pearl White",category:"Ayollar",type:"Ayollar",price:830000,img:"https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=700&q=85"},
 {id:7,name:"Royal Blue",category:"Erkaklar",type:"Erkaklar",price:1490000,label:"PREMIUM",img:"https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=700&q=85"},
 {id:8,name:"Minimal Gold",category:"Ayollar",type:"Ayollar",price:1050000,img:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=85"},
 {id:9,name:"Explorer Pro",category:"Sport",type:"Erkaklar",price:1320000,img:"https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=700&q=85"},
 {id:10,name:"Vintage Brown",category:"Klassik",type:"Erkaklar",price:920000,img:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=700&q=85"},
 {id:11,name:"Crystal Shine",category:"Ayollar",type:"Ayollar",price:1180000,label:"NEW",img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=85"},
 {id:12,name:"Active Pulse",category:"Sport",type:"Sport",price:690000,img:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=85"},
 {id:13,name:"Carbon Edge",category:"Erkaklar",type:"Erkaklar",price:1380000,img:"https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=700&q=85"},
 {id:14,name:"Luna Silver",category:"Ayollar",type:"Ayollar",price:880000,img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85"},
 {id:15,name:"Executive Steel",category:"Klassik",type:"Erkaklar",price:1590000,label:"PREMIUM",img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=85"},
 {id:16,name:"Motion X",category:"Sport",type:"Sport",price:790000,img:"https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=700&q=85"},
 {id:17,name:"Soft Pink",category:"Ayollar",type:"Ayollar",price:990000,img:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=85"},
 {id:18,name:"Heritage Brown",category:"Klassik",type:"Erkaklar",price:1090000,img:"https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=700&q=85"}
];
const money = n => new Intl.NumberFormat("uz-UZ").format(n) + " so'm";
let cart = JSON.parse(localStorage.getItem("luxwatch-cart") || "[]");
let activeCategory = "Barchasi", searchTerm = "", sortMode = "default";
const grid = document.getElementById("productGrid");
const toast = document.getElementById("toast");
function showToast(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}
function saveCart(){localStorage.setItem("luxwatch-cart",JSON.stringify(cart));renderCart()}
function renderProducts(){
 let list=products.filter(p=>(activeCategory==="Barchasi"||p.category===activeCategory||p.type===activeCategory)&&p.name.toLowerCase().includes(searchTerm.toLowerCase()));
 if(sortMode==="low")list.sort((a,b)=>a.price-b.price); if(sortMode==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-photo"><img src="${p.img}" alt="${p.name}" loading="lazy">${p.label?`<span class="product-label">${p.label}</span>`:""}<button class="quick-add" data-add="${p.id}">+ SAVATGA QO'SHISH</button></div><div class="product-info"><span class="product-category">${p.category} · ${p.type}</span><h3>${p.name}</h3><div class="product-bottom"><span class="price">${money(p.price)}</span><span class="rating">★★★★★</span></div></div></article>`).join("");
 document.getElementById("emptyState").hidden=list.length>0;
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Mahsulot savatga qo'shildi ✓")}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("cartTotal").textContent=money(total);
 const holder=document.getElementById("cartItems");
 if(!cart.length){holder.innerHTML='<p class="cart-empty">Savatingiz hozircha bo'sh.<br>O'zingizga yoqqan soatni tanlang.</p>';return}
 holder.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><img src="${p.img}" alt="${p.name}"><div><h4>${p.name}</h4><span class="price">${money(p.price)}</span><div class="quantity"><button data-minus="${p.id}">−</button><span>${x.qty}</span><button data-plus="${p.id}">+</button></div></div><button class="remove-btn" data-remove="${p.id}" aria-label="O'chirish">✕</button></div>`}).join("");
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add))});
document.getElementById("cartItems").addEventListener("click",e=>{const id=Number(e.target.dataset.plus||e.target.dataset.minus||e.target.dataset.remove);if(!id)return;const item=cart.find(x=>x.id===id);if(e.target.dataset.plus)item.qty++;else if(e.target.dataset.minus){item.qty--;if(item.qty<=0)cart=cart.filter(x=>x.id!==id)}else cart=cart.filter(x=>x.id!==id);saveCart()});
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.getElementById("sortSelect").addEventListener("change",e=>{sortMode=e.target.value;renderProducts()});
document.getElementById("searchToggle").addEventListener("click",()=>{document.getElementById("searchWrap").classList.toggle("show");document.getElementById("searchInput").focus()});
document.getElementById("searchClose").addEventListener("click",()=>{searchTerm="";document.getElementById("searchInput").value="";document.getElementById("searchWrap").classList.remove("show");renderProducts()});
document.getElementById("searchInput").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts()});
document.getElementById("cartOpen").addEventListener("click",openCart);document.getElementById("cartClose").addEventListener("click",closeCart);document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("checkoutBtn").addEventListener("click",()=>{if(!cart.length){showToast("Avval savatga mahsulot qo'shing");return}showToast("Buyurtmangiz qabul qilindi! (Demo)");cart=[];saveCart();closeCart()});
document.getElementById("subscribeForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("subscribeMessage").textContent="Rahmat! Obunangiz qabul qilindi.";e.target.reset()});
renderProducts();renderCart();