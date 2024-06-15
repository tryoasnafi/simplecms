export const ROLES_KEY = 'roles';
export type Role = 'admin' | 'writer';

export interface JwtPayload {
  sub: number;
  email: string;
}
