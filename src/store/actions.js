const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'

const CONNECT = 'CONNECT'

export default {
  loginAttempt({ commit }) {
    commit(LOGIN)
    return Promise.resolve()
  },  
  login({ commit }, authData) {
    authData ? commit(LOGIN_SUCCESS, authData) : commit(LOGIN_FAILURE)
    return Promise.resolve()
  },
  logout({ commit }) {
    commit(LOGOUT)
    return Promise.resolve()
  },
  connect({ commit }) {
    commit(CONNECT)
    return Promise.resolve()
  }
}