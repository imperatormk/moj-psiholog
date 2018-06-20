<template lang="pug">
  .card(@mouseover="showBio=true" @mouseleave="showBio=false")
    v-slide-y-transition
      .p10.h100(v-show="showBio" style="background:yellow;")
        p This is short bio
        p Name: {{ doc.name }}
        p And this is more short bio
</template>

<script>
export default {
  props: {
    docProp: {}
  },
  created() {
    this.doc = { ...this.docProp }
  },
  data: () => ({
    doc: {},
    showBio: false
  })
}
</script>

