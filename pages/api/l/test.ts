import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDB from '../../../lib/mongodb';

const db = MongoDB.Instance;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await db.userExists({ email: "ruilebre@ua.pt" })

  res.json({ result })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50kb',
    },
  },
};
