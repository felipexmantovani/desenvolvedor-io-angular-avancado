export interface Token {
  accessToken: string;
  expiresIn?: number;
  userToken?: UserToken;
}

export interface UserToken {
  id: string;
  email: string;
  claims: Array<Claim>;
}

interface Claim {
  value: string;
  type: string;
}
