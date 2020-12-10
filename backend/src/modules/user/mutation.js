import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

export const NameChange = async (_, { name, user_id }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE users SET display_name = ? WHERE user_id = ?;`,
    [name, user_id],
  );
};

export const SpendPoints = async (_, { user_id }, { dbConnection }) => {
  const pointsNow = (
    await dbConnection.query(
      `SELECT used_points FROM users WHERE user_id = ?`,
      [user_id],
    )
  )[0];
  var pointsToBe = pointsNow.used_points + 10;
  const spendPoints = await dbConnection.query(
    `UPDATE users SET used_points = ? WHERE user_id = ?;`,
    [pointsToBe, user_id],
  );

  return spendPoints.warningStatus === 0;
};

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

export const SignUp = async (
  _,
  { email, password, communicationId },
  { dbConnection },
) => {
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM users WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    console.log(userByEmail);
    throw new Error('Email already registered');
  }

  const pomodoro_id = await dbConnection.query(
    `SELECT pomodoro_id FROM pomodoros WHERE communication_id = ?`,
    [communicationId],
  );

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO users (email, password, pomodoro_id, display_name)
    VALUES (?, ?, ?, ?);`,
    [email, passwordHash, pomodoro_id[0].pomodoro_id, email],
  );

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    user_id: dbResponse.insertId,
    email: email,
    display_name: email,
  };

  return { user: userObject, token: token };
};
