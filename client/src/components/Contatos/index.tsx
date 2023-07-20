import React from "react";
import { Item } from "../Item";
import { useContatosContext } from "../../context/ContatosContext";

const ContainerContatos = ({ children }: any) => {
  return <div className="contatos">{children}</div>;
};

export const Contatos = () => {
  const { users } = useContatosContext() as any;

  if (users.loading) return <ContainerContatos>Carregando...</ContainerContatos>;

  console.log(users);

  return (
    <ContainerContatos>
      {users.itens.map(
        (
          item: { id: string | number; nome: string; email: string; telefone: string },
          index: React.Key | null | undefined
        ) => (
          <Item key={index} item={item} />
        )
      )}
    </ContainerContatos>
  );
};
