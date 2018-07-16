<template lang="pug">
  Page.p30-top
    div(v-if="loaded")
      div(v-if="valid")
        span Valid
      div(v-else)
        span Invalid
</template>

<script>

import Page from '@/components/common/Page'

export default {
  created() {
    const token = this.$route.params.token
    if (token) {
      this.$api.verifyConfirmToken({ token })
        .then(res => {
          this.valid = res.isValid
          this.loaded = true
          console.log(res)
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
    Page
  }
}
</script>

