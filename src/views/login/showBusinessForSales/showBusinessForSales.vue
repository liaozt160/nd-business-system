<template>
  <div class="app-container" v-loading="pdfLoading" style="z-index: 9999">
    <aside>
      <router-link style="float: left; line-height: 45px;" to="/">< 返回登录</router-link>
      <h3 style="text-align: center;">{{$t('route.businessForSales')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <!--<span style="color: #717171;font-size: 14px;">{{$t('table.status')}}</span>-->
        <!--<el-select size="small" v-model="listQuery.status" :placeholder="$t('table.status')"-->
                   <!--style="width: 130px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter"-->
                   <!--clearable>-->
          <!--<el-option :label="$t('table.all')" value="0"/>-->
          <!--<el-option :label="$t('table.forSale')" value="1"/>-->
          <!--<el-option :label="$t('table.soldOut')" value="2"/>-->
          <!--<el-option :label="$t('employeeEdit.noVerified')" value="3"/>-->
        <!--</el-select>-->
        <el-select size="small" v-model="listQuery.category_id" :placeholder="$t('employeeEdit.business_category')"
                   style="width: 180px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter"
                   clearable>
          <el-option v-for="item in business_category_arr" :label="item.category" :value="item.id.toString()"/>
        </el-select>
        <el-select size="small" v-model="listQuery.state" :placeholder="$t('employeeEdit.Location')"
                   style="width: 180px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter"
                   clearable>
          <el-option v-for="item in provinces" :label="item.name" :value="item.code"/>
        </el-select>
      </div>
      <div class="filter-item el-select--medium" v-if="businessBrokerList.length>1">
        <span style="color: #717171;font-size: 14px;">{{$t('broker')}}</span>
        <el-select size="small" v-model="listQuery.broker_id" :placeholder="$t('broker')"
                   style="width: 130px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter"
                   clearable>
          <el-option :label="$t('table.all')" value="0"/>
          <el-option v-for="item in businessBrokerList" :label="item.name" :value="item.account_id"/>
        </el-select>
      </div>

      <div class="filter-item el-select--medium">
        <span style="color: #717171;font-size: 14px;">{{$t('table.price')}} ($)</span>
        <el-input size="small" v-model="listQuery.price_from" :placeholder="$t('table.all')"
                  style="width: 130px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter"
                  clearable/>
        ~
        <el-input size="small" v-model="listQuery.price_to" :placeholder="$t('table.all')"
                  style="width: 130px;margin-bottom: 0;margin-right: 15px;" class="filter-item"
                  @keyup.enter.native="handleFilter" clearable/>
      </div>
      <div class="filter-item el-select--medium">
        <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')"
                  style="width: 200px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter"
                  clearable/>
        <el-button size="small" class="filter-item" style="margin-bottom: 0;" type="primary" icon="el-icon-search"
                   @click="handleFilter">{{ $t('table.search') }}
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
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
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
          prop="listing"
          align="center"
          :label="$t('employeeEdit.Listing')"
          min-width="180">
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
        <!--<el-table-column-->
          <!--prop="status"-->
          <!--align="center"-->
          <!--:label="$t('table.status')"-->
          <!--min-width="110">-->
          <!--<template slot-scope="{row}">-->
            <!--<el-tag type="primary" v-if="row.status==1">{{ $t('table.forSale') }}</el-tag>-->
            <!--<el-tag type="info" v-if="row.status==2">{{ $t('table.soldOut') }}</el-tag>-->
            <!--<el-tag type="info" v-if="row.status==3">{{ $t('employeeEdit.noVerified') }}</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="publicationStatus"-->
          <!--align="center"-->
          <!--:label="$t('table.publicationStatus')"-->
          <!--min-width="160">-->
          <!--<template slot-scope="{row}">-->
            <!--<el-tag type="success" v-if="row.public==1">{{ $t('table.published') }}</el-tag>-->
            <!--<el-tag type="info" v-if="row.public==0">{{ $t('table.unpublished') }}</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="pageSize" @pagination="getList(listQuery)"/>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import {
    getBusinessList,
    getBusinessCategoryArr,
    getLocation,
    LoginGetBusinessOneList,
  } from '@/api/business'

  export default {
    name: "CompanyForSales",
    components: {
      Pagination
    },
    data() {
      return {
        pdfLoading: false,
        selectArray: [],

        listRadio:'1',

        business_category_arr:[],

        provinces:[],

        listQuery: {
          broker_id: '',
          state: '',
          category_id: '',
          page: 1,
          status: '',
          price_from: '',
          price_to: '',
          q: '',
          order: '',
          prop: '',
        },
        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],

        buyerListLoading: false,
        selectBuyer: false,
        buyerList: [],
        business_id: '',
        selectBuyerId: '',
        businessBrokerList: [],

        brokerListLoading: false,
        selectBusinessBroker: false,
        BusinessBrokerList: [],
        owner_id: '',//卖家经纪人id

      }
    },
    mounted() {
      this.listQuery.page = 1;
      this.getList();
      this.get_business_category_arr();
      this.getlocation('country', 'USA');
    },
    methods: {
      // 获取地址三级联动数据
      getlocation(type, value) {
        let that = this;
        return new Promise(function (resolve, reject) {
          if (type && value) {
            let paramsData = {code: value, lang: that.$store.getters.language};
            getLocation(paramsData).then(response => {
              if (type == 'country') {
                that.provinces = response.data;
                resolve();
              }
            }).catch(err => {
              console.log(err);
            })
          }
        })
      },
      // 获取企业分类列表
      get_business_category_arr(){
        let that = this;
        getBusinessCategoryArr().then(response => {
          console.log('getBusinessCategoryArr',response);
          that.business_category_arr = response.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 选择事件
      handleSelectionChange(selectData) {
        this.selectArray = [];
        for (let i = 0, len = selectData.length; i < len; i++) {
          this.selectArray.push(selectData[i].id);
        }
        console.log('selectData', this.selectArray)
      },
      // 排序
      sortChange(e) {
        console.log(e);
        this.listQuery.page = 1;
        this.listQuery.order = e.order == 'ascending' ? 1 : e.order == 'descending' ? 0 : '';
        this.listQuery.prop = e.prop;
        console.log(this.listQuery);
        this.getList(this.listQuery);
      },

      handleFilter() {
        this.listQuery.page = 1;
        this.getList(this.listQuery);
      },

      // 获取展示一级信息企业列表
      getList(data) {
        let that = this;
        this.listLoading = true;
        LoginGetBusinessOneList(data).then(response => {
          that.tableData = response.data.data;
          that.total = response.data.total;
          that.listLoading = false;
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
