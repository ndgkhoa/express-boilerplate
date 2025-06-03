import path from 'path'
import { pathToFileURL } from 'url'

import logger from '~/config/logger'

const runSeeders = async () => {
  const seedersDir = path.resolve(__dirname)

  const seeders = [
    'role-seeder.ts',
    'permission-seeder.ts',
    'user-seeder.ts',
    'role-permissions-seeder.ts',
    'user-roles-seeder.ts'
  ]

  for (const file of seeders) {
    const modulePath = path.join(seedersDir, file)
    const moduleUrl = pathToFileURL(modulePath).href

    const seederModule = await import(moduleUrl)
    if (typeof seederModule.default === 'function') {
      logger.info(`Running ${file}`)
      await seederModule.default()
    }
  }
  logger.info('🎉 All seeders finished')
  process.exit()
}

runSeeders()
