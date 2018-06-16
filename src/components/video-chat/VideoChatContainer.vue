<template>
  <div>
    <div v-if="!started">
      <input type="checkbox" v-model="isExistingSession" />
      <span>Is existing session</span>
      <br><br>
      <div v-if="isExistingSession">
        <input v-model="sessionData.apiKey" placeholder="API key"/>
        <input v-model="sessionData.sessionId" placeholder="Session ID"/>
        <input v-model="sessionData.token" placeholder="Token"/>
        <br><br>
      </div>
      <button @click="initSession()">Start</button>
    </div>
    <div v-else>
      <Session :apiKey="sessionData.apiKey" :sessionId="sessionData.sessionId" :token="sessionData.token" />
    </div>

    <br><br>
    <span>API Key: <input readonly :value="sessionData.apiKey"></span><br>
    <span>Session ID: <input readonly :value="sessionData.sessionId"></span><br>
    <span>Token: <input readonly :value="sessionData.token"></span>
  </div>
</template>

<script>
import Session from '@/components/video-chat/Session.vue'

export default {
  created() {
  },
  data: () => ({
    isExistingSession: false,
    sessionData: {
      apiKey: '',
      sessionId: '',
      token: ''
    },
    started: false
  }),
  methods: {
    initSession() {
      if (!this.isExistingSession) {
        fetch(this.$config.SERVER_BASE_URL + '/session')
          .then((data) => data.json())
          .then((data) => {
            this.sessionData = data
            this.started = true
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
