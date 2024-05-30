// authModel.ts
export interface TokenDecoded {
    exp: number;
    iat: number;
    jti: string;
    nbf: number;
    role: string;
    sub: string;
  }
  
  export const initialValueTokenDecoded: TokenDecoded = {
    exp: 0,
    iat: 0,
    jti: '',
    nbf: 0,
    role: '',
    sub: ''
  }