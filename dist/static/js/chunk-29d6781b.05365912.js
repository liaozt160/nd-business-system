(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29d6781b"],{2017:function(e,t,o){"use strict";var n=o("3b76"),i=o.n(n);i.a},"3b76":function(e,t,o){},"743a":function(e,t,o){},9399:function(e,t,o){"use strict";var n=o("743a"),i=o.n(n);i.a},"9ed6":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[o("div",{staticClass:"title-container"},[o("h3",{staticClass:"title"},[e._v("\n        "+e._s(e.$t("login.title"))+"\n      ")]),e._v(" "),o("lang-select",{staticClass:"set-language"})],1),e._v(" "),o("el-form-item",{attrs:{prop:"email"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),o("el-input",{ref:"email",attrs:{placeholder:e.$t("login.username"),name:"email",type:"text",tabindex:"1","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.email,callback:function(t){e.$set(e.loginForm,"email",t)},expression:"loginForm.email"}})],1),e._v(" "),o("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(t){e.capsTooltip=t},expression:"capsTooltip"}},[o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),o("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:e.$t("login.password"),name:"password",tabindex:"2",maxlength:"15","auto-complete":"on"},on:{blur:function(t){e.capsTooltip=!1}},nativeOn:{keyup:[function(t){return e.checkCapslock(t)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}]},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),o("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v(e._s(e.$t("login.logIn"))+"\n    ")])],1),e._v(" "),-1!==e.locationOrigin.indexOf("dev")||-1!==e.locationOrigin.indexOf("192.168.9.26:8090")?o("div",{staticStyle:{"text-align":"center",color:"#fff","font-size":"14px"}},[o("p",[e._v("管理员账号：jason@ylbservices.com  密码：111111")]),e._v(" "),o("p",[e._v("买方中介账号：buyer@ylbservices.com  密码：111111")]),e._v(" "),o("p",[e._v("卖方中介账号：business@ylbservices.com  密码：111111")])]):e._e()],1)},i=[],s=(o("ac6a"),o("456d"),o("3b2b"),o("1131")),a={name:"Login",components:{LangSelect:s["a"]},data:function(){var e=this,t=new RegExp("^([a-zA-Z0-9]+|[~!@#$%^&*()_+-=]+){6,15}$"),o=function(o,n,i){t.test(n)?i():i(new Error(e.$t("login.pwdError")))};return{locationOrigin:window.location.origin,loginForm:{email:"",password:""},loginRules:{email:[{required:!0,message:this.$t("empty")},{type:"email",message:this.$t("userEdit.inputEmail")}],password:[{required:!0,trigger:"blur",validator:o}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},mounted:function(){""===this.loginForm.email?this.$refs.email.focus():""===this.loginForm.password&&this.$refs.password.focus()},methods:{checkCapslock:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.shiftKey,o=e.key;o&&1===o.length&&(this.capsTooltip=!!(t&&o>="a"&&o<="z"||!t&&o>="A"&&o<="Z")),"CapsLock"===o&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick(function(){e.$refs.password.focus()})},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then(function(t){e.$router.push({path:"/",query:e.otherQuery}),e.loading=!1}).catch(function(){e.loading=!1})})},getOtherQuery:function(e){return Object.keys(e).reduce(function(t,o){return"redirect"!==o&&(t[o]=e[o]),t},{})}}},r=a,l=(o("2017"),o("9399"),o("2877")),c=Object(l["a"])(r,n,i,!1,null,"5e59c806",null);t["default"]=c.exports}}]);