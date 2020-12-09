const config = {
  dburl: process.env.dburl || 'mongodb://localhost:27017/battles',
  host: process.env.host || 'localhost',
  port: process.env.port || 3000,
};

export default config;
