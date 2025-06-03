import connectDB from '~/config/database'
import logger from '~/config/logger'
import { Role } from '~/models'

const seedRoles = async () => {
  await connectDB()

  const roles = [
    { RoleName: 'Admin', Description: 'Quản trị viên' },
    { RoleName: 'User', Description: 'Người dùng' }
  ]

  try {
    await Role.deleteMany()
    await Role.insertMany(roles)
    logger.info('🌱 Role seeding successfully')
  } catch (error) {
    logger.error('❌ Error seeding', error)
  }
}

export default seedRoles
