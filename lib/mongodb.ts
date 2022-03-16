import { CreateIndexesOptions, Db, IndexSpecification, MongoClient } from 'mongodb';

export interface MongoDbIndex {
  collectionName: string;
  indexSpec: IndexSpecification;
  options: CreateIndexesOptions;
}

class MongoDB {
  private static _instance: MongoDB;
  dbClient: MongoClient;
  clientPromise: Promise<MongoClient>;
  defaultDb: Db | undefined;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    const uri = process.env.MONGODB_URI || '';

    if (!process.env.MONGODB_URI) {
      throw new Error('Please add your Mongo URI to .env.local');
    }

    if (process.env.NODE_ENV === 'development') {
      let globalWithMongoClientPromise = global as typeof globalThis & {
        _mongoClientPromise: Promise<MongoClient>;
      };

      if (!globalWithMongoClientPromise._mongoClientPromise) {
        this.dbClient = new MongoClient(uri);
        globalWithMongoClientPromise._mongoClientPromise = this.dbClient.connect();
      } else {
        this.dbClient = new MongoClient(uri);
      }

      this.clientPromise = globalWithMongoClientPromise._mongoClientPromise;
    } else {
      this.dbClient = new MongoClient(uri);
      this.clientPromise = this.dbClient.connect();
    }
  }

  initDatabase = async (dbName?: string, indexes?: MongoDbIndex[]): Promise<Db> => {
    if (!this.defaultDb) {
      const db = (await this.clientPromise).db(dbName);
      indexes?.map((index) => db.collection(index.collectionName).createIndex(index.indexSpec, index.options));
      this.defaultDb = db;
    }

    return this.defaultDb;
  };
}

export default MongoDB;
