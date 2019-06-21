<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <!--<el-pagination-->
      <!--:background="background"-->
      <!--:current-page.sync="currentPage"-->
      <!--:page-size.sync="pageSize"-->
      <!--:layout="layout"-->
      <!--:page-sizes="pageSizes"-->
      <!--:total="total"-->
      <!--v-bind="$attrs"-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
    <!--/>-->

    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  text-align: center;
}
.pagination-container.hidden {
  display: none;
}
</style>
