import type { NextApiRequest, NextApiResponse } from 'next';
import UrlShortenerDatabase from '../../../lib/urlshortener-database';

const db = UrlShortenerDatabase.Instance;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const shortUrl = req.query.shortUrl as string;

  let fullUrl: string | undefined = (await db.getUrl(shortUrl))?.fullUrl;

  if (fullUrl) {
    fullUrl = fullUrl?.startsWith('http') ? fullUrl : `http://${fullUrl}`;
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
