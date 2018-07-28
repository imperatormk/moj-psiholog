const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'

const CONNECT = 'CONNECT'

const PEND_PURCHASE = 'PEND_PURCHASE'
const CLEAR_PENDING_PURCHASE = 'CLEAR_PENDING_PURCHASE'
const UPDATE_HAS_READY = 'UPDATE_HAS_READY'

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
  },
  pendPurchase({ commit }, purchaseData) {
    commit(PEND_PURCHASE, purchaseData)
    return Promise.resolve()
  },
  clearPendingPurchase({ commit }) {
    commit(CLEAR_PENDING_PURCHASE)
    return Promise.resolve()
  },
  hasReady({ commit }, hasReady) {
    commit(UPDATE_HAS_READY, hasReady)
    return Promise.resolve()
  }
}