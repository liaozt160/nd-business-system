<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="daishou" class-name="card-panel-icon"  style="width: 80px;"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{$t('route.businessForSales')}}
          </div>
          <count-to :start-val="0" :end-val="PanelData.business" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="gerenpay" class-name="card-panel-icon"  style="width: 80px;"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{$t('panelGroup.Buyer')}}
          </div>
          <count-to :start-val="0" :end-val="PanelData.buyers" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="yishou" class-name="card-panel-icon" style="width: 80px;" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <!--意向企业-->
            {{$t('panelGroup.attentionBusiness')}}
          </div>
          <count-to :start-val="0" :end-val="PanelData.attentions" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <!--<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
      <!--<div class="card-panel">-->
        <!--<div class="card-panel-icon-wrapper icon-shopping">-->
          <!--<svg-icon icon-class="chengjiao" class-name="card-panel-icon" style="width: 80px;"/>-->
        <!--</div>-->
        <!--<div class="card-panel-description">-->
          <!--<div class="card-panel-text">-->
            <!--{{$t('panelGroup.TotalTurnover')}}-->
          <!--</div>-->
          <!--<count-to :start-val="0" :end-val="2368" :duration="2000" prefix="$ " suffix=" K" class="card-panel-num" />-->
        <!--</div>-->
      <!--</div>-->
    <!--</el-col>-->
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

import { getPanelDataApi } from '@/api/account'
export default {
  components: {
    CountTo
  },
  data(){
    return{
      PanelData:''
    }
  },
  mounted(){
    this.getPanelData();
  },
  methods: {
    getPanelData(){
      let that=this;
      getPanelDataApi ().then(response => {
        console.log('getPanelDataApi',response);
        that.PanelData=response.data;
      }).catch(err => {
        console.log(err);
      })
    }
    // handleSetLineChartData(type) {
    //   this.$emit('handleSetLineChartData', type)
    // }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;

  }
  .card-panel {
    display: flex;
    justify-content: space-between;
    /*min-width: 250px;*/
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px;
      padding: 16px 10px 16px 10px ;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 20px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
