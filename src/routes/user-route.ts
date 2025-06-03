import express from 'express'

import upload from '~/config/multer'
import { userController } from '~/controllers'
import { authenticate, authorize } from '~/middlewares/auth'
import { validate } from '~/middlewares/validate'
import { createUserSchema, updateUserSchema } from '~/validations'

const router = express.Router()

router.post('/login', userController.login)
router.post('/refresh-access-token', userController.refreshAccessToken)
router.get('/get-list', authenticate, authorize('USER_MANAGE', 'R'), userController.getUserList)
router.get('/get-by-id/:id', authenticate, authorize('USER_MANAGE', 'R'), userController.getUserById)
router.post(
  '/create',
  authenticate,
  authorize('USER_MANAGE', 'C'),
  upload.single('Avatar'),
  validate(createUserSchema),
  userController.createUser
)
router.patch(
  '/update/:id',
  authenticate,
  authorize('USER_MANAGE', 'U'),
  upload.single('Avatar'),
  validate(updateUserSchema),
  userController.updateUser
)
router.delete('/delete/:id', authenticate, authorize('USER_MANAGE', 'D'), userController.deleteUser)
router.get('/get-info-mine', authenticate, authorize('USER_MANAGE', 'R'), userController.getInfoMine)

export default router
