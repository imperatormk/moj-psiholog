<template lang="pug">
Page(:loginReq="true")
  VideoChat
</template>
<script>

import Page from '@/components/common/Page'
import VideoChat from '@/pages/VideoChat'

export default {
  components: {
    Page,
    VideoChat
  },
};
</script>