<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.buyersManagement')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <!--资金已核实-->
        <span style="color: #717171;font-size: 14px;margin-left: 10px;">{{$t('fundsVerified')}}</span>
        <el-select v-model="listQuery.funds_verified" :placeholder="$t('fundsVerified')" @change="handleFilter" clearable style="width: 130px;margin-bottom: 0;" class="filter-item">
          <el-option :label="$t('table.all')" value="0" />
          <el-option :label="$t('yes')" value="1" />
          <el-option :label="$t('no')" value="2" />
        </el-select>
      </div>
      <div class="filter-item el-select--medium">
        <!--可用资金-->
        <span style="color: #717171;font-size: 14px;margin-left: 10px;">{{$t('fundsAvailable')}} ($)</span>
        <el-input v-model="listQuery.funds_available_from" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
        ~
        <el-input v-model="listQuery.funds_available_to" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      </div>
      <div class="filter-item el-select--medium">
        <el-input v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;margin-bottom: 0;" class="filter-item"
                  @keyup.enter.native="handleFilter" clearable/>
        <el-button class="filter-item" type="primary" style="margin-bottom: 0;" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
      </div>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
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
            <span>{{toThousands(row.funds_available)}}</span>
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
            <span>{{toThousands(row.desired_transaction_amount)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="230">
          <template slot-scope="scope">
            <!--<el-button size="mini" type="primary" @click="handleView(scope.$index,scope)">{{$t('view')}}</el-button>-->
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope)">{{$t('table.edit')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope)">{{$t('table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>

    <!--买家编辑弹窗-->
    <el-dialog :title="userEdit.id?$t('buyers.buyersEdit'):$t('buyers.addBuyers')" :visible.sync="dialogFormVisible" v-if='dialogFormVisible'
               width="920px" :before-close="dialogClose" style="padding-bottom: 50px" center>

      <el-form ref="dataForm" :model="userEdit" :rules="rules" label-position="right" label-width="120px" label-lineHight="30px">
        <div class="formRow">
          <!--买家姓名-->
          <el-form-item :label="$t('buyers.Name')" prop="buyer">
            <el-input v-model="userEdit.buyer" :placeholder="$t('buyers.Name')" style="width:300px;"
                      class="filter-item"/>
          </el-form-item>
          <!--邮箱-->
          <el-form-item :label="$t('buyers.email')" prop="email" >
            <el-input v-model="userEdit.email" :placeholder="$t('buyers.email')" style="width:300px;"
                      class="filter-item"/>
          </el-form-item>
        </div>
        <div class="formRow">
          <!--手机-->
          <el-form-item :label="$t('buyers.phone')" prop="phone">
            <el-input v-model.number="userEdit.phone" :placeholder="$t('buyers.phone')" style="width:300px;"
                      class="filter-item"/>
          </el-form-item>
          <!--可用资金-->
          <el-form-item :label="$t('buyers.fundsAvailable')" prop="funds_available">
            <el-input v-model.number="userEdit.funds_available" :placeholder="$t('buyers.fundsAvailable')" style="width:300px;" class="filter-item"><template slot="prepend">$</template></el-input>
          </el-form-item>
        </div>
        <div class="formRow">
          <!--期望的交易金额-->
          <el-form-item :label="$t('buyers.DesiredTransactionAmount')" prop="desired_transaction_amount">
            <el-input v-model.number="userEdit.desired_transaction_amount" :placeholder="$t('buyers.DesiredTransactionAmount')" style="width:300px;" class="filter-item"><template slot="prepend">$</template></el-input>
          </el-form-item>
          <!--资金验证-->
          <div class="formItem filter-item el-select--medium">
            <!--资金验证-->
            <span class="formItemSpan">{{$t('buyers.FundsVerified')}}</span>
            <div style="width: 80%;margin-bottom: 20px;">
              <el-radio size="small" v-model="userEdit.funds_verified" :label="1" border>{{$t('yes')}}</el-radio>
              <el-radio size="small" v-model="userEdit.funds_verified" :label="2" border>{{$t('no')}}</el-radio>
            </div>
          </div>
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

    <!--查看买家信息弹窗-->
    <!--<el-dialog :title="$t('buyers.BuyerInformation')" :visible.sync="dialogView"></el-dialog>-->

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { getBuyerList,addBuyer,editBuyer,delBuyer,showBuyer } from '@/api/buyers'
  export default {
    name: "buyers",
    components: {
      Pagination
    },
    data() {
      return {
        business: [],
        assigned: [],

        dialogFormVisible: false,
        AssignVisible: false,
        // dialogView: false,
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
          time_line_to_purchase: ''
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
          buyer: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          email: [{ required: true, message: this.$t('empty')},{ type: 'email', message: this.$t('userEdit.inputEmail')}],
          phone: [{ required: true, message: this.$t('empty')},{ type: 'number', message: this.$t('userEdit.inputPhoneNumber')}],
          funds_available: [{ required: true, message: this.$t('empty')},{ type: 'number', message: this.$t('userEdit.inputNumber')}],
          desired_transaction_amount: [{ required: true, message: this.$t('empty')},{ type: 'number', message: this.$t('userEdit.inputNumber')}],
          specific_skills_of_buyer: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          business_management_needs: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
          time_line_to_purchase: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
        }
      }
    },
    mounted(){
      this.getList();
    },
    methods: {

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
          time_line_to_purchase: ''
        };
      },

      // 获取买家列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getBuyerList (data).then(response => {
          console.log('getBuyerList',response);
          that.listLoading = false;
          that.total=response.data.total;
          that.tableData=response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },
      // handleView(index, row){
      //   console.log(index, row);
      //   this.dialogView=true;
      // },

      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible=true;
        let newObj = Object.assign({}, row.row);
        this.userEdit=newObj;
        this.userEdit.phone=parseInt(this.userEdit.phone);
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
          delBuyer (row.row.id).then(response => {
            console.log('delBuyer',response);
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

