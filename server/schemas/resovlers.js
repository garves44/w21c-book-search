//Dependencies
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

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

    //addUser takes parents and args
    addUser: async (parent, args) => {
      //create a user with what ever args are passed
      const user = await User.create(args);
      //sign the token with the user info
      const token = signToken(user);

      return { user, token };
    },

    //saveBook takes parent, {input} destructured from args, {user} destructured from context
    saveBook: async (parent, { input }, { user }) => {
      //if logged in will update the saved books for the user
      if (user) {
        const saveUserBooks = await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { savedBooks: input } },
          { new: true, runValidators: true }
        );
        return saveUserBooks;
      }
      throw new AuthenticationError("Login Please");
    },

    //removeBook takes parent, {bookId} destructured from args, {user} destructured from context
    removeBook: async (parent, { bookId }, { user }) => {
      //if logged in will remove book from saved list of books for user
      const saveUserBooks = await User.findByIdAndDelete(
        { _id: user._id },
        {
          $pull: { savedBooks: { bookId: bookId } },
        },
        { new: true }
      );
      return saveUserBooks;
    },
  },
};

module.exports = resolvers;
