<template>
  <div>
    <p>Doctor Details</p>
    <b-button size="sm" variant="danger">
        <span class="bg-black">Mrkss</span>
    </b-button>
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