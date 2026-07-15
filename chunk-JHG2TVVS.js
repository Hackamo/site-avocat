import{a as Se}from"./chunk-BMBM2G4N.js";import{a as Me}from"./chunk-XJ7OBSOV.js";import{a as Ce}from"./chunk-LT6M5RCT.js";import{b as Te,d as Ie,u as Pe,v as Le}from"./chunk-Y2PXGVYD.js";import{b as fe,c as ve,g as ye,j as xe,k as It}from"./chunk-QVBXU4RD.js";import{a as le,b as de,d as me,e as he,g as be,h as _e,i as pe,j as ke}from"./chunk-OQFGE6IE.js";import{g as ee}from"./chunk-AAB3UUBY.js";import{a as we}from"./chunk-U332ISOU.js";import"./chunk-7RAJNE2D.js";import{$ as pt,$a as vt,A as Ht,Aa as ct,Ab as O,Ba as lt,Bb as h,Cb as b,Da as ut,Ga as Wt,Gb as q,H as Qt,Hb as Kt,I as rt,Ib as f,J as Vt,K as Y,Ka as T,Kb as W,Kc as kt,La as H,Lb as x,Ma as D,Mb as w,Na as Q,Nb as Yt,Nc as wt,Oa as V,Oc as ie,P as $t,Pa as Xt,Pc as dt,R as j,Sb as Jt,T as S,Tb as A,Uc as Ct,V as s,Vc as ne,Wa as Zt,Xa as v,Ya as ft,Z as I,Za as p,_ as M,_a as g,_c as ae,ab as yt,ad as oe,ba as gt,bb as E,bd as mt,c as z,cb as R,cc as xt,db as u,e as Bt,eb as r,f as at,fa as k,fb as l,ga as J,gb as C,gc as X,h as zt,hc as _,ic as Z,j as Ft,ja as st,la as tt,lb as $,ma as et,mb as Ut,md as U,oa as L,pa as Gt,pb as G,pd as nt,qa as qt,qd as ht,sd as Tt,td as K,u as Nt,ub as y,ud as re,v as ot,vc as te,vd as se,w as jt,wb as m,xb as F,xd as ce,ya as c,yb as N,yd as ge,zb as it,zd as ue}from"./chunk-KVKL2ZIP.js";var De=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=H({type:n});static \u0275inj=j({imports:[ne,re,Pe,K,Me]})}return n})();var Ve=["switch"],$e=["*"];function Ge(n,o){n&1&&(r(0,"span",11),pt(),r(1,"svg",13),C(2,"path",14),l(),r(3,"svg",15),C(4,"path",16),l()())}var qe=new S("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),bt=class{source;checked;constructor(o,t){this.source=o,this.checked=t}},We=(()=>{class n{_elementRef=s(L);_focusMonitor=s(wt);_changeDetectorRef=s(X);defaults=s(qe);_onChange=t=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(t){return new bt(this,t)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=U();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(t){this._checked=t,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new k;toggleChange=new k;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){s(dt).load(ht);let t=s(new xt("tabindex"),{optional:!0}),e=this.defaults;this.tabIndex=t==null?0:parseInt(t)||0,this.color=e.color||"accent",this.id=this._uniqueId=s(mt).getId("mat-mdc-slide-toggle-"),this.hideIcon=e.hideIcon??!1,this.disabledInteractive=e.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t==="keyboard"||t==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(t){t.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}validate(t){return this.required&&t.value!==!0?{required:!0}:null}registerOnValidatorChange(t){this._validatorOnChange=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new bt(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=T({type:n,selectors:[["mat-slide-toggle"]],viewQuery:function(e,i){if(e&1&&O(Ve,5),e&2){let a;h(a=b())&&(i._switchElement=a.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(e,i){e&2&&(Ut("id",i.id),v("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),W(i.color?"mat-"+i.color:""),f("mat-mdc-slide-toggle-focused",i._focused)("mat-mdc-slide-toggle-checked",i.checked)("_mat-animation-noopable",i._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",_],color:"color",disabled:[2,"disabled","disabled",_],disableRipple:[2,"disableRipple","disableRipple",_],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:Z(t)],checked:[2,"checked","checked",_],hideIcon:[2,"hideIcon","hideIcon",_],disabledInteractive:[2,"disabledInteractive","disabledInteractive",_]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[A([{provide:Te,useExisting:$t(()=>n),multi:!0},{provide:Ie,useExisting:n,multi:!0}]),tt],ngContentSelectors:$e,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(e,i){if(e&1&&(F(),r(0,"div",1)(1,"button",2,0),y("click",function(){return i._handleClick()}),C(3,"div",3)(4,"span",4),r(5,"span",5)(6,"span",6)(7,"span",7),C(8,"span",8),l(),r(9,"span",9),C(10,"span",10),l(),p(11,Ge,5,0,"span",11),l()()(),r(12,"label",12),y("click",function(d){return d.stopPropagation()}),N(13),l()()),e&2){let a=q(2);u("labelPosition",i.labelPosition),c(),f("mdc-switch--selected",i.checked)("mdc-switch--unselected",!i.checked)("mdc-switch--checked",i.checked)("mdc-switch--disabled",i.disabled)("mat-mdc-slide-toggle-disabled-interactive",i.disabledInteractive),u("tabIndex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("disabled",i.disabled&&!i.disabledInteractive),v("id",i.buttonId)("name",i.name)("aria-label",i.ariaLabel)("aria-labelledby",i._getAriaLabelledBy())("aria-describedby",i.ariaDescribedby)("aria-required",i.required||null)("aria-checked",i.checked)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),c(9),u("matRippleTrigger",a)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",!0),c(),g(i.hideIcon?-1:11),c(),u("for",i.buttonId),v("id",i._labelId)}},dependencies:[nt,Se],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return n})(),Ee=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=H({type:n});static \u0275inj=j({imports:[We,K]})}return n})();var Et=["*"];function Ue(n,o){n&1&&N(0)}var Ke=["tabListContainer"],Ye=["tabList"],Je=["tabListInner"],ti=["nextPaginator"],ei=["previousPaginator"],ii=["content"];function ni(n,o){}var ai=["tabBodyWrapper"],oi=["tabHeader"];function ri(n,o){}function si(n,o){if(n&1&&V(0,ri,0,0,"ng-template",12),n&2){let t=m().$implicit;u("cdkPortalOutlet",t.templateLabel)}}function ci(n,o){if(n&1&&x(0),n&2){let t=m().$implicit;w(t.textLabel)}}function li(n,o){if(n&1){let t=$();r(0,"div",7,2),y("click",function(){let i=I(t),a=i.$implicit,d=i.$index,P=m(),B=q(1);return M(P._handleClick(a,B,d))})("cdkFocusChange",function(i){let a=I(t).$index,d=m();return M(d._tabFocusChanged(i,a))}),C(2,"span",8)(3,"div",9),r(4,"span",10)(5,"span",11),p(6,si,1,1,null,12)(7,ci,1,1),l()()()}if(n&2){let t=o.$implicit,e=o.$index,i=q(1),a=m();W(t.labelClass),f("mdc-tab--active",a.selectedIndex===e),u("id",a._getTabLabelId(t,e))("disabled",t.disabled)("fitInkBarToContent",a.fitInkBarToContent),v("tabIndex",a._getTabIndex(e))("aria-posinset",e+1)("aria-setsize",a._tabs.length)("aria-controls",a._getTabContentId(e))("aria-selected",a.selectedIndex===e)("aria-label",t.ariaLabel||null)("aria-labelledby",!t.ariaLabel&&t.ariaLabelledby?t.ariaLabelledby:null),c(3),u("matRippleTrigger",i)("matRippleDisabled",t.disabled||a.disableRipple),c(3),g(t.templateLabel?6:7)}}function di(n,o){n&1&&N(0)}function mi(n,o){if(n&1){let t=$();r(0,"mat-tab-body",13),y("_onCentered",function(){I(t);let i=m();return M(i._removeTabBodyWrapperHeight())})("_onCentering",function(i){I(t);let a=m();return M(a._setTabBodyWrapperHeight(i))})("_beforeCentering",function(i){I(t);let a=m();return M(a._bodyCentered(i))}),l()}if(n&2){let t=o.$implicit,e=o.$index,i=m();W(t.bodyClass),u("id",i._getTabContentId(e))("content",t.content)("position",t.position)("animationDuration",i.animationDuration)("preserveContent",i.preserveContent),v("tabindex",i.contentTabIndex!=null&&i.selectedIndex===e?i.contentTabIndex:null)("aria-labelledby",i._getTabLabelId(t,e))("aria-hidden",i.selectedIndex!==e)}}var hi=new S("MatTabContent"),bi=(()=>{class n{template=s(lt);constructor(){}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,selectors:[["","matTabContent",""]],features:[A([{provide:hi,useExisting:n}])]})}return n})(),_i=new S("MatTabLabel"),Be=new S("MAT_TAB"),Rt=(()=>{class n extends xe{_closestTab=s(Be,{optional:!0});static \u0275fac=(()=>{let t;return function(i){return(t||(t=et(n)))(i||n)}})();static \u0275dir=D({type:n,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[A([{provide:_i,useExisting:n}]),Q]})}return n})(),ze=new S("MAT_TAB_GROUP"),Ot=(()=>{class n{_viewContainerRef=s(Wt);_closestTabGroup=s(ze,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(t){this._setTemplateLabelInput(t)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new at;position=null;origin=null;isActive=!1;constructor(){s(dt).load(ht)}ngOnChanges(t){(t.hasOwnProperty("textLabel")||t.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new ye(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(t){t&&t._closestTab===this&&(this._templateLabel=t)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=T({type:n,selectors:[["mat-tab"]],contentQueries:function(e,i,a){if(e&1&&it(a,Rt,5)(a,bi,7,lt),e&2){let d;h(d=b())&&(i.templateLabel=d.first),h(d=b())&&(i._explicitContent=d.first)}},viewQuery:function(e,i){if(e&1&&O(lt,7),e&2){let a;h(a=b())&&(i._implicitContent=a.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(e,i){e&2&&v("id",null)},inputs:{disabled:[2,"disabled","disabled",_],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[A([{provide:Be,useExisting:n}]),tt],ngContentSelectors:Et,decls:1,vars:0,template:function(e,i){e&1&&(F(),Xt(0,Ue,1,0,"ng-template"))},encapsulation:2})}return n})(),Pt="mdc-tab-indicator--active",Re="mdc-tab-indicator--no-transition",St=class{_items;_currentItem;constructor(o){this._items=o}hide(){this._items.forEach(o=>o.deactivateInkBar()),this._currentItem=void 0}alignToElement(o){let t=this._items.find(i=>i.elementRef.nativeElement===o),e=this._currentItem;if(t!==e&&(e?.deactivateInkBar(),t)){let i=e?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(i),this._currentItem=t}}},pi=(()=>{class n{_elementRef=s(L);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(t){this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(t){let e=this._elementRef.nativeElement;if(!t||!e.getBoundingClientRect||!this._inkBarContentElement){e.classList.add(Pt);return}let i=e.getBoundingClientRect(),a=t.width/i.width,d=t.left-i.left;e.classList.add(Re),this._inkBarContentElement.style.setProperty("transform",`translateX(${d}px) scaleX(${a})`),e.getBoundingClientRect(),e.classList.remove(Re),e.classList.add(Pt),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(Pt)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let t=this._elementRef.nativeElement.ownerDocument||document,e=this._inkBarElement=t.createElement("span"),i=this._inkBarContentElement=t.createElement("span");e.className="mdc-tab-indicator",i.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",e.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let t=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;t.appendChild(this._inkBarElement)}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",_]}})}return n})();var Fe=(()=>{class n extends pi{elementRef=s(L);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let t;return function(i){return(t||(t=et(n)))(i||n)}})();static \u0275dir=D({type:n,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(e,i){e&2&&(v("aria-disabled",!!i.disabled),f("mat-mdc-tab-disabled",i.disabled))},inputs:{disabled:[2,"disabled","disabled",_]},features:[Q]})}return n})(),Oe={passive:!0},gi=650,ui=100,fi=(()=>{class n{_elementRef=s(L);_changeDetectorRef=s(X);_viewportRuler=s(ve);_dir=s(Tt,{optional:!0});_ngZone=s(J);_platform=s(kt);_sharedResizeObserver=s(Le);_injector=s(gt);_renderer=s(ut);_animationsDisabled=U();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new at;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new at;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){let e=isNaN(t)?0:t;this._selectedIndex!=e&&(this._selectedIndexChanged=!0,this._selectedIndex=e,this._keyManager&&this._keyManager.updateActiveItem(e))}_selectedIndex=0;selectFocusedIndex=new k;indexFocused=new k;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),Oe),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),Oe))}ngAfterContentInit(){let t=this._dir?this._dir.change:Ft("ltr"),e=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Ht(32),Y(this._destroyed)),i=this._viewportRuler.change(150).pipe(Y(this._destroyed)),a=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new oe(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),ct(a,{injector:this._injector}),ot(t,i,e,this._items.changes,this._itemsResized()).pipe(Y(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),a()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(d=>{this.indexFocused.emit(d),this._setTabFocus(d)})}_itemsResized(){return typeof ResizeObserver!="function"?zt:this._items.changes.pipe(rt(this._items),Vt(t=>new Bt(e=>this._ngZone.runOutsideAngular(()=>{let i=new ResizeObserver(a=>e.next(a));return t.forEach(a=>i.observe(a.elementRef.nativeElement)),()=>{i.disconnect()}}))),Qt(1),jt(t=>t.some(e=>e.contentRect.width>0&&e.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!ae(t))switch(t.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let e=this._items.get(this.focusIndex);e&&!e.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager?.onKeydown(t)}}_onContentChanges(){let t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return this._items?!!this._items.toArray()[t]:!0}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();let e=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?e.scrollLeft=0:e.scrollLeft=e.scrollWidth-e.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let t=this.scrollDistance,e=this._getLayoutDirection()==="ltr"?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(e)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){let e=this._tabListContainer.nativeElement.offsetWidth,i=(t=="before"?-1:1)*e/3;return this._scrollTo(this._scrollDistance+i)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;let e=this._items?this._items.toArray()[t]:null;if(!e)return;let i=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:a,offsetWidth:d}=e.elementRef.nativeElement,P,B;this._getLayoutDirection()=="ltr"?(P=a,B=P+d):(B=this._tabListInner.nativeElement.offsetWidth-a,P=B-d);let _t=this.scrollDistance,At=this.scrollDistance+i;P<_t?this.scrollDistance-=_t-P:B>At&&(this.scrollDistance+=Math.min(B-At,P-_t))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let t=this._tabListInner.nativeElement.scrollWidth,e=this._elementRef.nativeElement.offsetWidth,i=t-e>=5;i||(this.scrollDistance=0),i!==this._showPaginationControls&&(this._showPaginationControls=i,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let t=this._tabListInner.nativeElement.scrollWidth,e=this._tabListContainer.nativeElement.offsetWidth;return t-e||0}_alignInkBarToSelectedTab(){let t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,e=t?t.elementRef.nativeElement:null;e?this._inkBar.alignToElement(e):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,e){e&&e.button!=null&&e.button!==0||(this._stopInterval(),Nt(gi,ui).pipe(Y(ot(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:i,distance:a}=this._scrollHeader(t);(a===0||a>=i)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let e=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(e,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:e,distance:this._scrollDistance}}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,inputs:{disablePagination:[2,"disablePagination","disablePagination",_],selectedIndex:[2,"selectedIndex","selectedIndex",Z]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return n})(),vi=(()=>{class n extends fi{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new St(this._items),super.ngAfterContentInit()}_itemSelected(t){t.preventDefault()}static \u0275fac=(()=>{let t;return function(i){return(t||(t=et(n)))(i||n)}})();static \u0275cmp=T({type:n,selectors:[["mat-tab-header"]],contentQueries:function(e,i,a){if(e&1&&it(a,Fe,4),e&2){let d;h(d=b())&&(i._items=d)}},viewQuery:function(e,i){if(e&1&&O(Ke,7)(Ye,7)(Je,7)(ti,5)(ei,5),e&2){let a;h(a=b())&&(i._tabListContainer=a.first),h(a=b())&&(i._tabList=a.first),h(a=b())&&(i._tabListInner=a.first),h(a=b())&&(i._nextPaginator=a.first),h(a=b())&&(i._previousPaginator=a.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(e,i){e&2&&f("mat-mdc-tab-header-pagination-controls-enabled",i._showPaginationControls)("mat-mdc-tab-header-rtl",i._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",_]},features:[Q],ngContentSelectors:Et,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(e,i){e&1&&(F(),r(0,"div",5,0),y("click",function(){return i._handlePaginatorClick("before")})("mousedown",function(d){return i._handlePaginatorPress("before",d)})("touchend",function(){return i._stopInterval()}),C(2,"div",6),l(),r(3,"div",7,1),y("keydown",function(d){return i._handleKeydown(d)}),r(5,"div",8,2),y("cdkObserveContent",function(){return i._onContentChanges()}),r(7,"div",9,3),N(9),l()()(),r(10,"div",10,4),y("mousedown",function(d){return i._handlePaginatorPress("after",d)})("click",function(){return i._handlePaginatorClick("after")})("touchend",function(){return i._stopInterval()}),C(12,"div",6),l()),e&2&&(f("mat-mdc-tab-header-pagination-disabled",i._disableScrollBefore),u("matRippleDisabled",i._disableScrollBefore||i.disableRipple),c(3),f("_mat-animation-noopable",i._animationsDisabled),c(2),v("aria-label",i.ariaLabel||null)("aria-labelledby",i.ariaLabelledby||null),c(5),f("mat-mdc-tab-header-pagination-disabled",i._disableScrollAfter),u("matRippleDisabled",i._disableScrollAfter||i.disableRipple))},dependencies:[nt,Ct],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--mat-tab-divider-height, 1px);
  border-top-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2})}return n})(),yi=new S("MAT_TABS_CONFIG"),Ae=(()=>{class n extends It{_host=s(Lt);_ngZone=s(J);_centeringSub=z.EMPTY;_leavingSub=z.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(rt(this._host._isCenterPosition())).subscribe(t=>{this._host._content&&t&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,selectors:[["","matTabBodyHost",""]],features:[Q]})}return n})(),Lt=(()=>{class n{_elementRef=s(L);_dir=s(Tt,{optional:!0});_ngZone=s(J);_injector=s(gt);_renderer=s(ut);_diAnimationsDisabled=U();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=z.EMPTY;_position;_previousPosition;_onCentering=new k;_beforeCentering=new k;_afterLeavingCenter=new k;_onCentered=new k(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(t){this._positionIndex=t,this._computePositionAnimationState()}constructor(){if(this._dir){let t=s(X);this._dirChangeSubscription=this._dir.change.subscribe(e=>{this._computePositionAnimationState(e),t.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),ct(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(t=>t()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let t=this._elementRef.nativeElement,e=i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),i.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(t,"transitionstart",i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(t,"transitionend",e),this._renderer.listen(t,"transitioncancel",e)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let t=this._position==="center";this._beforeCentering.emit(t),t&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(t){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",t)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(t=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=t=="ltr"?"left":"right":this._positionIndex>0?this._position=t=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),ct(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=T({type:n,selectors:[["mat-tab-body"]],viewQuery:function(e,i){if(e&1&&O(Ae,5)(ii,5),e&2){let a;h(a=b())&&(i._portalHost=a.first),h(a=b())&&(i._contentElement=a.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(e,i){e&2&&v("inert",i._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(e,i){e&1&&(r(0,"div",1,0),V(2,ni,0,0,"ng-template",2),l()),e&2&&f("mat-tab-body-content-left",i._position==="left")("mat-tab-body-content-right",i._position==="right")("mat-tab-body-content-can-animate",i._position==="center"||i._previousPosition==="center")},dependencies:[Ae,fe],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--mat-tab-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2})}return n})(),Ne=(()=>{class n{_elementRef=s(L);_changeDetectorRef=s(X);_ngZone=s(J);_tabsSubscription=z.EMPTY;_tabLabelSubscription=z.EMPTY;_tabBodySubscription=z.EMPTY;_diAnimationsDisabled=U();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new Gt;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(t){this._fitInkBarToContent=t,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){this._indexToSelect=isNaN(t)?null:t}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(t){let e=t+"";this._animationDuration=/^\d+$/.test(e)?t+"ms":e}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(t){this._contentTabIndex=isNaN(t)?null:t}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(t){let e=this._elementRef.nativeElement.classList;e.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&e.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new k;focusChange=new k;animationDone=new k;selectedTabChange=new k(!0);_groupId;_isServer=!s(kt).isBrowser;constructor(){let t=s(yi,{optional:!0});this._groupId=s(mt).getId("mat-tab-group-"),this.animationDuration=t&&t.animationDuration?t.animationDuration:"500ms",this.disablePagination=t&&t.disablePagination!=null?t.disablePagination:!1,this.dynamicHeight=t&&t.dynamicHeight!=null?t.dynamicHeight:!1,t?.contentTabIndex!=null&&(this.contentTabIndex=t.contentTabIndex),this.preserveContent=!!t?.preserveContent,this.fitInkBarToContent=t&&t.fitInkBarToContent!=null?t.fitInkBarToContent:!1,this.stretchTabs=t&&t.stretchTabs!=null?t.stretchTabs:!0,this.alignTabs=t&&t.alignTabs!=null?t.alignTabs:null}ngAfterContentChecked(){let t=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=t){let e=this._selectedIndex==null;if(!e){this.selectedTabChange.emit(this._createChangeEvent(t));let i=this._tabBodyWrapper.nativeElement;i.style.minHeight=i.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((i,a)=>i.isActive=a===t),e||(this.selectedIndexChange.emit(t),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((e,i)=>{e.position=i-t,this._selectedIndex!=null&&e.position==0&&!e.origin&&(e.origin=t-this._selectedIndex)}),this._selectedIndex!==t&&(this._selectedIndex=t,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let t=this._clampTabIndex(this._indexToSelect);if(t===this._selectedIndex){let e=this._tabs.toArray(),i;for(let a=0;a<e.length;a++)if(e[a].isActive){this._indexToSelect=this._selectedIndex=a,this._lastFocusedTabIndex=null,i=e[a];break}!i&&e[t]&&Promise.resolve().then(()=>{e[t].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(t))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(rt(this._allTabs)).subscribe(t=>{this._tabs.reset(t.filter(e=>e._closestTabGroup===this||!e._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(t){let e=this._tabHeader;e&&(e.focusIndex=t)}_focusChanged(t){this._lastFocusedTabIndex=t,this.focusChange.emit(this._createChangeEvent(t))}_createChangeEvent(t){let e=new Dt;return e.index=t,this._tabs&&this._tabs.length&&(e.tab=this._tabs.toArray()[t]),e}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=ot(...this._tabs.map(t=>t._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(t){return Math.min(this._tabs.length-1,Math.max(t||0,0))}_getTabLabelId(t,e){return t.id||`${this._groupId}-label-${e}`}_getTabContentId(t){return`${this._groupId}-content-${t}`}_setTabBodyWrapperHeight(t){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=t;return}let e=this._tabBodyWrapper.nativeElement;e.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(e.style.height=t+"px")}_removeTabBodyWrapperHeight(){let t=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=t.clientHeight,t.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(t,e,i){e.focusIndex=i,t.disabled||(this.selectedIndex=i)}_getTabIndex(t){let e=this._lastFocusedTabIndex??this.selectedIndex;return t===e?0:-1}_tabFocusChanged(t,e){t&&t!=="mouse"&&t!=="touch"&&(this._tabHeader.focusIndex=e)}_bodyCentered(t){t&&this._tabBodies?.forEach((e,i)=>e._setActiveClass(i===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=T({type:n,selectors:[["mat-tab-group"]],contentQueries:function(e,i,a){if(e&1&&it(a,Ot,5),e&2){let d;h(d=b())&&(i._allTabs=d)}},viewQuery:function(e,i){if(e&1&&O(ai,5)(oi,5)(Lt,5),e&2){let a;h(a=b())&&(i._tabBodyWrapper=a.first),h(a=b())&&(i._tabHeader=a.first),h(a=b())&&(i._tabBodies=a)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(e,i){e&2&&(v("mat-align-tabs",i.alignTabs),W("mat-"+(i.color||"primary")),Kt("--mat-tab-animation-duration",i.animationDuration),f("mat-mdc-tab-group-dynamic-height",i.dynamicHeight)("mat-mdc-tab-group-inverted-header",i.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",i.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",_],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",_],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",_],selectedIndex:[2,"selectedIndex","selectedIndex",Z],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",Z],disablePagination:[2,"disablePagination","disablePagination",_],disableRipple:[2,"disableRipple","disableRipple",_],preserveContent:[2,"preserveContent","preserveContent",_],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[A([{provide:ze,useExisting:n}])],ngContentSelectors:Et,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(e,i){e&1&&(F(),r(0,"mat-tab-header",3,0),y("indexFocused",function(d){return i._focusChanged(d)})("selectFocusedIndex",function(d){return i.selectedIndex=d}),E(2,li,8,17,"div",4,yt),l(),p(4,di,1,0),r(5,"div",5,1),E(7,mi,1,10,"mat-tab-body",6,yt),l()),e&2&&(u("selectedIndex",i.selectedIndex||0)("disableRipple",i.disableRipple)("disablePagination",i.disablePagination),Zt("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledby),c(2),R(i._tabs),c(2),g(i._isServer?4:-1),c(),f("_mat-animation-noopable",i._animationsDisabled()),c(2),R(i._tabs))},dependencies:[vi,Fe,ie,nt,It,Lt],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2})}return n})(),Dt=class{index;tab};var je=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=H({type:n});static \u0275inj=j({imports:[K]})}return n})();var Qe=(n,o)=>o.text;function ki(n,o){if(n&1){let t=$();r(0,"div",15),y("click",function(){I(t);let i=m();return M(i.onCardClick(i.zoomedCardIndex()))}),l()}}function wi(n,o){if(n&1&&(r(0,"mat-card-subtitle"),x(1),l()),n&2){let t=m().$implicit;c(),w(t.subtitle)}}function Ci(n,o){if(n&1&&(r(0,"p"),x(1),l()),n&2){let t=m().$implicit;c(),w(t.detailedDescription)}}function Ti(n,o){if(n&1&&(r(0,"li",20),x(1),l()),n&2){let t=o.$implicit;c(),w(t.text)}}function Ii(n,o){if(n&1&&(r(0,"p",21),x(1),l()),n&2){let t=m(2).$implicit;c(),w(t.bottomDescription)}}function Mi(n,o){if(n&1&&(r(0,"ul",19),E(1,Ti,2,1,"li",20,Qe),l(),p(3,Ii,2,1,"p",21)),n&2){let t=m().$implicit;c(),R(t.items),c(2),g(t.bottomDescription?3:-1)}}function Pi(n,o){if(n&1){let t=$();r(0,"mat-card",17),ft("enter-slide-fade-animation"),y("click",function(){let i=I(t).$index,a=m(2);return M(a.onCardClick(i))}),r(1,"mat-card-header")(2,"mat-icon",18),x(3),l(),r(4,"mat-card-title"),x(5),l(),p(6,wi,2,1,"mat-card-subtitle"),l(),r(7,"mat-card-content"),p(8,Ci,2,1,"p"),p(9,Mi,4,1),l()()}if(n&2){let t=o.$implicit,e=o.$index,i=m(2);f("zoomed",i.zoomedCardIndex()===e),u("id",Jt(t.anchor)),v("aria-label","Section "+t.title),c(3),w(t.icon),c(2),w(t.title),c(),g(t.subtitle?6:-1),c(2),g(t.detailedDescription?8:-1),c(),g(t.items&&t.items.length>0?9:-1)}}function Si(n,o){if(n&1&&(r(0,"div",10),E(1,Pi,10,10,"mat-card",16,vt),l()),n&2){let t=m();c(),R(t.services)}}function Li(n,o){if(n&1&&(r(0,"mat-icon",26),x(1),l(),x(2)),n&2){let t=m().$implicit;c(),w(t.icon),c(),Yt(" ",t.title," ")}}function Di(n,o){if(n&1&&(r(0,"p",24),x(1),l()),n&2){let t=m().$implicit;c(),w(t.subtitle)}}function Ei(n,o){if(n&1&&(r(0,"p",25),x(1),l()),n&2){let t=m().$implicit;c(),w(t.detailedDescription)}}function Ri(n,o){if(n&1&&(r(0,"li",20),x(1),l()),n&2){let t=o.$implicit;c(),w(t.text)}}function Oi(n,o){if(n&1&&(r(0,"ul",19),E(1,Ri,2,1,"li",20,Qe),l()),n&2){let t=m().$implicit;c(),R(t.items)}}function Ai(n,o){if(n&1&&(r(0,"mat-tab"),V(1,Li,3,2,"ng-template",22),r(2,"div",23)(3,"h2",13),x(4),l(),p(5,Di,2,1,"p",24),p(6,Ei,2,1,"p",25),p(7,Oi,3,0,"ul",19),l()()),n&2){let t=o.$implicit;c(4),w(t.title),c(),g(t.subtitle?5:-1),c(),g(t.detailedDescription?6:-1),c(),g(t.items&&t.items.length>0?7:-1)}}function Bi(n,o){if(n&1&&(r(0,"mat-tab-group",11),E(1,Ai,8,4,"mat-tab",null,vt),l()),n&2){let t=m();c(),R(t.services)}}var He=class n{servicesDataService=s(Ce);platformId=s(qt);metaService=s(we);services=this.servicesDataService.services();zoomedCardIndex=st(null);isGridView=st(!0);constructor(){this.metaService.updateMetaTags("prestations")}onCardClick(o){te(this.platformId)&&this.scrollToCard(o)}scrollToCard(o){console.log("Scrolling to card index:",o);let t=this.services[o]?.anchor;if(t){let e=document.getElementById(t);if(e){let d=e.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:d,behavior:"smooth"})}}}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=T({type:n,selectors:[["app-services"]],decls:17,vars:2,consts:()=>{let o;o=$localize`:Services page|Page title:Compétences`;let t;t=$localize`:Services page|Page subtitle: Accompagnement juridique sur les enjeux de droit des étrangers, du handicap et de la famille `;let e;e=$localize`:Services page|CTA title:Prêt à commencer votre démarche ?`;let i;i=$localize`:Services page|CTA description: Contactez-moi pour une première consultation et évaluons ensemble vos besoins. `;let a;return a=$localize`:Services page|CTA button:Me contacter`,[o,t,e,i,a,[1,"container","services-page"],["role","button","tabindex","0",1,"overlay"],[1,"page-header"],[1,"mat-display-2"],[1,"mat-headline-5"],[1,"services-grid"],[1,"services-tabs"],[1,"cta-section","text-center"],[1,"mat-headline-4"],["mat-flat-button","","routerLink","/contact",1,"cta-button"],["role","button","tabindex","0",1,"overlay",3,"click"],["role","button","tabindex","0",1,"service-category-card",3,"zoomed","id"],["role","button","tabindex","0",1,"service-category-card",3,"click","id"],["mat-card-avatar","",1,"service-header-icon"],[1,"list"],[1,"list-item"],[1,"description-bottom"],["mat-tab-label",""],["animateText","fade",1,"tab-content"],[1,"mat-headline-6","subtitle"],[1,"description"],[1,"mat-tab-icon"]]},template:function(t,e){t&1&&(r(0,"main"),ft("enter-fade-animation"),r(1,"div",5),p(2,ki,1,0,"div",6),r(3,"header",7)(4,"h1",8),G(5,0),l(),r(6,"p",9),G(7,1),l()(),p(8,Si,3,0,"div",10)(9,Bi,3,0,"mat-tab-group",11),r(10,"section",12)(11,"h2",13),G(12,2),l(),r(13,"p"),G(14,3),l(),r(15,"a",14),G(16,4),l()()()()),t&2&&(c(2),g(e.zoomedCardIndex()!==null?2:-1),c(6),g(e.isGridView()?8:9))},dependencies:[pe,le,_e,me,be,he,de,De,ue,ge,ce,se,Ee,je,Rt,Ot,Ne,ee,ke],styles:['@charset "UTF-8";.services-page[_ngcontent-%COMP%]{padding:2rem 4rem;max-width:1200px;margin:0 auto}.overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background:#9a949499;z-index:999;animation:_ngcontent-%COMP%_fadeIn .3s ease;cursor:pointer}.mat-mdc-card-title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:600}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}.page-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:4rem}.page-header[_ngcontent-%COMP%]   .mat-display-2[_ngcontent-%COMP%]{margin-bottom:1rem}.page-header[_ngcontent-%COMP%]   .view-toggle[_ngcontent-%COMP%]{margin-top:2rem;display:flex;justify-content:center;align-items:center}.services-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.1rem;margin-bottom:4rem}.services-grid[_ngcontent-%COMP%]:has(.zoomed)   .service-category-card[_ngcontent-%COMP%]:not(.zoomed){opacity:.9;filter:blur(1px);transform:scale(.95);pointer-events:none}.service-category-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;border-radius:1.05rem;box-shadow:0 6px 18px #00000017;border:1.5px solid var(--mat-divider-color, --mat-primary-color);background:linear-gradient(155deg,#ffffff8c,#fff0 35%),var(--mat-card-background, #fff);padding:1rem 1.1rem;cursor:pointer;position:relative;overflow:hidden;transition:box-shadow .25s cubic-bezier(.4,0,.2,1),border-color .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1)}.service-category-card[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,var(--app-navbar-bg, #79082b),rgba(121,8,43,.18))}.service-category-card[_ngcontent-%COMP%]:hover{box-shadow:0 12px 28px #7540402e;border-color:#56202038;transform:translateY(-2px)}.service-category-card[_ngcontent-%COMP%]   .mat-mdc-card-header[_ngcontent-%COMP%]{min-height:auto;margin-bottom:.5rem;align-items:center;gap:.85rem}.service-category-card[_ngcontent-%COMP%]   .mat-mdc-card-avatar[_ngcontent-%COMP%]{margin:0;width:2.5rem;height:2.5rem;min-width:2.5rem;min-height:2.5rem;display:inline-flex;align-items:center;justify-content:center;flex:0 0 2.5rem;color:var(--app-navbar-bg, #79082b)}.service-category-card[_ngcontent-%COMP%]   .mat-mdc-card-title[_ngcontent-%COMP%]{font-size:clamp(1.2rem,1.48vw,1.38rem);font-weight:900;color:var(--app-navbar-bg, #79082b);letter-spacing:.01em}.service-category-card[_ngcontent-%COMP%]   .mat-mdc-card-subtitle[_ngcontent-%COMP%]{font-size:.95rem;line-height:1.45;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.service-category-card[_ngcontent-%COMP%]   .service-header-icon[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;font-size:2.2rem;width:100%;height:100%;line-height:1;--mat-icon-color: var(--app-navbar-bg, #79082b);color:var(--app-navbar-bg, #79082b)}.service-category-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]{flex-grow:1;padding:0;font-size:1rem;color:var(--mat-text-secondary-color);margin-top:.25rem}.service-category-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]{overflow:scroll}.service-category-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]:before{content:"\\25b9";color:var(--mat-button-filled-container-color);margin-right:8px;font-weight:700}.service-category-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{padding-left:0;margin:.55rem 0 0;list-style:none}.service-category-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .list-item[_ngcontent-%COMP%]{padding:.55rem 0;line-height:1.55;border-bottom:1px solid var(--mat-sys-outline-variant)}.service-category-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .list-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.cta-section[_ngcontent-%COMP%]{padding:3rem;color:var(--mat-sys-on-primary-container);border-radius:8px}.cta-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#000!important;font-weight:400!important;font-size:clamp(1.5rem,3.5vw,2.125rem)!important;margin-bottom:1rem!important}.cta-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000}.cta-section[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%]{margin-top:1.5rem;padding:1rem 2rem;font-size:1.1rem;transition:transform 1s cubic-bezier(.34,1.56,.64,1),box-shadow 1s ease!important;will-change:transform}.cta-section[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%]:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 8px 24px #0003}.cta-section[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%]:active{transform:translateY(0) scale(.98);box-shadow:0 2px 8px #00000026;transition-duration:.1s}.services-tabs[_ngcontent-%COMP%]{margin-bottom:4rem}.services-tabs[_ngcontent-%COMP%]     .mdc-tab{padding:0 .5rem}.services-tabs[_ngcontent-%COMP%]   .mat-tab-icon[_ngcontent-%COMP%]{margin-right:.5rem}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]{padding:2rem;max-width:900px;margin:0 auto;text-wrap:pretty;-webkit-hyphens:auto;hyphens:auto}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:1rem}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{margin-bottom:1.5rem;color:var(--mat-sys-secondary);font-weight:500}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{margin-bottom:1.5rem;line-height:1.75}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{list-style:none;padding:0}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list-item[_ngcontent-%COMP%]{padding:.75rem 0;border-bottom:1px solid var(--mat-sys-outline-variant);line-height:1.7}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list-item[_ngcontent-%COMP%]:before{content:"\\25b9";margin-right:8px;font-weight:700}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list-item[_ngcontent-%COMP%]:last-child{border-bottom:none}@media(max-width:1300px){.services-page[_ngcontent-%COMP%]{padding:2rem}}@media(max-width:1100px){.services-page[_ngcontent-%COMP%]{padding:1rem}.services-grid[_ngcontent-%COMP%]{display:flex;flex-direction:column}.service-category-card[_ngcontent-%COMP%]{cursor:default}.service-category-card[_ngcontent-%COMP%]:hover{transform:none;box-shadow:none}}@media(max-width:600px){.services-tabs[_ngcontent-%COMP%]   .mat-tab-icon[_ngcontent-%COMP%]{margin-right:.4rem}.services-page[_ngcontent-%COMP%]{padding:1rem}.page-header[_ngcontent-%COMP%]{margin-bottom:2rem}.services-grid[_ngcontent-%COMP%]{gap:1rem;margin-bottom:2rem}.services-tabs[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]{padding:1rem}.cta-section[_ngcontent-%COMP%]{padding:1.5rem}.cta-section[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%]{width:100%}}'],changeDetection:0})};export{He as Services};
