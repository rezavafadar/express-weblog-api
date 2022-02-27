export interface AuthServicePayload {
  verify: () => Promise<void>;
  userExistence: (type: string, email: string) => Promise<void>;
}
