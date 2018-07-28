<template lang="pug">
  .fit
    div(v-if="loaded")
      div(v-if="hasSessions")
        v-expansion-panel(focusable inset)
          SessionDetails(v-for="session in sortedSessionList" :key="session.id" :sessionObj="session")
      div(v-else)
        p No {{ getMeta }} sessions
    div(v-else)
      Loading
</template>

<script>

import SessionDetails from '@/components/session/SessionDetails'
import Loading from '@/components/common/Loading'

export default {
  props: {
    listType: {
      type: String,
      required: true
    }
  },
  created() {
    const upcomingApiFn = this.$api.getPendingSessionsForUser 
    const historyApiFn = this.$api.getCompletedSessionsForUser

    const apiFn = this.listType === 'upcoming' ? upcomingApiFn : historyApiFn
    apiFn({ id: this.userId })
      .then(res => {
        this.sessionList = res
        this.loaded = true
      })
  },
  data() {
    return {
      sessionList: [],
      loaded: false
    }
  },
  computed: {
    hasSessions() {
      return this.sessionList.length
    },
    getMeta() {
      return this.listType === 'upcoming' ? 'upcoming' : 'past'
    },
    sortedSessionList() {
      return this.sessionList.sort((a, b) => {
        if (a.id < b.id) return 1
        if (a.id > b.id) return -1
        return 0
      })
    }
  },
  components: {
    SessionDetails,
    Loading
  }
}
</script>