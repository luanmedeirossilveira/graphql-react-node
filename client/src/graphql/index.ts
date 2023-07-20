import { gql } from "@apollo/client";

export const GET_CONTATOS = gql`
  query {
    users {
      id
      nome
      email
      telefone
    }
  }
`;

export const ADD_CONTATO = gql`
  mutation AddContato($nome: String!, $email: String!, $telefone: String) {
    createUser(
      data: {
        nome: $nome
        email: $email
        telefone: $telefone
      }
    ) {
      id
      nome
      email
      telefone
    }
  }
`;

export const REMOVE_CONTATO = gql`
  mutation RemoveContato($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const UPDATE_CONTATO = gql`
  mutation UpdateContato($id: Int!, $nome: String!, $email: String!, $telefone: String) {
    updateUser(
      id: $id
      data: {
        nome: $nome
        email: $email
        telefone: $telefone
      }
    ) {
      id
      nome
      email
      telefone
    }
  }
`;
