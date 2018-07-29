<template lang="pug">
Page(:loginReq="true" :loaded="loaded" @ready="init" :style="{ background: userId ? '#014051' : 'white' }")
  div(v-if="!sessionFinished")
    VideoChat(v-if="success" :sessionProp="session" @sessionFinished="sessionFinished = true")
    div(v-else)
      .p20 This is an error. That's all we know.
  div(v-else)
    .p40.fs20 Your session has ended. We hope everything went well and you have had a pleasant experience!
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