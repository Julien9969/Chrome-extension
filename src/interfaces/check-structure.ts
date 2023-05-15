import CheckLine from "./check-line";

export interface CheckStructure {
    data: [CheckLine],
    idCheck: number,
    idFilm: number,
    idSerie: number,
    idUser: string,
    isDraft: boolean,
    lang: string,
    nameFilm: string,
    nameSerie: string,
    nameUser: string,
    numberFilm: number,
}