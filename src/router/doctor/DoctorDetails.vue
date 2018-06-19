<template>
  <div>
    <p>Doctor Details</p>
  </div>
</template>
<script>

export default {
  created() {
    this.$api.getDoctors()
  },
  data: () => ({
    
  }),
  components: {
  },
};
</script>