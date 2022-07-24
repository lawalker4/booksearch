const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToke } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('_v -password')

                return userDatal
            }
            throw new AuthenticationError('You are NOT logged in.');
        }
    },
    Mutation: {
        addUser: async (_parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentails');
            }

            const token = singleToken(user);
            return { token, user };
        },
        saveBook: async (_parent, { input }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addtoSet: { savedBooks: input } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationsError('Not Logged in');
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in');
        }
    }
};

module.exports = resolvers;