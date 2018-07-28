<template lang="pug">
.p10
  v-date-picker.tiny-border(:dark="isDark" landscape v-model="pickedDate" reactive :light="isLight" header-color="light-green" color="light-green" @input="dateChanged($event)")
    v-spacer
    .w100(v-show="pickedDate")
      .p5.flex-row.space-between.tiny-border
        .p5-side(v-for="(availableTime, index) in availableTimes" :key="index")
          v-chip.hoverable(outline @click="appointmentPicked(availableTime)")
            span.hoverable {{ availableTime.hour }}:{{ availableTime.minute }}
</template>

<script>
import moment,{ min } from 'moment'

export default {
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  created() {
    this.pickedDate = this.getCurrentDate()
  },
  data: () => ({
    pickedDate: null,
    availableTimes: [{
      hour: 6,
      minute: 30
    }, {
      hour: 7,
      minute: 45
    }, {
      hour: 12,
      minute: 10
    }]
  }),
  methods: {
    dateChanged(ev) {
      // console.log(ev)
    },
    appointmentPicked(time) {
      const datetime = moment
      this.$emit('appointmentPicked', {
        date: this.pickedDate,
        time: `${this.getPaddedWithZero(time.hour)}:${this.getPaddedWithZero(time.minute)}`
      })
    },
    getPaddedWithZero(val) {
      if (val < 10) return `0${val}`
      return val
    },
    getCurrentDate() {
      return moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    isLight() {
      return this.theme === 'light'
    },
    isDark() {
      return this.theme === 'dark'
    }
  }
}
</script>

