export interface JwtPayload {
  id: number;
  scopes: string[];
  version: string;
  registeredAt: string;
}
