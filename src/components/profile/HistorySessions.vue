<template lang="pug">
  .fit
    h2 Session history
    br
    div(v-if="loaded")
      div(v-if="hasSessions")
        v-expansion-panel.w100
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
  created() {
    this.$api.getCompletedSessionsForUser({ id: this.userId })
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
    }
  },
  components: {
    SessionDetails,
    Loading
  }
}
</script>