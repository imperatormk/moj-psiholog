import http from '@/services/http'

export default function () {
  return {
    getTest() {
      return http.api.get('tests')
        .then((resp) => {
          return resp.data
        })
    },
    getTestResults(userId, userType) {
      if (userType !== 'patient') return Promise.resolve({})
      return http.api.get(`tests/getResults/${userId}`)
        .then((resp) => {
          return resp.data
        })
    }
  }
}