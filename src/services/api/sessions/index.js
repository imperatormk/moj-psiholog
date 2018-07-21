import http from '@/services/http'

export default function () {
  return {
    isFirst(req) {
      return http.api.post('sessions/isFirst', req)
        .then((resp) => {
          return resp.data
        })
    },
    getPendingSessionsForUser(req) {
      const reqObj = {
        ...req,
        sessionStatusType: 'pending'
      }
      return http.api.post('sessions/getByUser', reqObj)
        .then((resp) => {
          return resp.data
        })
    },
    getReadySessionsForUser(req) {
      const reqObj = { ...req }
      return http.api.post('sessions/getByUser/ready', reqObj)
        .then((resp) => {
          return resp.data
        })
    },
    getCompletedSessionsForUser(req) {
      const reqObj = {
        ...req,
        sessionStatusType: 'completed'
      }
      return http.api.post('sessions/getByUser', reqObj)
        .then((resp) => {
          return resp.data
        })
    },
  }
}