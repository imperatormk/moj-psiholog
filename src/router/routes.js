import homeRoutes from './home/routes'
import doctorDetailsRoutes from './doctor/routes'
import videoChatRoutes from './video-chat/routes'
import commonRoutes from './common/routes'
import personalityTest from './personality-test/routes'

export default [
  ...homeRoutes,
  ...doctorDetailsRoutes,
  ...videoChatRoutes,
  ...commonRoutes,
  ...personalityTest,
  {
    path: '*',
    component: {
      template: '<div>404 Not found</div>'
    }
  }
]