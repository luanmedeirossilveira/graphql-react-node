import React from "react";
import { useContatosContext } from "../../context/ContatosContext";
import { GET_CONTATOS } from "../../graphql";

interface ItemProps {
  item: {
    id: string | number;
    nome: string;
    email: string;
    telefone: string;
  };
}

export const Item = ({ item }: ItemProps) => {
  const { users, form } = useContatosContext() as any;

  if (users.loading) return <div>Carregando...</div>;

  return (
    <div className="item">
      <h5 className="item-header">
        <a href="name" className="item-title" onClick={e => {
          e.preventDefault();

          form.handleUpdate(item);
        }}>
          {item.nome}
        </a>
        <button
          className="close"
          type="button"
          onClick={() => {
            users.deleteUser({
              variables: { id: item.id },
              refetchQueries: [{ query: GET_CONTATOS }],
            });
          }}
        >
          <span>&times;</span>
        </button>
      </h5>
      <div className="item-body">
        <div className="item-text">{item.email}</div>
        <div className="item-text">{item.telefone}</div>
      </div>
    </div>
  );
};
