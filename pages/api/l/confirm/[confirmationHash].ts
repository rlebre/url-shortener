import { NextApiRequest, NextApiResponse } from 'next';
import UrlShortenerDatabase from '../../../../lib/url-shortener-database';

const db = UrlShortenerDatabase.Instance;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const confirmationHash = req.query.confirmationHash as string;
  const confirmationOk = await db.confirmHash(confirmationHash);
  console.log(confirmationHash, confirmationOk);
  if (confirmationOk) {
    res.redirect('/confirmed');
  } else {
    res.redirect('/404');
  }
}
