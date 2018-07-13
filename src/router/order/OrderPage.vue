<template lang="pug">
Page(:loginReq="true")
  .w60.p30-top(style="margin:auto")
    Order(:sessionData="sessionData")
</template>
<script>

import Page from '@/components/common/Page'
import Order from '@/pages/Order'

export default {
  created() {
    this.sessionData = this.$store.getters.pendingPurchase
    this.$store.dispatch('clearPendingPurchase')
  },
  data: () => ({
    sessionData: null
  }),
  components: {
    Page,
    Order
  }
}
</script>

