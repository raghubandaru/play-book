export interface UserDocument {
  _id?: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
