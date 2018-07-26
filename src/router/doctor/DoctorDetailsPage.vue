<template lang="pug">
  Page(:loaded="loaded")
    DoctorDetails(:docProp="docProp")
</template>
<script>

import Page from '@/components/common/Page'
import DoctorDetails from '@/pages/DoctorDetails'

export default {
  created() {
    const doctorId = this.$route.params.id
    const promiseArr = []
    promiseArr.push(this.$api.getDoctor(doctorId, true))
    promiseArr.push(this.$api.getBlogByDocId(doctorId))

    Promise.all(promiseArr) // TODO: catch 404/500
      .then(res => {
        const doctor = res[0]
        const docBlogs = res[1].data

        this.docProp = {
          ...doctor,
          totalSessions: 14,
          rating: 4.7,
          reviews: [{
            id: 1,
            comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
          }, {
            id: 2,
            comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
          }],
          blogs: docBlogs // might be overwriting
        }
        this.loaded = true
      })
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