(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0250c17c"],{2017:function(e,t,o){"use strict";var n=o("3b76"),s=o.n(n);s.a},"3b76":function(e,t,o){},4955:function(e,t,o){"use strict";var n=o("5f95"),s=o.n(n);s.a},"5f95":function(e,t,o){},"9ed6":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[o("div",{staticClass:"title-container"},[o("h3",{staticClass:"title"},[e._v("\n        "+e._s(e.$t("login.title"))+"\n      ")]),e._v(" "),o("lang-select",{staticClass:"set-language"})],1),e._v(" "),o("el-form-item",{attrs:{prop:"username"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),o("el-input",{ref:"username",attrs:{placeholder:e.$t("login.username"),name:"username",type:"text",tabindex:"1","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.email,callback:function(t){e.$set(e.loginForm,"email",t)},expression:"loginForm.email"}})],1),e._v(" "),o("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(t){e.capsTooltip=t},expression:"capsTooltip"}},[o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),o("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:e.$t("login.password"),name:"password",tabindex:"2","auto-complete":"on"},on:{blur:function(t){e.capsTooltip=!1}},nativeOn:{keyup:[function(t){return e.checkCapslock(t)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}]},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),o("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("\n      "+e._s(e.$t("login.logIn"))+"\n    ")])],1),e._v(" "),e._m(0)],1)},s=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticStyle:{"text-align":"center",color:"#fff","font-size":"14px"}},[o("p",[e._v("管理员账号： jason@ylbservices.com  密码：111111")]),e._v(" "),o("p",[e._v("买方中介账号： buyer@ylbservices.com  密码：111111")]),e._v(" "),o("p",[e._v("卖方中介账号： business@ylbservices.com  密码：111111")])])}],r=(o("ac6a"),o("456d"),o("61f7")),i=o("1131"),a={name:"Login",components:{LangSelect:i["a"]},data:function(){var e=this,t=function(t,o,n){Object(r["d"])(o)?n():n(new Error(e.$t("login.nameError")))},o=function(t,o,n){o.length<6?n(new Error(e.$t("login.pwdError"))):n()};return{loginForm:{email:"jason@ylbservices.com",password:"111111"},loginRules:{email:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:o}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.email?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.shiftKey,o=e.key;o&&1===o.length&&(this.capsTooltip=!!(t&&o>="a"&&o<="z"||!t&&o>="A"&&o<="Z")),"CapsLock"===o&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick(function(){e.$refs.password.focus()})},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then(function(t){e.$router.push({path:"/",query:e.otherQuery}),e.loading=!1}).catch(function(){e.loading=!1})})},getOtherQuery:function(e){return Object.keys(e).reduce(function(t,o){return"redirect"!==o&&(t[o]=e[o]),t},{})}}},l=a,c=(o("2017"),o("4955"),o("2877")),p=Object(c["a"])(l,n,s,!1,null,"52e0ee51",null);t["default"]=p.exports}}]);