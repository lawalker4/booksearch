const { gql } = require('apollo-server-express');

// create the typeDefs
const typeDefs = gql`
    type User {
        _id:ID
        username: String
        email: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth{
        token: ID!
        user: User
    }

    type Query {
        me: User
        getSingleUser(username: String!): User
      }

    type Mutation {
        login(email: Sting!, password: String!): Auth
        addUser(username: String!, email:String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;