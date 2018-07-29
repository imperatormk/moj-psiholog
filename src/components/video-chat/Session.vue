<template lang="pug">
  div(id="session" @error="errorHandler")
    .flex-row
      .flex-1.p10.flex-row.justify-end
        .flex-col.text-left(v-if="streams.length")
          span.fs16.p5(style="background:#0080ff;padding-left:10px;") {{ getUpperCase(getOtherUserType) }}
          div(id="subscribers" v-for="stream in streams" :key="stream.streamId")
            subscriber(:opts="getOptsSub" @error="errorHandler" :stream="stream" :session="session")
        div(v-else)
          h3 Waiting for the other side
      .flex-1.p10.flex-col.text-right.align-left
        span.fs16.p5(style="width:300px;background:#0080ff;padding-right:10px;") {{ getUpperCase(userType) }}
        publisher(:opts="getOptsPub" :session="session" @error="errorHandler")
</template>

<script>
import OT from '@opentok/client'
import Publisher from './Publisher.vue'
import Subscriber from './Subscriber.vue'

const errorHandler = (err) => {
  console.error(err.message)
}

export default {
  name: 'session',
  components: { Publisher, Subscriber },
  props: {
    sessionId: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    apiKey: {
      type: String,
      required: true
    },
  },
  created () {
    this.session = OT.initSession(this.apiKey, this.sessionId)
    this.session.connect(this.token, (err) => {
      if (err) {
        errorHandler(err)
      }
    })
    this.session.on('streamCreated', (event) => {
      this.streams.push(event.stream)
    })
    this.session.on('streamDestroyed', (event) => {
      const idx = this.streams.indexOf(event.stream)
      if (idx > -1) {
        this.streams.splice(idx, 1)
      }
    })
  },
  beforeDestroy() {
    this.session.disconnect()
  },
  data: () => ({
    streams: [],
    session: null,
  }),
  methods: {
    errorHandler,
    getUpperCase(str) {
      return str[0].toUpperCase() + str.substring(1)
    }
  },
  computed: {
    getOptsSub() {
      return {
        width: 500,
        height: 300
      }
    },
    getOptsPub() {
      return {
        width: 300,
        height: 200
      }
    },
    getOtherUserType() {
      if (this.isDoctor) return 'patient'
      if (this.isPatient) return 'doctor'
    }
  }
}
</script>

<style>
  .OT_subscriber {
    float: left
  }
  .OT_publisher {
    float: left
  }
</style>
