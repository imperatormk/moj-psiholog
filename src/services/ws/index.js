import MessageBus from '@/services/messageBus'

export default {
  echoEvents: {
    connect: () => {
      MessageBus.$emit('wsConnected')
    },
    echo: (data) => {
      console.log(data)
    },
  },
  methods: {
    triggerEvent(name, data) {
      this.$echoClient.emit('name', data);
    }
  }
}