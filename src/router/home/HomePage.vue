<template lang="pug">
  Page
    Home(v-if="loaded" :docs="docs")
</template>

<script>

import Page from '@/components/common/Page'
import Home from '@/pages/Home'

export default {
  created() {
    this.$api.getDoctors()
      .then(docs => {
        this.docs = docs
        this.loaded = true
      })
  },
  data() {
    return {
      docs: [],
      loaded: false
    }
  },
  components: {
    Home,
    Page
  },
};
</script>