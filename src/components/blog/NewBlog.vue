<template lang="pug">
  v-layout(row wrap)
    v-flex.p20(xs12 sm12 md12 column align-center)
      h2 Publish New Blog 
      v-text-field.p10(placeholder="Blog title" hide-details v-model="title") 
      wysiwyg.fit(v-model="content")
      .p10
        v-btn(outline :disabled="!isValid" @click="publishBlog") Publish blog
</template>
<script>
export default {
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    publishBlog() {
      console.log(`Title: ${this.title}`)
      console.log(`Content: ${this.content}`)
      this.title = ''
      this.content = ''
    },
    getContent() {
      return {
        title: this.title.trim(),
        content: this.content.trim()
      }
    }
  },
  computed: {
    isValid() {
      return this.title.trim() && this.content.trim()
    }
  }
}
</script>

