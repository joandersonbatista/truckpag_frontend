import React, { useEffect, useState } from "react";
import { GetOneCharacter, ICharacter } from "../../../services/characters";

import "./style.css";

interface IProps {
  setModal: (modal: boolean) => void;
  id: number;
}

export default function Modal({ setModal, id }: IProps) {
  const [data, setData] = useState<ICharacter>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const request = (await GetOneCharacter(id)) as ICharacter;

      setData(request);
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="background-modal">
      <div className="modal-container">
        {loading ? (
          <h1>Carregando</h1>
        ) : (
          <>
            <img
              src={data?.imageUrl}
              alt="avatar-url"
              className="modal-container-img"
            />
            <h1>{data!.name}</h1>
            <h1>Filmes</h1>
            {data?.films.map((value, index) => {
              return <p key={`${index + 1}`}>{value}</p>;
            })}
            <h1>TV shows</h1>
            {data?.tvShows.map((value, index) => {
              return <p key={`${index + 1}`}>{value}</p>;
            })}
            <h1>Videogames</h1>
            {data?.videoGames.map((value, index) => {
              return <p key={`${index + 1}`}>{value}</p>;
            })}
            <button onClick={() => setModal(false)}>Fechar</button>
          </>
        )}
      </div>
    </div>
  );
}
