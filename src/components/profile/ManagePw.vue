<template lang="pug">
  div
    v-text-field.tiny-border( :append-icon="show3 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Not visible"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show3 = !show3")



            
    v-text-field.tiny-border(label="New password" placeholder="Enter your new password" hide-details v-model="passwordData.newPassword") 
    v-text-field.tiny-border(label="Repeat password" placeholder="Repeat your  password" hide-details v-model="passwordData.newPasswordConfirm") 
    v-btn(outline @click="submitPassword") Submit
</template>
<script>

export default {
  data() {
    return {
      passwordData: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        }
      
    }
  },
  methods: {
    submitPassword() {
        if(this.passwordData.currentPassword != "" &&
            this.passwordData.newPassword == this.passwordData.newPasswordConfirm){
              console.log("okeeej")
        }else{
          
        }
    }
  }
}
</script>

