
<template>
  <div class="app-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <h3 style="color: #5f5f5f;">{{$t('panelGroup.newEnterprises')}}</h3>
    <!--列表-->
    <div class="companyTable">

      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        stripe
        @sort-change="sortChange"
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
          :label="$t('employeeEdit.companyName')"
          min-width="200"><template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.company" placement="top-start">
            <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.company}}</span>
          </el-tooltip>
        </template>
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          :label="$t('employeeEdit.title')"
          min-width="200"><template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top-start">
            <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.title}}</span>
          </el-tooltip>
        </template>
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          sortable
          :label="$t('table.price')+'($)'"
          min-width="150">
          <template slot-scope="{row}">
            <span>{{toThousands(row.price)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
          align="center"
          :label="$t('table.location')"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          :label="$t('table.status')"
          min-width="110">
          <template slot-scope="{row}">
            <el-tag type="primary" v-if="row.status==1">{{ $t('table.forSale') }}</el-tag>
            <el-tag type="info" v-if="row.status==2">{{ $t('table.soldOut') }}</el-tag>
            <el-tag type="info" v-if="row.status==3">{{ $t('employeeEdit.noVerified') }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-table-->
        <!--v-loading="listLoading"-->
        <!--:data="tableData"-->
        <!--border-->
        <!--stripe-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="listing"-->
          <!--align="center"-->
          <!--:label="$t('employeeEdit.Listing')"-->
          <!--min-width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="title"-->
          <!--align="center"-->
          <!--:label="$t('employeeEdit.title')"-->
          <!--min-width="200"><template slot-scope="scope">-->
          <!--<el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top-start">-->
            <!--<span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.title}}</span>-->
          <!--</el-tooltip>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="price"-->
          <!--align="center"-->
          <!--:label="$t('table.price')+'($)'"-->
          <!--min-width="150">-->
          <!--<template slot-scope="{row}">-->
            <!--<span>{{toThousands(row.price)}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="state"-->
          <!--align="center"-->
          <!--:label="$t('table.status')"-->
          <!--min-width="100">-->
          <!--<template slot-scope="{row}">-->
            <!--<el-tag type="primary" v-if="row.status==1">{{ $t('table.forSale') }}</el-tag>-->
            <!--<el-tag type="info" v-if="row.status==2">{{ $t('table.soldOut') }}</el-tag>-->
            <!--<el-tag type="info" v-if="row.status==3">{{ $t('employeeEdit.noVerified') }}</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="updated_at"-->
          <!--align="center"-->
          <!--:label="$t('table.entryTime')"-->
          <!--min-width="160">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    </div>

  </div>
</template>

<script>
  import PanelGroup from './PanelGroup'
  import Pagination from '@/components/Pagination'
  import { buyerGetBusinessOneList,showBusiness,showLevelOne,getBuyers,setAttentionBusiness } from '@/api/business'
  export default {
    name: "buyer",
    components:{
      Pagination,
      PanelGroup
    },
    data(){
      return{
        dialogView:false,
        ViewLoading:false,

        selectBuyer:false,
        buyerList:[],
        selectBuyerId:'',

        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],
        attentionData: {},
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      handleSetLineChartData(type) {
      },
      // 打开企业详情
      handleView(row) {
        let that=this;
        this.dialogView=true;
        this.ViewLoading = true;
        showLevelOne ({business_id:row.row.id}).then(response => {
          that.ViewLoading = false;
          console.log('showLevelOne',response);
          that.attentionData=response.data;
        }).catch(err => {
          that.ViewLoading = false;
          console.log(err);
        })
      },
      //打开选择意向buyer弹窗
      openSelectBuyer(row){
        let that=this;
        this.selectBuyer=true;
        if(row){
          this.attentionData.id=row.row.id;
        }
        getBuyers ().then(response => {
          console.log('getBuyers',response);
          that.buyerList=response.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 提交到意向企业
      AddAttention(business_id,buyer_id){
        let that=this;
        setAttentionBusiness ({business_id:business_id,buyer_id:buyer_id}).then(response => {
          console.log('setAttentionBusiness',response);
          that.selectBuyer=false;
          that.$notify({
            showClose: true,
            message: that.$t('Successful'),
            type: 'success'
          });
        }).catch(err => {
          that.selectBuyer=false;
          console.log(err);
        })
      },

      // 获取待售企业列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        buyerGetBusinessOneList (data).then(response => {
          console.log('buyerGetBusinessOneList',response);
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
    width: 50%;
  }
</style>
