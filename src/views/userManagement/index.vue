<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.userManagement')}}</h3>
    </aside>
    <div class="filter-container">
      <el-select size="small" v-model="listQuery.role" :placeholder="$t('role')" style="width: 160px;margin-right: 15px;" class="filter-item" @change="handleFilter" clearable>
        <el-option :label="$t('table.all')" value="0" />
        <el-option :label="$t('userEdit.admin')" value="1" />
        <el-option :label="$t('userEdit.buyerBroker')" value="2" />
        <el-option :label="$t('userEdit.businessBroker')" value="3" />
      </el-select>
      <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter" clearable/>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
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
          sortable
          align="center"
          :label="$t('table.name')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          :label="$t('table.email')"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          :label="$t('table.phone')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="role"
          align="center"
          :label="$t('userEdit.UserRoles')"
          min-width="150">
          <template slot-scope="{row}">
            <el-tag style="width: 110px" v-if="row.role==1">{{ $t('userEdit.admin') }}</el-tag>
            <el-tag style="width: 110px" v-if="row.role==2">{{ $t('userEdit.buyerBroker') }}</el-tag>
            <el-tag style="width: 110px" v-if="row.role==3">{{ $t('userEdit.businessBroker') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          :label="$t('table.status')"
          min-width="100">
          <template slot-scope="{row}">
            <!--已禁用-->
            <el-tag type="danger" style="width: 80px" v-if="row.status==2">{{ $t('table.isDisabled') }}</el-tag>
            <!--已启用-->
            <el-tag type="success" style="width: 80px" v-if="row.status==1">{{ $t('table.isEnable') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="280">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope)">{{$t('table.edit')}}</el-button>
            <el-button size="mini" style="width: 80px" type="success" plain @click="handleEnable(1,scope)" v-if="scope.row.status==2">{{$t('table.Enable')}}</el-button>
            <el-button size="mini" style="width: 80px" type="danger" plain @click="handleEnable(2,scope)" v-if="scope.row.status==1">{{$t('table.disabled')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope)">{{$t('table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>

    <!--用户编辑弹窗-->
    <el-dialog :title="userEdit.id?$t('userEdit.userEdit'):$t('userEdit.addUser')" :visible.sync="dialogFormVisible" v-if='dialogFormVisible'
               width="650px" :before-close="dialogClose" :close-on-click-modal="false">

      <el-form ref="dataForm" :model="userEdit" :rules="userEditRules" label-position="left" label-width="110px" style="width: 400px; margin-left:40px;"  class="demo-ruleForm">
        <el-form-item :label="$t('table.name')" prop="name" :rules="[ { required: true, message: $t('empty')}]">
          <el-input v-model="userEdit.name" :placeholder="$t('table.name')" style="width:410px;"
                    class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('table.email')" prop="email" :rules="[{ required: true, message: $t('empty')},{ type: 'email', message: $t('userEdit.inputEmail')}]">
          <el-input v-model="userEdit.email" :placeholder="$t('table.email')" style="width:410px;"
                    class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('table.phone')" prop="phone" :rules="[{ required: true, message: $t('empty')},{ type: 'number', message: $t('userEdit.inputPhoneNumber')}]">
          <el-input v-model.number="userEdit.phone" :placeholder="$t('table.phone')" style="width:410px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('userEdit.UserRoles')" :rules="[ { required: true, message: $t('empty')}]">
          <el-select v-model="userEdit.role" prop="level" :placeholder="$t('userEdit.UserRoles')" clearable class="filter-item" style="width:410px;">
            <el-option :label="$t('userEdit.admin')" :value="1" />
            <el-option :label="$t('userEdit.buyerBroker')" :value="2" />
            <el-option :label="$t('userEdit.businessBroker')" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('login.password')">
          <el-form-item style="display: flex;justify-content: space-between;width:410px;" prop="password">
            <el-input v-model="userEdit.password" type="password" maxlength="15" v-if="userEdit.id" placeholder="******" style="width:410px;margin-right: 10px;" class="filter-item"/>
            <el-input v-model="userEdit.password" type="password" maxlength="15" v-else :placeholder="$t('login.password')" style="width:222px;margin-right: 10px;" class="filter-item"/>
            <el-tag style="height: 36px;line-height: 36px;" v-if="!userEdit.id" type="primary">{{ $t('userEdit.DefaultPassword') }}： nd6808</el-tag>
          </el-form-item>
        </el-form-item>
        <el-form-item :label="$t('userEdit.UserNotes')">
          <el-input style="width:410px;" type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('userEdit.UserNotes')" v-model="userEdit.remarks"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="userEditSave(userEdit.id)">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { getAccountsList,addAccount,editAccount,delAccount,statusAccount,setAssignList } from '@/api/account'
  export default {
    name: "index",
    components: {
      Pagination
    },
    data() {
      let passwordReg = new RegExp("^([a-zA-Z0-9]+|[~!@#$%^&*()_+\-=]+){6,15}$");
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else if(!passwordReg.test(value)){
          callback(new Error(this.$t('passwordRule')));
        }
        callback();
      };
      return {
        business: [],
        assigned: [],
        assignedLoading: false,

        dialogFormVisible: false,
        AssignVisible: false,
        AssignAccountId: '',
        userEdit: {
          email: '',
          name: '',
          phone: '',
          password: 'nd6808',
          access_level: '',
          role: 1,
          status: '1',
          remarks: '',
        },

        listQuery: {
          role: '',
          q: '',
          page: 1,
        },
        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],

        userEditRules: {
          password: [{ validator: validatePassword, trigger: 'blur' }],
        },
      }
    },
    mounted(){
      this.getList();
    },
    methods: {
      // 表格角色筛选
      filterHandler(value, row) {
        return row.role == value;
      },
      // 弹出框关闭前
      dialogClose(done) {
        this.userEdit = {};
        done();
      },
      // 弹出框保存 // 添加用户
      userEditSave(id){
        let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            that.userEdit.access_level=that.userEdit.role;
            if(id){ //修改
              if(!that.userEdit.password){
                delete that.userEdit.password;
              }
              editAccount (that.userEdit).then(response => {
                console.log('editAccount',response);
                that.dialogFormVisible=false;
                that.getList(that.listQuery);
                that.userEdit = {};
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                console.log(err);
              })
            }else{//新增
              if(!that.userEdit.password){
                that.userEdit.password= 'nd6808';
              }
              addAccount (that.userEdit).then(response => {
                console.log('addAccount',response);
                that.dialogFormVisible=false;
                that.getList(that.listQuery);
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      handleFilter() {
        this.listQuery.page=1;
        this.getList(this.listQuery);
      },
      // 新增用户打开弹窗
      handleCreate() {
        this.userEdit= {
        email: '',
          name: '',
          phone: '',
          password: 'nd6808',
          access_level: '',
          role: 1,
          status: '1',
          remarks: '',
      };
        this.dialogFormVisible=true;

      },

      // 获取用户列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getAccountsList (data).then(response => {
          console.log('getAccountsList',response);
          that.listLoading = false;
          that.total=response.data.total;
          that.tableData=response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },

      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible=true;
        let newObj = Object.assign({}, row.row);
        this.userEdit=newObj;
        this.userEdit.phone=parseInt(this.userEdit.phone);
      },
      // 修改用户状态
      handleEnable(status, row) {
        let that=this;
        console.log(status, row);
        let data={
          status:status,
          id:row.row.id
        }
        that.$confirm( status==1?that.$t('enableMsg'):that.$t('disabledMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          statusAccount (data).then(response => {
            console.log('statusAccount',response);
            that.$notify({
              showClose: true,
              message: status==1?that.$t('table.isEnable'):that.$t('table.isDisabled'),
              type: 'success'
            });
            that.getList(that.listQuery);
          }).catch(err => {
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
          delAccount ({id:row.row.id}).then(response => {
            console.log('delAccount',response);
            that.listQuery.page=1;
            that.getList(that.listQuery);
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

</style>

