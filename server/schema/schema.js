//Dependencies
const Project = require("../models/Project");
const Client = require("../models/Client");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Lead = require("../models/Lead");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");
const User = require("../models/User");
const Note = require("../models/Note");
const Tag = require("../models/Tag");
const Category = require("../models/Category");
const EAlert = require("../models/EAlert");
const Call = require("../models/Call");
const Text = require("../models/Text");
const Task = require("../models/Task");
const TaskType = require("../models/TaskType");

const TwilioMSGType = new GraphQLObjectType({
  name: "TwilioMSG",
  fields: () => ({
    accountSid: { type: GraphQLID },
    id: { type: GraphQLID },
    to: { type: GraphQLString },
    from: { type: GraphQLString },
    body: { type: GraphQLString },
    status: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    dateUpdated: { type: GraphQLString },
    dateSent: { type: GraphQLString },
    direction: { type: GraphQLString },
  }),
});

// Define the EmailType to represent an email object
const EmailType = new GraphQLObjectType({
  name: "Email",
  fields: () => ({
    id: { type: GraphQLString },
    to: { type: GraphQLString },
    subject: { type: GraphQLString },
    body: { type: GraphQLString },
    scheduledTime: { type: GraphQLString },
  }),
});

// === GRAPHQL TYPES ========================================

//User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    emailVerificationToken: { type: GraphQLString },
    verificationToken: { type: GraphQLBoolean },
    emailVerified: { type: GraphQLBoolean },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//Call Type
const CallType = new GraphQLObjectType({
  name: "Call",
  fields: () => ({
    id: { type: GraphQLID },
    contactId: { type: GraphQLString },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    DateCreated: { type: GraphQLString },
    BuyerAgent: { type: GraphQLString },
    ListingAgent: { type: GraphQLString },
    UserID: { type: GraphQLString },
    AssociatedopportunityID: { type: GraphQLString },
    CallDetails: { type: GraphQLString },
    ContactPhoneID: { type: GraphQLString },
    LogType: { type: GraphQLString },
    MediaURL: { type: GraphQLString },
    CallStartTime: { type: GraphQLString },
    CallEndTime: { type: GraphQLString },
    lead: {
      type: LeadType,
      resolve(parent, args) {
        return Lead.findById(parent.leadId);
      },
    },
  }),
});

//EAlert Type
const EAlertType = new GraphQLObjectType({
  name: "Ealert",
  fields: () => ({
    id: { type: GraphQLID },
    contactId: { type: GraphQLString },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    SearchName: { type: GraphQLString },
    QueryString: { type: GraphQLString },
    EmailFrequency: { type: GraphQLString },
    BuyerAgent: { type: GraphQLString },
    ListingAgent: { type: GraphQLString },
    lead: {
      type: LeadType,
      resolve(parent, args) {
        return Lead.findById(parent.leadId);
      },
    },
  }),
});

//

//Note Type
const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    id: { type: GraphQLID },
    contactId: { type: GraphQLString },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Notes: { type: GraphQLString },
    BuyerAgent: { type: GraphQLString },
    ListingAgent: { type: GraphQLString },
    lead: {
      type: LeadType,
      resolve(parent, args) {
        return Lead.findById(parent.leadId);
      },
    },
  }),
});

//  Note Type for multiple notes
const MultipleNotesType = new GraphQLList(NoteType);

// Note Input Type
const NoteInputType = new GraphQLInputObjectType({
  name: "NoteInput",
  fields: () => ({
    contactId: { type: GraphQLString },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Notes: { type: GraphQLString },
    BuyerAgent: { type: GraphQLString },
    ListingAgent: { type: GraphQLString },
  }),
});

