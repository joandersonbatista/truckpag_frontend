import React, { ChangeEvent } from "react";

import "./style.css";

export type INames = "name" | "videoGames" | "tvShows" | "films";

interface IProps {
  title: string;
  placeholder: string;
  name: INames;
  type: "text";
  getValue: (name: INames, value: string) => void;
}

export default function Input({
  getValue,
  title,
  name,
  placeholder,
  type,
}: IProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    return getValue(name as INames, value);
  }

  return (
    <div className="input-container">
      <h3>{title}</h3>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}
