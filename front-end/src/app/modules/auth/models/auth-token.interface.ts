export interface Token {
  accessToken: string;
  expiresIn?: number;
  userToken?: UserToken;
}

interface UserToken {
  id: string;
  email: string;
  claims: Claims;
}

interface Claims {
  value: string;
  type: string;
}
