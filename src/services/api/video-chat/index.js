import http from '@/services/http'

export default function () {
  return {
    generateChatToken() {
      return http.api.get(`tokens`)
        .then((resp) => {
          return resp.data
        })
    }
  }
}