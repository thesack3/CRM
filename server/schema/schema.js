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
} = require("graphql");
const User = require("../models/User");
const Note = require("../models/Note");
const Tag = require("../models/Tag");
const Category = require("../models/Category");
const EAlert = require("../models/EAlert");
const Call = require("../models/Call");
const Text = require("../models/Text");

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
      type: new GraphQLList(LeadType),
      args: { skip: { type: GraphQLString }, take: { type: GraphQLString } },
      resolve(parent, args) {
        return Lead.find()
          .limit(Number(args?.take || ""))
          .skip(Number(args?.skip))
          .sort({ createdAt: "desc" })
          .exec();
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
        const accountSid = "ACc1d129072adcdd2b82563d7c50f996ce";
        const authToken = "0a8da2b96fc12fa62f5b4f510197b9bc";

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
        const accountSid = "ACc1d129072adcdd2b82563d7c50f996ce";
        const authToken = "0a8da2b96fc12fa62f5b4f510197b9bc";

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

        console.log(args.password);
        console.log(hashedPassword);
        const unhashedPassword = await bcrypt.compare(args.password, hashedPassword);
        console.log(unhashedPassword);

        //CREATE UNIQUE JSON WEB TOKEN FOR USER TO VERIFY EMAIL
        const user = new User({
          email: args.email,
          password: hashedPassword,
        });

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        //USE NODEMAILER TO SEND EMAIL WITH TOKEN TO USER

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
    //Verify Email
    verifyEmail: {
      type: UserType,
      args: {
        token: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          //VERIFY EMAIL BY DECODING ITS JWT TOKEN
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
          await user.save();
          return {
            success: true,
            message: "The account has been verified. Please log in.",
            user: {
              id: user.id,
              email: user.email,
              emailVerified: true,
            },
          };
        } catch (err) {
          return {
            success: false,
            message: err.message,
            user: null,
          };
        }
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
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // Find the user with the provided email
        return User.findOne({ email: args.email }).then((user) => {
          // If the user does not exist, return an error
          if (!user) {
            throw new Error("No user found with that email");
          }

          // Compare the provided password to the hashed password stored in the database
          return bcrypt.compare(args.password, user.password).then((isMatch) => {
            // If the password is incorrect, return an error
            if (!isMatch) {
              throw new Error("Incorrect password");
            }

            // Generate a JWT for the user
            const jwt = jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              secret,
              { expiresIn: "1h" }
            );

            // Return the user and JWT
            return {
              user,
              jwt,
            };
          });
        });
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

    updateLead: {
      type: LeadType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        lastName: { type: GraphQLString },
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

      // type: CallType,
      // args: {
      //   contactId: { type: GraphQLNonNull(GraphQLString) },
      //   FirstName: { type: GraphQLNonNull(GraphQLString) },
      //   LastName: { type: GraphQLNonNull(GraphQLString) },
      //   DateCreated: { type: GraphQLNonNull(GraphQLString) },
      //   BuyerAgent: { type: GraphQLNonNull(GraphQLString) },
      //   ListingAgent: { type: GraphQLNonNull(GraphQLString) },
      //   UserID: { type: GraphQLNonNull(GraphQLString) },
      //   AssociatedopportunityID: { type: GraphQLNonNull(GraphQLString) },
      //   CallDetails: { type: GraphQLNonNull(GraphQLString) },
      //   ContactPhoneID: { type: GraphQLNonNull(GraphQLString) },
      //   LogType: { type: GraphQLNonNull(GraphQLString) },
      //   MediaURL: { type: GraphQLNonNull(GraphQLString) },
      //   CallStartTime: { type: GraphQLNonNull(GraphQLString) },
      //   CallEndTime: { type: GraphQLNonNull(GraphQLString) },
      //   leadId: { type: GraphQLNonNull(GraphQLID) },
      // },
      // resolve(parent, args) {
      //   const NEWCall = new Call({
      //     contactId: args.contactId,
      //     FirstName: args.FirstName,
      //     LastName: args.LastName,
      //     DateCreated: args.DateCreated,
      //     BuyerAgent: args.BuyerAgent,
      //     ListingAgent: args.ListingAgent,
      //     UserID: args.UserID,
      //     AssociatedopportunityID: args.AssociatedopportunityID,
      //     CallDetails: args.CallDetails,
      //     ContactPhoneID: args.ContactPhoneID,
      //     LogType: args.LogType,
      //     MediaURL: args.MediaURL,
      //     CallStartTime: args.CallStartTime,
      //     CallEndTime: args.CallEndTime,
      //     leadId: args.leadId,
      //   });
      //   return NEWCall.save();
      // },
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

      // type: EAlertType,
      // args: {
      //   contactId: { type: GraphQLNonNull(GraphQLString) },
      //   FirstName: { type: GraphQLNonNull(GraphQLString) },
      //   LastName: { type: GraphQLNonNull(GraphQLString) },
      //   SearchName: { type: GraphQLNonNull(GraphQLString) },
      //   QueryString: { type: GraphQLNonNull(GraphQLString) },
      //   EmailFrequency: { type: GraphQLNonNull(GraphQLString) },
      //   BuyerAgent: { type: GraphQLNonNull(GraphQLString) },
      //   ListingAgent: { type: GraphQLNonNull(GraphQLString) },
      //   leadId: { type: GraphQLNonNull(GraphQLID) },
      // },

      // resolve(parent, args) {
      //   const eAlert = new EAlert({
      //     contactId: args.contactId,
      //     FirstName: args.FirstName,
      //     LastName: args.LastName,
      //     SearchName: args.SearchName,
      //     QueryString: args.QueryString,
      //     EmailFrequency: args.EmailFrequency,
      //     BuyerAgent: args.BuyerAgent,
      //     ListingAgent: args.ListingAgent,
      //     leadId: args.leadId,
      //   });
      //   return eAlert.save();
      // },
    },
    //Add Note
    addNote: {
      type: GraphQLNonNull(GraphQLString),
      args: {
        notes: { type: GraphQLNonNull(GraphQLString) },
      },
      // args: {
      //   contactId: { type: GraphQLNonNull(GraphQLString) },
      //   FirstName: { type: GraphQLNonNull(GraphQLString) },
      //   LastName: { type: GraphQLNonNull(GraphQLString) },
      //   Notes: { type: GraphQLNonNull(GraphQLString) },
      //   BuyerAgent: { type: GraphQLNonNull(GraphQLString) },
      //   ListingAgent: { type: GraphQLNonNull(GraphQLString) },
      // },

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

        // const NewNote = new Note({
        //   contactId: args.contactId,
        //   FirstName: args.FirstName,
        //   LastName: args.LastName,
        //   Notes: args.Notes,
        //   BuyerAgent: args.BuyerAgent,
        //   ListingAgent: args.ListingAgent,
        //   leadId: args.leadId,
        // });
        // return NewNote.save();
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
