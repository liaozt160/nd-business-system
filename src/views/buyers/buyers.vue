<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.buyersManagement')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium" v-if="role==1">
        <el-select size="small" v-model="listQuery.broker_id" :placeholder="$t('userEdit.buyerBroker')" style="width: 180px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter" clearable>
          <el-option :label="$t('table.all')" value="0" />
          <el-option v-for="item in buyer_brokerListData" :label="item.label" :value="item.key" />
        </el-select>
      </div>
      <div class="filter-item el-select--medium">
        <!--资金已核实-->
        <span style="color: #717171;font-size: 14px;margin-left: 10px;">{{$t('fundsVerified')}}</span>
        <el-select size="small" v-model="listQuery.funds_verified" :placeholder="$t('fundsVerified')" @change="handleFilter" clearable style="width: 130px;margin-bottom: 0;" class="filter-item">
          <el-option :label="$t('table.all')" value="0" />
          <el-option :label="$t('yes')" value="1" />
          <el-option :label="$t('no')" value="2" />
        </el-select>
      </div>
      <div class="filter-item el-select--medium">
        <!--可用资金-->
        <span style="color: #717171;font-size: 14px;margin-left: 10px;">{{$t('fundsAvailable')}} ($)</span>
        <el-input size="small" v-model="listQuery.funds_available_from" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
        ~
        <el-input size="small" v-model="listQuery.funds_available_to" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      </div>
      <div class="filter-item el-select--medium">
        <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;margin-bottom: 0;" class="filter-item"
                  @keyup.enter.native="handleFilter" clearable/>
        <el-button size="small" class="filter-item" type="primary" style="margin-bottom: 0;" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
      </div>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus"
                 @click="handleCreate">
        {{ $t('table.add') }}
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
          :label="$t('userEdit.buyerBroker')"
          min-width="150">
          <template slot-scope="{row}">
            <span>{{row.account.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyer"
          align="center"
          :label="$t('buyers.Name')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          :label="$t('table.phone')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          :label="$t('table.email')"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="funds_available"
          align="center"
          :label="$t('fundsAvailable')+'($)'"
          min-width="150">
          <template slot-scope="{row}">
            <span>{{row.funds_available}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="funds_verified"
          align="center"
          :label="$t('fundsVerified')"
          min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.funds_verified==1?$t('yes'):$t('no')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desired_transaction_amount"
          align="center"
          :label="$t('desiredTransactionAmount')+'($)'"
          min-width="230">
          <template slot-scope="{row}">
            <span>{{row.desired_transaction_amount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="$router.push({path:'/buyerOrder/index',query:{id:scope.row.id,role:scope.row.account.role}})">{{$t('order.order')}}</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope)">{{$t('table.edit')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope)">{{$t('table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>

    <!--买家编辑弹窗-->
    <el-dialog :title="userEdit.id?$t('buyers.buyersEdit'):$t('buyers.addBuyers')" :visible.sync="dialogFormVisible" v-if='dialogFormVisible'
               width="750px" :before-close="dialogClose" style="padding-bottom: 50px" center :close-on-click-modal="false">

      <el-form ref="dataForm" :model="userEdit" :rules="rules" label-position="right" label-width="100px" label-lineHight="30px" v-loading="userEditLoading">
        <div class="formRow">
          <!--买家姓名-->
          <el-form-item :label="$t('buyers.Name')" prop="buyer">
            <el-input v-model="userEdit.buyer" :placeholder="$t('buyers.Name')" style="width:200px;"
                      class="filter-item"/>
          </el-form-item>
          <!--邮箱-->
          <el-form-item :label="$t('buyers.email')" prop="email" >
            <el-input v-model="userEdit.email" :placeholder="$t('buyers.email')" style="width:200px;"
                      class="filter-item"/>
          </el-form-item>
        </div>
        <div class="formRow">
          <!--手机-->
          <el-form-item :label="$t('buyers.phone')" prop="phone">
            <el-input v-model.number="userEdit.phone" :placeholder="$t('buyers.phone')" style="width:200px;"
                      class="filter-item"/>
          </el-form-item>
          <!--可用资金-->
          <el-form-item :label="$t('buyers.fundsAvailable')" prop="funds_available">
            <el-input v-model="userEdit.funds_available" :placeholder="$t('buyers.fundsAvailable')" style="width:200px;" class="filter-item"></el-input>
          </el-form-item>
        </div>
        <div class="formRow">
          <!--期望的交易金额-->
          <el-form-item :label="$t('buyers.DesiredTransactionAmount')" prop="desired_transaction_amount">
            <el-input v-model="userEdit.desired_transaction_amount" :placeholder="$t('buyers.DesiredTransactionAmount')" style="width:200px;" class="filter-item"></el-input>
          </el-form-item>
          <!--资金验证-->
          <div class="formItem filter-item el-select--medium">
            <!--资金验证-->
            <span class="formItemSpan">{{$t('buyers.FundsVerified')}}</span>
            <div style="width:200px;margin-bottom: 20px;">
              <el-radio style="display: inline-block;margin:10px 0;margin-right: 30px" size="small" v-model="userEdit.funds_verified" :label="1" >{{$t('yes')}}</el-radio>
              <el-radio style="display: inline-block;margin:10px 0;" size="small" v-model="userEdit.funds_verified" :label="2" >{{$t('no')}}</el-radio>
            </div>
          </div>
        </div>

        <div class="formRow">
          <!--买家地址-->
          <el-form-item :label="$t('employeeEdit.Location')" prop="country">
            <el-select v-model="userEdit.country" id="country"
                       @change="getlocation('country',userEdit.country)"
                       style="" class="filter-item">
              <el-option :label="$t('China')" value="1000"/>
              <el-option :label="$t('UnitedStates')" value="USA"/>
            </el-select>
            <el-select v-model="userEdit.states" style="width: 215px;margin: 0 5px;"
                       :disabled="locationLoading"
                       class="filter-item">
              <el-option v-for="item in provinces" :label="item.name" :value="item.code"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="formRow" style="margin-top: -10px">
          <el-form-item >
          <el-input v-model="userEdit.address" :placeholder="$t('address')" style="width: 424px;" class="filter-item"/>
          </el-form-item>
        </div>



      <!--买方的具体技能-->
      <div class="itemBox">
        <div class="formTitle">{{$t('buyers.BuyerSkills')}}</div>
        <el-form-item label-width="0px" prop="specific_skills_of_buyer">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            :placeholder="$t('buyers.BuyerSkillsPlaceholder')"
            v-model="userEdit.specific_skills_of_buyer">
          </el-input>
        </el-form-item>
      </div>
      <!--企业管理需求-->
      <div class="itemBox">
        <div class="formTitle">{{$t('buyers.businessManagementNeeds')}}</div>
        <el-form-item label-width="0px" prop="business_management_needs">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            :placeholder="$t('buyers.businessManagementNeeds')"
            v-model="userEdit.business_management_needs">
          </el-input>
        </el-form-item>
      </div>
      <!--购买时间表-->
      <div class="itemBox">
        <div class="formTitle">{{$t('buyers.timelineToPurchase')}}</div>
        <el-form-item label-width="0px" prop="time_line_to_purchase">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            :placeholder="$t('buyers.timelineToPurchase')"
            v-model="userEdit.time_line_to_purchase">
          </el-input>
        </el-form-item>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="userEditSave(userEdit.id)">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import { getBuyerList,addBuyer,editBuyer,delBuyer,showBuyer,changeServiceCharge } from '@/api/buyers'
  import { getBuyerBrokerList } from '@/api/buyerBrokerNet'
  import {getLocation} from '@/api/business'
  export default {
    name: "buyers",
    components: {
      Pagination
    },
    data() {
      return {
        role: '',
        business: [],
        assigned: [],

        dialogFormVisible: false,
        AssignVisible: false,
        // dialogView: false,
        userEditLoading:false,

        provinces: [],//省份
        cities: [],//城市
        locationLoading: false,

        userEdit: {
          id: '',
          buyer: '',
          email: '',
          phone: '',
          funds_available: '',
          desired_transaction_amount: '',
          funds_verified: '1',
          specific_skills_of_buyer: '',
          business_management_needs: '',
          time_line_to_purchase: '',

          country: '',
          states: '',
          address: '',
        },

        buyer_brokerListData: [],
        listQuery: {
          page: 1,
          broker_id: '',
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
          buyer: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          email: [{ required: true, message: this.$t('empty')},{ type: 'email', message: this.$t('userEdit.inputEmail')}],
          phone: [{ required: true, message: this.$t('empty')},{ type: 'number', message: this.$t('userEdit.inputPhoneNumber')}],
          funds_available: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          desired_transaction_amount: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          specific_skills_of_buyer: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          business_management_needs: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          time_line_to_purchase: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
        }
      }
    },
    mounted(){
      this.role = store.getters && store.getters.role;
      this.getList();
      if(this.role==1){
        this.getBuyerBorkerListFun();
      }
    },
    methods: {
      // 获取买家经纪人列表
      getBuyerBorkerListFun() {
        let that=this;
        getBuyerBrokerList ().then(response => {
          console.log('getBuyerBrokerList',response);
          that.buyer_brokerListData=response.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取地址三级联动数据
      getlocation(type, value) {
        let that = this;
        that.userEdit.states = '';
        return new Promise(function (resolve, reject) {
          if (type && value) {
            let paramsData = {code: value, lang: that.$store.getters.language};
            that.locationLoading = true;
            that.provinces = [];
            getLocation(paramsData).then(response => {
              if (type == 'country') {
                that.provinces = response.data;
                // that.cities = [];
                // that.userEdit.city = '';
                resolve();
              } else if (type == 'provinces') {
                that.cities = response.data;
                // that.userEdit.city = '';
                // that.userEdit.states = value;
                resolve();
              }
              that.locationLoading = false;
            }).catch(err => {
              console.log(err);
            })
          }
        })
      },
      // 弹出框关闭前
      dialogClose(done) {
        this.userEdit =  {};
        done();
      },
      // 弹出框保存
      userEditSave(id){
        let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (id) {
              editBuyer(that.userEdit).then(response => {
                console.log('editBuyer', response);
                that.dialogFormVisible = false;
                that.getList();
                that.userEdit = {};
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                console.log(err);
              })
            } else {
              addBuyer(that.userEdit).then(response => {
                console.log('addBuyer', response);
                that.dialogFormVisible = false;
                that.getList();
                that.userEdit = {};
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
      handleCreate() {
        this.dialogFormVisible=true;
        this.userEdit =  {
          id: '',
          buyer: '',
          email: '',
          phone: '',
          funds_available: '',
          desired_transaction_amount: '',
          funds_verified: 2,
          specific_skills_of_buyer: '',
          business_management_needs: '',
          time_line_to_purchase: '',
          country: '',
          states: '',
          address: '',
        };
      },

      // 获取买家列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getBuyerList (data).then(response => {
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

      handleEdit(index, row) {
        let that=this;
        console.log(index, row);
        this.dialogFormVisible=true;
        this.userEditLoading=true;
        showBuyer ({id:row.row.id}).then(response => {
          that.userEditLoading=false;
          console.log('showBuyer',response);
          that.userEdit=response.data;
          that.userEdit.phone=parseInt(this.userEdit.phone);
        }).catch(err => {
          that.userEditLoading=false;
          console.log(err);
        })
      },
      handleEnable(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delBuyer ({id:row.row.id}).then(response => {
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

