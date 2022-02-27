export interface AuthServicePayload {
  verify: (email: string) => Promise<void>;
  userExistence: (type: string, email: string) => Promise<void>;
}
