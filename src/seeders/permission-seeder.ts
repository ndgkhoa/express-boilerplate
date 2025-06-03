import connectDB from '~/config/database'
import logger from '~/config/logger'
import { Permission } from '~/models'

const seedPermissions = async () => {
  await connectDB()

  const permissions = [
    {
      PermissionCode: 'USER_MANAGE',
      PermissionName: 'Quản lý người dùng',
      Description: 'Cho phép quản lý người dùng, bao gồm xem, sửa, xóa và tạo mới người dùng'
    },
    {
      PermissionCode: 'ROLE_MANAGE',
      PermissionName: 'Quản lý vai trò',
      Description: 'Cho phép quản lý vai trò, bao gồm xem, sửa, xóa và tạo mới vai trò'
    },
    {
      PermissionCode: 'PERMISSION_MANAGE',
      PermissionName: 'Quản lý quyền',
      Description: 'Cho phép quản lý quyền, bao gồm xem, sửa, xóa và tạo mới quyền'
    },
    {
      PermissionCode: 'ROLE_PERMISSIONS_MANAGE',
      PermissionName: 'Quản lý quyền của vai trò',
      Description: 'Cho phép quản lý quyền của vai trò, bao gồm xem, sửa, xóa và tạo mới quyền cho vai trò'
    },
    {
      PermissionCode: 'USER_ROLES_MANAGE',
      PermissionName: 'Quản lý vai trò của người dùng',
      Description: 'Cho phép quản lý vai trò của người dùng, bao gồm xem, sửa, xóa và tạo mới vai trò cho người dùng'
    }
  ]

  try {
    await Permission.deleteMany()
    await Permission.insertMany(permissions)
    logger.info('🌱 Permission seeding successfully')
  } catch (error) {
    logger.error('❌ Error seeding', error)
  }
}

export default seedPermissions
