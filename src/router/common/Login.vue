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
      if (val) this.$router.push({ name: 'home' })
    }
  },
  components: {
    Page,
    LoginPanel
  },
};
</script>