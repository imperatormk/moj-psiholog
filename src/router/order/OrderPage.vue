<template lang="pug">
Page(:loginReq="true")
  .w60.p30-top(style="margin:auto")
    Order(v-if="!isDoctor" :sessionData="sessionData")
    div(v-else)
      h2 Uh oh! Only patients can order a session at the moment... sorry!
</template>
<script>

import Page from '@/components/common/Page'
import Order from '@/pages/Order'

export default {
  created() {
    this.sessionData = this.$store.getters.pendingPurchase
    this.$store.dispatch('clearPendingPurchase')
  },
  data() {
    return {
      sessionData: null
    }
  },
  components: {
    Page,
    Order
  }
}
</script>

