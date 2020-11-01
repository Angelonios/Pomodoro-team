import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

export const SignIn = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM users WHERE email = ? LIMIT 1;`,
    [email],
  );

  const user = dbResponse[0];
  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.user_id });
    return {
      user: { ...user },
      token,
    };
  }
};

export const SignUp = async (_, { email, password }, { dbConnection }) => {
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM users WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    console.log(userByEmail);
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO users (email, password)
    VALUES (?, ?);`,
    [email, passwordHash],
  );

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    user_id: dbResponse.insertId,
    email: email,
  };

  return { user: userObject, token: token };
};
