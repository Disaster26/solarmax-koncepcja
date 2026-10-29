(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  function zamknij(){n.classList.remove('otwarte');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');}
  b.addEventListener('click',function(){var o=n.classList.toggle('otwarte');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
  n.addEventListener('click',function(e){if(e.target.tagName==='A')zamknij();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  // dolny pasek dopiero po przewinieciu za przycisk w hero
  var mob=document.getElementById('mob'),cel=document.querySelector('.hero-cta');
  if('IntersectionObserver' in window&&mob&&cel){
    new IntersectionObserver(function(w){var e=w[0];mob.classList.toggle('widac',!e.isIntersecting&&e.boundingClientRect.top<0);}).observe(cel);
  }

  var f=document.getElementById('form'),info=document.getElementById('form-info');
  if(!f)return;

  // przycisk "Zamow wycene" przy usludze zaznacza ja w formularzu
  document.querySelectorAll('[data-usluga]').forEach(function(a){
    a.addEventListener('click',function(){
      var v=a.getAttribute('data-usluga');
      f.querySelectorAll('input[name="usluga"]').forEach(function(r){r.checked=(r.value===v);});
    });
  });

  // formularz bez serwera: przygotowuje wiadomosc e-mail
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    ['imie','tel'].forEach(function(k){var el=f.elements[k];var pusty=!el.value.trim();el.classList.toggle('zle',pusty);if(pusty)ok=false;});
    if(!ok){info.textContent='Podaj imię i numer telefonu, żebyśmy mogli oddzwonić.';return;}
    var u=(f.querySelector('input[name="usluga"]:checked')||{}).value||'';
    var v=function(k){return f.elements[k].value.trim();};
    var temat='Prośba o wycenę: '+u;
    var tresc='Dzień dobry, proszę o wycenę: '+u+'.'+(v('miejsce')?'\nMiejscowość: '+v('miejsce'):'')+(v('tresc')?'\n\n'+v('tresc'):'')+'\n\nTelefon: '+v('tel')+(v('email')?'\nE-mail: '+v('email'):'')+'\n'+v('imie');
    info.textContent='Dziękujemy. Otwieramy program pocztowy z gotową wiadomością do SolarMax Technics.';
    location.href='mailto:biuro@solarmax.com.pl?subject='+encodeURIComponent(temat)+'&body='+encodeURIComponent(tresc);
  });
})();
