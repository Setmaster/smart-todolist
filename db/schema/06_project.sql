DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS todo_lists CASCADE;
DROP TABLE IF EXISTS todo_intakes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE statuses (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  active boolean NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  active boolean NOT NULL
);

CREATE TABLE todo_lists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category_id int REFERENCES categories(id) ON DELETE CASCADE,
  date_created timestamp NOT NULL,
  status_id int NOT NULL REFERENCES statuses(id) ON DELETE CASCADE,
  start_date timestamp NOT NULL,
  complete_data timestamp,
  details text
);

CREATE TABLE todo_intakes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  enquiry text NOT NULL,
  date_created timestamp NOT NULL,
  status_id int NOT NULL REFERENCES statuses(id) ON DELETE CASCADE,
  list_id int REFERENCES todo_lists(id) ON DELETE CASCADE
);
