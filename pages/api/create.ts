import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel, LinkModel, insertLink } from '../../lib/lowdb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') res.status(404).send('Not found');

  const { email, shortUrl, fullUrl } = req.body;

  const user: UserModel = { email };
  const link: LinkModel = { shortUrl, fullUrl, user };

  insertLink(link);

  res.status(200).json({ status: 'Link created' });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50kb',
    },
  },
};
