import { compare, hash } from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashPassword) {
  try {
    const isValid = await compare(password, hashPassword);
    return isValid;
  } catch (err) {
    console.log(err);
  }
}
