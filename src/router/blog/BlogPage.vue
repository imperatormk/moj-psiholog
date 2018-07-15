<template lang="pug">
Page(:loginReq="true")
  Blog
</template>
<script>

import Page from '@/components/common/Page'
import Blog from '@/pages/Blog'

export default {
  components: {
    Page,
    Blog
  },
};
</script>