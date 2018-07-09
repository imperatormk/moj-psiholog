<template>
  <v-layout v-if="!hideOverall" row justify-center>
    <v-dialog content-class="dc" transition="dialog-bottom-transition" v-model="isVisible" persistent max-width="400">
      <v-slide-y-transition>
        <div>
          <audio ref="audio" loop src="/static/call_incoming.mp3"></audio>
          <v-card-title class="headline">New call</v-card-title>
          <v-card-text>You are being called sir</v-card-text>
          <v-btn flat @click.native="sendResult(true)">Accept</v-btn>
          <v-btn flat @click.native="sendResult(false)">Decline</v-btn>
        </div>
      </v-slide-y-transition>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    resultCb: {
      type: Function,
      default: () => {}
    }
  },
  created() {
    this.isVisible = true
    this.timer = setInterval(() => {
      this.timeElapsedCalling += 1
    }, 1000)
  },
  watch: {
    isVisible(val) {
      let music = this.$refs.audio
      if (val) {
        music.play()
      } else {
        music.pause()
        music.currentTime = 0 
        setTimeout(() => {
          this.hideOverall = true
        }, 500)
      }
    }
  },
  beforeDestroy() {
    this.isVisible = false
  },
  data: () => ({
    isVisible: false,
    hideOverall: false,
    timeElapsedCalling: 0,
    timer: null
  }),
  methods: {
    sendResult(result) {
      clearInterval(this.timer)
      this.resultCb({
        accepted: result,
        timeElapsed: this.timeElapsedCalling
      })
      this.isVisible = false
    }
  }
}
</script>

<style lang="scss">
  .v-dialog__content {
    background: black;
    opacity: 0.9;
  }
  .dc {
    background: white;
  }
</style>


