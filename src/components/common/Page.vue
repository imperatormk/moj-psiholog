<template lang="pug">
  v-app
    v-snackbar(v-model="alert.show" top multi-line :timeout="alert.timeout")
      span {{ alert.message }}
    v-toolbar.sticky-top(app flat color="blue-grey darken-3")
      v-toolbar-title
        span.hoverable.font-white(@click="goToHome()") Moj Psiholog
      v-spacer
      v-toolbar-items
        v-btn(@click="goToHome()" flat)
          span.font-white Home
        v-btn(@click="navigateTo('video-chat')" flat)
          span.font-white Video Chat
        v-btn(flat v-if="!isLoggedIn" @click="goToLogin()")
          span.font-white Log in
        .flex-col.space-around(v-if="isLoggedIn")
          v-menu(v-model="showDropdown" offset-y)
            v-btn(slot="activator" flat)
              .font-white
                v-icon menu
            v-list
              v-list-tile
                v-btn(flat @click="navigateTo('profile')") My Profile
              v-list-tile
                v-btn(flat @click="logout()") Log out
    v-content(style="padding:0")
      v-container(fluid fill-height style="padding:0")
        .fit(v-if="isAllowed")
          .fit(v-if="isConnected && isLoaded")
            slot(v-if="!loginReq || isLoggedIn")
            LoginPanel(v-else-if="loginReq && !isLoggedIn")
          .align-center.justify-center(v-else)
            .p10
              h1 Connecting or loading or something else...
        .fit(v-else)
          h1 Not allowed, sorry...
</template>

<script>

import LoginPanel from '@/components/common/LoginPanel'

export default {
  props: {
    loginReq: {
      type: Boolean,
      default: false
    },
    roles: { // TODO: implement this
      type: Array,
      default: null
    },
    loaded: { // TODO: implement this - done?
      type: Boolean,
      default: true
    }
  },
  created() {
    this.$messageBus.$on('alert', this.alertHandler)
    this.onReadyChange(this.isAuth)
    this.socketLoaded = true
  },
  destroyed() {
    this.$messageBus.$off('alert', this.alertHandler)
  },
  watch: { // a bit experimental
    isAuth(val) {
      if (this.socketLoaded) { this.onReadyChange(val) }
    }
  },
  data() {
    return {
      showDropdown: false,
      alert: {
        show: false,
        message: '',
        duration: 5000
      },
      socketLoaded: false,
      pageLoadedMaster: false // lol
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push({ name: path })
    },
    alertHandler(dataObj) {
      if (this.alert.show) return // prevent duplicates which would overwrite the former
      this.alert = {
        ...this.alert,
        ...dataObj
      }
      this.alert.show = true
      
      setTimeout(() => {
        this.alert.show = false
        this.alert.message = ''
        if (this.alert.cb) {
          this.alert.cb()
        }
      }, this.alert.duration + 100)
    },
    onReadyChange(auth) { // ready hmm
      if (auth) {
        this.pageLoadedMaster = false
        if (this.isAllowed) { // highway to spaghetti
          this.$emit('ready')
        }
      } else {
        this.pageLoadedMaster = true
      }
    }
  },
  computed: {
    isLoaded() {
      return this.pageLoadedMaster || this.loaded
    },
    isAuth() {
      return !this.loginReq || this.isLoggedIn
    },
    isReady() {
      return this.isLoaded && this.isAuth
    },
    isAllowed() {
      return !this.roles || !this.userType || this.roles.includes(this.userType)
    }
  },
  components: {
    LoginPanel
  }
}
</script>

