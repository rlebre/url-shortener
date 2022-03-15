import { UserModel } from './UserModel';

export interface UrlModel {
  shortUrl: string;
  fullUrl: string;
  user: UserModel;
  confirmed: boolean;
  confirmationHash?: string;
  createdAt?: Date;
  confirmedAt?: Date;
}
