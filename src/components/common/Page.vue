<template lang="pug">
  .fit(v-if="isConnected && loaded")
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
          v-btn(@click="show = !show" flat)
            span.font-white Dropdown
          v-menu(v-model="show" z-index="99999")
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
  data() {
    return {
      show: false
    }
  },
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

