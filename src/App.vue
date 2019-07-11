<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
  .demo-table-expand .el-form-item__label{
    line-height: 20px!important;
    margin: 8px 0;
  }
  .el-form-item--medium .el-form-item__label{
    line-height: 20px!important;
  }
  .demo-table-expand .el-form-item__content{
    line-height: 20px!important;
    margin: 8px 0!important;
  }
  .transfer .el-transfer-panel,.netTransfer .el-transfer-panel{
    width: 277px;
  }
</style>
