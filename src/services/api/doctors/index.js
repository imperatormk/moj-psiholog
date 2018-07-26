import http from '@/services/http'

export default function () {
  return {
    getDoctors(readyOnly) {
      return http.api.get(`doctors`)
        .then((resp) => {
          if (readyOnly) return resp.data.filter(doc => doc.ready) // one day in backend
          return resp.data
        })
    },
    getDoctor(doctorId, readyOnly) {
      return http.api.get(`doctors/${doctorId}`)
        .then((resp) => {
          const doctor = resp.data || {}
          if (!readyOnly || doctor.ready) return resp.data // one day in backend
          return Promise.reject({ msg: 'notFound' }) // haha
        })
    },
    updateDoctor(doctorId, data) {
      const dataReq = JSON.parse(JSON.stringify(data))
      if (!dataReq.ready) dataReq.ready = true

      return http.api.put(`doctors/${doctorId}`, dataReq)
        .then((resp) => {
          return resp.data
        })
    }
  }
}