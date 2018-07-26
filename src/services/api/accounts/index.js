import http from '@/services/http'

export default function () {
  return {
    createAccount(data) {
      return http.api.post('accounts/register', data)
        .then((resp) => {
          return resp.data
        })
        .catch((err) => {
          return new Error(err)
        })
    },
    confirmAccount(data) {
      return http.api.post('accounts/confirm', data)
        .then((resp) => {
          return resp.data
        })
        .catch((err) => {
          return new Error(err)
        })  
    },
    changePassword(data) { // maybe use this for reset too
      return http.api.post('accounts/change-password', data)
      .then((resp) => {
        return resp.data
      })
      .catch((err) => {
        return new Error(err)
      })
    }
  }
}