const express = require('express');
const connectDB = require('./config/db'); // Database configuration
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  // Add other options as needed, like store for production
}));


// Connect to Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: false }));

// Set View Engine
app.set('view engine', 'ejs');

// Serve Static Files
app.use(express.static('public'));

// Use Routes
const authRoutes = require('./routes/auth');
const indexRoute = require('./routes/index')
const adminRoute = require('./routes/admin')

app.use('/', authRoutes, indexRoute, adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
