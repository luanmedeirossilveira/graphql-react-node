interface User {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
}

let dataUsers: User[] = [];
const USER_ADDED = "USER_ADDED";

export default {
  Query: {
    users: () => dataUsers,
  },
  Mutation: {
    createUser: (_, { data }, { pub }) => {
      const newUser = { ...data, id: dataUsers.length + 1 };
      dataUsers.push(newUser);
      pub.publish(USER_ADDED, {
        userAdded: newUser,
      });
      return newUser;
    },
    deleteUser: (_, { id }) => {
      dataUsers = dataUsers.filter((user) => user.id !== id);
      return { id };
    },
    updateUser: (_, { id, data }) => {
      const userIndex = dataUsers.findIndex((user) => user.id === id);
      dataUsers[userIndex] = { ...dataUsers[userIndex], ...data };
      return dataUsers[userIndex];
    }
  },
  Subscription: {
    userAdded: {
      subscribe: (obj, args, context) => {
        return context.pub.asyncIterator([USER_ADDED]);
      },
    },
  },
};
