export interface User {
  id: number;
  fullname: string;
  email: string;
  username: string;
  role: "admin" | "user";
  avatar: string;
  bio?: string;
  age?: number;
  gender: "female" | "man" | "other";
  instagram_account?: string;
  twitter_account?: string;
}

interface UserProfile {
  avatar?: string;
  bio?: string;
  age?: number;
  gender?: "female" | "man" | "other";
  instagram_account?: string;
  twitter_account?: string;
}

export interface CreateUserPayload {
  fullname?: string;
  email: string;
  username: string;
  role?: "admin" | "user";
  profile: UserProfile;
}
