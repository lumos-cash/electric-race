'use strict';
(() => {
 const root=document.getElementById('adoption-study'),status=document.getElementById('study-status');
 root.querySelectorAll('[data-study]').forEach(button=>button.addEventListener('click',()=>{
  root.querySelectorAll('[data-study]').forEach(b=>{const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on)});
  root.querySelectorAll('[data-study-panel]').forEach(p=>p.hidden=p.dataset.studyPanel!==button.dataset.study);
 }));
 function describe(mark,selected=false){const country=mark.dataset.country,year=+mark.dataset.year,e=EV_DATA.entities[country],v=e.years[year];status.textContent=`${selected?'已联动地图：':''}${e.name} · ${year} 年　新车电动化 ${v.share}%　销量 ${(v.sales/10000).toLocaleString('zh-CN',{maximumFractionDigits:2})} 万辆`;}
 function select(mark){const slider=document.getElementById('year-slider');slider.value=mark.dataset.year;slider.dispatchEvent(new Event('input',{bubbles:true}));const selector=document.getElementById('country-select');selector.value=mark.dataset.country;selector.dispatchEvent(new Event('change',{bubbles:true}));describe(mark,true)}
 root.addEventListener('pointerover',e=>{const mark=e.target.closest('[data-country][data-year]');if(mark)describe(mark)});
 root.addEventListener('focusin',e=>{const mark=e.target.closest('[data-country][data-year]');if(mark)describe(mark)});
 root.addEventListener('click',e=>{const mark=e.target.closest('[data-country][data-year]');if(mark)select(mark)});
 root.addEventListener('keydown',e=>{const mark=e.target.closest('[data-country][data-year]');if(mark&&['Enter',' '].includes(e.key)){e.preventDefault();select(mark)}});
})();
