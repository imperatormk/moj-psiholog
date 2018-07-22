<template lang="pug">
  Page
    LoginPanel
</template>

<script>

import Page from '@/components/common/Page'
import LoginPanel from '@/components/common/LoginPanel'

export default {
  watch: {
    isLoggedIn(val) {
      if (val) this.$router.push({ name: 'home' }) // make this a bit smarter so logout sometimes redirects too
    }
  },
  components: {
    Page,
    LoginPanel
  },
};
</script>