<template>
  <div class="app-container" v-loading="pdfLoading" style="z-index: 9999">
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
        @sort-change="sortChange">
        <el-table-column
          prop="title"
          align="center"
          :label="$t('table.ListName')"
          min-width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top-start">
                <span
                  style="display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;width:200px">{{scope.row.name}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="broker_name"
          align="center"
          :label="$t('userEdit.buyerBroker')"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="buyer_name"
          align="center"
          :label="$t('panelGroup.Buyer')"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="updated_at"
          align="center"
          :label="$t('table.time')"
          sortable
          min-width="160">
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="260">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button size="mini" type="primary" >
                {{$t('order.Print')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="menuItem"><span @click.stop="handlePrinter('1',scope)">{{$t('order.PrintOne')}}</span></el-dropdown-item>
                <el-dropdown-item v-if="role==1" class="menuItem"><span @click.stop="handlePrinter('2',scope)">{{$t('order.PrintTwo')}}</span></el-dropdown-item>
                <el-dropdown-item v-if="role==1" class="menuItem"><span @click.stop="handlePrinter('3',scope)">{{$t('order.PrintThree')}}</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="mini" type="primary" @click="handleDetail(scope.row.id)" style="margin-left: 10px">{{$t('detail')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope)">{{$t('table.delete')}}</el-button>
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

    <!--查看清单详情弹窗-->
    <el-dialog :title="$t('table.recommendedListDetail')" :visible.sync="dialogListDetail" width="1000px"
               style="padding-bottom: 50px" center :close-on-click-modal="false">
      <div style="padding-bottom: 100px" v-loading="listDetailLoading">
        <div style="font-weight: bold;margin: 20px 0;">{{$t('table.listOfRecommendedBusinesses')}}</div>
        <el-table
          v-loading="listLoading"
          :data="ListDetailData"
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
            prop="category"
            align="center"
            :label="$t('employeeEdit.business_category')"
            min-width="180">
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
            prop=""
            align="center"
            :label="$t('table.operate')"
            fixed="right"
            min-width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleListDetailDelete(scope.$index,scope)">{{$t('table.delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    getRecommendList,
    recommendListDel,
    recommendListDetailDel,
    getRecommendListDetail,
    businessGeneratePdf,
    recommendPdf,
  } from '@/api/business'
    export default {
        name: "tipsAndRecommendations",
      components: {
        Pagination
      },
      data() {
        return {
          role: '',

          dialogListDetail: false,
          listDetailLoading: false,
          ListDetailData:[],

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
          tableData:  [],

          buyerListLoading: false,
          selectBuyer: false,
          buyerList: [],
          business_id: '',
          selectBuyerId: '',
          businessBrokerList: [],

          pdfLoading: false,
          selectArray: [],
          recommend_id: '',

        }
      },
      mounted() {
        this.listQuery.page = 1;
        this.getList();
        this.role = store.getters && store.getters.role
      },
      methods:{
          // 打印清单里的企业信息
        handlePrinter(num,scope) {
          let that = this;
          this.pdfLoading = true;
          console.log(123,num,scope);

          // let pdfUrl='https://newdreamservices-web.s3.ap-northeast-2.amazonaws.com/temp/test.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIIX5OH26BWAJTF3A%2F20191017%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20191017T101234Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=48133380e54eb7378b7d541f1089d6f56a5853167c34e7e6b1754e6be14edec9';
          // window.open (pdfUrl, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");



          recommendPdf({data: {id: scope.row.id}, num: num}).then(response => {
            console.log('recommendPdf' + num, response);
            const contents = response;
            const blob = new Blob([contents]);
            if (window.location.origin.indexOf('dev.newdreamservices.com') !== -1 || window.location.origin.indexOf('business.newdreamservices.com') !== -1) {
              window.open('/web/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
              // window.open (response.data.url, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
            } else {
              window.open('/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
              // window.open (response.data.url, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
            }
            that.pdfLoading = false;
          }).catch(err => {
            console.log(err);
          })
        },
        // 获取提示推荐清单列表
        getList(data) {
          let that = this;
          this.listLoading = true;
          getRecommendList(data).then(response => {
            console.log('getRecommendList', response);
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

        // 清单详情
        handleDetail(recommend_id){
          let that = this;
          that.listDetailLoading=true;
          that.dialogListDetail=true;
          that.recommend_id=recommend_id;
          getRecommendListDetail({recommend_id: recommend_id}).then(response => {
            console.log('getRecommendListDetail', response);
            that.listDetailLoading=false;
            that.ListDetailData=response.data.data;
          }).catch(err => {
            that.listDetailLoading=false;
            console.log(err);
          })
        },
        // 清单删除
        handleDelete(index, row) {
          let that = this;
          that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
            distinguishCancelAndClose: true,
            confirmButtonText: that.$t('confirm'),
            cancelButtonText: that.$t('cancel')
          }).then(() => {
            recommendListDel({id: row.row.id}).then(response => {
              console.log('recommendListDel', response);
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

        // 清单详情单个企业信息删除
        handleListDetailDelete(index, row) {
          let that = this;
          that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
            distinguishCancelAndClose: true,
            confirmButtonText: that.$t('confirm'),
            cancelButtonText: that.$t('cancel')
          }).then(() => {
            recommendListDetailDel({recommend_id: that.recommend_id,ids: [row.row.id]}).then(response => {
              console.log('recommendListDetailDel', response);
              that.$notify({
                showClose: true,
                message: that.$t('deleted'),
                type: 'success'
              });
              that.handleDetail(that.recommend_id);
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
