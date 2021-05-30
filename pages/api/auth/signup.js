import { connectToDatabase } from './../../../helpers/db';
import { hashPassword } from './../../../helpers/auth';
const handler = async (req, res) => {
  const { email, password } = req.body;

  if (
    !email ||
    email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid email or password, password must be at least 7 characters',
    });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();

  const hashPassword = hashPassword(password);

  const result = await db.collection('users').insertOne({
    email,
    password: hashPassword,
  });

  res.status(201).json({
    message: 'Created user successfully',
  });
};

export default handler;
