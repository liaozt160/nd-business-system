
<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.orderManagement')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <el-input v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;margin-bottom: 0;" class="filter-item"
                  @keyup.enter.native="handleFilter" clearable/>
        <el-button class="filter-item" type="primary" style="margin-bottom: 0;" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
      </div>
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
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          align="center"
          :label="$t('order.creationTime')"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="paid"
          align="center"
          :label="$t('table.PaymentStatus')"
          min-width="160">
          <!--支付状态-->
          <template slot-scope="scope">
            <el-tag type="success" style="width: 60px" v-if="scope.row.paid==1">{{ $t('table.Paymented') }}</el-tag>
            <el-tag type="info"    style="width: 60px" v-if="scope.row.paid==0">{{ $t('table.Unpaid') }}</el-tag>
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
            <el-tag type="danger" v-if="scope.row.status==3">{{ $t('order.reject') }}</el-tag>
            <el-tag type="success" v-if="scope.row.status==2">{{ $t('order.audited') }}</el-tag>
            <el-tag type="primary" v-if="scope.row.status==1">{{ $t('order.AuditInProgress') }}</el-tag>
            <el-tag type="info" v-if="scope.row.status==0">{{ $t('order.notSubmitted') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          :label="$t('order.remarks')"
          min-width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top">
              <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 120px;">{{scope.row.remark}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          :min-width="role==1&&$route.query.role==1?550:380">
          <template slot-scope="scope">
            <!--管理员-->
            <div v-if="role==1">
              <!--待提交-->
              <div v-if="scope.row.status==0">
                <el-button size="mini" @click="viewOrder(scope)">{{$t('order.viewOrder')}}</el-button>
              </div>
              <!--审核中-->
              <div v-if="scope.row.status==1">
                <el-button size="mini" @click="viewOrder(scope)">{{$t('order.viewOrder')}}</el-button>
                <el-button size="mini" type="primary" plain v-if="$route.query.role==role" @click="modifyOrder(scope)">{{$t('order.modifyOrder')}}</el-button>
                <el-button size="mini" type="primary" @click="audited(scope,2)">{{$t('order.Audit')}}</el-button>
                <el-button size="mini" type="danger"  @click="audited(scope,3)">{{$t('order.reject')}}</el-button>
                <el-button size="mini" type="danger" plain  @click="handleDelete(scope)">{{$t('table.delete')}}</el-button>
              </div>
              <!--已审核状态-->
              <div v-if="scope.row.status==2">
                <el-button size="mini" @click="viewOrder(scope)">{{$t('order.viewOrder')}}</el-button>
              </div>
              <!--拒绝状态-->
              <div v-if="scope.row.status==3">
                <el-button size="mini" @click="viewOrder(scope)">{{$t('order.viewOrder')}}</el-button>
                <el-button size="mini" type="danger" plain  @click="handleDelete(scope)">{{$t('table.delete')}}</el-button>
              </div>
            </div>

            <!--买家中介-->
            <div v-if="role!=1">
              <!--待提交-->
              <div v-if="scope.row.status==0">
                <el-button size="mini" type="success" @click="changeStatus(scope,1)">{{$t('order.submitOrder')}}</el-button>
                <el-button size="mini" type="primary" :disabled="scope.row.status!=0" @click="modifyOrder(scope)">{{$t('order.modifyOrder')}}</el-button>
                <el-button size="mini" type="danger" plain v-if="$route.query.role==role" @click="handleDelete(scope)">{{$t('table.delete')}}</el-button>
              </div>
              <!--审核中-->
              <div v-if="scope.row.status==1">
                <el-button size="mini" type="warning" @click="changeStatus(scope,0)">{{$t('order.cancelOrder')}}</el-button>
                <el-button size="mini" type="primary" :disabled="scope.row.status!=0" @click="modifyOrder(scope)">{{$t('order.modifyOrder')}}</el-button>
                <el-button size="mini" type="danger" plain v-if="$route.query.role==role" @click="handleDelete(scope)">{{$t('table.delete')}}</el-button>
              </div>
              <!--已审核状态-->
              <div v-if="scope.row.status==2">
                <el-button size="mini" v-if="$route.query.role==role" @click="viewOrder(scope)">{{$t('order.viewOrder')}}</el-button>
              </div>
              <!--拒绝状态-->
              <div v-if="scope.row.status==3">
                <el-button size="mini" type="danger" plain v-if="$route.query.role==role" @click="handleDelete(scope)">{{$t('table.delete')}}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>

    <!--订单编辑弹窗-->
    <el-dialog :title="orderId? $t('order.modifyOrder'):$t('order.addOrder')" :visible.sync="dialogFormVisible"  width="800px" :before-close="dialogClose" style="padding-bottom: 50px" center>
      <el-form ref="dataForm" :model="orderEdit" :rules="rules" label-position="right" label-width="120px" label-lineHight="30px"  v-loading="assignedLoading">
        <div>
          <!--请选择买家想要购买的企业信息-->
          <p style="text-align: center;">{{$t('order.selectBusinessList')}}</p>
          <div style="text-align: center;">
            <el-transfer
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
            <el-input v-model="orderEdit.pay_amount" :placeholder="$t('order.orderAmount')" style="width:210px;"
                      class="filter-item"/>
          </el-form-item>
          <!--是否已支付-->
          <el-form-item :label="$t('table.PaymentStatus')" prop="paid">
            <el-select v-model="orderEdit.paid" style="width:210px;" class="filter-item">
              <el-option :label="$t('table.Paymented')" :value="1"/>
              <el-option :label="$t('table.Unpaid')" :value="0"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="formRow">
          <!--订单金额-->
          <el-form-item :label="$t('order.remarks')" style="width: 100%;">
            <el-input type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('order.remarks')" v-model="orderEdit.remark"></el-input>
          </el-form-item>
        </div>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click.native.prevent="orderEditSave()">{{ $t('table.confirm') }}</el-button>
      </div>

    </el-dialog>
    <!--查看订单弹窗-->
    <el-dialog :title="$t('order.viewOrder')" :visible.sync="dialogviewOrder" width="1000px" style="padding-bottom: 50px" center>
      <div style="padding-bottom: 100px" v-loading="viewOrderLoading">
        <el-form label-position="left" inline  class="demo-table-expand">
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
              <el-tag type="danger" v-if="viewOrderData.status==3">{{ $t('order.reject') }}</el-tag>
              <el-tag type="success" v-if="viewOrderData.status==2">{{ $t('order.audited') }}</el-tag>
              <el-tag type="primary" v-if="viewOrderData.status==1">{{ $t('order.AuditInProgress') }}</el-tag>
              <el-tag type="info" v-if="viewOrderData.status==0">{{ $t('order.notSubmitted') }}</el-tag>
            </template>
          </el-form-item>
          <el-form-item :label="$t('table.PaymentStatus')+'：'">
            <!--支付状态-->
            <template>
              <el-tag type="success" v-if="viewOrderData.paid==1">{{ $t('table.Paymented') }}</el-tag>
              <el-tag type="info" v-if="viewOrderData.paid==0">{{ $t('table.Unpaid') }}</el-tag>
            </template>
          </el-form-item>
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
              <el-form label-position="left" inline class="demo-table-expand">
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
                  <span>{{ toThousands(props.row.price) }}</span>
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
                <!--<span>{{ props.row.real_estate==1?$t('yes'):$t('no') }}</span>-->
                <!--</el-form-item>-->
                <el-form-item :label="$t('employeeEdit.BuildingSF')">
                  <!--营业面积-->
                  <span>{{ props.row.building_sf }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.EmployeeCount')">
                  <!--员工人数-->
                  <span>{{ props.row.employee_count }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.GrossIncome')">
                  <!--毛利润-->
                  <span>{{ toThousands(props.row.gross_income) }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.EBITDA')">
                  <!--税息折扣及摊销前利润-->
                  <span>{{ toThousands(props.row.ebitda) }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.FFandE')">
                  <!--硬件资产价值-->
                  <span>{{ toThousands(props.row.ff_e) }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Inventory')">
                  <!--库存-->
                  <span>{{ props.row.inventory }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.NetIncome')">
                  <!--净利润-->
                  <span>{{ toThousands(props.row.net_income) }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Lease')">
                  <!--租金-->
                  <span>{{ toThousands(props.row.lease) }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.LeaseTerm')">
                  <!--租约有效期-->
                  <span>{{ props.row.lease_term }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Est')">
                  <!--房地产估价-->
                  <span>{{ toThousands(props.row.value_of_real_estate) }}</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.Commission')">
                  <!--佣金-->
                  <span>{{ props.row.commission }} %</span>
                </el-form-item>
                <el-form-item :label="$t('employeeEdit.BuyerFinancing')">
                  <!--卖家融资-->
                  <span>{{ toThousands(props.row.buyer_financing) }}</span>
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
                <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 200px;">{{scope.row.company}}</span>
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
                <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 200px;">{{scope.row.title}}</span>
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
              <el-tag type="info" v-else>{{ $t('table.soldOut') }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import { getOrderList,addOrderApi,updateOrderApi,deleteOrderApi,showOrderApi,getAllBusinessApi,changeStatusApi,changeAuditApi,viewAuditOrderApi } from '@/api/order'
  export default {
    name: "orderManagement",
    components: {
      Pagination
    },
    data() {
      return {
        role: '',
        business: [],
        business_ids: [],
        assignedLoading: false,

        dialogviewOrder: false,
        viewOrderLoading: false,
        viewOrderData:'',

        dialogFormVisible: false,
        AssignVisible: false,
        orderId: '',
        orderEdit: {
          buyer_id:'',
          paid:1,
          pay_amount:'',
          status:1,
          remark:'',
          business_ids:[],
        },

        listQuery: {
          page: 1,
          buyer_id:'',
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
          pay_amount: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          paid: [{ required: true, message: this.$t('empty'), trigger: 'change'}],
        }
      }
    },
    mounted(){
      this.orderEdit.buyer_id=this.$route.query.id;
      this.listQuery.buyer_id=this.$route.query.id;
      this.getList();
      this.getAllBusiness();

      this.role = store.getters && store.getters.role
    },
    methods: {
      // 穿梭框
      leftChoose(e) {
        let canlength=10-this.business_ids.length;
        if(e.length>canlength){
          if(e.length>=1){
            this.$notify({
              showClose: true,
              message: this.$t('onlyChoose10'),
              type: 'warning'
            });
            e.pop();
          }
          return false;
        }
      },
      // 穿梭框获取所有企业列表
      getAllBusiness(){
        let that=this;
        getAllBusinessApi ().then(response => {
          console.log('getAllBusinessApi',response);
          that.business=response.data;
        }).catch(err => {
          console.log(err);
        })
      },

      // 弹出框关闭前
      dialogClose(done) {
        this.orderEdit =  {
          buyer_id:this.$route.query.id,
          paid:1,
          pay_amount:'',
          status:1,
          remark:'',
          business_ids:[],
        };
        done();
      },
      // 弹出框保存
      orderEditSave(){
        let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let data = Object.assign({}, that.orderEdit);
            data.business_ids=JSON.stringify( data.business_ids);
            if (that.orderId) {
              data.order_id=that.orderId;
              updateOrderApi(data).then(response => {
                console.log('updateOrderApi', response);
                that.dialogFormVisible = false;
                that.getList({buyer_id:that.$route.query.id,});
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                console.log(err);
              })
            } else {
              let data2 = Object.assign({}, that.orderEdit);
              data2.business_ids=JSON.stringify( data2.business_ids);
              delete data2.order_id;
              addOrderApi(data2).then(response => {
                console.log('addOrderApi', response);
                that.dialogFormVisible = false;
                that.getList({buyer_id:that.$route.query.id,});
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                console.log(err);
              })
            }
          }
        })
      },

      handleFilter() {
        this.listQuery.page=1;
        this.getList(this.listQuery);
      },
      // 添加订单
      handleCreate() {
        this.dialogFormVisible=true;
        this.orderId='';
        this.orderEdit =  {
          buyer_id:this.$route.query.id,
          paid:1,
          pay_amount:'',
          status:1,
          remark:'',
          business_ids:[],
        };

      },
      // 修改订单
      modifyOrder(scope) {
        let that=this;
        this.dialogFormVisible=true;
        this.orderId=scope.row.id;
        that.assignedLoading = true;
        showOrderApi (scope.row.id).then(response => {
          console.log('showOrderApi',response);
          that.assignedLoading = false;
          that.orderEdit.id=response.data.id;
          that.orderEdit.paid=response.data.paid;
          that.orderEdit.pay_amount=response.data.pay_amount;
          that.orderEdit.remark=response.data.remark;
          that.orderEdit.business_ids=response.data.order_detail;
        }).catch(err => {
          console.log(err);
          that.assignedLoading = false;
        })
      },
      // 审核通过后查看订单
      viewOrder(scope) {
        let that=this;
        this.dialogviewOrder=true;
        that.viewOrderLoading = true;
        viewAuditOrderApi (scope.row.id).then(response => {
          console.log('viewAuditOrderApi',response);
          that.viewOrderData=response.data;
          that.viewOrderLoading = false;
        }).catch(err => {
          that.viewOrderLoading = false;
          console.log(err);
        })
      },

      // 审核通过
      audited(row,status){
        let that = this;
        let data={id:row.row.id,status:status};
        that.$confirm(status==2?that.$t('auditedOrderMsg'):status==3?that.$t('rejectOrderMsg'):'', that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          that.listLoading = true;
          changeAuditApi (data).then(response => {
            console.log('changeAuditApi',response);
            that.listLoading = false;
            that.getList({buyer_id:that.$route.query.id,});
            that.$notify({
              showClose: true,
              message: that.$t('Successful'),
              type: 'success'
            });
          }).catch(err => {
            that.listLoading = false;
            console.log(err);
          })
        }).catch(action => {});
      },

      // 获取订单列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getOrderList (data).then(response => {
          console.log('getOrderList',response);
          that.listLoading = false;
          that.total=response.data.total;
          that.tableData=response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },

      //修改订单状态
      changeStatus(row,status){
        let that = this;
        let data={id:row.row.id,status:status};
        that.$confirm(status==1?that.$t('submitOrderMsg'):status==0?that.$t('cancelOrderMsg'):'', that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          that.listLoading = true;
          changeStatusApi (data).then(response => {
            console.log('changeStatus',response);
            that.listLoading = false;
            that.getList({buyer_id:that.$route.query.id,});
            that.$notify({
              showClose: true,
              message: that.$t('Successful'),
              type: 'success'
            });
          }).catch(err => {
            that.listLoading = false;
            console.log(err);
          })
        }).catch(action => {});
      },

      handleDelete(row) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          deleteOrderApi (row.row.id).then(response => {
            console.log('delBuyer',response);
            that.listQuery.page=1;
            that.getList({buyer_id:that.$route.query.id,});
            that.$notify({
              showClose: true,
              message: that.$t('deleted'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(action => {});
      },
    }
  }
</script>

<style>
  .el-form-item__label{
    line-height: 20px!important;
    margin: 8px 0;
  }
  .el-form-item__content{
    line-height: 20px!important;
    margin: 8px 0!important;
  }
</style>
<style scoped>
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

  .formRow{
    display: flex;justify-content: space-between;margin-right: 50px;
  }
  .formItem{
    width: 49%;display: flex;justify-content: space-between;
  }
  .formItemSpan{
    font-size: 14px;width: 140px;display: inline-block;text-align: right; margin: 10px 0;padding-right: 15px;font-weight: bold;
  }

  .itemBox{
    margin-top: 30px;
  }
  .formTitle{
    line-height: 50px;
    border: 1px solid #DCDFE6;
    border-bottom: transparent;
    padding-left: 20px;
    color: #4a4a4a;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>

