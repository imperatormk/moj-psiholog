<template lang="pug">
  .p10
    .p10(v-if="!started")
      h3 Establishing connection...
    div(v-else)
      Session(:apiKey="sessionData.apiKey" :sessionId="sessionData.sessionId" :token="sessionData.token")
</template>

<script>
import Session from '@/components/video-chat/Session'

export default {
  props: {
    sessionId: {
      type: String,
      required: true
    }
  },
  created() {
    this.sessionData.sessionId = this.sessionId
    this.initSession()
  },
  data: () => ({
    sessionData: {},
    started: false
  }),
  methods: {
    initSession() {
      this.$api.generateChatToken({ sessionId: this.sessionId })
        .then((data) => {
          this.sessionData = Object.assign({}, this.sessionData, data)
          this.started = true
        }).catch((err) => {
          console.error('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
        })
    }
  },
  components: {
    Session
  },
}
</script>
