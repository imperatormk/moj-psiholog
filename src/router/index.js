import Vue from 'vue'
import Router from 'vue-router'
import MeterPanel from '@/components/MeterPanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/meters/:id',
      name: 'MeterPanel',
      component: MeterPanel
    }
  ]
})
