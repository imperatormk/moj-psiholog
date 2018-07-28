<template lang="pug">
  v-layout(row fill-height align-center justify-center)
    v-flex(md6)
      .flex-col.space-around.align-center.p20.tiny-border
        h1 Login
        v-text-field.w100(color="light-green" type="email" v-model="creds.email" @keyup.enter="login" hide-details placeholder="Email")
        v-text-field.w100(color="light-green" v-model="creds.password" @keyup.enter="login" hide-details type="password" placeholder="Password")
        .p10(v-if="error")
          span {{ error }}
        v-btn(@click="login" outline) Login
</template>

<script>

export default {
  data: () => ({
    creds: {
      email: '',
      password: ''
    },
    error: null
  }),
  watch: {
    creds: {
      handler() { this.error = null },
      deep: true
    }
  },
  methods: {
    login() {
      this.$store.dispatch('loginAttempt', null)
      this.emitAndSub('login', {
        email: this.creds.email,
        password: this.creds.password
      }, (res) => {
        if (!res.success) {
          const messages = { // a better way?
            invalidCreds: 'Invalid login details, please try again',
            activateFirst: 'Please activate your account first',
            alreadyLoggedIn: 'Already logged in'
          }
          this.error = messages[res.msg]
        } else {
          this.$store.dispatch('login', this.$echoClient.authToken)
        }
      })
    }
  }
}
</script>
