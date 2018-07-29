<template lang="pug">
  v-layout(row wrap)
    v-flex.p20(v-if="state.valid" xs12 sm12 md12 column align-center justify-center)
      .p20
        h2 Confirm your account
        h4 Create a password so we can get started
      ManagePw(:isExisting="false" @passChanged="confirmAccount($event)")
    .p20.text-center.w100(v-else)
      .fs22 Invalid token, sorry...
</template>

<script>
import ManagePw from '@/components/profile/ManagePw'

export default {
  props: {
    state: {
      type: Object,
      default: {
        valid: false,
        token: ''
      }
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    confirmAccount(passwordData) {
      const confirmObj = {
        token: this.state.token,
        password: passwordData.passData.newA
      }

      this.$api.confirmAccount(confirmObj)
        .then(res => {
          if (res.success) {
            if (!this.isLoggedIn) { // workaround
              this.$router.push({ name: 'login' })
            } else {
              this.$router.push({ name: 'home' })
            }
          }
        })
    }
  },
  components: {
    ManagePw
  }
}
</script>
