// Dependencies
const { gql } = require("apollo-server-express");

//need User, Query, Book, Auth, Mutation, & savedBook
const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: String!): User
    removeBook(bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type savedBook {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }
`;

module.exports = typeDefs;
