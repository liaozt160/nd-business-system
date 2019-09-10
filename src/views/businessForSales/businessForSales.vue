<template>
  <div class="app-container" v-loading="pdfLoading" style="z-index: 9999">
    <aside>
      <h3 style="text-align: center;">{{role==3?$t('route.myBusiness'):$t('route.businessForSales')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <!--<span style="color: #717171;font-size: 14px;">{{$t('table.status')}}</span>-->
        <el-select size="small" v-model="listQuery.status" :placeholder="$t('table.status')"
                   style="width: 130px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter"
                   clearable>
          <el-option :label="$t('table.all')" value="0"/>
          <el-option :label="$t('table.forSale')" value="1"/>
          <el-option :label="$t('table.soldOut')" value="2"/>
          <el-option :label="$t('employeeEdit.noVerified')" value="3"/>
        </el-select>
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
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus"
                 @click="handleCreate">{{ $t('table.add') }}
      </el-button>
      <el-button v-if="role==1" :disabled="selectArray.length==0" size="small" class="filter-item" style="margin-left: 10px;" type="primary"
                 @click="handleRecommendation">{{ $t('table.RecommendationToBuyerBroker') }}
      </el-button>
      <el-button v-if="role==1" :disabled="selectArray.length==0" size="small" class="filter-item" style="margin-left: 10px;" type="primary"
                 @click="handleAddLandingPage">{{ $t('addLandingPage') }}
      </el-button>
      <div class="filter-item el-select--medium" style="margin-left: 10px" v-if="role==1">
        <el-dropdown trigger="click">
          <el-button size="small" type="primary" plain>
            {{$t('order.Print')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="selectArray.length==0" class="menuItem"><span @click.stop="handlePrinter('1')">{{$t('order.PrintOne')}}</span></el-dropdown-item>
            <el-dropdown-item :disabled="selectArray.length==0" class="menuItem"><span @click.stop="handlePrinter('2')">{{$t('order.PrintTwo')}}</span></el-dropdown-item>
            <el-dropdown-item :disabled="selectArray.length==0" class="menuItem"><span @click.stop="handlePrinter('3')">{{$t('order.PrintThree')}}</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
        <el-table-column
          v-if="role==1"
          type="selection"
          align="center"
          fixed="left"
          width="50">
        </el-table-column>
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
          prop="status"
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
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="180">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button size="mini" type="primary" plain>
                {{$t('table.moreOperations')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="menuItem" v-if="role==1"><span @click.stop="changeBroker(scope)">{{$t('table.changeBroker')}}</span></el-dropdown-item>

                <el-dropdown-item class="menuItem" v-if="role!=3"><span @click.stop="openSelectBuyer(scope)">{{$t('AddAttention')}}</span></el-dropdown-item>

                <el-dropdown-item class="menuItem" v-if="scope.row.public==1&&role==1"><span @click.stop="handleChangePublic(scope)">{{$t('table.withdrawRelease')}}</span></el-dropdown-item>
                <el-dropdown-item class="menuItem" v-if="scope.row.public==0&&role==1"><span @click.stop="handleChangePublic(scope)">{{$t('table.release')}}</span></el-dropdown-item>

                <el-dropdown-item class="menuItem"><span @click.stop="handleEdit(scope.$index,scope)">{{$t('table.edit')}}</span></el-dropdown-item>

                <el-dropdown-item class="menuItem"><span @click.stop="handleDelete(scope.$index,scope)">{{$t('table.delete')}}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="pageSize"
                  @pagination="getList(listQuery)"/>
    </div>

    <!--// 选择买家弹窗-->
    <el-dialog :title="$t('ChooseAttentionBuyer')" :visible.sync="selectBuyer" width="500px" center
               :close-on-click-modal="false">
      <el-select v-model="selectBuyerId" clearable style="width: 100%" class="filter-item"
                 v-loading="buyerListLoading">
        <el-option v-for="item in buyerList" :label="item.label" :value="item.key"/>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectBuyer = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="AddAttention(business_id,selectBuyerId)">{{ $t('AddAttention') }}
        </el-button>
      </div>
    </el-dialog>
    <!--// 更改卖家经纪人选择卖家经纪人弹窗-->
    <el-dialog :title="$t('table.changeBroker')" :visible.sync="selectBusinessBroker" width="500px" center
               :close-on-click-modal="false">
      <el-select v-model="owner_id" clearable style="width: 100%" class="filter-item" v-loading="brokerListLoading">
        <el-option v-for="item in BusinessBrokerList" :label="item.name" :value="item.account_id"/>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectBusinessBroker = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="changeBrokerSave(business_id,owner_id)">{{ $t('table.changeBroker') }}
        </el-button>
      </div>
    </el-dialog>

    <!--// 推荐给买家经纪人选择买家经纪人弹窗-->
    <el-dialog :title="$t('table.RecommendationToBuyerBroker')" :visible.sync="selectBuyerBroker" width="600px" center
               :close-on-click-modal="false">
      <div style="margin-bottom: 20px;text-align: center">
        <el-radio v-model="listRadio" label="1" border size="mini">{{$t('table.NewList')}}</el-radio>
        <el-radio v-model="listRadio" label="2" border size="mini">{{$t('table.ExistingList')}}</el-radio>
      </div>
      <div v-show="listRadio==1">
        <div class="filter-item el-select--medium">
          <span style="display:inline-block; text-align:right;width:120px;color: #717171;font-size: 14px;margin-right: 10px">{{$t('table.RecommendedListName')}}</span>
          <el-input v-model="list_name" :placeholder="$t('table.RecommendedListName')" style="width: 70%;"
                    class="filter-item"></el-input>
        </div>
        <div class="filter-item el-select--medium" style="margin-top: 15px;">
          <span style="display:inline-block; text-align:right;width:120px;color: #717171;font-size: 14px;margin-right: 10px">{{$t('userEdit.buyerBroker')}}</span>
          <el-select v-model="buyer_broker_id" @change="selectBuyerBrokerFun" clearable style="width: 70%" class="filter-item" v-loading="buyerBrokerListLoading">
            <el-option v-for="item in buyerBrokerList" :label="item.name" :value="item.account_id"/>
          </el-select>
        </div>
        <div class="filter-item el-select--medium" style="margin-top: 15px;">
          <span style="display:inline-block;text-align:right;width:120px;color: #717171;font-size: 14px;margin-right: 10px">{{$t('route.buyers')}}</span>
          <el-select v-model="buyer_id" clearable style="width: 70%" class="filter-item" v-loading="buyersListLoading">
            <el-option v-for="item in buyersList" :label="item.label" :value="item.key"/>
          </el-select>
        </div>
      </div>
      <div v-show="listRadio==2">
        <div class="filter-item el-select--medium">
          <span style="display:inline-block; text-align:right;width:120px;color: #717171;font-size: 14px;margin-right: 10px">{{$t('table.RecommendedToExistingLists')}}</span>
          <el-select v-model="recommended_list_id" clearable style="width: 70%" class="filter-item" v-loading="recommendedListLoading">
            <el-option v-for="item in recommended_list" :label="item.name" :value="item.id"/>
          </el-select>
        </div>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="selectBuyerBroker = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="listRadio==1" type="primary" @click="changeBuyerBrokerSave(selectArray,list_name,buyer_broker_id,buyer_id)">{{ $t('confirm') }}</el-button>
        <el-button v-if="listRadio==2" type="primary" @click="changeBuyerBrokerHaveListSave(recommended_list_id,selectArray)">{{ $t('confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import {
    getBusinessList,
    addBusiness,
    editBusiness,
    delBusiness,
    showBusiness,
    changeStatus,
    getBuyers,
    setAttentionBusiness,
    getBusinessbrokersList,
    changeBusinessbrokerSave,
    businessGeneratePdf,
    getBusinessCategoryArr,
    getLocation,
    getBuyerBrokersList,
    addRecommendSave,
    getAllRecommendList,
    haverecommendListAppend,
    changePublic,
    AddToLandingPage,
  } from '@/api/business'
  import {attentionPdf} from '@/api/buyers'
  import { adminGetLandingPageData,appendLandingPageBusiness,removeLandingPageBusiness } from '@/api/landingPage'

  export default {
    name: "CompanyForSales",
    components: {
      Pagination
    },
    data() {
      return {
        pdfLoading: false,
        selectArray: [],
        role: '',

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

        // 选择买家经纪人弹窗
        buyerBrokerListLoading: false,//买家经纪人列表loading
        buyersListLoading: false,//买家列表loading
        recommendedListLoading: false,//已有清单列表loading
        selectBuyerBroker: false,//选择买家经纪人弹窗状态
        list_name: '',//清单名称
        buyer_broker_id: '',//买家经纪人id
        buyerBrokerList: [],//可选买家经纪人列表
        buyer_id: '',//买家id
        buyersList: [],//买家经纪人下的可选买家列表
        recommended_list_id: '',//已有清单id
        recommended_list: [],//可选已有清单列表
      }
    },
    mounted() {
      this.listQuery.page = 1;
      this.getList();
      this.getBrokersList();
      this.get_business_category_arr();
      this.getlocation('country', 'USA');
      this.role = store.getters && store.getters.role
    },
    methods: {
      // 获取全部推荐清单列表
      getRecommendedList(){
        let that = this;
        that.recommendedListLoading = true;
        getAllRecommendList().then(response => {
          that.recommendedListLoading = false;
          console.log('getAllRecommendList', response);
          that.recommended_list = response;
        }).catch(err => {
          that.recommendedListLoading = false;
          console.log(err);
        })
      },
      // 选择买家经纪人
      selectBuyerBrokerFun(buyer_broker_id){
        let that = this;
        // 根据买家经纪人获取所属买家
        that.buyersListLoading = true;
        getBuyers({id:buyer_broker_id}).then(response => {
          that.buyersListLoading = false;
          console.log('getBuyersList', response);
          that.buyersList = response.data;
        }).catch(err => {
          that.buyersListLoading = false;
          console.log(err);
        })
      },
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
      //添加企业到登录页展示
      handleAddLandingPage() {
        let that = this;
        if (that.selectArray.length!=0) {
          appendLandingPageBusiness({ids:that.selectArray}).then(response => {
            console.log('appendLandingPageBusiness', response);
            that.$notify({
              showClose: true,
              message: that.$t('Successful'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }
      },
      //推荐给买家经纪人选择买家经纪人弹窗
      handleRecommendation() {
        let that = this;
        this.getRecommendedList();
        if (that.selectArray.length!=0) {
          this.business_id = that.selectArray;
        }
        this.selectBuyerBroker = true;
        this.buyerBrokerListLoading = true;
        // 获取买家经纪人列表
        getBuyerBrokersList().then(response => {
          that.buyerBrokerListLoading = false;
          console.log('getBuyerBrokersList', response);
          that.buyerBrokerList = response.data;
        }).catch(err => {
          that.buyerBrokerListLoading = false;
          console.log(err);
        })
      },
      // 推荐给买家选择买家经纪人提交
      changeBuyerBrokerSave(business_id,list_name,buyer_broker_id, buyer_id){
        let that = this;
        if (!list_name) {
          that.$notify.error({
            showClose: true,
            message: that.$t('table.list_nameText'),
          });
          return;
        }
        if (!buyer_broker_id) {
          that.$notify.error({
            showClose: true,
            message: that.$t('table.selectBuyerBrokerText'),
          });
          return;
        }
        // if (!buyer_id) {
        //   that.$notify.error({
        //     showClose: true,
        //     message: that.$t('table.selectBuyerText'),
        //   });
        //   return;
        // }
        let saveData={
          name: list_name,
          business_ids: JSON.stringify(business_id),
          broker_id:buyer_broker_id,
          buyer_id: buyer_id,
        };
        addRecommendSave(saveData).then(response => {
          that.selectBuyerBroker = false;
          // that.getList();
          console.log('addRecommendSave', response);
          that.$notify({
            showClose: true,
            message: that.$t('Successful'),
            type: 'success'
          });
        }).catch(err => {
          that.selectBuyerBroker = false;
          console.log(err);
        })
      },
      // 推荐给买家选择买家经纪人已有清单提交
      changeBuyerBrokerHaveListSave(recommended_list_id,selectArray){
        let that = this;
        if (!recommended_list_id) {
          that.$notify.error({
            showClose: true,
            message: that.$t('table.selectRecommendedListText'),
          });
          return;
        }
        let saveData={
          // ids: JSON.stringify(selectArray),
          ids: selectArray,
          recommend_id:recommended_list_id,
        };
        haverecommendListAppend(saveData).then(response => {
          that.selectBuyerBroker = false;
          console.log('haverecommendListAppend', response);
          that.$notify({
            showClose: true,
            message: that.$t('Successful'),
            type: 'success'
          });
        }).catch(err => {
          that.selectBuyerBroker = false;
          console.log(err);
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
      // 打印
      handlePrinter(num) {
        let that = this;
        this.pdfLoading = true;
        businessGeneratePdf({data: {ids: JSON.stringify(this.selectArray)}, num: num}).then(response => {
          console.log('businessGeneratePdf' + num, response);
          const contents = response;
          const blob = new Blob([contents]);
          if (window.location.origin.indexOf('dev.newdreamservices.com') !== -1 || window.location.origin.indexOf('business.newdreamservices.com') !== -1) {
            window.open('/web/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
          } else {
            window.open('/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
          }
          that.pdfLoading = false;
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
      //打开更改经纪人弹窗
      changeBroker(row) {
        let that = this;
        if (row) {
          this.business_id = row.row.id;
        }
        this.selectBusinessBroker = true;
        this.brokerListLoading = true;
        getBusinessbrokersList().then(response => {
          that.brokerListLoading = false;
          console.log('getBusinessbrokersList', response);
          that.BusinessBrokerList = response.data;
        }).catch(err => {
          that.brokerListLoading = false;
          console.log(err);
        })
      },
      // 更改经纪人提交
      changeBrokerSave(business_id, owner_id) {
        let that = this;
        if (!owner_id) {
          that.$notify.error({
            showClose: true,
            message: that.$t('table.changeBrokerText'),
          });
          return;
        }
        changeBusinessbrokerSave({business_id: business_id, owner_id: owner_id}).then(response => {
          that.selectBusinessBroker = false;
          that.getList();
          console.log('changeBusinessbrokerSave', response);
          that.$notify({
            showClose: true,
            message: that.$t('Successful'),
            type: 'success'
          });
        }).catch(err => {
          that.selectBusinessBroker = false;
          console.log(err);
        })
      },

      //打开选择意向buyer弹窗
      openSelectBuyer(row) {
        let that = this;
        this.selectBuyer = true;
        if (row) {
          this.business_id = row.row.id;
        }
        this.buyerListLoading = true;
        getBuyers().then(response => {
          that.buyerListLoading = false;
          console.log('getBuyers', response);
          that.buyerList = response.data;
        }).catch(err => {
          that.buyerListLoading = false;
          console.log(err);
        })
      },
      // 提交到意向企业
      AddAttention(business_id, buyer_id) {
        let that = this;
        if (!buyer_id) {
          that.$notify.error({
            showClose: true,
            message: that.$t('ChooseAttentionBuyer'),
          });
          return;
        }
        setAttentionBusiness({business_id: business_id, buyer_id: buyer_id}).then(response => {
          console.log('setAttentionBusiness', response);
          that.selectBuyer = false;
          that.$notify({
            showClose: true,
            message: that.$t('Successful'),
            type: 'success'
          });
        }).catch(err => {
          that.selectBuyer = false;
          console.log(err);
        })
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
      handleCreate() {
        this.$router.push({path: `/employerEdit/index`});
      },

      // 获取待售企业列表
      getList(data) {
        let that = this;
        this.listLoading = true;
        getBusinessList(data).then(response => {
          console.log('getBusinessList', response);
          that.listLoading = false;
          that.total = response.data.total;
          that.tableData = response.data.data;
        }).catch(err => {
          console.log(err);
          that.listLoading = false
        })
      },
      // 获取筛选指定经纪人列表
      getBrokersList(data) {
        let that = this;
        getBusinessbrokersList(data).then(response => {
          console.log('getBusinessbrokersList', response);
          that.businessBrokerList = response.data;
        }).catch(err => {
          console.log(err);
        })
      },

      handleEdit(index, row) {
        console.log(123123, row);
        this.$router.push({path: '/employerEdit/index', query: {id: row.row.id}});
      },
      handleChangePublic(row) {
        let that = this;
        let data = {business_id: row.row.id, public: row.row.public == 1 ? 0 : 1};
        that.$confirm(that.$t('changeMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          this.listLoading = true;
          changePublic(data).then(response => {
            console.log('修改发布状态', response);
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
        }).catch(action => {
        });
      },
      handleDelete(index, row) {
        let that = this;
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delBusiness({id: row.row.id}).then(response => {
            console.log('delBuyer', response);
            that.getList();
            that.listQuery.page = 1;
            that.$notify({
              showClose: true,
              message: that.$t('deleted'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(action => {
        });
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
