<template lang="pug">
  v-container(fluid style="padding:0")
    div
      Intro
    v-layout(row wrap)
      DoctorCard(v-for="doc in docs" :key="doc.id" :docProp="doc")
</template>

<script>

import Intro from '@/components/sections/intro/Intro'
import DoctorCard from '@/components/doctor-card/DoctorCard'

export default {
  created() {
    /* this.$api.getDoctors()
      .then((doctors) => {
        console.log(doctors)
      }) */
  },
  data: () => ({
    docs: [{
      id: 53,
      name: 'Дарко Симоновски',
      bio: 'Lorem ipsum dolor sit ameta ectetur adipiscing elit. Sed ementum nulla, eu pla',
      img: ''
    }, {
      id: 2,
      name: 'Tomski',
      bio: 'Lorem ipsum dolor sit ameta ectetur adipiscing elit. Sed ementum nulla, eu pla',
      img: ''
    }, {
      id: 3,
      name: 'Zimz',
      bio: 'Lorem ipsum dolor sit ameta ectetur adipiscing elit. Sed ementum nulla, eu pla',
      img: ''
    }, {
      id: 4,
      name: 'Tube',
      bio: 'Lorem ipsum dolor sit ameta ectetur adipiscing elit. Sed ementum nulla, eu pla',
      img: ''
    }]
  }),
  components: {
    Intro,
    DoctorCard
  },
};
</script>