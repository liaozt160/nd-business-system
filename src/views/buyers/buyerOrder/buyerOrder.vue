<!--买家订单-->
<template>
  <div class="app-container" v-loading="pdfLoading" style="z-index: 9999">
    <aside>
      <h3 style="text-align: center;">{{$t('route.buyerOrder')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter" clearable></el-input>
        <el-button size="small" class="filter-item" type="primary" style="margin-bottom: 0;" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      </div>
      <el-button size="small" v-if="$route.query.role==role||role==1" class="filter-item" style="margin-left: 10px;" type="primary"
                 icon="el-icon-plus" @click="handleCreate">{{ $t('order.addOrder') }}
      </el-button>
    </div>

    <!--列表-->
    <div class="companyTable">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="buyer_name"
          align="center"
          :label="$t('buyers.Name')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="order_no"
          align="center"
          :label="$t('order.orderNumber')"
          min-width="170">
        </el-table-column>
        <el-table-column
          prop="created_at"
          align="center"
          :label="$t('order.creationTime')"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="paid"
          align="center"
          :label="$t('order.orderType')"
          min-width="150">
          <!--订单类型-->
          <template slot-scope="scope">
            <el-tag type="primary" style="width: 120px" v-if="scope.row.paid==3">{{$t('order.otherFees')}}</el-tag>
            <el-tag type="primary" style="width: 120px" v-if="scope.row.paid==2">{{$t('order.investigationFee')}}</el-tag>
            <el-tag type="primary" style="width: 120px" v-if="scope.row.paid==1">{{$t('order.informationFee')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_amount"
          align="center"
          :label="$t('order.orderAmount')+'($)'"
          min-width="150">
          <template slot-scope="{row}">
            <span>{{toThousands(row.pay_amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          :label="$t('order.auditStatus')"
          min-width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.audit_reason" placement="top" v-if="scope.row.audit_reason">
              <el-tag type="danger"  style="width: 120px" v-if="scope.row.status==3"> {{$t('order.auditFailed')}}</el-tag>
            </el-tooltip>
            <el-tag type="danger"  style="width: 120px" v-if="scope.row.status==3&&!scope.row.audit_reason"> {{$t('order.auditFailed')}}</el-tag>
            <el-tag type="success" style="width: 120px" v-if="scope.row.status==2">{{$t('order.Audit')}}</el-tag>
            <el-tag type="primary" style="width: 120px" v-if="scope.row.status==1">{{$t('order.AuditInProgress')}}</el-tag>
            <el-tag type="info"    style="width: 120px" v-if="scope.row.status==0">{{ $t('order.notSubmitted') }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          :label="$t('order.remarks')"
          min-width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top">
              <span
                style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 120px;">{{scope.row.remark}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="180">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button size="mini" type="primary" plain>
                {{$t('table.moreOperations')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <!--管理员-->
              <el-dropdown-menu slot="dropdown" v-if="role==1">
                <!--未提交-->
                <div v-if="scope.row.status==0">
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                  <!--提交订单按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="changeStatus(scope,1)">{{$t('order.submitOrder')}}</span></el-dropdown-item>
                  <!--编辑订单按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role||role==1"><span @click.stop="modifyOrder(scope)">{{$t('order.modifyOrder')}}</span></el-dropdown-item>
                  <!--删除按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role||role==1"><span @click.stop="handleDelete(scope)">{{$t('table.delete')}}</span></el-dropdown-item>
                </div>
                <!--审核中-->
                <div v-if="scope.row.status==1">
                  <!--查看订单按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="viewOrder(scope)">{{$t('order.viewOrder')}}</span></el-dropdown-item>
                  <!--取消提交订单按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role||role==1"><span @click.stop="changeStatus(scope,0)">{{$t('order.cancelOrder')}}</span></el-dropdown-item>
                  <!--编辑订单按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role||role==1" :disabled="scope.row.status!=0"><span @click.stop="modifyOrder(scope)">{{$t('order.modifyOrder')}}</span></el-dropdown-item>
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                  <!--通过审核按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="audited(scope,2)">{{$t('order.Audit')}}</span></el-dropdown-item>
                  <!--拒绝审核按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="audited(scope,3)">{{$t('order.reject')}}</span></el-dropdown-item>
                  <!--删除按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="handleDelete(scope)">{{$t('table.delete')}}</span></el-dropdown-item>
                </div>
                <!--已审核状态-->
                <div v-if="scope.row.status==2">
                  <!--查看订单按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="viewOrder(scope)">{{$t('order.viewOrder')}}</span></el-dropdown-item>
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                  <!--导出pdf按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="ExportPDF(scope)">{{$t('order.Print')}}</span></el-dropdown-item>
                  <!--删除按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="handleDelete(scope)">{{$t('table.delete')}}</span></el-dropdown-item>
                </div>
                <!--拒绝状态-->
                <div v-if="scope.row.status==3">
                  <!--查看订单按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="viewOrder(scope)">{{$t('order.viewOrder')}}</span></el-dropdown-item>
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                  <!--删除按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="handleDelete(scope)">{{$t('table.delete')}}</span></el-dropdown-item>
                </div>
              </el-dropdown-menu>

              <!--买家中介-->
              <el-dropdown-menu slot="dropdown" v-if="role==2">
                <!--待提交-->
                <div v-if="scope.row.status==0">
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                  <!--提交订单按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="changeStatus(scope,1)">{{$t('order.submitOrder')}}</span></el-dropdown-item>
                  <!--编辑订单按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role"><span @click.stop="modifyOrder(scope)">{{$t('order.modifyOrder')}}</span></el-dropdown-item>
                  <!--删除按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role"><span @click.stop="handleDelete(scope)">{{$t('table.delete')}}</span></el-dropdown-item>
                </div>
                <!--审核中-->
                <div v-if="scope.row.status==1">
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                  <!--取消提交订单按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role"><span @click.stop="changeStatus(scope,0)">{{$t('order.cancelOrder')}}</span></el-dropdown-item>
                  <!--编辑订单按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role" :disabled="scope.row.status!=0"><span @click.stop="modifyOrder(scope)">{{$t('order.modifyOrder')}}</span></el-dropdown-item>
                </div>
                <!--已审核状态-->
                <div v-if="scope.row.status==2">
                  <!--查看订单按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role"><span @click.stop="viewOrder(scope)">{{$t('order.viewOrder')}}</span></el-dropdown-item>
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                  <!--导出pdf按钮-->
                  <el-dropdown-item class="menuItem" v-if="$route.query.role==role"><span @click.stop="ExportPDF(scope)">{{$t('order.Print')}}</span></el-dropdown-item>
                </div>
                <!--拒绝状态-->
                <div v-if="scope.row.status==3">
                  <!--付款信息按钮-->
                  <el-dropdown-item class="menuItem"><span @click.stop="payInformationOpen(scope)">{{$t('order.payInformation')}}</span></el-dropdown-item>
                </div>

              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="pageSize"
                  @pagination="getList(listQuery)"/>
    </div>

    <!--订单编辑弹窗-->
    <el-dialog :title="orderId? $t('order.modifyOrder'):$t('order.addOrder')" :visible.sync="dialogFormVisible"
               width="800px" :before-close="dialogClose" style="padding-bottom: 50px" center
               :close-on-click-modal="false">
      <el-form ref="dataForm" :model="orderEdit" :rules="rules" label-position="right" label-width="130px"
               label-lineHight="40px" v-loading="assignedLoading" class="orderEditForm">
        <div>
          <!--请选择买家想要购买的企业信息-->
          <p style="text-align: center;">{{$t('order.selectBusinessList')}}</p>
          <div style="text-align: center;">
            <el-transfer
              class="transfer"
              style="text-align: left; display: inline-block;margin-bottom: 30px;"
              v-model="orderEdit.business_ids"
              filterable
              :titles="[ $t('allBusiness'), $t('selectedBusiness')]"
              @left-check-change="leftChoose"
              :data="business">
            </el-transfer>
          </div>
        </div>
        <div class="formRow">
          <!--订单金额-->
          <el-form-item :label="$t('order.orderAmount')" prop="pay_amount">
            <el-input v-enter-number maxLength="8" v-model="orderEdit.pay_amount" :placeholder="$t('order.orderAmount')"
                      style="width:210px;"
                      class="filter-item">
              <template slot="prepend"> $</template>
            </el-input>
          </el-form-item>
          <!--支付类型-->
          <el-form-item :label="$t('order.orderType')" prop="paid">
          <el-select v-model="orderEdit.paid" style="width:210px;" class="filter-item">
          <el-option :label="$t('order.informationFee')" :value="1"/>
          <el-option :label="$t('order.investigationFee')" :value="2"/>
          <el-option :label="$t('order.otherFees')" :value="3"/>
          </el-select>
          </el-form-item>
        </div>
        <div class="formRow">
          <!--备注-->
          <el-form-item :label="$t('order.remarks')" style="width: 100%;">
            <el-input type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('order.remarks')"
                      v-model="orderEdit.remark"></el-input>
          </el-form-item>
        </div>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button :disabled="orderEditSaveClick" type="primary" @click.native.prevent="orderEditSave()">{{ $t('table.confirm') }}</el-button>
      </div>

    </el-dialog>
    <!--查看订单弹窗-->
    <el-dialog :title="$t('order.viewOrder')" :visible.sync="dialogviewOrder" width="900px" style="padding-bottom: 50px"
               center :close-on-click-modal="false">
      <div style="padding-bottom: 100px" v-loading="viewOrderLoading">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item :label="$t('buyers.Name')+'：'">
            <!--买家名称-->
            <span v-if="viewOrderData.buyer">{{ viewOrderData.buyer.buyer }}</span>
          </el-form-item>
          <el-form-item :label="$t('order.orderNumber')+'：'">
            <!--订单号-->
            <span>{{ viewOrderData.order_no }}</span>
          </el-form-item>
          <el-form-item :label="$t('order.auditStatus')+'：'">
            <!--订单状态-->
            <template>
              <el-tag type="danger"  style="text-align:center;width: 180px" v-if="viewOrderData.status==3">{{$t('order.auditFailed')}}    </el-tag>
              <el-tag type="success" style="text-align:center;width: 180px" v-if="viewOrderData.status==2">{{$t('order.Audit')}}          </el-tag>
              <el-tag type="primary" style="text-align:center;width: 180px" v-if="viewOrderData.status==1">{{$t('order.AuditInProgress')}}</el-tag>
              <el-tag type="info"    style="text-align:center;width: 180px" v-if="viewOrderData.status==0">{{ $t('order.notSubmitted') }} </el-tag>
            </template>
          </el-form-item>
          <el-form-item :label="$t('order.Payment')+'：'">
            <!--支付款项-->
            <template>
              <el-tag type="success" style="text-align:center;width: 120px" v-if="viewOrderData.paid==3">{{$t('order.otherFees')}}</el-tag>
              <el-tag type="success" style="text-align:center;width: 120px" v-if="viewOrderData.paid==2">{{$t('order.investigationFee')}}</el-tag>
              <el-tag type="primary" style="text-align:center;width: 120px" v-if="viewOrderData.paid==1">{{$t('order.informationFee')}}</el-tag>
            </template>
          </el-form-item>
          <!--<el-form-item :label="$t('table.PaymentStatus')+'：'">-->
            <!--&lt;!&ndash;支付状态&ndash;&gt;-->
            <!--<template>-->
              <!--<el-tag type="success" v-if="viewOrderData.paid==1">{{ $t('table.Paymented') }}</el-tag>-->
              <!--<el-tag type="info" v-if="viewOrderData.paid==0">{{ $t('table.Unpaid') }}</el-tag>-->
            <!--</template>-->
          <!--</el-form-item>-->
          <el-form-item :label="$t('order.remarks')+'：'">
            <!--备注-->
            <span>{{ viewOrderData.remark }}</span>
          </el-form-item>
        </el-form>
        <div style="font-weight: bold;margin: 20px 0;">{{$t('order.BusinessInformationPurchased')}}</div>
        <el-table
          :data="viewOrderData.details"
          border
          stripe
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand" label-width="200px">
                <el-form-item :label="$t('employeeEdit.companyName')">
                  <!--企业名称-->
                  <span>{{ props.row.company }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.title')">
                  <!--标题-->
                  <span>{{ props.row.title }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Listing')">
                  <!--编号-->
                  <span>{{ props.row.listing }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Price')">
                  <!--标价-->
                  <span>$ {{ toThousands(props.row.price) }}</span>
                </el-form-item>
                <!--<el-form-item :label="$t('employeeEdit.Location')">-->
                <!--&lt;!&ndash;地理位置&ndash;&gt;-->
                <!--<span>{{ props.row.address }}</span>-->
                <!--</el-form-item>-->
                <el-form-item :label="$t('employeeEdit.Profitability')">
                  <!--是否盈利-->
                  <span>{{ props.row.profitability==1?$t('yes'):$t('no') }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.RealEstate')">
                  <!--是否包含房地产-->
                  <span>{{ props.row.real_estate ==1?$t('yes'):$t('no')}}</span>
                </el-form-item>
                <!--<el-form-item :label="$t('employeeEdit.Franchise')">-->
                <!--&lt;!&ndash;是否连锁店&ndash;&gt;-->
                <!--<span>{{ props.row.real_estate==1?$t('yes'):props.row.real_estate==2?$t('no'):$t('NA') }}</span>-->
                <!--</el-form-item>-->
                <el-form-item :label="$t('employeeEdit.BuildingSF')">
                  <!--营业面积-->
                  <span>{{ props.row.building_sf }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.EmployeeCount')">
                  <!--员工人数-->
                  <span>{{ props.row.employee_count==0?$t('NA'):props.row.employee_count }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.GrossIncome')">
                  <!--毛利润-->
                  <span>
                    $ {{ toThousands(props.row.gross_income) }}
                    / {{props.row.gross_income_unit==1?$t('week'):props.row.gross_income_unit==2?$t('Month'):props.row.gross_income_unit==3?$t('Quarter'):props.row.gross_income_unit==4?$t('Year'):''}}
                  </span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.EBITDA')">
                  <!--税息折扣及摊销前利润-->
                  <span>{{ props.row.ebitda }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.FFandE')">
                  <!--硬件资产价值-->
                  <span>{{ props.row.ff_e }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Inventory')">
                  <!--库存-->
                  <span>{{ props.row.inventory }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.NetIncome')">
                  <!--净利润-->
                  <span>
                    $ {{ toThousands(props.row.net_income) }}
                    / {{props.row.net_income_unit==1?$t('week'):props.row.net_income_unit==2?$t('Month'):props.row.net_income_unit==3?$t('Quarter'):props.row.net_income_unit==4?$t('Year'):''}}
                  </span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Lease')">
                  <!--租金-->
                  <span>
                    $ {{ toThousands(props.row.lease)}}
                    / {{props.row.lease_unit==1?$t('week'):props.row.lease_unit==2?$t('Month'):props.row.lease_unit==3?$t('Quarter'):props.row.lease_unit==4?$t('Year'):''}}
                  </span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.LeaseTerm')">
                  <!--租约有效期-->
                  <span>{{ props.row.lease_term }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Est')">
                  <!--房地产估价-->
                  <span>{{ props.row.value_of_real_estate }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.ServiceFee')" v-if="role==1">
                  <!--服务费-->
                  <span>{{ props.row.commission }} </span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.BuyerFinancing')">
                  <!--卖家融资-->
                  <span>{{ props.row.buyer_financing }}</span>
                </el-form-item>
                <!--<el-form-item :label="$t('employeeEdit.BusinessDescription')">-->
                <!--&lt;!&ndash;生意介绍信息&ndash;&gt;-->
                <!--<span>{{ props.row.business_description }}</span>-->
                <!--</el-form-item>-->
                <el-form-item :label="$t('employeeEdit.USBroker')">
                  <!--美国中介-->
                  <span>{{ props.row.us_broker }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.USBrokerContactInfo')">
                  <!--美国中介联系方式-->
                  <span>{{ props.row.us_broker_contact_info }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.ListingDate')">
                  <!--待售开始日期-->
                  <span>{{ props.row.listing_date }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.ReasonForSelling')">
                  <!--出售原因-->
                  <span>{{ props.row.reason_for_selling }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="company"
            align="center"
            :label="$t('employeeEdit.companyName')"
            min-width="200">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.company" placement="top-start">
                <span
                  style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 200px;">{{scope.row.company}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            align="center"
            :label="$t('employeeEdit.title')"
            min-width="200">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top-start">
                <span
                  style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 200px;">{{scope.row.title}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            align="center"
            :label="$t('table.price')+'($)'"
            min-width="150">
            <template slot-scope="{row}">
              <span>{{toThousands(row.price)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="listing"
            align="center"
            :label="$t('employeeEdit.Listing')"
            min-width="150">
            <template slot-scope="{row}">
              <span>{{row.listing}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            align="center"
            :label="$t('table.status')"
            min-width="100">
            <template slot-scope="{row}">
              <el-tag type="primary" v-if="row.status==1">{{ $t('table.forSale') }}</el-tag>
              <el-tag type="info" v-if="row.status==2">{{ $t('table.soldOut') }}</el-tag>
              <el-tag type="info" v-if="row.status==3">{{ $t('employeeEdit.noVerified') }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!--支付信息弹窗-->
    <el-dialog :title="$t('order.payInformation')" :visible.sync="dialogViewPayInformation" width="800px"
               style="padding-bottom: 50px" center :close-on-click-modal="false">
      <div style="padding-bottom: 50px" v-loading="payInformationLoading">
        <!--添加附件记录-->
        <div style="font-weight: bold;margin: 20px 0;">
          {{$t('order.FileRecords')}}
          <el-button v-if="role==$route.query.role" class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus"
                     @click="addFileRecords">{{ $t('order.addFile') }}
          </el-button>
        </div>
        <el-table
          :data="FileRecordsData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="company"
            align="center"
            :label="$t('order.File')"
            min-width="200">
            <template slot-scope="scope">
              <span style="color: #409eff;">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            align="center"
            :label="$t('order.remarks')"
            min-width="150">
            <template slot-scope="{row}">
              <!--备注-->
              <span>{{ row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="listing"
            align="center"
            :label="$t('order.time')"
            min-width="150">
            <template slot-scope="{row}">
              <span>{{row.created_at}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            :label="$t('table.operate')"
            min-width="100"
            fixed="right">
            <template slot-scope="scope">
              <!--下载按钮-->
              <el-button size="medium" type="primary" :title="$t('table.download')" icon="el-icon-download" circle plain
                         @click="viewFile(scope)"></el-button>
              <!--删除按钮-->
              <el-button  v-if="role==$route.query.role" size="medium" type="danger" :title="$t('table.delete')" icon="el-icon-delete" circle plain
                         @click="FileRecordsDel(scope)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--添加支付记录弹窗-->
    <el-dialog :title="$t('order.addPayRecord')" :visible.sync="dialogAddPayRecord" width="600px" center
               :close-on-click-modal="false">
      <div>
        <p>1.{{$t('order.informationFeeText')}}</p>
        <p>2.{{$t('order.investigationFeeText')}}</p>
      </div>
      <div style="padding-bottom: 10px">
        <el-select v-model="selectPayContent" clearable style="width: 100%" class="filter-item">
          <el-option :label="$t('order.informationFee')" :value="1"/>
          <el-option :label="$t('order.investigationFee')" :value="2"/>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogAddPayRecord = false">{{ $t('table.cancel') }}</el-button>
        <el-button size="small" type="primary" @click="addPayRecordSave()">{{ $t('order.addPayRecord') }}</el-button>
      </div>
    </el-dialog>
    <!--添加附件弹窗-->
    <el-dialog :title="$t('order.addFile')" :visible.sync="dialogAddFileRecords" width="600px"
               style="padding-bottom: 50px" center :close-on-click-modal="false">
      <div style="padding-bottom: 30px">
        <div class="updateFile">
          <input class="fileUp" type="file" @change="update" accept=".xls,.doc,.ppt,.txt,.pdf,image/*"/>
          <!--支持jpg/png/gif格式-->
          <input class="fileUpinput" readonly="readonly" type="text" v-model="fileName"
                 :placeholder="$t('order.selectFile')"/>
        </div>

        <div class="remarksBox">
          <!--备注-->
          <span style="line-height: 40px;">{{$t('order.remarks')}}</span>
          <el-input type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('order.remarks')"
                    v-model="FileRecordsRemark"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogAddFileRecords = false">{{ $t('table.cancel') }}</el-button>
        <el-button size="small" type="primary" :disabled="AddFileRecordsClick" @click="addFileRecordsSave()">{{ $t('order.addFile') }}</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import {
    getOrderList,
    addOrderApi,
    updateOrderApi,
    deleteOrderApi,
    showOrderApi,
    getAllBusinessApi,
    changeStatusApi,
    changeAuditApi,
    viewAuditOrderApi,
    viewPaymentInformationApi,
    addPayRecordApi,
    delPayRecordApi,
    orderUploadFileApi,
    viewFileApi,
    delOrderFileApi,
    showDetailPdfApi
  } from '@/api/order'

  export default {
    name: "buyerOrder",
    components: {
      Pagination
    },
    data() {
      return {
        orderEditSaveClick: false,

        pdfLoading: false,

        params: '',

        isBuyer: false,

        role: '',
        business: [],
        assignedLoading: false,

        payInformationLoading: false,
        dialogViewPayInformation: false,
        dialogAddPayRecord: false,
        dialogAddFileRecords: false,
        AddFileRecordsClick: false,
        selectPayContent: 1,//支付记录内容
        FileRecordsData: [],//附件记录数据
        fileName: '',
        FileRecordsRemark: '',

        dialogviewOrder: false,
        viewOrderLoading: false,
        viewOrderData: '',

        dialogFormVisible: false,
        AssignVisible: false,
        orderId: '',
        orderEdit: {
          buyer_id: '',
          paid: 1,
          pay_amount: '',
          status: 0,
          remark: '',
          business_ids: [],
        },

        listQuery: {
          page: 1,
          buyer_id: '',
          funds_available_from: '',
          funds_available_to: '',
          funds_verified: '0',
          q: '',
        },
        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],

        rules: {
          pay_amount: [{required: true, message: this.$t('empty'), trigger: 'blur'}],
          paid: [{required: true, message: this.$t('empty'), trigger: 'change'}],
        }
      }
    },
    mounted() {
      this.params = new FormData(); // 创建form对象
      this.orderEdit.buyer_id = this.$route.query.id;
      this.listQuery.buyer_id = this.$route.query.id;
      this.getList({buyer_id: this.$route.query.id,});

      this.role = store.getters && store.getters.role
    },
    methods: {
      // 导出pdf
      ExportPDF(scope) {
        let that=this;
        that.pdfLoading=true;
        showDetailPdfApi({order_id:scope.row.id}).then(response => {
          console.log('showDetailPdfApi', response);
          const contents = response;
          const blob = new Blob([contents]);
          if (window.location.origin.indexOf('dev.newdreamservices.com') !== -1||window.location.origin.indexOf('business.newdreamservices.com') !== -1) {
            // window.open('/web/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
            window.open (response.data.url, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
          } else{
            // window.open('/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
            window.open (response.data.url, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
          }
          that.pdfLoading=false;
        }).catch(err => {
          console.log(err);
        })
      },
      // 打开支付附件信息弹窗
      payInformationOpen(scope) {
        this.order_id = scope.row.id;
        this.dialogViewPayInformation = true;
        this.getPayInformation(scope.row.id);
      },
      // 获取支付附件Data
      getPayInformation(id) {
        let that = this;
        this.payInformationLoading = true;
        viewPaymentInformationApi({id: id}).then(response => {
          that.payInformationLoading = false;
          console.log('viewPaymentInformationApi', response);
          that.FileRecordsData = response.data.files;
        }).catch(err => {
          that.payInformationLoading = false;
          console.log(err);
        })
      },

      // 打开添加附件弹窗
      addFileRecords() {
        this.dialogAddFileRecords = true;
        this.fileName = '';
        this.FileRecordsRemark = '';
        this.params = new FormData(); // 创建form对象
      },
      // 上传附件按钮
      update(e) {
        let that = this;
        let file = e.target.files[0];
        if(file.size/1000/1000>10){//文件大于10M
          that.$notify({
            showClose: true,
            message: that.$t('order.ExcessiveFileSize'),
            type: 'warning'
          });
          return false;
        }
        that.params.append('file', file, file.name); // 通过append向form对象添加数据
        that.fileName = file.name;
        e.target.value='';//防止两次提交同一个文件时不生效
      },
      // 添加附件保存
      addFileRecordsSave() {
        let that = this;
        if (!that.fileName) {
          that.$notify({
            showClose: true,
            message: that.$t('order.pleaseSelectFile'),
            type: 'warning'
          });
          return false;
        }
        that.params.append('order_id', that.order_id);
        that.params.append('remark', that.FileRecordsRemark);
        that.AddFileRecordsClick=true;
        orderUploadFileApi(that.params).then(response => {
          that.dialogAddFileRecords = false;
          that.AddFileRecordsClick=false;
          that.getPayInformation(that.order_id);
          console.log('orderUploadFileApi', response);
          that.$notify({
            showClose: true,
            message: that.$t('Successful'),
            type: 'success'
          });
          that.params ='';
        }).catch(err => {
          that.AddFileRecordsClick=false;
          that.dialogAddFileRecords = false;
          that.params ='';
          console.log(err);
        })
      },
      // 查看附件
      viewFile(scope){
        let that=this;
        that.payInformationLoading=false;
        viewFileApi({file_id:scope.row.file_id}).then(response => {
          console.log('viewFileApi', response);
          const contents = response;
          const blob = new Blob([contents]);
          const fileName = scope.row.name;
          if ('download' in document.createElement('a')) { // 非IE下载
            if(scope.row.name.indexOf('.pdf')!==-1){ //如果是pdf文件，先预览
              if (window.location.origin.indexOf('dev.newdreamservices.com') !== -1||window.location.origin.indexOf('business.newdreamservices.com') !== -1) {
                // window.open('/web/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
                window.open (response.data.url, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
              } else{
                // window.open('/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
                window.open (response.data.url, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
              }
            }else{ //不是pdf文件，直接下载
              const elink = document.createElement('a');
              elink.download = fileName;
              elink.style.display = 'none';
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href); // 释放URL 对象
              document.body.removeChild(elink)
            }
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
          that.payInformationLoading=false;
        }).catch(err => {
          that.payInformationLoading=false;
          console.log(err);
        })
      },
      //附件记录删除
      FileRecordsDel(scope) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delOrderFileApi({id: scope.row.id}).then(response => {
            console.log('delOrderFileApi', response);
            that.getPayInformation(that.order_id);
            that.$notify({
              showClose: true,
              message: that.$t('deleted'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(action => {
        });
      },

      // 穿梭框
      leftChoose(e) {
        let canlength = 10 - this.orderEdit.business_ids.length;
        if (e.length > canlength) {
          if (e.length >= 1) {
            if (e.length <= 11) {
              this.$notify({
                showClose: true,
                message: this.$t('onlyChoose10'),
                type: 'warning'
              });
            }
            e.pop();
          }
          return false;
        }
      },
      // 穿梭框获取所有企业列表
      getAllBusiness() {
        let that = this;
        that.assignedLoading = true;
        getAllBusinessApi().then(response => {
          that.assignedLoading = false;
          console.log('getAllBusinessApi', response);
          that.business = response.data;
        }).catch(err => {
          that.assignedLoading = false;
          console.log(err);
        })
      },

      // 弹出框关闭前
      dialogClose(done) {
        this.orderEdit = {
          buyer_id: this.$route.query.id,
          paid: 1,
          pay_amount: '',
          status: 0,
          remark: '',
          business_ids: [],
        };
        done();
      },
      // 弹出框保存
      orderEditSave() {
        let that = this;
        that.orderEditSaveClick=true;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let data = Object.assign({}, that.orderEdit);
            data.business_ids = JSON.stringify(data.business_ids);
            if (that.orderId) {
              data.order_id = that.orderId;
              updateOrderApi(data).then(response => {
                console.log('updateOrderApi', response);
                that.dialogFormVisible = false;
                that.orderEditSaveClick = false;
                that.getList({buyer_id: that.$route.query.id,});
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                that.orderEditSaveClick = false;
                console.log(err);
              })
            } else {
              let data2 = Object.assign({}, that.orderEdit);
              data2.business_ids = JSON.stringify(data2.business_ids);
              delete data2.order_id;
              addOrderApi(data2).then(response => {
                console.log('addOrderApi', response);
                that.dialogFormVisible = false;
                that.orderEditSaveClick = false;
                that.getList({buyer_id: that.$route.query.id,});
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                that.orderEditSaveClick = false;
                console.log(err);
              })
            }
          }
        })
      },

      handleFilter() {
        this.listQuery.page = 1;
        this.getList(this.listQuery);
      },
      // 添加订单
      handleCreate() {
        this.dialogFormVisible = true;
        this.getAllBusiness();
        this.orderId = '';
        this.orderEdit = {
          buyer_id: this.$route.query.id,
          paid: 1,
          pay_amount: '',
          status: 0,
          remark: '',
          business_ids: [],
        };

      },
      // 修改订单
      modifyOrder(scope) {
        let that = this;
        this.getAllBusiness();
        this.dialogFormVisible = true;
        this.orderId = scope.row.id;
        that.assignedLoading = true;
        showOrderApi({id: scope.row.id}).then(response => {
          console.log('showOrderApi', response);
          that.assignedLoading = false;
          that.orderEdit.id = response.data.id;
          that.orderEdit.paid = response.data.paid;
          that.orderEdit.pay_amount = response.data.pay_amount;
          that.orderEdit.remark = response.data.remark;
          that.orderEdit.business_ids = response.data.order_detail;
        }).catch(err => {
          console.log(err);
          that.assignedLoading = false;
        })
      },
      // 审核通过后查看订单
      viewOrder(scope) {
        let that = this;
        this.dialogviewOrder = true;
        that.viewOrderLoading = true;
        viewAuditOrderApi({id: scope.row.id}).then(response => {
          console.log('viewAuditOrderApi', response);
          that.viewOrderData = response.data;
          that.viewOrderLoading = false;
        }).catch(err => {
          that.viewOrderLoading = false;
          console.log(err);
        })
      },

      // 审核
      audited(row, status) {
        let that = this;
        let data = {id: row.row.id, status: status};
        if(status == 2){
          that.$confirm( that.$t('auditedOrderMsg'), that.$t('Confirmation'), {
            distinguishCancelAndClose: true,
            confirmButtonText: that.$t('confirm'),
            cancelButtonText: that.$t('cancel')
          }).then(() => {
            that.listLoading = true;
            changeAuditApi(data).then(response => {
              console.log('changeAuditApi', response);
              that.listLoading = false;
              that.getList({buyer_id: that.$route.query.id,});
              that.$notify({
                showClose: true,
                message: that.$t('Successful'),
                type: 'success'
              });
            }).catch(err => {
              that.listLoading = false;
              console.log(err);
            })
          }).catch(action => {
          });
        }else if(status == 3){
          this.$prompt(that.$t('rejectOrderMsg'), that.$t('Confirmation'), {
            distinguishCancelAndClose: true,
            confirmButtonText: that.$t('confirm'),
            cancelButtonText: that.$t('cancel'),
          }).then(({ value }) => {
            that.listLoading = true;
            data.reason=value;
            changeAuditApi(data).then(response => {
              console.log('changeAuditApi', response);
              that.listLoading = false;
              that.getList({buyer_id: that.$route.query.id,});
              that.$notify({
                showClose: true,
                message: that.$t('Successful'),
                type: 'success'
              });
            }).catch(err => {
              that.listLoading = false;
              console.log(err);
            })
          }).catch(() => {});
        }
      },

      // 获取订单列表
      getList(data) {
        let that = this;
        this.listLoading = true;
        getOrderList(data).then(response => {
          console.log('getOrderList', response);
          that.listLoading = false;
          that.total = response.data.total;
          that.tableData = response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },

      //修改订单状态
      changeStatus(row, status) {
        let that = this;
        let data = {id: row.row.id, status: status};
        that.$confirm(status == 1 ? that.$t('submitOrderMsg') : status == 0 ? that.$t('cancelOrderMsg') : '', that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          that.listLoading = true;
          changeStatusApi(data).then(response => {
            console.log('changeStatus', response);
            that.listLoading = false;
            that.getList({buyer_id: that.$route.query.id,});
            that.$notify({
              showClose: true,
              message: that.$t('Successful'),
              type: 'success'
            });
          }).catch(err => {
            that.listLoading = false;
            console.log(err);
          })
        }).catch(action => {
        });
      },

      handleDelete(row) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          deleteOrderApi({id: row.row.id}).then(response => {
            console.log('delBuyer', response);
            that.listQuery.page = 1;
            that.getList({buyer_id: that.$route.query.id,});
            that.$notify({
              showClose: true,
              message: that.$t('deleted'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(action => {
        });
      },
    }
  }
</script>

<style scoped>
  .updateFile {
    width: 100%;
    position: relative;
    display: flex;
  }

  .fileUpinput {
    width: 100%;
    height: 36px;
    line-height: 36px;
    border: 1px solid #dfdfdf;
    padding-left: 20px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    font-size: 14px;
    border-radius: 5px;
  }

  .fileUp {
    position: absolute;
    width: 100%;
    height: 36px;
    line-height: 36px;
    opacity: 0;
    z-index: 4;
    cursor: pointer;
  }

  .demo-table-expand {
    overflow: hidden;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    display: flex;
    float: left;
  }

  .formRow {
    display: flex;
    justify-content: space-between;
    margin-right: 50px;
  }

  .formItem {
    width: 49%;
    display: flex;
    justify-content: space-between;
  }

  .formItemSpan {
    font-size: 14px;
    width: 140px;
    display: inline-block;
    text-align: right;
    margin: 10px 0;
    padding-right: 15px;
    font-weight: bold;
  }

  .itemBox {
    margin-top: 30px;
  }

  .formTitle {
    line-height: 50px;
    border: 1px solid #DCDFE6;
    border-bottom: transparent;
    padding-left: 20px;
    color: #4a4a4a;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>

