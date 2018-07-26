<template lang="pug">
Page(:loginReq="true" :loaded="loaded" @ready="init")
  div(v-if="!sessionFinished")
    VideoChat(v-if="success" :sessionProp="session" @sessionFinished="sessionFinished = true")
    div(v-else)
      .p20 This is an error. That's all we know.
  div(v-else)
    .fs20 Hope you liked it!
</template>
<script>

import Page from '@/components/common/Page'
import VideoChat from '@/pages/VideoChat'

export default {
  data() {
    return {
      session: null, // hmm?
      success: null,
      loaded: false,
      sessionFinished: false // better place?
    }
  },
  methods: {
    init() {
      this.$api.getReadySessionsForUser({ id: this.userId })
      .then((sessionRes) => {
        this.session = sessionRes.found ? { ...sessionRes.payload } : null
        this.success = sessionRes.success
        this.loaded = true
      })
    }
  },
  components: {
    Page,
    VideoChat
  },
};
</script>