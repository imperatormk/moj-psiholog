<template lang="pug">
  v-flex.p20(xs12 sm12 md3 style="height:300px")
    div(@mouseover="showBio=true" @mouseleave="showBio=false" @click.stop="")
      .flex-col.fit(v-if="showMain")
        .flex-col.font-white.space-around.h22.p10(style="background:#08364b;border-bottom:5px solid #8bc34a;")
          span.fs21 {{ doc.name }}
          span.fs15 Doctor
        .p10.h78
          //-img(src="/static/doc-vector.jpg" style="min-width:100%;max-height:100%;")
          span IMAGE HERE
      v-slide-y-transition
        .flex-col(v-if="showBio")
          .flex-col.font-white.space-around.p10.h50.font-white(style="background:#8bc34a;")
            div.flex-col
              span.p5.fs21 {{ doc.name }}
              span.fs15 Doctor
            span.p20.font-paragraph.fs15 {{ doc.bio }}
          .p10
            v-btn(outline color="light-green" @click="goToDetails()") See availability
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
  methods: {
    goToDetails() {
      this.$router.push({ name: 'details', params: { id: this.docProp.id } })
    }
  }
}
</script>

