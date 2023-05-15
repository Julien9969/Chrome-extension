import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './serie-select.css';
import { SerieItem } from '../interfaces/SerieList';

export default function SerieSelect(props: SerieSelectProps) {
  const [serie, setSerie] = React.useState('');
  const [serieList, setSerieList] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSerie(event.target.value);
    props.setSerieCallback(parseInt(event.target.value));
  };

  React.useEffect(() => {
    fetch('https://fankai.fr/api/checks/series')
      .then(response => response.json())
      .then(data => setSerieList(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Box className="container-serie-select">
      <FormControl fullWidth>
        <InputLabel id="serie-select-label">Selection de la série</InputLabel>
        <Select
          labelId="serie-select-label"
          id="series-select"
          value={serie}
          label="Selection de la série"
          onChange={handleChange}
        >
        { serieList.length !== 0 ? serieList.map((item: SerieItem, index: number) => (
            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
        )) : (<MenuItem key={-1} value={0}>Chargement...</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}

type SerieSelectProps = {
    setSerieCallback: (id: number) => void;
}