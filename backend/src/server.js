const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const initDb = require('./config/database/init');
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
initDb();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const path = require('path');
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  } else {
    res.status(404).json({ success: false, error: 'Route not found' });
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
module.exports = app;
