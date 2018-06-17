// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import socket from '@/services/ws'

import VueSocketCluster from 'vue-socket-cluster'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './style/main.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueSocketCluster, {
  connections: [{
    name: 'echo',
    hostname: 'smeni.mk',
    secure: true,
    port: 3002,
    rejectUnauthorized: false
  }]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  axios,
  ...socket,
})
