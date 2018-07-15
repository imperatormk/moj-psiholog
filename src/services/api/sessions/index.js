import http from '@/services/http'

export default function () {
  return {
    isFirst(req) {
      return http.api.get('sessions/isFirst', req)
        .then((resp) => {
          return resp.data
        })
    }
  }
}