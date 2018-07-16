import http from '@/services/http'

export default function () {
  return {
    generateChatToken() {
      return http.api.get(`chat-tokens`)
        .then((resp) => {
          return resp.data
        })
    },
    getSessions(userId) {
      return http.api.get(`users/${userId}/sessions`)
        .then((resp) => {
          return resp.data
        })
    }
  }
}