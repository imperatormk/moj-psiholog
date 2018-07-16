<template lang="pug">
  Page.p30-top
    div(v-if="loaded")
      .flex-row(v-if="valid")
        .flex-1
        .flex-1
          ManagePw(:isExisting="false" @passChanged="confirmAccount($event)")
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
    this.token = token
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
      token: null,
      loaded: false,
      valid: false
    }
  },
  methods: {
    confirmAccount(passwordData) {
      const confirmObj = {
        token: this.token,
        password: passwordData.newPassword
      }
      this.$api.confirmAccount(confirmObj)
        .then(res => console.log(res))
    }
  },
  components: {
    Page,
    ManagePw
  }
}
</script>

