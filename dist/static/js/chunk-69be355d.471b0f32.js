(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69be355d"],{"333d":function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[r("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":t.pageSize,total:t.total,layout:"prev, pager, next"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.handleCurrentChange}})],1)},a=[];r("c5f6");Math.easeInOutQuad=function(t,e,r,i){return t/=i/2,t<1?r/2*t*t+e:(t--,-r/2*(t*(t-2)-1)+e)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,r){var i=s(),a=t-i,l=20,d=0;e="undefined"===typeof e?500:e;var u=function t(){d+=l;var s=Math.easeInOutQuad(d,i,a,e);o(s),d<e?n(t):r&&"function"===typeof r&&r()};u()}var d={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},pageSize:{type:Number,default:1},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}}},methods:{handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=d,c=(r("f842"),r("2877")),p=Object(c["a"])(u,i,a,!1,null,"00be67d7",null);e["a"]=p.exports},bb14:function(t,e,r){},cbc1:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("aside",[r("h3",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.$t("route.buyerOrder")))])]),t._v(" "),r("div",{staticClass:"filter-container"},[r("div",{staticClass:"filter-item el-select--medium"},[r("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-bottom":"0"},attrs:{placeholder:t.$t("table.search"),clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.q,callback:function(e){t.$set(t.listQuery,"q",e)},expression:"listQuery.q"}}),t._v(" "),r("el-button",{staticClass:"filter-item",staticStyle:{"margin-bottom":"0"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("\n        "+t._s(t.$t("table.search"))+"\n      ")])],1),t._v(" "),t.$route.query.role==t.role?r("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.handleCreate}},[t._v(t._s(t.$t("order.addOrder")))]):t._e()],1),t._v(" "),r("div",{staticClass:"companyTable"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[r("el-table-column",{attrs:{prop:"buyer_name",align:"center",label:t.$t("buyers.Name"),"min-width":"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"order_no",align:"center",label:t.$t("order.orderNumber"),"min-width":"170"}}),t._v(" "),r("el-table-column",{attrs:{prop:"created_at",align:"center",label:t.$t("order.creationTime"),"min-width":"160"}}),t._v(" "),r("el-table-column",{attrs:{prop:"paid",align:"center",label:t.$t("table.PaymentStatus"),"min-width":"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.paid?r("el-tag",{staticStyle:{width:"60px"},attrs:{type:"success"}},[t._v(t._s(t.$t("table.Paymented")))]):t._e(),t._v(" "),0==e.row.paid?r("el-tag",{staticStyle:{width:"60px"},attrs:{type:"info"}},[t._v(t._s(t.$t("table.Unpaid")))]):t._e()]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"pay_amount",align:"center",label:t.$t("order.orderAmount")+"($)","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[r("span",[t._v(t._s(t.toThousands(i.pay_amount)))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"status",align:"center",label:t.$t("order.auditStatus"),"min-width":"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[3==e.row.status?r("el-tag",{staticStyle:{width:"100px"},attrs:{type:"danger"}},[t._v(t._s(t.$t("order.reject")))]):t._e(),t._v(" "),2==e.row.status?r("el-tag",{staticStyle:{width:"100px"},attrs:{type:"success"}},[t._v(t._s(t.$t("order.audited")))]):t._e(),t._v(" "),1==e.row.status?r("el-tag",{staticStyle:{width:"100px"},attrs:{type:"primary"}},[t._v(t._s(t.$t("order.AuditInProgress")))]):t._e(),t._v(" "),0==e.row.status?r("el-tag",{staticStyle:{width:"100px"},attrs:{type:"info"}},[t._v(t._s(t.$t("order.notSubmitted")))]):t._e()]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"remark",align:"center",label:t.$t("order.remarks"),"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.remark,placement:"top"}},[r("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"120px"}},[t._v(t._s(e.row.remark))])])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"status",align:"center",label:t.$t("table.operate"),fixed:"right","min-width":1==t.role&&1==t.$route.query.role?500:380},scopedSlots:t._u([{key:"default",fn:function(e){return[1==t.role?r("div",[0==e.row.status?r("div",[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return t.viewOrder(e)}}},[t._v(t._s(t.$t("order.viewOrder")))])],1):t._e(),t._v(" "),1==e.row.status?r("div",[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return t.viewOrder(e)}}},[t._v(t._s(t.$t("order.viewOrder")))]),t._v(" "),t.$route.query.role==t.role?r("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(r){return t.modifyOrder(e)}}},[t._v(t._s(t.$t("order.modifyOrder")))]):t._e(),t._v(" "),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return t.audited(e,2)}}},[t._v(t._s(t.$t("order.Audit")))]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return t.audited(e,3)}}},[t._v(t._s(t.$t("order.reject")))]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(r){return t.handleDelete(e)}}},[t._v(t._s(t.$t("table.delete")))])],1):t._e(),t._v(" "),2==e.row.status?r("div",[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return t.viewOrder(e)}}},[t._v(t._s(t.$t("order.viewOrder")))]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(r){return t.handleDelete(e)}}},[t._v(t._s(t.$t("table.delete")))])],1):t._e(),t._v(" "),3==e.row.status?r("div",[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return t.viewOrder(e)}}},[t._v(t._s(t.$t("order.viewOrder")))]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(r){return t.handleDelete(e)}}},[t._v(t._s(t.$t("table.delete")))])],1):t._e()]):t._e(),t._v(" "),1!=t.role?r("div",[0==e.row.status?r("div",[r("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(r){return t.changeStatus(e,1)}}},[t._v(t._s(t.$t("order.submitOrder")))]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"primary",disabled:0!=e.row.status},on:{click:function(r){return t.modifyOrder(e)}}},[t._v(t._s(t.$t("order.modifyOrder")))]),t._v(" "),t.$route.query.role==t.role?r("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(r){return t.handleDelete(e)}}},[t._v(t._s(t.$t("table.delete")))]):t._e()],1):t._e(),t._v(" "),1==e.row.status?r("div",[r("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(r){return t.changeStatus(e,0)}}},[t._v(t._s(t.$t("order.cancelOrder")))]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"primary",disabled:0!=e.row.status},on:{click:function(r){return t.modifyOrder(e)}}},[t._v(t._s(t.$t("order.modifyOrder")))]),t._v(" "),t.$route.query.role==t.role?r("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(r){return t.handleDelete(e)}}},[t._v(t._s(t.$t("table.delete")))]):t._e()],1):t._e(),t._v(" "),2==e.row.status?r("div",[t.$route.query.role==t.role?r("el-button",{attrs:{size:"mini"},on:{click:function(r){return t.viewOrder(e)}}},[t._v(t._s(t.$t("order.viewOrder")))]):t._e()],1):t._e(),t._v(" "),3==e.row.status?r("div",[t.$route.query.role==t.role?r("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(r){return t.handleDelete(e)}}},[t._v(t._s(t.$t("table.delete")))]):t._e()],1):t._e()]):t._e()]}}])})],1),t._v(" "),r("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,pageSize:t.pageSize},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},pagination:function(e){return t.getList(t.listQuery)}}})],1),t._v(" "),r("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:t.orderId?t.$t("order.modifyOrder"):t.$t("order.addOrder"),visible:t.dialogFormVisible,width:"800px","before-close":t.dialogClose,center:"","close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.assignedLoading,expression:"assignedLoading"}],ref:"dataForm",attrs:{model:t.orderEdit,rules:t.rules,"label-position":"right","label-width":"130px","label-lineHight":"20px"}},[r("div",[r("p",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.$t("order.selectBusinessList")))]),t._v(" "),r("div",{staticStyle:{"text-align":"center"}},[r("el-transfer",{staticClass:"transfer",staticStyle:{"text-align":"left",display:"inline-block","margin-bottom":"30px"},attrs:{filterable:"",titles:[t.$t("allBusiness"),t.$t("selectedBusiness")],data:t.business},on:{"left-check-change":t.leftChoose},model:{value:t.orderEdit.business_ids,callback:function(e){t.$set(t.orderEdit,"business_ids",e)},expression:"orderEdit.business_ids"}})],1)]),t._v(" "),r("div",{staticClass:"formRow"},[r("el-form-item",{attrs:{label:t.$t("order.orderAmount"),prop:"pay_amount"}},[r("el-input",{directives:[{name:"enter-number",rawName:"v-enter-number"}],staticClass:"filter-item",staticStyle:{width:"210px"},attrs:{maxLength:"8",placeholder:t.$t("order.orderAmount")},model:{value:t.orderEdit.pay_amount,callback:function(e){t.$set(t.orderEdit,"pay_amount",e)},expression:"orderEdit.pay_amount"}},[r("template",{slot:"prepend"},[t._v(" $ ")])],2)],1),t._v(" "),r("el-form-item",{attrs:{label:t.$t("table.PaymentStatus"),prop:"paid"}},[r("el-select",{staticClass:"filter-item",staticStyle:{width:"210px"},model:{value:t.orderEdit.paid,callback:function(e){t.$set(t.orderEdit,"paid",e)},expression:"orderEdit.paid"}},[r("el-option",{attrs:{label:t.$t("table.Paymented"),value:1}}),t._v(" "),r("el-option",{attrs:{label:t.$t("table.Unpaid"),value:0}})],1)],1)],1),t._v(" "),r("div",{staticClass:"formRow"},[r("el-form-item",{staticStyle:{width:"100%"},attrs:{label:t.$t("order.remarks")}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:t.$t("order.remarks")},model:{value:t.orderEdit.remark,callback:function(e){t.$set(t.orderEdit,"remark",e)},expression:"orderEdit.remark"}})],1)],1)]),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),r("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.orderEditSave()}}},[t._v(t._s(t.$t("table.confirm")))])],1)],1),t._v(" "),r("el-dialog",{staticStyle:{"padding-bottom":"50px"},attrs:{title:t.$t("order.viewOrder"),visible:t.dialogviewOrder,width:"1000px",center:"","close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogviewOrder=e}}},[r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.viewOrderLoading,expression:"viewOrderLoading"}],staticStyle:{"padding-bottom":"100px"}},[r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[r("el-form-item",{attrs:{label:t.$t("buyers.Name")+"："}},[t.viewOrderData.buyer?r("span",[t._v(t._s(t.viewOrderData.buyer.buyer))]):t._e()]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("order.orderNumber")+"："}},[r("span",[t._v(t._s(t.viewOrderData.order_no))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("order.auditStatus")+"："}},[[3==t.viewOrderData.status?r("el-tag",{attrs:{type:"danger"}},[t._v(t._s(t.$t("order.reject")))]):t._e(),t._v(" "),2==t.viewOrderData.status?r("el-tag",{attrs:{type:"success"}},[t._v(t._s(t.$t("order.audited")))]):t._e(),t._v(" "),1==t.viewOrderData.status?r("el-tag",{attrs:{type:"primary"}},[t._v(t._s(t.$t("order.AuditInProgress")))]):t._e(),t._v(" "),0==t.viewOrderData.status?r("el-tag",{attrs:{type:"info"}},[t._v(t._s(t.$t("order.notSubmitted")))]):t._e()]],2),t._v(" "),r("el-form-item",{attrs:{label:t.$t("table.PaymentStatus")+"："}},[[1==t.viewOrderData.paid?r("el-tag",{attrs:{type:"success"}},[t._v(t._s(t.$t("table.Paymented")))]):t._e(),t._v(" "),0==t.viewOrderData.paid?r("el-tag",{attrs:{type:"info"}},[t._v(t._s(t.$t("table.Unpaid")))]):t._e()]],2),t._v(" "),r("el-form-item",{attrs:{label:t.$t("order.remarks")+"："}},[r("span",[t._v(t._s(t.viewOrderData.remark))])])],1),t._v(" "),r("div",{staticStyle:{"font-weight":"bold",margin:"20px 0"}},[t._v(t._s(t.$t("order.BusinessInformationPurchased")))]),t._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.viewOrderData.details,border:"",stripe:""}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:"","label-width":"200px"}},[r("el-form-item",{attrs:{label:t.$t("employeeEdit.companyName")}},[r("span",[t._v(t._s(e.row.company))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.title")}},[r("span",[t._v(t._s(e.row.title))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.Listing")}},[r("span",[t._v(t._s(e.row.listing))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.Price")}},[r("span",[t._v("$ "+t._s(t.toThousands(e.row.price)))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.Profitability")}},[r("span",[t._v(t._s(1==e.row.profitability?t.$t("yes"):t.$t("no")))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.RealEstate")}},[r("span",[t._v(t._s(1==e.row.real_estate?t.$t("yes"):t.$t("no")))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.BuildingSF")}},[r("span",[t._v(t._s(e.row.building_sf))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.EmployeeCount")}},[r("span",[t._v(t._s(e.row.employee_count))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.GrossIncome")}},[r("span",[t._v("\n                  $ "+t._s(t.toThousands(e.row.gross_income))+"\n                  / "+t._s(1==e.row.gross_income_unit?t.$t("week"):2==e.row.gross_income_unit?t.$t("Month"):3==e.row.gross_income_unit?t.$t("Quarter"):4==e.row.gross_income_unit?t.$t("Year"):"")+"\n                ")])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.EBITDA")}},[r("span",[t._v(t._s(e.row.ebitda))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.FFandE")}},[r("span",[t._v(t._s(e.row.ff_e))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.Inventory")}},[r("span",[t._v(t._s(e.row.inventory))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.NetIncome")}},[r("span",[t._v("\n                  $ "+t._s(t.toThousands(e.row.net_income))+"\n                  / "+t._s(1==e.row.net_income_unit?t.$t("week"):2==e.row.net_income_unit?t.$t("Month"):3==e.row.net_income_unit?t.$t("Quarter"):4==e.row.net_income_unit?t.$t("Year"):"")+"\n                ")])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.Lease")}},[r("span",[t._v("\n                  $ "+t._s(t.toThousands(e.row.lease))+"\n                  / "+t._s(1==e.row.lease_unit?t.$t("week"):2==e.row.lease_unit?t.$t("Month"):3==e.row.lease_unit?t.$t("Quarter"):4==e.row.lease_unit?t.$t("Year"):"")+"\n                ")])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.LeaseTerm")}},[r("span",[t._v(t._s(e.row.lease_term))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.Est")}},[r("span",[t._v(t._s(e.row.value_of_real_estate))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.ServiceFee")}},[r("span",[t._v(t._s(e.row.commission)+" ")])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.BuyerFinancing")}},[r("span",[t._v(t._s(e.row.buyer_financing))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.USBroker")}},[r("span",[t._v(t._s(e.row.us_broker))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.USBrokerContactInfo")}},[r("span",[t._v(t._s(e.row.us_broker_contact_info))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.ListingDate")}},[r("span",[t._v(t._s(e.row.listing_date))])]),t._v(" "),r("el-form-item",{attrs:{label:t.$t("employeeEdit.ReasonForSelling")}},[r("span",[t._v(t._s(e.row.reason_for_selling))])])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"company",align:"center",label:t.$t("employeeEdit.companyName"),"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.company,placement:"top-start"}},[r("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"200px"}},[t._v(t._s(e.row.company))])])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"title",align:"center",label:t.$t("employeeEdit.title"),"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.title,placement:"top-start"}},[r("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"200px"}},[t._v(t._s(e.row.title))])])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"price",align:"center",label:t.$t("table.price")+"($)","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[r("span",[t._v(t._s(t.toThousands(i.price)))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"listing",align:"center",label:t.$t("employeeEdit.Listing"),"min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[r("span",[t._v(t._s(i.listing))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"state",align:"center",label:t.$t("table.status"),"min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[1==i.status?r("el-tag",{attrs:{type:"primary"}},[t._v(t._s(t.$t("table.forSale")))]):r("el-tag",{attrs:{type:"info"}},[t._v(t._s(t.$t("table.soldOut")))])]}}])})],1)],1)])],1)},a=[],n=r("4360"),o=r("333d"),s=r("f8b7"),l={name:"buyerOrder",components:{Pagination:o["a"]},data:function(){return{role:"",business:[],assignedLoading:!1,dialogviewOrder:!1,viewOrderLoading:!1,viewOrderData:"",dialogFormVisible:!1,AssignVisible:!1,orderId:"",orderEdit:{buyer_id:"",paid:1,pay_amount:"",status:1,remark:"",business_ids:[]},listQuery:{page:1,buyer_id:"",funds_available_from:"",funds_available_to:"",funds_verified:"0",q:""},listLoading:!1,total:1,pageSize:15,tableData:[],rules:{pay_amount:[{required:!0,message:this.$t("empty"),trigger:"blur"}],paid:[{required:!0,message:this.$t("empty"),trigger:"change"}]}}},mounted:function(){this.orderEdit.buyer_id=this.$route.query.id,this.listQuery.buyer_id=this.$route.query.id,this.getList({buyer_id:this.$route.query.id}),this.getAllBusiness(),this.role=n["a"].getters&&n["a"].getters.role},methods:{leftChoose:function(t){var e=10-this.orderEdit.business_ids.length;if(t.length>e)return t.length>=1&&(t.length<=11&&this.$notify({showClose:!0,message:this.$t("onlyChoose10"),type:"warning"}),t.pop()),!1},getAllBusiness:function(){var t=this;Object(s["e"])().then(function(e){console.log("getAllBusinessApi",e),t.business=e.data}).catch(function(t){console.log(t)})},dialogClose:function(t){this.orderEdit={buyer_id:this.$route.query.id,paid:1,pay_amount:"",status:1,remark:"",business_ids:[]},t()},orderEditSave:function(){var t=this;this.$refs["dataForm"].validate(function(e){if(e){var r=Object.assign({},t.orderEdit);if(r.business_ids=JSON.stringify(r.business_ids),t.orderId)r.order_id=t.orderId,Object(s["h"])(r).then(function(e){console.log("updateOrderApi",e),t.dialogFormVisible=!1,t.getList({buyer_id:t.$route.query.id}),t.$notify({showClose:!0,message:t.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)});else{var i=Object.assign({},t.orderEdit);i.business_ids=JSON.stringify(i.business_ids),delete i.order_id,Object(s["a"])(i).then(function(e){console.log("addOrderApi",e),t.dialogFormVisible=!1,t.getList({buyer_id:t.$route.query.id}),t.$notify({showClose:!0,message:t.$t("Successful"),type:"success"})}).catch(function(t){console.log(t)})}}})},handleFilter:function(){this.listQuery.page=1,this.getList(this.listQuery)},handleCreate:function(){this.dialogFormVisible=!0,this.orderId="",this.orderEdit={buyer_id:this.$route.query.id,paid:1,pay_amount:"",status:1,remark:"",business_ids:[]}},modifyOrder:function(t){var e=this;this.dialogFormVisible=!0,this.orderId=t.row.id,e.assignedLoading=!0,Object(s["g"])({id:t.row.id}).then(function(t){console.log("showOrderApi",t),e.assignedLoading=!1,e.orderEdit.id=t.data.id,e.orderEdit.paid=t.data.paid,e.orderEdit.pay_amount=t.data.pay_amount,e.orderEdit.remark=t.data.remark,e.orderEdit.business_ids=t.data.order_detail}).catch(function(t){console.log(t),e.assignedLoading=!1})},viewOrder:function(t){var e=this;this.dialogviewOrder=!0,e.viewOrderLoading=!0,Object(s["i"])({id:t.row.id}).then(function(t){console.log("viewAuditOrderApi",t),e.viewOrderData=t.data,e.viewOrderLoading=!1}).catch(function(t){e.viewOrderLoading=!1,console.log(t)})},audited:function(t,e){var r=this,i={id:t.row.id,status:e};r.$confirm(2==e?r.$t("auditedOrderMsg"):3==e?r.$t("rejectOrderMsg"):"",r.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:r.$t("confirm"),cancelButtonText:r.$t("cancel")}).then(function(){r.listLoading=!0,Object(s["b"])(i).then(function(t){console.log("changeAuditApi",t),r.listLoading=!1,r.getList({buyer_id:r.$route.query.id}),r.$notify({showClose:!0,message:r.$t("Successful"),type:"success"})}).catch(function(t){r.listLoading=!1,console.log(t)})}).catch(function(t){})},getList:function(t){var e=this;this.listLoading=!0,Object(s["f"])(t).then(function(t){console.log("getOrderList",t),e.listLoading=!1,e.total=t.data.total,e.tableData=t.data.data}).catch(function(t){console.log(t),e.listLoading=!1})},changeStatus:function(t,e){var r=this,i={id:t.row.id,status:e};r.$confirm(1==e?r.$t("submitOrderMsg"):0==e?r.$t("cancelOrderMsg"):"",r.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:r.$t("confirm"),cancelButtonText:r.$t("cancel")}).then(function(){r.listLoading=!0,Object(s["c"])(i).then(function(t){console.log("changeStatus",t),r.listLoading=!1,r.getList({buyer_id:r.$route.query.id}),r.$notify({showClose:!0,message:r.$t("Successful"),type:"success"})}).catch(function(t){r.listLoading=!1,console.log(t)})}).catch(function(t){})},handleDelete:function(t){var e=this;e.$confirm(e.$t("delMsg"),e.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:e.$t("confirm"),cancelButtonText:e.$t("cancel")}).then(function(){Object(s["d"])({id:t.row.id}).then(function(t){console.log("delBuyer",t),e.listQuery.page=1,e.getList({buyer_id:e.$route.query.id}),e.$notify({showClose:!0,message:e.$t("deleted"),type:"success"})}).catch(function(t){console.log(t)})}).catch(function(t){})}}},d=l,u=(r("e34d"),r("2877")),c=Object(u["a"])(d,i,a,!1,null,"bb652e60",null);e["default"]=c.exports},dc4f:function(t,e,r){},e34d:function(t,e,r){"use strict";var i=r("dc4f"),a=r.n(i);a.a},f842:function(t,e,r){"use strict";var i=r("bb14"),a=r.n(i);a.a},f8b7:function(t,e,r){"use strict";r.d(e,"f",function(){return a}),r.d(e,"a",function(){return n}),r.d(e,"h",function(){return o}),r.d(e,"d",function(){return s}),r.d(e,"g",function(){return l}),r.d(e,"e",function(){return d}),r.d(e,"c",function(){return u}),r.d(e,"b",function(){return c}),r.d(e,"i",function(){return p});var i=r("b775");function a(t){return Object(i["a"])({url:"/api/order/list",method:"post",data:t})}function n(t){return Object(i["a"])({url:"/api/order/add",method:"post",data:t})}function o(t){return Object(i["a"])({url:"/api/order/update",method:"post",data:t})}function s(t){return Object(i["a"])({url:"/api/order/del",method:"post",data:t})}function l(t){return Object(i["a"])({url:"/api/order/show",method:"post",data:t})}function d(t){return Object(i["a"])({url:"/api/business/query",method:"post",data:t})}function u(t){return Object(i["a"])({url:"/api/order/status",method:"post",data:t})}function c(t){return Object(i["a"])({url:"/api/order/audit",method:"post",data:t})}function p(t){return Object(i["a"])({url:"/api/order/view",method:"post",data:t})}}}]);