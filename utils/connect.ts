import mongoose from 'mongoose';
import config from '../config';

const connect = () => {
  return mongoose.connect(config.dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default connect;
