<template lang="pug">
  div
    .p10(v-if="!started")
      h3 Establishing connection...
    div(v-else)
      Session(:apiKey="sessionData.apiKey" :sessionId="sessionData.sessionId" :token="sessionData.token")
</template>

<script>
import Session from '@/components/video-chat/Session'

export default {
  props: {
    videoSessionDataProp: {
      type: Object,
      default: null
    }
  },
  created() {
    if (this.videoSessionDataProp) {
      this.sessionData = { ...this.videoSessionDataProp }
    }
    this.initSession()
  },
  data: () => ({
    sessionData: null,
    started: false
  }),
  methods: {
    initSession() {
      if (!this.sessionData) {
        this.$api.generateChatToken()
          .then((data) => {
            this.sessionData = data
            this.started = true
            this.$emit('sessionCreated', data)
          }).catch((err) => {
            alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
          })
      } else {
        this.started = true
      }
    }
  },
  components: {
    Session
  },
}
</script>
