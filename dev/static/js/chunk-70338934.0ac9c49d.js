(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70338934"],{"2dc9":function(e,t,n){},"333d":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.pageSize,total:e.total,layout:"prev, pager, next"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.handleCurrentChange}})],1)},i=[];n("c5f6");Math.easeInOutQuad=function(e,t,n,a){return e/=a/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var s=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function o(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,n){var a=r(),i=e-a,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var r=Math.easeInOutQuad(c,a,i,t);o(r),c<t?s(e):n&&"function"===typeof n&&n()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},pageSize:{type:Number,default:1},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}}},methods:{handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(n("f842"),n("2877")),m=Object(d["a"])(u,a,i,!1,null,"00be67d7",null);t["a"]=m.exports},5349:function(e,t,n){"use strict";var a=n("2dc9"),i=n.n(a);i.a},"78a7":function(e,t,n){},bb14:function(e,t,n){},d07c:function(e,t,n){"use strict";var a=n("78a7"),i=n.n(a);i.a},e78f:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("aside",[n("h3",{staticStyle:{"text-align":"center"}},[e._v(e._s(e.$t("route.businessBrokerNet")))])]),e._v(" "),n("div",{staticClass:"filter-container"},[n("div",{staticClass:"filter-item el-select--medium"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-bottom":"0"},attrs:{size:"small",placeholder:e.$t("table.search"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.q,callback:function(t){e.$set(e.listQuery,"q",t)},expression:"listQuery.q"}}),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-bottom":"0"},attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n        "+e._s(e.$t("table.search"))+"\n      ")])],1),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.handleCreate}},[e._v("\n      "+e._s(e.$t("table.add"))+"\n    ")])],1),e._v(" "),n("div",{staticClass:"companyTable"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[1==e.role?n("el-table-column",{attrs:{prop:"name",align:"center",label:e.$t("netName"),"min-width":"150"}}):e._e(),e._v(" "),n("el-table-column",{attrs:{prop:"remark",align:"center",label:e.$t("order.remarks"),"min-width":"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.remark,placement:"top"}},[n("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"300px"}},[e._v(e._s(t.row.remark))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"address",align:"center",label:e.$t("table.operate"),fixed:"right","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleEdit(t)}}},[e._v(e._s(e.$t("table.edit")))]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.handleManager(t)}}},[e._v(e._s(e.$t("member")))]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t)}}},[e._v(e._s(e.$t("table.delete")))])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,pageSize:e.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},pagination:function(t){return e.getList(e.listQuery)}}})],1),e._v(" "),n("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:e.netData.id?e.$t("editNet"):e.$t("addNet"),visible:e.netVisible,width:"650px","before-close":e.dialogClose,center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.netVisible=t}}},[n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.netLoading,expression:"netLoading"}],ref:"dataForm",attrs:{model:e.netData,rules:e.rules,"label-position":"right","label-width":"120px","label-lineHight":"20px"}},[n("div",[n("p",{staticStyle:{"text-align":"center"}},[e._v(e._s(e.$t("selectBusinessBroker")))]),e._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.editBrokerNetLoading,expression:"editBrokerNetLoading"}],staticStyle:{"text-align":"center"}},[n("el-transfer",{staticClass:"netTransfer",staticStyle:{"text-align":"left",display:"inline-block","margin-bottom":"30px"},attrs:{filterable:"",titles:[e.$t("all_Business_brokers"),e.$t("selected_Business_brokers")],data:e.business_brokers},model:{value:e.netData.broker_id,callback:function(t){e.$set(e.netData,"broker_id",t)},expression:"netData.broker_id"}})],1)]),e._v(" "),n("div",{staticClass:"formRow"},[n("el-form-item",{attrs:{label:e.$t("netName"),prop:"name"}},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"210px"},attrs:{placeholder:e.$t("netName")},model:{value:e.netData.name,callback:function(t){e.$set(e.netData,"name",t)},expression:"netData.name"}})],1)],1),e._v(" "),n("div",{staticClass:"formRow"},[n("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("order.remarks")}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:e.$t("order.remarks")},model:{value:e.netData.remark,callback:function(t){e.$set(e.netData,"remark",t)},expression:"netData.remark"}})],1)],1)]),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.netVisible=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.netDataSave(e.netData.id)}}},[e._v(e._s(e.$t("table.confirm")))])],1)],1),e._v(" "),n("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:e.$t("member"),visible:e.memberVisible,width:"650px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.memberVisible=t}}},[n("div",{staticStyle:{"font-size":"16px","margin-bottom":"20px"}},[e._v(e._s(e.$t("netMembersList")))]),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.memberListLoading,expression:"memberListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.memberList,border:"",stripe:""}},[n("el-table-column",{attrs:{prop:"account",align:"center",label:e.$t("userEdit.businessBroker"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.account.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"net_role",align:"center",label:e.$t("role"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[1==a.manager?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.$t("setAsManagerText"),placement:"top"}},[n("el-tag",[e._v(e._s(e.$t("manager")))])],1):e._e(),e._v(" "),0==a.manager?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.$t("setAsMemberText"),placement:"top"}},[n("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.$t("member")))])],1):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"address",align:"center",label:e.$t("manager"),"min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("el-switch",{attrs:{disabled:e.disSwitch,"active-color":"#13ce66"},on:{change:function(t){return e.setAsManager(a)}},model:{value:a.manager,callback:function(t){e.$set(a,"manager",t)},expression:"row.manager"}})]}}])})],1)],1)],1)},i=[],s=n("4360"),o=n("333d"),r=n("b775");function l(e){return Object(r["a"])({url:"/api/account/business/net/list",method:"post",data:e})}function c(e){return Object(r["a"])({url:"/api/account/business/net/add",method:"post",data:e})}function u(e){return Object(r["a"])({url:"/api/account/business/net/show",method:"post",data:e})}function d(e){return Object(r["a"])({url:"/api/account/business/net/update",method:"post",data:e})}function m(e){return Object(r["a"])({url:"/api/account/business/net/del",method:"post",data:e})}function p(e){return Object(r["a"])({url:"/api/account/business/net/brokers",method:"post",data:e})}function g(e){return Object(r["a"])({url:"/api/account/business/net/members",method:"post",data:e})}function f(e){return Object(r["a"])({url:"/api/account/business/net/manager",method:"post",data:e})}var b={name:"businessBrokernet",components:{Pagination:o["a"]},data:function(){return{disSwitch:!1,role:"",BrokerNetId:"",editBrokerNetLoading:!1,business_brokers:[],netVisible:!1,netLoading:!1,netData:{id:"",broker_id:[],name:"",remark:""},memberVisible:!1,memberList:[],memberListLoading:!1,listQuery:{page:1,q:""},listLoading:!1,total:1,pageSize:15,tableData:[],rules:{name:[{required:!0,message:this.$t("empty"),trigger:"blur"}]}}},mounted:function(){this.role=s["a"].getters&&s["a"].getters.role,this.getList()},methods:{dialogClose:function(e){e()},netDataSave:function(e){var t=this;this.$refs["dataForm"].validate(function(n){if(n){var a=Object.assign({},t.netData);a.broker_id=JSON.stringify(a.broker_id),e?d(a).then(function(e){console.log("editBusinessBrokerNet",e),t.netVisible=!1,t.getList(),t.$notify({showClose:!0,message:t.$t("Successful"),type:"success"})}).catch(function(e){console.log(e)}):c(a).then(function(e){console.log("addBusinessBrokerNet",e),t.netVisible=!1,t.getList(),t.$notify({showClose:!0,message:t.$t("Successful"),type:"success"})}).catch(function(e){console.log(e)})}})},handleFilter:function(){this.listQuery.page=1,this.getList(this.listQuery)},handleCreate:function(){this.netVisible=!0,this.business_brokers=[],this.netData={id:"",broker_id:[],name:"",remark:""},this.getBusinessBrokerList(this.listQuery)},handleEdit:function(e){var t=this;t.business_brokers=[],this.netVisible=!0,this.editBrokerNetLoading=!0,u({id:e.row.id}).then(function(e){t.editBrokerNetLoading=!1,console.log("getBusinessBrokerNet",e),t.netData=e.data,t.business_brokers=e.data.free_brokers,console.log(t.netData)}).catch(function(e){t.editBrokerNetLoading=!1,console.log(e)})},handleManager:function(e){this.memberVisible=!0,this.BrokerNetId=e.row.id,this.getBrokerMembersList(e.row.id)},getBrokerMembersList:function(e){var t=this;this.memberListLoading=!0,g({net_id:e}).then(function(e){t.memberListLoading=!1,console.log("getBrokerMembersList",e),t.memberList=e.data}).catch(function(e){t.memberListLoading=!1,console.log(e)})},setAsManager:function(e){var t=this;t.disSwitch=!0,f({id:e.id,manager:e.manager}).then(function(e){console.log("setMembersRole",e),t.disSwitch=!1,t.listQuery.page=1,t.$notify({showClose:!0,message:t.$t("Successful"),type:"success"})}).catch(function(e){t.disSwitch=!0,console.log(e)})},getList:function(e){var t=this;this.listLoading=!0,l(e).then(function(e){t.listLoading=!1,t.total=e.data.total,t.tableData=e.data.data}).catch(function(e){console.log(e),t.listLoading=!1})},getBusinessBrokerList:function(e){var t=this;this.editBrokerNetLoading=!0,p(e).then(function(e){console.log("getBrokerList",e),t.business_brokers=e.data,t.editBrokerNetLoading=!1}).catch(function(e){t.editBrokerNetLoading=!1,console.log(e)})},handleDelete:function(e){var t=this;t.$confirm(t.$t("delMsg"),t.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:t.$t("confirm"),cancelButtonText:t.$t("cancel")}).then(function(){m({id:e.row.id}).then(function(e){console.log("delBusinessBrokerNet",e),t.getList(),t.listQuery.page=1,t.$notify({showClose:!0,message:t.$t("deleted"),type:"success"})}).catch(function(e){console.log(e)})}).catch(function(e){})}}},h=b,v=(n("5349"),n("d07c"),n("2877")),k=Object(v["a"])(h,a,i,!1,null,"1ccbdd98",null);t["default"]=k.exports},f842:function(e,t,n){"use strict";var a=n("bb14"),i=n.n(a);i.a}}]);