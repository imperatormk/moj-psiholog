<template lang="pug">
  v-flex.p20(xs6 sm6 md3)
    .tiny-border(style="height:inherit" @mouseover="isHovered=true" @mouseleave="isHovered=false" @click.stop="")
      .flex-col.fit
        .flex-col.font-white.space-around.h22.p10(style="background:#08364b;border-bottom:5px solid #8bc34a;")
          span.fs21 {{ blog.title }}
        div
          img(src="/static/doc-vector.jpg" style="min-width:100%;max-width:100%;max-height:100%;")
      v-slide-fade-transition
        .p10
          v-btn(:outline="!isHovered" :color="getColor" :visible="isHovered" @click="goToBlog()") Read more
</template>

<script>
export default {
  props: {
    blogProp: {}
  },
  created() {
    this.blog = { ...this.blogProp }
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
    blog: {},
    isHovered: false
  }),
  computed: {
    getShortContent() {
      const limit = 200
      const content = this.blogProp.content
      return content.length > limit ? `${content.substring(0, limit)}...` : content
    },
    getColor() {
      const colorA = 'black'
      const colorB = 'light-green'

      return this.isHovered ? colorA : colorB
    }
  },
  methods: {
    goToBlog() {
      this.$router.push({ name: 'blog', params: { id: this.blogProp.id } })
    }
  }
}
</script>