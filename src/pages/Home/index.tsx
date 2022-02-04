import React, { ChangeEvent, useEffect, useState } from "react";

import Card from "./card";

import "./style.css";
import {
  GetAllCharacters,
  IAllCharacters,
  ICharacter,
} from "../../services/characters";

export default function Home() {
  const [data, setData] = useState<IAllCharacters>();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const request = (await GetAllCharacters()) as IAllCharacters;
      setData(request);
      setFilter(request.data);
      setLoading(false);
    })();
  }, []);

  async function PreviousOrNext(name: "previous" | "next") {
    setLoading(true);

    if (name === "next" && data?.nextPage) {
      const request = (await GetAllCharacters(page + 1)) as IAllCharacters;

      setPage(page + 1);
      setFilter(request.data);
      setData(request);
    }

    if (name === "previous" && data?.previousPage) {
      const request = (await GetAllCharacters(page - 1)) as IAllCharacters;

      setPage(page - 1);
      setFilter(request.data);
      setData(request);
    }

    setLoading(false);
  }

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    const search = event.target.value;

    const filterCharacter = data!.data.filter((value) => {
      return value.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilter(filterCharacter);
  }

  return (
    <>
      <h1 className="title">Personagens Da Disney</h1>
      <div className="main-content default-container">
        <input
          type="text"
          placeholder="procurar personagem"
          onChange={onChange}
        />
      </div>
      <div className="main-content">
        {loading ? (
          <h2 className="loading">Carregando</h2>
        ) : (
          <Card props={filter} />
        )}
      </div>
      <div className="main-content default-container">
        <button onClick={() => PreviousOrNext("previous")}>Voltar</button>
        <button onClick={() => PreviousOrNext("next")}>Próximo</button>
      </div>
    </>
  );
}
