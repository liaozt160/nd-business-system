
<template>
  <div class="app-container" v-loading="pdfLoading">
    <aside>
      <h3 style="text-align: center;">{{$t('route.systemLog')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <el-select size="small" v-model="listQuery.user_id" :placeholder="$t('log.user')" style="width: 180px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter" clearable>
          <el-option :label="$t('table.all')" value="0" />
          <el-option v-for="item in accountList" :label="item.name" :value="item.user_id" />
        </el-select>
      </div>
      <!--<el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>-->
      <!--<el-button  size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
        <!--{{ $t('table.search') }}-->
      <!--</el-button>-->

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
          prop="user_name"
          align="center"
          :label="$t('log.user')"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          :label="$t('table.email')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="agent"
          align="center"
          :label="$t('log.terminal')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="created_at"
          align="center"
          :label="$t('log.time')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="url"
          align="center"
          :label="$t('log.request')"
          fixed="right"
          min-width="150">
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import { getLogList,getAccountList } from '@/api/log'
  export default {
    name: "systemLog",
    components:{
      Pagination
    },
    data(){
      return{
        pdfLoading: false,

        role: '',
        selectArray:[],
        selectArrayDel:[],

        listQuery: {
          page: 1,
          user_id: '',
        },
        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],

        accountList: [],

        buyerListData: [],
      }
    },
    mounted(){
      this.getAccount();
      this.getList();
      this.role = store.getters && store.getters.role
    },
    methods:{
      // 获取所有用户列表
      getAccount() {
        let that=this;
        getAccountList ().then(response => {
          console.log('getAccountList',response);
          that.accountList=response.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 筛选
      handleFilter() {
        this.listQuery.page = 1;
        this.getList(this.listQuery);
      },
      // 多选删除
      handleDelete(row) {
        let that = this;
        let id='';
          id=[row.row.id];
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delContactUsListApi ({ids:id}).then(response => {
            console.log('delContactUsListApi',response);
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
      // 获取联系我们表格列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getLogList (data).then(response => {
          console.log('getLogList',response);
          that.listLoading = false;
          that.total=response.data.total;
          that.tableData=response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
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

