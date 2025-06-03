import express from 'express'

import { roleController } from '~/controllers'
import { authenticate, authorize } from '~/middlewares/auth'

const router = express.Router()

router.get('/get-list', authenticate, authorize('ROLE_MANAGE', 'R'), roleController.getRoleList)
router.get('/get-by-id/:id', authenticate, authorize('ROLE_MANAGE', 'R'), roleController.getRoleById)
router.post('/create', authenticate, authorize('ROLE_MANAGE', 'C'), roleController.createRole)
router.patch('/update/:id', authenticate, authorize('ROLE_MANAGE', 'U'), roleController.updateRole)
router.delete('/delete/:id', authenticate, authorize('ROLE_MANAGE', 'D'), roleController.deleteRole)

export default router
