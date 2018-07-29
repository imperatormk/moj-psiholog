<template lang="pug">
Page(:loginReq="true" @ready="getResults" :loaded="loaded")
  Profile(:testResultsProp="testResults")
</template>
<script>

import Page from '@/components/common/Page'
import Profile from '@/pages/Profile'

export default {
  data() {
    return {
      testResults: null,
      loaded: false
    }
  },
  methods: {
    getResults() { // TODO: reload this sometimes?
      this.$api.getTestResults(this.userId, this.userType)
        .then(res => {
          this.testResults = res.id ? res : null
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