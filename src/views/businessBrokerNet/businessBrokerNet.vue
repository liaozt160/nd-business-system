
<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.businessBrokerNet')}}</h3>
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
          v-if="role==1"
          prop="name"
          align="center"
          :label="$t('netName')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          :label="$t('order.remarks')"
          min-width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top">
              <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.remark}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">{{$t('table.edit')}}</el-button>
            <el-button size="mini" type="primary" @click="handleManager(scope)">{{$t('member')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope)">{{$t('table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>

    <!--添加网络弹窗-->
    <el-dialog :title="netData.id?$t('editNet'):$t('addNet')" :visible.sync="netVisible"  width="800px" :before-close="dialogClose" style="padding-bottom: 50px" center>
      <el-form ref="dataForm" :model="netData" :rules="rules" label-position="right" label-width="120px" label-lineHight="20px"  v-loading="netLoading">
        <div>
          <!--请选择要添加到该网络的卖家经纪人-->
          <p style="text-align: center;">{{$t('selectBuyerBroker')}}</p>
          <div style="text-align: center;" v-loading="editBrokerNetLoading">
            <el-transfer
              class="netTransfer"
              style="text-align: left; display: inline-block;margin-bottom: 30px;"
              v-model="netData.broker_id"
              filterable
              :titles="[ $t('all_Business_brokers'), $t('selected_Business_brokers')]"
              :data="business_brokers">
            </el-transfer>
          </div>
        </div>
        <div class="formRow">
          <!--网络名称-->
          <el-form-item :label="$t('netName')" prop="name">
            <el-input v-model="netData.name" :placeholder="$t('netName')" style="width:210px;"
                      class="filter-item"/>
          </el-form-item>
        </div>
        <div class="formRow">
          <!--备注-->
          <el-form-item :label="$t('order.remarks')" style="width: 100%;">
            <el-input type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('order.remarks')" v-model="netData.remark"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="netVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click.native.prevent="netDataSave(netData.id)">{{ $t('table.confirm') }}</el-button>
      </div>

    </el-dialog>
    <!--成员弹窗-->
    <el-dialog :title="$t('member')" :visible.sync="memberVisible"  width="800px" style="padding-bottom: 50px" center>
      <div style="font-size: 16px;margin-bottom: 20px">{{$t('netMembersList')}}</div>
      <el-table
        v-loading="memberListLoading"
        :data="memberList"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="account"
          align="center"
          :label="$t('userEdit.businessBroker')"
          min-width="200">
          <template slot-scope="{row}">
            <span>{{row.account.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="net_role"
          align="center"
          :label="$t('role')"
          min-width="200">
          <template slot-scope="{row}">
            <el-tooltip v-if="row.manager==1" class="item" effect="dark" :content="$t('setAsManagerText')" placement="top">
              <el-tag >{{$t('manager')}}</el-tag>
            </el-tooltip>
            <el-tooltip v-if="row.manager==0" class="item" effect="dark" :content="$t('setAsMemberText')" placement="top">
              <el-tag  type="info">{{$t('member')}}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="120">
          <template slot-scope="{row}">
              <el-button v-if="row.manager==0" size="mini" type="primary" @click="setAsManager(row)">{{$t('setAsManager')}}</el-button>
              <el-button v-if="row.manager==1" size="mini" type="warning" @click="setAsMember(row)">{{$t('setAsMember')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import { getBusinessBrokerNetList,addBusinessBrokerNet,getBusinessBrokerNet,editBusinessBrokerNet,delBusinessBrokerNet,getBrokerMembersList,getBrokerList,setMembersRole } from '@/api/businessBrokerNet'
  export default {
    name: "businessBrokernet",
    components: {
      Pagination
    },
    data() {
      return {
        role: '',
        BrokerNetId: '',

        // <!--添加网络弹窗-->
        editBrokerNetLoading: false,
        business_brokers: [],
        netVisible: false,
        netLoading:false,
       netData: {
          id: '',
         broker_id: [],
         name: '',
         remark: '',
        },
        // <!--成员弹窗-->
        memberVisible: false,
        memberList: [],
        memberListLoading: false,

        listQuery: {
          page: 1,
          q: '',
        },
        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],

        rules: {
          name: [{ required: true, message: this.$t('empty'), trigger: 'blur'}],
        }
      }
    },
    mounted(){
      this.role = store.getters && store.getters.role;
      this.getList();
    },
    methods: {
      // 弹出框关闭前
      dialogClose(done) {
        done();
      },
      // 弹出框保存
      netDataSave(id){
        let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let data = Object.assign({}, that.netData);
            data.broker_id=JSON.stringify( data.broker_id);
            if (id) {
              editBusinessBrokerNet(data).then(response => {
                console.log('editBusinessBrokerNet', response);
                that.netVisible = false;
                that.getList();
                that.netData = {};
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                console.log(err);
              })
            } else {
              addBusinessBrokerNet(data).then(response => {
                console.log('addBusinessBrokerNet', response);
                that.netVisible = false;
                that.getList();
                that.netData = {};
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
      // 筛选
      handleFilter() {
        this.listQuery.page=1;
        this.getList(this.listQuery);
      },
      //打开添加网络弹窗
      handleCreate() {
        this.netVisible=true;
        this.business_brokers=[];
        this.netData =  {
          id: '',
          broker_id: [],
          name: '',
          remark: '',
        };
        this.getBusinessBrokerList(this.listQuery);
      },
      // 打开编辑网络弹窗
      handleEdit(row) {
        let that=this;
        that.business_brokers=[];
        this.netVisible=true;
        this.editBrokerNetLoading=true;
        getBusinessBrokerNet ({id:row.row.id}).then(response => {
          that.editBrokerNetLoading=false;
          console.log('getBusinessBrokerNet',response);
          that.netData=response.data;
          that.business_brokers=response.data.free_brokers;
          console.log(that.netData)
        }).catch(err => {
          that.editBrokerNetLoading=false;
          console.log(err);
        })
      },
      //打开成员弹窗
      handleManager(scope){
        this.memberVisible=true;
        this.BrokerNetId=scope.row.id;
        this.getBrokerMembersList(scope.row.id);
      },
      // 获取经纪人网络成员列表
      getBrokerMembersList(id){
        let that=this;
        this.memberListLoading=true;
        getBrokerMembersList(id).then(response => {
          that.memberListLoading=false;
          console.log('getBrokerMembersList',response);
          that.memberList=response.data;
        }).catch(err => {
          that.memberListLoading=false;
          console.log(err);
        })
      },
      // 设置负责人
      setAsManager(row){
        let that = this;
        that.$confirm(that.$t('setAsManagerMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          setMembersRole ({id:row.id,manager:1}).then(response => {
            console.log('setMembersRole',response);
            that.getBrokerMembersList(that.BrokerNetId);
            that.listQuery.page=1;
            that.$notify({
              showClose: true,
              message: that.$t('Successful'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(action => {});
      },
      // 设置普通成员
      setAsMember(row){
        let that = this;
        that.$confirm(that.$t('setAsMemberMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          setMembersRole ({id:row.id,manager:0}).then(response => {
            console.log('setMembersRole',response);
            that.getBrokerMembersList(that.BrokerNetId);
            that.listQuery.page=1;
            that.$notify({
              showClose: true,
              message: that.$t('Successful'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(action => {});
      },
      // 获取卖家经纪人网络列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getBusinessBrokerNetList (data).then(response => {
          that.listLoading = false;
          that.total=response.data.total;
          that.tableData=response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },
      // 穿梭框获取可选企业经纪人列表
      getBusinessBrokerList(data){
        let that=this;
        this.editBrokerNetLoading=true;
        getBrokerList(data).then(response => {
          console.log('getBrokerList',response);
          that.business_brokers=response.data;
          that.editBrokerNetLoading=false;
        }).catch(err => {
          that.editBrokerNetLoading=false;
          console.log(err);
        })
      },
      handleDelete(scope) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delBusinessBrokerNet ({id:scope.row.id}).then(response => {
            console.log('delBusinessBrokerNet',response);
            that.getList();
            that.listQuery.page=1;
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
  .netTransfer .el-checkbox__label{
    font-size: 14px!important;
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

