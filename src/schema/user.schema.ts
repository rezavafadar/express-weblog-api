export interface User {
  id: number;
  email: string;
  active: boolean;
  profile?: UserProfile;
}

interface UserProfile {
  id: number;
  fullname: string;
  username: string;
  role: 'user' | 'admin';
  avatar: string;
  bio?: string;
  age?: Date;
  gender: 'other' | 'man' | 'female';
  instagram_account?: string;
  twitter_account?: string;
  user: User;
}

export interface CreateUserPayload {
  id?: number;
  email: string;
  active?: boolean;
  profile?: { create: CreateUserProfilePayload };
}

export interface CreateUserProfilePayload {
  username: string;
  fullname?: string;
  role?: 'user' | 'admin';
  avatar?: string;
  bio?: string;
  age?: Date;
  gender?: 'other' | 'man' | 'female';
  instagram_account?: string;
  twitter_account?: string;
}

export interface EditUserProfilePayload {
  username?: string;
  fullname?: string;
  role?: 'user' | 'admin';
  avatar?: string;
  bio?: string;
  age?: Date;
  gender?: 'other' | 'man' | 'female';
  instagram_account?: string;
  twitter_account?: string;
}

export type CreateUser = Pick<User, 'email'>;
