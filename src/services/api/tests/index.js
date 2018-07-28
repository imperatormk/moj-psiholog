import http from '@/services/http'

export default function () {
  return {
    getTest() {
      return http.api.get('tests')
        .then((resp) => {
          return resp.data
        })
    }
  }
}