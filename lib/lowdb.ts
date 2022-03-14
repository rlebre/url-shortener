import { LowSync, JSONFileSync } from 'lowdb';

export interface UserModel {
  email: string;
  active?: boolean;
}

export interface LinkModel {
  shortUrl: string;
  fullUrl: string;
  user: UserModel;
  confirmed: boolean;
  confirmationHash?: string;
  createdAt?: Date;
  confirmedAt?: Date;
}

export interface DataModel {
  users: UserModel[];
  links: LinkModel[];
}

class LowDB {
  private static _instance: LowDB;
  db: LowSync<DataModel>;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    const adapter = new JSONFileSync<DataModel>('db.json');
    this.db = new LowSync(adapter);

    this.db.read();
    this.db.data ||= { users: [], links: [] };
  }

  userExists = (user: UserModel | string) => {
    return typeof user === 'string'
      ? !!this.db.data?.users.find((u) => u.email === user)
      : !!this.db.data?.users.find((u) => u.email === user.email);
  };

  insertUser = (user: UserModel) => {
    this.db.data?.users.push(user);
    this.db.write();
  };

  insertLink = (link: LinkModel) => {
    const foundLink = this.db.data?.links.find((l) => l.shortUrl === link.shortUrl);
    const isUserAllowed = this.db.data?.users.some((user) => user.email === link.user.email);

    if (!foundLink && isUserAllowed) {
      this.db.data?.links.push({ ...link, createdAt: new Date(), confirmed: false });
      this.db.write();
    }
  };

  getLink = (shortUrl: string) => {
    return this.db.data?.links.find((link: LinkModel) => link.confirmed && link.shortUrl === shortUrl);
  };

  confirmHash(confirmationHash: string) {
    const foundLinkIndex = this.db.data?.links.findIndex((l) => l.confirmationHash == confirmationHash) as number;

    if (foundLinkIndex >= 0) {
      Object.assign(this.db.data?.links[foundLinkIndex], {
        ...this.db.data?.links[foundLinkIndex],
        confirmed: true,
        confirmedAt: new Date(),
      });
      this.db.write();
      return true;
    } else {
      return false;
    }
  }
}

export default LowDB;
