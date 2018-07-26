<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm12 md4 column align-center justify-space-between).p20.sidebar.border-right.font-white
      v-avatar.hoverable(@click="goToBlogs" :size="200" color="grey lighten-4")
        img(:src="blog.poster.details.avatar")
      .p10
        h1
          a(@click="goToBlogs") {{ blog.poster.details.name }}
        div(v-if=" blog.poster.blogs.length > 1")
          span.fs15 This doctor has 
          a.fs15(@click="goToBlogs(true)") {{ blog.poster.blogs.length - 1 }} other publication(s)
    v-flex(xs12 sm12 md8 column justify-space-between).p30-top.text-left
      .p30-side
        h2 {{ blog.title }}
        br
        span(v-html="blog.content")
</template>

<script>

export default {
  props: {
    blog: {}
  },
  methods: {
    goToBlogs(openPub) {
      const routerObj = { name: 'details', params: { id: this.blog.poster.id } }
      if (openPub) routerObj.query = { pub: true }
      this.$router.push(routerObj)
    }
  }
};
</script>

<style lang="scss">
  .sidebar {
    background: rgba(8,54,75,0.85);
  }
</style>
