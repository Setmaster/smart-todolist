const db = require('../connection');
const {generateTask} = require("../../lib/ai-utils");

const addToDo = function (id, enquire) {

  generateTask(enquire).then(({error, task})=>{
    console.log(`Error: ${error}`);
    console.log("Generated Task:", JSON.stringify(task, null, 2));
    if (error) {
      return;
    }
    let list = {
      "title" : task["Title"],
      "user_id": id,
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
  const queryParams =
  [
    list.title,
    list.user_id,
    list.category,
    list.details
  ];

  return db
  .query(query, queryParams)
  .then((result) => {
   console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
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
    update todos set title = $1, category = $3, details = $4 where id = $2 RETURNING *
  `;
  return db
  .query(query, [list.title,list.id, list.category, list.details])
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
const notCompleteToDo = function (id) {
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

module.exports = { addToDo, updateToDo, completeToDo, notCompleteToDo, deleteToDo };
