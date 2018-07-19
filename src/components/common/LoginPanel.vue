<template lang="pug">
  v-layout(row fill-height align-center justify-center)
    v-flex(md6)
      .flex-col.space-around.align-center.p20.tiny-border
        h1 Login
        v-text-field.w100(v-model="creds.email" hide-details placeholder="Email")
        v-text-field.w100(v-model="creds.password" hide-details type="password" placeholder="Password")
        v-btn(@click="login" outline) Login
</template>

<script>

export default {
  data: () => ({
    creds: {
      email: '',
      password: ''
    }
  }),
  methods: {
    login() {
      this.$store.dispatch('loginAttempt', null)
      this.emitAndSub('login', {
        email: this.creds.email,
        password: this.creds.password
      }, (res) => {
        this.$store.dispatch('login', this.$echoClient.authToken)
      })
    }
  }
}
</script>
