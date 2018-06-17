<template>
  <div>
    <p>Home</p>
    <Doctor :isAvailable="true" name="Darko" />
    <Doctor :isAvailable="false" name="Mrmak" />
  </div>
</template>
<script>

import MessageBus from '@/services/messageBus'
import Doctor from '@/components/Doctor'

export default {
  created() {
    MessageBus.$on('wsConnected', () => {
      console.log('wsConnected')
    })
  },
  destroyed() {
    MessageBus.$off('wsConnected')
  },
  data: () => ({
    
  }),
  components: {
    Doctor
  },
};
</script>