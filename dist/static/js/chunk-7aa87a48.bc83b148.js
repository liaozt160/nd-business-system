(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7aa87a48"],{2713:function(t,e,i){"use strict";var a=i("dc2b"),s=i.n(a);s.a},"333d":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":t.pageSize,total:t.total,layout:"prev, pager, next"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.handleCurrentChange}})],1)},s=[];i("c5f6");Math.easeInOutQuad=function(t,e,i,a){return t/=a/2,t<1?i/2*t*t+e:(t--,-i/2*(t*(t-2)-1)+e)};var l=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function n(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(t,e,i){var a=r(),s=t-a,o=20,u=0;e="undefined"===typeof e?500:e;var d=function t(){u+=o;var r=Math.easeInOutQuad(u,a,s,e);n(r),u<e?l(t):i&&"function"===typeof i&&i()};d()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},pageSize:{type:Number,default:1},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}}},methods:{handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&o(0,800)}}},d=u,c=(i("f842"),i("2877")),p=Object(c["a"])(d,a,s,!1,null,"00be67d7",null);e["a"]=p.exports},a341:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("aside",[i("h3",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.$t("route.userManagement")))])]),t._v(" "),i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:t.$t("table.search"),clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.q,callback:function(e){t.$set(t.listQuery,"q",e)},expression:"listQuery.q"}}),t._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("\n      "+t._s(t.$t("table.search"))+"\n    ")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("\n      "+t._s(t.$t("table.add"))+"\n    ")])],1),t._v(" "),i("div",{staticClass:"companyTable"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[i("el-table-column",{attrs:{prop:"name",sortable:"",align:"center",label:t.$t("table.name"),"min-width":"150"}}),t._v(" "),i("el-table-column",{attrs:{prop:"email",align:"center",label:t.$t("table.email"),"min-width":"200"}}),t._v(" "),i("el-table-column",{attrs:{prop:"phone",align:"center",label:t.$t("table.phone"),"min-width":"150"}}),t._v(" "),i("el-table-column",{attrs:{prop:"role",filters:[{text:t.$t("userEdit.admin"),value:"1"},{text:t.$t("userEdit.buyerBroker"),value:"2"},{text:t.$t("userEdit.businessBroker"),value:"3"}],"filter-method":t.filterHandler,"filter-placement":"bottom-end",align:"center",label:t.$t("userEdit.UserRoles"),"min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[1==a.role?i("el-tag",{staticStyle:{width:"110px"}},[t._v(t._s(t.$t("userEdit.admin")))]):t._e(),t._v(" "),2==a.role?i("el-tag",{staticStyle:{width:"110px"}},[t._v(t._s(t.$t("userEdit.buyerBroker")))]):t._e(),t._v(" "),3==a.role?i("el-tag",{staticStyle:{width:"110px"}},[t._v(t._s(t.$t("userEdit.businessBroker")))]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"status",align:"center",label:t.$t("table.status"),"min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[2==a.status?i("el-tag",{staticStyle:{width:"80px"},attrs:{type:"danger"}},[t._v(t._s(t.$t("table.isDisabled")))]):t._e(),t._v(" "),1==a.status?i("el-tag",{staticStyle:{width:"80px"},attrs:{type:"success"}},[t._v(t._s(t.$t("table.isEnable")))]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"address",align:"center",label:t.$t("table.operate"),fixed:"right","min-width":"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){return t.handleEdit(e.$index,e)}}},[t._v(t._s(t.$t("table.edit")))]),t._v(" "),2==e.row.status?i("el-button",{staticStyle:{width:"80px"},attrs:{size:"mini",type:"success",plain:""},on:{click:function(i){return t.handleEnable(1,e)}}},[t._v(t._s(t.$t("table.Enable")))]):t._e(),t._v(" "),1==e.row.status?i("el-button",{staticStyle:{width:"80px"},attrs:{size:"mini",type:"danger",plain:""},on:{click:function(i){return t.handleEnable(2,e)}}},[t._v(t._s(t.$t("table.disabled")))]):t._e(),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return t.handleDelete(e.$index,e)}}},[t._v(t._s(t.$t("table.delete")))])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,pageSize:t.pageSize},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},pagination:function(e){return t.getList(t.listQuery)}}})],1),t._v(" "),t.dialogFormVisible?i("el-dialog",{attrs:{title:t.userEdit.id?t.$t("userEdit.userEdit"):t.$t("userEdit.addUser"),visible:t.dialogFormVisible,width:"650px","before-close":t.dialogClose},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticClass:"demo-ruleForm",staticStyle:{width:"400px","margin-left":"40px"},attrs:{model:t.userEdit,rules:t.userEditRules,"label-position":"left","label-width":"110px"}},[i("el-form-item",{attrs:{label:t.$t("table.name"),prop:"name",rules:[{required:!0,message:t.$t("empty")}]}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{placeholder:t.$t("table.name")},model:{value:t.userEdit.name,callback:function(e){t.$set(t.userEdit,"name",e)},expression:"userEdit.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:t.$t("table.email"),prop:"email",rules:[{required:!0,message:t.$t("empty")},{type:"email",message:t.$t("userEdit.inputEmail")}]}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{placeholder:t.$t("table.email")},model:{value:t.userEdit.email,callback:function(e){t.$set(t.userEdit,"email",e)},expression:"userEdit.email"}})],1),t._v(" "),i("el-form-item",{attrs:{label:t.$t("table.phone"),prop:"phone",rules:[{required:!0,message:t.$t("empty")},{type:"number",message:t.$t("userEdit.inputPhoneNumber")}]}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{placeholder:t.$t("table.phone")},model:{value:t.userEdit.phone,callback:function(e){t.$set(t.userEdit,"phone",t._n(e))},expression:"userEdit.phone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:t.$t("userEdit.UserRoles"),rules:[{required:!0,message:t.$t("empty")}]}},[i("el-select",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{prop:"level",placeholder:t.$t("userEdit.UserRoles"),clearable:""},model:{value:t.userEdit.role,callback:function(e){t.$set(t.userEdit,"role",e)},expression:"userEdit.role"}},[i("el-option",{attrs:{label:t.$t("userEdit.admin"),value:1}}),t._v(" "),i("el-option",{attrs:{label:t.$t("userEdit.buyerBroker"),value:2}}),t._v(" "),i("el-option",{attrs:{label:t.$t("userEdit.businessBroker"),value:3}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:t.$t("login.password")}},[i("el-form-item",{staticStyle:{display:"flex","justify-content":"space-between",width:"410px"},attrs:{prop:"password"}},[t.userEdit.id?i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px","margin-right":"10px"},attrs:{placeholder:"******"},model:{value:t.userEdit.password,callback:function(e){t.$set(t.userEdit,"password",e)},expression:"userEdit.password"}}):i("el-input",{staticClass:"filter-item",staticStyle:{width:"222px","margin-right":"10px"},attrs:{placeholder:t.$t("login.password")},model:{value:t.userEdit.password,callback:function(e){t.$set(t.userEdit,"password",e)},expression:"userEdit.password"}}),t._v(" "),t.userEdit.id?t._e():i("el-tag",{staticStyle:{height:"36px","line-height":"36px"},attrs:{type:"primary"}},[t._v(t._s(t.$t("userEdit.DefaultPassword"))+"： nd6808")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:t.$t("userEdit.UserNotes")}},[i("el-input",{staticStyle:{width:"410px"},attrs:{type:"textarea",autosize:{minRows:2},placeholder:t.$t("userEdit.UserNotes")},model:{value:t.userEdit.remarks,callback:function(e){t.$set(t.userEdit,"remarks",e)},expression:"userEdit.remarks"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.userEditSave(t.userEdit.id)}}},[t._v(t._s(t.$t("table.confirm")))])],1)],1):t._e()],1)},s=[],l=(i("3b2b"),i("333d")),n=i("5723"),r={name:"index",components:{Pagination:l["a"]},data:function(){var t=this,e=new RegExp("^[a-zA-Z0-9]{6,15}$"),i=function(i,a,s){""===a?s():e.test(a)||s(new Error(t.$t("passwordRule"))),s()};return{business:[],assigned:[],assignedLoading:!1,dialogFormVisible:!1,AssignVisible:!1,AssignAccountId:"",userEdit:{email:"",name:"",phone:"",password:"nd6808",access_level:"",role:1,status:"1",remarks:"1"},listQuery:{q:"",page:1},listLoading:!1,total:1,pageSize:15,tableData:[],userEditRules:{password:[{validator:i,trigger:"blur"}]}}},mounted:function(){this.getList()},methods:{filterHandler:function(t,e){return e.role==t},dialogClose:function(t){this.userEdit={},t()},userEditSave:function(t){var e=this;this.$refs["dataForm"].validate(function(i){if(!i)return console.log("error submit!!"),!1;e.userEdit.access_level=e.userEdit.role,e.userEdit.password||delete e.userEdit.password,t?Object(n["e"])(e.userEdit).then(function(t){console.log("editAccount",t),e.dialogFormVisible=!1,e.getList(),e.userEdit={},e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)}):(e.userEdit.password||(e.userEdit.password="nd6808"),Object(n["a"])(e.userEdit).then(function(t){console.log("addAccount",t),e.dialogFormVisible=!1,e.getList(),e.userEdit={},e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)}))})},handleFilter:function(){this.listQuery.page=1,this.getList(this.listQuery)},handleCreate:function(){this.userEdit.password="nd6808",this.dialogFormVisible=!0},getList:function(t){var e=this;this.listLoading=!0,Object(n["g"])(t).then(function(t){console.log("getAccountsList",t),e.listLoading=!1,e.total=t.data.total,e.tableData=t.data.data}).catch(function(t){console.log(t),e.listLoading=!1})},handleEdit:function(t,e){console.log(t,e),this.dialogFormVisible=!0;var i=Object.assign({},e.row);this.userEdit=i,this.userEdit.phone=parseInt(this.userEdit.phone)},handleEnable:function(t,e){var i=this;console.log(t,e);var a={status:t,id:e.row.id};Object(n["i"])(a).then(function(e){console.log("statusAccount",e),i.$notify({showClose:!0,message:1==t?i.$t("table.isEnable"):i.$t("table.isDisabled"),type:"success"}),i.getList()}).catch(function(t){console.log(t)})},handleDelete:function(t,e){var i=this;i.$confirm(i.$t("delMsg"),i.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:i.$t("confirm"),cancelButtonText:i.$t("cancel")}).then(function(){Object(n["d"])(e.row.id).then(function(t){console.log("delAccount",t),i.listQuery.page=1,i.getList(),i.$notify({showClose:!0,message:i.$t("deleted"),type:"success"})}).catch(function(t){console.log(t)})}).catch(function(t){})}}},o=r,u=(i("2713"),i("2877")),d=Object(u["a"])(o,a,s,!1,null,"5d3ee4ba",null);e["default"]=d.exports},bb14:function(t,e,i){},dc2b:function(t,e,i){},f842:function(t,e,i){"use strict";var a=i("bb14"),s=i.n(a);s.a}}]);