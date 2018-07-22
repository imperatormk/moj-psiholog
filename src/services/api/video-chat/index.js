import http from '@/services/http'

export default function () {
  return {
    generateChatToken(data) {
      return http.api.post('chat-tokens', data)
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