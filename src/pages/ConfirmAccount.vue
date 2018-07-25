<template lang="pug">
  v-layout(row wrap)
    v-flex.p20(v-if="state.valid" xs12 sm12 md12 column align-center justify-space-between)
      ManagePw(:isExisting="false" @passChanged="confirmAccount($event)")
    div(v-else)
      .fs20 Invalid token, sorry...
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
        password: passwordData.newPassword
      }
      this.$api.confirmAccount(confirmObj)
        .then(res => {
          if (res.success) {
            this.$router.push({ name: 'login' })
          }
        })
    }
  },
  components: {
    ManagePw
  }
}
</script>
