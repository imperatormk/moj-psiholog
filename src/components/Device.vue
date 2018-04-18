<template>
  <div class="device">
    <h3>{{ slotObj.device | fixBlank }}</h3>
    <div v-if="!isBlank()">
      <p>{{ slotObj.device | fixNoState }}</p>
      <button @click="deleteDevice(slotObj)">Delete device</button>
    </div>
    <br>
    <input @keyup.enter="persistDevice()" v-model="cloneSlot.device.deviceName"/>
    <button @click="persistDevice()">{{ isNew() ? "Add" : "Update" }}</button>
  </div>
</template>

<script>

import RestResource from '../services/RestResource'
import { EventBus } from '../services/EventBus'

const restResourceService = new RestResource();

export default {
  name: 'device',
  props: {
    slotObj: { type: Object, required: true},
    meterId: { type: String, required: true},
  },
  beforeMount() {
    this.reinitComp(this.slotObj);
  },
  watch: {
      slotObj: {
          handler: function(newSlot) {
              this.reinitComp(newSlot);
          },
          deep: true
      }
  },
  filters: {
    fixBlank: function (device) {
      if (!device.deviceName) return '-- Blank slot --';
      return device.deviceName;
    },
    fixNoState: function (device) {
      if (!device.lastState) return '-- No states --';
      return 'Last state: ' + device.lastState.state + ' @ ' + device.lastState.dateRecorded;
    }
  },
  methods: {
    reinitComp(slotObj) {
      if (!this.cloneSlot.id) {
        this.cloneSlot = JSON.parse(JSON.stringify(slotObj));
      }
    },
    isBlank() {
      return (!this.slotObj.device.deviceName);
    },
    isNew() {
      return (!this.slotObj.device.id);
    },
    refreshDevice() {
      EventBus.$emit('refreshDevice', {})
    },
    deleteDevice(slotObj) {
      EventBus.$emit('deleteDevice', slotObj)
    },
    persistDevice() {
      var newName = this.cloneSlot.device.deviceName;
      if (newName) {
        var deviceObj = {
          slotId: this.cloneSlot.id,
          deviceName: newName
        }
        if (this.isNew()) {
          EventBus.$emit('addDevice', deviceObj)
        } else {
          if (this.slotObj.device.deviceName !== newName) {
            EventBus.$emit('updateDevice', deviceObj)
          }
        }
        
      }
    }
  },
  data() {
    return {
      cloneSlot: {}
    }
  }
}
</script>

<style scoped>
  .device {
    width: 20%;
    border: 1px solid black;
    padding: 10px;
    margin: 10px auto;
  }
</style>
