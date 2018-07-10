import http from '@/services/http'

export default function () {
  return {
    createAccount(data) {
      return http.api.post('accounts/register', data)
        .then((resp) => {
          return resp.data
        })
    }
  }
}