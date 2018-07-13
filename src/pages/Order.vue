<template lang="pug">
  div
    .purchase-box.br30.p40(v-if="sessionData")
      .flex-col
        h1 Confirm your session
        br
        br
        .flex-row
          .flex-col.flex-1.center
            v-avatar(:size="200" color="grey lighten-4")
              img(:src="sessionData.doctor.avatar")
            span.fs25.p10-top {{ sessionData.doctor.name }}
          .flex-col.space-around.align-end.flex-1
            .flex-col.space-around.align-end.section10
              span.fs20 Scheduled time: {{ getScheduledTime }}
              span.fs20 Price: ${{ sessionData.doctor.sessionRate }}
            .flex-col.space-around.align-end
              .flex-col.w100.justify-center
                .flex-row.self-end.align-center.p5(title="Optionally get an email reminder 10 minutes before the session starts")
                  v-checkbox.defaultw(v-model="sendReminder" hide-details)
                  span.p5-left Remind me 10 minutes before
              v-btn(outline @click="proceedToCheckout") Proceed to checkout
    div(v-else)
      h1 Invalid request...
</template>

<script>
export default {
  props: {
    sessionData: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    sendReminder: false
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
    }
  },
  methods: {
    proceedToCheckout() {
      this.$api.requestPayment({ hoho: 'hihi'})
        .then((res) => {
          console.log(res)
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
