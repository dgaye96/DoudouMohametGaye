const motionOk=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.body.insertAdjacentHTML('afterbegin','<div class="aurora" aria-hidden="true"></div><div class="scroll-progress" aria-hidden="true"></div>');
const progress=document.querySelector('.scroll-progress');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`},{passive:true});

// Seamless marquee: the row is duplicated so a -50% translation loops without a visible seam.
document.querySelectorAll('.tech-row').forEach(row=>row.insertAdjacentHTML('beforeend',row.innerHTML));

const counters=document.querySelectorAll('[data-count]');
if(counters.length){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.count);const suffix=el.dataset.suffix||'';if(!motionOk){el.textContent=target+suffix;io.unobserve(el);return}const start=performance.now();const tick=now=>{const p=Math.min((now-start)/1100,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);io.unobserve(el)}),{threshold:.5});counters.forEach(el=>io.observe(el))}

const terminalResponses={whoami:'Digital Impact Associate\nAI & Digital Transformation\nAutomation & Data Solutions',skills:'AI / RAG · Power Platform · Power BI\nSharePoint · Microsoft 365 · Drupal\nPython · FastAPI · JavaScript · PHP',projects:'COAR Intelligence Box — local RAG review\nLocal Personal Assistant RAG — privacy-first AI\nINVENT — regional data & dashboards\nVisa Travel App — Power Platform service',experience:'UNICEF — Digital Impact Associate, since 2025\nUNICEF — T4D Consultant, 2023 to 2024\nUNICEF — Web / UX-UI roles, 2020 to 2024\nEDMG — Founder, since 2018',research:'Doctorate, UN-CHK, since 2024\nArtificial Intelligence for Automatic\nInterpretation of Complex Medical Images'};
const terminal=document.querySelector('.terminal');
if(terminal){const line=terminal.querySelector('.terminal-line');const out=terminal.querySelector('.terminal-out');let typing;let lastCommand='whoami';
const run=command=>{lastCommand=command;terminal.querySelectorAll('.terminal-commands button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.command===command)));line.textContent=`doudou@digital-impact:~$ ${command}`;const text=window.dmgI18n?window.dmgI18n.t(terminalResponses[command]):terminalResponses[command];clearInterval(typing);if(!motionOk){out.textContent=text;return}out.textContent='';let i=0;typing=setInterval(()=>{out.textContent=text.slice(0,i+=2);if(i>=text.length)clearInterval(typing)},12)};
document.addEventListener('dmg:lang',()=>run(lastCommand));
terminal.querySelectorAll('.terminal-commands button').forEach(button=>button.addEventListener('click',()=>run(button.dataset.command)));
new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){run('whoami');obs.disconnect()}}),{threshold:.35}).observe(terminal)}

if(motionOk&&matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.body.insertAdjacentHTML('beforeend','<div class="cursor-ring" aria-hidden="true"></div><div class="cursor-dot" aria-hidden="true"></div>');
  const ring=document.querySelector('.cursor-ring');const dot=document.querySelector('.cursor-dot');
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove',event=>{mx=event.clientX;my=event.clientY;dot.style.transform=`translate(${mx}px,${my}px)`},{passive:true});
  const follow=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(follow)};
  requestAnimationFrame(follow);
  document.querySelectorAll('a,button,.capability-card,.brain-node').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('is-active'));el.addEventListener('mouseleave',()=>ring.classList.remove('is-active'))});

  document.querySelectorAll('.button').forEach(button=>{
    button.addEventListener('mousemove',event=>{const rect=button.getBoundingClientRect();const x=event.clientX-rect.left-rect.width/2;const y=event.clientY-rect.top-rect.height/2;button.style.transform=`translate(${x*.18}px,${y*.3}px)`});
    button.addEventListener('mouseleave',()=>{button.style.transform=''});
  });
}
