import express from 'express'

import { userRolesController } from '~/controllers'
import { authenticate, authorize } from '~/middlewares/auth'

const router = express.Router()

router.get('/get-user-roles', authenticate, authorize('USER_ROLES_MANAGE', 'R'), userRolesController.getUserRoles)
router.post(
  '/create-user-roles/:userId',
  authenticate,
  authorize('USER_ROLES_MANAGE', 'C'),
  userRolesController.createUserRoles
)
router.delete(
  '/delete-user-roles',
  authenticate,
  authorize('USER_ROLES_MANAGE', 'D'),
  userRolesController.deleteUserRoles
)

export default router
