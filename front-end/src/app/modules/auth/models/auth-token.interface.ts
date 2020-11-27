export interface Token {
  accessToken: string;
  expiresIn?: number;
  userToken?: UserToken;
}

interface Claims {
  value: string;
  type: string;
}

interface UserToken {
  id: string;
  email: string;
  claims: Claims;
}
