(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2893a576"],{"2dc9":function(t,e,n){},"333d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":t.pageSize,total:t.total,layout:"prev, pager, next"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.handleCurrentChange}})],1)},i=[];n("c5f6");Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function s(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,n){var a=r(),i=t-a,l=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=l;var r=Math.easeInOutQuad(c,a,i,e);s(r),c<e?o(t):n&&"function"===typeof n&&n()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},pageSize:{type:Number,default:1},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}}},methods:{handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(n("f842"),n("2877")),m=Object(d["a"])(u,a,i,!1,null,"00be67d7",null);e["a"]=m.exports},5349:function(t,e,n){"use strict";var a=n("2dc9"),i=n.n(a);i.a},bb14:function(t,e,n){},cc7c:function(t,e,n){},d42d:function(t,e,n){"use strict";var a=n("cc7c"),i=n.n(a);i.a},e78f:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("aside",[n("h3",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.$t("route.businessBrokerNet")))])]),t._v(" "),n("div",{staticClass:"filter-container"},[n("div",{staticClass:"filter-item el-select--medium"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-bottom":"0"},attrs:{placeholder:t.$t("table.search"),clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.q,callback:function(e){t.$set(t.listQuery,"q",e)},expression:"listQuery.q"}}),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-bottom":"0"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("\n        "+t._s(t.$t("table.search"))+"\n      ")])],1),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.handleCreate}},[t._v("\n      "+t._s(t.$t("table.add"))+"\n    ")])],1),t._v(" "),n("div",{staticClass:"companyTable"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[1==t.role?n("el-table-column",{attrs:{prop:"name",align:"center",label:t.$t("netName"),"min-width":"150"}}):t._e(),t._v(" "),n("el-table-column",{attrs:{prop:"remark",align:"center",label:t.$t("order.remarks"),"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.remark,placement:"top"}},[n("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.row.remark))])])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"address",align:"center",label:t.$t("table.operate"),fixed:"right","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleEdit(e)}}},[t._v(t._s(t.$t("table.edit")))]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return t.handleManager(e)}}},[t._v(t._s(t.$t("member")))]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return t.handleDelete(e)}}},[t._v(t._s(t.$t("table.delete")))])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,pageSize:t.pageSize},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},pagination:function(e){return t.getList(t.listQuery)}}})],1),t._v(" "),n("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:t.netData.id?t.$t("editNet"):t.$t("addNet"),visible:t.netVisible,width:"800px","before-close":t.dialogClose,center:"","close-on-click-modal":!1},on:{"update:visible":function(e){t.netVisible=e}}},[n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.netLoading,expression:"netLoading"}],ref:"dataForm",attrs:{model:t.netData,rules:t.rules,"label-position":"right","label-width":"120px","label-lineHight":"20px"}},[n("div",[n("p",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.$t("selectBuyerBroker")))]),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.editBrokerNetLoading,expression:"editBrokerNetLoading"}],staticStyle:{"text-align":"center"}},[n("el-transfer",{staticClass:"netTransfer",staticStyle:{"text-align":"left",display:"inline-block","margin-bottom":"30px"},attrs:{filterable:"",titles:[t.$t("all_Business_brokers"),t.$t("selected_Business_brokers")],data:t.business_brokers},model:{value:t.netData.broker_id,callback:function(e){t.$set(t.netData,"broker_id",e)},expression:"netData.broker_id"}})],1)]),t._v(" "),n("div",{staticClass:"formRow"},[n("el-form-item",{attrs:{label:t.$t("netName"),prop:"name"}},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"210px"},attrs:{placeholder:t.$t("netName")},model:{value:t.netData.name,callback:function(e){t.$set(t.netData,"name",e)},expression:"netData.name"}})],1)],1),t._v(" "),n("div",{staticClass:"formRow"},[n("el-form-item",{staticStyle:{width:"100%"},attrs:{label:t.$t("order.remarks")}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:t.$t("order.remarks")},model:{value:t.netData.remark,callback:function(e){t.$set(t.netData,"remark",e)},expression:"netData.remark"}})],1)],1)]),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.netVisible=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),n("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.netDataSave(t.netData.id)}}},[t._v(t._s(t.$t("table.confirm")))])],1)],1),t._v(" "),n("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:t.$t("member"),visible:t.memberVisible,width:"800px",center:"","close-on-click-modal":!1},on:{"update:visible":function(e){t.memberVisible=e}}},[n("div",{staticStyle:{"font-size":"16px","margin-bottom":"20px"}},[t._v(t._s(t.$t("netMembersList")))]),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.memberListLoading,expression:"memberListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.memberList,border:"",stripe:""}},[n("el-table-column",{attrs:{prop:"account",align:"center",label:t.$t("userEdit.businessBroker"),"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.account.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"net_role",align:"center",label:t.$t("role"),"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[1==a.manager?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.$t("setAsManagerText"),placement:"top"}},[n("el-tag",[t._v(t._s(t.$t("manager")))])],1):t._e(),t._v(" "),0==a.manager?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.$t("setAsMemberText"),placement:"top"}},[n("el-tag",{attrs:{type:"info"}},[t._v(t._s(t.$t("member")))])],1):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"address",align:"center",label:t.$t("table.operate"),fixed:"right","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[0==a.manager?n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.setAsManager(a)}}},[t._v(t._s(t.$t("setAsManager")))]):t._e(),t._v(" "),1==a.manager?n("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(e){return t.setAsMember(a)}}},[t._v(t._s(t.$t("setAsMember")))]):t._e()]}}])})],1)],1)],1)},i=[],o=n("4360"),s=n("333d"),r=n("b775");function l(t){return Object(r["a"])({url:"/api/account/business/net/list",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/api/account/business/net/add",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/api/account/business/net/show",method:"post",data:t})}function d(t){return Object(r["a"])({url:"/api/account/business/net/update",method:"post",data:t})}function m(t){return Object(r["a"])({url:"/api/account/business/net/del",method:"post",data:t})}function p(t){return Object(r["a"])({url:"/api/account/business/net/brokers",method:"post",data:t})}function f(t){return Object(r["a"])({url:"/api/account/business/net/members",method:"post",data:t})}function g(t){return Object(r["a"])({url:"/api/account/business/net/manager",method:"post",data:t})}var b={name:"businessBrokernet",components:{Pagination:s["a"]},data:function(){return{role:"",BrokerNetId:"",editBrokerNetLoading:!1,business_brokers:[],netVisible:!1,netLoading:!1,netData:{id:"",broker_id:[],name:"",remark:""},memberVisible:!1,memberList:[],memberListLoading:!1,listQuery:{page:1,q:""},listLoading:!1,total:1,pageSize:15,tableData:[],rules:{name:[{required:!0,message:this.$t("empty"),trigger:"blur"}]}}},mounted:function(){this.role=o["a"].getters&&o["a"].getters.role,this.getList()},methods:{dialogClose:function(t){t()},netDataSave:function(t){var e=this;this.$refs["dataForm"].validate(function(n){if(n){var a=Object.assign({},e.netData);a.broker_id=JSON.stringify(a.broker_id),t?d(a).then(function(t){console.log("editBusinessBrokerNet",t),e.netVisible=!1,e.getList(),e.netData={},e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)}):c(a).then(function(t){console.log("addBusinessBrokerNet",t),e.netVisible=!1,e.getList(),e.netData={},e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)})}})},handleFilter:function(){this.listQuery.page=1,this.getList(this.listQuery)},handleCreate:function(){this.netVisible=!0,this.business_brokers=[],this.netData={id:"",broker_id:[],name:"",remark:""},this.getBusinessBrokerList(this.listQuery)},handleEdit:function(t){var e=this;e.business_brokers=[],this.netVisible=!0,this.editBrokerNetLoading=!0,u({id:t.row.id}).then(function(t){e.editBrokerNetLoading=!1,console.log("getBusinessBrokerNet",t),e.netData=t.data,e.business_brokers=t.data.free_brokers,console.log(e.netData)}).catch(function(t){e.editBrokerNetLoading=!1,console.log(t)})},handleManager:function(t){this.memberVisible=!0,this.BrokerNetId=t.row.id,this.getBrokerMembersList(t.row.id)},getBrokerMembersList:function(t){var e=this;this.memberListLoading=!0,f({net_id:t}).then(function(t){e.memberListLoading=!1,console.log("getBrokerMembersList",t),e.memberList=t.data}).catch(function(t){e.memberListLoading=!1,console.log(t)})},setAsManager:function(t){var e=this;e.$confirm(e.$t("setAsManagerMsg"),e.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:e.$t("confirm"),cancelButtonText:e.$t("cancel")}).then(function(){g({id:t.id,manager:1}).then(function(t){console.log("setMembersRole",t),e.getBrokerMembersList(e.BrokerNetId),e.listQuery.page=1,e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)})}).catch(function(t){})},setAsMember:function(t){var e=this;e.$confirm(e.$t("setAsMemberMsg"),e.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:e.$t("confirm"),cancelButtonText:e.$t("cancel")}).then(function(){g({id:t.id,manager:0}).then(function(t){console.log("setMembersRole",t),e.getBrokerMembersList(e.BrokerNetId),e.listQuery.page=1,e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)})}).catch(function(t){})},getList:function(t){var e=this;this.listLoading=!0,l(t).then(function(t){e.listLoading=!1,e.total=t.data.total,e.tableData=t.data.data}).catch(function(t){console.log(t),e.listLoading=!1})},getBusinessBrokerList:function(t){var e=this;this.editBrokerNetLoading=!0,p(t).then(function(t){console.log("getBrokerList",t),e.business_brokers=t.data,e.editBrokerNetLoading=!1}).catch(function(t){e.editBrokerNetLoading=!1,console.log(t)})},handleDelete:function(t){var e=this;e.$confirm(e.$t("delMsg"),e.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:e.$t("confirm"),cancelButtonText:e.$t("cancel")}).then(function(){m({id:t.row.id}).then(function(t){console.log("delBusinessBrokerNet",t),e.getList(),e.listQuery.page=1,e.$notify({showClose:!0,message:e.$t("deleted"),type:"success"})}).catch(function(t){console.log(t)})}).catch(function(t){})}}},h=b,v=(n("5349"),n("d42d"),n("2877")),k=Object(v["a"])(h,a,i,!1,null,"4724498f",null);e["default"]=k.exports},f842:function(t,e,n){"use strict";var a=n("bb14"),i=n.n(a);i.a}}]);