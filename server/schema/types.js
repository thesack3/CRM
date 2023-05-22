// write graphql types for schema here

const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ReminderType = new GraphQLObjectType({
  name: "Reminder",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    note: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    // user: {
    //   type: require("./UserType"),
    //   resolve(parent, args) {
    //     return User.findById(parent.user);
    //   },
    // },
  }),
});

module.exports = ReminderType;