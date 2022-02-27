export interface User {
  id: number;
  fullname: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  profile?: UserProfile;
}

interface UserProfile {
  id: number;
  avatar: string;
  bio?: string;
  age?: number;
  gender: 'other' | 'man' | 'female';
  instagram_account?: string;
  twitter_account?: string;
  user: User;
}

export type CreateUser = Pick<User, 'email'>;
