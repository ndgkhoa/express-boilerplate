import connectDB from '~/config/database'
import logger from '~/config/logger'
import { User, Role, UserRoles } from '~/models'

const seedUserRoles = async () => {
  await connectDB()

  try {
    await UserRoles.deleteMany()

    const users = await User.find({})
    const roles = await Role.find({})

    const userRoles = []

    for (const user of users) {
      // Assuming 'admin' is the only user with the Admin role
      const assignedRoleName = user.UserName === 'admin' ? 'Admin' : 'User'
      const role = roles.find((r) => r.RoleName === assignedRoleName)

      if (role) {
        userRoles.push({
          UserId: user._id.toString(),
          RoleId: role._id.toString()
        })
      }
    }

    await UserRoles.insertMany(userRoles)
    logger.info('🌱 UserRole seeding successfully')
  } catch (error) {
    logger.error('❌ Error seeding:', error)
  }
}

export default seedUserRoles
