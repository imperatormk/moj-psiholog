<template lang="pug">
  v-layout(row wrap justify-center xs12 sm12 md8)
    v-flex(align-center justify-space-between)
      .purchase-box.br30.p40(v-if="sessionData")
        v-flex(xs12 sm12 md12 row align-center justify-space-between)
          h1 Confirm your session
          br
          v-layout(row wrap fill-height)
            v-flex(xs12 sm12 md6 column align-center justify-center fill-height)
              v-avatar(:size="200" color="grey lighten-4")
                img(:src="sessionData.doctor.avatar")
              .fs25.p10-top {{ sessionData.doctor.name }}
            v-flex(xs12 sm12 md6 column justify-space-around fill-height).text-right
              .flex-col.align-end
                span.fs20 {{ getScheduledTime }}
                span.fs20 ${{ sessionData.doctor.price }}
              .flex-col.align-end
                v-btn.no-margin(outline :disabled="requestLoading" @click="proceedToCheckout") Proceed to checkout
      div(v-else)
        h1 Oops, that's not a valid request. Please redo your action or alternatively contact support for help.
</template>

<script>
export default {
  props: {
    sessionData: {
      type: Object
    }
  },
  data: () => ({
    sendReminder: false,
    requestLoading: false,
    requestStatus: null
  }),
  computed: {
    getScheduledTime() {
      const dateArr = this.sessionData.date.split('-')
      const day = dateArr[2]
      const month = dateArr[1]
      const year = dateArr[0]
      const hour = this.sessionData.time.hour
      const minute = this.sessionData.time.minute

      return `${day}/${month}/${year} ${hour}:${minute}`
    },
    getSqlDate() { // temp?
      const dateArr = this.sessionData.date.split('-')
      const day = dateArr[2]
      const month = dateArr[1]
      const year = dateArr[0]
      const hour = this.sessionData.time.hour
      const minute = this.sessionData.time.minute

      return `${year}-${month}-${day} ${hour}:${minute}:00`
    },
    getRequestStatusMessage() {
      const successMsg = 'Your session has been booked! See your email for more details.'
      const failureMsg = 'Oops! Something went wrong... please try again or contact support.'

      return this.requestStatus === 'success' ? successMsg : failureMsg
    }
  },
  methods: {
    proceedToCheckout() {
      const reqObj = {
        "sessionData": {
          "doctorId": this.sessionData.doctor.id,
          "patientId": this.userId,
          "datetime": this.getSqlDate
        }
      }

      this.requestLoading = true
      this.$api.requestPayment(reqObj)
        .then((res) => {
          res.success ? this.requestStatus = 'success' : this.requestStatus = 'fail'
          this.requestLoading = false
          this.$messageBus.$emit('alert', {
            message: this.getRequestStatusMessage
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .purchase-box {
    background:linear-gradient(to bottom, #d9edf7 0%, #b9def0 100%);
    border:1px solid #9acfea
  }
</style>
