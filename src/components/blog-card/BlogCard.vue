<template lang="pug">
  v-flex.p20(xs12 sm6 :md3="itemsPerRow === 4" :md6="itemsPerRow === 2")
    .tiny-border(style="height:inherit" @click.stop="")
      .flex-col.fit
        .flex-col.font-white.space-around.h22.p10(style="background:#08364b;border-bottom:5px solid #8bc34a;")
          span.fs21 {{ blog.title }}
      v-fade-transition
        .flex-col
          .p10.fs18(v-html="getShortContent")
          .p10.flex-row.center
            v-btn.no-margin(:outline="!isHovered" :color="getColor" :visible="isHovered" @click="goToBlog()" @mouseover="isHovered=true" @mouseleave="isHovered=false")
              span Read more
</template>

<script>
export default {
  props: {
    blogProp: {
      type: Object,
      required: true
    },
    itemsPerRow: {
      type: Number,
      default: 4
    }
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
      const content = this.blogProp.content.replace('<br>', '')
      return content.length > limit ? `${content.substring(0, limit)}` : content
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