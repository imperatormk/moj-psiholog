import Login from './Login'
import Confirm from './Confirm'

export default [{
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/confirm/:token',
  name: 'confirm',
  component: Confirm
}]