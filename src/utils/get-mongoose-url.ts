import * as dotenv from 'dotenv';

dotenv.config(); // Nạp biến môi trường từ tệp .env

export default () => {
  let mongoUrl = '';
  if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
    mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
    return mongoUrl;
  }
  mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  return mongoUrl;
};
