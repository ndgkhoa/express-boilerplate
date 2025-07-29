import { z } from 'zod'
import mongoose from 'mongoose'

import { Message } from '~/constants'

export const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: Message.INVALID_OBJECT_ID
})
