<template lang="pug">
  v-layout(row wrap)
    v-flex(hidden-sm-and-down md3 column align-center justify-space-between)
      v-navigation-drawer(:value="true" permanent hide-overlay)
        v-list.pt-0
          v-list-tile(v-for="item in getItemsForUser" :key="item.id" :value="item.id" :class="{ highlighted: item.id === selectedSub }" @click="selectedSubMenu(item)")
            v-list-tile-action
              v-icon(color="black") {{ item.icon }}
            v-list-tile-content
              v-list-tile-title 
                span.font-black {{ item.title }}
    v-flex(xs12 sm12 md9 column align-center justify-space-between)
      .p20
        h2 {{ getCurrentTitle }}
        br
        div(v-if="selectedSub === 'doctor-account'")
          DoctorSettings
        div(v-else-if="selectedSub === 'changepw'")
          ManagePw(@passChanged="passChanged($event)")
        div(v-else-if="selectedSub === 'history'")
          ListSessions(listType="history")
        div(v-else-if="selectedSub === 'upcoming'")
          ListSessions(listType="upcoming")
        div(v-else-if="selectedSub === 'new-blog'")
          NewBlogPanel
        div(v-else-if="selectedSub === 'manage-staff'")
          ManageDoctors
        div(v-else-if="isPatient && selectedSub === 'personality-test'") 
          PersonalityTest

    v-flex(hidden-md-and-up sm12 xs12 column align-center justify-space-between)
      div(style="margin-top: 56px;")
        v-bottom-nav(fixed shift :value="true" :active.sync="selectedSub" style="box-shadow: 0 0 0 0;")
          v-btn(flat v-for="item in getItemsForUser" :key="item.id" :value="item.id" @click="selectedSubMenu(item)")
            span {{ item.title }}
            v-icon {{ item.icon }}
</template>
<script>

import Vue from 'vue'
import DoctorSettings from '@/components/profile/DoctorSettings'
import ManagePw from '@/components/profile/ManagePw'
import ListSessions from '@/components/profile/ListSessions'
import NewBlogPanel from '@/components/blog/NewBlogPanel'
import ManageDoctors from '@/components/profile/admin/manage-doctors/ManageDoctors'
import PersonalityTest from '@/pages/PersonalityTest'

export default {
  created() {
    this.initMenu()
  },
  data() {
    return {
      items: [
        { id: 'doctor-account', title: 'Account', icon: 'dashboard', for: ['doctor'] },
        { id: 'upcoming', title: 'Upcoming', icon: 'question_answer' },
        { id: 'history', title: 'History', icon: 'question_answer' },
        { id: 'changepw', title: 'Change password', icon: 'dashboard' },
        { id: 'new-blog', title: 'Publish a blog', icon: 'dashboard', for: ['doctor'] },
        { id: 'manage-staff', title: 'Manage staff', icon: 'dashboard' },
        { id: 'personality-test', title: 'Personality test', icon: 'dashboard' }

      ],
      selectedSub: ''
    }
  },
  methods: {
    initMenu() {
      this.selectedSubMenu(this.getItemsForUser[0])
    },
    selectedSubMenu(item){
      this.selectedSub = null
      Vue.nextTick(() => {
        this.selectedSub = item.id
      })
    },
    passChanged(reqData) {
      this.$api.changePassword(reqData)
        .then((resp) => {
          const successMsg = "Password changed successfully!"
          const failureMsg = 'Oops! Something went wrong... please try again or contact support.'

          this.$messageBus.$emit('alert', {
            message: resp.success ? successMsg : failureMsg,
            duration: 2500,
            cb: this.initMenu
          })
        })
    }
  },
  computed: {
    getItemsForUser() {
      return this.items.filter(item => !item.for || item.for.includes(this.userType))
    },
    getCurrentTitle() {
      const selection = this.items.find(item => item.id === this.selectedSub)
      return selection ? selection.title : ''
    }
  },
  components: {
    DoctorSettings,
    ManagePw,
    ListSessions,
    NewBlogPanel,
    ManageDoctors,
    PersonalityTest
  }
};
</script>