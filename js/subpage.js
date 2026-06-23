const nav=document.getElementById('nav');
const menuToggle=document.getElementById('menuToggle');
const themeBtn=document.getElementById('themeToggle');
let isLight=false;

function applyTheme(){
  document.documentElement.setAttribute('data-theme',isLight?'light':'dark');
}

window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40));
if(menuToggle) menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
if(themeBtn) themeBtn.addEventListener('click',()=>{isLight=!isLight;applyTheme();});
nav.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
