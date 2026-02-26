export interface SessionDocument {
  _id?: string;
  userId: string;
  refreshToken: string;
  expiresAt: Date;
  createdAt: Date;
}
