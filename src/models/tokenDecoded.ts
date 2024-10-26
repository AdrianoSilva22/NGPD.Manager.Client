export interface TokenDecoded {
  jti: string
  acesso: string
  sub: string
  nbf: number
  exp: number
  iat: number
  iss: string
  aud: string
}
