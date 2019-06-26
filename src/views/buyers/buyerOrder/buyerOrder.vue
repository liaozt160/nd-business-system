
<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.buyerOrder')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <el-input v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;margin-bottom: 0;" class="filter-item"
                  @keyup.enter.native="handleFilter" clearable/>
        <el-button class="filter-item" type="primary" style="margin-bottom: 0;" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
      </div>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        {{ $t('order.addOrder') }}
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
          prop="name"
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
          prop="pay_amount"
          align="center"
          :label="$t('order.orderAmount')+'($)'"
          min-width="150">
          <template slot-scope="{row}">
            <span>{{toThousands(row.desired_transaction_amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="funds_verified"
          align="center"
          :label="$t('order.auditStatus')"
          min-width="150">
          <template slot-scope="scope">
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
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="350">
          <template slot-scope="scope">

            <el-button size="mini" type="success" v-if="scope.row.status==0" @click="">{{$t('order.submitOrder')}}</el-button>
            <el-button size="mini" type="primary" v-if="scope.row.status==2" @click="">{{$t('order.viewOrder')}}</el-button>
            <el-button size="mini" type="warning" v-if="scope.row.status==1" @click="">{{$t('order.cancelOrder')}}</el-button>

            <el-button size="mini" type="primary" :disabled="scope.row.status==2" @click="modifyOrder">{{$t('order.modifyOrder')}}</el-button>

            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope)">{{$t('table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>

    <!--买家编辑弹窗-->
    <el-dialog :title="orderEdit.buyer_id? $t('order.modifyOrder'):$t('order.addOrder')" :visible.sync="dialogFormVisible" v-if='dialogFormVisible' width="800px" :before-close="dialogClose" style="padding-bottom: 50px" center>
      <el-form ref="dataForm" :model="orderEdit" :rules="rules" label-position="right" label-width="120px" label-lineHight="30px">
        <div>
          <!--请选择买家想要购买的企业信息-->
          <p style="text-align: center;">{{$t('order.selectBusinessList')}}</p>
          <div style="text-align: center;" v-loading="assignedLoading">
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
        <el-button type="primary" @click="orderEditSave(orderEdit.id)">{{ $t('table.confirm') }}</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { getOrderList,addOrderApi,updateOrderApi,deleteOrderApi } from '@/api/order'
  export default {
    name: "buyerOrder",
    components: {
      Pagination
    },
    data() {
      return {
        business: [],
        business_ids: [],
        assignedLoading: false,

        dialogFormVisible: false,
        AssignVisible: false,
        // dialogView: false,
        orderEdit: {
          buyer_id:'',
          paid:'',
          pay_amount:'',
          status:1,
          remark:'',
          business_ids:'',
        },

        listQuery: {
          page: 1,
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
      let data={
        account_id:this.$route.query.id,
      }
      this.getList(data);
    },
    methods: {
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

      // 弹出框关闭前
      dialogClose(done) {
        this.orderEdit =  {};
        done();
      },
      // 弹出框保存
      orderEditSave(id){
        let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // if (id) {
            //   editBuyer(that.orderEdit).then(response => {
            //     console.log('editBuyer', response);
            //     that.dialogFormVisible = false;
            //     that.getList();
            //     that.orderEdit = {};
            //     that.$notify({
            //       showClose: true,
            //       message: that.$t('Successful'),
            //       type: 'success'
            //     });
            //   }).catch(err => {
            //     console.log(err);
            //   })
            // } else {
            //   addBuyer(that.orderEdit).then(response => {
            //     console.log('addBuyer', response);
            //     that.dialogFormVisible = false;
            //     that.getList();
            //     that.orderEdit = {};
            //     that.$notify({
            //       showClose: true,
            //       message: that.$t('Successful'),
            //       type: 'success'
            //     });
            //   }).catch(err => {
            //     console.log(err);
            //   })
            // }
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
        this.orderEdit =  {};
      },
      // 修改订单
      modifyOrder() {
        this.dialogFormVisible=true;

        this.orderEdit =  {};
      },

      // 获取买家列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getOrderList (data).then(response => {
          that.listLoading = false;
          that.total=response.data.total;
          that.tableData=response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },

      //修改是否支付服务费
      ServiceCharge(index, row){
        let that = this;
        let data={id:row.row.id,services_pay:row.row.services_pay==1?2:1};
        that.$confirm(that.$t('changeMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          that.listLoading = true;
          changeServiceCharge (data).then(response => {
            console.log('changeStatus',response);
            that.listLoading = false;
            that.getList();
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

      handleDelete(index, row) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          deleteOrderApi (row.row.id).then(response => {
            console.log('delBuyer',response);
            that.listQuery.page=1;
            that.getList();
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
</style>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
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

