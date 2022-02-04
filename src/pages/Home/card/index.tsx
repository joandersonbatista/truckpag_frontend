import React, { useState } from "react";

import "./style.css";
import { ICharacter } from "../../../services/characters";
import Modal from "../modal";

interface IProps {
  props: ICharacter[];
}

export default function Card({ props }: IProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [chatacterId, setCharacterId] = useState<number>(0);

  function openModal(open: boolean, id?: number) {
    if (id) setCharacterId(id);
    setModal(open);
  }

  return (
    <>
      {props.map((value, index) => {
        return (
          <div
            key={`${index + 1}`}
            className="main-content-card-container"
            onClick={() => openModal(true, value._id)}
          >
            <div className="img-container">
              <img src={value.imageUrl} alt="avatar_image" />
            </div>
            <h2>{value.name}</h2>
          </div>
        );
      })}
      {modal && <Modal setModal={openModal} id={chatacterId} />}
    </>
  );
}
