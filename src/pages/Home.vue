<template lang="pug">
  div
    Intro
    Doctors(:docs="data.docs")
    Blogs(:blogs="data.blogs")
</template>

<script>

import Intro from '@/components/sections/Intro'
import Doctors from '@/components/sections/Doctors'
import Blogs from '@/components/sections/Blogs'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    Intro,
    Doctors,
    Blogs
  },
};
</script>