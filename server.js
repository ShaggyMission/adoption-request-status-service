const app = require('./app');
const connectDB = require('./config/db');

const PORT = 3003;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Adoption Request Status Service running on port ${PORT}`);
  });
});
