<template lang="pug">
  div
    .flex-row.section100
      .w30.p20.flex-col.align-center.sidebar.font-white.border-right.space-between
        v-avatar(:size="200" color="grey lighten-4")
          img(:src="docProp.avatar")
        h2 Rate: ${{ docProp.sessionRate }}/session
        h3 {{ docProp.rating * 20 }}% positive feedback from {{ docProp.totalSessions }} sessions
        .p10
          Review(v-for="review in docProp.reviews" :review="review" :key="review.id")
        h4 This doctor has 
          a {{ docProp.publications.length }} publications
      .w70.p30-side.flex-col.space-between.p20-top
        .p30-side
          h1 {{ docProp.name }}
          br
          br
          .text-left.fs17 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
