import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from './../../../helpers/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const userCollection = client.db.collection('users');
        const user = userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error('User not found');
        }

        const isValidResult = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidResult) {
          client.close();
          throw new Error('Cloud not log you in!');
        }

        return {
          email: user.email,
        };

        client.close();
      },
    }),
  ],
});
