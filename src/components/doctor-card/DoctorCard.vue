<template lang="pug">
  v-flex.p20(xs12 sm6 md3)
    .tiny-border.relative(style="height:inherit" @mouseover="showBio=true" @mouseleave="showBio=false" @click.stop="")
      .flex-col.fit
        .flex-col.font-white.space-around.h22.p10(style="background:#08364b;border-bottom:5px solid #8bc34a;")
          span.fs21 {{ doc.name }}
          span.fs15 Doctor
        div
          img(src="/static/doc-vector.jpg" style="min-width:100%;max-width:100%;max-height:100%;")
      transition(name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight")
        .flex-col.overlayz(v-if="showBio")
          .flex-1
          .flex-col.fit.h50
            .flex-col.fit.font-white.space-around.p10.font-white(style="background:#8bc34a;")
              span.p20.font-paragraph.fs15(v-html="getShortBio")
            .p10(style="background:white;")
              v-btn(outline color="light-green" @click="goToDetails") See availability
</template>

<script>
export default {
  props: {
    docProp: {}
  },
  created() {
    this.doc = { ...this.docProp }
  },
  watch: {
    showBio(val) {
      if (!val) {
        setTimeout(() => {
          this.showMain = true
        }, 300)
      } else {
        this.showMain = false
      }
    }
  },
  data: () => ({
    doc: {},
    showBio: false,
    showMain: true
  }),
  computed: {
    getShortBio() {
      const limit = 170
      const content = this.doc.bio
      return content.length > limit ? `${content.substring(0, limit)}...` : content
    }
  },
  methods: {
    goToDetails() {
      this.$router.push({ name: 'details', params: { id: this.docProp.doctor.id } })
    }
  }
}
</script>