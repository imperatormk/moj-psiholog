<template lang="pug">
.p10
  v-date-picker.tiny-border(:dark="isDark" landscape v-model="pickedDate" reactive :light="isLight" header-color="light-green" @input="dateChanged($event)")
    v-spacer
    .w100(v-show="pickedDate")
      .p10.tiny-border
        .flex-row
          .p5-side(v-for="(availableTime, index) in availableTimes" :key="index")
            v-chip.hoverable(@click="appointmentPicked(availableTime)")
              span.hoverable {{ availableTime.hour }}:{{ availableTime.minute }}
</template>

<script>
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
      this.$emit('appointmentPicked', {
        date: this.pickedDate,
        time
      })
    },
    getCurrentDate() { // install moment?
      const currentDate = new Date()
      const day = currentDate.getDate() > 10 ? currentDate.getDate() : `0${currentDate.getDate()}`
      const month = currentDate.getMonth() + 1 > 10 ? currentDate.getMonth() + 1  : `0${currentDate.getMonth() + 1}`
      const year = currentDate.getFullYear()

      return `${year}-${month}-${day}`
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

