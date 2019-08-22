<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.tipsAndRecommendations')}}</h3>
    </aside>
    <div class="filter-container">
      <div class="filter-item el-select--medium">
        <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')"
                  style="width: 200px;margin-bottom: 0;" class="filter-item" @keyup.enter.native="handleFilter"
                  clearable/>
        <el-button size="small" class="filter-item" style="margin-bottom: 0;" type="primary" icon="el-icon-search"
                   @click="handleFilter">{{ $t('table.search') }}
        </el-button>
      </div>
      <div class="filter-item el-select--medium" style="margin-left: 10px">

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
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        style="width: 100%">
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
          min-width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.address" placement="top-start">
                <span
                  style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:150px">{{scope.row.address}}</span>
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
          prop=""
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="180">
          <template slot-scope="scope" v-if="!scope.row.companyList">
            <el-dropdown trigger="click">
              <el-button size="mini" type="primary" plain>
                {{$t('table.moreOperations')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
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
    changeBusinessbrokerSave
  } from '@/api/business'
    export default {
        name: "tipsAndRecommendations",
      components: {
        Pagination
      },
      data() {
        return {
          role: '',

          listQuery: {
            broker_id: '',
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
          tableData:  [
            {id: 11, listing: "1111111", title: "11111 推荐清单", company: "5 推荐清单", price: "5家企业",
              children: [
                {companyList:true,id: 22, listing: "2222222", title: "22222 洛杉矶市中心非常繁忙的家电维修", company: "5 家电维修", price: "595000"},
                {companyList:true,id: 33, listing: "333333", title: "333333 洛杉矶市中心非常繁忙的家电维修", company: "5 家电维修", price: "595000"},
                {companyList:true,id: 44, listing: "333333", title: "333333 洛杉矶市中心非常繁忙的家电维修", company: "5 家电维修", price: "595000"},
                {companyList:true,id: 55, listing: "333333", title: "333333 洛杉矶市中心非常繁忙的家电维修", company: "5 家电维修", price: "595000"},
                {companyList:true,id: 88, listing: "333333", title: "333333 洛杉矶市中心非常繁忙的家电维修", company: "5 家电维修", price: "595000"}
                ]},
            {id: 66, listing: "LA066666", title: "5 洛杉矶市中心非常繁忙的家电维修", company: "5 家电维修", price: "595000",},
            {id: 77, listing: "LA066666", title: "5 洛杉矶市中心非常繁忙的家电维修", company: "5 家电维修", price: "595000",},
            ],

          buyerListLoading: false,
          selectBuyer: false,
          buyerList: [],
          business_id: '',
          selectBuyerId: '',
          businessBrokerList: [],

        }
      },
      mounted() {
        this.listQuery.page = 1;
        // this.getList();
        this.role = store.getters && store.getters.role
      },
      methods:{
        // 选择事件
        handleSelectionChange(selectData) {
          this.selectArray = [];
          for (let i = 0, len = selectData.length; i < len; i++) {
            this.selectArray.push(selectData[i].id);
          }
          console.log(selectData, this.selectArray)
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
