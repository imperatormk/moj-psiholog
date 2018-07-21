<template lang="pug">
  .fit
    div(v-if="loaded")
      div(v-if="hasSessions")
        v-expansion-panel.w100
          SessionDetails(v-for="session in sessionList" :key="session.id" :sessionObj="session")
      div(v-else)
        p No current sessions
    div(v-else)
      Loading

</template>
<script>
import SessionDetails from '@/components/session/SessionDetails'
import Loading from "@/components/common/Loading"
export default {
  created() {
    this.$api.getPendingSessionsForUser({ id: this.userId })
      .then(res => {
        console.log(res)
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

