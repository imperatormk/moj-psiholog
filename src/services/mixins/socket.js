export default {
  methods: {
    emitEvent(name, data) {
      this.$echoClient.emit(name, data)
    },
    onEvent(name, cb) {
      this.$echoClient.on(name, (data) => {
        cb(data)
      })
    },
    offEvent(name) { // might need handler too
      this.$echoClient.off(name)
    },
    subscribe(name, cb, opts) {
      this.$echoClient.subscribe(name, opts || {}).watch((data) => {
        cb(data)
      })
    },
    unsubscribe(name) {
      this.$echoClient.unsubscribe(name)
    },
    emitAndSub(name, data, cb) {
      this.$echoClient.emit(name, data, (err, res) => {
        cb(res)
      })
    },
    getChannel(name) {
      return this.$echoClient.channel(name)
    },
    // move these
    goToHome() {
      this.$router.push({ name: 'home' })
    },
    goToLogin() {
      this.$router.push({ name: 'login' })
    },
    logout() {
      this.emitAndSub('logout', {}, (res) => {
        this.$store.dispatch('logout')
      })
    },
  },
  computed: {
    isConnected() {
      return this.$store.getters.isConnected
    },
    // move these
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    userId() {
      return this.$store.getters.authData && this.$store.getters.authData.id
    },
    userType() {
      return this.$store.getters.authData && this.$store.getters.authData.type
    },
    userEmail() {
      return this.$store.getters.authData && this.$store.getters.authData.email
    },
    isDoctor() {
      return this.userType === 'doctor'
    },
    isPatient() {
      return this.userType === 'patient'
    },
    patientId() {
      return this.isPatient ? `patient-${this.userId}` : null
    },
    hasReady() {
      return this.$store.getters.hasReady
    },
    testResults() { // this is way too global
      return this.$store.getters.testResults
    }
  }
}