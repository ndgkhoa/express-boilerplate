import connectDB from '~/config/database'
import logger from '~/config/logger'
import { User } from '~/models'

const seedUsers = async () => {
  await connectDB()

  const users = [
    {
      UserName: 'admin',
      Email: 'admin@example.com',
      PhoneNumber: '0900000000',
      FullName: 'Nguyen Van A',
      Avatar: 'https://avatar.iran.liara.run/public'
    }
  ]

  try {
    await User.deleteMany()
    await User.insertMany(users)
    logger.info('🌱 User seeding successfully')
  } catch (error) {
    logger.error('❌ Error seeding:', error)
  }
}

export default seedUsers
