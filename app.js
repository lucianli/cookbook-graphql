const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./recipes/schema.js');
const resolvers = require('./recipes/resolvers.js');
const uri = require('./constants.js');
const app = express();

// Create an Apollo server
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});

async function startServer() {
    await server.start();

    // Apply the Apollo middleware to the Express app
    server.applyMiddleware({ app });

    // Start the Express server
    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

// Connect to MongoDB
mongoose.connect(uri, { dbName: 'cookbook-db' })
.then(() => {
    console.log('Connected to MongoDB');
    startServer();
})
.catch(err => console.error('Error connecting to MongoDB:', err));