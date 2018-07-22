<template lang="pug">
.flex-col.fit.align-center.justify-center.p10
  div(v-if="session")
    .p10
      h1 Video Chat - Session ID {{ session.id }}
      Counter(:ongoing="isOngoing")
    div(v-if="connectedToChat")
      .p10(v-if="isPatient")
        .flex-col.justify-end
          Dialog(v-if="pendingCall" :resultCb="pendingCallResult")
          template(v-if="!sessionState.doctorConnected")
            h3 Waiting for doctor {{ session.doctor.email }}
          template(v-else)
            .p10(v-if="!established")
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
              .p10(v-if="!established")
                h3 Patient connected
                v-btn(@click="callPatient()") Call
              .p10(v-else)
                v-btn(@click="finishSession()") Finish session
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
      this.scChannel = this.getChannel(this.sessionChannel)
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
    pendingCall: false,
    eventSub: false
  }),
  methods: {
    updateSession(data) {
      this.session.callState = data
    },
    disconnect() {
      if (this.sessionProp) {
        this.unsubEvents()
      }      
    },
    initEvents() {
      if (!this.eventSub) {
        this.connectedToChat = true
        this.scChannel.watch((data) => {
          if (data.event === 'sessionChange') {
            this.updateSession(data.data)
          } else if (data.event === 'sessionFinished') {
            this.onSessionFinished()
          } else {
            if (this.userType === 'patient') {
              this.onDoctorAction(data)
            } else if (this.userType === 'doctor') {
              this.onPatientAction(data)
            }
          }
        })
        this.scChannel.subscribe()
        this.eventSub = true
      }
    },
    unsubEvents() {
      if (this.eventSub) {
        this.connectedToChat = false
        if (this.userType === 'patient') {
          this.offEvent('callInvite')
        } else if (this.userType === 'doctor') {
          
        }
        this.scChannel.unsubscribe()
        this.scChannel.unwatch()
        this.eventSub = false
      }
    },
    // patient fns
    onDoctorAction(actionData) { // map actions?
      if (actionData.event === 'callInvite') {
        this.callInvite(actionData.data)
      }
    },
    onSessionFinished() {
      this.disconnect()
      this.$emit('sessionFinished')
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
    pendingCallResult(result) {
      if (result.accepted === true) {
        this.acceptCall()
      }
      this.pendingCall = false
    },
    // doctor fns
    onPatientAction(actionData) { // map actions?
      if (actionData.event === 'acceptCall') {
        this.established = true
      }
    }, 
    callPatient() {
      this.emitEvent('callPatient', {
        session: this.session
      })
    },
    finishSession() {
      this.emitEvent('finishSession', {
        session: this.session
      })
    }
  },
  computed: {
    sessionChannel() {
      return this.session ? `sess-${this.session.id}` : ''
    },
    sessionState() {
      return this.session.callState
    },
    sessionKey() {
      return this.session.sessionKey
    },
    isOngoing() {
      return this.session.callState.doctorConnected && this.session.callState.patientConnected && this.established
    }
  },
  components: {
    VideoChatContainer,
    Dialog,
    Counter
  },
};
</script>