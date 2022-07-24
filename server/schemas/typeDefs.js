const { gql } = require('apollo-server-express');

// create the typeDefs
const typeDefs = gql`
    type User {
        _id:ID
        username: String
        email: String
        savedBooks: [Book]
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
        login(email: String!, password: String!): Auth
        addUser(username: String!, email:String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User
    }
    input BookInput {
        authors: [String]
        description: String
        title: String
        image: String
        link: String
        bookId: String
    }

`;

module.exports = typeDefs;