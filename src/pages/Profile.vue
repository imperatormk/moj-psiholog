<template lang="pug">
  .p10-top.flex-row
    .flex-1
      v-navigation-drawer.tiny-border(v-model="drawer")
        v-toolbar.transparent
          v-list.pa-0
            v-list-tile 
              v-list-tile-avatar
                img(src="https://randomuser.me/api/portraits/men/85.jpg")
              v-list-tile-content
                v-list-tile-title My profile
        v-list.pt-0
          v-divider
          v-list-tile(v-for="item in items" :key="item.title" @click="selectedSubMenu(item)")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ item.title }}
    .flex-10
      .p10
        div(v-if="selectedSub === 'changepw'")
          ManagePw
        div(v-if="selectedSub === 'history'")
          HistorySessions
        div(v-if="selectedSub === 'upcoming'")
          UpcomingSessions    
</template>
<script>

import ManagePw from '@/components/profile/ManagePw'
import HistorySessions from '@/components/profile/HistorySessions'
import UpcomingSessions from '@/components/profile/UpcomingSessions'

export default {
  data () {
      return {
        drawer: true,
        items: [
          { id:'changepw', title: 'Change password', icon: 'dashboard' },
          { id: 'history', title: 'Session History', icon: 'question_answer' },
          { id: 'upcoming', title: 'Upcoming Sessions', icon: 'question_answer' }
        ],
        selectedSub: ""
      }
    },
  methods: {
    selectedSubMenu(item){
      this.selectedSub = item.id
    }
  },
  components: {
    ManagePw,
    HistorySessions,
    UpcomingSessions
  }
};
</script>