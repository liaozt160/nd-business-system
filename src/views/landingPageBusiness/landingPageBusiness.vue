
<template>
  <div class="app-container" v-loading="pdfLoading">
    <aside>
      <h3 style="text-align: center;">{{$t('route.landingPageBusiness')}}</h3>
    </aside>
    <div class="filter-container">
      <!--<el-select size="small" v-model="listQuery.status" :placeholder="$t('table.status')" style="width: 130px;margin-right: 15px;" class="filter-item" @change="handleFilter" clearable>-->
        <!--<el-option :label="$t('table.all')" value="0" />-->
        <!--<el-option :label="$t('table.forSale')" value="1" />-->
        <!--<el-option :label="$t('table.soldOut')" value="2" />-->
        <!--<el-option :label="$t('employeeEdit.noVerified')" value="3" />-->
      <!--</el-select>-->

      <!--<div class="filter-item el-select&#45;&#45;medium">-->
        <!--<el-select size="small" v-model="listQuery.buyers" :placeholder="$t('route.buyers')" style="width: 180px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter" clearable>-->
          <!--<el-option :label="$t('table.all')" value="0" />-->
          <!--<el-option v-for="item in buyerListData" :label="item.label" :value="item.key" />-->
        <!--</el-select>-->
      <!--</div>-->

      <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      <el-button  size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>

      <el-button size="small" :disabled="selectArray.length==0"  class="filter-item" type="danger" icon="el-icon-delete" @click="handleDelete(selectArrayDel)">
        {{$t('table.delete')}}
      </el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus"
                 @click="handleCreate">{{ $t('table.add') }}
      </el-button>

    </div>

    <!--列表-->
    <div class="companyTable">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          fixed="left"
          width="50">
        </el-table-column>
        <el-table-column
          prop="listing"
          align="center"
          :label="$t('employeeEdit.Listing')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="category"
          align="center"
          :label="$t('employeeEdit.business_category')"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="company"
          align="center"
          :label="$t('employeeEdit.companyName')"
          min-width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.company" placement="top-start">
                <span
                  style="display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;width:200px">{{scope.row.company}}</span>
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
              <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.title}}</span>
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
          prop="address"
          align="center"
          :label="$t('table.location')"
          min-width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.location" placement="top-start">
                <span
                  style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:150px">{{scope.row.location}}</span>
            </el-tooltip>
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
              @click="handleDelete(scope)">{{$t('table.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import { buyerAttentionList,delBuyerAttention,adminGetBuyerAttentionList,attentionPdf,getBuyerList } from '@/api/buyers'
  import { getBuyers } from '@/api/business'
  import { adminGetLandingPageData,appendLandingpageBusiness,removeLandingPageBusiness } from '@/api/landingPage'
  export default {
    name: "landingPageBusiness",
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
          recommend_by_me: '',
          status: '',
          price_from:'',
          price_to:'',
          q:'',
        },
        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],

        buyerListData: [],
      }
    },
    mounted(){
      this.getList();
      this.getBuyerListFun();
      this.role = store.getters && store.getters.role
    },
    methods:{
      handleCreate(){
        this.$router.push('/businessForSales/index');
      },
      // 选择事件
      handleSelectionChange(selectData){
        this.selectArray=[];
        this.selectArrayDel=[];
        for(let i=0,len=selectData.length;i<len;i++){
          this.selectArray.push(selectData[i].business_id);
          this.selectArrayDel.push(selectData[i].id)
        }
        console.log(selectData,this.selectArray,this.selectArrayDel)
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
        if(Object.prototype.toString.call(row).indexOf('Array')!==-1){
          id=row;
          console.log('数组',row)
        }else{
          id=[row.row.id];
          console.log('非数组')
        }
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          removeLandingPageBusiness ({ids:id}).then(response => {
            console.log('removeLandingPageBusiness',response);
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
      // 获取登录页展示企业列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        adminGetLandingPageData (data).then(response => {
            console.log('adminGetLandingPageData',response);
            that.listLoading = false;
            that.total=response.data.total;
            that.tableData=response.data.data;
          }).catch(err => {
            console.log(err);
            that.listLoading = false
          })
      },

      // 获取买家列表
      getBuyerListFun() {
        let that=this;
        getBuyers ().then(response => {
          console.log('getBuyers',response);
          that.buyerListData=response.data;
        }).catch(err => {
          console.log(err);
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
