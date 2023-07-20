import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int
    nome: String
    email: String
    telefone: String
  }

  type Query {
    users: [User]
  }

  input UserInput {
    nome: String!
    email: String!
    telefone: String
  }

  type Mutation {
    createUser(data: UserInput!): User
    deleteUser(id: Int!): User
    updateUser(id: Int!, data: UserInput!): User
  }

  type Subscription {
    userAdded: User!
  }
`;
