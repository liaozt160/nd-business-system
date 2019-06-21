<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import buyerDashboard from './buyer/buyer'
import businessDashboard from './business/business'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard,buyerDashboard,businessDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('admin')) {
      this.currentRole = 'adminDashboard'
    }else if(this.roles.includes('buyer_broker')){
      this.currentRole = 'buyerDashboard'
    }else if(this.roles.includes('business_broker')){
      this.currentRole = 'businessDashboard'
    }else{
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
