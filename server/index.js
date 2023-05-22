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
const Lead = require("./models/Lead");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Connect to database
connectDB();
app.use(cors());

// rest api for test route
app.get("/lead", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// post route for add lead

app.post("/addLead", async (req, res) => {
  if (!req.body.firstName) return res.status(400).send("First Name is required");
  if (!req.body.email) return res.status(400).send("Email is required");
  // create lead
  const findLead = await Lead.findOne({ email: req.body.email });
  if (findLead) return res.status(400).send("Lead already exists");
  const lead = await new Lead({
    firstName: req.body.firstName,
    email: req.body.email,
    lastName: req.body.lastName,
    phone: req.body.phone,
    phoneStatus: req.body.phoneStatus,
    description: req.body.description,
    emailInvalid: req.body.emailInvalid,
    GloballyOptedOutOfEmail: req.body.GloballyOptedOutOfEmail,
    GloballyOptedOutOfBuyerAgentEmail: req.body.GloballyOptedOutOfBuyerAgentEmail,
    GloballyOptedOutOfListingAgentEmail: req.body.GloballyOptedOutOfListingAgentEmail,
    GloballyOptedOutOfLenderEmail: req.body.GloballyOptedOutOfLenderEmail,
    GloballyOptedOutOfAlerts: req.body.GloballyOptedOutOfAlerts,
    OptInDate: req.body.OptInDate,
    BuyerAgentCategory: req.body.BuyerAgentCategory,
    ListingAgentCategory: req.body.ListingAgentCategory,
    LenderCategory: req.body.LenderCategory,
    BuyerAgent: req.body.BuyerAgent,
    ListingAgent: req.body.ListingAgent,
    Lender: req.body.Lender,
    OriginalSource: req.body.OriginalSource,
    OriginalCampaign: req.body.OriginalCampaign,
    LastAgentNote: req.body.LastAgentNote,
    eAlerts: req.body.eAlerts,
    VisitTotal: req.body.VisitTotal,
    listingviewcount: req.body.listingviewcount,
    AvgListingPrice: req.body.AvgListingPrice,
    NextCallDue: req.body.NextCallDue,
    LastAgentCallDate: req.body.LastAgentCallDate,
    LastLenderCallDate: req.body.LastLenderCallDate,
    FirstVisitDate: req.body.FirstVisitDate,
    LastVisitDate: req.body.LastVisitDate,
    RegisterDate: req.body.RegisterDate,
    LeadType: req.body.LeadType,
    AgentSelected: req.body.AgentSelected,
    LenderOptIn: req.body.LenderOptIn,
    Address: req.body.Address,
    City: req.body.City,
    State: req.body.State,
    ZipCode: req.body.ZipCode,
    tags: req.body.tags,
    Link: req.body.Link,
    Birthday: req.body.Birthday,
    HomeClosingDate: req.body.HomeClosingDate,
  });
  const response = await lead.save();
  res.send(200, response);
});

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
