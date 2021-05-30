import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://raihan-auth:mMGOyLiNpPiyf8wC@cluster0.jw9qb.mongodb.net/nextjs-auth?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );

  return client;
};
