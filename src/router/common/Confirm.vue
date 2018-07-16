<template lang="pug">
  Page.p30-top
    div(v-if="loaded")
      .flex-row(v-if="valid")
        .flex-1
        .flex-1
          ManagePw(:isExisting="false")
        .flex-1
      div(v-else)
        .fs20 Invalid token, sorry...
</template>

<script>

import Page from '@/components/common/Page'
import ManagePw from '@/components/profile/ManagePw'

export default {
  created() {
    const token = this.$route.params.token
    if (token) {
      this.$api.verifyConfirmToken({ token })
        .then(res => {
          this.valid = res.valid
          this.loaded = true
        })
    }
  },
  data() {
    return {
      loaded: false,
      valid: false
    }
  },
  components: {
    Page,
    ManagePw
  }
}
</script>

