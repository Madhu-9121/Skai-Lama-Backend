require('dotenv').config();
const mongoose = require("mongoose");
const app = require('./app');


const DB_URI = process.env.DB_URI;
const port = process.env.NODE_ENV || 3000;
mongoose
  .connect(DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Listening at PORT ${port} `);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });

