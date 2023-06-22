const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MessagingResponse, VoiceResponse } = require("twilio").twiml;
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const Lead = require("./models/Lead");
const Task = require("./models/Task");
const User = require("./models/User");
const Text = require("./models/Text");

// DEVELOPMENT
// require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Connect to database
connectDB();
app.use(cors());
// still cors error in production mode so use cors
app.use(cors({ origin: "https://recrm.herokuapp.com" }));
app.use(cors({ origin: "https://crm-server-v1.herokuapp.com" }));

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

// write method for cron job sending emails and notifications

app.post("/notification", async (req, res) => {
  // find task by today's date and 5 minutes before time
  const tasks = await Task.find({
    date: new Date().toLocaleDateString(),
  });

  // filter the tasks and add 5 hours to time
  const filteredTasks = tasks.filter((task) => {
    const currentTime = new Date();
    const timeDiff = task.time - currentTime.getTime();
    // add 5 hours to time
    const diffMins3 = Math.round(timeDiff / 60000) - 300;

    console.log("diffMins------------------------- ", diffMins3);
    if (diffMins3 <= 15 && diffMins3 >= 0 && !task.isEmailSend) {
      return task;
    }
  });

  if (!filteredTasks.length) return res.send(200, "No task found");
  for (let i = 0; i < filteredTasks.length; i++) {
    const task = filteredTasks[i];
    let updatedTask = task;
    // find lead by id
    let user = null;
    if (task.user) {
      user = await User.findById(task.user);
    }
    if (!user) return;
    // set isEmailSend to true
    await Task.findByIdAndUpdate(task._id, { isEmailSend: true });
    updatedTask = {
      ...task._doc,
      time: new Date(task.time).toUTCString(),
      user,
      date: task.date.toLocaleDateString(),
    };

    // create reusable transporter object using the default gmail account
    const transporter = nodemailer.createTransport({
      host: "smtp.porkbun.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: updatedTask.user.email,
      subject: "Task Notification",
      text: "That was easy!",
      html: `<h1>Task Notification</h1>
      <p>Title: ${updatedTask.title}</p>
      <p>Note: ${updatedTask.note}</p>
      <p>Date: ${updatedTask.date}</p>
      <p>Thanks</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error---!", error);
      } else {
        console.log("Email sent: " + info.response);
        res.send(200, info.response);
      }
    });
  }
});

// write webhook for send sms to leads and update isSent to true in text model
app.post("/sendSms", async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const text = await Text.find({
    date: new Date().toLocaleDateString(),
  });
  console.log("text------------------------- ", text);
  // filter the texts and add 5 hours to time
  const filteredTexts = text.filter((text) => {
    const currentTime = new Date();
    const timeDiff = text.date - currentTime.getTime();
    // add 5 hours to time
    const diffMins = Math.round(timeDiff / 60000) - 300;
    console.log("diffMins------------------------- ", diffMins);
    if (!text.isSent) {
      return text;
    }
  });

  console.log("filteredTexts------------------------- ", filteredTexts);

  if (!filteredTexts?.length) return res.send(200, "No text found");

  for (let i = 0; i < filteredTexts.length; i++) {
    const text = filteredTexts[i];
    const tono = text.to.replace(/\D/g, "");
    const message = await client.messages.create({
      body: text.body,
      to: tono, // number passed at row.
      from: process.env.SENDER_PHONE_NUMBER, // From a valid Twilio number
    });
    console.log("message------------------------- ", message);
    await Text.findByIdAndUpdate(
      {
        _id: text._id,
      },
      {
        isSent: true,
        sid: message.accountSid,
        sentDate: message.dateSent,
        from: message.from,
        to: message.to,
        body: message.body,
      }
    );
  }
  res.send(200, "success");
});

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
    // tags: req.body.tags,
    Link: req.body.Link,
    Birthday: req.body.Birthday,
    HomeClosingDate: req.body.HomeClosingDate,
  });
  const response = await lead.save();
  res.send(200, response);
});

app.post("/sms", async (req, res) => {
  const twiml = new MessagingResponse();
  // remove non numeric from phone number
  const number = req.body.From.replace(/\D/g, "");
  const phoneNumber = number.slice(-10);
  const lead = await Lead.find({ phone: { $regex: `${phoneNumber}$` } });
  if (lead?.length) {
    const result = await Text.create({
      body: req.body.Body,
      to: process.env.SENDER_PHONE_NUMBER,
      from: req.body.From,
      dateCreated: new Date(),
      leadId: lead?.[0]?._id,
    });
  }
  // twiml.message(
  //   "Thanks for contacting Ryan Hossack real estate. We will get back to you as soon as a represetnative is available."
  // );
  res.type("text/xml").send(twiml.toString());
});

// webhook for twilio voice call to get the call
app.post("/call", async (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say("Hello, this is a test call.");

  res.type("text/xml");
  res.send(twiml.toString());
});

app.post("/smsList", async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  let messagesIds = [];
  client.messages.list({ limit: 20 }).then((messages) =>
    messages.forEach((m) => {
      console.log(m.sid);
      messagesIds.push(m.sid);
    })
  );
  res.send(200, { success: true, messagesIds });
});

// token for twilio voice call to get the token for call and pass it to client side
app.post("/token", async (req, res) => {
  const AccessToken = require("twilio").jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  // Used when generating any kind of tokens
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY || "SK67daeb0afe4c63609523041e7f23d9f5";
  const twilioApiSecret = process.env.TWILIO_API_SECRET || "TTAVxiWX3sHRhR7LmW1guLx5VlcDQ1HF";

  // Used specifically for creating Voice tokens
  const outgoingApplicationSid = process.env.TWILIO_APP_SID || "APf677b265ba67e840756f10b454fcfe8a";
  const identity = "user";

  // Create a "grant" which enables a client to use Voice as a given user
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingApplicationSid,
    incomingAllow: true, // Optional: add to allow incoming calls
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
    identity: identity,
  });
  token.addGrant(voiceGrant);

  // Serialize the token to a JWT string and include it in a JSON response
  res.send({
    identity: identity,
    token: token.toJwt(),
  });
});

// voice response for twilio voice call to get the call and pass it to client side and get the call

app.listen(port, console.log(`Server running on port ${port}`));
