const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");

//   DEVELOPMENT
//  require("dotenv").config();

const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 4000;

const app = express();

//Connect to database
connectDB();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
