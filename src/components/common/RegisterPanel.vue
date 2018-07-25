<template lang="pug">
  .intro-card.flex-col.space-around(v-if="!isLoggedIn")
    span.uppercase.font-title Book an appointment
    span.p10.font-paragraph(style="display:block;") Enter your email address to get started. First session free!
    .flex-row.input-box-container
      input.no-focus.input-box.italic(@keyup.enter="accountSubmit" placeholder="Email" type="email" v-model="email")
      .input-icon.flex-row.align-center.justify-center(style="width:50px;")
        v-icon(color="gray") airplay
    .flex-row.justify-start
      v-btn(color="light-green" outline :disabled="!isValidEmail" @click="accountSubmit") Submit Now
</template>

<script>
export default {
  data: () => ({
    email: ''
  }),
  methods: {
    accountSubmit() {
      if (this.isValidEmail) {
        this.$emit('accountSubmit', this.validEmail)
        this.email = ''
      }
    }
  },
  computed: {
    validEmail() {
      return this.email.trim()
    },
    isValidEmail() {
      return !!this.validEmail
    }
  }
}
</script>

