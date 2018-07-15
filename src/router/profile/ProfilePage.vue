<template lang="pug">
Page(:loginReq="true")
  Profile
</template>
<script>

import Page from '@/components/common/Page'
import Profile from '@/pages/Profile'

export default {
  components: {
    Page,
    Profile
  },
};
</script>