export default {
  isConnected: state => {
    return state.isConnected
  },
  isLoggedIn: state => {
    return !!state.authData
  },
  authData: state => {
    return state.authData
  }
}