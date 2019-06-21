
<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.attentionBusiness')}}</h3>
    </aside>
    <div class="filter-container">
      <el-select v-model="listQuery.status" :placeholder="$t('table.status')" style="width: 130px;margin-right: 15px;" class="filter-item" @change="handleFilter" clearable>
        <el-option :label="$t('table.all')" value="0" />
        <el-option :label="$t('table.forSale')" value="1" />
        <el-option :label="$t('table.soldOut')" value="2" />
      </el-select>

      <div class="filter-item el-select--medium">
        <span style="color: #717171;font-size: 14px;">{{$t('table.price')}} ($)</span>
        <el-input v-model="listQuery.price_from" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
        ~
        <el-input v-model="listQuery.price_to" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      </div>
      <el-input v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
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
          prop="listing"
          align="center"
          :label="$t('employeeEdit.Listing')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          :label="$t('employeeEdit.title')"
          min-width="200">
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
          prop="buyer"
          align="center"
          :label="$t('AttentionBuyer')"
          min-width="200">
        </el-table-column>

        <el-table-column
          prop="created_at"
          align="center"
          :label="$t('table.entryTime')"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index,scope)">{{$t('table.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { buyerAttentionList,delBuyerAttention } from '@/api/buyers'
  export default {
    name: "attentionBusiness",
    components:{
      Pagination
    },
    data(){
      return{
        listQuery: {
          page: 1,
          status: '',
          price_from:'',
          price_to:'',
          q:'',
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
    methods:{
      handleFilter() {
        this.listQuery.page = 1;
        this.getList(this.listQuery);
      },

      handleDelete(index, row) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delBuyerAttention (row.row.id).then(response => {
            console.log('delBuyerAttention',response);
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
      // 获取买家意向企业列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        buyerAttentionList (data).then(response => {
          console.log('buyerAttentionList',response);
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
