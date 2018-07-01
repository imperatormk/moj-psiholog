<template lang="pug">
  .flex-col.space-around.align-center.m200.p20.tiny-border
    h1 Login
    v-text-field(v-model="creds.email" placeholder="Email")
    v-text-field(v-model="creds.password" type="password" placeholder="Password")
    v-btn(@click="login") Login
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
