<template lang="pug">
  .flex-row
    .flex-2
    .flex-8
      h2.p50 Publish New Blog 
      v-text-field.p10(placeholder="Blog title" hide-details v-model="title") 
      wysiwyg(v-model="myHTML")
      v-btn(@click="publishBlog") Publish
    .flex-2
</template>
<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      myHTML: ''
    }
  },
  methods: {
    publishBlog() {
      console.log(`Title: ${this.title}`)
      console.log(`Content: ${this.myHTML}`)
      this.title = ''
      this.myHTML = ''
    }
  }
}
</script>

