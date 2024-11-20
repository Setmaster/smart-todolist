// load .env data into process.env
require('dotenv').config();
const express = require('express');
const session = require('express-session'); // Add this
const morgan = require('morgan');
const sassMiddleware = require('./lib/sass-middleware');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false,
  })
);
app.use(express.static('public'));

app.use(express.json());

// Set up session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
const userAPIRoutes = require('./routes/users-api');
const todosAPIRoutes = require('./routes/todos-api');
const pagesRoutes = require('./routes/pages');
const {searchToDos} = require("./db/queries/todos");

app.use('/api/users', userAPIRoutes);
app.use('/api/todos', todosAPIRoutes);
app.use('/', pagesRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// searchToDos(1, "movie").then((result=>{
//   console.log(result)
// }))
