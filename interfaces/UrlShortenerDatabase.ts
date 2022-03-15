import { InsertOneResult } from 'mongodb';
import { UrlModel } from './UrlModel';
import { UserModel } from './UserModel';

export default interface UrlShortenerDatabase {
  userExists: (user: UserModel) => Promise<boolean>;

  insertUser: (user: UserModel) => Promise<boolean>;

  insertUrl: (url: UrlModel) => Promise<boolean>;

  getUrl: (shortUrl: string) => Promise<UrlModel>;

  confirmHash: (confirmationHash: string) => Promise<boolean>;
}
