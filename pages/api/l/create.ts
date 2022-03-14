import type { NextApiRequest, NextApiResponse } from 'next';
import EmailSender from '../../../lib/email';
import LowDB, { UserModel, LinkModel } from '../../../lib/lowdb';

const lowDB = LowDB.Instance;
const emailSender = new EmailSender();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).send('Not found');
    return;
  }

  const { email, shortUrl, fullUrl } = req.body;

  if (!email || !fullUrl) {
    res.status(400).send('Missing parameters.');
    return;
  }

  const user: UserModel = { email };

  if (!lowDB.userExists(user)) {
    res.status(401).send('User not authorized.');
    return;
  }

  const short = shortUrl || Math.random().toString(36).substring(2, 6);
  const confirmationHash = Math.random().toString(36).substring(2);
  const link: LinkModel = { shortUrl: short, fullUrl, user, confirmed: false, confirmationHash };

  lowDB.insertLink(link);

  emailSender
    .sendConfirmationEmail({
      confirmationHash,
      shortLink: short,
      longLink: fullUrl,
      toEmail: email,
    })
    .then(() => res.status(200).json({ status: 'Confirmation email sent.' }))
    .catch(() => res.status(400).json({ status: 'Error while sending email.' }));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50kb',
    },
  },
};
