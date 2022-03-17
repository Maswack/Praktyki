/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{r as registerInstance,h,H as Host}from"./index-b3eecb14.js";import{b as getIonMode}from"./ionic-global-0ebe321c.js";import{c as createColorClasses}from"./theme-a24ff1ad.js";var textCss=":host(.ion-color){color:var(--ion-color-base)}";var Text=function(){function e(e){registerInstance(this,e)}e.prototype.render=function(){var e;var t=getIonMode(this);return h(Host,{class:createColorClasses(this.color,(e={},e[t]=true,e))},h("slot",null))};return e}();Text.style=textCss;export{Text as ion_text};