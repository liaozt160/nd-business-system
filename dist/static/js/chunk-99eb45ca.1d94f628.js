(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99eb45ca"],{"333d":function(e,t,o){"use strict";var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[o("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.pageSize,total:e.total,layout:"prev, pager, next"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.handleCurrentChange}})],1)},r=[];o("c5f6");Math.easeInOutQuad=function(e,t,o,i){return e/=i/2,e<1?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function n(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,o){var i=s(),r=e-i,l=20,d=0;t="undefined"===typeof t?500:t;var c=function e(){d+=l;var s=Math.easeInOutQuad(d,i,r,t);n(s),d<t?a(e):o&&"function"===typeof o&&o()};c()}var d={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},pageSize:{type:Number,default:1},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}}},methods:{handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},c=d,u=(o("f842"),o("2877")),p=Object(u["a"])(c,i,r,!1,null,"00be67d7",null);t["a"]=p.exports},7367:function(e,t,o){"use strict";var i=o("b112"),r=o.n(i);r.a},b112:function(e,t,o){},bb14:function(e,t,o){},cbc1:function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.pdfLoading,expression:"pdfLoading"}],staticClass:"app-container",staticStyle:{"z-index":"9999"}},[o("aside",[o("h3",{staticStyle:{"text-align":"center"}},[e._v(e._s(e.$t("route.buyerOrder")))])]),e._v(" "),o("div",{staticClass:"filter-container"},[o("div",{staticClass:"filter-item el-select--medium"},[o("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-bottom":"0"},attrs:{placeholder:e.$t("table.search"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.q,callback:function(t){e.$set(e.listQuery,"q",t)},expression:"listQuery.q"}}),e._v(" "),o("el-button",{staticClass:"filter-item",staticStyle:{"margin-bottom":"0"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("table.search")))])],1),e._v(" "),e.$route.query.role==e.role?o("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("order.addOrder"))+"\n    ")]):e._e()],1),e._v(" "),o("div",{staticClass:"companyTable"},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[o("el-table-column",{attrs:{prop:"buyer_name",align:"center",label:e.$t("buyers.Name"),"min-width":"150"}}),e._v(" "),o("el-table-column",{attrs:{prop:"order_no",align:"center",label:e.$t("order.orderNumber"),"min-width":"170"}}),e._v(" "),o("el-table-column",{attrs:{prop:"created_at",align:"center",label:e.$t("order.creationTime"),"min-width":"160"}}),e._v(" "),o("el-table-column",{attrs:{prop:"paid",align:"center",label:e.$t("order.orderType"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[3==t.row.paid?o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"primary"}},[e._v(e._s(e.$t("order.otherFees")))]):e._e(),e._v(" "),2==t.row.paid?o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"primary"}},[e._v(e._s(e.$t("order.investigationFee")))]):e._e(),e._v(" "),1==t.row.paid?o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"primary"}},[e._v(e._s(e.$t("order.informationFee")))]):e._e()]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"pay_amount",align:"center",label:e.$t("order.orderAmount")+"($)","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[o("span",[e._v(e._s(e.toThousands(i.pay_amount)))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"status",align:"center",label:e.$t("order.auditStatus"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.audit_reason?o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.audit_reason,placement:"top"}},[3==t.row.status?o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"danger"}},[e._v(" "+e._s(e.$t("order.auditFailed")))]):e._e()],1):e._e(),e._v(" "),3!=t.row.status||t.row.audit_reason?e._e():o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"danger"}},[e._v(" "+e._s(e.$t("order.auditFailed")))]),e._v(" "),2==t.row.status?o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"success"}},[e._v(e._s(e.$t("order.Audit")))]):e._e(),e._v(" "),1==t.row.status?o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"primary"}},[e._v(e._s(e.$t("order.AuditInProgress")))]):e._e(),e._v(" "),0==t.row.status?o("el-tag",{staticStyle:{width:"120px"},attrs:{type:"info"}},[e._v(e._s(e.$t("order.notSubmitted"))+" ")]):e._e()]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"remark",align:"center",label:e.$t("order.remarks"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.remark,placement:"top"}},[o("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"120px"}},[e._v(e._s(t.row.remark))])])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"status",align:"center",label:e.$t("table.operate"),fixed:"right","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-dropdown",{attrs:{trigger:"click"}},[o("el-button",{attrs:{size:"mini",type:"primary",plain:""}},[e._v("\n              "+e._s(e.$t("table.moreOperations"))),o("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),1==e.role?o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[0==t.row.status?o("div",[o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.changeStatus(t,1)}}},[e._v(e._s(e.$t("order.submitOrder")))])]),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.modifyOrder(t)}}},[e._v(e._s(e.$t("order.modifyOrder")))])]):e._e(),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.handleDelete(t)}}},[e._v(e._s(e.$t("table.delete")))])]):e._e()],1):e._e(),e._v(" "),1==t.row.status?o("div",[o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.viewOrder(t)}}},[e._v(e._s(e.$t("order.viewOrder")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.changeStatus(t,0)}}},[e._v(e._s(e.$t("order.cancelOrder")))])]),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem",attrs:{disabled:0!=t.row.status}},[o("span",{on:{click:function(o){return o.stopPropagation(),e.modifyOrder(t)}}},[e._v(e._s(e.$t("order.modifyOrder")))])]):e._e(),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.audited(t,2)}}},[e._v(e._s(e.$t("order.Audit")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.audited(t,3)}}},[e._v(e._s(e.$t("order.reject")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.handleDelete(t)}}},[e._v(e._s(e.$t("table.delete")))])])],1):e._e(),e._v(" "),2==t.row.status?o("div",[o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.viewOrder(t)}}},[e._v(e._s(e.$t("order.viewOrder")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.ExportPDF(t)}}},[e._v(e._s(e.$t("order.Print")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.handleDelete(t)}}},[e._v(e._s(e.$t("table.delete")))])])],1):e._e(),e._v(" "),3==t.row.status?o("div",[o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.viewOrder(t)}}},[e._v(e._s(e.$t("order.viewOrder")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.handleDelete(t)}}},[e._v(e._s(e.$t("table.delete")))])])],1):e._e()]):e._e(),e._v(" "),2==e.role?o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[0==t.row.status?o("div",[o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.changeStatus(t,1)}}},[e._v(e._s(e.$t("order.submitOrder")))])]),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.modifyOrder(t)}}},[e._v(e._s(e.$t("order.modifyOrder")))])]):e._e(),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.handleDelete(t)}}},[e._v(e._s(e.$t("table.delete")))])]):e._e()],1):e._e(),e._v(" "),1==t.row.status?o("div",[o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])]),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.changeStatus(t,0)}}},[e._v(e._s(e.$t("order.cancelOrder")))])]),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem",attrs:{disabled:0!=t.row.status}},[o("span",{on:{click:function(o){return o.stopPropagation(),e.modifyOrder(t)}}},[e._v(e._s(e.$t("order.modifyOrder")))])]):e._e(),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.handleDelete(t)}}},[e._v(e._s(e.$t("table.delete")))])]):e._e()],1):e._e(),e._v(" "),2==t.row.status?o("div",[e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.viewOrder(t)}}},[e._v(e._s(e.$t("order.viewOrder")))])]):e._e(),e._v(" "),o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])]),e._v(" "),e.$route.query.role==e.role?o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.ExportPDF(t)}}},[e._v(e._s(e.$t("order.Print")))])]):e._e()],1):e._e(),e._v(" "),3==t.row.status?o("div",[o("el-dropdown-item",{staticClass:"menuItem"},[o("span",{on:{click:function(o){return o.stopPropagation(),e.payInformationOpen(t)}}},[e._v(e._s(e.$t("order.payInformation")))])])],1):e._e()]):e._e()],1)]}}])})],1),e._v(" "),o("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,pageSize:e.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},pagination:function(t){return e.getList(e.listQuery)}}})],1),e._v(" "),o("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:e.orderId?e.$t("order.modifyOrder"):e.$t("order.addOrder"),visible:e.dialogFormVisible,width:"800px","before-close":e.dialogClose,center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.assignedLoading,expression:"assignedLoading"}],ref:"dataForm",staticClass:"orderEditForm",attrs:{model:e.orderEdit,rules:e.rules,"label-position":"right","label-width":"130px","label-lineHight":"40px"}},[o("div",[o("p",{staticStyle:{"text-align":"center"}},[e._v(e._s(e.$t("order.selectBusinessList")))]),e._v(" "),o("div",{staticStyle:{"text-align":"center"}},[o("el-transfer",{staticClass:"transfer",staticStyle:{"text-align":"left",display:"inline-block","margin-bottom":"30px"},attrs:{filterable:"",titles:[e.$t("allBusiness"),e.$t("selectedBusiness")],data:e.business},on:{"left-check-change":e.leftChoose},model:{value:e.orderEdit.business_ids,callback:function(t){e.$set(e.orderEdit,"business_ids",t)},expression:"orderEdit.business_ids"}})],1)]),e._v(" "),o("div",{staticClass:"formRow"},[o("el-form-item",{attrs:{label:e.$t("order.orderAmount"),prop:"pay_amount"}},[o("el-input",{directives:[{name:"enter-number",rawName:"v-enter-number"}],staticClass:"filter-item",staticStyle:{width:"210px"},attrs:{maxLength:"8",placeholder:e.$t("order.orderAmount")},model:{value:e.orderEdit.pay_amount,callback:function(t){e.$set(e.orderEdit,"pay_amount",t)},expression:"orderEdit.pay_amount"}},[o("template",{slot:"prepend"},[e._v(" $")])],2)],1),e._v(" "),o("el-form-item",{attrs:{label:e.$t("order.orderType"),prop:"paid"}},[o("el-select",{staticClass:"filter-item",staticStyle:{width:"210px"},model:{value:e.orderEdit.paid,callback:function(t){e.$set(e.orderEdit,"paid",t)},expression:"orderEdit.paid"}},[o("el-option",{attrs:{label:e.$t("order.informationFee"),value:1}}),e._v(" "),o("el-option",{attrs:{label:e.$t("order.investigationFee"),value:2}}),e._v(" "),o("el-option",{attrs:{label:e.$t("order.otherFees"),value:3}})],1)],1)],1),e._v(" "),o("div",{staticClass:"formRow"},[o("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("order.remarks")}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:e.$t("order.remarks")},model:{value:e.orderEdit.remark,callback:function(t){e.$set(e.orderEdit,"remark",t)},expression:"orderEdit.remark"}})],1)],1)]),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),o("el-button",{attrs:{disabled:e.orderEditSaveClick,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.orderEditSave()}}},[e._v(e._s(e.$t("table.confirm")))])],1)],1),e._v(" "),o("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:e.$t("order.viewOrder"),visible:e.dialogviewOrder,width:"900px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogviewOrder=t}}},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.viewOrderLoading,expression:"viewOrderLoading"}],staticStyle:{"padding-bottom":"100px"}},[o("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[o("el-form-item",{attrs:{label:e.$t("buyers.Name")+"："}},[e.viewOrderData.buyer?o("span",[e._v(e._s(e.viewOrderData.buyer.buyer))]):e._e()]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("order.orderNumber")+"："}},[o("span",[e._v(e._s(e.viewOrderData.order_no))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("order.auditStatus")+"："}},[[3==e.viewOrderData.status?o("el-tag",{staticStyle:{"text-align":"center",width:"180px"},attrs:{type:"danger"}},[e._v(e._s(e.$t("order.auditFailed"))+"    ")]):e._e(),e._v(" "),2==e.viewOrderData.status?o("el-tag",{staticStyle:{"text-align":"center",width:"180px"},attrs:{type:"success"}},[e._v(e._s(e.$t("order.Audit"))+"          ")]):e._e(),e._v(" "),1==e.viewOrderData.status?o("el-tag",{staticStyle:{"text-align":"center",width:"180px"},attrs:{type:"primary"}},[e._v(e._s(e.$t("order.AuditInProgress")))]):e._e(),e._v(" "),0==e.viewOrderData.status?o("el-tag",{staticStyle:{"text-align":"center",width:"180px"},attrs:{type:"info"}},[e._v(e._s(e.$t("order.notSubmitted"))+" ")]):e._e()]],2),e._v(" "),o("el-form-item",{attrs:{label:e.$t("order.Payment")+"："}},[[3==e.viewOrderData.paid?o("el-tag",{staticStyle:{"text-align":"center",width:"120px"},attrs:{type:"success"}},[e._v(e._s(e.$t("order.otherFees")))]):e._e(),e._v(" "),2==e.viewOrderData.paid?o("el-tag",{staticStyle:{"text-align":"center",width:"120px"},attrs:{type:"success"}},[e._v(e._s(e.$t("order.investigationFee")))]):e._e(),e._v(" "),1==e.viewOrderData.paid?o("el-tag",{staticStyle:{"text-align":"center",width:"120px"},attrs:{type:"primary"}},[e._v(e._s(e.$t("order.informationFee")))]):e._e()]],2),e._v(" "),o("el-form-item",{attrs:{label:e.$t("order.remarks")+"："}},[o("span",[e._v(e._s(e.viewOrderData.remark))])])],1),e._v(" "),o("div",{staticStyle:{"font-weight":"bold",margin:"20px 0"}},[e._v(e._s(e.$t("order.BusinessInformationPurchased")))]),e._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.viewOrderData.details,border:"",stripe:""}},[o("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:"","label-width":"200px"}},[o("el-form-item",{attrs:{label:e.$t("employeeEdit.companyName")}},[o("span",[e._v(e._s(t.row.company))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.title")}},[o("span",[e._v(e._s(t.row.title))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.Listing")}},[o("span",[e._v(e._s(t.row.listing))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.Price")}},[o("span",[e._v("$ "+e._s(e.toThousands(t.row.price)))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.Profitability")}},[o("span",[e._v(e._s(1==t.row.profitability?e.$t("yes"):e.$t("no")))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.RealEstate")}},[o("span",[e._v(e._s(1==t.row.real_estate?e.$t("yes"):e.$t("no")))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.BuildingSF")}},[o("span",[e._v(e._s(t.row.building_sf))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.EmployeeCount")}},[o("span",[e._v(e._s(t.row.employee_count))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.GrossIncome")}},[o("span",[e._v("\n                  $ "+e._s(e.toThousands(t.row.gross_income))+"\n                  / "+e._s(1==t.row.gross_income_unit?e.$t("week"):2==t.row.gross_income_unit?e.$t("Month"):3==t.row.gross_income_unit?e.$t("Quarter"):4==t.row.gross_income_unit?e.$t("Year"):"")+"\n                ")])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.EBITDA")}},[o("span",[e._v(e._s(t.row.ebitda))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.FFandE")}},[o("span",[e._v(e._s(t.row.ff_e))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.Inventory")}},[o("span",[e._v(e._s(t.row.inventory))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.NetIncome")}},[o("span",[e._v("\n                  $ "+e._s(e.toThousands(t.row.net_income))+"\n                  / "+e._s(1==t.row.net_income_unit?e.$t("week"):2==t.row.net_income_unit?e.$t("Month"):3==t.row.net_income_unit?e.$t("Quarter"):4==t.row.net_income_unit?e.$t("Year"):"")+"\n                ")])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.Lease")}},[o("span",[e._v("\n                  $ "+e._s(e.toThousands(t.row.lease))+"\n                  / "+e._s(1==t.row.lease_unit?e.$t("week"):2==t.row.lease_unit?e.$t("Month"):3==t.row.lease_unit?e.$t("Quarter"):4==t.row.lease_unit?e.$t("Year"):"")+"\n                ")])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.LeaseTerm")}},[o("span",[e._v(e._s(t.row.lease_term))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.Est")}},[o("span",[e._v(e._s(t.row.value_of_real_estate))])]),e._v(" "),1==e.role?o("el-form-item",{attrs:{label:e.$t("employeeEdit.ServiceFee")}},[o("span",[e._v(e._s(t.row.commission)+" ")])]):e._e(),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.BuyerFinancing")}},[o("span",[e._v(e._s(t.row.buyer_financing))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.USBroker")}},[o("span",[e._v(e._s(t.row.us_broker))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.USBrokerContactInfo")}},[o("span",[e._v(e._s(t.row.us_broker_contact_info))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.ListingDate")}},[o("span",[e._v(e._s(t.row.listing_date))])]),e._v(" "),o("el-form-item",{attrs:{label:e.$t("employeeEdit.ReasonForSelling")}},[o("span",[e._v(e._s(t.row.reason_for_selling))])])],1)]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"company",align:"center",label:e.$t("employeeEdit.companyName"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.company,placement:"top-start"}},[o("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"200px"}},[e._v(e._s(t.row.company))])])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"title",align:"center",label:e.$t("employeeEdit.title"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.title,placement:"top-start"}},[o("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"200px"}},[e._v(e._s(t.row.title))])])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"price",align:"center",label:e.$t("table.price")+"($)","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[o("span",[e._v(e._s(e.toThousands(i.price)))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"listing",align:"center",label:e.$t("employeeEdit.Listing"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[o("span",[e._v(e._s(i.listing))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"state",align:"center",label:e.$t("table.status"),"min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[1==i.status?o("el-tag",{attrs:{type:"primary"}},[e._v(e._s(e.$t("table.forSale")))]):o("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.$t("table.soldOut")))])]}}])})],1)],1)]),e._v(" "),o("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:e.$t("order.payInformation"),visible:e.dialogViewPayInformation,width:"800px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogViewPayInformation=t}}},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.payInformationLoading,expression:"payInformationLoading"}],staticStyle:{"padding-bottom":"50px"}},[o("div",{staticStyle:{"font-weight":"bold",margin:"20px 0"}},[e._v("\n        "+e._s(e.$t("order.FileRecords"))+"\n        "),e.role==e.$route.query.role?o("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:e.addFileRecords}},[e._v(e._s(e.$t("order.addFile"))+"\n        ")]):e._e()],1),e._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.FileRecordsData,border:"",stripe:""}},[o("el-table-column",{attrs:{prop:"company",align:"center",label:e.$t("order.File"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",{staticStyle:{color:"#409eff"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"remark",align:"center",label:e.$t("order.remarks"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[o("span",[e._v(e._s(i.remark))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"listing",align:"center",label:e.$t("order.time"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[o("span",[e._v(e._s(i.created_at))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"status",align:"center",label:e.$t("table.operate"),"min-width":"100",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"medium",type:"primary",title:e.$t("table.download"),icon:"el-icon-download",circle:"",plain:""},on:{click:function(o){return e.viewFile(t)}}}),e._v(" "),e.role==e.$route.query.role?o("el-button",{attrs:{size:"medium",type:"danger",title:e.$t("table.delete"),icon:"el-icon-delete",circle:"",plain:""},on:{click:function(o){return e.FileRecordsDel(t)}}}):e._e()]}}])})],1)],1)]),e._v(" "),o("el-dialog",{attrs:{title:e.$t("order.addPayRecord"),visible:e.dialogAddPayRecord,width:"600px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogAddPayRecord=t}}},[o("div",[o("p",[e._v("1."+e._s(e.$t("order.informationFeeText")))]),e._v(" "),o("p",[e._v("2."+e._s(e.$t("order.investigationFeeText")))])]),e._v(" "),o("div",{staticStyle:{"padding-bottom":"10px"}},[o("el-select",{staticClass:"filter-item",staticStyle:{width:"100%"},attrs:{clearable:""},model:{value:e.selectPayContent,callback:function(t){e.selectPayContent=t},expression:"selectPayContent"}},[o("el-option",{attrs:{label:e.$t("order.informationFee"),value:1}}),e._v(" "),o("el-option",{attrs:{label:e.$t("order.investigationFee"),value:2}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogAddPayRecord=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),o("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.addPayRecordSave()}}},[e._v(e._s(e.$t("order.addPayRecord")))])],1)]),e._v(" "),o("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:e.$t("order.addFile"),visible:e.dialogAddFileRecords,width:"600px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogAddFileRecords=t}}},[o("div",{staticStyle:{"padding-bottom":"30px"}},[o("div",{staticClass:"updateFile"},[o("input",{staticClass:"fileUp",attrs:{type:"file",accept:".xls,.doc,.ppt,.txt,.pdf,image/*"},on:{change:e.update}}),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.fileName,expression:"fileName"}],staticClass:"fileUpinput",attrs:{readonly:"readonly",type:"text",placeholder:e.$t("order.selectFile")},domProps:{value:e.fileName},on:{input:function(t){t.target.composing||(e.fileName=t.target.value)}}})]),e._v(" "),o("div",{staticClass:"remarksBox"},[o("span",{staticStyle:{"line-height":"40px"}},[e._v(e._s(e.$t("order.remarks")))]),e._v(" "),o("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:e.$t("order.remarks")},model:{value:e.FileRecordsRemark,callback:function(t){e.FileRecordsRemark=t},expression:"FileRecordsRemark"}})],1)]),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogAddFileRecords=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),o("el-button",{attrs:{size:"small",type:"primary",disabled:e.AddFileRecordsClick},on:{click:function(t){return e.addFileRecordsSave()}}},[e._v(e._s(e.$t("order.addFile")))])],1)])],1)},r=[],a=(o("7f7f"),o("4360")),n=o("333d"),s=o("f8b7"),l={name:"buyerOrder",components:{Pagination:n["a"]},data:function(){return{orderEditSaveClick:!1,pdfLoading:!1,params:"",isBuyer:!1,role:"",business:[],assignedLoading:!1,payInformationLoading:!1,dialogViewPayInformation:!1,dialogAddPayRecord:!1,dialogAddFileRecords:!1,AddFileRecordsClick:!1,selectPayContent:1,FileRecordsData:[],fileName:"",FileRecordsRemark:"",dialogviewOrder:!1,viewOrderLoading:!1,viewOrderData:"",dialogFormVisible:!1,AssignVisible:!1,orderId:"",orderEdit:{buyer_id:"",paid:1,pay_amount:"",status:0,remark:"",business_ids:[]},listQuery:{page:1,buyer_id:"",funds_available_from:"",funds_available_to:"",funds_verified:"0",q:""},listLoading:!1,total:1,pageSize:15,tableData:[],rules:{pay_amount:[{required:!0,message:this.$t("empty"),trigger:"blur"}],paid:[{required:!0,message:this.$t("empty"),trigger:"change"}]}}},mounted:function(){this.params=new FormData,this.orderEdit.buyer_id=this.$route.query.id,this.listQuery.buyer_id=this.$route.query.id,this.getList({buyer_id:this.$route.query.id}),this.role=a["a"].getters&&a["a"].getters.role},methods:{ExportPDF:function(e){var t=this;t.pdfLoading=!0,Object(s["i"])({order_id:e.row.id}).then(function(e){console.log("showDetailPdfApi",e);var o=e,i=new Blob([o]);-1!==window.location.origin.indexOf("dev.newdreamservices.com")||-1!==window.location.origin.indexOf("business.newdreamservices.com")?window.open("/web/web/viewer.html?file="+encodeURIComponent(URL.createObjectURL(i))):window.open("/web/viewer.html?file="+encodeURIComponent(URL.createObjectURL(i))),t.pdfLoading=!1}).catch(function(e){console.log(e)})},payInformationOpen:function(e){this.order_id=e.row.id,this.dialogViewPayInformation=!0,this.getPayInformation(e.row.id)},getPayInformation:function(e){var t=this;this.payInformationLoading=!0,Object(s["n"])({id:e}).then(function(e){t.payInformationLoading=!1,console.log("viewPaymentInformationApi",e),t.FileRecordsData=e.data.files}).catch(function(e){t.payInformationLoading=!1,console.log(e)})},addFileRecords:function(){this.dialogAddFileRecords=!0,this.fileName="",this.FileRecordsRemark="",this.params=new FormData},update:function(e){var t=this,o=e.target.files[0];if(o.size/1e3/1e3>10)return t.$notify({showClose:!0,message:t.$t("order.ExcessiveFileSize"),type:"warning"}),!1;t.params.append("file",o,o.name),t.fileName=o.name,e.target.value=""},addFileRecordsSave:function(){var e=this;if(!e.fileName)return e.$notify({showClose:!0,message:e.$t("order.pleaseSelectFile"),type:"warning"}),!1;e.params.append("order_id",e.order_id),e.params.append("remark",e.FileRecordsRemark),e.AddFileRecordsClick=!0,Object(s["h"])(e.params).then(function(t){e.dialogAddFileRecords=!1,e.AddFileRecordsClick=!1,e.getPayInformation(e.order_id),console.log("orderUploadFileApi",t),e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"}),e.params=""}).catch(function(t){e.AddFileRecordsClick=!1,e.dialogAddFileRecords=!1,e.params="",console.log(t)})},viewFile:function(e){var t=this;t.payInformationLoading=!1,Object(s["m"])({file_id:e.row.file_id}).then(function(o){console.log("viewFileApi",o);var i=o,r=new Blob([i]),a=e.row.name;if("download"in document.createElement("a"))if(-1!==e.row.name.indexOf(".pdf"))-1!==window.location.origin.indexOf("dev.newdreamservices.com")||-1!==window.location.origin.indexOf("business.newdreamservices.com")?window.open("/web/web/viewer.html?file="+encodeURIComponent(URL.createObjectURL(r))):window.open("/web/viewer.html?file="+encodeURIComponent(URL.createObjectURL(r)));else{var n=document.createElement("a");n.download=a,n.style.display="none",n.href=URL.createObjectURL(r),document.body.appendChild(n),n.click(),URL.revokeObjectURL(n.href),document.body.removeChild(n)}else navigator.msSaveBlob(r,a);t.payInformationLoading=!1}).catch(function(e){t.payInformationLoading=!1,console.log(e)})},FileRecordsDel:function(e){var t=this;t.$confirm(t.$t("delMsg"),t.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:t.$t("confirm"),cancelButtonText:t.$t("cancel")}).then(function(){Object(s["d"])({id:e.row.id}).then(function(e){console.log("delOrderFileApi",e),t.getPayInformation(t.order_id),t.$notify({showClose:!0,message:t.$t("deleted"),type:"success"})}).catch(function(e){console.log(e)})}).catch(function(e){})},leftChoose:function(e){var t=10-this.orderEdit.business_ids.length;if(e.length>t)return e.length>=1&&(e.length<=11&&this.$notify({showClose:!0,message:this.$t("onlyChoose10"),type:"warning"}),e.pop()),!1},getAllBusiness:function(){var e=this;e.assignedLoading=!0,Object(s["f"])().then(function(t){e.assignedLoading=!1,console.log("getAllBusinessApi",t),e.business=t.data}).catch(function(t){e.assignedLoading=!1,console.log(t)})},dialogClose:function(e){this.orderEdit={buyer_id:this.$route.query.id,paid:1,pay_amount:"",status:0,remark:"",business_ids:[]},e()},orderEditSave:function(){var e=this;e.orderEditSaveClick=!0,this.$refs["dataForm"].validate(function(t){if(t){var o=Object.assign({},e.orderEdit);if(o.business_ids=JSON.stringify(o.business_ids),e.orderId)o.order_id=e.orderId,Object(s["k"])(o).then(function(t){console.log("updateOrderApi",t),e.dialogFormVisible=!1,e.orderEditSaveClick=!1,e.getList({buyer_id:e.$route.query.id}),e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(e){console.log(e)});else{var i=Object.assign({},e.orderEdit);i.business_ids=JSON.stringify(i.business_ids),delete i.order_id,Object(s["a"])(i).then(function(t){console.log("addOrderApi",t),e.dialogFormVisible=!1,e.getList({buyer_id:e.$route.query.id}),e.$notify({showClose:!0,message:e.$t("Successful"),type:"success"})}).catch(function(e){console.log(e)})}}})},handleFilter:function(){this.listQuery.page=1,this.getList(this.listQuery)},handleCreate:function(){this.dialogFormVisible=!0,this.getAllBusiness(),this.orderId="",this.orderEdit={buyer_id:this.$route.query.id,paid:1,pay_amount:"",status:0,remark:"",business_ids:[]}},modifyOrder:function(e){var t=this;this.getAllBusiness(),this.dialogFormVisible=!0,this.orderId=e.row.id,t.assignedLoading=!0,Object(s["j"])({id:e.row.id}).then(function(e){console.log("showOrderApi",e),t.assignedLoading=!1,t.orderEdit.id=e.data.id,t.orderEdit.paid=e.data.paid,t.orderEdit.pay_amount=e.data.pay_amount,t.orderEdit.remark=e.data.remark,t.orderEdit.business_ids=e.data.order_detail}).catch(function(e){console.log(e),t.assignedLoading=!1})},viewOrder:function(e){var t=this;this.dialogviewOrder=!0,t.viewOrderLoading=!0,Object(s["l"])({id:e.row.id}).then(function(e){console.log("viewAuditOrderApi",e),t.viewOrderData=e.data,t.viewOrderLoading=!1}).catch(function(e){t.viewOrderLoading=!1,console.log(e)})},audited:function(e,t){var o=this,i={id:e.row.id,status:t};2==t?o.$confirm(o.$t("auditedOrderMsg"),o.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:o.$t("confirm"),cancelButtonText:o.$t("cancel")}).then(function(){o.listLoading=!0,Object(s["b"])(i).then(function(e){console.log("changeAuditApi",e),o.listLoading=!1,o.getList({buyer_id:o.$route.query.id}),o.$notify({showClose:!0,message:o.$t("Successful"),type:"success"})}).catch(function(e){o.listLoading=!1,console.log(e)})}).catch(function(e){}):3==t&&this.$prompt(o.$t("rejectOrderMsg"),o.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:o.$t("confirm"),cancelButtonText:o.$t("cancel")}).then(function(e){var t=e.value;o.listLoading=!0,i.reason=t,Object(s["b"])(i).then(function(e){console.log("changeAuditApi",e),o.listLoading=!1,o.getList({buyer_id:o.$route.query.id}),o.$notify({showClose:!0,message:o.$t("Successful"),type:"success"})}).catch(function(e){o.listLoading=!1,console.log(e)})}).catch(function(){})},getList:function(e){var t=this;this.listLoading=!0,Object(s["g"])(e).then(function(e){console.log("getOrderList",e),t.listLoading=!1,t.total=e.data.total,t.tableData=e.data.data}).catch(function(e){console.log(e),t.listLoading=!1})},changeStatus:function(e,t){var o=this,i={id:e.row.id,status:t};o.$confirm(1==t?o.$t("submitOrderMsg"):0==t?o.$t("cancelOrderMsg"):"",o.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:o.$t("confirm"),cancelButtonText:o.$t("cancel")}).then(function(){o.listLoading=!0,Object(s["c"])(i).then(function(e){console.log("changeStatus",e),o.listLoading=!1,o.getList({buyer_id:o.$route.query.id}),o.$notify({showClose:!0,message:o.$t("Successful"),type:"success"})}).catch(function(e){o.listLoading=!1,console.log(e)})}).catch(function(e){})},handleDelete:function(e){var t=this;t.$confirm(t.$t("delMsg"),t.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:t.$t("confirm"),cancelButtonText:t.$t("cancel")}).then(function(){Object(s["e"])({id:e.row.id}).then(function(e){console.log("delBuyer",e),t.listQuery.page=1,t.getList({buyer_id:t.$route.query.id}),t.$notify({showClose:!0,message:t.$t("deleted"),type:"success"})}).catch(function(e){console.log(e)})}).catch(function(e){})}}},d=l,c=(o("7367"),o("2877")),u=Object(c["a"])(d,i,r,!1,null,"043d0c37",null);t["default"]=u.exports},f842:function(e,t,o){"use strict";var i=o("bb14"),r=o.n(i);r.a},f8b7:function(e,t,o){"use strict";o.d(t,"g",function(){return r}),o.d(t,"a",function(){return a}),o.d(t,"k",function(){return n}),o.d(t,"e",function(){return s}),o.d(t,"j",function(){return l}),o.d(t,"f",function(){return d}),o.d(t,"c",function(){return c}),o.d(t,"b",function(){return u}),o.d(t,"l",function(){return p}),o.d(t,"n",function(){return m}),o.d(t,"h",function(){return f}),o.d(t,"m",function(){return _}),o.d(t,"d",function(){return v}),o.d(t,"i",function(){return g});var i=o("b775");function r(e){return Object(i["a"])({url:"/api/order/list",method:"post",data:e})}function a(e){return Object(i["a"])({url:"/api/order/add",method:"post",data:e})}function n(e){return Object(i["a"])({url:"/api/order/update",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/api/order/del",method:"post",data:e})}function l(e){return Object(i["a"])({url:"/api/order/show",method:"post",data:e})}function d(e){return Object(i["a"])({url:"/api/business/query",method:"post",data:e})}function c(e){return Object(i["a"])({url:"/api/order/status",method:"post",data:e})}function u(e){return Object(i["a"])({url:"/api/order/audit",method:"post",data:e})}function p(e){return Object(i["a"])({url:"/api/order/view",method:"post",data:e})}function m(e){return Object(i["a"])({url:"/api/order/payment/show",method:"post",data:e})}function f(e){return Object(i["a"])({url:"/api/order/payment/file/upload",method:"post",data:e})}function _(e){return Object(i["a"])({url:"/api/order/payment/file/view",method:"post",responseType:"blob",data:e})}function v(e){return Object(i["a"])({url:"/api/order/payment/file/del",method:"post",data:e})}function g(e){return Object(i["a"])({url:"/api/order/detail/pdf",method:"post",responseType:"blob",data:e})}}}]);