const { AuthenticationError }= require('apollo-server-express');
const { User, Book } = require('../models');
const { signToke } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user){
                const userData = await User.findOne({ _id: context.user._id})
                .select('_v -password')

                return userDatal
            }
            throw new AuthenticationError('You are NOT logged in.');
        }
    },
Mutation: {
    addUser: async(_parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return {token, user};
    },

    login: async (parent, { email, password}) => {
        const user = await User.findOne({ email });

        if (!user){
            throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentails');
        }
    }

}

}