
<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.businessForSales')}}</h3>
    </aside>
    <div class="filter-container">
      <el-select size="small" v-model="listQuery.status" :placeholder="$t('table.status')" style="width: 130px;margin-right: 15px;" class="filter-item" @change="handleFilter" clearable>
        <el-option :label="$t('table.all')" value="0" />
        <el-option :label="$t('table.forSale')" value="1" />
        <el-option :label="$t('table.soldOut')" value="2" />
        <el-option :label="$t('employeeEdit.noVerified')" value="3" />
      </el-select>

      <div class="filter-item el-select--medium">
        <span style="color: #717171;font-size: 14px;">{{$t('table.price')}} ($)</span>
        <el-input size="small" v-model="listQuery.price_from" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
        ~
        <el-input size="small" v-model="listQuery.price_to" :placeholder="$t('table.all')" style="width: 130px;margin-bottom: 0;margin-right: 15px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      </div>
      <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      <el-button size="small"  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
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
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="400">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleView(scope,1)">{{$t('buyerView')}}
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleView(scope,0)">{{$t('view')}}
            </el-button>
            <el-button
              size="mini"
              type="success"
              :disabled="scope.row.status!=1"
              @click="openSelectBuyer(scope)">{{$t('AddAttention')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>
    <!--// 打开企业详情弹窗-->
    <el-dialog :title="$t('detail')" :visible.sync="dialogView" v-if="dialogView" width="900px" center :close-on-click-modal="false">
      <el-form label-position="left" inline  class="demo-table-expand"  v-loading="ViewLoading">
        <el-form-item :label="$t('employeeEdit.Listing')+'：'">
          <!--编号-->
          <span>{{ attentionData.listing }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.companyName')+'：'">
          <!--企业名称-->
          <span>{{ attentionData.company }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.title')+'：'">
          <!--标题-->
          <span>{{ attentionData.title }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Price')+'：'">
          <!--标价-->
          <span>{{ attentionData.price }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Profitability')+'：'">
          <!--是否盈利-->
          <span>{{ attentionData.profitability==1?$t('yes'):attentionData.profitability==2?$t('no'):$t('NA') }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Franchise')+'：'">
          <!--是否包加盟店-->
          <span>{{ attentionData.franchise==1?$t('yes'):attentionData.franchise==2?$t('no'):$t('NA') }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.RealEstate')+'：'">
          <!--是否包含房地产-->
          <span>{{ attentionData.real_estate==1?$t('yes'):attentionData.real_estate==2?$t('no'):$t('NA') }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.ServiceFee')+'：'" v-if="!isBuyer">
          <!--服务费-->
          <span>{{ attentionData.commission }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.status')+'：'">
          <!--状态-->
          <span>{{ attentionData.status==1? $t('table.forSale'):attentionData.status==2?$t('table.soldOut'): $t('employeeEdit.noVerified')  }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Location')+'：'">
          <!--地理位置-->
          <span>{{ attentionData.location }}</span>
        </el-form-item>
          <!--业务描述-->
        <b style="font-size: 14px;line-height: 45px;display: block;">{{$t('employeeEdit.business_description')+'：'}}</b>
          <el-input
            class="texareaBox"
            style="display:block;width: 100%;"
            type="textarea"
            readonly
            :autosize="{ minRows: 4}"
            v-model="attentionData.business_description">
          </el-input>
          <!--待售商业资产-->
        <b style="font-size: 14px;line-height: 45px;display: block;">{{$t('employeeEdit.businessAssetForSale')+'：'}}</b>
          <el-input
            class="texareaBox"
            style="display:block;width: 100%;"
            type="textarea"
            readonly
            :autosize="{ minRows: 4}"
            v-model="attentionData.business_assets">
          </el-input>
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
  import Pagination from '@/components/Pagination'
  import { buyerGetBusinessOneList,showBusiness,showLevelOne,getBuyers,setAttentionBusiness } from '@/api/business'
  export default {
    name: "businessForSalesLevelOne",
    components:{
      Pagination
    },
    data(){
      return{
        isBuyer:false,

        dialogView:false,
        ViewLoading:false,

        selectBuyer:false,
        buyerList:[],
        selectBuyerId:'',

        listQuery: {
          page: 1,
          status: '',
          price_from:'',
          price_to:'',
          q:'',
          order:'',
          prop:'',
        },
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
      // 排序
      sortChange(e){
        console.log(e);
        this.listQuery.page=1;
        this.listQuery.order=e.order=='ascending'?1:e.order=='descending'?0:'';
        this.listQuery.prop=e.prop;
        console.log(this.listQuery);
        this.getList(this.listQuery);
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList(this.listQuery);
      },
      // 打开企业详情
      handleView(row,isbuyer) {
        let that=this;
        this.isBuyer=isbuyer==1?true:false;
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
        if(!buyer_id){
          that.$notify.error({
            showClose: true,
            message: that.$t('ChooseAttentionBuyer'),
          });
          return;
        }
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
<style>
  .texareaBox>.el-textarea__inner {
    border: none!important;
    resize:none;
    word-break:break-word;
  }
</style>
