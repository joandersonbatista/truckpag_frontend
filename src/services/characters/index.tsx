import { AxiosError } from "axios";
import { api } from "../api";

interface ICharacter {
  _id: number;
  url: string;
  name: string;
  sourceUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  imageUrl: string;
  alignment: string;
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
}

interface IAllCharacters {
  data: ICharacter[];
  count: number;
  previousPage: string;
  nextPage: string;
}

async function GetAllCharacters(
  page: number = 1
): Promise<IAllCharacters | string> {
  try {
    return (
      await api.get<IAllCharacters>("/characters", {
        params: {
          page: page,
        },
      })
    ).data;
  } catch (error) {
    return (error as AxiosError).response!.data.message;
  }
}

async function GetOneCharacter(id: number): Promise<ICharacter | string> {
  try {
    return (await api.get<ICharacter>(`/characters/${id}`)).data;
  } catch (error) {
    return (error as AxiosError).response!.data.message;
  }
}

export type { ICharacter, IAllCharacters };
export { GetAllCharacters, GetOneCharacter };
