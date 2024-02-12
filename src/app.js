const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('./utils/config');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const basePath = '/api/v1';
const APP_PORT = config.APP_PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // create application/x-www-form-urlencoded parser
app.use(bodyParser.json());

app.use(`${basePath}/users`, userRoutes);
app.use(`${basePath}/auth`, authRoutes);

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}, basePath: ${basePath}`);
});
