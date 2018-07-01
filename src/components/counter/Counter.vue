<template lang="pug">
  h3 Time elapsed: {{ currentTime }}
</template>

<script>
export default {
  props: {
    cb: {
      type: Function,
      default: null
    }
  },
  created() {
    this.startTimer()
  },
  destroyed() {
    if (this.cb) {
      this.cb({
        totalSeconds: this.seconds + this.minutes * 60 + this.hours * 3600
      })
    }
    this.stopTimer()
  },
  data: () => ({
    seconds: 0,
    minutes: 0,
    hours: 0,
    timer: null
  }),
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.recalculateTime()
      }, 1000)
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    recalculateTime() {
      if (this.seconds < 59) {
        this.seconds++
      } else {
        this.seconds = 0
        if (this.minutes < 59) {
          this.minutes++
        } else {
          this.minutes = 0
          this.hours++
        }
      }
    },
    padWithZero(val) {
      if (val < 10) {
        return `0${val}`
      }
      return val
    }
  },
  computed: {
    currentTime() {
      return `${this.padWithZero(this.hours)}:${this.padWithZero(this.minutes)}:${this.padWithZero(this.seconds)}`
    }
  }
}
</script>

