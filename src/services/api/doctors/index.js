import http from '@/services/http'

export default function () {
  return {
    getDoctors() {
      return http.api.get(`doctors`)
        .then((resp) => {
          return resp.data
        })
    },
    getDoctor(doctorId) {
      return http.api.get(`doctors/${doctorId}`)
        .then((resp) => {
          return resp.data
        })
    }
  }
}