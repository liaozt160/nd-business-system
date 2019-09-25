<template>
  <div class="app-container" v-loading="pdfLoading">
    <aside>
      <h3 style="text-align: center;">{{$t('route.contactUs')}}</h3>
    </aside>
    <div class="filter-container">

      <el-input size="small" v-model="listQuery.q" :placeholder="$t('table.search')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" clearable/>
      <el-button  size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
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
          prop="name"
          align="center"
          :label="$t('table.name')"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          :label="$t('table.email')"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          :label="$t('table.phone')"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="role"
          align="center"
          :label="$t('Identity')"
          min-width="100">
          <template slot-scope="{row}">
            <el-tag type="primary" v-if="row.role==1">{{ $t('intentionBuyer') }}</el-tag>
            <el-tag type="primary" v-if="row.role==2">{{$t('buyerAdvisor') }}</el-tag>
            <el-tag type="primary" v-if="row.role==3">{{ $t('sellerIntermediary') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          :label="$t('userEdit.UserNotes')"
          min-width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top-start">
              <span style="display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.remark}}</span>
            </el-tooltip>
          </template>
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
  </div>
</template>

<script>
  import store from '@/store'
  import Pagination from '@/components/Pagination'
  import { contactUsListApi, delContactUsListApi } from '@/api/account'
  export default {
    name: "contactUs",
    components:{
      Pagination
    },
    data(){
      return{
        pdfLoading: false,

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
          id=row;
          console.log('数组',row)
        }else{
          id=[row.row.id];
          console.log('非数组')
        }
        that.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          delContactUsListApi ({ids:id}).then(response => {
            console.log('delContactUsListApi',response);
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
      // 获取联系我们表格列表
      getList(data) {
        let that=this;
        this.listLoading = true;
        contactUsListApi (data).then(response => {
          console.log('contactUsListApi',response);
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
    width: 40%;
  }
</style>

