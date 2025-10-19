export interface JWK {
  kty: string;
  n: string;
  e: string;
  alg: string;
  use: string;
  kid: string;
}

export interface JWKS {
  keys: JWK[];
}
