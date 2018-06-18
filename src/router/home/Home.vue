<template>
  <div>
    <p>Home</p>
    <Doctor :isAvailable="true" name="Darko" />
    <Doctor :isAvailable="false" name="Mrmak" />
  </div>
</template>
<script>

import Doctor from '@/components/Doctor'

export default {
  components: {
    Doctor
  },
};
</script>