
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
          min-width="200"><template slot-scope="scope">
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
          prop="state"
          align="center"
          :label="$t('table.status')"
          min-width="100">
          <template slot-scope="{row}">
            <el-tag type="primary" v-if="row.status==1">{{ $t('table.forSale') }}</el-tag>
            <el-tag type="info" v-else>{{ $t('table.soldOut') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="updated_at"
          align="center"
          :label="$t('table.entryTime')"
          min-width="160">
        </el-table-column>
      </el-table>
    </div>
    <!--// 打开企业详情弹窗-->
    <el-dialog :title="$t('detail')" :visible.sync="dialogView" width="800px" center :close-on-click-modal="false">
      <el-form label-position="left" inline  class="demo-table-expand" label-width="200px" v-loading="ViewLoading">
        <el-form-item :label="$t('employeeEdit.title')+'：'">
          <!--标题-->
          <span>{{ attentionData.title }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Listing')+'：'">
          <!--编号-->
          <span>{{ attentionData.listing }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Price')+'：'">
          <!--标价-->
          <span>{{ attentionData.price }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.EmployeeCount')+'：'">
          <!--员工人数-->
          <span>{{ attentionData.employee_count }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Profitability')+'：'">
          <!--是否盈利-->
          <span>{{ attentionData.profitability==1?$t('yes'):$t('no') }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.RealEstate')+'：'">
          <!--是否包含房地产-->
          <span>{{ attentionData.real_estate==1?$t('yes'):$t('no') }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.BuildingSF')+'：'">
          <!--营业面积-->
          <span>{{ attentionData.building_sf }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.status')+'：'">
          <!--状态-->
          <span>{{ attentionData.status==1? $t('table.forSale'):$t('table.soldOut') }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Location')+'：'">
          <!--地理位置-->
          <span>{{ attentionData.location }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogView = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="openSelectBuyer()">{{ $t('AddAttention') }}</el-button>
      </div>
    </el-dialog>

    <!--// 选择买家弹窗-->
    <el-dialog :title="$t('ChooseAttentionBuyer')" :visible.sync="selectBuyer" width="500px" center :close-on-click-modal="false">
      <el-select v-model="selectBuyerId" clearable style="width: 100%" class="filter-item">
        <el-option v-for="item in buyerList" :label="item.label" :value="item.key" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectBuyer = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="AddAttention(attentionData.id,selectBuyerId)">{{ $t('AddAttention') }}</el-button>
      </div>
    </el-dialog>

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
