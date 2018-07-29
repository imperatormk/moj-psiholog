<template lang="pug">
Page(:loginReq="true" @ready="getResults" :loaded="loaded")
  Profile
</template>
<script>

import Page from '@/components/common/Page'
import Profile from '@/pages/Profile'

export default {
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    getResults() {
      this.$api.getTestResults(this.userId, this.userType)
        .then(res => {
          if (res.id) {
            this.$store.dispatch('saveTestResults', res)
          }
          this.loaded = true
        })
    }
  },
  components: {
    Page,
    Profile
  }
};
</script>