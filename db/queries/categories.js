const db = require('../connection');

/**
 * Get a single category from the database given their id.
 * @param {string} name The name of the category.
 * @return {Promise<{}>} A promise to the category.
 */
const checkCategoryExists = function (name) {
  return db
    .query(`SELECT * FROM categories where name = $1`, [name.toLowerCase()])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single category from the database given their id.
 * @param {string} id The id of the category.
 * @return {Promise<{}>} A promise to the category.
 */
const getCategoryById = function (id) {
  return db
    .query(`SELECT * FROM categories where id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
/**
 * Add a new category to the database.
 * @param {{name: string}} name
 * @return {Promise<{}>} A promise to the category.
 */
const addCategory = function (name) {
  const query = `
    INSERT INTO
     categories (name)
    VALUES
      ($1)
    RETURNING *
  `;
  return db
  .query(query, [name.toLowerCase()])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * Get all categories for a the table.
 * @return {Promise<[{}]>} A promise to the categories.
 */
const getAllCategories = function () {
  const query = `
  select *
  from categories
  `;
  return db
    .query(query)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getCategoryById, addCategory, getAllCategories, checkCategoryExists };
