<template lang="pug">
  v-layout(row wrap fill-height)
    v-flex(xs12 sm12 md6 align-center style="background: #9bc03c;")
      .font-intro.font-white.flex-col.space-around
        v-slide-x-reverse-transition
          .flex-row.w100.justify-center.p20(v-if="visible")
            .flex-col.justify-center.uppercase(style="margin:20px")
              span.fs40.self-start You can't
              span.fs50 always be there
              span.fs40.self-end but we can
        v-scale-transition
          .flex-row.justify-left.w80.p20(v-if="visible")
            span.p30.text-left.fs20.self-start
              span Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              span Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    v-flex(xs12 sm12 md6)
      v-parallax.h100(src="static/doctor1.jpg")
        .flex-row.align-center.justify-center.text-left.p10
          .intro-card.flex-col.space-around
            span.uppercase.font-title Book an appointment
            span.p10.font-paragraph(style="display:block;") Enter your email address to get started. First session free!
            .flex-row.input-box-container
              input.no-focus.input-box.italic(placeholder="Email" v-model="email")
              .input-icon.flex-row.align-center.justify-center(style="width:50px;")
                v-icon(color="gray") airplay
            .flex-row.justify-start
              v-btn(color="light-green" @click="createAccount") Submit Now
</template>

<script>

import Vue from 'vue'

export default {
  created() {
    setInterval(() => {
      this.visible = false
      Vue.nextTick(() => {
        this.visible = true
      })
    }, 5000)
  },
  data: () => ({
    email: '',
    visible: true
  }),
  methods: {
    createAccount() {
      const email = this.email.trim()
      if (email) {
        this.$api.createAccount({ email })
          .then(res => console.log(res))
      }
    }
  }
}
</script>
