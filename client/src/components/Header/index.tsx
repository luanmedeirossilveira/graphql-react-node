import React from "react";

interface HeaderProps {
  text: string;
}

export default ({ text }: HeaderProps) => (
  <div className="container-title">
    <h1 className="title">{text}</h1>
  </div>
);