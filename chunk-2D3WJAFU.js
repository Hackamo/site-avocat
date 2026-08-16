import{Jb as g,La as o,Ma as y,Na as r,S as f,U as v,W as d,ec as c,ib as l,jb as u,pa as h,ra as b,ud as C,wc as x,yb as m,zb as i}from"./chunk-65I3OEYF.js";var I=["*"],A=[[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],[["","mat-card-image",""],["","matCardImage",""],["","mat-card-sm-image",""],["","matCardImageSmall",""],["","mat-card-md-image",""],["","matCardImageMedium",""],["","mat-card-lg-image",""],["","matCardImageLarge",""],["","mat-card-xl-image",""],["","matCardImageXLarge",""]],"*"],T=[`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,`[mat-card-image], [matCardImage],
                    [mat-card-sm-image], [matCardImageSmall],
                    [mat-card-md-image], [matCardImageMedium],
                    [mat-card-lg-image], [matCardImageLarge],
                    [mat-card-xl-image], [matCardImageXLarge]`,"*"],F=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],_=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],k=new v("MAT_CARD_CONFIG"),V=(()=>{class t{appearance;constructor(){let a=d(k,{optional:!0});this.appearance=a?.appearance||"raised"}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=o({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,n){e&2&&g("mat-mdc-card-outlined",n.appearance==="outlined")("mdc-card--outlined",n.appearance==="outlined")("mat-mdc-card-filled",n.appearance==="filled")("mdc-card--filled",n.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:I,decls:1,vars:0,template:function(e,n){e&1&&(m(),i(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return t})(),H=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275dir=r({type:t,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return t})(),G=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=o({type:t,selectors:[["mat-card-title-group"]],hostAttrs:[1,"mat-mdc-card-title-group"],ngContentSelectors:T,decls:4,vars:0,template:function(e,n){e&1&&(m(A),l(0,"div"),i(1),u(),i(2,1),i(3,2))},encapsulation:2,changeDetection:0})}return t})(),O=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275dir=r({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return t})(),P=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275dir=r({type:t,selectors:[["mat-card-subtitle"],["","mat-card-subtitle",""],["","matCardSubtitle",""]],hostAttrs:[1,"mat-mdc-card-subtitle"]})}return t})(),X=(()=>{class t{align="start";static \u0275fac=function(e){return new(e||t)};static \u0275dir=r({type:t,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(e,n){e&2&&g("mat-mdc-card-actions-align-end",n.align==="end")},inputs:{align:"align"},exportAs:["matCardActions"]})}return t})(),$=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=o({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:_,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(e,n){e&1&&(m(F),i(0),l(1,"div",0),i(2,1),u(),i(3,2))},encapsulation:2,changeDetection:0})}return t})();var q=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275dir=r({type:t,selectors:[["","mat-card-avatar",""],["","matCardAvatar",""]],hostAttrs:[1,"mat-mdc-card-avatar"]})}return t})();var W=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275mod=y({type:t});static \u0275inj=f({imports:[C]})}return t})();var M=class t{element=d(h);platformId=d(b);animateText=c("fade");threshold=c(.4);delay=c(200);duration=c(800);ngAfterViewInit(){if(!x(this.platformId))return;let p=this.animateText(),a=this.element.nativeElement;a.style.transitionDuration=`${this.duration()}ms`,this.delay()>0&&(a.style.transitionDelay=`${this.delay()}ms`),requestAnimationFrame(()=>{a.classList.add("animate-text",`animate-text-${p}`);let e=new IntersectionObserver(D=>{D.forEach(s=>{s.isIntersecting&&(s.target.classList.add("visible"),e.unobserve(s.target))})},{threshold:this.threshold()});e.observe(a);let n=a.getBoundingClientRect();n.top<window.innerHeight&&n.bottom>0&&n.left<window.innerWidth&&n.right>0&&a.classList.add("visible")})}static \u0275fac=function(a){return new(a||t)};static \u0275dir=r({type:t,selectors:[["","animateText",""],["h1"],["h2"],["h3"],["h4"],["h5"],["h6"],["p"],["li"],["blockquote"],["mat-card-title"],["mat-card-subtitle"],["mat-label"],["mat-option"],["a","mat-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""],["a","mat-raised-button",""],["button","mat-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["button","mat-raised-button",""]],inputs:{animateText:[1,"animateText"],threshold:[1,"threshold"],delay:[1,"delay"],duration:[1,"duration"]}})};export{V as a,H as b,G as c,O as d,P as e,X as f,$ as g,q as h,W as i,M as j};
