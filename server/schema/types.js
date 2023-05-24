// write graphql types for schema here

const graphql = require("graphql");
const User = require("../models/User");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

const TaskTypes = new GraphQLObjectType({
  name: "Reminder",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    note: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    user: {
      type: UserTypeUp,
      resolve(parent, args) {
        return User.findById(parent.user);
      },
    },
  }),
});

//User Type
const UserTypeUp = new GraphQLObjectType({
  name: "UserUp",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    verificationToken: { type: GraphQLBoolean },
    emailVerified: { type: GraphQLBoolean },
  }),
});

module.exports = TaskTypes;
