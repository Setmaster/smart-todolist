const db = require('../connection');

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return db
    .query(`SELECT * FROM users where email = $1`, [email.toLowerCase()])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return db
    .query(`SELECT * FROM users where id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const query = `
    INSERT INTO
     users (name, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `;
  return db
  .query(query, [user.name,user.email,user.password])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * Update a user name in the database.
 * @param {{name: string, id: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const updateUserName = function (user) {
  const query = `
    update users set name = $1 where id = $2 RETURNING *
  `;
  return db
  .query(query, [user.name,user.id])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Update a user password in the database.
 * @param {{name: string, id: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const updateUserPassword = function (user) {
  const query = `
    update users set password = $1 where id = $2 RETURNING *
  `;
  return db
  .query(query, [user.password,user.id])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = { getUserWithEmail, getUserWithId, addUser, updateUserName, updateUserPassword };
