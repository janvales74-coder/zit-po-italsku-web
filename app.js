// Prodejní odkazy, dostupnost a SEO vznikají při sestavení z jediné konfigurace.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('is-pending'); observer.observe(el); });
  motion.addEventListener('change', () => { if (motion.matches) { document.querySelectorAll('.is-pending').forEach(el=>el.classList.remove('is-pending')); observer.disconnect(); } });
}
const dialog=document.querySelector('#legal-dialog');
let legalPromise;
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click',async()=>{
  const title=document.querySelector('#legal-title'), content=document.querySelector('#legal-content');
  title.textContent='Právní dokument';content.textContent='Načítání…';dialog.showModal();
  try {
    legalPromise ||= fetch('legal.json').then(response=>{if(!response.ok)throw new Error('Dokument není dostupný');return response.json();});
    const documents=await legalPromise;
    const [name,...paragraphs]=documents[button.dataset.legal];title.textContent=name;
    content.replaceChildren();
    for(const text of ['Tato kostra není hotový právní dokument. Před použitím ji nechte zkontrolovat a doplňte údaje o prodávajícím i skutečný provoz webu.',...paragraphs]){const p=document.createElement('p');p.textContent=text;content.append(p);}
  } catch { legalPromise=null;content.textContent='Dokument se nepodařilo načíst. Pracovní šablony jsou v dokumentaci projektu.'; }
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
const form=document.querySelector('#newsletter-form');
form.addEventListener('submit',event=>{
  if (!form.hasAttribute('action')) {
    event.preventDefault();
    const email=form.querySelector('input[type="email"]');
    const fallback=form.dataset.fallback;
    if(!fallback) return;
    const purpose=form.dataset.purpose==='naskladneni'?'Upozornění na naskladnění knihy':'Odběr novinek Žít po italsku';
    window.location.href=`mailto:${encodeURIComponent(fallback)}?subject=${encodeURIComponent(purpose)}&body=${encodeURIComponent(`Můj e-mail: ${email.value}\nSouhlasím se zpracováním e-mailu pro účel: ${purpose}. Souhlas mohu kdykoli odvolat.`)}`;
    form.querySelector('[role="status"]').textContent='Otevřeli jsme e-mailovou zprávu. Pro dokončení žádosti ji odešlete ve svém e-mailovém klientu.';
  }
});
// Přímý POST směřuje k poskytovateli newsletteru. Žádný falešný stav úspěchu.
// Cookie šablona zůstává neaktivní: žádné měření ani volitelné cookies se nenačítají.
