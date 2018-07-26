<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm12 md4 column align-center justify-space-between).p20.sidebar.border-right.font-white
      v-avatar(:size="200" color="grey lighten-4")
        img(:src="docProp.avatar")
      .p10
        h1 {{ docProp.name }}
        br
        h2 Rate: ${{ docProp.price }}/session
        br
        h3 {{ docProp.rating * 20 }}% positive feedback from {{ docProp.totalSessions }} sessions
        .p10
          Review(v-for="review in docProp.reviews" :key="review.id" :review="review")
        span.fs14 This doctor has 
        a(@click="goToBlogs") {{ docProp.blogs.length }} publication(s)
    v-flex(xs12 sm12 md8 column justify-space-between).p30-top.text-left
      .p30-side
        v-tabs(v-model="detailType" slider-color="light-green")
          v-tab(:key="0" ripple)
            .p10 Bio
          v-tab-item(:key="0")
            .p20-top
              h2 About this doctor
              br
              .fs17 {{ docProp.bio }}
          v-tab(:key="1" ripple)
            .p10 Publications
          v-tab-item(:key="1")
            .p20-top
              h2 Publications from this doctor
              br
              v-layout(row wrap)
                BlogCard(v-for="blog in docProp.blogs" :key="blog.id" :blogProp="blog" :itemsPerRow="2")
        div(v-if="!isDoctor")
          .p20-top
          AppointmentPicker(@appointmentPicked="openPurchasePage($event)")
</template>

<script>

import AppointmentPicker from '@/components/appointment-picker/AppointmentPicker'
import Review from '@/components/reviews/Review'
import BlogCard from '@/components/blog-card/BlogCard'

export default {
  props: {
    docProp: {}
  },
  created() {
    if (this.$route.query.pub) this.goToBlogs()
  },
  data() {
    return {
      detailType: "0"
    }
  },
  methods: {
    openPurchasePage(pickedTime) {
      this.$store.dispatch('pendPurchase', {
        doctor: {
          id: this.docProp.doctorId,
          name: this.docProp.name,
          avatar: this.docProp.avatar,
          price: this.docProp.price,
        },
        ...pickedTime
      })
        .then(() => {
          this.$router.push({
            name: 'order'
          })
        })
    },
    goToBlogs() {
      this.detailType = "1"
    }
  },
  components: {
    AppointmentPicker,
    Review,
    BlogCard
  }
};
</script>

<style lang="scss">
  .sidebar {
    background: rgba(8,54,75,0.85);
  }
</style>
