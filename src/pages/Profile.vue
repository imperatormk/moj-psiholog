<template lang="pug">
v-container(fluid style="padding:0")
  v-layout(row wrap)
    v-flex(hidden-sm-and-down md3 column align-center justify-space-between)
      v-navigation-drawer(:value="true" permanent hide-overlay)
        v-toolbar.transparent
          v-list.pa-0
            v-list-tile 
              v-list-tile-avatar
                img(src="https://randomuser.me/api/portraits/men/85.jpg")
              v-list-tile-content
                v-list-tile-title My profile
        v-list.pt-0
          v-divider
          v-list-tile(v-for="item in getItemsForUser" :key="item.title" @click="selectedSubMenu(item)")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ item.title }}
    v-flex(xs12 sm12 md9 column align-center justify-space-between)
      .p10.p5-left
        div(v-if="selectedSub === 'changepw'")
          h2 Change password
          br
          ManagePw
        div(v-if="selectedSub === 'history'")
          ListSessions(listType="history")
        div(v-if="selectedSub === 'upcoming'")
          ListSessions(listType="upcoming")
        div(v-if="selectedSub === 'new-blog'")
          NewBlog
</template>
<script>

import Vue from 'vue'
import ManagePw from '@/components/profile/ManagePw'
import ListSessions from '@/components/profile/ListSessions'
import NewBlog from '@/components/blog/NewBlog'

export default {
  created() {
    this.selectedSubMenu(this.items[0])
  },
  data() {
    return {
      items: [
        { id: 'upcoming', title: 'Upcoming Sessions', icon: 'question_answer' },
        { id: 'history', title: 'Session History', icon: 'question_answer' },
        { id: 'changepw', title: 'Change password', icon: 'dashboard' },
        { id: 'new-blog', title: 'Publish a blog', icon: 'dashboard', for: ['doctor'] },
      ],
      selectedSub: ""
    }
  },
  methods: {
    selectedSubMenu(item){
      this.selectedSub = null
      Vue.nextTick(() => {
        this.selectedSub = item.id
      })
    }
  },
  computed: {
    getItemsForUser() {
      return this.items.filter(item => !item.for || item.for.includes(this.userType))
    }
  },
  components: {
    ManagePw,
    ListSessions,
    NewBlog
  }
};
</script>