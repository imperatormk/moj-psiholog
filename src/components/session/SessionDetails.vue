<template lang="pug">
  .fit
    v-expansion-panel-content
      div(slot="header")
        .flex-row.space-between.align-center
          .flex-row.align-center
            v-chip.no-margin(disabled small outline)
              span # {{ sessionObj.id }}
          span {{ getDatetime }}
      v-card
        v-card-text 
          .flex-col.p20-left
            span(v-if="isPatient") With {{ sessionObj.doctor.details.name }}
            .flex-row.align-center(v-if="isDoctor")
              span With user by email &nbsp;
              span.br10(style="background:#eeeeee;padding:0 5px;") {{ sessionObj.patient.email }}
            span(v-if="sessionObj.meta") Lasted {{ sessionObj.meta.duration }} seconds
            div
              span(v-if="sessionObj.Payment") {{ getCostsVerb }} ${{ sessionObj.Payment.amount }}
              v-chip(v-else disabled small outline color="green") Free session
</template>
<script>
import moment from 'moment'

export default {
  props: {
    sessionObj: {
      type: Object,
      required: true
    }
  },
  computed: {
    getCostsVerb() { // woah
      return this.sessionObj.status === 'completed' ? 'Costed' : 'Costs'
    },
    getDatetime() {
      const datetime = this.sessionObj.datetime
      return moment(datetime).format('DD/MM/YYYY HH:mm')
    }
  }
}
</script>
