<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm12 md4 column align-center justify-space-between).p20.sidebar.border-right.font-white
      v-avatar(:size="200" color="grey lighten-4")
        img(:src="docProp.avatar")
      .p10
        h1 {{ docProp.name }}
        br
        h2 Rate: ${{ docProp.sessionRate }}/session
        br
        h3 {{ docProp.rating * 20 }}% positive feedback from {{ docProp.totalSessions }} sessions
        .p10
          Review(v-for="review in docProp.reviews" :review="review" :key="review.id")
        h4 This doctor has 
          a {{ docProp.doctor.blogs.length }} publication(s)
    v-flex(xs12 sm12 md8 column justify-space-between).p30-top.text-left
      .p30-side
        h2 About this doctor
        br
        .fs17 {{ docProp.bio }}
        .p20-top
        AppointmentPicker(@appointmentPicked="openPurchasePage($event)")
</template>

<script>

import AppointmentPicker from '@/components/appointment-picker/AppointmentPicker'
import Review from '@/components/reviews/Review'

export default {
  props: {
    docProp: {}
  },
  methods: {
    openPurchasePage(pickedTime) {
      this.$store.dispatch('pendPurchase', {
        doctor: this.docProp, // this is probably temp
        ...pickedTime
      })
        .then(() => {
          this.$router.push({
            name: 'order'
          })
        })
    }
  },
  components: {
    AppointmentPicker,
    Review
  }
};
</script>

<style lang="scss">
  .sidebar {
    background: rgba(8,54,75,0.85);
  }
</style>
