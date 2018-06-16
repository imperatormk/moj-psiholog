import homeRoutes from './home/routes'
import doctorDetailsRoutes from './doctor/routes'

export default [
  ...homeRoutes,
  ...doctorDetailsRoutes,
  {
    path: '*',
    component: {
      template: '<div>404 Not found</div>'
    }
  }
]