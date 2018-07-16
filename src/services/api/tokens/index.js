import http from '@/services/http'

export default function () {
  return {
    verifyConfirmToken(data) {
      return http.api.post('tokens/verify', {
        type: 'confirmation',
        token: data.token
      })
      .then((resp) => {
        return resp.data
      })
      .catch((err) => {
        console.log(err)
        return new Error(err)
      })
    }
  }
}