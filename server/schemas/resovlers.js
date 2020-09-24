//Dependencies
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, { user }) => {
      // user is destructured out of context
      if (user) {
        //get user data into a variable removes password
        const data = await User.findOne({ _id: user._id }).select(
          "-__ -password"
        );
        return data;
      }
      throw new AuthenticationError("Login Please!");
    },
  },

  Mutation: {
    //Mutation for login takes parent {email, password} are destructured out of args
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // true/false variable if password is correct
      const correctPw = await user.isCorrectPassword(password);
      const token = signToken(user);

      //if user does not exist throws an error
      if (!user) {
        throw new AuthenticationError("Wrong Username or Password!");
      }
      //if password is incorrect throws an error
      if (!correctPw) {
        throw new AuthenticationError("Wrong Username or Password");
      }
      return { user, token };
    },
  },
};
