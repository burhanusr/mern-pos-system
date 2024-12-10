const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// DATABASE CONNECT -> MONGODB SHELL
// const db = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// };

// DATABASE CONNECT -> MONGODB ATLAS
const DB = process.env.DB_ATLAS.replace(
  '<PASSWORD>',
  process.env.DB_ATLAS_PASSWORD
);

const connectDB = async () => {
  try {
    // await mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`);
    await mongoose.connect(DB);
    console.log('Database successfuly connected!');
  } catch (error) {
    console.error('Failed to connect to database: ', error);
  }
};

module.exports = connectDB;
