<template lang="pug">
  div
    v-text-field.tiny-border(placeholder="Enter your current password" hide-details v-model="passwordData.currentPassword"
                              v-if="isExisting")       
    v-text-field.tiny-border(placeholder="Enter your new password" hide-details v-model="passwordData.newPassword") 
    v-text-field.tiny-border(placeholder="Repeat your password" hide-details v-model="passwordData.newPasswordConfirm") 
    v-btn(outline  @click="submitPassword") Submit
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
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      }
    }
  },
  methods: {
    submitPassword() {
      const passObj = {}
      if (this.isExisting) {
          passObj.currentPassword = this.passwordData.currentPassword
          passObj.newPassword = this.passwordData.newPassword
      } else {
          passObj.newPassword = this.passwordData.newPassword
      }
     this.$emit('passChanged', passObj)
    }
  }
}
</script>

