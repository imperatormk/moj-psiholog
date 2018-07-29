const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'

const CONNECT = 'CONNECT'

const PEND_PURCHASE = 'PEND_PURCHASE'
const CLEAR_PENDING_PURCHASE = 'CLEAR_PENDING_PURCHASE'
const UPDATE_HAS_READY = 'UPDATE_HAS_READY'
const SAVE_TEST_RESULTS = 'SAVE_TEST_RESULTS'

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
  },
  [PEND_PURCHASE] (state, purchaseData) {
    state.pendingPurchase = purchaseData
  },
  [CLEAR_PENDING_PURCHASE] (state) {
    state.pendingPurchase = null
  },
  [UPDATE_HAS_READY] (state, hasReady) {
    state.hasReady = hasReady
  },
  [SAVE_TEST_RESULTS] (state, testResults) {
    state.testResults = testResults
  }
}