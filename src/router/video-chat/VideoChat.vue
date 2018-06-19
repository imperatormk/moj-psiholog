<template>
<div>
  <echo-client event="connect" :onData="connect"></echo-client>
  <div v-if="type==='patient'">
    <div v-if="connected">
      <p>Video Chat</p>
      <p>My ID: {{ patientId }}</p>
      <div style="background:red;height:50%;width:50%;" v-if="pendingCall">
        <h1>You are being called...</h1>
        <button @click="acceptCall">Accept</button>
      </div>
      <VideoChatContainer v-if="established" :sessionDataProp="sessionData" />
      <button @click="disconnect">Disconnect</button>
    </div>
  </div>
  <div v-if="type==='doctor'">
    <div v-if="connected">
      <VideoChatContainer @sessionCreated="storeSession($event)" />
      <div v-for="patient in patientList" :key="patient.patientId">
        {{ patient.patientId }}
        <button @click="callPatient(patient)">Call</button>
      </div><br>
    </div>
  </div>
</div>
</template>
<script>

import MessageBus from '@/services/messageBus'
import VideoChatContainer from '@/components/video-chat/VideoChatContainer'

export default {
  created() {
    if (this.$route.params.type) this.type = this.$route.params.type
  },
  data: () => ({
    connected: false,
    type: '',
    established: false,
    patientList: [],
    sessionData: null,
    pendingCall: false
  }),
  methods: {
    connect() {
      this.connected = true
      this.initEvents()
    },
    disconnect() {
      this.connected = false
      if (this.type === 'patient') {
        this.emitEvent('patientDisconnect', { patientId: this.patientId })
      }
    },
    initEvents() {
      if (this.type === 'patient') {
        const patientId = `patient-${Math.floor(Math.random() * 100) + 1}`
        this.patientId = patientId
        this.subscribe('callInvite', this.callInvite)
        this.emitEvent('patientConnect', { patientId })
      } else if (this.type === 'doctor') {
        this.onEvent('getPatients', this.getPatients)
        this.subscribe('patientAction', this.onPatientAction)
        this.emitEvent('getPatients')
      }
    },
    // patient fns
    callInvite(callData) {
      if (callData.patient.patientId === this.patientId) {
        console.log('callInvite', callData.sessionData)
        this.pendingCall = callData
      }
    },
    acceptCall() {
      this.emitEvent('acceptCall', { patientId: this.patientId })
      this.sessionData = this.pendingCall.sessionData // hmm refactor
      this.pendingCall = null
      this.established = true
    },
    // doctor fns
    storeSession(sessionData) {
      this.sessionData = sessionData
    },
    getPatients(patients) {
      this.patientList = patients
    },
    onPatientAction(actionData) {
      if (actionData.event === 'connected') {
        this.patientList.push(actionData.patient)
      } else if (actionData.event === 'disconnected') {
        this.patientList = this.patientList.filter(patientObj => (patientObj.patientId !== actionData.patient.patientId))
      }
    }, 
    callPatient(patient) {
      this.emitEvent('callPatient', {
        patient,
        sessionData: this.sessionData
      })
    },
    // utils
    emitEvent(name, data) {
      this.$echoClient.emit(name, data)
    },
    onEvent(name, cb) {
      this.$echoClient.on(name, (data) => {
        cb(data)
      })
    },
    subscribe(name, cb) {
      this.$echoClient.subscribe(name).watch((data) => {
        cb(data)
      })
    }
  },
  components: {
    VideoChatContainer
  },
};
</script>