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
              span With user by email
              span.br10(style="background:#eeeeee;padding:0 5px;") &nbsp;{{ sessionObj.patient.email }}
            span(v-if="sessionObj.meta") Lasted {{ getDuration(sessionObj.meta.duration) }}
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
  methods: {
    getDuration(seconds) {
      const format = seconds >= 3600 ? 'HH:mm:ss' : 'mm:ss'
      return moment("2015-01-01").startOf('day')
      .seconds(seconds)
      .format(format)
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
