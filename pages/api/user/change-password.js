import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../helpers/db';
import { verifyPassword, hashPassword } from './../../../helpers/auth';
async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(422).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const currentPassword = user.password;
  const checkPassword = await verifyPassword(oldPassword, currentPassword);
  if (!checkPassword) {
    res.status(403).json({ message: 'Invalid Current Password' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
