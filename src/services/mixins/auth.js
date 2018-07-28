export default {
  created() {
    this.onEvent('authenticate', (res) => {
      this.$store.dispatch('login', this.$echoClient.authToken)
      this.emitAndSub('hasReady', {}, (res) => {
        this.$store.dispatch('hasReady', res.hasReady)
      })
    })

    this.onEvent('deauthenticate', (res) => {
      this.$store.dispatch('logout')
      this.emitAndSub('hasReady', {}, (res) => {
        this.$store.dispatch('hasReady', res.hasReady)
      })
    })

    this.onEvent('connect', (res) => {
      this.$store.dispatch('connect')
    })
  }
}