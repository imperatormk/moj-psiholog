<template lang="pug">
Page(:loginReq="true" :loaded="loaded")
  VideoChat(v-if="success" :sessionProp="session")
  div(v-else)
    .p20 This is an error. That's all we know.
</template>
<script>

import Page from '@/components/common/Page'
import VideoChat from '@/pages/VideoChat'

export default {
  mounted() { // TODO: make sure that logged in!
    console.log(this.userId)
    this.$api.getReadySessionsForUser({ id: this.userId })
      .then((sessionRes) => {
        this.session = sessionRes.found ? { ...sessionRes.payload } : null
        this.success = sessionRes.success
        this.loaded = true
      })
  },
  data() {
    return {
      session: null, // hmm?
      success: null,
      loaded: false
    }
  },
  components: {
    Page,
    VideoChat
  },
};
</script>