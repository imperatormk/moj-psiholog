<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm12 md4 column align-center justify-space-between).p20.sidebar.border-right.font-white
      v-avatar(:size="200" color="grey lighten-4")
        img(:src="blog.publisher.avatar")
      .p10
        h1 {{ blog.publisher.name }}
        br
        h4 This doctor has 
          a {{ blog.publisher.publications.length }} publications
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
  }
};
</script>

<style lang="scss">
  .sidebar {
    background: rgba(8,54,75,0.85);
  }
</style>
