(function(){
  "use strict";
  var doc=document,root=doc.documentElement;
  var $=function(s,c){return (c||doc).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||doc).querySelectorAll(s))};
  /* Georgian Mkhedruli -> Mtavruli (capital letters) for .caps elements */
  function toMtavruli(str){
    var out="";
    for(var i=0;i<str.length;i++){
      var c=str.charCodeAt(i);
      if((c>=0x10D0&&c<=0x10FA)||(c>=0x10FD&&c<=0x10FF)){out+=String.fromCharCode(c+0xBC0)}else{out+=str[i]}
    }
    return out;
  }
  function capsify(el){
    var walker=doc.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;
    while((n=walker.nextNode())){n.nodeValue=toMtavruli(n.nodeValue)}
  }
  /* i18n */
  var dict={
    ka:{cat_service:"მომსახურება",cat_project:"პროექტი",cat_gallery:"გალერეა",cat_contact:"კონტაქტი",sp_results:"შედეგები",sp_popular:"პოპულარული ძიება",sp_empty:"ვერაფერი მოიძებნა"},
    en:{
      cat_service:"Service",cat_project:"Project",cat_gallery:"Gallery",cat_contact:"Contact",sp_results:"Results",sp_popular:"Popular searches",sp_empty:"Nothing found for",
      search:"Search services or projects",nav_home:"Home",nav_about:"About Us",nav_standard:"Standard Shipping",nav_oversized:"Oversized Cargo",nav_engineering:"Engineering Services",nav_terminal:"Terminal & Warehouses",nav_projects:"Our Projects",nav_contact:"Contact",
      sm_profile:"Company Profile",sm_mission:"Mission",sm_hsse:"Safety & HSSE Policy",sm_iso:"ISO 9001:2015 Certificate",sm_gallery:"Gallery",sm_road:"Road Freight",sm_sea:"Sea Freight",sm_rail:"Rail Freight",sm_air:"Air Freight",sm_heavy:"Oversized & Heavy Cargo",sm_jacking:"Hydraulic Jacking & Skidding Services",sm_engineering:"Engineering Services",sm_terminal:"Gianti Logistics Terminal",sm_wh_free:"Non-bonded Warehouse at Tbilisi GEZ",sm_wh_bonded:"Bonded Warehouse at Tbilisi GEZ",
      news:"News",more:"Learn more",
      s_project:"Project Cargo",s_road:"Road Freight",s_sea:"Sea Freight",s_rail:"Rail Freight",s_air:"Air Freight",s_terminal:"Customs Terminal",s_brokerage:"Customs Brokerage",s_warehouses:"Bonded & Non-bonded Warehouses",
      p1:"Mingachevir",p2:"SOCAR - HAOR",p3:"Tskaltubo 500",p4:"Khevi - Ubisa Road",p5:"Timber Project",p6:"Vessel Project",
      photo:"Photo Gallery",video:"Video Gallery",next:"Next",
      contact_us:"Contact Us",address:"Gianti Palace, opposite El. Amashukeli St. 17, Tbilisi, 0160",hours:"Mon - Fri · 09:00 - 18:00",standard_mail:"Standard shipping",project_mail:"Project cargo",
      branches:"Branches",branch_uz:"Uzbekistan, Tashkent, Mirabad district, Afrosiyob street 4B",branch_kz:"Republic of Kazakhstan, Almaty, Seifullin Avenue 404/67, office 304",
      partners:"Our Partner International Alliances",rights:"All rights reserved."
    },
    ru:{
      cat_service:"Услуга",cat_project:"Проект",cat_gallery:"Галерея",cat_contact:"Контакты",sp_results:"Результаты",sp_popular:"Популярные запросы",sp_empty:"Ничего не найдено по запросу",
      search:"Поиск услуг или проектов",nav_home:"Главная",nav_about:"О нас",nav_standard:"Стандартные перевозки",nav_oversized:"Негабаритные перевозки",nav_engineering:"Инженерные услуги",nav_terminal:"Терминал и склады",nav_projects:"Наши проекты",nav_contact:"Контакты",
      sm_profile:"Профиль компании",sm_mission:"Миссия",sm_hsse:"Безопасность и политика HSSE",sm_iso:"Сертификат ISO 9001:2015",sm_gallery:"Галерея",sm_road:"Автомобильные перевозки",sm_sea:"Морские перевозки",sm_rail:"Железнодорожные перевозки",sm_air:"Авиаперевозки",sm_heavy:"Негабаритные и тяжеловесные грузы",sm_jacking:"Услуги гидравлических домкратов и систем скольжения",sm_engineering:"Инженерные услуги",sm_terminal:"Терминал Gianti Logistics",sm_wh_free:"Нетаможенный склад у Тбилисской GEZ",sm_wh_bonded:"Таможенный склад у Тбилисской GEZ",
      news:"Новости",more:"Подробнее",
      s_project:"Проектные перевозки",s_road:"Автомобильные перевозки",s_sea:"Морские перевозки",s_rail:"Железнодорожные перевозки",s_air:"Авиаперевозки",s_terminal:"Таможенный терминал",s_brokerage:"Брокерские услуги",s_warehouses:"Таможенные и нетаможенные склады",
      p1:"Мингечевир",p2:"SOCAR - HAOR",p3:"Цхалтубо 500",p4:"Дорога Хеви - Убиса",p5:"Лесной проект",p6:"Проект судна",
      photo:"Фотогалерея",video:"Видеогалерея",next:"Далее",
      contact_us:"Свяжитесь с нами",address:"Гианти Палас, напротив ул. Эл. Амашукели 17, Тбилиси, 0160",hours:"Пн - Пт · 09:00 - 18:00",standard_mail:"Стандартные перевозки",project_mail:"Проектные перевозки",
      branches:"Филиалы",branch_uz:"Узбекистан, Ташкент, Мирабадский район, улица Афросиаб 4Б",branch_kz:"Республика Казахстан, Алматы, проспект Сейфуллина 404/67, офис 304",
      partners:"Наши партнерские международные альянсы",rights:"Все права защищены."
    }
  };
  var i18nEls=$$("[data-i18n]"),phEls=$$("[data-i18n-ph]");
  i18nEls.forEach(function(el){dict.ka[el.getAttribute("data-i18n")]=el.textContent});
  phEls.forEach(function(el){dict.ka[el.getAttribute("data-i18n-ph")]=el.getAttribute("placeholder")});
  function getStored(){try{return localStorage.getItem("gl-lang")}catch(e){return null}}
  function setStored(v){try{localStorage.setItem("gl-lang",v)}catch(e){}}
  function applyLang(lang){
    if(!dict[lang])lang="ka";
    var d=dict[lang];
    $$("[data-i18n]").forEach(function(el){var k=el.getAttribute("data-i18n");if(d[k]!=null)el.textContent=d[k]});
    $$("[data-i18n-ph]").forEach(function(el){var k=el.getAttribute("data-i18n-ph");if(d[k]!=null){el.setAttribute("placeholder",d[k]);el.setAttribute("aria-label",d[k])}});
    $$(".caps").forEach(capsify);
    root.setAttribute("lang",lang);
    $$(".lang-code").forEach(function(s){s.textContent=lang.toUpperCase()});
    $$(".lang-menu li").forEach(function(li){li.classList.toggle("current",li.getAttribute("data-lang")===lang)});
    setStored(lang);
  }
  /* Mobile tools: clone search/socials/lang into the nav */
  var nav=$("#mainNav"),burger=$("#burger"),header=$(".site-header");
  var tools=$(".header-tools");
  if(tools&&nav){
    var mt=doc.createElement("li");
    mt.className="mobile-tools";
    var clone=tools.cloneNode(true);
    $$("[id]",clone).forEach(function(el){el.removeAttribute("id")});
    while(clone.firstChild){mt.appendChild(clone.firstChild)}
    $("ul",nav).appendChild(mt);
    var mq=window.matchMedia("(max-width:1240px)");
    var syncTools=function(){mt.style.display=mq.matches?"":"none"};
    syncTools();
    if(mq.addEventListener){mq.addEventListener("change",syncTools)}else{mq.addListener(syncTools)}
  }
  applyLang(getStored()||"ka");
  /* Language dropdowns */
  $$(".lang").forEach(function(box){
    var btn=$(".lang-btn",box);
    btn.addEventListener("click",function(e){e.stopPropagation();var o=box.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
    $$(".lang-menu li",box).forEach(function(li){
      li.addEventListener("click",function(){applyLang(li.getAttribute("data-lang"));box.classList.remove("open");btn.setAttribute("aria-expanded","false")});
      li.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();li.click();btn.focus()}});
    });
  });
  doc.addEventListener("click",function(){$$(".lang.open").forEach(function(b){b.classList.remove("open")})});
  /* Header height + sticky shadow */
  function setHeaderH(){root.style.setProperty("--header-h",$(".header-top").offsetHeight+"px")}
  setHeaderH();
  window.addEventListener("resize",setHeaderH);
  var onScroll=function(){header.classList.toggle("scrolled",window.scrollY>20)};
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();
  /* Burger */
  function closeNav(){nav.classList.remove("open");burger.classList.remove("active");burger.setAttribute("aria-expanded","false");doc.body.classList.remove("nav-open")}
  burger.addEventListener("click",function(){
    setHeaderH();
    var o=nav.classList.toggle("open");
    burger.classList.toggle("active",o);
    burger.setAttribute("aria-expanded",o);
    doc.body.classList.toggle("nav-open",o);
  });
  /* Submenus */
  var subs=$$(".has-sub",nav);
  function closeSubs(except){subs.forEach(function(li){if(li!==except){li.classList.remove("open");$(".sub-toggle",li).setAttribute("aria-expanded","false")}})}
  subs.forEach(function(li){
    var t=$(".sub-toggle",li);
    t.addEventListener("click",function(e){
      e.stopPropagation();
      var o=!li.classList.contains("open");
      closeSubs(li);
      li.classList.toggle("open",o);
      t.setAttribute("aria-expanded",o?"true":"false");
      if(!o&&doc.activeElement&&li.contains(doc.activeElement))doc.activeElement.blur();
    });
  });
  doc.addEventListener("click",function(e){if(!e.target.closest(".has-sub"))closeSubs()});
  $$("a",nav).forEach(function(a){a.addEventListener("click",function(){
    if(a.closest(".mobile-tools"))return;
    var top=a.closest(".main-nav>ul>li");
    $$(".main-nav>ul>li>a").forEach(function(x){x.classList.remove("active")});
    if(top)$("a",top).classList.add("active");
    closeSubs();
    a.blur();
    closeNav();
  })});
  window.addEventListener("keydown",function(e){if(e.key==="Escape"){closeNav();closeLb();closeSubs();if(doc.activeElement&&doc.activeElement.closest(".has-sub"))doc.activeElement.blur()}});
  /* Search with live suggestions */
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function curLang(){var l=root.getAttribute("lang");return dict[l]?l:"ka"}
  function tr(k){var l=curLang();return (dict[l]&&dict[l][k]!=null)?dict[l][k]:(dict.ka[k]||"")}
  function buildIndex(){
    var items=[];
    $$("main .service-card").forEach(function(c){var h=$("h3",c);items.push({key:h.getAttribute("data-i18n"),cat:"cat_service",img:$("img",c).getAttribute("src"),target:c})});
    $$("main .project-card").forEach(function(c){var t=$("span",c);items.push({key:t.getAttribute("data-i18n"),cat:"cat_project",img:$("img",c).getAttribute("src"),target:c})});
    $$("main .gallery-box").forEach(function(c){var h=$("h2",c);items.push({key:h.getAttribute("data-i18n"),cat:"cat_gallery",img:$(".gb-slides img",c).getAttribute("src"),target:c})});
    $$("main .contact .info li").forEach(function(li){
      var k=$("[data-i18n]",li),a=$("a",li),ic=$("img",li);
      items.push({key:k?k.getAttribute("data-i18n"):null,raw:a?a.textContent:"",extra:a?a.textContent:"",cat:"cat_contact",icon:ic?ic.getAttribute("src"):null,target:li});
    });
    return items;
  }
  var searchIndex=buildIndex();
  function itemTitle(it){
    var t=it.key?tr(it.key):it.raw;
    if(it.key&&it.extra)t+=": "+it.extra;
    return t;
  }
  function itemHay(it){
    return ((it.key?(dict.ka[it.key]||"")+" "+((dict.en[it.key])||"")+" "+((dict.ru[it.key])||""):"")+" "+(it.raw||"")+" "+(it.extra||"")+" "+tr(it.cat)).toLowerCase();
  }
  function highlight(text,q){
    var i=text.toLowerCase().indexOf(q);
    if(!q||i<0)return esc(text);
    return esc(text.slice(0,i))+"<mark>"+esc(text.slice(i,i+q.length))+"</mark>"+esc(text.slice(i+q.length));
  }
  var arrowSvg='<svg class="sp-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';
  var popular=["s_project","s_sea","s_air","s_warehouses","p3"];
  function flash(el){
    el.animate&&el.animate([{boxShadow:"0 0 0 0 rgba(108,192,74,.9)"},{boxShadow:"0 0 0 14px rgba(108,192,74,0)"}],{duration:1100,iterations:2});
  }
  function goTo(it){
    closeNav();
    var t=it.target;
    if(t.closest(".projects-track")){
      $("#projects").scrollIntoView({behavior:"smooth",block:"center"});
      var tr2=t.parentNode;setTimeout(function(){tr2.scrollTo({left:t.offsetLeft-tr2.offsetLeft-4,behavior:"smooth"})},350);
    }else{
      t.scrollIntoView({behavior:"smooth",block:"center"});
    }
    setTimeout(function(){flash(t)},450);
  }
  $$(".search").forEach(function(form){
    var input=$("input",form),panel=$(".search-panel",form),clear=$(".search-clear",form),results=[],active=-1;
    function setOpen(o){form.classList.toggle("open",o);input.setAttribute("aria-expanded",o?"true":"false")}
    function setActive(i){
      var els=$$(".sp-item",panel);
      els.forEach(function(e){e.classList.remove("active")});
      active=i;
      if(els[i]){els[i].classList.add("active");els[i].scrollIntoView({block:"nearest"})}
    }
    function render(){
      var q=input.value.trim().toLowerCase();
      form.classList.toggle("has-value",input.value.length>0);
      active=-1;
      if(!q){
        results=popular.map(function(k){return searchIndex.filter(function(it){return it.key===k})[0]}).filter(Boolean);
        panel.innerHTML='<div class="sp-label">'+esc(tr("sp_popular"))+'</div><div class="sp-chips">'+results.map(function(it,i){return '<button type="button" class="sp-chip" data-i="'+i+'">'+esc(itemTitle(it))+'</button>'}).join("")+'</div>';
        results=[];
        return;
      }
      results=searchIndex.filter(function(it){return itemHay(it).indexOf(q)>-1}).slice(0,7);
      if(!results.length){
        panel.innerHTML='<div class="sp-empty"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6M8.5 11h5"/></svg>'+esc(tr("sp_empty"))+(curLang()!=="ka"?' "'+esc(input.value.trim())+'"':' - "'+esc(input.value.trim())+'"')+'</div>';
        return;
      }
      panel.innerHTML='<div class="sp-label">'+esc(tr("sp_results"))+' · '+results.length+'</div>'+results.map(function(it,i){
        var th=it.img?'<img src="'+esc(it.img)+'" alt="" loading="lazy">':'<img class="sp-icon" src="'+esc(it.icon)+'" alt="">';
        return '<div class="sp-item" role="option" data-i="'+i+'"><span class="sp-thumb">'+th+'</span><span class="sp-text"><span class="sp-title">'+highlight(itemTitle(it),q)+'</span><span class="sp-cat">'+esc(tr(it.cat))+'</span></span>'+arrowSvg+'</div>';
      }).join("");
      setActive(0);
    }
    function choose(i){
      var it=results[i];if(!it)return;
      setOpen(false);input.blur();goTo(it);
    }
    input.addEventListener("focus",function(){form.classList.add("focused");render();setOpen(true)});
    input.addEventListener("blur",function(){form.classList.remove("focused")});
    input.addEventListener("input",function(){render();setOpen(true)});
    input.addEventListener("keydown",function(e){
      var n=$$(".sp-item",panel).length;
      if(e.key==="ArrowDown"&&n){e.preventDefault();setActive((active+1)%n)}
      else if(e.key==="ArrowUp"&&n){e.preventDefault();setActive((active-1+n)%n)}
      else if(e.key==="Escape"){setOpen(false);input.blur()}
    });
    panel.addEventListener("mousedown",function(e){e.preventDefault()});
    panel.addEventListener("click",function(e){
      var chip=e.target.closest(".sp-chip");
      if(chip){input.value=chip.textContent;render();setOpen(true);input.focus();return}
      var item=e.target.closest(".sp-item");
      if(item)choose(+item.getAttribute("data-i"));
    });
    panel.addEventListener("mousemove",function(e){var item=e.target.closest(".sp-item");if(item&&+item.getAttribute("data-i")!==active)setActive(+item.getAttribute("data-i"))});
    clear.addEventListener("mousedown",function(e){e.preventDefault()});
    clear.addEventListener("click",function(){input.value="";render();input.focus()});
    form.addEventListener("submit",function(e){
      e.preventDefault();
      if(!input.value.trim()){input.focus();return}
      render();
      if(results.length)choose(active>-1?active:0);else setOpen(true);
    });
    doc.addEventListener("click",function(e){if(!form.contains(e.target))setOpen(false)});
  });
  /* "/" focuses the search */
  doc.addEventListener("keydown",function(e){
    if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey)return;
    var tag=(doc.activeElement&&doc.activeElement.tagName)||"";
    if(/INPUT|TEXTAREA|SELECT/.test(tag))return;
    var inp=$("#searchInput");
    if(inp&&inp.offsetParent!==null){e.preventDefault();inp.focus()}
  });
  /* Projects carousel */
  var track=$("#prTrack"),prev=$("#prPrev"),next=$("#prNext");
  if(track){
    var step=function(){var c=$(".project-card",track);return c?c.offsetWidth+16:300};
    var upd=function(){
      var fits=track.scrollWidth<=track.clientWidth+4;
      prev.style.visibility=fits?"hidden":"";
      next.style.visibility=fits?"hidden":"";
      prev.disabled=track.scrollLeft<=4;
    };
    prev.addEventListener("click",function(){track.scrollBy({left:-step(),behavior:"smooth"})});
    next.addEventListener("click",function(){
      if(track.scrollLeft+track.clientWidth>=track.scrollWidth-4){track.scrollTo({left:0,behavior:"smooth"})}else{track.scrollBy({left:step(),behavior:"smooth"})}
    });
    track.addEventListener("scroll",upd,{passive:true});
    window.addEventListener("resize",upd);
    upd();
    var drag=null;
    track.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse")return;drag={x:e.clientX,s:track.scrollLeft,moved:false};track.style.scrollSnapType="none"});
    window.addEventListener("pointermove",function(e){if(!drag)return;var dx=e.clientX-drag.x;if(Math.abs(dx)>5)drag.moved=true;track.scrollLeft=drag.s-dx});
    window.addEventListener("pointerup",function(){if(!drag)return;var m=drag.moved;drag=null;track.style.scrollSnapType="";if(m){track.addEventListener("click",function stop(ev){ev.preventDefault();track.removeEventListener("click",stop,true)},true)}});
  }
  /* Galleries */
  var lb=$("#lightbox"),lbImg=$("img",lb),lbList=[],lbIdx=0;
  function showLb(){
    var old=$("iframe",lb);if(old)old.remove();
    lbImg.style.display="";
    lbImg.src=lbList[lbIdx].src;lbImg.alt=lbList[lbIdx].alt;
  }
  function openLb(list,idx){
    lbList=list;lbIdx=idx;showLb();
    lb.classList.toggle("single",list.length<2);
    lb.classList.add("open");lb.setAttribute("aria-hidden","false");doc.body.style.overflow="hidden";
  }
  function closeLb(){
    if(!lb.classList.contains("open"))return;
    lb.classList.remove("open");lb.setAttribute("aria-hidden","true");doc.body.style.overflow="";
    var f=$("iframe",lb);if(f)f.remove();
  }
  $(".lb-close",lb).addEventListener("click",closeLb);
  lb.addEventListener("click",function(e){if(e.target===lb)closeLb()});
  $(".lb-prev",lb).addEventListener("click",function(){lbIdx=(lbIdx-1+lbList.length)%lbList.length;showLb()});
  $(".lb-next",lb).addEventListener("click",function(){lbIdx=(lbIdx+1)%lbList.length;showLb()});
  window.addEventListener("keydown",function(e){
    if(!lb.classList.contains("open")||lbList.length<2)return;
    if(e.key==="ArrowRight")$(".lb-next",lb).click();
    if(e.key==="ArrowLeft")$(".lb-prev",lb).click();
  });
  $$(".gallery-box").forEach(function(box){
    var slides=$$(".gb-slides img",box),idx=0,timer;
    var go=function(n){slides[idx].classList.remove("active");idx=(n+slides.length)%slides.length;slides[idx].classList.add("active")};
    var auto=function(){clearInterval(timer);if(slides.length>1)timer=setInterval(function(){go(idx+1)},5000)};
    $(".gb-next",box).addEventListener("click",function(e){e.stopPropagation();if(slides.length>1){go(idx+1);auto()}else{openLb(slides,0)}});
    var open=$(".gb-open",box);
    if(open)open.addEventListener("click",function(){openLb(slides,idx)});
    auto();
  });
  var vg=$("#videoGallery");
  if(vg){
    $(".play",vg).addEventListener("click",function(){
      var src=vg.getAttribute("data-video");
      var imgs=$$(".gb-slides img",vg);
      if(!src){openLb(imgs,0);return}
      lbList=imgs;lb.classList.add("single","open");lb.setAttribute("aria-hidden","false");doc.body.style.overflow="hidden";
      lbImg.style.display="none";
      var f=doc.createElement("iframe");
      f.src=src+(src.indexOf("?")>-1?"&":"?")+"autoplay=1";
      f.allow="autoplay; encrypted-media; picture-in-picture";
      f.allowFullscreen=true;
      lb.insertBefore(f,$(".lb-next",lb));
    });
  }
  /* Reveal on scroll */
  var rev=$$(".reveal");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    rev.forEach(function(el,i){el.style.transitionDelay=(i%4)*80+"ms";io.observe(el)});
  }else{rev.forEach(function(el){el.classList.add("in")})}
  /* Active nav link by section */
  var links=$$(".main-nav>ul>li>a[href^='#']");
  var secs=["top","about","services","projects","contact"].map(function(id){return doc.getElementById(id)}).filter(Boolean);
  window.addEventListener("scroll",function(){
    var y=window.scrollY+160,cur="top";
    secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});
    if(cur==="about")cur="top";
    links.forEach(function(a){
      var h=a.getAttribute("href").slice(1);
      a.classList.toggle("active",h===cur&&a===links.filter(function(l){return l.getAttribute("href").slice(1)===cur})[0]);
    });
  },{passive:true});
  var yr=$("#year");if(yr)yr.textContent=new Date().getFullYear();
})();
