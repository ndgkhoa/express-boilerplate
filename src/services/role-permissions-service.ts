import { Permission, RolePermissions } from '~/models'
import { ActionType, ApiError } from '~/types'
import { CreateRolePermissionsBody, UpdateRolePermissionsBody } from '~/validations'
import { HttpStatusCode, Message } from '~/constants'
import { roleService } from '~/services'

export const checkPermissionByRoleIds = async (roleIds: string[], permissionId: string, action: ActionType) => {
  const hasPermission = await RolePermissions.findOne({
    RoleId: { $in: roleIds },
    PermissionId: permissionId,
    [action]: true
  })
  return !!hasPermission
}

export const getPermissionsByRoleId = async (roleId: string) => {
  const role = await roleService.getRoleById(roleId)
  const rolePermissions = await RolePermissions.find({ RoleId: roleId })
  const permissions = await Permission.find({
    _id: { $in: rolePermissions.map((item) => item.PermissionId) }
  })
  return {
    RoleId: roleId,
    RoleName: role.RoleName,
    Permissions: rolePermissions.map((item) => ({
      Id: item.id,
      PermissionId: item.PermissionId,
      PermissionName: permissions.find((p) => p.id === item.PermissionId)?.PermissionName,
      C: item.C,
      R: item.R,
      U: item.U,
      D: item.D
    }))
  }
}

export const getPermissionsByRoleIds = async (roleIds: string[]) => {
  const rolePermissions = await RolePermissions.find({ RoleId: { $in: roleIds } })
  const permissions = await Permission.find({
    _id: { $in: rolePermissions.map((item) => item.PermissionId) }
  })
  return rolePermissions.map((item) => ({
    PermissionId: item.PermissionId,
    PermissionName: permissions.find((p) => p.id === item.PermissionId)?.PermissionName,
    PermissionCode: permissions.find((p) => p.id === item.PermissionId)?.PermissionCode,
    C: item.C,
    R: item.R,
    U: item.U,
    D: item.D
  }))
}

export const createRolePermissions = async (roleId: string, body: CreateRolePermissionsBody[]) => {
  try {
    return await RolePermissions.insertMany(
      body.map((item) => ({
        RoleId: roleId,
        PermissionId: item.PermissionId,
        C: item.C,
        R: item.R,
        U: item.U,
        D: item.D
      })),
      { ordered: false }
    )
  } catch {
    throw new ApiError(HttpStatusCode.CONFLICT, Message.CONFLICT)
  }
}

export const updateRolePermissions = async (body: UpdateRolePermissionsBody[]) => {
  return await Promise.all(
    body.map(async ({ Id, C, R, U, D }) => {
      const updatedRolePermissions = await RolePermissions.exists({ _id: Id })
      if (!updatedRolePermissions) {
        throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
      }
      return await RolePermissions.findByIdAndUpdate(Id, { C, R, U, D }, { new: true })
    })
  )
}

export const deleteRolePermissions = async (ids: string[]) => {
  const deletedRolePermissions = await RolePermissions.deleteMany({ _id: { $in: ids } })
  if (deletedRolePermissions.deletedCount === 0) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, Message.NOT_FOUND)
  }
}
