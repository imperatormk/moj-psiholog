<template lang="pug">
  Page(:loaded="loaded")
    DoctorDetails(:docProp="docProp")
</template>
<script>

import Page from '@/components/common/Page'
import DoctorDetails from '@/pages/DoctorDetails'

export default {
  created() {
    this.docProp = {
      id: this.$route.params.id,
      name: 'Дарко Симоновски',
      avatar: 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
      totalSessions: 14,
      rating: 4.7,
      sessionRate: 40,
      reviews: [{
        id: 1,
        comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
      }, {
        id: 2,
        comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
      }],
      publications: [{
        id: 1
      }, { 
        id: 2
      }]
    }
    this.loaded = true
  },
  data: () => ({
    docProp: null,
    loaded: false
  }),
  components: {
    Page,
    DoctorDetails
  },
};
</script>