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
      blog: {
        publisher: {
          id: 53,
          name: 'Дарко Симоновски',
          publications: ['a', 'b'],
          avatar: 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg'
        },
        title: 'My nice blog',
        content: '<h2>H2</h2><h3>H3</h3>'
      },
      loaded: false
    }
  },
  components: {
    Page,
    Blog
  }
}
</script>