
<template>
  <div class="app-container" v-loading="pdfLoading">
    <aside>
      <h3 style="text-align: center;">{{$t('route.attentionBusiness')}}</h3>
    </aside>
    <div class="filter-container">
      <el-select size="small" v-model="listQuery.status" :placeholder="$t('table.status')" style="width: 130px;margin-right: 15px;" class="filter-item" @change="handleFilter" clearable>
        <el-option :label="$t('table.all')" value="0" />
        <el-option :label="$t('table.forSale')" value="1" />
        <el-option :label="$t('table.soldOut')" value="2" />
        <el-option :label="$t('employeeEdit.noVerified')" value="3" />
      </el-select>
      <el-select size="small" v-if="role==1" v-model="listQuery.recommend_by_me" :placeholder="$t('recommender')" style="width: 130px;margin-right: 15px;" class="filter-item" @change="handleFilter" clearable>
        <el-option :label="$t('table.all')" value="0" />
        <el-option :label="$t('myRecommendation')" value="1" />
      </el-select>

      <div class="filter-item el-select--medium">
        <el-select size="small" v-model="listQuery.buyers" :placeholder="$t('route.buyers')" style="width: 180px;margin-right: 15px;margin-bottom: 0;" class="filter-item" @change="handleFilter" clearable>
          <el-option :label="$t('table.all')" value="0" />
          <el-option v-for="item in buyerListData" :label="item.label" :value="item.key" />
        </el-select>
      </div>

      <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      <el-button  size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>

      <el-button size="small" :disabled="selectArray.length==0"  class="filter-item" type="primary" icon="el-icon-printer" @click="handlePrinter">
        {{$t('order.Print')}}
      </el-button>
      <el-button size="small" :disabled="selectArray.length==0"  class="filter-item" type="primary" icon="el-icon-chat-line-square" @click="openSendEmail">
        {{$t('order.sendEmail')}}
      </el-button>
      <el-button size="small" :disabled="selectArray.length==0"  class="filter-item" type="danger" icon="el-icon-delete" @click="handleDelete(selectArrayDel)">
        {{$t('table.delete')}}
      </el-button>

    </div>

    <!--列表-->
    <div class="companyTable">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          fixed="left"
          width="50">
        </el-table-column>
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
          min-width="200">
          <template slot-scope="scope">
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
            <el-tag type="info" v-if="row.status==2">{{ $t('table.soldOut') }}</el-tag>
            <el-tag type="info" v-if="row.status==3">{{ $t('employeeEdit.noVerified') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          :label="$t('recommender')"
          v-if="role==1"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="buyer"
          align="center"
          :label="$t('AttentionBuyer')"
          min-width="200">
        </el-table-column>

        <el-table-column
          prop="created_at"
          align="center"
          :label="$t('table.entryTime')"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('table.operate')"
          fixed="right"
          min-width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope)">{{$t('table.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :pageSize.sync="pageSize" @pagination="getList(listQuery)" />
    </div>


    <!--// 发送邮件弹窗-->
    <el-dialog :title="$t('order.sendToBuyer')" :visible.sync="selectBusinessBroker" width="500px" center
               :close-on-click-modal="false">
      <el-select v-model="buyer_id_index" :placeholder="$t('table.selectBuyerText')" clearable style="width: 100%" class="filter-item" v-loading="brokerListLoading">
        <el-option v-for="(item,index) in buyersEmailList" :label="item.label" :value="index" />
      </el-select>
      <h3 style="text-align: center;" v-if="buyer_id_index!==''">{{buyersEmailList[buyer_id_index].email}}</h3>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectBusinessBroker = false">{{ $t('table.cancel') }}</el-button>
        <el-button :disabled="buyer_id_index===''" v-loading="sendLoading" type="primary" @click="handleSendEmail(selectArray,buyersEmailList[buyer_id_index].key)">{{ $t('order.sendEmail') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import { buyerAttentionList,delBuyerAttention,adminGetBuyerAttentionList,attentionPdf,getBuyerList,attentionEmailPdf,getSendBuyerList } from '@/api/buyers'
  import { getBuyers } from '@/api/business'
  export default {
    name: "attentionBusiness",
    components:{
      Pagination
    },
    data(){
      return{
        pdfLoading: false,

        sendLoading:false,
        selectBusinessBroker:false,
        brokerListLoading:false,
        buyersEmailList: [],
        buyer_id: '',
        buyer_id_index: '',

        role: '',
        selectArray:[],
        selectArrayDel:[],

        listQuery: {
          page: 1,
          recommend_by_me: '',
          status: '',
          price_from:'',
          price_to:'',
          q:'',
        },
        listLoading: false,
        total: 1,
        pageSize: 15,
        tableData: [],

        buyerListData: [],
      }
    },
    mounted(){
      this.getList();
      this.getBuyerListFun();
      this.role = store.getters && store.getters.role
    },
    methods:{
      // 选择事件
      handleSelectionChange(selectData){
        this.selectArray=[];
        this.selectArrayDel=[];
        for(let i=0,len=selectData.length;i<len;i++){
          this.selectArray.push(selectData[i].business_id);
          this.selectArrayDel.push(selectData[i].id)
        }
        console.log(selectData,this.selectArray,this.selectArrayDel)
      },
      // 打印
      handlePrinter(){
        let that = this;
        this.pdfLoading=true;
        attentionPdf({ids:JSON.stringify(this.selectArray)}).then(response => {
          console.log('attentionPdf', response);
          const contents = response;
          const blob = new Blob([contents]);
          if (window.location.origin.indexOf('dev.newdreamservices.com') !== -1||window.location.origin.indexOf('business.newdreamservices.com') !== -1) {
            // window.open('/web/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));
            window.open (response.data.url, "_blank", "top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
          } else{
            // window.open('/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)));

            window.open (response.data.url, "newwindow", " top=100, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
          }
          that.pdfLoading=false;
        }).catch(err => {
                    console.log(err);
        })
      },

      //打开发送邮件弹窗,获取当前账号管理的买家
      openSendEmail() {
        let that = this;
        this.selectBusinessBroker = true;
        this.brokerListLoading = true;
        getSendBuyerList().then(response => {
          that.brokerListLoading = false;
          console.log('getSendBuyerList', response);
          that.buyersEmailList = response.data;
        }).catch(err => {
          that.brokerListLoading = false;
          console.log(err);
        })
      },
      // 发送邮件
      handleSendEmail(row,buyer_id){
        let that = this;
        let id='';
        if(Object.prototype.toString.call(row).indexOf('Array')!==-1){
          id=JSON.stringify(row);
          console.log('数组',row)
        }else{
          id='['+row.row.id+']';
          console.log('非数组')
        }
        that.sendLoading=true;
        attentionEmailPdf ({ids:id,buyer_id:buyer_id}).then(response => {
          console.log('attentionEmailPdf',response);
          that.$notify({
            showClose: true,
            message: that.$t('Successful'),
            type: 'success'
          });
          that.sendLoading=false;
          that.selectBusinessBroker = false;
        }).catch(err => {
          console.log(err);
          that.sendLoading=false;
        })
      },
      // 筛选
      handleFilter() {
        this.listQuery.page = 1;
        this.getList(this.listQuery);
      },
      // 多选删除
      handleDelete(row) {
        let that = this;
        let id='';
        if(Object.prototype.toString.call(row).indexOf('Array')!==-1){
          id=JSON.stringify(row);
          console.log('数组',row)
        }else{
          id='['+row.row.id+']';
          console.log('非数组')
        }

        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delBuyerAttention ({ids:id}).then(response => {
            console.log('delBuyerAttention',response);
            that.listQuery.page=1;
            that.getList(that.listQuery);
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
      // 获取买家意向企业列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        if(store.getters && store.getters.role==1){
          adminGetBuyerAttentionList (data).then(response => {
            console.log('adminGetBuyerAttentionList',response);
            that.listLoading = false;
            that.total=response.data.total;
            that.tableData=response.data.data;
          }).catch(err => {
            console.log(err);
            that.listLoading = false
          })
        }else{
          buyerAttentionList (data).then(response => {
            console.log('buyerAttentionList',response);
            that.listLoading = false;
            that.total=response.data.total;
            that.tableData=response.data.data;
          }).catch(err => {
            console.log(err);
            that.listLoading = false
          })
        }

      },

      // 获取买家列表
      getBuyerListFun() {
        let that=this;
        getBuyers ().then(response => {
          console.log('getBuyers',response);
          that.buyerListData=response.data;
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
