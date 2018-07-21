<template lang="pug">
  .fit
    v-expansion-panel-content
      div(slot="header")
        span {{ sessionObj.id }}
      v-card
        v-card-text 
          .p20-left {{ sessionObj.status }}
</template>
<script>
export default {
  props: {
    sessionObj: Object
  }
}
</script>
