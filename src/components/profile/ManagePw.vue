<template lang="pug">
  v-layout(row wrap justify-center)
    v-flex.tiny-border(xs12 sm8 md8 column align-center)
      v-text-field.p10(color="light-green" type="password" @keyup.enter="submitPassword" placeholder="Enter your current password" hide-details 
        v-model="passwordData.current" v-if="isExisting")       
      v-text-field.p10(color="light-green" type="password" @keyup.enter="submitPassword" placeholder="Enter your new password" hide-details v-model="passwordData.newA") 
      v-text-field.p10(color="light-green" type="password" @keyup.enter="submitPassword" placeholder="Repeat your password" hide-details v-model="passwordData.newB") 
      v-btn(outline :disabled="!isValid" @click="submitPassword") Submit
</template>
<script>

export default {
  props: {
    isExisting: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      passwordData: {
        current: '',
        newA: '',
        newB: ''
      }
    }
  },
  methods: {
    submitPassword() {
      if (this.isValid) {
        const reqObj = {}
        reqObj.email = this.userEmail
        
        const passData = {}
        if (this.isExisting) {
          passData.current = this.passwordData.current.trim()
        }
        passData.newA = this.passwordData.newA.trim()
        passData.newB = this.passwordData.newB.trim()

        reqObj.passData = passData
        this.$emit('passChanged', reqObj)
      }
    }
  },
  computed: {
    isValid() { // may need more validation
      return this.passwordData.current.trim() &&
        this.passwordData.newA.trim() &&
        this.passwordData.newB.trim() &&
        this.passwordData.newA.trim() === this.passwordData.newB.trim()
    }
  }
}
</script>

