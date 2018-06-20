<template>
  <div>
    <div v-if="!started">
      <button @click="initSession()">Start</button>
    </div>
    <div v-else>
      <Session :apiKey="sessionData.apiKey" :sessionId="sessionData.sessionId" :token="sessionData.token" />
    </div>
  </div>
</template>

<script>
import Session from '@/components/video-chat/Session'

export default {
  props: {
    sessionDataProp: null
  },
  created() {
    if (this.sessionDataProp) {
      this.sessionData = { ...this.sessionDataProp }
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
