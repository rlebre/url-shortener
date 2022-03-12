import type { NextApiRequest, NextApiResponse } from 'next';
import { LinkModel, getFullURL } from '../../../lib/lowdb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const shortUrl = req.query.shortUrl as string;

  const fullUrl: LinkModel | undefined = getFullURL(shortUrl);

  if (fullUrl) {
    res.redirect(fullUrl?.fullUrl);
  } else {
    res.status(404).redirect('/404');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
