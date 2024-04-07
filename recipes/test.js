import request from 'supertest';

const { ObjectId } = require('mongoose').Types;

const graphQLEndpoint = 'http://localhost:4000';

let userID1;
let userID2;
let recipeID1;
let recipeID2;

// Test suite for adding users
describe('Add users', () => {
    test('Adds user 1 and returns it', async () => {
        const postData = {
            query: `mutation AddUser1($userToAdd: UserInput!) {
                addUser(userToAdd: $userToAdd) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                userToAdd: {
                    email: "cook1@gmail.com",
                    password: "iamcook1",
                    publishedRecipes: [],
                    savedRecipes: [],
                    username: "cook1"
                }
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.addUser).toEqual({
            email: 'cook1@gmail.com',
            username: 'cook1',
            password: 'iamcook1',
            publishedRecipes: [],
            savedRecipes: []
        })
    })

    test('Adds user 2 and returns it', async () => {
        const postData = {
            query: `mutation AddUser2($userToAdd: UserInput!) {
                addUser(userToAdd: $userToAdd) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                userToAdd: {
                    email: "cook2@gmail.com",
                    password: "iamcook2",
                    publishedRecipes: [],
                    savedRecipes: [],
                    username: "cook2"
                }
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.addUser).toEqual({
            email: 'cook2@gmail.com',
            username: 'cook2',
            password: 'iamcook2',
            publishedRecipes: [],
            savedRecipes: []
        })
    })

    test('Attempts to add user 2 again', async () => {
        const postData = {
            query: `mutation AddUser2Again($userToAdd: UserInput!) {
                addUser(userToAdd: $userToAdd) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                userToAdd: {
                    email: "cook2@gmail.com",
                    password: "iamcook2",
                    publishedRecipes: [],
                    savedRecipes: [],
                    username: "cook2"
                }
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.errors[0].message).toBe('Username already exists')
    })
})

// Test suite for getting and editing users
describe('Gets and edit users', () => {
    test('Gets user 1 and returns it', async () => {
        const postData = {
            query: `query GetUser1($username: String!, $password: String!) {
                user(username: $username, password: $password) {
                    _id
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                username: "cook1",
                password: "iamcook1"
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)
        userID1 = res.data.user._id

        expect(res.data.user).toEqual({
            _id: userID1,
            email: 'cook1@gmail.com',
            password: 'iamcook1',
            publishedRecipes: [],
            savedRecipes: [],
            username: 'cook1'
        })
    })

    test('Gets user 2 and returns it', async () => {
        const postData = {
            query: `query GetUser1($username: String!, $password: String!) {
                user(username: $username, password: $password) {
                    _id
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                username: "cook2",
                password: "iamcook2"
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)
        userID2 = res.data.user._id

        expect(res.data.user).toEqual({
            _id: userID2,
            email: 'cook2@gmail.com',
            password: 'iamcook2',
            publishedRecipes: [],
            savedRecipes: [],
            username: 'cook2'
        })
    })

    test('Edits username of user 1 and returns it', async () => {
        const postData = {
            query: `mutation EditUsername1($id: ID!, $attributeName: String!, $attributeValue: String!) {
                editUser(id: $id, attributeName: $attributeName, attributeValue: $attributeValue) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                id: userID1,
                attributeName: "username",
                attributeValue: "cookone"
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.editUser).toEqual({
            email: 'cook1@gmail.com',
            password: 'iamcook1',
            publishedRecipes: [],
            savedRecipes: [],
            username: 'cookone'
        })
    })

    test('Edits password of user 2 and returns it', async () => {
        const postData = {
            query: `mutation EditPassword2($id: ID!, $attributeName: String!, $attributeValue: String!) {
                editUser(id: $id, attributeName: $attributeName, attributeValue: $attributeValue) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                id: userID2,
                attributeName: "password",
                attributeValue: "iamcooktwo"
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.editUser).toEqual({
            email: 'cook2@gmail.com',
            password: 'iamcooktwo',
            publishedRecipes: [],
            savedRecipes: [],
            username: 'cook2'
        })
    })

    test('Edits email of user 1 and returns it', async () => {
        const postData = {
            query: `mutation EditEmail1($id: ID!, $attributeName: String!, $attributeValue: String!) {
                editUser(id: $id, attributeName: $attributeName, attributeValue: $attributeValue) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                id: userID1,
                attributeName: "email",
                attributeValue: "iamcook1@gmail.com"
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.editUser).toEqual({
            email: 'iamcook1@gmail.com',
            password: 'iamcook1',
            publishedRecipes: [],
            savedRecipes: [],
            username: 'cookone'
        })
    })

    test('Attempts to edit non-existent user', async () => {
        const postData = {
            query: `mutation EditNonUser($id: ID!, $attributeName: String!, $attributeValue: String!) {
                editUser(id: $id, attributeName: $attributeName, attributeValue: $attributeValue) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                id: ObjectId.createFromBase64("SGVsbG8gV29ybGQh"),
                attributeName: "username",
                attributeValue: "user1"
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.errors[0].message).toBe('User not found')
    })
})

// Test suite for adding recipes
describe('Add recipes', () => {
    test('Adds recipe 1 and returns it', async () => {
        const postData = {
            query: `mutation AddRecipe($recipeToAdd: RecipeInput!) {
                addRecipe(recipeToAdd: $recipeToAdd) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                recipeToAdd: {
                    authorId: userID1,
                    cookingTime: 10,
                    cuisine: "Chinese",
                    dateCreated: "4/5/2024",
                    dateModified: "4/5/2024",
                    difficulty: 2,
                    imageUrl: null,
                    ingredients: ["2 eggs", "1 cup rice", "1 tsp soy sauce"],
                    instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
                    title: "Simple Fried Rice"
                }
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)
        recipeID1 = res.data.addRecipe._id

        expect(res.data.addRecipe).toEqual({
            _id: recipeID1,
            authorId: userID1,
            cookingTime: 10,
            cuisine: "Chinese",
            dateCreated: "4/5/2024",
            dateModified: "4/5/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 cup rice", "1 tsp soy sauce"],
            instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
            title: "Simple Fried Rice"
        })
    })

    test('Recipe 1 is in published recipes of user 1', async () => {
        const postData = {
            query: `query User1PublishedRecipes($userId: ID!) {
                userPublishedRecipes(userId: $userId) {
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                    _id
                }
            }`,
            variables: {
                userId: userID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.userPublishedRecipes).toEqual([{
            _id: recipeID1,
            authorId: userID1,
            cookingTime: 10,
            cuisine: "Chinese",
            dateCreated: "4/5/2024",
            dateModified: "4/5/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 cup rice", "1 tsp soy sauce"],
            instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
            title: "Simple Fried Rice"
        }])
    })

    test('Adds recipe 2 and returns it', async () => {
        const postData = {
            query: `mutation AddRecipe2($recipeToAdd: RecipeInput!) {
                addRecipe(recipeToAdd: $recipeToAdd) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                recipeToAdd: {
                    authorId: userID2,
                    cookingTime: 10,
                    cuisine: "American",
                    dateCreated: "4/4/2024",
                    dateModified: "4/4/2024",
                    difficulty: 2,
                    imageUrl: null,
                    ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
                    instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
                    title: "Avocado Toast"
                }
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)
        recipeID2 = res.data.addRecipe._id

        expect(res.data.addRecipe).toEqual({
            _id: recipeID2,
            authorId: userID2,
            cookingTime: 10,
            cuisine: "American",
            dateCreated: "4/4/2024",
            dateModified: "4/4/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
            instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
            title: "Avocado Toast"
        })
    })

    test('Recipe 2 is in published recipes of user 2', async () => {
        const postData = {
            query: `query User2PublishedRecipes($userId: ID!) {
                userPublishedRecipes(userId: $userId) {
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                    _id
                }
            }`,
            variables: {
                userId: userID2
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.userPublishedRecipes).toEqual([{
            _id: recipeID2,
            authorId: userID2,
            cookingTime: 10,
            cuisine: "American",
            dateCreated: "4/4/2024",
            dateModified: "4/4/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
            instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
            title: "Avocado Toast"
        }])
    })
})

// Test suite for saving and editing recipes
describe('Save and edit recipes', () => {
    test('User 1 saves recipe 1', async () => {
        const postData = {
            query: `mutation SaveRecipe1($userId: ID!, $recipeId: ID!) {
                saveRecipe(userId: $userId, recipeId: $recipeId) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                userId: userID1,
                recipeId: recipeID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.saveRecipe).toEqual({
            email: "iamcook1@gmail.com",
            password: "iamcook1",
            publishedRecipes: [recipeID1],
            savedRecipes: [recipeID1],
            username: "cookone"
        })
    })

    test('User 1 saves recipe 2', async () => {
        const postData = {
            query: `mutation SaveRecipe2($userId: ID!, $recipeId: ID!) {
                saveRecipe(userId: $userId, recipeId: $recipeId) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                userId: userID1,
                recipeId: recipeID2
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.saveRecipe).toEqual({
            email: "iamcook1@gmail.com",
            password: "iamcook1",
            publishedRecipes: [recipeID1],
            savedRecipes: [recipeID1, recipeID2],
            username: "cookone"
        })
    })

    test('Get saved recipes of user 1', async () => {
        const postData = {
            query: `query User1SavedRecipes($userId: ID!) {
                userSavedRecipes(userId: $userId) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                userId: userID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.userSavedRecipes).toEqual([
            {
                _id: recipeID1,
                authorId: userID1,
                cookingTime: 10,
                cuisine: "Chinese",
                dateCreated: "4/5/2024",
                dateModified: "4/5/2024",
                difficulty: 2,
                imageUrl: null,
                ingredients: ["2 eggs", "1 cup rice", "1 tsp soy sauce"],
                instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
                title: "Simple Fried Rice"
            },
            {
                _id: recipeID2,
                authorId: userID2,
                cookingTime: 10,
                cuisine: "American",
                dateCreated: "4/4/2024",
                dateModified: "4/4/2024",
                difficulty: 2,
                imageUrl: null,
                ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
                instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
                title: "Avocado Toast"
            }
        ])
    })

    test('Non-existent user saves recipe', async () => {
        const postData = {
            query: `mutation SaveRecipeNonUser($userId: ID!, $recipeId: ID!) {
                saveRecipe(userId: $userId, recipeId: $recipeId) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                userId: ObjectId.createFromBase64("SGVsbG8gV29ybGQh"),
                recipeId: recipeID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.errors[0].message).toEqual('User not found')
    })

    test('Edit recipe 1 string attribute', async () => {
        const postData = {
            query: `mutation EditRecipeStringAttr($editRecipeStringAttrId: ID!, $attributeName: String!, $attributeValue: String!) {
                editRecipeStringAttr(id: $editRecipeStringAttrId, attributeName: $attributeName, attributeValue: $attributeValue) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                editRecipeStringAttrId: recipeID1,
                attributeName: 'title',
                attributeValue: 'Simple Egg Fried Rice'
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.editRecipeStringAttr).toEqual({
            _id: recipeID1,
            authorId: userID1,
            cookingTime: 10,
            cuisine: "Chinese",
            dateCreated: "4/5/2024",
            dateModified: "4/5/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 cup rice", "1 tsp soy sauce"],
            instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
            title: "Simple Egg Fried Rice"
        })
    })

    test('Edit recipe 2 numerical attribute', async () => {
        const postData = {
            query: `mutation EditRecipeNumAttr($editRecipeNumAttrId: ID!, $attributeName: String!, $attributeValue: Int!) {
                editRecipeNumAttr(id: $editRecipeNumAttrId, attributeName: $attributeName, attributeValue: $attributeValue) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                editRecipeNumAttrId: recipeID2,
                attributeName: 'cookingTime',
                attributeValue: 8
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.editRecipeNumAttr).toEqual({
            _id: recipeID2,
            authorId: userID2,
            cookingTime: 8,
            cuisine: "American",
            dateCreated: "4/4/2024",
            dateModified: "4/4/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
            instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
            title: "Avocado Toast"
        })
    })

    test('Edit recipe 1 list attribute', async () => {
        const postData = {
            query: `mutation EditRecipeListAttr($editRecipeListAttrId: ID!, $attributeName: String!, $attributeValue: [String!]!) {
                editRecipeListAttr(id: $editRecipeListAttrId, attributeName: $attributeName, attributeValue: $attributeValue) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                editRecipeListAttrId: recipeID1,
                attributeName: 'ingredients',
                attributeValue: ["2 large eggs", "1 cup rice", "1 tsp soy sauce", "1 tsp neutral cooking oil"]
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.editRecipeListAttr).toEqual({
            _id: recipeID1,
            authorId: userID1,
            cookingTime: 10,
            cuisine: "Chinese",
            dateCreated: "4/5/2024",
            dateModified: "4/5/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 large eggs", "1 cup rice", "1 tsp soy sauce", "1 tsp neutral cooking oil"],
            instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
            title: "Simple Egg Fried Rice"
        })
    })
})

// Test suite for getting recipes
describe('Get recipes', () => {
    test('Gets all recipes', async () => {
        const postData = {
            query: `query AllRecipes {
                allRecipes {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.allRecipes).toEqual([
            {
                _id: recipeID1,
                authorId: userID1,
                cookingTime: 10,
                cuisine: "Chinese",
                dateCreated: "4/5/2024",
                dateModified: "4/5/2024",
                difficulty: 2,
                imageUrl: null,
                ingredients: ["2 large eggs", "1 cup rice", "1 tsp soy sauce", "1 tsp neutral cooking oil"],
                instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
                title: "Simple Egg Fried Rice"
            },
            {
                _id: recipeID2,
                authorId: userID2,
                cookingTime: 8,
                cuisine: "American",
                dateCreated: "4/4/2024",
                dateModified: "4/4/2024",
                difficulty: 2,
                imageUrl: null,
                ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
                instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
                title: "Avocado Toast"
            }
        ])
    })

    test('Gets recipe 1 by ID', async () => {
        const postData = {
            query: `query GetRecipe1($recipeId: ID!) {
                recipe(id: $recipeId) {
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                    _id
                }
            }`,
            variables: {
                recipeId: recipeID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.recipe).toEqual({
            _id: recipeID1,
            authorId: userID1,
            cookingTime: 10,
            cuisine: "Chinese",
            dateCreated: "4/5/2024",
            dateModified: "4/5/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 large eggs", "1 cup rice", "1 tsp soy sauce", "1 tsp neutral cooking oil"],
            instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
            title: "Simple Egg Fried Rice"
        })
    })

    test('Attempt to get nonexistent recipe by ID', async () => {
        const postData = {
            query: `query GetRecipe1($recipeId: ID!) {
                recipe(id: $recipeId) {
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                    _id
                }
            }`,
            variables: {
                recipeId: ObjectId.createFromBase64("SGVsbG8gV29ybGQh")
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.errors[0].message).toBe('Recipe not found')
    })

    test('Gets recipes by difficulty', async () => {
        const postData = {
            query: `query RecipesByDifficulty($difficultyLevel: Int!) {
                recipesByDifficulty(difficultyLevel: $difficultyLevel) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                difficultyLevel: 3
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.recipesByDifficulty).toEqual([
            {
                _id: recipeID1,
                authorId: userID1,
                cookingTime: 10,
                cuisine: "Chinese",
                dateCreated: "4/5/2024",
                dateModified: "4/5/2024",
                difficulty: 2,
                imageUrl: null,
                ingredients: ["2 large eggs", "1 cup rice", "1 tsp soy sauce", "1 tsp neutral cooking oil"],
                instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
                title: "Simple Egg Fried Rice"
            },
            {
                _id: recipeID2,
                authorId: userID2,
                cookingTime: 8,
                cuisine: "American",
                dateCreated: "4/4/2024",
                dateModified: "4/4/2024",
                difficulty: 2,
                imageUrl: null,
                ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
                instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
                title: "Avocado Toast"
            }
        ])
    })

    test('Gets recipes by cuisine', async () => {
        const postData = {
            query: `query RecipesByCuisine($cuisineType: String!) {
                recipesByCuisine(cuisineType: $cuisineType) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                cuisineType: 'American'
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.recipesByCuisine).toEqual([{
            _id: recipeID2,
            authorId: userID2,
            cookingTime: 8,
            cuisine: "American",
            dateCreated: "4/4/2024",
            dateModified: "4/4/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
            instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
            title: "Avocado Toast"
        }])
    })

    test('Gets recipes by cooking time', async () => {
        const postData = {
            query: `query Query($cookingTime: Int!) {
                recipesByCookingTime(cookingTime: $cookingTime) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                cookingTime: 5
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200);

        const res = JSON.parse(response.text)

        expect(res.data.recipesByCookingTime).toEqual([])
    })
})

// Test suite for deleting recipes
describe('Delete recipe', () => {
    test('Deletes recipe 1 and returns it', async () => {
        const postData = {
            query: `mutation DeleteRecipe1($deleteRecipeId: ID!) {
                deleteRecipe(id: $deleteRecipeId) {
                    _id
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                }
            }`,
            variables: {
                deleteRecipeId: recipeID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.deleteRecipe).toEqual({
            _id: recipeID1,
            authorId: userID1,
            cookingTime: 10,
            cuisine: "Chinese",
            dateCreated: "4/5/2024",
            dateModified: "4/5/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 large eggs", "1 cup rice", "1 tsp soy sauce", "1 tsp neutral cooking oil"],
            instructions: ["Scramble eggs.", "Add rice and mix with eggs.", "Add soy sauce and stir for 2 minutes."],
            title: "Simple Egg Fried Rice"
        })
    })

    test('Check that recipe 1 is removed from user 1 published recipes', async () => {
        const postData = {
            query: `query User1PublishedRecipes($userId: ID!) {
                userPublishedRecipes(userId: $userId) {
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                    _id
                }
            }`,
            variables: {
                userId: userID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.userPublishedRecipes).toEqual([])
    })

    test('Check that recipe 1 is removed from user 1 saved recipes', async () => {
        const postData = {
            query: `query User1SavedRecipes($userId: ID!) {
                userSavedRecipes(userId: $userId) {
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                    _id
                }
            }`,
            variables: {
                userId: userID1
            }
        }

        const response = await request(graphQLEndpoint)
        .post('/graphql')
        .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.userSavedRecipes).toEqual([{
            _id: recipeID2,
            authorId: userID2,
            cookingTime: 8,
            cuisine: "American",
            dateCreated: "4/4/2024",
            dateModified: "4/4/2024",
            difficulty: 2,
            imageUrl: null,
            ingredients: ["2 eggs", "1 ripe avocado", "2 slices bread"],
            instructions: ["Toast bread.", "Fry eggs.", "Spread half an avocado on each slice of bread.", "Add eggs on top of avocado."],
            title: "Avocado Toast"
        }])
    })
})

// Test suite for deleting users
describe('Delete users', () => {
    test('Deletes user 1 and returns it', async () => {
        const postData = {
            query: `mutation DeleteUser1($email: String!, $username: String!, $password: String!) {
                deleteUser(email: $email, username: $username, password: $password) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                email: "iamcook1@gmail.com",
                username: "cookone",
                password: "iamcook1"
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.deleteUser).toEqual({
            email: "iamcook1@gmail.com",
            password: "iamcook1",
            publishedRecipes: [],
            savedRecipes: [],
            username: "cookone"
        })
    })

    test('Deletes user 2 and returns it', async () => {
        const postData = {
            query: `mutation DeleteUser2($email: String!, $username: String!, $password: String!) {
                deleteUser(email: $email, username: $username, password: $password) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                email: "cook2@gmail.com",
                username: "cook2",
                password: "iamcooktwo"
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.data.deleteUser).toEqual({
            email: "cook2@gmail.com",
            password: "iamcooktwo",
            publishedRecipes: [],
            savedRecipes: [],
            username: "cook2"
        })
    })

    test('Check that recipe 2 was deleted with user 2', async () => {
        const postData = {
            query: `query GetRecipe2($recipeId: ID!) {
                recipe(id: $recipeId) {
                    authorId
                    cookingTime
                    cuisine
                    dateCreated
                    dateModified
                    difficulty
                    imageUrl
                    ingredients
                    instructions
                    title
                    _id
                }
            }`,
            variables: {
                recipeId: recipeID2
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.errors[0].message).toBe('Recipe not found')
    })

    test('Attempt to delete non-existent user', async () => {
        const postData = {
            query: `mutation DeleteUser2($email: String!, $username: String!, $password: String!) {
                deleteUser(email: $email, username: $username, password: $password) {
                    email
                    password
                    publishedRecipes
                    savedRecipes
                    username
                }
            }`,
            variables: {
                email: "cook1@yahoo.com",
                username: "cook_1",
                password: "cook1isme"
            }
        }

        const response = await request(graphQLEndpoint)
            .post('/graphql')
            .send(postData)

        expect(response.status).toBe(200)

        const res = JSON.parse(response.text)

        expect(res.errors[0].message).toBe('User not found')
    })
})