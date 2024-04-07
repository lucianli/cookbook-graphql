const { Recipe, User } = require('./models.js');

const resolvers = {
    Query: {
        allRecipes: async () => {
            return await Recipe.find();
        },
        recipe: async (_, { id }) => {
            const recipe = await Recipe.findById(id);
            
            if (!recipe) {
                throw new Error('Recipe not found');
            }

            return recipe;
        },
        userPublishedRecipes: async (_, { userId }) => {
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            return await Recipe.find({ _id: { $in: user.publishedRecipes} });
        },
        userSavedRecipes: async (_, { userId }) => {
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            return await Recipe.find({ _id: { $in: user.savedRecipes } });
        },
        recipesByDifficulty: async (_, { difficultyLevel }) => {
            return await Recipe.find({ difficulty: { $lte: difficultyLevel } });
        },
        recipesByCuisine: async (_, { cuisineType }) => {
            return await Recipe.find({ cuisine: cuisineType });
        },
        recipesByCookingTime: async (_, { cookingTime }) => {
            return await Recipe.find({ cookingTime: { $lte: cookingTime } });
        },
        user: async (_, { username, password }) => {
            return await User.findOne({ username: username, password: password });
        }
    },
    Mutation: {
        addRecipe: async (_, { recipeToAdd }) => {
            const newRecipe = new Recipe({ ...recipeToAdd });
            const savedRecipe = await newRecipe.save();

            await User.findByIdAndUpdate(recipeToAdd.authorId, {
                $addToSet: { publishedRecipes: savedRecipe._id }
            });

            return savedRecipe;
        },
        editRecipeStringAttr: async (_, { id, attributeName, attributeValue }) => {
            return await editRecipeAttribute(id, attributeName, attributeValue);
        },
        editRecipeNumAttr: async (_, { id, attributeName, attributeValue }) => {
            return await editRecipeAttribute(id, attributeName, attributeValue);
        },
        editRecipeListAttr: async (_, { id, attributeName, attributeValue }) => {
            return await editRecipeAttribute(id, attributeName, attributeValue);
        },
        saveRecipe: async (_, { userId, recipeId }) => {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $addToSet: { savedRecipes: recipeId }
            }, { new: true });

            if (!updatedUser) {
                throw new Error('User not found');
            }

            return updatedUser;
        },
        deleteRecipe: async (_, { id }) => {
            const recipe = await Recipe.findByIdAndDelete(id);

            if (!recipe) {
                throw new Error('Recipe not found');
            }

            return recipe;
        },
        addUser: async (_, { userToAdd }) => {
            // Check if a user with the same username exists
            const existingUsername = await User.findOne({ username: userToAdd.username });
            if (existingUsername) {
                throw new Error('Username already exists');
            }

            // Check if a user with the same email exists
            const existingEmail = await User.findOne({ email: userToAdd.email });
            if (existingEmail) {
                throw new Error('Email already exists');
            }

            const newUser = new User({ ...userToAdd });
            return await newUser.save();
        },
        editUser: async (_, { id, attributeName, attributeValue }) => {
            const user = await User.findById(id);

            if (!user) {
                throw new Error('User not found');
            }

            user[attributeName] = attributeValue;
            const updatedUser = await user.save()
            return updatedUser;
        },
        deleteUser: async (_, { email, username, password }) => {
            const user = await User.findOne({ 
                email: email, 
                username: username, 
                password: password 
            });

            if (!user) {
                throw new Error('User not found');
            }

            const publishedRecipes = user["publishedRecipes"];
            for (const recipe of publishedRecipes) {
                await Recipe.findByIdAndDelete(recipe._id);
            }
            user["publishedRecipes"] = [];

            const savedRecipes = user["savedRecipes"];
            for (const recipe of savedRecipes) {
                await Recipe.findByIdAndDelete(recipe._id);
            }
            user["savedRecipes"] = [];

            const removedUserData = { ...user.toObject() };
            await User.deleteOne({ _id: user._id })
            return removedUserData;
        }
    }
};

const editRecipeAttribute = async (id, attributeName, attributeValue) => {
    const recipe = await Recipe.findById(id);
    recipe[attributeName] = attributeValue;
    const updatedRecipe = await recipe.save();
    return updatedRecipe;
}

module.exports = resolvers;