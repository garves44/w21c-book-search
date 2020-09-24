//Dependencies
const express = require("express");
const path = require("path");
const db = require("./config/connection");
const app = express();

//ApolloServer Dependencies
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

// New ApolloServer with Schema and authMiddleware passed in
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const PORT = process.env.PORT || 3001;

//New ApolloServer with middleware
server.applyMiddleware({ app });
//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
//Wild Card Path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(
      `To use gql go to http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});
