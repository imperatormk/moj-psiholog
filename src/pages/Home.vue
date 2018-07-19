<template lang="pug">
  v-container(fluid style="padding:0")
    div
      Intro
    .p10(v-if="hasDoctors")
      v-layout(row wrap)
        DoctorCard(v-for="doc in docs" :key="doc.id" :docProp="doc")
</template>

<script>

import Intro from '@/components/sections/intro/Intro'
import DoctorCard from '@/components/doctor-card/DoctorCard'

export default {
  props: {
    docs: Array
  },
  computed: {
    hasDoctors() {
      return this.docs.length
    }
  },
  components: {
    Intro,
    DoctorCard
  },
};
</script>