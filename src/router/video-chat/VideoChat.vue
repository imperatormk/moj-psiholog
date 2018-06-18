<template>
<div>
  <echo-client event="connect" :onData="connect"></echo-client>
  <div v-if="type==='patient'">
    <div v-if="connected">
      <p>Video Chat</p>
      <p>My ID: {{ patientId }}</p>
      <VideoChatContainer v-if="established" :sessionDataProp="sessionData" />
    </div>
  </div>
  <div v-if="type==='doctor'">
    <div v-if="connected">
      <VideoChatContainer @sessionCreated="storeSession($event)" />
      <div v-for="patient in patientArr" :key="patient.patientId">
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
    patientArr: [],
    sessionData: null
  }),
  methods: {
    connect() {
      console.log('connected')
      this.connected = true
      this.initEvents()
    },
    initEvents() {
      if (this.type === 'patient') {
        const patientId = `patient-${Math.floor(Math.random() * 100) + 1}`
        this.patientId = patientId
        this.subscribe('callInvite', this.callInvite)
        this.emitEvent('newPatient', { patientId })
      } else if (this.type === 'doctor') {
        this.onEvent('getPatients', this.getPatients)
        this.emitEvent('getPatients')
      }
    },
    // patient fns
    callInvite(callData) {
      if (callData.patient.patientId === this.patientId) {
        console.log('callInvite', callData.sessionData)
        this.sessionData = callData.sessionData
        this.established = true
      }
    },
    acceptCall() {
      this.emitEvent('acceptCall', { patientId: this.patientId })
    },
    // doctor fns
    storeSession(sessionData) {
      this.sessionData = sessionData
    },
    getPatients(patients) {
      this.patientArr = patients
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