<template lang="pug">
  v-layout(column v-if="hasDoctors")
    span.section-header.p10-top Our staff
    v-layout(row wrap)
      DoctorCard(v-for="doc in dupDocs" :key="doc.id" :docProp="doc")
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
    },
    dupDocs() { // demo temp
      const arrA = this.docs.slice(0)
      const arrB = this.docs.slice(0)
      return [ ...arrA, ...arrB ]
    }
  },
  components: {
    DoctorCard
  }
}
</script>
