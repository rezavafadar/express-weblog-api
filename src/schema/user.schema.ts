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
  role: userRole;
  avatar: string;
  bio?: string;
  age?: Date;
  gender: userGender;
  instagram_account?: string;
  twitter_account?: string;
  user_id: number;
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
  role?: userRole;
  avatar?: string;
  bio?: string;
  age?: Date;
  gender?: userGender;
  instagram_account?: string;
  twitter_account?: string;
}

export interface EditUserProfilePayload {
  username?: string;
  fullname?: string;
  role?: userRole;
  bio?: string;
  age?: Date;
  gender?: userGender;
  instagram_account?: string;
  twitter_account?: string;
}

export type userRole = 'user' | 'admin';
export type userGender = 'other' | 'man' | 'female';
export type CreateUser = Pick<User, 'email'>;
