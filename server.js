const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');

const { DB_HOST, PORT = 5000 } = process.env;

mongoose.connect('mongodb+srv://nastoc4ka:qwaszx@cluster0.cdcnn.mongodb.net/pokemon?retryWrites=true&w=majority')
  .then(() => {
      console.log('Database connection successful');
      app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`);
      });
  })
  .catch((error) => {
      console.log(error);
      process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/pokemon.routes")(app);

//set port, listen for requests
const PORT_BE = process.env.PORT || 8080;
app.listen(PORT_BE, () => {
    console.log(`Server is running on port ${PORT_BE}.`);
});
