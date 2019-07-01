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
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
        @sort-change="sortChange"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="$t('employeeEdit.companyName')">
                <!--企业名称-->
                <span>{{ props.row.company }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Listing')">
                <!--编号-->
                <span>{{ props.row.listing }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Price')">
                <!--标价-->
                <span>{{ toThousands(props.row.price) }}</span>
              </el-form-item>
              <!--<el-form-item :label="$t('employeeEdit.Location')">-->
                <!--&lt;!&ndash;地理位置&ndash;&gt;-->
                <!--<span>{{ props.row.address }}</span>-->
              <!--</el-form-item>-->
              <el-form-item :label="$t('employeeEdit.Profitability')">
                <!--是否盈利-->
                <span>{{ props.row.profitability==1?$t('yes'):$t('no') }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.RealEstate')">
                <!--是否包含房地产-->
                <span>{{ props.row.real_estate ==1?$t('yes'):$t('no')}}</span>
              </el-form-item>
              <!--<el-form-item :label="$t('employeeEdit.Franchise')">-->
                <!--&lt;!&ndash;是否连锁店&ndash;&gt;-->
                <!--<span>{{ props.row.real_estate==1?$t('yes'):$t('no') }}</span>-->
              <!--</el-form-item>-->
              <el-form-item :label="$t('employeeEdit.BuildingSF')">
                <!--营业面积-->
                <span>{{ props.row.building_sf }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.EmployeeCount')">
                <!--员工人数-->
                <span>{{ props.row.employee_count }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.GrossIncome')">
                <!--毛利润-->
                <span>{{ toThousands(props.row.gross_income) }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.EBITDA')">
                <!--税息折扣及摊销前利润-->
                <span>{{ toThousands(props.row.ebitda) }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.FFandE')">
                <!--硬件资产价值-->
                <span>{{ toThousands(props.row.ff_e) }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Inventory')">
                <!--库存-->
                <span>{{ props.row.inventory }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.NetIncome')">
                <!--净利润-->
                <span>{{ toThousands(props.row.net_income) }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Lease')">
                <!--租金-->
                <span>{{ toThousands(props.row.lease) }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.LeaseTerm')">
                <!--租约有效期-->
                <span>{{ props.row.lease_term }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Est')">
                <!--房地产估价-->
                <span>{{ toThousands(props.row.value_of_real_estate) }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Commission')">
                <!--佣金-->
                <span>{{ props.row.commission }} %</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.BuyerFinancing')">
                <!--卖家融资-->
                <span>{{ toThousands(props.row.buyer_financing) }}</span>
              </el-form-item>
              <!--<el-form-item :label="$t('employeeEdit.BusinessDescription')">-->
                <!--&lt;!&ndash;生意介绍信息&ndash;&gt;-->
                <!--<span>{{ props.row.business_description }}</span>-->
              <!--</el-form-item>-->
              <el-form-item :label="$t('employeeEdit.USBroker')">
                <!--美国中介-->
                <span>{{ props.row.us_broker }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.USBrokerContactInfo')">
                <!--美国中介联系方式-->
                <span>{{ props.row.us_broker_contact_info }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.ListingDate')">
                <!--待售开始日期-->
                <span>{{ props.row.listing_date }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.ReasonForSelling')">
                <!--出售原因-->
                <span>{{ props.row.reason_for_selling }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="company"
          align="center"
          :label="$t('employeeEdit.companyName')"
          min-width="200">
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
          prop="address"
          align="center"
          :label="$t('table.location')"
          min-width="200">
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
          min-width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index,scope)">{{$t('table.edit')}}
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="handleChangeStatus(scope)" v-if="scope.row.status==1">{{$t('table.soldOut')}}
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleChangeStatus(scope)" v-else>{{$t('table.forSale')}}
            </el-button>
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
  import { getBusinessList,addBusiness,editBusiness,delBusiness,showBusiness,changeStatus } from '@/api/business'
    export default {
        name: "CompanyForSales",
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
              order:'',
              prop:'',
            },
            listLoading: false,
            total: 1,
            pageSize: 15,
            tableData: [],
          }
      },
      mounted(){
        this.listQuery.page=1;
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
          this.listQuery.page=1;
          this.getList(this.listQuery);
        },
        handleCreate() {
          this.$router.push({path: `/employerEdit/index`});
        },

        // 获取待售企业列表
        getList(data) {
          let that=this;
          this.listLoading = true;
          getBusinessList (data).then(response => {
            console.log('getBusinessList',response);
            that.listLoading = false;
            that.total=response.data.total;
            that.tableData=response.data.data;
          }).catch(err => {
            console.log(err);
            that.listLoading = false
          })
        },

        handleEdit(index, row) {
          console.log(123123,row);
          this.$router.push({path: '/employerEdit/index',query: {id: row.row.id}});
        },
        handleChangeStatus(row) {
          let that = this;
          let data={id:row.row.id,status:row.row.status==1?2:1};
          that.$confirm(that.$t('changeMsg'), that.$t('Confirmation'), {
            distinguishCancelAndClose: true,
            confirmButtonText: that.$t('confirm'),
            cancelButtonText: that.$t('cancel')
          }).then(() => {
            this.listLoading = true;
            changeStatus (data).then(response => {
              console.log('changeStatus',response);
              that.getList();
              that.listLoading = false;
              that.$notify({
                showClose: true,
                message: that.$t('Successful'),
                type: 'success'
              });
            }).catch(err => {
              that.listLoading = false;
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
            delBusiness (row.row.id).then(response => {
              console.log('delBuyer',response);
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
  .el-form-item__content {
    line-height: 20px !important;
    margin: 8px 0!important;
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
</style>
