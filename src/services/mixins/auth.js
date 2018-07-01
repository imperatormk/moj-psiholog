export default {
  created() {
    this.onEvent('authenticate', (res) => {
      console.log('authenticated')
      this.$store.dispatch('login', this.$echoClient.authToken)
    })

    this.onEvent('deauthenticate', (res) => {
      console.log('deauthenticated')
      this.$store.dispatch('logout')
    })

    this.onEvent('connect', (res) => {
      console.log('connected')
      this.$store.dispatch('connect')
    })
  }
}