<template lang="pug">
  div(v-if="isConnected")
    div(style="margin-bottom:55px")
      v-toolbar(fixed color="blue-grey darken-2")
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
          v-btn(flat v-if="isLoggedIn" @click="logout()")
            span.font-white Log out
    slot(v-if="!loginReq || isLoggedIn")
    LoginPanel(v-else-if="loginReq && !isLoggedIn")
  .align-center.justify-center(v-else)
    .p10
      h1 Connecting...
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
  methods: {
    navigateTo(path) {
      this.$router.push({ name: path })
    }
  },
  components: {
    LoginPanel
  }
}
</script>

