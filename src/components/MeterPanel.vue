<template>
  <div class="meterPanel">
    <h1>{{ msg }}</h1>
    <device v-for="slotObj in meter.slots" :key="slotObj.id" :slotObj="slotObj" :meterId="meter.id" />
    <div>
      <p>Refresh interval</p>
      <select v-model="refreshInterval" @change="setTimer()">
        <option value="5000" selected>5s</option>
        <option value="10000">10s</option>
        <option value="30000">30s</option>
      </select>
    </div>
  </div>
</template>

<script>
import Device from './Device.vue'
import RestResource from '../services/RestResource'
import { EventBus } from '../services/EventBus'

const restResourceService = new RestResource();

export default {
  name: 'MeterPanel',
  mounted() {
    EventBus.$on('deleteDevice', (slot) => {
      var url = 'https://thatsmontreal.ca/smartplug/api/persistDevice.php';
      restResourceService.sendDelete(url, {
        slotId: slot.id
      })
      .then(response => response.json())
      .then(response => {
        var slotId = response.slotId;

        console.log('Device deleted from slot ID: ' + slotId);
        this.meter.slots.forEach((slotEl) => {
          if (slotEl.id === slotId) {
            slotEl.device = {};
            return true;
          }
        })
      }, response => {
        console.log('Error', response);
      });
    })

    EventBus.$on('addDevice', (device) => {
      var url = 'https://thatsmontreal.ca/smartplug/api/persistDevice.php';
      restResourceService.sendPost(url, {
        action: 'assign',
        device: device
      })
      .then(response => response.json())
      .then(response => {
        var deviceRes = response.resObj;

        console.log('Device added to slot ID: ' + device.slotId);
        this.meter.slots.forEach((slotEl) => {
          if (slotEl.id === deviceRes.slotId) {
            slotEl.device = deviceRes;
            return true;
          }
        })
      }, response => {
        console.log('Error', response);
      });
    })

    EventBus.$on('updateDevice', (device) => {
      var url = 'https://thatsmontreal.ca/smartplug/api/persistDevice.php';
      restResourceService.sendPut(url, {
        action: 'update',
        device: device
      })
      .then(response => response.json())
      .then(response => {
        var slotId = response.slotId;

        console.log('Device updated - slot ID: ' + slotId);
        this.meter.slots.forEach((slotEl) => {
          if (slotEl.id === slotId) {
            slotEl.device.deviceName = device.deviceName; // maybe something more general
            return true;
          }
        })
      }, response => {
        console.log('Error', response);
      });
    })

    EventBus.$on('refreshDevice', () => {
      this.reinitMeter();
    });

    this.reinitMeter();
    this.setTimer();
  },
  data() {
    return {
      meter: {},
      msg: 'Meter Stats Panel',
      refreshTimer: {},
      refreshInterval: 5000
    }
  },
  methods: {
    reinitMeter() {
      var url = 'https://thatsmontreal.ca/smartplug/api/getMeter.php?meterId=1';

      restResourceService.sendGet(url)
      .then(response => response.json())
      .then(meter => {
        if (this.meter.id && false) {
          this.meter.slots.map(slot => {
            var slotNew = meter.slots.find(newSlot => newSlot.id === slot.id);
            if (slotNew) {
              slot.device.lastState = slotNew.device.lastState;
            }
          })
        } else {
          this.meter = meter;
        }
      })
    },
    stopTimer() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer)
      }
    },
    setTimer() {
      this.stopTimer();
      var interval = this.refreshInterval;
      this.refreshTimer = setInterval(this.reinitMeter, interval);
    }
  },
  components: {
    Device
  },
  beforeDestroy() {
    this.stopTimer()
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 auto;
}
a {
  color: #42b983;
}
</style>
