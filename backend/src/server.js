require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

/* const authRoutes = require('./routes/auth.routes');
const reportsRoutes = require('./routes/reports.routes'); */

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies
/* 
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes); */

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
    app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error('Mongo connection error', err));
