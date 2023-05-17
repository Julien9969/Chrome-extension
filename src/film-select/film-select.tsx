import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './film-select.css';
import { SerieItem } from '../interfaces/SerieList';
import { SerieInfos } from '../interfaces/serie-infos';
import { FilmItem } from '../interfaces/film-item';
import { filmInfos } from '../interfaces/film-infos';

export default function FilmSelect(props: FilmSelectProps) {
  const [filmData, setFilmData] = React.useState<string>("");
  const [serieInfos, setSerieInfos] = React.useState<SerieInfos>({name: "", episodes: []});

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setFilmData(event.target.value);
    const item = JSON.parse(event.target.value);

    const filmData: FilmItem = { serieName: serieInfos.name, id: item.id , name: item.name, number: item.number };
    props.setFilmCallback(filmData);
  };

  React.useEffect(() => {
    fetch(`https://fankai.fr/api/checks/films?idSerie=${props.serieId}`)
      .then(response => response.json())
      .then(data => {setSerieInfos(data)})
      .catch(error => console.error(error));
  }, [props.serieId]);

  return (
    <Box className="container-film-select">
      <FormControl fullWidth>
        <InputLabel disabled={props.disabled} id="film-select-label">Selection du film</InputLabel>
        <Select
          labelId="film-select-label"
          id="film-select"
          value={filmData}
          label="Selection film"
          onChange={handleChange}
        >
        {
          serieInfos.episodes && serieInfos.episodes.length > 0
            ? serieInfos.episodes.map((item: filmInfos) => (
                <MenuItem key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </MenuItem>
              ))
            : props.serieId === -1 ?  <MenuItem key={-1} value={0}>Sélectionner un série avant </MenuItem> :  <MenuItem key={-1} value={0}>Chargement...</MenuItem>
        }
        </Select>
      </FormControl>
    </Box>
  );
}

type FilmSelectProps = {
  setFilmCallback: (filmData: FilmItem) => void;
  serieId: number;
  disabled: boolean;
}
