<template lang="pug">
  Page
    Home(v-if="loaded" :data="{docs, blogs}")
</template>

<script>

import Page from '@/components/common/Page'
import Home from '@/pages/Home'

export default {
  created() {
    Promise.all([this.$api.getDoctors(), this.$api.getBlogs()])
      .then(res => {
        const docs = res[0]
        const blogs = res[1]

        this.docs = docs
        this.blogs = blogs
        this.loaded = true
      })
  },
  data() {
    return {
      docs: [],
      blogs: [],
      loaded: false
    }
  },
  components: {
    Home,
    Page
  },
};
</script>