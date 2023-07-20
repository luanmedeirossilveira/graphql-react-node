import { DocumentNode, useMutation, useQuery } from "@apollo/client";
import React, { createContext, createRef, useContext } from "react";
import { ADD_CONTATO, GET_CONTATOS, REMOVE_CONTATO, UPDATE_CONTATO } from "../graphql";
import { useMyRef } from "../hooks";

const MyContext = createContext<any>(null);

interface ContatosContextProviderProps {
  children: React.ReactNode;
}

const refreshContatos = {
  update(cache: any, { data }: any) {
    const newContatoResponse = data?.createUser;
    const exitingContatos = cache.readQuery({ query: GET_CONTATOS }) as any;

    cache.writeQuery({
      query: GET_CONTATOS,
      data: {
        users: [...exitingContatos?.users, newContatoResponse],
      },
    });
  },
};

export const ContatosContextProvider = ({
  children,
}: ContatosContextProviderProps) => {
  const { data, loading } = useQuery(GET_CONTATOS);
  const [criarContato] = useMutation(ADD_CONTATO, refreshContatos as any);
  const [deletarContato] = useMutation(REMOVE_CONTATO);
  const [updateContato] = useMutation(UPDATE_CONTATO);

  const [refId, refNome, refEmail, refTelefone] = useMyRef(4);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = parseInt(refId.current?.value as string);
    const nome = refNome.current?.value;
    const email = refEmail.current?.value;
    const telefone = refTelefone.current?.value;
    
    if (id) {
      updateContato({
        variables: { id, nome, email, telefone },
        refetchQueries: [{ query: GET_CONTATOS }],
      });

      console.log(id, nome, email, telefone);

      refId.current!.value = "";

    } else {
      criarContato({
        variables: { nome, email, telefone },
      });
    }

    refNome.current!.value = "";
    refEmail.current!.value = "";
    refTelefone.current!.value = "";
  }

  function handleUpdate(item: any) {
    refId.current!.value = item.id;
    refNome.current!.value = item.nome;
    refEmail.current!.value = item.email;
    refTelefone.current!.value = item.telefone;
  }

  return (
    <MyContext.Provider
      value={{
        users: {
          itens: data ? data.users : [],
          loading,
          createUser: criarContato,
          deleteUser: deletarContato,
        },
        form: {
          handleSubmit,
          handleUpdate,
          refId,
          refNome,
          refEmail,
          refTelefone,
        },
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export function useContatosContext() {
  return useContext(MyContext);
}
