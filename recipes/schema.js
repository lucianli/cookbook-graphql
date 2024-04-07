const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Recipe {
        _id: ID
        title: String!
        authorId: ID!
        ingredients: [String!]!
        instructions: [String!]!
        imageUrl: String
        difficulty: Int!
        cuisine: String!
        cookingTime: Int!
        dateCreated: String!
        dateModified: String!
    }

    type User {
        _id: ID
        email: String!
        username: String!
        password: String!
        publishedRecipes: [ID!]
        savedRecipes: [ID!]
    }

    input RecipeInput {
        _id: ID
        title: String
        authorId: ID
        ingredients: [String!]
        instructions: [String!]
        imageUrl: String
        difficulty: Int
        cuisine: String
        cookingTime: Int
        dateCreated: String
        dateModified: String
    }

    input UserInput {
        _id: ID
        email: String
        username: String
        password: String
        publishedRecipes: [ID!]
        savedRecipes: [ID!]
    }

    type Query {
        allRecipes: [Recipe],
        recipe(id: ID!): Recipe,
        userPublishedRecipes(userId: ID!): [Recipe],
        userSavedRecipes(userId: ID!): [Recipe],
        recipesByDifficulty(difficultyLevel: Int!): [Recipe],
        recipesByCuisine(cuisineType: String!): [Recipe],
        recipesByCookingTime(cookingTime: Int!): [Recipe],
        user(username: String!, password: String!): User
    }

    type Mutation {
        addRecipe(recipeToAdd: RecipeInput!): Recipe,
        editRecipeStringAttr(id: ID!, attributeName: String!, attributeValue: String!): Recipe,
        editRecipeNumAttr(id: ID!, attributeName: String!, attributeValue: Int!): Recipe,
        editRecipeListAttr(id: ID!, attributeName: String!, attributeValue: [String!]!): Recipe,
        saveRecipe(userId: ID!, recipeId: ID!): User,
        deleteRecipe(id: ID!): Recipe,
        addUser(userToAdd: UserInput!): User,
        editUser(id: ID!, attributeName: String!, attributeValue: String!): User,
        deleteUser(email: String!, username: String!, password: String!): User
    }
`;

module.exports = typeDefs;