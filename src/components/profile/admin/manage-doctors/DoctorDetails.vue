<template lang="pug">
  .fit
    v-expansion-panel-content
      div(slot="header")
        .flex-row.space-between.align-center
          .flex-row.align-center
            v-chip.no-margin(:color="doctorObj.ready ? 'green' : 'red'" disabled small outline)
              span # {{ doctorObj.ready ? 'Ready' : 'Pending' }}
          span {{ doctorObj.name }}
      v-card
        v-card-text 
          .flex-col.p20-left
            .p5 Upcoming sessions: 2
            .p5 Completed sessions: 5
</template>
<script>
import moment from 'moment'

export default {
  props: {
    doctorObj: {
      type: Object,
      required: true
    }
  },
}
</script>
