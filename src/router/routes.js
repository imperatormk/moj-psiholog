import homeRoutes from './home/routes'
import doctorDetailsRoutes from './doctor/routes'
import videoChatRoutes from './video-chat/routes'
import commonRoutes from './common/routes'

export default [
  ...homeRoutes,
  ...doctorDetailsRoutes,
  ...videoChatRoutes,
  ...commonRoutes,
  {
    path: '*',
    component: {
      template: '<div>404 Not found</div>'
    }
  }
]