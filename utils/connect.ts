import mongoose from 'mongoose';

const connect = () => {
  console.log('db url', process.env.DB_URL);
  return mongoose.connect(
    process.env.DB_URL || 'mongodb://localhost:27017/battles',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
};

export default connect;
