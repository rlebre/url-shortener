import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDB from '../../../lib/mongodb';

const db = MongoDB.Instance;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  db.insertUser({ email: 'cenas' }).then((e) => res.json({ test: e }));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50kb',
    },
  },
};
