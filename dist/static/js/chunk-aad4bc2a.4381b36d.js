(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aad4bc2a"],{"333d":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[i("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.pageSize,total:e.total,layout:"prev, pager, next"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.handleCurrentChange}})],1)},s=[];i("c5f6");Math.easeInOutQuad=function(e,t,i,a){return e/=a/2,e<1?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function l(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(e,t,i){var a=r(),s=e-a,o=20,u=0;t="undefined"===typeof t?500:t;var d=function e(){u+=o;var r=Math.easeInOutQuad(u,a,s,t);l(r),u<t?n(e):i&&"function"===typeof i&&i()};d()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},pageSize:{type:Number,default:1},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}}},methods:{handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&o(0,800)}}},d=u,c=(i("f842"),i("2877")),p=Object(c["a"])(d,a,s,!1,null,"00be67d7",null);t["a"]=p.exports},5343:function(e,t,i){},"6da9":function(e,t,i){"use strict";var a=i("5343"),s=i.n(a);s.a},a341:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("aside",[i("h3",{staticStyle:{"text-align":"center"}},[e._v(e._s(e.$t("route.userManagement")))])]),e._v(" "),i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:e.$t("table.search"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.q,callback:function(t){e.$set(e.listQuery,"q",t)},expression:"listQuery.q"}}),e._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      "+e._s(e.$t("table.search"))+"\n    ")]),e._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("\n      "+e._s(e.$t("table.add"))+"\n    ")])],1),e._v(" "),i("div",{staticClass:"companyTable"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[i("el-table-column",{attrs:{prop:"name",sortable:"",align:"center",label:e.$t("table.name"),"min-width":"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"email",align:"center",label:e.$t("table.email"),"min-width":"200"}}),e._v(" "),i("el-table-column",{attrs:{prop:"phone",align:"center",label:e.$t("table.phone"),"min-width":"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"role",filters:[{text:e.$t("userEdit.admin"),value:"1"},{text:e.$t("userEdit.buyerBroker"),value:"2"},{text:e.$t("userEdit.businessBroker"),value:"3"}],"filter-method":e.filterHandler,"filter-placement":"bottom-end",align:"center",label:e.$t("userEdit.UserRoles"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[1==a.role?i("el-tag",{attrs:{type:"primary"}},[e._v(e._s(e.$t("userEdit.admin")))]):e._e(),e._v(" "),2==a.role?i("el-tag",{attrs:{type:"primary"}},[e._v(e._s(e.$t("userEdit.buyerBroker")))]):e._e(),e._v(" "),3==a.role?i("el-tag",{attrs:{type:"primary"}},[e._v(e._s(e.$t("userEdit.businessBroker")))]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"status",align:"center",label:e.$t("table.status"),"min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[2==a.status?i("el-tag",{attrs:{type:"danger"}},[e._v(e._s(e.$t("table.isDisabled")))]):e._e(),e._v(" "),1==a.status?i("el-tag",{attrs:{type:"primary"}},[e._v(e._s(e.$t("table.isEnable")))]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"address",align:"center",label:e.$t("table.operate"),fixed:"right","min-width":"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){return e.handleEdit(t.$index,t)}}},[e._v(e._s(e.$t("table.edit")))]),e._v(" "),2==t.row.status?i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(i){return e.handleEnable(1,t)}}},[e._v(e._s(e.$t("table.Enable")))]):e._e(),e._v(" "),1==t.row.status?i("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(i){return e.handleEnable(2,t)}}},[e._v(e._s(e.$t("table.disabled")))]):e._e(),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDelete(t.$index,t)}}},[e._v(e._s(e.$t("table.delete")))])]}}])})],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,pageSize:e.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},pagination:function(t){return e.getList(e.listQuery)}}})],1),e._v(" "),e.dialogFormVisible?i("el-dialog",{attrs:{title:e.userEdit.id?e.$t("userEdit.userEdit"):e.$t("userEdit.addUser"),visible:e.dialogFormVisible,width:"650px","before-close":e.dialogClose},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"dataForm",staticClass:"demo-ruleForm",staticStyle:{width:"400px","margin-left":"40px"},attrs:{model:e.userEdit,rules:e.userEditRules,"label-position":"left","label-width":"110px"}},[i("el-form-item",{attrs:{label:e.$t("table.name"),prop:"name",rules:[{required:!0,message:e.$t("empty")}]}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{placeholder:e.$t("table.name")},model:{value:e.userEdit.name,callback:function(t){e.$set(e.userEdit,"name",t)},expression:"userEdit.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:e.$t("table.email"),prop:"email",rules:[{required:!0,message:e.$t("empty")},{type:"email",message:e.$t("userEdit.inputEmail")}]}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{placeholder:e.$t("table.email")},model:{value:e.userEdit.email,callback:function(t){e.$set(e.userEdit,"email",t)},expression:"userEdit.email"}})],1),e._v(" "),i("el-form-item",{attrs:{label:e.$t("table.phone"),prop:"phone",rules:[{required:!0,message:e.$t("empty")},{type:"number",message:e.$t("userEdit.inputPhoneNumber")}]}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{placeholder:e.$t("table.phone")},model:{value:e.userEdit.phone,callback:function(t){e.$set(e.userEdit,"phone",e._n(t))},expression:"userEdit.phone"}})],1),e._v(" "),i("el-form-item",{attrs:{label:e.$t("userEdit.UserRoles"),rules:[{required:!0,message:e.$t("empty")}]}},[i("el-select",{staticClass:"filter-item",staticStyle:{width:"410px"},attrs:{prop:"level",placeholder:e.$t("userEdit.UserRoles"),clearable:""},model:{value:e.userEdit.role,callback:function(t){e.$set(e.userEdit,"role",t)},expression:"userEdit.role"}},[i("el-option",{attrs:{label:e.$t("userEdit.admin"),value:1}}),e._v(" "),i("el-option",{attrs:{label:e.$t("userEdit.buyerBroker"),value:2}}),e._v(" "),i("el-option",{attrs:{label:e.$t("userEdit.businessBroker"),value:3}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:e.$t("login.password")}},[i("el-form-item",{staticStyle:{display:"flex","justify-content":"space-between",width:"410px"},attrs:{prop:"password"}},[e.userEdit.id?i("el-input",{staticClass:"filter-item",staticStyle:{width:"410px","margin-right":"10px"},attrs:{placeholder:"******"},model:{value:e.userEdit.password,callback:function(t){e.$set(e.userEdit,"password",t)},expression:"userEdit.password"}}):i("el-input",{staticClass:"filter-item",staticStyle:{width:"222px","margin-right":"10px"},attrs:{placeholder:e.$t("login.password")},model:{value:e.userEdit.password,callback:function(t){e.$set(e.userEdit,"password",t)},expression:"userEdit.password"}}),e._v(" "),e.userEdit.id?e._e():i("el-tag",{staticStyle:{height:"36px","line-height":"36px"},attrs:{type:"primary"}},[e._v(e._s(e.$t("userEdit.DefaultPassword"))+"： nd6808")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:e.$t("userEdit.UserNotes")}},[i("el-input",{staticStyle:{width:"410px"},attrs:{type:"textarea",autosize:{minRows:2},placeholder:e.$t("userEdit.UserNotes")},model:{value:e.userEdit.remarks,callback:function(t){e.$set(e.userEdit,"remarks",t)},expression:"userEdit.remarks"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.userEditSave(e.userEdit.id)}}},[e._v(e._s(e.$t("table.confirm")))])],1)],1):e._e(),e._v(" "),i("el-dialog",{attrs:{title:e.$t("buyers.assign"),visible:e.AssignVisible,width:"700px",center:""},on:{"update:visible":function(t){e.AssignVisible=t}}},[i("p",{staticStyle:{"text-align":"center",margin:"0 0 20px"}},[e._v(e._s(e.$t("AttentionBuyerToViewInformation")))]),e._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.assignedLoading,expression:"assignedLoading"}],staticStyle:{"text-align":"center"}},[i("el-transfer",{staticStyle:{"text-align":"left",display:"inline-block","margin-bottom":"30px"},attrs:{filterable:"",titles:[e.$t("ViewableSection"),e.$t("ViewableAll")],data:e.business},on:{"left-check-change":e.leftChoose},model:{value:e.assigned,callback:function(t){e.assigned=t},expression:"assigned"}})],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.AssignVisible=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.setAssign}},[e._v(e._s(e.$t("table.confirm")))])],1)])],1)},s=[],n=(i("3b2b"),i("333d")),l=i("5723"),r={name:"index",components:{Pagination:n["a"]},data:function(){var e=this,t=new RegExp("^[a-zA-Z0-9]{6,15}$"),i=function(i,a,s){""===a?s():t.test(a)||s(new Error(e.$t("passwordRule"))),s()};return{business:[],assigned:[],assignedLoading:!1,dialogFormVisible:!1,AssignVisible:!1,AssignAccountId:"",userEdit:{email:"",name:"",phone:"",password:"nd6808",access_level:"",role:1,status:"1",remarks:"1"},listQuery:{q:"",page:1},listLoading:!1,total:1,pageSize:15,tableData:[],userEditRules:{password:[{validator:i,trigger:"blur"}]}}},mounted:function(){this.getList()},methods:{filterHandler:function(e,t){return t.role==e},dialogClose:function(e){this.userEdit={},e()},userEditSave:function(e){var t=this;this.$refs["dataForm"].validate(function(i){if(!i)return console.log("error submit!!"),!1;t.userEdit.access_level=t.userEdit.role,t.userEdit.password||delete t.userEdit.password,e?Object(l["e"])(t.userEdit).then(function(e){console.log("editAccount",e),t.dialogFormVisible=!1,t.getList(),t.userEdit={},t.$notify({showClose:!0,message:t.$t("Successful"),type:"success"})}).catch(function(e){console.log(e)}):(t.userEdit.password||(t.userEdit.password="nd6808"),Object(l["a"])(t.userEdit).then(function(e){console.log("addAccount",e),t.dialogFormVisible=!1,t.getList(),t.userEdit={},t.$notify({showClose:!0,message:t.$t("Successful"),type:"success"})}).catch(function(e){console.log(e)}))})},handleFilter:function(){this.listQuery.page=1,this.getList(this.listQuery)},handleCreate:function(){this.userEdit.password="nd6808",this.dialogFormVisible=!0},getList:function(e){var t=this;this.listLoading=!0,Object(l["g"])(e).then(function(e){console.log("getAccountsList",e),t.listLoading=!1,t.total=e.data.total,t.tableData=e.data.data}).catch(function(e){console.log(e),t.listLoading=!1})},handleEdit:function(e,t){console.log(e,t),this.dialogFormVisible=!0;var i=Object.assign({},t.row);this.userEdit=i,this.userEdit.phone=parseInt(this.userEdit.phone)},handleEnable:function(e,t){var i=this;console.log(e,t);var a={status:e,id:t.row.id};Object(l["i"])(a).then(function(t){console.log("statusAccount",t),i.$notify({showClose:!0,message:1==e?i.$t("table.isEnable"):i.$t("table.isDisabled"),type:"success"}),i.getList()}).catch(function(e){console.log(e)})},handleDelete:function(e,t){var i=this;i.$confirm(i.$t("delMsg"),i.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:i.$t("confirm"),cancelButtonText:i.$t("cancel")}).then(function(){Object(l["d"])(t.row.id).then(function(e){console.log("delAccount",e),i.listQuery.page=1,i.getList(),i.$notify({showClose:!0,message:i.$t("deleted"),type:"success"})}).catch(function(e){console.log(e)})}).catch(function(e){})}}},o=r,u=(i("6da9"),i("2877")),d=Object(u["a"])(o,a,s,!1,null,"b460b7b8",null);t["default"]=d.exports},bb14:function(e,t,i){},f842:function(e,t,i){"use strict";var a=i("bb14"),s=i.n(a);s.a}}]);