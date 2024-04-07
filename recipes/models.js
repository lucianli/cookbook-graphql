const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    imageUrl: { type: String, required: false },
    rating: { type: Number, min: 0, max: 5 },
    difficulty: { type: Number, required: true, min: 0, max: 5 },
    cuisine: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    dateCreated: { type: String, required: true },
    dateModified: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    publishedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Recipe, User };