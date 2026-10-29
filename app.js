(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  function zamknij(){n.classList.remove('otwarte');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');}
  b.addEventListener('click',function(){var o=n.classList.toggle('otwarte');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
  n.addEventListener('click',function(e){if(e.target.tagName==='A')zamknij();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  // dolny pasek dopiero po przewinieciu za pierwszy ekran
  var mob=document.getElementById('mob'),cel=document.querySelector('.hero-cta')||document.querySelector('.podhero');
  if('IntersectionObserver' in window&&mob&&cel){
    new IntersectionObserver(function(w){var e=w[0];mob.classList.toggle('widac',!e.isIntersecting&&e.boundingClientRect.top<0);}).observe(cel);
  }

  // formularz: bez serwera, przygotowuje wiadomosc e-mail
  var f=document.getElementById('form'),info=document.getElementById('form-info');
  if(!f)return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    ['imie','tel'].forEach(function(k){var el=f.elements[k];var pusty=!el.value.trim();el.classList.toggle('zle',pusty);if(pusty)ok=false;});
    if(!ok){info.textContent='Podaj imię i numer telefonu, żebyśmy mogli oddzwonić.';return;}
    var temat='Zapytanie o instalację fotowoltaiczną';
    var tresc='Dzień dobry, jestem zainteresowany/a instalacją fotowoltaiczną.\n\nMontaż: '+f.elements.gdzie.value+(f.elements.miejsce.value.trim()?'\nMiejscowość: '+f.elements.miejsce.value.trim():'')+(f.elements.tresc.value.trim()?'\n\n'+f.elements.tresc.value.trim():'')+'\n\nProszę o telefon: '+f.elements.tel.value.trim()+'\n'+f.elements.imie.value.trim();
    info.textContent='Dziękujemy. Otwieramy program pocztowy z gotową wiadomością do SolarMax Technics.';
    location.href='mailto:solarmaxtechnics@gmail.com?subject='+encodeURIComponent(temat)+'&body='+encodeURIComponent(tresc);
  });
})();
