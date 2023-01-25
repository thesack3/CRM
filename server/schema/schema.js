 //Mongoose models
  const Project = require('../models/Project');
  const Client = require('../models/Client');

 const { 
     GraphQLObjectType,
     GraphQLID,
     GraphQLString,
     GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLEnumType} = require('graphql');

//Project  Type
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

 //Client Type

 const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id:{ type: GraphQLID}, 
        name:{ type: GraphQLString}, 
        email:{ type: GraphQLString}, 
        phone:{ type: GraphQLString}, 
       
    })
 });

//Lead Type

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


 //Queries

 const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
            type: LeadType, 
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return Lead.find();
            } },
        lead: {
            type: LeadType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return Lead.findById(args.id);
            }
        }
    }
 })



const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        // Add a client
        addClient:{
            type: ClientType,
            args:{
                name:{    type: GraphQLNonNull(GraphQLString) },
                email:{   type: GraphQLNonNull(GraphQLString) },
                phone:{   type: GraphQLNonNull(GraphQLString) },
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
                lastName:{ type: GraphQLNonNull(GraphQLString)}, 
                description:{ type: GraphQLNonNull(GraphQLString)}, 
                email:{ type: GraphQLNonNull(GraphQLString)}, 
                phone:{ type: GraphQLNonNull(GraphQLString)}, 
                phoneStatus:{ type: GraphQLNonNull(GraphQLString)}, 
                emailInvalid:{ type: GraphQLNonNull(GraphQLString)}, 
                GloballyOptedOutOfEmail:{ type: GraphQLNonNull(GraphQLString)}, 
                GloballyOptedOutOfBuyerAgentEmail:{ type: GraphQLNonNull(GraphQLString)}, 
                GloballyOptedOutOfListingAgentEmail:{ type: GraphQLNonNull(GraphQLString)}, 
                GloballyOptedOutOfLenderEmail:{ type: GraphQLNonNull(GraphQLString)}, 
                GloballyOptedOutOfAlerts:{ type: GraphQLNonNull(GraphQLString)}, 
                OptInDate:{ type: GraphQLNonNull(GraphQLString)}, 
                BuyerAgentCategory:{ type: GraphQLNonNull(GraphQLString)}, 
                ListingAgentCategory:{ type: GraphQLNonNull(GraphQLString)}, 
                LenderCategory:{ type: GraphQLNonNull(GraphQLString)}, 
                BuyerAgent:{ type: GraphQLNonNull(GraphQLString)}, 
                ListingAgent:{ type: GraphQLNonNull(GraphQLString)}, 
                Lender:{ type: GraphQLNonNull(GraphQLString)}, 
                OriginalSource:{ type: GraphQLNonNull(GraphQLString)}, 
                OrignialCampaign:{ type: GraphQLNonNull(GraphQLString)}, 
                LastAgentNote:{ type: GraphQLNonNull(GraphQLString)}, 
                eAlerts:{ type: GraphQLNonNull(GraphQLString)}, 
                VisitTotal:{ type: GraphQLNonNull(GraphQLString)}, 
                listingviewcount:{ type: GraphQLNonNull(GraphQLString)}, 
                AvgListingPrice:{ type: GraphQLNonNull(GraphQLString)}, 
                NextCallDue:{ type: GraphQLNonNull(GraphQLString)}, 
                LastAgentCallDate:{ type: GraphQLNonNull(GraphQLString)}, 
                LastLenderCallDate:{ type: GraphQLNonNull(GraphQLString)}, 
                FirstVisitDate:{ type: GraphQLNonNull(GraphQLString)}, 
                LastVisitdate:{ type: GraphQLNonNull(GraphQLString)}, 
                RegisterDate:{ type: GraphQLNonNull(GraphQLString)}, 
                LeadType:{ type: GraphQLNonNull(GraphQLString)}, 
                AgentSelected:{ type: GraphQLNonNull(GraphQLString)}, 
                LenderOptIn:{ type: GraphQLNonNull(GraphQLString)}, 
                Address:{ type: GraphQLNonNull(GraphQLString)}, 
                City:{ type: GraphQLNonNull(GraphQLString)}, 
                State:{ type: GraphQLNonNull(GraphQLString)},
                ZipCode:{ type: GraphQLNonNull(GraphQLString)},
                Tags:{ type: GraphQLNonNull(GraphQLString)},
                Link:{ type: GraphQLNonNull(GraphQLString)},
                Birthday:{ type: GraphQLNonNull(GraphQLString)},
                HomeClosingDate:{ type: GraphQLNonNull(GraphQLString)}, 
            
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email : args.email, 
                    phone: args.phone
                });
                return client.save();

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