import connectDB from '~/config/database'
import logger from '~/config/logger'
import { Role, Permission, RolePermissions } from '~/models'

const seedRolePermissions = async () => {
  await connectDB()

  try {
    await RolePermissions.deleteMany()

    const roles = await Role.find()
    const permissions = await Permission.find()

    const rolePermissions = []

    for (const role of roles) {
      for (const permission of permissions) {
        if (role.RoleName === 'Admin') {
          rolePermissions.push({
            RoleId: role._id.toString(),
            PermissionId: permission._id.toString(),
            C: true,
            R: true,
            U: true,
            D: true
          })
        }
      }
    }

    await RolePermissions.insertMany(rolePermissions)
    logger.info('RolePermission seeding successfully')
  } catch (error) {
    logger.error('Error seeding', error)
  }
}

export default seedRolePermissions
