<template lang="pug">
  div
    div
      div(v-if="loaded")
        .p20(v-if="hasDoctors")
          v-expansion-panel(focusable inset)
            DoctorDetails(v-for="doctor in doctors" :key="doctor.id" :doctorObj="doctor") {{ doctor.name }}
        div(v-else)
          p No staff at the moment
      div(v-else)
        Loading
      AddDoctors(@addDoctor="addNewDoctor($event)")
</template>

<script>

import Vue from 'vue'
import AddDoctors from '@/components/profile/admin/manage-doctors/AddDoctors'
import Loading from '@/components/common/Loading'
import DoctorDetails from '@/components/profile/admin/manage-doctors/DoctorDetails'

export default {
  created() {
    this.loadDoctors()
  },
  data() {
    return {
      loaded: false,
      doctors: []
    }   
  },
  methods: {
    loadDoctors() {
      this.loaded = false
      this.$api.getDoctors(false)
        .then(res => {
          this.doctors = res
          this.loaded = true
        })
    },
    addNewDoctor(doctorObj) {
      this.$api.createAccount({
        email: doctorObj.email,
        name: `${doctorObj.name} ${doctorObj.surname}`,
        type: 'doctor'
      }).then((resp) => {
        const successMsg = "Doctor added succsesfully."
        const failureMsg = 'Oops! Something went wrong... please try again or contact support.'

        this.loadDoctors()
        this.$messageBus.$emit('alert', {
          message: resp.success ? successMsg : failureMsg,
          duration: 2500
        })
      })
    }
  },
  computed: {
    hasDoctors() {
      return this.doctors.length
    }
  },
  components: {
    AddDoctors,
    Loading,
    DoctorDetails
  },
}
</script>
