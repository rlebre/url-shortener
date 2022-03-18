import { StatusCode } from '../constants/StatusCodes';
import DbStatus from '../interfaces/DbStatus';
import { UrlModel } from '../interfaces/UrlModel';
import { UserModel } from '../interfaces/UserModel';
import MongoDB, { MongoDbIndex } from './mongodb';

class UrlShortenerDatabase {
  private static _instance: UrlShortenerDatabase;
  mongodb: MongoDB;
  indexes?: MongoDbIndex[];

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    this.mongodb = MongoDB.Instance;
    this.indexes = [
      {
        collectionName: 'users',
        indexSpec: { email: 1 },
        options: { unique: true },
      },
      {
        collectionName: 'urls',
        indexSpec: { shortUrl: 1 },
        options: { unique: true },
      },
    ];
  }

  private getCollection = async (collectionName: string) => {
    const db = await this.mongodb.initDatabase(undefined, this.indexes);
    return db.collection(collectionName);
  };

  private status = (status: StatusCode, message: string) => ({ status, message });

  userExists = async (user: UserModel | string) => {
    const users = await this.getCollection('users');

    const exists =
      typeof user === 'string'
        ? !!(await users.findOne<UserModel>({ email: user }))
        : !!(await users.findOne<UserModel>({ email: user.email }));

    return exists;
  };

  insertUser = async (user: UserModel): Promise<boolean> => {
    const users = await this.getCollection('users');

    if (!(await this.userExists(user))) {
      return (await users.updateOne({ email: user.email }, user, { upsert: true })).acknowledged;
    }

    return true;
  };

  insertUrl = async (url: UrlModel): Promise<DbStatus> => {
    const users = await this.getCollection('users');
    const urls = await this.getCollection('urls');
    const foundUrl = await urls.findOne<UrlModel>({ shortUrl: url.shortUrl });
    const foundUser = await users.findOne<UserModel>({ email: url.user.email });

    const isUserAllowed = process.env.ENABLE_AUTHORIZED ? foundUser?.active : true;

    if (!isUserAllowed) return this.status(StatusCode.Error, 'User not allowed.');

    if (foundUrl?.confirmed) return this.status(StatusCode.Error, 'Short URL exists.');

    const updateDoc = {
      $set: { ...url, createdAt: new Date(), confirmed: false },
    };
    const result = await urls.updateOne({ shortUrl: url.shortUrl }, updateDoc, { upsert: true });

    if (result.upsertedCount <= 0 && result.modifiedCount <= 0)
      return this.status(StatusCode.Error, 'Error while creating short URL.');

    return this.status(StatusCode.OK, 'Short URL created.');
  };

  getUrl = async (shortUrl: string) => {
    const urls = await this.getCollection('urls');

    const result = await urls.findOne<UrlModel>({ $and: [{ shortUrl }, { confirmed: true }] });
    return result;
  };

  confirmHash = async (confirmationHash: string) => {
    const urls = await this.getCollection('urls');

    const updateDoc = {
      $set: {
        confirmed: true,
      },
    };
    const result = await urls.updateOne({ confirmationHash }, updateDoc);
    return result.matchedCount > 0;
  };
}

export default UrlShortenerDatabase;
