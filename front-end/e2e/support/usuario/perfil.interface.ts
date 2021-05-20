export interface Perfil {
  id: string;
  email: string;
  claims: {
    produto: string;
    fornecedor: string;
    sub: string;
    email: string;
    jti: string;
    nbf: string;
    iat: string;
  }
}
