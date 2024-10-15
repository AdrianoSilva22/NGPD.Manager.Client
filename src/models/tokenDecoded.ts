export interface TokenDecoded {
  jti: string;
  acesso: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
