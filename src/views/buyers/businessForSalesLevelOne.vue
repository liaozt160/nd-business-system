
<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.businessForSales')}}</h3>
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
          sortable
          min-width="150">
          <template slot-scope="{row}">
            <span>{{toThousands(row.price)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updated_at"
          align="center"
          :label="$t('table.entryTime')"
          sortable
          min-width="160">
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
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleView(scope)">{{$t('view')}}
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="openSelectBuyer(scope)">{{$t('AddAttention')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>
    <!--// 打开企业详情弹窗-->
    <el-dialog :title="$t('detail')" :visible.sync="dialogView" v-if="dialogView" width="900px" center :close-on-click-modal="false">
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
        <el-form-item :label="$t('employeeEdit.GrossIncome')+'：'">
          <!--毛利润-->
          <span>
            $ {{ toThousands(attentionData.gross_income) }}
             / {{attentionData.gross_income_unit==1?$t('week'):attentionData.gross_income_unit==2?$t('Month'):attentionData.gross_income_unit==3?$t('Quarter'):attentionData.gross_income_unit==4?$t('Year'):''}}
          </span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.EBITDA')+'：'">
          <!--税息折扣及摊销前利润-->
          <span>{{ attentionData.ebitda }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.FFandE')+'：'">
          <!--硬件资产价值-->
          <span>{{ attentionData.ff_e }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Inventory')+'：'">
          <!--库存-->
          <span>{{ attentionData.inventory }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.NetIncome')+'：'">
          <!--净利润-->
          <span>
            $ {{ toThousands(attentionData.net_income) }}
             / {{attentionData.net_income_unit==1?$t('week'):attentionData.net_income_unit==2?$t('Month'):attentionData.net_income_unit==3?$t('Quarter'):attentionData.net_income_unit==4?$t('Year'):''}}
          </span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Lease')+'：'">
          <!--租金-->
          <span>
            $ {{toThousands(attentionData.lease) }}
            / {{attentionData.lease_unit==1?$t('week'):attentionData.lease_unit==2?$t('Month'):attentionData.lease_unit==3?$t('Quarter'):attentionData.lease_unit==4?$t('Year'):''}}
          </span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.LeaseTerm')+'：'">
          <!--租约有效期-->
          <span>{{ attentionData.lease_term }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.Est')+'：'">
          <!--房地产估价-->
          <span>{{ attentionData.value_of_real_estate }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.ServiceFee')+'：'">
          <!--服务费-->
          <span>{{ attentionData.commission }}</span>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.BuyerFinancing')+'：'">
          <!--卖家融资-->
          <span>{{ attentionData.buyer_financing }}</span>
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
  import Pagination from '@/components/Pagination'
  import { buyerGetBusinessOneList,showBusiness,showLevelOne,getBuyers,setAttentionBusiness } from '@/api/business'
  export default {
    name: "businessForSalesLevelOne",
    components:{
      Pagination
    },
    data(){
      return{
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
      handleView(row) {
        let that=this;
        this.dialogView=true;
        this.ViewLoading = true;
        showLevelOne (row.row.id).then(response => {
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
