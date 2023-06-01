const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MessagingResponse } = require("twilio").twiml;
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const Lead = require("./models/Lead");
const Task = require("./models/Task");
const User = require("./models/User");
const Text = require("./models/Text");

// // // DEVELOPMENT
// require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();

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

// write method for cron job sending emails and notifications

app.post("/notification", async (req, res) => {
  // find task by today's date and 5 minutes before time
  const tasks = await Task.find({
    date: new Date().toLocaleDateString(),
  });
  // find task from tasks by 5 minutes before time
  // const filteredTasks = tasks.filter((task) => {
  //   const currentTime = new Date();
  //   const timeDiff = task.time - currentTime.getTime();
  //   const diffMins = Math.round(timeDiff / 60000);
  //   console.log("diffMins-------------------------/", diffMins);
  //   if (diffMins <= 15 && diffMins >= 0 && !task.isEmailSend) {
  //     return task;
  //   }
  // });

  // filter the tasks and add 5 hours to time
  const filteredTasks = tasks.filter((task) => {
    const currentTime = new Date();
    const timeDiff = task.time - currentTime.getTime();
    // add 5 hours to time
    const diffMins = Math.round(timeDiff / 60000) + 300;
    console.log("diffMins 22-------------------------/", diffMins);
    if (diffMins <= 15 && diffMins >= 0 && !task.isEmailSend) {
      return task;
    }
  });
  console.log("filteredTasksWithTime-------------------------/", filteredTasks);

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

app.listen(port, console.log(`Server running on port ${port}`));
