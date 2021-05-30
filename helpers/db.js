import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://raihan:TdgFAVbWi8bwLVR@cluster0.jw9qb.mongodb.net/nextjs-auth?retryWrites=true&w=majority`
  );

  return client;
};
