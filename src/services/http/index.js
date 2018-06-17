import axios from 'axios'
const https = require('https')

export default {
  api: axios.create({
    baseURL: '/api',
  }, {
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  })
}