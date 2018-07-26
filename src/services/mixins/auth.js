export default {
  created() {
    this.onEvent('authenticate', (res) => {
      this.$store.dispatch('login', this.$echoClient.authToken)
    })

    this.onEvent('deauthenticate', (res) => {
      this.$store.dispatch('logout')
    })

    this.onEvent('connect', (res) => {
      this.$store.dispatch('connect')
    })
  }
}