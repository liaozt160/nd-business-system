
<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.AttentionBuyers')}}</h3>
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
          prop="company"
          align="center"
          :label="$t('route.attentionBusiness')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="buyer"
          align="center"
          :label="$t('buyers.Name')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          :label="$t('userEdit.buyerBroker')"
          min-width="150">
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

        <!--<el-table-column-->
          <!--prop="address"-->
          <!--align="center"-->
          <!--:label="$t('table.operate')"-->
          <!--fixed="right"-->
          <!--min-width="230">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope)">{{$t('table.delete')}}</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { getAttentionBuyerList } from '@/api/business'
  export default {
    name: "AttentionBuyers",
    components: {
      Pagination
    },
    data() {
      return {
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
      }
    },
    mounted(){
      this.getList();
    },
    methods: {
      handleFilter() {
        this.listQuery.page=1;
        this.getList(this.listQuery);
      },
      // 获取买家列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        getAttentionBuyerList (data).then(response => {
          console.log('getAttentionBuyerList',response);
          that.listLoading = false;
          that.total=response.data.total;
          that.tableData=response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },
      // handleDelete(index, row) {
      //   let that = this;
      //   that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
      //     distinguishCancelAndClose: true,
      //     confirmButtonText: that.$t('confirm'),
      //     cancelButtonText: that.$t('cancel')
      //   }).then(() => {
      //     delBuyer (row.row.id).then(response => {
      //       console.log('delBuyer',response);
      //       that.getList();
      //       that.$notify({
      //         showClose: true,
      //         message: that.$t('deleted'),
      //         type: 'success'
      //       });
      //     }).catch(err => {
      //       console.log(err);
      //     })
      //   }).catch(action => {});
      // },
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

