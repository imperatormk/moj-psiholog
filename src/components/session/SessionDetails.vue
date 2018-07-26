<template lang="pug">
  .fit
    v-expansion-panel-content
      div(slot="header")
        .flex-row.space-between.align-center
          .flex-row.align-center
            v-chip.no-margin(disabled small outline)
              span # {{ sessionObj.id }}
          span {{ sessionObj.datetime }}
      v-card
        v-card-text 
          .flex-col.p20-left
            span(v-if="isPatient") With {{ sessionObj.doctor.details.name }}
            span(v-if="sessionObj.meta") Lasted {{ sessionObj.meta.duration }} seconds
            div
              span(v-if="sessionObj.Payment") Costed ${{ sessionObj.Payment.amount }}
              v-chip(v-else disabled small outline color="green") Free session
</template>
<script>

export default {
  props: {
    sessionObj: {
      type: Object,
      required: true
    }
  }
}
</script>
