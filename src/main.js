// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.css'
// import 'vuetify/src/components/stylus/generic/_transitions.styl'

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import socket from '@/services/ws'

import VueSocketCluster from 'vue-socket-cluster'
import Vuetify from 'vuetify'

import './style/main.scss'

Vue.config.productionTip = false

Vue.use(VueSocketCluster, {
  connections: [{
    name: 'echo',
    hostname: 'smeni.mk',
    secure: true,
    port: 3002,
    rejectUnauthorized: false
  }]
})

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  axios,
  ...socket,
})
