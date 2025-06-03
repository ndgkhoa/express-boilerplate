import express from 'express'

import { rolePermissionsController } from '~/controllers'
import { authenticate, authorize } from '~/middlewares/auth'

const router = express.Router()

router.get(
  '/get-role-permissions/:roleId',
  authenticate,
  authorize('ROLE_PERMISSIONS_MANAGE', 'R'),
  rolePermissionsController.getRolePermissions
)
router.post(
  '/create-role-permissions/:roleId',
  authenticate,
  authorize('ROLE_PERMISSIONS_MANAGE', 'C'),
  rolePermissionsController.createRolePermissions
)
router.patch(
  '/update-role-permissions',
  authenticate,
  authorize('ROLE_PERMISSIONS_MANAGE', 'U'),
  rolePermissionsController.updateRolePermissions
)
router.delete(
  '/delete-role-permissions',
  authenticate,
  authorize('ROLE_PERMISSIONS_MANAGE', 'D'),
  rolePermissionsController.deleteRolePermissions
)

export default router
