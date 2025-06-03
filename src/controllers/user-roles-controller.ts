import { Request, Response } from 'express'

import { userRolesService } from '~/services'
import { sendResponse } from '~/utils/helpers'
import { HttpStatusCode, Message } from '~/constants'

export const getUserRoles = async (req: Request, res: Response) => {
  const userRoles = await userRolesService.getRolesByUserId(req.query.userId as string)
  sendResponse(res, HttpStatusCode.OK, userRoles, Message.SUCCESS)
}

export const createUserRoles = async (req: Request, res: Response) => {
  const newUserRoles = await userRolesService.createRolesForUser(req.params.userId, req.body)
  sendResponse(res, HttpStatusCode.OK, newUserRoles, Message.CREATED)
}

export const deleteUserRoles = async (req: Request, res: Response) => {
  await userRolesService.deleteUserRoles(req.body)
  sendResponse(res, HttpStatusCode.OK, null, Message.DELETED)
}
