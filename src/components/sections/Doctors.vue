<template lang="pug">
  v-layout(column wrap v-if="hasDoctors")
    span.section-header.p10-top Our staff
    v-layout(row wrap)
      DoctorCard(v-for="doc in docs" :key="doc.id" :docProp="doc")
  .p100.flex-row.justify-center(v-else)
    h2 We have no personnel at the moment...
</template>

<script>

import DoctorCard from '@/components/doctor-card/DoctorCard'

export default {
  props: {
    docs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasDoctors() {
      return this.docs.length
    }
  },
  components: {
    DoctorCard
  }
}
</script>
