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
      //console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      //console.log(err.message);
      throw err; // propagate error
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
      //console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      //console.log(err.message);
      throw err; // propagate error
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
    //console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    //console.log(err.message);
    throw err; // propagate error
  });

};

/**
 * Update a user  in the database.
 * @param {{name: string, id: string, password: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const updateUser = function (user) {
  const query = `
    update users set name = $1, password = COALESCE ($3 , password) where id = $2 RETURNING *
  `;
  return db
  .query(query, [user.name,user.id, user.password])
  .then((result) => {
    //console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    //console.log(err.message);
    throw err; // propagate error
  });
};


module.exports = { getUserWithEmail, getUserWithId, addUser, updateUser };
