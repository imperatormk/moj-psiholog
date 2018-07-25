<template lang="pug">
  div
    Intro
    Doctors(:docs="docs")
</template>

<script>

import Intro from '@/components/sections/intro/Intro'
import Doctors from '@/components/sections/doctors/Doctors'

export default {
  props: {
    docs: Array
  },
  components: {
    Intro,
    Doctors
  },
};
</script>