const TextType = new GraphQLObjectType({
  name: "Text",
  fields: () => ({
    id: { type: GraphQLID },
    to: { type: GraphQLString },
    from: { type: GraphQLString },
    body: { type: GraphQLString },
    status: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    date_Updated: { type: GraphQLString },
    accountSid: { type: GraphQLString },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Lead Type
const LeadType = new GraphQLObjectType({
  name: "Lead",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    phoneStatus: { type: GraphQLString },
    description: { type: GraphQLString },
    emailInvalid: { type: GraphQLString },
    GloballyOptedOutOfEmail: { type: GraphQLString },
    GloballyOptedOutOfBuyerAgentEmail: { type: GraphQLString },
    GloballyOptedOutOfListingAgentEmail: { type: GraphQLString },
    GloballyOptedOutOfLenderEmail: { type: GraphQLString },
    GloballyOptedOutOfAlerts: { type: GraphQLString },
    OptInDate: { type: GraphQLString },
    BuyerAgentCategory: { type: GraphQLString },
    ListingAgentCategory: { type: GraphQLString },
    LenderCategory: { type: GraphQLString },
    BuyerAgent: { type: GraphQLString },
    ListingAgent: { type: GraphQLString },
    Lender: { type: GraphQLString },
    OriginalSource: { type: GraphQLString },
    OriginalCampaign: { type: GraphQLString },
    LastAgentNote: { type: GraphQLString },
    eAlerts: { type: GraphQLString },
    VisitTotal: { type: GraphQLString },
    listingviewcount: { type: GraphQLString },
    AvgListingPrice: { type: GraphQLString },
    NextCallDue: { type: GraphQLString },
    LastAgentCallDate: { type: GraphQLString },
    LastLenderCallDate: { type: GraphQLString },
    FirstVisitDate: { type: GraphQLString },
    LastVisitDate: { type: GraphQLString },
    RegisterDate: { type: GraphQLString },
    LeadType: { type: GraphQLString },
    AgentSelected: { type: GraphQLString },
    LenderOptIn: { type: GraphQLString },
    Address: { type: GraphQLString },
    City: { type: GraphQLString },
    State: { type: GraphQLString },
    ZipCode: { type: GraphQLString },
    tagsList: { type: GraphQLList(GraphQLString) },
    categoriesList: { type: GraphQLList(GraphQLString) },
    tags: { type: GraphQLList(GraphQLID) },
    categories: { type: GraphQLList(GraphQLID) },
    Link: { type: GraphQLString },

    Birthday: { type: GraphQLString },
    HomeClosingDate: { type: GraphQLString },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return Tag.find({ _id: { $in: parent.tags } });
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({ _id: { $in: parent.categories } });
      },
    },
  }),
});

const FilterModelTypes = new GraphQLObjectType({
  name: "FilterModelTypes",
  fields: () => ({
    columnField: { type: GraphQLString },
    operatorValue: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

const TagType = new GraphQLObjectType({
  name: "Tag",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
  }),
});

const TaskListType = new GraphQLObjectType({
  name: "TaskListType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const TaskTypes = new GraphQLObjectType({
  name: "Reminder",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    note: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user);
      },
    },
    lead: {
      type: LeadType,
      resolve(parent, args) {
        return Lead.findById(parent.lead);
      },
    },
  }),
});

//Graphql Input Types:

// Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    calls: {
      type: new GraphQLList(CallType),
      args: {
        leadId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Call.find({ leadId: args.leadId });
      },
    },
    call: {
      type: CallType,
      args: {
        leadId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Call.findById(args.id);
      },
    },

    texts: {
      type: new GraphQLList(TextType),
      args: {
        leadId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Text.find({ leadId: args.leadId });
      },
    },
    text: {
      //TODO
      type: TextType,
      args: {
        leadId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Text.findOne({ leadId: args.leadId });
      },
    },
    notes: {
      type: new GraphQLList(NoteType),
      args: {
        leadId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Note.find({ leadId: args.leadId });
      },
    },
    note: {
      type: NoteType,
      args: {
        leadId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Note.findOne({ leadId: args.leadId });
      },
    },
    ealerts: {
      type: new GraphQLList(EAlertType),
      args: {
        leadId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return EAlert.find({ leadId: args.leadId });
      },
    },
    ealert: {
      type: EAlertType,
      args: {
        leadId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return EAlert.findById(args.id);
      },
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    leads: {
      // type of data we are returning with count and leads
      type: new GraphQLObjectType({
        name: "Leads",
        fields: () => ({
          count: { type: GraphQLInt },
          rows: { type: new GraphQLList(LeadType) },
        }),
      }),
      args: {
        skip: { type: GraphQLInt },
        take: { type: GraphQLInt },
        filter: { type: GraphQLString },
        category: { type: GraphQLList(GraphQLString) },
        sort: { type: GraphQLString },
        column: { type: GraphQLString },
        filterModel: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const filterModel = JSON.parse(args.filterModel);

        const totalCount = await Lead.countDocuments();

        // find by categoryList
        if (args && args.category.length) {
          const searchRegexes = args.category.map((term) => term && new RegExp(term, "i"));
          const response = await Lead.find({
            // categoriesList: {
            //   $elemMatch: { $regex: new RegExp(args.category, "i") },
            // },
            categoriesList: { $in: searchRegexes },
          });
          return { count: totalCount, rows: response };
        }

        let sortCriteria = {};

        // get leads keys
        const keys = Object.keys(Lead.schema.paths);
        // get leads keys that are not _id, __v, categoriesList, tagsList
        const leadKeys = keys.filter(
          (key) => !["_id", "__v", "categoriesList", "tagsList"].includes(key)
        );

        // if column is in leadKeys, then sort by that column
        if (args.column && leadKeys.includes(args.column)) {
          sortCriteria[args.column] = args.sort === "desc" ? -1 : 1;
        }

        // filter record by contains, equals, etc.
        const query = {};

        // Filter records based on a field that contains a specific value
        if (filterModel?.operatorValue === "contains") {
          query[filterModel?.columnField] = { $regex: `.*${filterModel?.value}.*`, $options: "i" };
        }

        // Filter records based on a field that equals a specific value
        if (filterModel?.operatorValue === "equals") {
          query[filterModel?.columnField] = filterModel?.value;
        }

        // Filter records based on a field that starts with a specific value
        if (filterModel?.operatorValue === "startsWith") {
          query[filterModel?.columnField] = { $regex: `^${filterModel?.value}`, $options: "i" };
        }

        // Filter records based on a field that ends with a specific value
        if (filterModel?.operatorValue === "endsWith") {
          query[filterModel?.columnField] = { $regex: `${filterModel?.value}$`, $options: "i" };
        }

        // Filter records based on a field that is not empty
        if (filterModel?.operatorValue === "isNotEmpty") {
          query[filterModel?.columnField] = { $ne: "" };
        }

        // Filter records based on a field that is empty
        if (filterModel?.operatorValue === "isEmpty") {
          query[filterModel?.columnField] = "";
        }

        // Filter records on whole database
        if (filterModel?.operatorValue === "isAnyOf") {
          query[filterModel?.columnField] = { $in: filterModel?.value };
        }

        if (
          (filterModel && filterModel?.value) ||
          filterModel?.operatorValue === "isEmpty" ||
          filterModel?.operatorValue === "isNotEmpty"
        ) {
          const response = await Lead.find(query)
            .limit(args?.take)
            .skip(args?.skip)
            .sort(args.column ? sortCriteria : { createdAt: -1 })
            .exec();
          return { count: totalCount, rows: response };
        }

        const leads = await Lead.find({
          $or: [
            { firstName: { $regex: new RegExp(args.filter, "i") } },
            { lastName: { $regex: new RegExp(args.filter, "i") } },
            { email: { $regex: new RegExp(args.filter, "i") } },
            { phone: { $regex: new RegExp(args.filter, "i") } },
          ],
        })
          .limit(args?.take)
          .skip(args?.skip)
          .sort(args.column ? sortCriteria : { createdAt: -1 })
          .exec();
        return { count: totalCount, rows: leads };
      },
    },

    lead: {
      type: LeadType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return Lead.findById(args.id)
          .then((result) => {
            // console.log("found lead", result);
            return result;
          })
          .catch((error) => {
            console.error("error finding lead", error);
            return null;
          });
      },
    },
    tag: {
      type: TagType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Tag.findById(args.id)
          .then((result) => {
            console.log("found tag", result);
            return result;
          })
          .catch((error) => {
            console.error("error finding tag", error);
            return null;
          });
      },
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return Tag.find();
      },
    },
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findById(args.id)
          .then((result) => {
            console.log("found category", result);
            return result;
          })
          .catch((error) => {
            console.error("error finding category", error);
            return null;
          });
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find();
      },
    },
    // get all tasks
    tasks: {
      type: new GraphQLList(TaskTypes),
      async resolve(parent, args) {
        // delete all task
        const response = await Task.find().sort({ date: -1 });

        let result = [];
        for (let i = 0; i < response.length; i++) {
          const task = response[i];
          let task1 = task;
          // find lead by id
          let lead = null;
          if (task.lead) {
            lead = await Lead.findById(task.lead);
          }
          task1 = { ...task._doc, lead, date: task.date.toLocaleDateString() };
          result.push(task1);
        }
        return result;
      },
    },
    // get task by id
    task: {
      type: TaskTypes,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Task.findById(args.id);
      },
    },
    // get all tasks by userId
    taskTypes: {
      type: new GraphQLList(TaskListType),
      args: { userId: { type: GraphQLID } },
      async resolve(parent, args) {
        // use when user is logged in
        // return await TaskType.find({ user: args.userId });
        const response = await TaskType.find();
        return response;
      },
    },
    // send notification for today's tasks to user
    notifications: {
      type: TaskTypes,
      args: { userId: { type: GraphQLID } },
      async resolve(parent, args) {
        const tasks = await Task.find({
          date: new Date().toLocaleDateString(),
        });
        // get user's email from tasks

        // const userEmails = tasks.map((task) => task.user);

        return tasks;
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    sendCall: {
      type: TextType,
      args: {
        toNumber: { type: GraphQLString },
        msg: { type: GraphQLString },
        leadId: { type: GraphQLID },
      },

      async resolve(parent, args) {
        // Your AccountSID and Auth Token from console.twilio.com
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const client = require("twilio")(accountSid, authToken);

        return client.calls
          .create({
            twiml: "<Response><Say>Bryan Hossack real estate at your service!</Say></Response>",
            to: args.toNumber, // number passed at row.
            from: "+18443112751", // From a valid Twilio number
          })
          .then((message) => {
            // console.log(message.sid)
            console.log(message);
            const twilioMSG = {
              date_Updated: message.dateUpdated,
              date_Sent: message.dateSent,
              accountSid: message.accountSid,
              to: message.to,
              from: message.from,
              body: message.body,
              status: message.status,
            };

            // const newText = new Text({
            //     body: twilioMSG.body,
            //     to: twilioMSG.to,
            //     from: twilioMSG.from,
            //     dateCreated: twilioMSG.date_Updated,
            //     leadId: args.leadId,
            //     });

            //  newText.save();

            return twilioMSG;
          });

        //   return projects;
      },
    },
    sendSMS: {
      type: TextType,
      args: {
        toNumber: { type: GraphQLString },
        msg: { type: GraphQLString },
        leadId: { type: GraphQLID },
      },

      async resolve(parent, args) {
        // Your AccountSID and Auth Token from console.twilio.com
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const client = require("twilio")(accountSid, authToken);

        return client.messages
          .create({
            body: args.msg,
            to: args.toNumber, // number passed at row.
            from: "+18443112751", // From a valid Twilio number
          })
          .then((message) => {
            // console.log(message.sid)
            console.log(message);
            const twilioMSG = {
              date_Updated: message.dateUpdated,
              date_Sent: message.dateSent,
              accountSid: message.accountSid,
              to: message.to,
              from: message.from,
              body: message.body,
              status: message.status,
            };

            const newText = new Text({
              body: twilioMSG.body,
              to: twilioMSG.to,
              from: twilioMSG.from,
              dateCreated: twilioMSG.date_Updated,
              leadId: args.leadId,
            });

            newText.save();

            return twilioMSG;
          });

        //   return projects;
      },
    },
    //Email Verification Register User
    registerUser: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error("User already exists");
        }
        if (args.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        const hashedPassword = await bcrypt.hash(args.password, 10);
        const user = new User({
          email: args.email,
          password: hashedPassword,
        });
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        user.emailVerificationToken = token;
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
          to: user.email,
          subject: "Account Verification Token",
          text:
            "Hello,\n\n" +
            "Please verify your account by clicking the link:" +
            process.env.BASE_URL +
            "/verifyemail/" +
            "\n",
          html:
            "Hello,<br><br>" +
            'Please verify your account by clicking the link: <a href="' +
            process.env.BASE_URL +
            "/verifyemail/" +
            token +
            '">here</a>.<br>',
          // html: 'Hello,<br><br>' + 'Please verify your account by clicking the link: <a href="' + process.env.BASE_URL +'\/verify\/' + '">here</a>.<br>'
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("A verification email has been sent to " + user.email + ".");
          }
        });
        return user.save();
      },
    },

    //Verify Email
    verifyEmail: {
      type: UserType,
      args: {
        token: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        // Verify and decode the user's token
        const decoded = jwt.verify(args.token, process.env.TOKEN_SECRET);
        const user = await User.findOne({
          _id: decoded._id,
          emailVerificationToken: args.token,
        });
        if (!user) {
          return {
            success: false,
            message: "We were unable to find a user for this token.",
            user: null,
          };
        }
        if (user.emailVerified) {
          return {
            success: false,
            message: "This user has already been verified.",
            user: null,
          };
        }
        user.emailVerified = true;
        user.emailVerificationToken = undefined;
        const result = await user.save();
        return result;
      },
    },

    // Delete Users for testing

    deleteUser: {
      type: new GraphQLObjectType({
        name: "DeleteUser",
        fields: () => ({
          message: { type: GraphQLString },
        }),
      }),
      args: {
        userId: { type: GraphQLID },
      },

      async resolve(parent, args) {
        const user = await User.deleteMany();
        return { message: "User deleted" };
      },
    },

    // Change password

    changePassword: {
      type: UserType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        oldPassword: { type: GraphQLNonNull(GraphQLString) },
        newPassword: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { userId, oldPassword, newPassword }) {
        // Find the user in the database
        const user = await User.findById(userId);

        // Verify that the old password matches the user's current password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        // Hash the new password and update the user's password in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return user;
      },
    },
    //Login User
    loginUser: {
      type: new GraphQLObjectType({
        name: "LoginUser",
        fields: () => ({
          user: { type: UserType },
          token: { type: GraphQLString },
        }),
      }),
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("No user with that email");
        }
        if (!user.emailVerified) {
          throw new Error("Please verify your email");
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        return { user, token };
      },
    },
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();

        //Client.create(//fields) //could do it this way as well
      },
    },
    //addLead
    addLead: {
      type: LeadType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLString },
        phoneStatus: { type: GraphQLString },
        description: { type: GraphQLString },
        emailInvalid: { type: GraphQLString },
        GloballyOptedOutOfEmail: { type: GraphQLString },
        GloballyOptedOutOfBuyerAgentEmail: { type: GraphQLString },
        GloballyOptedOutOfListingAgentEmail: { type: GraphQLString },
        GloballyOptedOutOfLenderEmail: { type: GraphQLString },
        GloballyOptedOutOfAlerts: { type: GraphQLString },
        OptInDate: { type: GraphQLString },
        BuyerAgentCategory: { type: GraphQLString },
        ListingAgentCategory: { type: GraphQLString },
        LenderCategory: { type: GraphQLString },
        BuyerAgent: { type: GraphQLString },
        ListingAgent: { type: GraphQLString },
        Lender: { type: GraphQLString },
        OriginalSource: { type: GraphQLString },
        OriginalCampaign: { type: GraphQLString },
        LastAgentNote: { type: GraphQLString },
        eAlerts: { type: GraphQLString },
        VisitTotal: { type: GraphQLString },
        listingviewcount: { type: GraphQLString },
        AvgListingPrice: { type: GraphQLString },
        NextCallDue: { type: GraphQLString },
        LastAgentCallDate: { type: GraphQLString },
        LastLenderCallDate: { type: GraphQLString },
        FirstVisitDate: { type: GraphQLString },
        LastVisitDate: { type: GraphQLString },
        RegisterDate: { type: GraphQLString },
        LeadType: { type: GraphQLString },
        AgentSelected: { type: GraphQLString },
        LenderOptIn: { type: GraphQLString },
        Address: { type: GraphQLString },
        City: { type: GraphQLString },
        State: { type: GraphQLString },
        ZipCode: { type: GraphQLString },
        tags: { type: GraphQLList(GraphQLString) }, // updated
        Link: { type: GraphQLString },
        Birthday: { type: GraphQLString },
        HomeClosingDate: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const lead = new Lead(args);
          const result = await lead.save();
          return result;
        } catch (error) {
          console.error("Error details", error);
          throw new Error("Error adding lead");
        }
      },
    },
    addCategory: {
      type: CategoryType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        dateCreated: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          const category = new Category(args);
          const result = await category.save();

          return result;
        } catch (error) {
          console.error(error);

          throw new Error("Error adding tag");
        }

        //Client.create(//fields) //could do it this way as well
      },
    },

    addTag: {
      type: TagType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        dateCreated: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          const tag = new Tag(args);
          const result = await tag.save();

          return result;
        } catch (error) {
          console.error(error);

          throw new Error("Error adding tag");
        }

        //Client.create(//fields) //could do it this way as well
      },
    },

    // add multiple leads at once from list of arrays in stringfy format
    addLeadsCsv: {
      type: new GraphQLObjectType({
        name: "addLeadsCsv",
        fields: () => ({
          count: { type: GraphQLInt },
          // leads: { type: new GraphQLList(LeadType) },
        }),
      }),

      args: {
        leads: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // convert string to array
        const leads = JSON.parse(args.leads);

        if (leads.length) {
          // use upsert data to save leads to database but upsertMany is not supported in mongoose
          // so we need to use bulkWrite to save leads to database
          const bulkWrite = leads.map((lead) => ({
            updateOne: {
              filter: {
                firstName: lead.firstName,
                lastName: lead.lastName,
              },
              update: {
                ...lead,
                firstName: lead.FirstName,
                lastName: lead.LastName,
                email: lead.Emails,
                phone: lead.Phones,
                phoneStatus: lead.PhoneStatus,
                description: lead.Description,
                emailInvalid: lead.EmailInvalid,
                GloballyOptedOutOfBuyerAgentEmail: lead.OptedOutOfBuyerAgentEmail,
                GloballyOptedOutOfListingAgentEmail: lead.OptedOutOfListingAgentEmail,
                GloballyOptedOutOfLenderEmail: lead.OptedOutOfLenderEmail,
                GloballyOptedOutOfAlerts: lead.OptedOutOfeAlerts,
              },
              upsert: true,
            },
          }));

          // return upserted leads count
          const response = await (await Lead.bulkWrite(bulkWrite)).result.nUpserted;
          return { count: response };
        }
      },
    },

    // delete leads by id and all found in database
    deleteLeads: {
      type: new GraphQLObjectType({
        name: "deleteLeads",
        fields: () => ({
          message: { type: GraphQLString },
        }),
      }),
      args: {
        ids: { type: GraphQLList(GraphQLID) },
        deleteAll: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        const query = args.deleteAll ? {} : { _id: { $in: args.ids } };
        const leadsCount = await Lead.countDocuments(query);
        if (!leadsCount) throw new Error("No leads found");
        try {
          await Lead.deleteMany(query);
          return {
            message: `${
              args.deleteAll
                ? "All leads deleted successfully"
                : " Delete seleted ids successfully "
            }`,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Error deleting leads");
        }
      },
    },

    updateLead: {
      type: LeadType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        description: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneStatus: { type: GraphQLString },
        emailInvalid: { type: GraphQLString },
        GloballyOptedOutOfBuyerAgentEmail: { type: GraphQLString },
        GloballyOptedOutOfListingAgentEmail: { type: GraphQLString },
        GloballyOptedOutOfLenderEmail: { type: GraphQLString },
        GloballyOptedOutOfAlerts: { type: GraphQLString },
        BuyerAgent: { type: GraphQLString },
        ListingAgent: { type: GraphQLString },
        Lender: { type: GraphQLString },
        OriginalSource: { type: GraphQLString },
        ZipCode: { type: GraphQLString },
        State: { type: GraphQLString },
        City: { type: GraphQLString },
        Address: { type: GraphQLString },
        Birthday: { type: GraphQLString },
        HomeClosingDate: { type: GraphQLString },
        tagsList: { type: GraphQLList(GraphQLString) },
        categoriesList: { type: GraphQLList(GraphQLString) },
        leadId: { type: GraphQLString },

        // Add additional fields to update here
      },
      async resolve(parent, { id, ...params }) {
        try {
          let update = await Lead.findOneAndUpdate({ _id: id }, { ...params }, { new: true });
          return update;
        } catch (error) {
          console.error(error);
          throw new Error(`Error updating lead with ID ${id}`);
        }
      },
    },

    sendEmails: {
      type: new GraphQLList(EmailType),
      args: {
        emails: {
          type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString))),
        },
        subject: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const transporter = nodemailer.createTransport({
          host: "smtp.porkbun.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        // Loop through the list of email addresses and send the email
        const emails = [];
        for (let i = 0; i < args.emails.length; i++) {
          const mailOptions = {
            from: process.env.EMAIL,
            to: args.emails[i],
            subject: args.subject,
            text: args.body,
            html: `<p>${args.body}</p>`,
          };

          const info = await transporter.sendMail(mailOptions);
          const email = {
            id: info.messageId,
            to: args.emails[i],
            subject: args.subject,
            body: args.body,
          };
          emails.push(email);
        }

        return emails;
      },
    },

    //Delete a client

    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parents, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },

    //Add project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "Not Started" },
              completed: { value: "Not Started" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    //Add Call
    addCall: {
      type: GraphQLNonNull(GraphQLString),
      args: {
        calls: { type: GraphQLNonNull(GraphQLString) },
      },

      async resolve(parent, { calls }) {
        try {
          calls = JSON.parse(calls);
          //create async map function for args
          const result = await calls.map(async (arg) => {
            const lead = await Lead.findOne({
              firstName: arg.FirstName,
              lastName: arg.LastName,
            });
            if (!lead || !lead.firstName) return;
            if (lead) {
              const newCall = new Call({
                contactId: arg.contactId || "",
                FirstName: arg.FirstName || "",
                LastName: arg.LastName || "",
                DateCreated: arg.DateCreated || "",
                BuyerAgent: arg.BuyerAgent || "",
                ListingAgent: arg.ListingAgent || "",
                UserID: arg.UserID || "",
                AssociatedopportunityID: arg.AssociatedopportunityID || "",
                CallDetails: arg.CallDetails || "",
                ContactPhoneID: arg.ContactPhoneID || "",
                LogType: arg.LogType || "",
                MediaURL: arg.MediaURL || "",
                CallStartTime: arg.CallStartTime || "",
                CallEndTime: arg.CallEndTime || "",
                leadId: lead._id,
              });
              const response = await newCall.save();
              return response;
            }
          });
          Promise.all(result);
          return "Calls added successfully";
        } catch (error) {
          console.log(error);
        }
      },
    },
    //Add EAlert
    addEAlert: {
      type: GraphQLNonNull(GraphQLString),
      args: {
        alerts: { type: GraphQLNonNull(GraphQLString) },
      },

      async resolve(parent, { alerts }) {
        try {
          alerts = JSON.parse(alerts);
          //create async map function for args
          const result = await alerts.map(async (arg) => {
            const lead = await Lead.findOne({
              firstName: arg.FirstName,
              lastName: arg.LastName,
            });
            if (!lead || !lead.firstName) return;
            if (lead) {
              const newEAlert = new EAlert({
                contactId: arg.contactId || "",
                FirstName: arg.FirstName || "",
                LastName: arg.LastName || "",
                SearchName: arg.SearchName || "",
                QueryString: arg.QueryString || "",
                EmailFrequency: arg.EmailFrequency || "",
                BuyerAgent: arg.BuyerAgent || "",
                ListingAgent: arg.ListingAgent || "",
                leadId: lead._id,
              });
              const response = await newEAlert.save();
              return response;
            }
          });
          Promise.all(result);
          return "Calls eAlerts successfully";
        } catch (error) {
          console.log(error);
        }
      },
    },
    //Add Note
    addNote: {
      type: GraphQLNonNull(GraphQLString),
      args: {
        notes: { type: GraphQLNonNull(GraphQLString) },
      },

      async resolve(parent, { notes }) {
        try {
          notes = JSON.parse(notes);
          //create async map function for args
          const result = await notes.map(async (arg) => {
            const lead = await Lead.findOne({
              firstName: arg.FirstName,
              lastName: arg.LastName,
            });
            if (!lead || !lead.firstName) return;
            if (lead) {
              const newNote = new Note({
                contactId: arg.contactId || "",
                FirstName: lead.firstName || "",
                LastName: lead.lastName || "",
                Notes: arg.Notes || "",
                BuyerAgent: arg.BuyerAgent || "",
                ListingAgent: arg.ListingAgent || "",
                leadId: lead._id,
              });
              return await newNote.save();
            }
          });
          Promise.all(result);
          return "Notes added successfully";
        } catch (error) {
          console.log(error);
        }
      },
    },
    // task mutation to add tasks to the database
    addTask: {
      type: TaskTypes,
      args: {
        title: { type: GraphQLString },
        note: { type: GraphQLString },
        date: { type: GraphQLString },
        type: { type: GraphQLString },
        userId: { type: GraphQLID },
        leadId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const dateUp = args?.date?.split("T")[0];
        const timeUp = args?.date?.split("T")[1];

        // add tasktype to the database if it doesn't exist already for the user that is logged in

        // use when user is logged in
        // const taskType = await TaskType.findOne({ name: args.type, user: args.userId });

        const taskType = await TaskType.findOne({ name: args.type });
        if (!taskType) {
          const newTaskType = new TaskType({
            name: args.type,
            user: args.userId,
          });
          await newTaskType.save();
        }
        const result = await Task.create({
          title: args.title,
          note: args.note,
          date: new Date(dateUp).toLocaleDateString(),
          time: timeUp,
          type: args.type,
          user: args.userId ? args.userId : null,
          lead: args.leadId ? args.leadId : null,
        });
        return result;
      },
    },
    // task mutation to update tasks in the database
    updateTask: {
      type: TaskTypes,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        note: { type: GraphQLString },
        date: { type: GraphQLString },
        type: { type: GraphQLString },
        userId: { type: GraphQLID },
        leadId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const dateUp = args?.date?.split("T")[0];
        const timeUp = args?.date?.split("T")[1];
        const taskType = await TaskType.findOne({ name: args.type });
        if (!taskType) {
          const newTaskType = new TaskType({
            name: args.type,
            user: args.userId,
          });
          await newTaskType.save();
        }
        const result = await Task.findByIdAndUpdate(
          args.id,
          {
            title: args.title,
            note: args.note,
            date: new Date(args.date),
            date: new Date(dateUp).toLocaleDateString(),
            time: timeUp,
            user: args.userId ? args.userId : null,
            lead: args.leadId ? args.leadId : null,
          },
          { new: true }
        );
        return result;
      },
    },

    // delete task mutation
    deleteTask: {
      type: TaskTypes,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const result = await Task.findByIdAndDelete(args.id);
        return result;
      },
    },

    //Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },

    //Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
