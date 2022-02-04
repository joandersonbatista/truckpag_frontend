import React, {  useEffect, useState } from "react";

import Card from "./card";

import "./style.css";
import {
  GetAllCharacters,
  IAllCharacters,
  ICharacter,
} from "../../services/characters";
import Input, { INames } from "./input";

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

  function getValue(names: INames, values: string): void {
    if (!values) return setFilter(data!.data);

    const filterCharacter: ICharacter[] = [];

    if (names === "name") {
      const filterCharacterName = data!.data.filter((value) => {
        return value.name.toLowerCase().includes(values.toLowerCase());
      });

      filterCharacter.push(...filterCharacterName);
      return setFilter([...new Set(filterCharacter)]);
    }

    for (let i = 0; i < data!.data.length; i++) {
      const reducerFilter = data!.data.filter((value) => {
        if (value[names][i] === undefined) return null;

        return value[names][i].toLowerCase().includes(values.toLowerCase());
      });

      filterCharacter.push(...reducerFilter);
    }

    setFilter([...new Set(filterCharacter)]);
  }

  return (
    <>
      <h1 className="title">Personagens Da Disney</h1>
      <div className="main-content default-container">
        <Input
          getValue={getValue}
          name="name"
          placeholder="procura por nome"
          title="Nome"
          type="text"
        />
        <Input
          getValue={getValue}
          name="films"
          placeholder="procurar por filmes"
          title="Filmes"
          type="text"
        />
        <Input
          getValue={getValue}
          name="tvShows"
          placeholder="procurar por shows"
          title="TV Shows"
          type="text"
        />
        <Input
          getValue={getValue}
          name="videoGames"
          placeholder="procurar por vídeo games"
          title="Vídeo Games"
          type="text"
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
