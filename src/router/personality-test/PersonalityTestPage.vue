<template lang="pug">
  Page(:loginReq="true")
    PersonalityTest
</template>
<script>

import Page from '@/components/common/Page'
import PersonalityTest from '@/pages/PersonalityTest'

export default {
  components: {
    Page,
    PersonalityTest
  },
};
</script>