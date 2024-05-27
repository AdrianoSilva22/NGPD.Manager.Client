export type UserRole = 'user' | 'mentor' | 'support';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
