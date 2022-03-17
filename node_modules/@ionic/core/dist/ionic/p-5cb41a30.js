/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{f as o,c as t}from"./p-3b5bf7c6.js";import{c as n}from"./p-7853c104.js";const s=()=>{const s=window;s.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(s.innerWidth/2,s.innerHeight/2);if(!o)return;const c=o.closest("ion-content");c&&new Promise((o=>n(c,o))).then((()=>{t((async()=>{c.style.setProperty("--overflow","hidden"),await c.scrollToTop(300),c.style.removeProperty("--overflow")}))}))}))}))};export{s as startStatusTap}