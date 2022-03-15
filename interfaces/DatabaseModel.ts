import { UrlModel } from './UrlModel';
import { UserModel } from './UserModel';

export interface DatabaseModel {
  users: UserModel[];
  links: UrlModel[];
}
