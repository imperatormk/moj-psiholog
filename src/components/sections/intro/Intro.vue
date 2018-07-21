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
          RegisterPanel(v-if="!isLoggedIn" @accountSubmit="createAccount($event)")
</template>

<script>

import Vue from 'vue'
import RegisterPanel from '@/components/common/RegisterPanel'

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
    visible: true
  }),
  methods: {
    createAccount(email) {
      this.$api.createAccount({ email })
        .then(res => {
          const successMsg = "Account created! Check your email for further instructions"
          const failureMsg = 'Oops! Something went wrong... please try again or contact support.'
          
          this.$messageBus.$emit('alert', {
            message: res.success ? successMsg : failureMsg
          })
        })
    }
  },
  components: {
    RegisterPanel
  }
}
</script>
