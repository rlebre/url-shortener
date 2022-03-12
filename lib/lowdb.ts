import { LowSync, JSONFileSync } from 'lowdb';

export interface UserModel {
  email: string;
  active?: boolean;
}

export interface LinkModel {
  shortUrl: string;
  fullUrl: string;
  user: UserModel;
  createdAt?: Date;
}

export interface DataModel {
  users: UserModel[];
  links: LinkModel[];
}

const adapter = new JSONFileSync<DataModel>('db.json');
const db = new LowSync(adapter);

db.read();
db.data ||= { users: [], links: [] };

const insertUser = (user: UserModel) => {
  db.data?.users.push(user);
  db.write();
};

const insertLink = (link: LinkModel) => {
  const foundLink = db.data?.links.findIndex((link) => link.shortUrl === link.shortUrl);
  const isUserAllowed = db.data?.users.some((user) => user.email === link.user.email);

  if (!foundLink && isUserAllowed) {
    db.data?.links.push({ ...link, createdAt: new Date() });
  }

  db.write();
};

const getFullURL = (shortUrl: string) => {
  return db.data?.links.find((link: LinkModel) => link.shortUrl === shortUrl);
};

export { insertUser, insertLink, getFullURL };
export default db;
