<template lang="pug">
  div
    v-toolbar(fixed color="blue-grey darken-2")
      v-toolbar-title
        span.font-white MojPsiholog
      v-spacer
      v-toolbar-items
        v-btn(flat)
          span.font-white Btn 1
        v-btn(flat)
          span.font-white Btn 2
        v-btn(flat)
          span.font-white Btn 3
    div(style="margin-top:55px;")
      .flex-row.space-around.section100(style="background:yellow;")
        Intro
      .flex-row.space-around.section60(style="background:green;")
        DoctorCard(v-for="doc in docs" :key="doc.id" :docProp="doc")
      .flex-row.space-around.align-center.section(style="background:red;")
        p Test 1
        p Test 2
</template>

<script>

import Intro from '@/components/sections/intro/Intro'
import DoctorCard from '@/components/doctor-card/DoctorCard'

export default {
  created() {
    this.$api.getDoctors()
      .then((doctors) => {
        console.log(doctors)
      })
  },
  data: () => ({
    docs: [{
      id: 1,
      name: 'Mrmak'
    }, {
      id: 2,
      name: 'Tomski'
    }, {
      id: 3,
      name: 'Zimz'
    }, {
      id: 4,
      name: 'Tube'
    }]
  }),
  components: {
    Intro,
    DoctorCard
  },
};
</script>