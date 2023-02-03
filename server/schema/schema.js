 //Dependencies
  const Project = require('../models/Project');
  const Client = require('../models/Client');
  const nodemailer = require('nodemailer');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const Lead = require('../models/Lead');
 const { 

            GraphQLObjectType,
            GraphQLID,
            GraphQLString,
            GraphQLSchema,
            GraphQLList,
            GraphQLInputObjectType,
            GraphQLNonNull,
            GraphQLEnumType,
            GraphQLBoolean
            
        } = require('graphql');
const User = require('../models/User');




// === GRAPHQL TYPES ========================================


//User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id:{ type: GraphQLID},
        email:{ type: GraphQLString},
        password :{ type: GraphQLString},
        verificationToken:{ type:  GraphQLBoolean},
        emailVerified:{ type: GraphQLBoolean},
        // passwordResetToken : { type: GraphQLString },
        // passwordResetExpires : { type: GraphQLString },
        // tokens : { type: GraphQLString },
        // profile : { type: GraphQLString },
        // role : { type: GraphQLString },
        // createdAt : { type:GraphQLString },
        // updatedAt : { type: GraphQLString },
    })
});

// Project Type
 const ProjectType = new GraphQLObjectType({

    name: 'Project',
    fields: () => ({
        id:{ type: GraphQLID}, 
        name:{ type: GraphQLString}, 
        description:{ type: GraphQLString}, 
        status:{ type: GraphQLString}, 
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId);
            
            }
        }

       
    })
 });

 // Client Type
 const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id:{ type: GraphQLID}, 
        name:{ type: GraphQLString}, 
        email:{ type: GraphQLString}, 
        phone:{ type: GraphQLString}, 
       
    })
 });

// Lead Type
const LeadType = new GraphQLObjectType({
    name: 'Lead',
    fields: () => ({
        id:{ type: GraphQLID}, 
        firstName:{ type: GraphQLString}, 
        lastName:{ type: GraphQLString}, 
        description:{ type: GraphQLString}, 
        email:{ type: GraphQLString}, 
        phone:{ type: GraphQLString}, 
        phoneStatus:{ type: GraphQLString}, 
        emailInvalid:{ type: GraphQLString}, 
        GloballyOptedOutOfEmail:{ type: GraphQLString}, 
        GloballyOptedOutOfBuyerAgentEmail:{ type: GraphQLString}, 
        GloballyOptedOutOfListingAgentEmail:{ type: GraphQLString}, 
        GloballyOptedOutOfLenderEmail:{ type: GraphQLString}, 
        GloballyOptedOutOfAlerts:{ type: GraphQLString}, 
        OptInDate:{ type: GraphQLString}, 
        BuyerAgentCategory:{ type: GraphQLString}, 
        ListingAgentCategory:{ type: GraphQLString}, 
        LenderCategory:{ type: GraphQLString}, 
        BuyerAgent:{ type: GraphQLString}, 
        ListingAgent:{ type: GraphQLString}, 
        Lender:{ type: GraphQLString}, 
        OriginalSource:{ type: GraphQLString}, 
        OrignialCampaign:{ type: GraphQLString}, 
        LastAgentNote:{ type: GraphQLString}, 
        eAlerts:{ type: GraphQLString}, 
        VisitTotal:{ type: GraphQLString}, 
        listingviewcount:{ type: GraphQLString}, 
        AvgListingPrice:{ type: GraphQLString}, 
        NextCallDue:{ type: GraphQLString}, 
        LastAgentCallDate:{ type: GraphQLString}, 
        LastLenderCallDate:{ type: GraphQLString}, 
        FirstVisitDate:{ type: GraphQLString}, 
        LastVisitdate:{ type: GraphQLString}, 
        RegisterDate:{ type: GraphQLString}, 
        LeadType:{ type: GraphQLString}, 
        AgentSelected:{ type: GraphQLString}, 
        LenderOptIn:{ type: GraphQLString}, 
        Address:{ type: GraphQLString}, 
        City:{ type: GraphQLString}, 
        State:{ type: GraphQLString},
        ZipCode:{ type: GraphQLString},
        Tags:{ type: GraphQLString},
        Link:{ type: GraphQLString},
        Birthday:{ type: GraphQLString},
        HomeClosingDate:{ type: GraphQLString}, 
       

    })
 });


 //Graphql Input Types: 

 // Queries
 const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);

            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find();
            }
        },
    
    
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }

        },

        project: {
            type: ProjectType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return Project.findById(args.id);
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }

        },

        client: {
            type: ClientType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return Client.findById(args.id);
            }
        },
        leads:{
            type: new GraphQLList(LeadType), 
            resolve(parent, args){
                return Lead.find();
            } 
        },

        lead: {
            type: LeadType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return Lead.findById(args.id);
            }
        }
    }
 })


// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        //Email Verification Register User
        registerUser:{
            type: UserType,
            args:{
                email:{ type: GraphQLNonNull(GraphQLString) },
                password :{ type: GraphQLNonNull(GraphQLString) },
               
            
            },
            async resolve(parent, args) {
              

                const existingUser = await User.findOne({ email: args.email });

                if(existingUser){
                    throw new Error('User already exists');
                }
                if(args.password.length < 6){
                    throw new Error('Password must be at least 6 characters');
                }
                
                
                const hashedPassword = await bcrypt.hash(args.password, 10);

                console.log( args.password)
                console.log(hashedPassword)
                const unhashedPassword = await bcrypt.compare(args.password, hashedPassword);
                console.log(unhashedPassword)

                //CREATE UNIQUE JSON WEB TOKEN FOR USER TO VERIFY EMAIL
                const user = new User({
                    email : args.email,
                    password : hashedPassword,
                });

                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

            
                //USE NODEMAILER TO SEND EMAIL WITH TOKEN TO USER

                const transporter = nodemailer.createTransport({
                    host: 	"smtp.porkbun.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
                const mailOptions = {   

                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Account Verification Token',
                    text: 'Hello,\n\n' + 'Please verify your account by clicking the link:' + process.env.BASE_URL +'\/VerifyEmail\/'+ '.\n',
                    html: 'Hello,<br><br>' + 'Please verify your account by clicking the link: <a href="' + process.env.BASE_URL +'\/VerifyEmail\/' + token + '">here</a>.<br>'
                   // html: 'Hello,<br><br>' + 'Please verify your account by clicking the link: <a href="' + process.env.BASE_URL +'\/verify\/' + '">here</a>.<br>'
               
                };


                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) { 
                        console.log(err)
                    }else{
                        console.log('A verification email has been sent to ' + user.email + '.');
                    }
                   
                }); 

                return user.save();
            }},


            //Verify Email
            verifyEmail:{
                type: UserType,
                args:{
                    token: { type: GraphQLNonNull(GraphQLString) },
                },
                async resolve(parent, args) {

                  if (!args.token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
ß
                  try{
                    //VERIFY EMAIL BY DECODING ITS JWT TOKEN
                    const decoded = jwt.verify(args.token, process.env.TOKEN_SECRET);
                    const user = await User.findOne({ _id: decoded._id, emailVerificationToken: args.token });
                    if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                    if (user.emailVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

                    user.emailVerified = true;
                    user.emailVerificationToken = undefined;
                    await user.save();
                    res.status(200).send("The account has been verified. Please log in.");
                  }catch(err){
                    res.status(500).send({ msg: err.message });
                  }

                }},

        // Add a client
//Login User

        loginUser:{
            type: UserType,
            args:{
                email:{ type: GraphQLNonNull(GraphQLString) },
                password :{ type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // Find the user with the provided email
                return User.findOne({ email: args.email })
                  .then(user => {
                    // If the user does not exist, return an error
                    if (!user) {
                      throw new Error('No user found with that email');
                    }
              
                    // Compare the provided password to the hashed password stored in the database
                    return bcrypt.compare(args.password, user.password)
                      .then(isMatch => {
                        // If the password is incorrect, return an error
                        if (!isMatch) {
                          throw new Error('Incorrect password');
                        }
              
                        // Generate a JWT for the user
                        const jwt = jwt.sign({
                          id: user.id,
                          email: user.email
                        }, secret, { expiresIn: '1h' });
              
                        // Return the user and JWT
                        return {
                          user,
                          jwt
                        };
                      });
                  });
              }
              
        }
        ,

        addClient:{
            type: ClientType,
            args:{
                name: {    type: GraphQLNonNull(GraphQLString) },
                email:{   type: GraphQLNonNull(GraphQLString)  },
                phone:{   type: GraphQLNonNull(GraphQLString)  },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email : args.email, 
                    phone: args.phone
                });
                return client.save();

                //Client.create(//fields) //could do it this way as well
            }
        },
        //addLead
        addLead: {
            type: LeadType,
            args:{
                
                firstName:{ type: GraphQLNonNull(GraphQLString)}, 
                email:{ type:GraphQLNonNull(GraphQLString) }, 
                lastName:{ type: GraphQLString}, 
                description:{ type: GraphQLString}, 
                phone:{ type: GraphQLString}, 
                phoneStatus:{ type: GraphQLString}, 
                emailInvalid:{ type: GraphQLString}, 
                GloballyOptedOutOfEmail:{ type: GraphQLString}, 
                GloballyOptedOutOfBuyerAgentEmail:{ type: GraphQLString}, 
                GloballyOptedOutOfListingAgentEmail:{ type: GraphQLString}, 
                GloballyOptedOutOfLenderEmail:{ type: GraphQLString}, 
                GloballyOptedOutOfAlerts:{ type: GraphQLString}, 
                OptInDate:{ type: GraphQLString}, 
                BuyerAgentCategory:{ type: GraphQLString}, 
                ListingAgentCategory:{ type: GraphQLString}, 
                LenderCategory:{ type: GraphQLString}, 
                BuyerAgent:{ type: GraphQLString}, 
                ListingAgent:{ type: GraphQLString}, 
                Lender:{ type: GraphQLString}, 
                OriginalSource:{ type: GraphQLString}, 
                OrignialCampaign:{ type: GraphQLString}, 
                LastAgentNote:{ type: GraphQLString}, 
                eAlerts:{ type: GraphQLString}, 
                VisitTotal:{ type: GraphQLString}, 
                listingviewcount:{ type: GraphQLString}, 
                AvgListingPrice:{ type: GraphQLString}, 
                NextCallDue:{ type: GraphQLString}, 
                LastAgentCallDate:{ type: GraphQLString}, 
                LastLenderCallDate:{ type: GraphQLString}, 
                FirstVisitDate:{ type: GraphQLString}, 
                LastVisitdate:{ type: GraphQLString}, 
                RegisterDate:{ type: GraphQLString}, 
                LeadType:{ type: GraphQLString}, 
                AgentSelected:{ type: GraphQLString}, 
                LenderOptIn:{ type: GraphQLString}, 
                Address:{ type: GraphQLString}, 
                City:{ type: GraphQLString}, 
                State:{ type: GraphQLString},
                ZipCode:{ type: GraphQLString},
                Tags:{ type: GraphQLString},
                Link:{ type: GraphQLString},
                Birthday:{ type: GraphQLString},
                HomeClosingDate:{ type: GraphQLString}, 
            
            },
            resolve(parent, args) {
                const lead = new Lead({
                    firstName: args.firstName,
                    email : args.email, 
                    // phone: args.phone
                });
                return lead.save();

                //Client.create(//fields) //could do it this way as well
            }},      

        //Delete a client

        deleteClient:{
            type: ClientType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID) }
            },
            resolve(parents, args){
                return Client.findByIdAndRemove(args.id)
            }

        },

        //Add project
        addProject:{
            type: ProjectType,
            args:{
                name: { type: GraphQLNonNull(GraphQLString)},
                description: { type: GraphQLNonNull(GraphQLString)}, 
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values:{
                            'new': {value :'Not Started'},
                            'progress': {value :'Not Started'}, 
                            'completed': {value :'Not Started'},  
                        }
                    }),
                    defaultValue:'Not Started',

                },  
                clientId: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                const project = new Project({
                    name: args.name,
                    description:args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            },
        },
        //Delete a project
        deleteProject:{
           type: ProjectType,
           args: {
            id: {type : GraphQLNonNull(GraphQLID)},
           } ,
           resolve(parent, args){
            return Project.findByIdAndRemove(args.id)
           }

        },
        //Update a project
        updateProject:{ 
            type: ProjectType,
             args:{ 
                id:{ type: GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString }, 
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name:'ProjectStatusUpdate',
                        values:{
                            new: { value: 'Not Started'},
                            progress: {value:  'In Progress'},
                            completed: {value: 'Completed'},
                        }
                    }),
                }
             },
             resolve(parent, args){
                return  Project.findByIdAndUpdate( args.id,{ 
                    $set:{ 
                        name: args.name,
                        description: args.description,
                        status: args.status,

                           },
                           },
                         {new: true}
                         );
                     }
                    }
                  }


                });


 module.exports = new GraphQLSchema({ 
    query: RootQuery,
    mutation
 })











