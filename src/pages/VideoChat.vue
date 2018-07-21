<template lang="pug">
div(v-if="loaded")
  .flex-col.fit.align-center.justify-center.p10
    div(v-if="session")
      .p10
        h1 Video Chat - Session ID {{ session.id }}
      div(v-if="connectedToChat")
        .p10(v-if="isPatient")
          .flex-col.justify-end
            Dialog(v-if="pendingCallData" :resultCb="pendingCallDataResult")
            template(v-if="!sessionData.doctorConnected")
              h3 Waiting for doctor {{ session.doctor.email }}
            template(v-else)
              .p10(v-if="established")
                Counter
              .p10(v-else)
                h3 Doctor connected, hang on...
            VideoChatContainer(v-if="established" :videoSessionDataProp="videoSessionData")
            v-btn(@click="disconnect") Disconnect
        .p10(v-if="isDoctor")
          .flex-col
            VideoChatContainer(@sessionCreated="storeSession($event)")
            .p10
              template(v-if="!sessionData.patientConnected")
                h3 Waiting for patient...
              template(v-else)
                .p10(v-if="established")
                  Counter
                .p10(v-else)
                  h3 Patient connected
                  v-btn(@click="callPatient(session.patient)") Call
            br
      div(v-else)
        .p10
          h3 You are not connected to chat
        v-btn(@click="initEvents()") Reconnect
    div(v-else)
      .p10
        h3 No session?
div(v-else)
  .p10
    h3 Loading from API or something...
</template>
<script>

import VideoChatContainer from '@/components/video-chat/VideoChatContainer'
import Dialog from '@/components/common/Dialog'
import Counter from '@/components/counter/Counter'

export default {
  created() {
    this.$api.getReadySessionsForUser({ id: this.userId})
      .then((sessionRes) => {
        this.session = sessionRes.success ? { ...sessionRes.payload } : null

        if (sessionRes.success) {
          this.scChannel = this.getChannel(this.sessionCh)
          this.initEvents()
        }
        this.loaded = true
      })
  },
  beforeDestroy() {
    this.disconnect()
  },
  data: () => ({
    loaded: false,
    scChannel: null,
    sessionData: {},
    session: null, // hmm
    connectedToChat: false,
    established: false,
    videoSessionData: null,
    pendingCallData: false
  }),
  methods: {
    updateSession(data) {
      this.sessionData = data
      console.log('updateSession', data)
    },
    disconnect() {
      this.unsubEvents()
      this.connectedToChat = false
    },
    initEvents() {
      this.connectedToChat = true
      if (this.userType === 'patient') {
        this.onEvent('callInvite', this.callInvite)
        this.scChannel.watch((data) => {
            if (data.event === 'sessionChange') {
              this.updateSession(data.data)
            } else {
              this.onDoctorAction(data)
            }
          })
        this.scChannel.subscribe()
      } else if (this.userType === 'doctor') {
        this.scChannel.watch((data) => {
            if (data.event === 'sessionChange') {
              this.updateSession(data.data)
            } else {
              this.onPatientAction(data)
            }
          })
        this.scChannel.subscribe()
      }
    },
    unsubEvents() {
      if (this.userType === 'patient') {
        this.offEvent('callInvite')
      } else if (this.userType === 'doctor') {
        
      }
      this.scChannel.unsubscribe()
      this.scChannel.unwatch()
    },
    // patient fns
    onDoctorAction(actionData) { // map actions?
      console.log('data from doc to patient:', actionData)
      if (actionData.event === 'callInvite') this.callInvite(actionData.data)
      // well do stuff here...
    },
    callInvite(callData) {
      this.pendingCallData = callData
    },
    acceptCall() {
      this.emitEvent('acceptCall', {
        session: this.session
      })
      this.videoSessionData = {
        ...this.pendingCallData
      }
      this.established = true
    },
    // doctor fns
    storeSession(videoSessionData) {
      this.videoSessionData = videoSessionData
    },
    onPatientAction(actionData) { // map actions?
      console.log('data from patient to doc:', actionData)
      if (actionData.event === 'acceptCall') this.established = true
      // well do stuff here...
    }, 
    callPatient(patient) {
      this.emitEvent('callPatient', {
        session: this.session,
        videoSessionData: this.videoSessionData
      })
    },
    pendingCallDataResult(result) {
      if (result.accepted === true) {
        this.acceptCall()
      }
      this.pendingCallData = null
    }
  },
  computed: {
    sessionCh() {
      return this.session ? `sess-${this.session.id}` : ''
    }
  },
  components: {
    VideoChatContainer,
    Dialog,
    Counter
  },
};
</script>