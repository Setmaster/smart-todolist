DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id int REFERENCES categories(id) ON DELETE CASCADE,
  date_created timestamp NOT NULL DEFAULT now(),
  complete_date timestamp DEFAULT NULL,
  enquiry text NOT NULL,
  details text
);
