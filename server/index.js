const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");

// // DEVELOPMENT
// require("dotenv").config();

const { MessagingResponse } = require("twilio").twiml;

const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 4000;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

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

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message(
    "Thanks for contacting Ryan Hossack real estate. We will get back to you as soon as a represetnative is available."
  );

  res.type("text/xml").send(twiml.toString());

  console.log(req.body.From);
  console.log(req.body.Body);
});

app.listen(port, console.log(`Server running on port ${port}`));
