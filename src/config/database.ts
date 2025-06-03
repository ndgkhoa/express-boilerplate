import mongoose from 'mongoose'

import config from '~/config/env'
import logger from '~/config/logger'

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    })
  } catch (error) {
    logger.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
