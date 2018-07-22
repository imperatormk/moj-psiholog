<template lang="pug">
  .fit
    h2 {{ getTitle }}
    br
    div(v-if="loaded")
      div(v-if="hasSessions")
        v-expansion-panel(focusable inset)
          SessionDetails(v-for="session in sessionList" :key="session.id" :sessionObj="session")
      div(v-else)
        p No past sessions
    div(v-else)
      Loading
</template>
<script>
import SessionDetails from '@/components/session/SessionDetails'
import Loading from "@/components/common/Loading"
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
      return this.sessionList.length !== 0
    },
    getTitle() {
      const upcomingTitle = 'Upcoming sessions'
      const historyTitle = 'Session history'
      return this.listType === 'upcoming' ? upcomingTitle : historyTitle
    }
  },
  components: {
    SessionDetails,
    Loading
  }
}
</script>