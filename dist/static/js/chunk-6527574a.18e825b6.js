(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6527574a"],{"05a9":function(e,t,n){"use strict";n.d(t,"i",function(){return i}),n.d(t,"a",function(){return r}),n.d(t,"h",function(){return s}),n.d(t,"j",function(){return a}),n.d(t,"f",function(){return l}),n.d(t,"d",function(){return c}),n.d(t,"g",function(){return u}),n.d(t,"e",function(){return d}),n.d(t,"b",function(){return p}),n.d(t,"c",function(){return m});var o=n("b775");function i(e){return Object(o["a"])({url:"/api/buyer/list",method:"post",data:e})}function r(e){return Object(o["a"])({url:"/api/buyer/add",method:"post",data:e})}function s(e){return Object(o["a"])({url:"/api/buyer/update",method:"post",data:e})}function a(e){return Object(o["a"])({url:"/api/buyer/show",method:"post",data:e})}function l(e){return Object(o["a"])({url:"/api/buyer/del",method:"post",data:e})}function c(e){return Object(o["a"])({url:"/api/buyer/attention/list",method:"post",data:e})}function u(e){return Object(o["a"])({url:"/api/buyer/attention/del",method:"post",data:e})}function d(e){return Object(o["a"])({url:"/api/account/buyer/services/pay",method:"post",data:e})}function p(e){return Object(o["a"])({url:"/api/account/attention/list",method:"post",data:e})}function m(e){return Object(o["a"])({url:"/api/buyer/attention/pdf",method:"post",responseType:"blob",data:e})}},"0ce4":function(e,t,n){},"2b6d":function(e,t,n){"use strict";n.d(t,"k",function(){return i}),n.d(t,"l",function(){return r}),n.d(t,"d",function(){return s}),n.d(t,"c",function(){return a}),n.d(t,"r",function(){return l}),n.d(t,"a",function(){return c}),n.d(t,"g",function(){return u}),n.d(t,"h",function(){return d}),n.d(t,"p",function(){return p}),n.d(t,"q",function(){return m}),n.d(t,"e",function(){return f}),n.d(t,"f",function(){return b}),n.d(t,"m",function(){return _}),n.d(t,"o",function(){return y}),n.d(t,"i",function(){return g}),n.d(t,"n",function(){return h}),n.d(t,"j",function(){return v}),n.d(t,"b",function(){return w});var o=n("b775");function i(e){return Object(o["a"])({url:"/api/business/list",method:"post",data:e})}function r(e){return Object(o["a"])({url:"/api/business/brokers",method:"post",data:e})}function s(e){return Object(o["a"])({url:"/api/account/business/owner",method:"post",data:e})}function a(e){return Object(o["a"])({url:"/api/business/buyer/list/level/one",method:"post",data:e})}function l(e){return Object(o["a"])({url:"/api/business/buyer/show/level/one",method:"post",data:e})}function c(e){return Object(o["a"])({url:"/api/business/add",method:"post",data:e})}function u(e){return Object(o["a"])({url:"/api/business/update",method:"post",data:e})}function d(e){return Object(o["a"])({url:"/api/business/zh/update",method:"post",data:e})}function p(e){return Object(o["a"])({url:"/api/business/show",method:"post",data:e})}function m(e){return Object(o["a"])({url:"/api/business/zh/show",method:"post",data:e})}function f(e){return Object(o["a"])({url:"/api/business/status",method:"post",data:e})}function b(e){return Object(o["a"])({url:"/api/business/del",method:"post",data:e})}function _(){return Object(o["a"])({url:"/api/buyer/query",method:"post"})}function y(e){return Object(o["a"])({url:"/api/buyer/attention/pay",method:"post",data:e})}function g(e){return Object(o["a"])({url:"/api/business/attention/list",method:"post",data:e})}function h(e){return Object(o["a"])({url:"/api/location/query",method:"post",data:e})}function v(e){return Object(o["a"])({url:"/api/category/query",method:"post",data:e})}function w(e){return Object(o["a"])({url:"/api/account/business/pdf/"+e.num,method:"post",responseType:"blob",data:e.data})}},"333d":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.pageSize,total:e.total,layout:"prev, pager, next"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.handleCurrentChange}})],1)},i=[];n("c5f6");Math.easeInOutQuad=function(e,t,n,o){return e/=o/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function s(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function a(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,n){var o=a(),i=e-o,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var a=Math.easeInOutQuad(c,o,i,t);s(a),c<t?r(e):n&&"function"===typeof n&&n()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},pageSize:{type:Number,default:1},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}}},methods:{handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(n("f842"),n("2877")),p=Object(d["a"])(u,o,i,!1,null,"00be67d7",null);t["a"]=p.exports},"5cea":function(e,t,n){"use strict";var o=n("0ce4"),i=n.n(o);i.a},"8e42":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.pdfLoading,expression:"pdfLoading"}],staticClass:"app-container",staticStyle:{"z-index":"9999"}},[n("aside",[n("h3",{staticStyle:{"text-align":"center"}},[e._v(e._s(3==e.role?e.$t("route.myBusiness"):e.$t("route.businessForSales")))])]),e._v(" "),n("div",{staticClass:"filter-container"},[n("div",{staticClass:"filter-item el-select--medium"},[n("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"15px","margin-bottom":"0"},attrs:{size:"small",placeholder:e.$t("table.status"),clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.status,callback:function(t){e.$set(e.listQuery,"status",t)},expression:"listQuery.status"}},[n("el-option",{attrs:{label:e.$t("table.all"),value:"0"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("table.forSale"),value:"1"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("table.soldOut"),value:"2"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("employeeEdit.noVerified"),value:"3"}})],1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"180px","margin-right":"15px","margin-bottom":"0"},attrs:{size:"small",placeholder:e.$t("employeeEdit.business_category"),clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.category_id,callback:function(t){e.$set(e.listQuery,"category_id",t)},expression:"listQuery.category_id"}},e._l(e.business_category_arr,function(e){return n("el-option",{attrs:{label:e.category,value:e.id.toString()}})}),1)],1),e._v(" "),e.businessBrokerList.length>1?n("div",{staticClass:"filter-item el-select--medium"},[n("span",{staticStyle:{color:"#717171","font-size":"14px"}},[e._v(e._s(e.$t("broker")))]),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"15px","margin-bottom":"0"},attrs:{size:"small",placeholder:e.$t("broker"),clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.broker_id,callback:function(t){e.$set(e.listQuery,"broker_id",t)},expression:"listQuery.broker_id"}},[n("el-option",{attrs:{label:e.$t("table.all"),value:"0"}}),e._v(" "),e._l(e.businessBrokerList,function(e){return n("el-option",{attrs:{label:e.name,value:e.account_id}})})],2)],1):e._e(),e._v(" "),n("div",{staticClass:"filter-item el-select--medium"},[n("span",{staticStyle:{color:"#717171","font-size":"14px"}},[e._v(e._s(e.$t("table.price"))+" ($)")]),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"130px","margin-bottom":"0"},attrs:{size:"small",placeholder:e.$t("table.all"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.price_from,callback:function(t){e.$set(e.listQuery,"price_from",t)},expression:"listQuery.price_from"}}),e._v("\n      ~\n      "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"130px","margin-bottom":"0","margin-right":"15px"},attrs:{size:"small",placeholder:e.$t("table.all"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.price_to,callback:function(t){e.$set(e.listQuery,"price_to",t)},expression:"listQuery.price_to"}})],1),e._v(" "),n("div",{staticClass:"filter-item el-select--medium"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-bottom":"0"},attrs:{size:"small",placeholder:e.$t("table.search"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.q,callback:function(t){e.$set(e.listQuery,"q",t)},expression:"listQuery.q"}}),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-bottom":"0"},attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("table.search"))+"\n      ")])],1),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("table.add"))+"\n    ")]),e._v(" "),1==e.role?n("div",{staticClass:"filter-item el-select--medium",staticStyle:{"margin-left":"10px"}},[n("el-dropdown",{attrs:{trigger:"click"}},[n("el-button",{attrs:{size:"small",type:"primary",plain:""}},[e._v("\n          "+e._s(e.$t("order.Print"))),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{staticClass:"menuItem",attrs:{disabled:0==e.selectArray.length}},[n("span",{on:{click:function(t){return t.stopPropagation(),e.handlePrinter("1")}}},[e._v(e._s(e.$t("order.PrintOne")))])]),e._v(" "),n("el-dropdown-item",{staticClass:"menuItem",attrs:{disabled:0==e.selectArray.length}},[n("span",{on:{click:function(t){return t.stopPropagation(),e.handlePrinter("2")}}},[e._v(e._s(e.$t("order.PrintTwo")))])]),e._v(" "),n("el-dropdown-item",{staticClass:"menuItem",attrs:{disabled:0==e.selectArray.length}},[n("span",{on:{click:function(t){return t.stopPropagation(),e.handlePrinter("3")}}},[e._v(e._s(e.$t("order.PrintThree")))])])],1)],1)],1):e._e()],1),e._v(" "),n("div",{staticClass:"companyTable"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[1==e.role?n("el-table-column",{attrs:{type:"selection",align:"center",fixed:"left",width:"50"}}):e._e(),e._v(" "),n("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:"","label-width":"200px"}},[n("el-form-item",{attrs:{label:e.$t("employeeEdit.companyName")}},[n("span",[e._v(e._s(t.row.company))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Listing")}},[n("span",[e._v(e._s(t.row.listing))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Price")}},[n("span",[e._v("$ "+e._s(e.toThousands(t.row.price)))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Location")}},[n("span",[e._v(e._s(t.row.address))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Profitability")}},[n("span",[e._v(e._s(1==t.row.profitability?e.$t("yes"):e.$t("no")))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.RealEstate")}},[n("span",[e._v(e._s(1==t.row.real_estate?e.$t("yes"):e.$t("no")))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Franchise")}},[n("span",[e._v(e._s(1==t.row.franchise?e.$t("yes"):2==t.row.franchise?e.$t("no"):e.$t("NA")))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.BuildingSF")}},[n("span",[e._v(e._s(t.row.building_sf))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.EmployeeCount")}},[n("span",[e._v(e._s(0==t.row.employee_count?e.$t("NA"):t.row.employee_count))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.GrossIncome")}},[n("span",[e._v("\n                $ "+e._s(e.toThousands(t.row.gross_income))+"\n                / "+e._s(1==t.row.gross_income_unit?e.$t("week"):2==t.row.gross_income_unit?e.$t("Month"):3==t.row.gross_income_unit?e.$t("Quarter"):4==t.row.gross_income_unit?e.$t("Year"):"")+"\n              ")])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.EBITDA")}},[n("span",[e._v(e._s(t.row.ebitda))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.FFandE")}},[n("span",[e._v(e._s(t.row.ff_e))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Inventory")}},[n("span",[e._v(e._s(t.row.inventory))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.NetIncome")}},[n("span",[e._v("\n                $ "+e._s(e.toThousands(t.row.net_income))+"\n                / "+e._s(1==t.row.net_income_unit?e.$t("week"):2==t.row.net_income_unit?e.$t("Month"):3==t.row.net_income_unit?e.$t("Quarter"):4==t.row.net_income_unit?e.$t("Year"):"")+"\n              ")])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Lease")}},[n("span",[e._v("\n                $ "+e._s(e.toThousands(t.row.lease))+"\n                / "+e._s(1==t.row.lease_unit?e.$t("week"):2==t.row.lease_unit?e.$t("Month"):3==t.row.lease_unit?e.$t("Quarter"):4==t.row.lease_unit?e.$t("Year"):"")+"\n              ")])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.LeaseTerm")}},[n("span",[e._v(e._s(t.row.lease_term))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.Est")}},[n("span",[e._v(e._s(t.row.value_of_real_estate))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.ServiceFee")}},[n("span",[e._v(e._s(t.row.commission))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.BuyerFinancing")}},[n("span",[e._v(e._s(t.row.buyer_financing))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.USBroker")}},[n("span",[e._v(e._s(t.row.us_broker))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.USBrokerContactInfo")}},[n("span",[e._v(e._s(t.row.us_broker_contact_info))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.ListingDate")}},[n("span",[e._v(e._s(t.row.listing_date))])]),e._v(" "),n("el-form-item",{attrs:{label:e.$t("employeeEdit.ReasonForSelling")}},[n("span",[e._v(e._s(t.row.reason_for_selling))])])],1)]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"account.name",align:"center",label:e.$t("broker"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[o.account_name?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:o.account_name,placement:"top-start"}},[n("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"150px"}},[e._v(e._s(o.account_name))])]):n("span",[e._v(e._s(e.$t("Unknown")))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"category",align:"center",label:e.$t("employeeEdit.business_category"),"min-width":"180"}}),e._v(" "),n("el-table-column",{attrs:{prop:"company",align:"center",label:e.$t("employeeEdit.companyName"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.company,placement:"top-start"}},[n("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"200px"}},[e._v(e._s(t.row.company))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"title",align:"center",label:e.$t("employeeEdit.title"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.title,placement:"top-start"}},[n("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"200px"}},[e._v(e._s(t.row.title))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"price",align:"center",label:e.$t("table.price")+"($)",sortable:"","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[n("span",[e._v(e._s(e.toThousands(o.price)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"address",align:"center",label:e.$t("table.location"),"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.location,placement:"top-start"}},[n("span",{staticStyle:{display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"150px"}},[e._v(e._s(t.row.location))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"state",align:"center",label:e.$t("table.status"),"min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[1==o.status?n("el-tag",{attrs:{type:"primary"}},[e._v(e._s(e.$t("table.forSale")))]):e._e(),e._v(" "),2==o.status?n("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.$t("table.soldOut")))]):e._e(),e._v(" "),3==o.status?n("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.$t("employeeEdit.noVerified")))]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"address",align:"center",label:e.$t("table.operate"),fixed:"right","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-dropdown",{attrs:{trigger:"click"}},[n("el-button",{attrs:{size:"mini",type:"primary",plain:""}},[e._v("\n              "+e._s(e.$t("table.moreOperations"))),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[1==e.role?n("el-dropdown-item",{staticClass:"menuItem"},[n("span",{on:{click:function(n){return n.stopPropagation(),e.changeBroker(t)}}},[e._v(e._s(e.$t("table.changeBroker")))])]):e._e(),e._v(" "),3!=e.role?n("el-dropdown-item",{staticClass:"menuItem"},[n("span",{on:{click:function(n){return n.stopPropagation(),e.openSelectBuyer(t)}}},[e._v(e._s(e.$t("AddAttention")))])]):e._e(),e._v(" "),n("el-dropdown-item",{staticClass:"menuItem"},[n("span",{on:{click:function(n){return n.stopPropagation(),e.handleEdit(t.$index,t)}}},[e._v(e._s(e.$t("table.edit")))])]),e._v(" "),n("el-dropdown-item",{staticClass:"menuItem"},[n("span",{on:{click:function(n){return n.stopPropagation(),e.handleDelete(t.$index,t)}}},[e._v(e._s(e.$t("table.delete")))])])],1)],1)]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,pageSize:e.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},pagination:function(t){return e.getList(e.listQuery)}}})],1),e._v(" "),n("el-dialog",{attrs:{title:e.$t("ChooseAttentionBuyer"),visible:e.selectBuyer,width:"500px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.selectBuyer=t}}},[n("el-select",{directives:[{name:"loading",rawName:"v-loading",value:e.buyerListLoading,expression:"buyerListLoading"}],staticClass:"filter-item",staticStyle:{width:"100%"},attrs:{clearable:""},model:{value:e.selectBuyerId,callback:function(t){e.selectBuyerId=t},expression:"selectBuyerId"}},e._l(e.buyerList,function(e){return n("el-option",{attrs:{label:e.label,value:e.key}})}),1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.selectBuyer=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.AddAttention(e.business_id,e.selectBuyerId)}}},[e._v(e._s(e.$t("AddAttention"))+"\n      ")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:e.$t("table.changeBroker"),visible:e.selectBusinessBroker,width:"500px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.selectBusinessBroker=t}}},[n("el-select",{directives:[{name:"loading",rawName:"v-loading",value:e.brokerListLoading,expression:"brokerListLoading"}],staticClass:"filter-item",staticStyle:{width:"100%"},attrs:{clearable:""},model:{value:e.owner_id,callback:function(t){e.owner_id=t},expression:"owner_id"}},e._l(e.BusinessBrokerList,function(e){return n("el-option",{attrs:{label:e.name,value:e.account_id}})}),1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.selectBusinessBroker=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.changeBrokerSave(e.business_id,e.owner_id)}}},[e._v(e._s(e.$t("table.changeBroker"))+"\n      ")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:e.$t("table.RecommendationToBuyerBroker"),visible:e.selectBuyerBroker,width:"500px",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.selectBuyerBroker=t}}},[n("el-select",{directives:[{name:"loading",rawName:"v-loading",value:e.buyerBrokerListLoading,expression:"buyerBrokerListLoading"}],staticClass:"filter-item",staticStyle:{width:"100%"},attrs:{clearable:""},model:{value:e.buyer_id,callback:function(t){e.buyer_id=t},expression:"buyer_id"}},e._l(e.buyerBrokerList,function(e){return n("el-option",{attrs:{label:e.name,value:e.buyer_id}})}),1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.selectBuyerBroker=!1}}},[e._v(e._s(e.$t("table.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.changeBuyerBrokerSave(e.business_id,e.buyer_id)}}},[e._v(e._s(e.$t("table.RecommendationToBuyerBroker"))+"\n      ")])],1)],1)],1)},i=[],r=n("4360"),s=n("333d"),a=n("2b6d"),l=(n("05a9"),{name:"CompanyForSales",components:{Pagination:s["a"]},data:function(){return{pdfLoading:!1,selectArray:[],role:"",business_category_arr:[],listQuery:{broker_id:"",category_id:"",page:1,status:"",price_from:"",price_to:"",q:"",order:"",prop:""},listLoading:!1,total:1,pageSize:15,tableData:[],buyerListLoading:!1,selectBuyer:!1,buyerList:[],business_id:"",selectBuyerId:"",businessBrokerList:[],brokerListLoading:!1,selectBusinessBroker:!1,BusinessBrokerList:[],owner_id:"",buyerBrokerListLoading:!1,selectBuyerBroker:!1,buyerBrokerList:[],buyer_id:""}},mounted:function(){this.listQuery.page=1,this.getList(),this.getBrokersList(),this.get_business_category_arr(),this.role=r["a"].getters&&r["a"].getters.role},methods:{handleRecommendation:function(){var e=this;0!=e.selectArray.length&&(this.business_id=e.selectArray),this.selectBuyerBroker=!0,this.buyerBrokerListLoading=!0,Object(a["l"])().then(function(t){e.buyerBrokerListLoading=!1,console.log("getBusinessbrokersList",t),e.buyerBrokerList=t.data}).catch(function(t){e.buyerBrokerListLoading=!1,console.log(t)})},changeBuyerBrokerSave:function(e,t){var n=this;t?Object(a["d"])({business_id:e,buyer_id:t}).then(function(e){n.selectBuyerBroker=!1,n.getList(),console.log("changeBusinessbrokerSave",e),n.$notify({showClose:!0,message:n.$t("Successful"),type:"success"})}).catch(function(e){n.selectBuyerBroker=!1,console.log(e)}):n.$notify.error({showClose:!0,message:n.$t("table.changeBrokerText")})},get_business_category_arr:function(){var e=this;Object(a["j"])().then(function(t){console.log("getBusinessCategoryArr",t),e.business_category_arr=t.data}).catch(function(e){console.log(e)})},handlePrinter:function(e){var t=this;this.pdfLoading=!0,Object(a["b"])({data:{ids:JSON.stringify(this.selectArray)},num:e}).then(function(n){console.log("businessGeneratePdf"+e,n);var o=n,i=new Blob([o]);-1!==window.location.origin.indexOf("dev.newdreamservices.com")||-1!==window.location.origin.indexOf("business.newdreamservices.com")?window.open("/web/web/viewer.html?file="+encodeURIComponent(URL.createObjectURL(i))):window.open("/web/viewer.html?file="+encodeURIComponent(URL.createObjectURL(i))),t.pdfLoading=!1}).catch(function(e){console.log(e)})},handleSelectionChange:function(e){this.selectArray=[];for(var t=0,n=e.length;t<n;t++)this.selectArray.push(e[t].id);console.log(e,this.selectArray)},changeBroker:function(e){var t=this;e&&(this.business_id=e.row.id),this.selectBusinessBroker=!0,this.brokerListLoading=!0,Object(a["l"])().then(function(e){t.brokerListLoading=!1,console.log("getBusinessbrokersList",e),t.BusinessBrokerList=e.data}).catch(function(e){t.brokerListLoading=!1,console.log(e)})},changeBrokerSave:function(e,t){var n=this;t?Object(a["d"])({business_id:e,owner_id:t}).then(function(e){n.selectBusinessBroker=!1,n.getList(),console.log("changeBusinessbrokerSave",e),n.$notify({showClose:!0,message:n.$t("Successful"),type:"success"})}).catch(function(e){n.selectBusinessBroker=!1,console.log(e)}):n.$notify.error({showClose:!0,message:n.$t("table.changeBrokerText")})},openSelectBuyer:function(e){var t=this;this.selectBuyer=!0,e&&(this.business_id=e.row.id),this.buyerListLoading=!0,Object(a["m"])().then(function(e){t.buyerListLoading=!1,console.log("getBuyers",e),t.buyerList=e.data}).catch(function(e){t.buyerListLoading=!1,console.log(e)})},AddAttention:function(e,t){var n=this;t?Object(a["o"])({business_id:e,buyer_id:t}).then(function(e){console.log("setAttentionBusiness",e),n.selectBuyer=!1,n.$notify({showClose:!0,message:n.$t("Successful"),type:"success"})}).catch(function(e){n.selectBuyer=!1,console.log(e)}):n.$notify.error({showClose:!0,message:n.$t("ChooseAttentionBuyer")})},sortChange:function(e){console.log(e),this.listQuery.page=1,this.listQuery.order="ascending"==e.order?1:"descending"==e.order?0:"",this.listQuery.prop=e.prop,console.log(this.listQuery),this.getList(this.listQuery)},handleFilter:function(){this.listQuery.page=1,this.getList(this.listQuery)},handleCreate:function(){this.$router.push({path:"/employerEdit/index"})},getList:function(e){var t=this;this.listLoading=!0,Object(a["k"])(e).then(function(e){console.log("getBusinessList",e),t.listLoading=!1,t.total=e.data.total,t.tableData=e.data.data}).catch(function(e){console.log(e),t.listLoading=!1})},getBrokersList:function(e){var t=this;Object(a["l"])(e).then(function(e){console.log("getBusinessbrokersList",e),t.businessBrokerList=e.data}).catch(function(e){console.log(e)})},handleEdit:function(e,t){console.log(123123,t),this.$router.push({path:"/employerEdit/index",query:{id:t.row.id}})},handleChangeStatus:function(e){var t=this,n=this,o={id:e.row.id,status:1==e.row.status?2:1};n.$confirm(n.$t("changeMsg"),n.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:n.$t("confirm"),cancelButtonText:n.$t("cancel")}).then(function(){t.listLoading=!0,Object(a["e"])(o).then(function(e){console.log("changeStatus",e),n.getList(),n.listLoading=!1,n.$notify({showClose:!0,message:n.$t("Successful"),type:"success"})}).catch(function(e){n.listLoading=!1,console.log(e)})}).catch(function(e){})},handleDelete:function(e,t){var n=this;n.$confirm(n.$t("delMsg"),n.$t("Confirmation"),{distinguishCancelAndClose:!0,confirmButtonText:n.$t("confirm"),cancelButtonText:n.$t("cancel")}).then(function(){Object(a["f"])({id:t.row.id}).then(function(e){console.log("delBuyer",e),n.getList(),n.listQuery.page=1,n.$notify({showClose:!0,message:n.$t("deleted"),type:"success"})}).catch(function(e){console.log(e)})}).catch(function(e){})}}}),c=l,u=(n("5cea"),n("2877")),d=Object(u["a"])(c,o,i,!1,null,"5c489b9d",null);t["default"]=d.exports},bb14:function(e,t,n){},f842:function(e,t,n){"use strict";var o=n("bb14"),i=n.n(o);i.a}}]);