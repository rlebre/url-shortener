import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCode } from '../../../constants/StatusCodes';
import { UrlModel } from '../../../interfaces/UrlModel';
import { UserModel } from '../../../interfaces/UserModel';
import EmailSender from '../../../lib/email';
import UrlShortenerDatabase from '../../../lib/urlshortener-database';

const db = UrlShortenerDatabase.Instance;
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

  if (process.env.ENABLE_AUTHORIZED && !(await db.userExists(user))) {
    res.status(401).send('User not authorized.');
    return;
  }

  const short = shortUrl || Math.random().toString(36).substring(2, 6);
  const confirmationHash = Math.random().toString(36).substring(2);
  const link: UrlModel = { shortUrl: short, fullUrl, user, confirmed: false, confirmationHash };

  try {
    const { status, message } = await db.insertUrl(link);

    if (status === StatusCode.Error) {
      res.status(400).json({ status, message });
    } else {
      emailSender
        .sendConfirmationEmail({
          confirmationHash,
          shortLink: short,
          longLink: fullUrl,
          toEmail: email,
        })
        .then(() => res.status(200).json({ status: StatusCode.OK, message: 'Confirmation email sent.' }))
        .catch(() => res.status(400).json({ status: StatusCode.Error, message: 'Error while sending email.' }));
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: StatusCode.Error, message: e });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50kb',
    },
  },
};
