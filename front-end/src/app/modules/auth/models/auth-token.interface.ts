export interface Token {
  accessToken: string;
  expiresIn?: number;
  userToken?: UserToken;
}

export interface UserToken {
  id: string;
  email: string;
  claims: Claims;
}

interface Claims {
  value: string;
  type: string;
}
