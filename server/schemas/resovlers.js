//Dependencies
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id }).select(
          "-__ -password"
        );
        return data;
      }
      throw new AuthenticationError("Login Please!");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      const correctPw = await user.isCorrectPassword(password);
      const token = signToken(user);

      if (!user) {
        throw new AuthenticationError("Wrong Username or Password!");
      }
      if (!correctPw) {
        throw new AuthenticationError("Wrong Username or Password");
      }
      return { user, token };
    },
  },
};
