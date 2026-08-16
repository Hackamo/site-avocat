import{b as _e,c as ge,d as pe}from"./chunk-T7VBDTGR.js";import{a as ye}from"./chunk-3JF7XFLZ.js";import{a as Ce,e as Me,g as Oe,i as Pe,j as Ee}from"./chunk-7L34W4UU.js";import"./chunk-CERAZN37.js";import"./chunk-YYIH2C2F.js";import{b as fe,d as ve}from"./chunk-F3EZID6W.js";import"./chunk-CQUSIVIO.js";import{j as ue}from"./chunk-2D3WJAFU.js";import{l as le}from"./chunk-3XL3JZ63.js";import{a as xe}from"./chunk-AQISL5D3.js";import"./chunk-HKAR3RS6.js";import{$a as P,Bb as Z,Cb as T,Db as S,Fb as Y,Gb as K,Hb as J,Jb as I,La as x,Lb as W,Mb as ee,Nb as ne,Q as z,Qc as me,U as G,Ub as y,Vb as ce,W as l,Ya as M,Za as V,_a as O,aa as D,ba as $,bb as E,bc as A,cb as f,cd as se,db as v,dc as te,eb as s,fb as r,fc as ae,ga as C,gb as i,ha as F,hb as g,hc as oe,ic as k,jc as ie,ka as p,ma as N,nb as U,nd as he,pa as X,qb as h,qd as be,ra as q,rd as ke,vb as b,vc as re,wc as de,xb as j,yb as Q,za as m,zb as H}from"./chunk-65I3OEYF.js";var Ae=["input"],Le=["label"],we=["*"],L={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},Be=new G("mat-checkbox-default-options",{providedIn:"root",factory:()=>L}),d=(function(t){return t[t.Init=0]="Init",t[t.Checked=1]="Checked",t[t.Unchecked=2]="Unchecked",t[t.Indeterminate=3]="Indeterminate",t})(d||{}),w=class{source;checked},Te=(()=>{class t{_elementRef=l(X);_changeDetectorRef=l(oe);_ngZone=l(F);_animationsDisabled=he();_options=l(Be,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let c=new w;return c.source=this,c.checked=e,c}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new C;indeterminateChange=new C;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=d.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){l(me).load(ke);let e=l(new te("tabindex"),{optional:!0});this._options=this._options||L,this.color=this._options.color||L.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=l(se).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let c=e!=this._indeterminate();this._indeterminate.set(e),c&&(e?this._transitionCheckState(d.Indeterminate):this._transitionCheckState(this.checked?d.Checked:d.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=p(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let c=this._currentCheckState,n=this._getAnimationTargetElement();if(!(c===e||!n)&&(this._currentAnimationClass&&n.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(c,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){n.classList.add(this._currentAnimationClass);let a=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{n.classList.remove(a)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?d.Checked:d.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,c){if(this._animationsDisabled)return"";switch(e){case d.Init:if(c===d.Checked)return this._animationClasses.uncheckedToChecked;if(c==d.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case d.Unchecked:return c===d.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case d.Checked:return c===d.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case d.Indeterminate:return c===d.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let c=this._inputElement;c&&(c.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(c){return new(c||t)};static \u0275cmp=x({type:t,selectors:[["mat-checkbox"]],viewQuery:function(c,n){if(c&1&&Z(Ae,5)(Le,5),c&2){let a;T(a=S())&&(n._inputElement=a.first),T(a=S())&&(n._labelElement=a.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(c,n){c&2&&(U("id",n.id),M("tabindex",null)("aria-label",null)("aria-labelledby",null),W(n.color?"mat-"+n.color:"mat-accent"),I("_mat-animation-noopable",n._animationsDisabled)("mdc-checkbox--disabled",n.disabled)("mat-mdc-checkbox-disabled",n.disabled)("mat-mdc-checkbox-checked",n.checked)("mat-mdc-checkbox-disabled-interactive",n.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",k],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",k],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",k],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:ie(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",k],checked:[2,"checked","checked",k],disabled:[2,"disabled","disabled",k],indeterminate:[2,"indeterminate","indeterminate",k]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[y([{provide:fe,useExisting:z(()=>t),multi:!0},{provide:ve,useExisting:t,multi:!0}]),N],ngContentSelectors:we,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(c,n){if(c&1&&(Q(),r(0,"div",3),b("click",function(u){return n._preventBubblingFromLabel(u)}),r(1,"div",4,0)(3,"div",5),b("click",function(){return n._onTouchTargetClick()}),i(),r(4,"input",6,1),b("blur",function(){return n._onBlur()})("click",function(){return n._onInputClick()})("change",function(u){return n._onInteractionEvent(u)}),i(),g(6,"div",7),r(7,"div",8),D(),r(8,"svg",9),g(9,"path",10),i(),$(),g(10,"div",11),i(),g(11,"div",12),i(),r(12,"label",13,2),H(14),i()()),c&2){let a=J(2);s("labelPosition",n.labelPosition),m(4),I("mdc-checkbox--selected",n.checked),s("checked",n.checked)("indeterminate",n.indeterminate)("disabled",n.disabled&&!n.disabledInteractive)("id",n.inputId)("required",n.required)("tabIndex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex),M("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby)("aria-describedby",n.ariaDescribedby)("aria-checked",n.indeterminate?"mixed":null)("aria-controls",n.ariaControls)("aria-disabled",n.disabled&&n.disabledInteractive?!0:null)("aria-expanded",n.ariaExpanded)("aria-owns",n.ariaOwns)("name",n.name)("value",n.value),m(7),s("matRippleTrigger",a)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",!0),m(),s("for",n.inputId)}},dependencies:[be,ye],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})();var Re=["filtersSection"],ze=()=>[1,2,3],Ge=(t,o)=>o.slug;function De(t,o){if(t&1&&(r(0,"mat-option",17),ee(1),i()),t&2){let e=o.$implicit;s("value",e),m(),ne(e)}}function $e(t,o){t&1&&(r(0,"div",23),g(1,"div",24)(2,"div",25)(3,"div",26)(4,"div",27),i())}function Fe(t,o){t&1&&f(0,$e,5,0,"div",23,E),t&2&&v(ce(0,ze))}function Ne(t,o){if(t&1&&(r(0,"app-blog-article-card",28),V("enter-slide-fade-animation"),i()),t&2){let e=o.$implicit;s("article",e)}}function Xe(t,o){if(t&1&&f(0,Ne,1,1,"app-blog-article-card",28,Ge),t&2){let e=j();v(e.articles())}}function qe(t,o){t&1&&(r(0,"p",22),h(1,7),i())}var Se=class t{blogData=l(pe);metaService=l(xe);platformId=l(q);savedArticles=l(_e);loading=this.blogData.loading;selectedCategory=p("all");searchText=p("");showFavoritesOnly=p(!1);filtersSection=ae("filtersSection");allArticles=this.blogData.articles;categories=A(()=>{let o=this.allArticles();return[...new Set(o.map(c=>c.category))].sort()});articles=A(()=>{let o=this.selectedCategory(),e=this.searchText().toLowerCase(),c=this.showFavoritesOnly(),n=this.allArticles();return o!=="all"&&(n=n.filter(a=>a.category===o)),e&&(n=n.filter(a=>a.title.toLowerCase().includes(e)||a.summary.toLowerCase().includes(e)||a.category.toLowerCase().includes(e))),c&&(n=n.filter(a=>this.savedArticles.isSaved(a.slug))),n});ngOnInit(){this.metaService.updateMetaTags("blog"),this.blogData.loadArticles()}onCategoryChange(o){this.selectedCategory.set(o)}onSearchChange(o){let e=o.target.value;if(this.searchText.set(e),de(this.platformId)){let c=this.filtersSection();c&&requestAnimationFrame(()=>{c.nativeElement.scrollIntoView({behavior:"smooth",block:"start"})})}}onFavoritesToggle(o){this.showFavoritesOnly.set(o)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=x({type:t,selectors:[["app-blog"]],viewQuery:function(e,c){e&1&&Y(c.filtersSection,Re,5),e&2&&K()},features:[y([])],decls:28,vars:5,consts:()=>{let o;o=$localize`:Blog page|Search placeholder:Titre, résumé, catégorie...`;let e;e=$localize`:Blog page|Page title:Blog`;let c;c=$localize`:Blog page|Page subtitle: Actualités et conseils en droit des étrangers `;let n;n=$localize`:Blog page|Search label:Rechercher`;let a;a=$localize`:Blog page|Category filter label:Filtrer par catégorie`;let u;u=$localize`:Blog page|All categories option:Toutes`;let B;B=$localize`:Blog page|Favorites filter label: Afficher uniquement les favoris `;let R;return R=$localize`:Blog page|No articles message:Aucun article disponible.`,[["filtersSection",""],e,c,n,a,u,B,R,[1,"container","blog-page"],[1,"page-header"],[1,"mat-display-2"],["animateText","fade",1,"mat-headline-5"],[1,"blog-filters"],["appearance","outline",1,"filter-field"],["matInput","","type","text","placeholder",o,3,"input","keydown.enter","value"],[3,"selectionChange","value"],["value","all"],[3,"value"],[1,"filter-checkbox"],[3,"change","checked"],[1,"blog-list"],[1,"blog-cards"],["animateText","fade",1,"mat-body-1"],[1,"blog-card-skeleton"],[1,"skeleton-image"],[1,"skeleton-title"],[1,"skeleton-text"],[1,"skeleton-text","short"],["animateOnEnter","fade",3,"article"]]},template:function(e,c){e&1&&(r(0,"main",8)(1,"header",9)(2,"h1",10),h(3,1),i(),r(4,"p",11),h(5,2),i()(),r(6,"section",12,0)(8,"mat-form-field",13)(9,"mat-label"),h(10,3),i(),r(11,"input",14),b("input",function(a){return c.onSearchChange(a)})("keydown.enter",function(a){return a.target.blur()}),i()(),r(12,"mat-form-field",13)(13,"mat-label"),h(14,4),i(),r(15,"mat-select",15),b("selectionChange",function(a){return c.onCategoryChange(a.value)}),r(16,"mat-option",16),h(17,5),i(),f(18,De,2,2,"mat-option",17,E),i()(),r(20,"div",18)(21,"mat-checkbox",19),b("change",function(a){return c.onFavoritesToggle(a.checked)}),h(22,6),i()()(),r(23,"section",20)(24,"div",21),O(25,Fe,2,1)(26,Xe,2,0),i(),O(27,qe,2,0,"p",22),i()()),e&2&&(m(11),s("value",c.searchText()),m(4),s("value",c.selectedCategory()),m(3),v(c.categories()),m(3),s("checked",c.showFavoritesOnly()),m(4),P(c.loading()?25:26),m(2),P(!c.articles().length&&!c.loading()?27:-1))},dependencies:[re,le,ge,ue,Me,Ce,Ee,Pe,Oe,Te],styles:[".page-header[_ngcontent-%COMP%]{padding-left:1.5rem}app-blog-article-card[_ngcontent-%COMP%]{width:80%}.blog-page[_ngcontent-%COMP%]   .blog-filters[_ngcontent-%COMP%]{display:flex;gap:1rem;flex-wrap:wrap;padding-left:1.5rem}.blog-page[_ngcontent-%COMP%]   .blog-filters[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]{flex:1;min-width:200px;font-size:1.1rem!important;font-weight:500!important}.blog-page[_ngcontent-%COMP%]   .blog-filters[_ngcontent-%COMP%]   .filter-checkbox[_ngcontent-%COMP%]{display:flex;align-items:center}.blog-page[_ngcontent-%COMP%]   .blog-filters[_ngcontent-%COMP%]   .filter-checkbox[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]     .mdc-checkbox__native-control:checked~.mdc-checkbox__background{border-color:var(--mat-button-filled-container-color);background-color:var(--mat-button-filled-container-color);padding:8px}.blog-page[_ngcontent-%COMP%]   .blog-cards[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:2rem}.blog-page[_ngcontent-%COMP%]   .mat-mdc-select[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:500!important}.blog-page[_ngcontent-%COMP%]   .blog-card[_ngcontent-%COMP%]{text-decoration:none;color:inherit;display:block;width:340px;max-width:100%;border-radius:1.25rem;transition:transform .18s cubic-bezier(.4,0,.2,1),box-shadow .18s cubic-bezier(.4,0,.2,1);margin-bottom:2rem;margin-top:0;box-shadow:0 1px #00000008}.blog-page[_ngcontent-%COMP%]   .blog-card[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{height:100%;border-radius:1.25rem;box-shadow:0 4px 24px #0000001a;border:1.5px solid var(--mat-divider-color, #e0e0e0);background:var(--mat-card-background, #fff);display:flex;flex-direction:column;min-height:180px;padding:1.25rem 1.5rem;transition:box-shadow .18s cubic-bezier(.4,0,.2,1),border-color .18s cubic-bezier(.4,0,.2,1)}.blog-page[_ngcontent-%COMP%]   .blog-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:0;margin-bottom:.5rem}.blog-page[_ngcontent-%COMP%]   .blog-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.18rem;font-weight:600;color:var(--mat-primary-color);letter-spacing:.01em}.blog-page[_ngcontent-%COMP%]   .blog-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{font-size:1rem;color:var(--mat-text-secondary-color)}.blog-page[_ngcontent-%COMP%]   .blog-card[_ngcontent-%COMP%]:hover   mat-card[_ngcontent-%COMP%]{box-shadow:0 8px 32px #00000029;border-color:var(--mat-primary-color, #1976d2);transform:translateY(-6px) scale(1.035)}.blog-page[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{height:100%;border-radius:1.25rem;box-shadow:0 4px 24px #0000001a;border:1.5px solid var(--mat-divider-color, #e0e0e0);background:var(--mat-card-background, #fff);display:flex;flex-direction:column;min-height:180px;padding:1.25rem 1.5rem;transition:box-shadow .18s cubic-bezier(.4,0,.2,1),border-color .18s cubic-bezier(.4,0,.2,1)}.blog-page[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:0;margin-bottom:.5rem}.blog-page[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.18rem;font-weight:600;color:var(--mat-primary-color);letter-spacing:.01em}.blog-page[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{font-size:1rem;color:var(--mat-text-secondary-color)}.blog-page[_ngcontent-%COMP%]:hover   mat-card[_ngcontent-%COMP%]{box-shadow:0 8px 32px #00000029;border-color:var(--mat-primary-color, #1976d2);transform:translateY(-6px) scale(1.035)}.blog-page[_ngcontent-%COMP%]   .blog-card-skeleton[_ngcontent-%COMP%]{padding:1.25rem 1.5rem;border-radius:1.25rem;background:var(--mat-card-background, #fff);display:flex;flex-direction:column;gap:1rem;min-height:150px;margin-bottom:2rem}.blog-page[_ngcontent-%COMP%]   .blog-card-skeleton[_ngcontent-%COMP%]   .skeleton-image[_ngcontent-%COMP%]{width:100%;height:150px;border-radius:.5rem;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0,#f0f0f0 75%);background-size:200% 100%;animation:_ngcontent-%COMP%_shimmer 1.5s infinite}.blog-page[_ngcontent-%COMP%]   .blog-card-skeleton[_ngcontent-%COMP%]   .skeleton-title[_ngcontent-%COMP%]{width:70%;height:1.25rem;border-radius:.25rem;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0,#f0f0f0 75%);background-size:200% 100%;animation:_ngcontent-%COMP%_shimmer 1.5s infinite}.blog-page[_ngcontent-%COMP%]   .blog-card-skeleton[_ngcontent-%COMP%]   .skeleton-text[_ngcontent-%COMP%]{width:100%;height:.875rem;border-radius:.25rem;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0,#f0f0f0 75%);background-size:200% 100%;animation:_ngcontent-%COMP%_shimmer 1.5s infinite}.blog-page[_ngcontent-%COMP%]   .blog-card-skeleton[_ngcontent-%COMP%]   .skeleton-text.short[_ngcontent-%COMP%]{width:60%}@keyframes _ngcontent-%COMP%_shimmer{0%{background-position:-200% 0}to{background-position:200% 0}}@media(max-width:920px){app-blog-article-card[_ngcontent-%COMP%]{width:100%}}"]})};export{Se as Blog};
