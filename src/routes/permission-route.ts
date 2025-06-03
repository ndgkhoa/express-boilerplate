import express from 'express'

import { permissionController } from '~/controllers'
import { authenticate, authorize } from '~/middlewares/auth'

const router = express.Router()

router.get('/get-list', authenticate, authorize('PERMISSION_MANAGE', 'R'), permissionController.getPermissionList)
router.get('/get-by-id/:id', authenticate, authorize('PERMISSION_MANAGE', 'R'), permissionController.getPermissionById)
router.post('/create', authenticate, authorize('PERMISSION_MANAGE', 'C'), permissionController.createPermission)
router.patch('/update/:id', authenticate, authorize('PERMISSION_MANAGE', 'U'), permissionController.updatePermission)
router.delete('/delete/:id', authenticate, authorize('PERMISSION_MANAGE', 'D'), permissionController.deletePermission)

export default router
