<template lang="pug">
.flex-col.fit.align-center.justify-center.p10
  div(v-if="session")
    .p10
      h1 Video Chat - Session ID {{ session.id }}
    div(v-if="connectedToChat")
      .p10(v-if="isPatient")
        .flex-col.justify-end
          Dialog(v-if="pendingCall" :resultCb="pendingCallResult")
          template(v-if="!sessionState.doctorConnected")
            h3 Waiting for doctor {{ session.doctor.email }}
          template(v-else)
            .p10(v-if="established")
              Counter
            .p10(v-else)
              h3 Doctor connected, hang on...
          VideoChatContainer(:sessionId="sessionKey")
          v-btn(@click="disconnect") Disconnect
      .p10(v-if="isDoctor")
        .flex-col
          VideoChatContainer(v-if="established" :sessionId="sessionKey")
          .p10
            template(v-if="!sessionState.patientConnected")
              h3 Waiting for patient...
            template(v-else)
              .p10(v-if="established")
                Counter
              .p10(v-else)
                h3 Patient connected
                v-btn(@click="callPatient()") Call
          br
    div(v-else)
      .p10
        h3 You are not connected to chat
      v-btn(@click="initEvents()") Reconnect
  div(v-else)
    .p10
      h3 No session?
</template>
<script>

import VideoChatContainer from '@/components/video-chat/VideoChatContainer'
import Dialog from '@/components/common/Dialog'
import Counter from '@/components/counter/Counter'

export default {
  props: {
    sessionProp: {
      type: Object,
      default: null
    }
  },
  created() {
    if (this.sessionProp) {
      this.session = JSON.parse(JSON.stringify(this.sessionProp)) // haha
      this.scChannel = this.getChannel(this.sessionCh)
      this.initEvents()
    }
  },
  beforeDestroy() {
    this.disconnect()
  },
  data: () => ({
    scChannel: null,
    session: null,
    connectedToChat: false,
    established: false,
    pendingCall: false
  }),
  methods: {
    updateSession(data) {
      this.session.callState = data
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
      if (actionData.event === 'callInvite') {
        this.callInvite(actionData.data)
      }
    },
    callInvite() {
      this.pendingCall = true
    },
    acceptCall() {
      this.emitEvent('acceptCall', {
        session: this.session
      })
      this.established = true
    },
    // doctor fns
    onPatientAction(actionData) { // map actions?
      console.log('data from patient to doc:', actionData)
      if (actionData.event === 'acceptCall') this.established = true
      // well do stuff here...
    }, 
    callPatient() {
      this.emitEvent('callPatient', {
        session: this.session
      })
    },
    pendingCallResult(result) {
      if (result.accepted === true) {
        this.acceptCall()
      }
      this.pendingCall = false
    }
  },
  computed: {
    sessionCh() {
      return this.session ? `sess-${this.session.id}` : ''
    },
    sessionState() {
      return this.session.callState
    },
    sessionKey() {
      return this.session.sessionKey
    }
  },
  components: {
    VideoChatContainer,
    Dialog,
    Counter
  },
};
</script>