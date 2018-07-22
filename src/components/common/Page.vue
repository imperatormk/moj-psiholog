<template lang="pug">
  div
    v-snackbar(v-model="alert.show"
      top
      multi-line
      :timeout="alert.timeout")
      span {{ alert.message }}
    .fit(v-if="isConnected && isLoaded")
      v-toolbar.sticky(color="blue-grey darken-3")
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
            v-btn(@click="showDropdown = !showDropdown" flat)
              span.font-white Dropdown
            v-menu(v-model="showDropdown" z-index="99999")
              v-btn(flat @click="navigateTo('profile')") My Profile
              v-btn(flat @click="logout()") Log out
              v-btn(flat @click="navigateTo('newBlog')") New Blog
      .fit
        slot(v-if="!loginReq || isLoggedIn")
        LoginPanel(v-else-if="loginReq && !isLoggedIn")
    .align-center.justify-center(v-else)
      .p10
        h1 Connecting or loading or something else...
</template>

<script>

import LoginPanel from '@/components/common/LoginPanel'

export default {
  props: {
    loginReq: {
      type: Boolean,
      default: false
    },
    loaded: { // TODO: implement this
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
      }, this.alert.duration + 100)
    },
    onReadyChange(auth) { // ready hmm
      if (auth) {
        this.pageLoadedMaster = false
        this.$emit('ready')
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
    }
  },
  components: {
    LoginPanel
  }
}
</script>

