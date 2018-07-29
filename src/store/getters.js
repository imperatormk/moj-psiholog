export default {
  isConnected: state => {
    return state.isConnected
  },
  isLoggedIn: state => {
    return !!state.authData
  },
  authData: state => {
    return state.authData
  },
  pendingPurchase: state => {
    return state.pendingPurchase
  },
  hasReady: state => {
    return state.hasReady
  },
  testResults: state => {
    return state.testResults
  },
}