<template lang="pug">
Page(:loaded="loaded")
  Blog(:blog="blog")
</template>
<script>

import Page from '@/components/common/Page'
import Blog from '@/pages/Blog'

export default {
  created() {
    const blogId = this.$route.params.id
    this.$api.getBlog(blogId)
      .then((res) => {
        this.blog = res
        this.loaded = true
      })
  },
  data() {
    return {
      blog: {},
      loaded: false
    }
  },
  components: {
    Page,
    Blog
  }
}
</script>