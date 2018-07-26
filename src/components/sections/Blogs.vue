<template lang="pug">
  v-layout(column v-if="hasBlogs")
    span.section-header.p10-top Latest publications
    v-layout(row wrap fill-height)
      BlogCard(v-for="blog in blogs" :key="blog.id" :blogProp="blog")
  .p100.flex-row.justify-center(v-else)
    h2 We have no publications at the moment...
</template>

<script>

import BlogCard from '@/components/blog-card/BlogCard'

export default {
  props: {
    blogs: {
      type: Array,
      default: () => []
    }
  },
  created() {
    console.log(this.blogs)
  },
  computed: {
    hasBlogs() {
      return this.blogs.length
    }
  },
  components: {
    BlogCard
  }
}
</script>
