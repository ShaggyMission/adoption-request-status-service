const app = require('./app');
const connectDB = require('./config/db');

const PORT = 3017;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Adoption Request Status Service running on port ${PORT}`);
  });
});
