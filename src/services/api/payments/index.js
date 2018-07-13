import http from '@/services/http'

export default function () {
  return {
    requestPayment(req) {
      const formData = new FormData()
      formData.append('hoho', 'hihi')

      return http.api.post(`payments/req`, formData)
        .then((resp) => {
          return resp.data
        })
    }
  }
}