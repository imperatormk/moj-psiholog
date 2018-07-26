import http from '@/services/http'

export default function () {
  return {
    requestPayment(req) {
      return http.api.post('payments/req', req)
        .then((resp) => {
          return resp.data
        })
        .catch((err) => {
          return new Error(err)
        })
    }
  }
}