export interface TokenDecoded {
  jti: string
  sub: string
  nbf: number
  exp: number
  iat: number
  iss: string
  aud: string
  [key: string]: any
}
