import express from 'express'

import userRoute from '~/routes/user-route'
import roleRoute from '~/routes/role-route'
import permisstionRoute from '~/routes/permission-route'
import rolePermisstionsRoute from '~/routes/role-permissions-route'
import userRolesRoute from '~/routes/user-roles-route'
import { ApiError } from '~/types'
import { HttpStatusCode, Message } from '~/constants'

const router = express.Router()

const apiRoutes = [
  { path: '/api/users', route: userRoute },
  { path: '/api/roles', route: roleRoute },
  { path: '/api/permissions', route: permisstionRoute },
  { path: '/api/role-permissions', route: rolePermisstionsRoute },
  { path: '/api/user-roles', route: userRolesRoute }
]

apiRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

router.get('/api/health', (req, res) => {
  res.status(HttpStatusCode.OK).json({
    message: Message.WELCOME,
    version: process.env.VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  })
})

router.all('*', (req, res, next) => {
  next(new ApiError(HttpStatusCode.NOT_FOUND, Message.ROUTE_NOT_FOUND))
})

export default router
