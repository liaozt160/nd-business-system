<template>
  <div class="homeTable">
    <!--列表-->
    <div class="companyTable">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="200px">
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
                <span>$ {{ toThousands(props.row.price) }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Location')">
                <!--地理位置-->
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Profitability')">
                <!--是否盈利-->
                <span>{{ props.row.profitability==1?$t('yes'):$t('no') }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.RealEstate')">
                <!--是否包含房地产-->
                <span>{{ props.row.real_estate ==1?$t('yes'):$t('no')}}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Franchise')">
                <!--是否包加盟店-->
                <span>{{ props.row.franchise==1?$t('yes'):props.row.franchise==2?$t('no'):$t('NA') }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.BuildingSF')">
                <!--营业面积-->
                <span>{{ props.row.building_sf }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.EmployeeCount')">
                <!--员工人数-->
                <span>{{ props.row.employee_count==0?$t('NA'):props.row.employee_count }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.GrossIncome')">
                <!--毛利润-->
                <span>
                  $ {{ toThousands(props.row.gross_income) }}
                  / {{props.row.gross_income_unit==1?$t('week'):props.row.gross_income_unit==2?$t('Month'):props.row.gross_income_unit==3?$t('Quarter'):props.row.gross_income_unit==4?$t('Year'):''}}
                </span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.EBITDA')">
                <!--税息折扣及摊销前利润-->
                <span>{{ props.row.ebitda }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.FFandE')">
                <!--硬件资产价值-->
                <span>{{ props.row.ff_e }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Inventory')">
                <!--库存-->
                <span>{{ props.row.inventory }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.NetIncome')">
                <!--净利润-->
                <span>
                  $ {{ toThousands(props.row.net_income) }}
                  / {{props.row.net_income_unit==1?$t('week'):props.row.net_income_unit==2?$t('Month'):props.row.net_income_unit==3?$t('Quarter'):props.row.net_income_unit==4?$t('Year'):''}}
                </span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Lease')">
                <!--租金-->
                <span>
                  $ {{toThousands(props.row.lease) }}
                  / {{props.row.lease_unit==1?$t('week'):props.row.lease_unit==2?$t('Month'):props.row.lease_unit==3?$t('Quarter'):props.row.lease_unit==4?$t('Year'):''}}
                </span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.LeaseTerm')">
                <!--租约有效期-->
                <span>{{ props.row.lease_term }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.Est')">
                <!--房地产估价-->
                <span>{{ props.row.value_of_real_estate }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.ServiceFee')">
                <!--服务费-->
                <span>{{ props.row.commission }}</span>
              </el-form-item>
              <el-form-item :label="$t('employeeEdit.BuyerFinancing')">
                <!--卖家融资-->
                <span>{{ props.row.buyer_financing }}</span>
              </el-form-item>
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
          prop="account.name"
          align="center"
          :label="$t('broker')"
          min-width="150">
          <template slot-scope="{row}">
            <el-tooltip v-if="row.account_name" class="item" effect="dark" :content="row.account_name"
                        placement="top-start">
                <span
                  style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:150px">{{row.account_name}}</span>
            </el-tooltip>
            <span v-else>{{$t('Unknown')}}</span>
          </template>
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
                <span
                  style="display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;width:200px">{{scope.row.title}}</span>
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
          min-width="110">
          <template slot-scope="{row}">
            <el-tag type="primary" v-if="row.status==1">{{ $t('table.forSale') }}</el-tag>
            <el-tag type="info" v-if="row.status==2">{{ $t('table.soldOut') }}</el-tag>
            <el-tag type="info" v-if="row.status==3">{{ $t('employeeEdit.noVerified') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="publicationStatus"
          align="center"
          :label="$t('table.publicationStatus')"
          min-width="160">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.public==1">{{ $t('table.published') }}</el-tag>
            <el-tag type="info" v-if="row.public==0">{{ $t('table.unpublished') }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getBusinessList,addBusiness,editBusiness,delBusiness,showBusiness,changeStatus } from '@/api/business'
  export default {
    name: "homeTable",
    data() {
      return{
        listLoading: false,
        tableData: [],
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
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
      handleDelete(index, row) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delBusiness ({id:row.row.id}).then(response => {
            console.log('delBuyer',response);
            that.listQuery.page=1;
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
    }
  }
</script>

<style scoped>
  .homeTable{
    margin-bottom: 100px;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
  }
</style>
