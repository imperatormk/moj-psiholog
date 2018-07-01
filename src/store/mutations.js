const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'

const CONNECT = 'CONNECT'

export default {
  [LOGIN] (state) {
    state.loginPending = true
  },
  [LOGIN_SUCCESS] (state, authData) {
    state.authData = authData
    state.loginPending = false
  },
  [LOGIN_FAILURE] (state) {
    state.loginPending = false
  },
  [LOGOUT](state) {
    state.authData = null
  },
  [CONNECT](state) {
    state.isConnected = true
  }
}