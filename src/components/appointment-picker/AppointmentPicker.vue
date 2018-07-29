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
    pickedDate: null
  }),
  methods: {
    dateChanged(ev) {
      // console.log(ev)
    },
    appointmentPicked(time) {
      this.$emit('appointmentPicked', {
        date: this.pickedDate,
        time: `${time.hour}:${time.minute}`,
        timezone: time.timezone
      })
    },
    buildDate(date, time) {
      const dateObj = moment()

    },
    getPaddedWithZero(val) {
      if (val === 0) return '00'
      if (val < 10) return `0${val}`
      return val
    },
    getCurrentDate() {
      return moment().format('YYYY-MM-DD')
    },
    getCurrentTime() {
      return moment()
    }
  },
  computed: {
    isLight() {
      return this.theme === 'light'
    },
    isDark() {
      return this.theme === 'dark'
    },
    availableTimes() {
      const dateA = this.getCurrentTime().add(12, 'minutes')
      const dateB = this.getCurrentTime().add(1, 'hours')
      const dateC = this.getCurrentTime().add(3, 'hours')

      return [{
        hour: this.getPaddedWithZero(dateA.hours()),
        minute: this.getPaddedWithZero(dateA.minutes()),
        timezone: dateA.format('ZZ')
      }, {
        hour: this.getPaddedWithZero(dateB.hours()),
        minute: this.getPaddedWithZero(dateB.minutes()),
        timezone: dateB.format('ZZ')
      }, {
        hour: this.getPaddedWithZero(dateC.hours()),
        minute: this.getPaddedWithZero(dateC.minutes()),
        timezone: dateC.format('ZZ')
      }]
    }
  }
}
</script>

