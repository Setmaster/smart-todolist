const db = require('../connection');
const {generateTask} = require("../../lib/ai-utils");

/**
 * Create a doto in the database based on provided enquiry.
 * @param {{user_id: string, enquiry: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addToDo = function (user_id, enquiry) {
  return generateTask(enquiry).then(({error, task}) => {
    console.log(`Error: ${error}`);
    console.log("Generated Task:", JSON.stringify(task, null, 2));
    if (error) {
      return Promise.reject(new Error("Task generation failed"));
    }
    let list = {
      "title": task["Title"],
      "user_id": user_id,
      "category": task["Category"],
      "details": task["Details"]
    };
    const query = `
      INSERT INTO
      todos
      (
        title,
        user_id,
        category,
        details
      )
      VALUES
      ($1, $2, $3, $4)
      RETURNING *
    `;
    const queryParams = [
      list.title,
      list.user_id,
      list.category,
      list.details
    ];

    return db.query(query, queryParams)
      .then((result) => {
        console.log(result.rows[0]);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  });
};

/**
 * Update a list  in the database.
 * @param {{title: string, details: string, category: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const updateToDo = function (list) {
  const query = `
    update todos set title = $1, category = $3 where id = $2 RETURNING *
  `;
  return db
  .query(query, [list.title,list.id, list.category])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Set list complete  in the database.
 * @param {{id: string}} id
 * @return {Promise<{}>} A promise to the user.
 */
const completeToDo = function (id) {
  const query = `
    update todos set complete_date = now() where id = $1 RETURNING *
  `;
  return db
  .query(query, [id])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * set not complete list in the database.
 * @param {{id: string}} id
 * @return {Promise<{}>} A promise to the user.
 */
const uncompleteTodo = function (id) {
  const query = `
    update todos set complete_date = null where id = $1 RETURNING *
  `;
  return db
  .query(query, [id])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * delete list in the database.
 * @param {{id: string}} id
 * @return {Promise<{}>} A promise to the user.
 */
const deleteToDo = function (id) {
  const query = `
    delete from todos where id = $1 RETURNING *
  `;
  return db
  .query(query, [id])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * get list of todos in the database by user/category.
 * @param {{id: string, category: string}} id
 * @return {Promise<{}>} A promise to the user.
 */
const toDosByCategory = function (user_id, category) {
  console.log('user id and category in database', user_id, category)
  const query = `
    select * from todos where user_id = $1 and lower(category) like $2
    order by complete_date desc, date_created asc
  `;
  return db
  .query(query, [user_id, `%${category.toLowerCase()}%`])
  .then((result) => {
    console.log('db return results', result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * search list of todos in the database by title or details.
 * @param {{id: string, searchingKey: string}} id
 * @return {Promise<{}>} A promise to the user.
 */
const searchToDos = function (user_id, searchingKey) {
  const query = `
    SELECT * FROM todos WHERE user_id = $1
    AND (LOWER(title) LIKE $2 OR LOWER(details) LIKE $2)
    ORDER BY complete_date DESC, date_created ASC;
  `;
  return db
    .query(query, [user_id, `%${searchingKey.toLowerCase()}%`])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      throw err; // propagate error
    });
};


module.exports = { addToDo, updateToDo, completeToDo, uncompleteTodo, deleteToDo, toDosByCategory, searchToDos };
