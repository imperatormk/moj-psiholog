<template lang="pug">
  v-layout(row wrap justify-center)
    v-flex.tiny-border(xs12 sm8 md8 column align-center)
      span.fs16 Add new doctor
      .p5
        v-text-field(color="light-green" @keyup.enter="addDoctor" label="First name"
                          v-model="doctorData.name" hide-details)       
      .p5
        v-text-field(color="light-green"  @keyup.enter="addDoctor" label="Last name" 
                        v-model="doctorData.surname" hide-details)
      .p5
        v-text-field(color="light-green"  @keyup.enter="addDoctor" label="Email address"
                        v-model="doctorData.email"  hide-details)
      .p5
        v-btn(outline :disabled="!isValid" @click="addDoctor") Submit
</template>
<script>
export default {
  data() {
    return {
      doctorData: {
        name: '',
        surname: '',
        email: ''
      }
    }
  },
  methods:{
    addDoctor() {
      const reqObj = {
        name: this.doctorData.name,
        surname: this.doctorData.surname,
        email: this.doctorData.email
      }
      this.doctorData = {
        name: '',
        surname: '',
        email: ''
      }
      this.$emit('addDoctor', reqObj)
    }
  },
  computed: {
    isValid() { 
      return this.doctorData.name.trim() &&
              this.doctorData.surname.trim() &&
              this.doctorData.email.trim()
    }
  }
}
</script>
