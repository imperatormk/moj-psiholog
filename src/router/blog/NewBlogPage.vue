<template lang="pug">
Page(:loginReq="true" :roles="['doctor']")
  NewBlog
</template>
<script>

import Page from '@/components/common/Page'
import NewBlog from '@/pages/NewBlog'

export default {
  components: {
    Page,
    NewBlog
  }
}
</script>