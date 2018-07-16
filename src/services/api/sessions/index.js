import http from '@/services/http'

export default function () {
  return {
    isFirst(req) {
      return http.api.post('sessions/isFirst', req)
        .then((resp) => {
          return resp.data
        })
    },
    getPendingForUser(req) {
      const reqObj = {
        ...req,
        sessionStatusType: 'pending'
      }
      return http.api.post('sessions/getByUser', reqObj)
        .then((resp) => {
          return resp.data
        })
    }
  }
}