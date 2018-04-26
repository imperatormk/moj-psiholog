<template>
  <div class="device">
    <h3>{{ slotObj.device | fixBlank }}</h3>
    <div v-if="!isBlank()">
      <p>{{ slotObj | fixNoState }}</p>
      <button @click="deleteDevice(slotObj)">Delete device</button>
    </div>
    <br>
    <input @keyup.enter="persistDevice()" v-model="cloneSlot.device.deviceName"/>
    <button @click="persistDevice()">{{ isNew() ? "Add" : "Update" }}</button>
    <div v-if="!isBlank()">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>

import RestResource from '../services/RestResource'
import { EventBus } from '../services/EventBus'

import VueCharts from 'vue-chartjs'
import { Line } from 'vue-chartjs'

const restResourceService = new RestResource();

export default {
  extends: Line,
  name: 'device',
  props: {
    slotObj: { type: Object, required: true},
    meterId: { type: String, required: true},
  },
  beforeMount() {
    this.reinitComp(this.slotObj);
  },
  mounted() {
    this.renderGraph();
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
    fixNoState: function (slot) {
      if (!slot.lastState) return '-- No states --';
      return 'Last state: ' + slot.lastState.state + ' @ ' + slot.lastState.dateRecorded;
    }
  },
  methods: {
    renderGraph() {
      this.slotObj.todayState.map((key, index) => {
          this.slotObj.todayState[index].statTime = (this.slotObj.todayState[index]).statTime.split(';')[0];
      });

      this.renderChart({
        labels: this.slotObj.todayState.map(x => x.statTime + 'h'),
        datasets: [
          {
            label: 'Power consumption',
            backgroundColor: '#f87979',
            data: this.slotObj.todayState.map(x => x.stat)
          }
        ]
      })
    },
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
