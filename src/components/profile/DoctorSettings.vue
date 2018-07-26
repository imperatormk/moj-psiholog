<template lang="pug">
  .fit
    div(v-if="loaded && isDoctor")
      div(v-if="!isReady")
        v-alert(:value="true" type="info")
          h4 Important! You seem to be a brand new doctor, so you need to enter some crucial data before you can start getting booked
        v-stepper
          v-stepper-header
            v-stepper-step(editable :complete="!!details.name" step="1")
              span Your name
            v-divider
            v-stepper-step(editable :complete="!!details.bio" step="2")
              span Your bio
            v-divider
            v-stepper-step(editable :complete="!!details.price" step="3")
              span Session price
            v-divider
            v-stepper-step(editable step="4")
              span Review and confirm
          v-stepper-content(step="1")
            .center
              v-text-field(hide-details label="Name" v-model="details.name")
          v-stepper-content(step="2")
            wysiwyg.fit(v-model="details.bio")
          v-stepper-content(step="3")
            .center
              v-text-field(hide-details prefix="$" label="Price/session" v-model.number="details.price" type="number" min="0")
          v-stepper-content(step="4")
            .center
              .flex-col(v-if="isValid")
                //- TODO: make this more vuetiful
                .flex-row.tiny-border.space-around.p10.br5
                  .flex-col.fit.text-left
                    span Name
                    span Bio
                    span Price     
                  .flex-col.fit.text-right
                    span {{ details.name }}
                    span {{ getShortBio }}
                    span {{ details.price }}
                .p10-top
                  v-btn.no-margin(outline @click="saveChanges") Save changes
              div(v-else)
                span It seems still have some data left to fill in!
      .flex-col(v-else)
        .flex-row.center.p10-bot.p10-side
          v-text-field(hide-details label="Name" v-model="details.name")
        .flex-col.center.p10
          .fs15.p10 Biography
          wysiwyg.fit(v-model="details.bio")
        .flex-row.center.p10
          v-text-field(hide-details prefix="$" label="Price/session" v-model.number="details.price" type="number" min="0")
        .flex-row.center.p10
          v-btn(outline @click="saveChanges") Save changes
    div(v-else)
      Loading
</template>

<script>

import Loading from '@/components/common/Loading'

export default { // TODO: avatar
  created() {
    this.$api.getDoctor(this.userId, false)
      .then(res => {
        const resMini = JSON.parse(JSON.stringify(res))
        // haha
        delete resMini.doctor
        if (resMini.price < 0) resMini.price = 0
        // haha

        this.details = resMini
        this.loaded = true
      })
  },
  data() {
    return {
      details: {},
      loaded: false
    }
  },
  methods: {
    saveChanges() {
      if (this.isValid) {
        this.$api.updateDoctor(this.userId, this.details)
          .then((res) => {
            if (res.success) this.details.ready = true
          })
      }
    }
  },
  computed: {
    isReady() {
      return this.details.ready
    },
    isValid() {
      let valid = true
      const exceptions = ['ready']

      Object.keys(this.details).forEach(key => {
        if (!exceptions.includes(key)) {
          if (!this.details[key]) valid = false
        }
      })

      return valid
    },
    getShortBio() {
      const limit = 100
      const content = this.details.bio
      if (!content) return '' // mkay
      return content.length > limit ? `${content.substring(0, limit)}...` : content
    }
  },
  components: {
    Loading
  }
}
</script>
