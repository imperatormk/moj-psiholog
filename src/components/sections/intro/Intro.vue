<template lang="pug">
  v-layout.flex-row.space-around
    v-flex.flex-row.align-center.justify-center(md6 style="background: #9bc03c;")
      .font-intro.font-white
        v-slide-x-reverse-transition
          .flex-row.w100.justify-center.w50(v-if="visible")
            .flex-col.justify-center.uppercase(style="margin-bottom:20px")
              span.fs40.self-start You can't
              span.fs60 always be there
              span.fs40.self-end but we can
        v-scale-transition
          .flex-row.justify-left.w80(v-if="visible")
            span.p30.text-left.fs20.self-start Hoho mrmak tube martinco zimz damence pavle klaudi
    v-flex(md6)
      v-parallax(src="static/doctor1.jpg")
        .flex-row.align-center.justify-center.text-left
          .intro-card.flex-col.space-around
            span.uppercase.font-title hoho
            span.font-paragraph Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            .flex-row.input-box-container
              input.input-box(placeholder="test")
              .input-icon.flex-row.align-center.justify-center(style="width:50px;")
                v-icon(color="red") add
            .flex-row.input-box-container
              input.input-box(placeholder="test")
              .input-icon.flex-row.align-center.justify-center(style="width:50px;")
                v-icon(color="red") add
            .flex-row.input-box-container
              input.input-box(placeholder="test")
              .input-icon.flex-row.align-center.justify-center(style="width:50px;")
                v-icon(color="red") add
            .flex-row.input-box-container
              input.input-box(placeholder="test")
              .input-icon.flex-row.align-center.justify-center(style="width:50px;")
                v-icon(color="red") add
            .flex-row.justify-start
              v-btn(color="green") Hihi
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
    visible: true
  })
}
</script>

