import type { NextApiRequest, NextApiResponse } from 'next';
import LowDB from '../../../lib/lowdb';

const lowDB = LowDB.Instance;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const shortUrl = req.query.shortUrl as string;

  const fullUrl: string | undefined = lowDB.getLink(shortUrl)?.fullUrl;

  if (fullUrl) {
    res.redirect(fullUrl);
  } else {
    res.status(404).redirect('/404');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
