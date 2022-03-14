import { NextApiRequest, NextApiResponse } from 'next';
import LowDB from '../../../../lib/lowdb';

const lowDB = LowDB.Instance;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const confirmationHash = req.query.confirmationHash as string;
  const confirmationOk = lowDB.confirmHash(confirmationHash);

  if (confirmationOk) {
    res.redirect('/confirmed');
  } else {
    res.redirect('/404');
  }
}
