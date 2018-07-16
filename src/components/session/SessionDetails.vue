<template lang="pug">
  div
    v-expansion-panel-content
          div(slot="header")
            span {{ sessionObj.id }}
          v-card
            v-card-text   {{ sessionObj.status }}
</template>
<script>
export default {
  props: {
    sessionObj: Object
  }
}
</script>
