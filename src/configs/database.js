import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URI = process.env.DB_URI;

export default DATABASE_URI;
