const db = require('../connection');

const addToDo = function (list) {
  const query = `
    INSERT INTO
    todos
    (
      name,
      user_id,
      category_id,
      todo_date,
      enquiry,
      details
    )
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const queryParams =
  [
    list.name,
    list.user_id,
    list.category_id,
    list.todo_date,
    list.enquiry,
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

};

module.exports = { addToDo };
