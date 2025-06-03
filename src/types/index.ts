export interface TokenType {
  sub: string
  jti: string
  roles: string[]
  perms: string[]
  scope?: string
  iss: string
  aud: string
  iat: number
  tenant?: string
  device?: string
  refresh?: boolean
}

export type JwtPayload = Pick<TokenType, 'sub'>

export type ActionType = 'C' | 'R' | 'U' | 'D'

export type ApiResponse<T> = {
  StatusCode: number
  Message: string
  TotalRecord: number
  Data: T | null
}

export class ApiError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}
