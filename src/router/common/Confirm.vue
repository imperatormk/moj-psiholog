<template lang="pug">
  Page(:loaded="loaded")
    ConfirmAccount(:state="state")
</template>

<script>

import Page from '@/components/common/Page'
import ConfirmAccount from '@/pages/ConfirmAccount'

export default {
  created() {
    const token = this.$route.params.token
    this.state.token = token
    if (token) {
      this.$api.verifyConfirmToken({ token })
        .then(res => {
          this.state.valid = res.valid
          this.loaded = true
        })
    }
  },
  data() {
    return {
      loaded: false,
      state: {}
    }
  },
  components: {
    Page,
    ConfirmAccount
  }
}
</script>

