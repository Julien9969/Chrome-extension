import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import InputChecker from "../check-input";
import SerieSelect from "../serie-select/serie-select";
import FilmSelect from "../film-select/film-select";
import "./App.css";
import  CheckLine from "../interfaces/check-line";
import { FilmItem } from "../interfaces/film-item";
import { CheckerInfos } from "../interfaces/checker-infos";
import { CheckStructure } from "../interfaces/check-structure";

const App = () => {
    const [text, setText] = useState('');
    const [errorMessages, setErrorMessages] = useState<string>('');
    const [successMessages, setSuccessMessages] = useState<string>('');
    const [entryError, setEntryError] = useState(false);
    const [validCheckLines, setValidLines] = useState<CheckLine[]>([]);
    const [isCheckValid, setIsCheckValid] = useState(false);

    const [serieId, setSerieId] = useState<number>(-1);
    const [filmItem, setFilmItem] = useState<FilmItem>(undefined as unknown as FilmItem);
    const [checkerInfos, setCheckerInfos] = useState<CheckerInfos>(undefined as unknown as CheckerInfos);
    const [language, setLanguage] = useState('VOSTFR');

    const sendCheck = () => {
        
        if (!filmItem || !checkerInfos || !serieId) {
            timeoutError();
            setErrorMessages(`Selectionnez une série et un film`);
            return;
        }
        const check: CheckStructure = {
            data: validCheckLines,
            idCheck: null,
            idFilm: filmItem.id,
            idSerie: serieId,
            idUser: checkerInfos.id.toString(),
            isDraft: true,
            lang: language,
            nameFilm: filmItem.name,
            nameSerie: filmItem.serieName,
            nameUser: checkerInfos.name,
            numberFilm: filmItem.number,
        }

        
        fetch('https://fankai.fr/api/checks/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                'Connection': 'keep-alive',
                'Host': 'fankai.fr',
                'Origin': 'https://fankai.fr',
                'Referer': 'https://fankai.fr/checkers',
            },
            body: JSON.stringify(check)
        })
        .then(response => {setSuccessMessages(`Check envoyé`)})
        .catch(error => {timeoutError(); setErrorMessages(`Erreur lors de l'envoi du check`)});
    }

    const performCheck = () => {
        console.log(validCheckLines);
        let errorOccured = false;

        const lines = text.split('\n');
        if (lines.length === 0) {
            setEntryError(true);
            return;
        }
        const newValidLines: CheckLine[] = [];

        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            if(line === '' || line === '\n') continue;

            const checkLine = InputChecker.createCheckInput(line);
            
            if (checkLine) {
                newValidLines.push(checkLine);
            } else {
                errorOccured = true;
                timeoutError();
                setErrorMessages(`Erreur à la ligne ${index + 1}`);
                break;
            }
        }
        if (errorOccured) return;
        
        setValidLines(newValidLines);
        setIsCheckValid(true);
        setSuccessMessages(`Check valide`);
    }

    const handleTextChange = (event: any) => {
        setText(event.target.value);
        setIsCheckValid(false);
    }

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.id === undefined) return;
            // console.log(tab.url)
            if (tab.url === 'https://fankai.fr/checkers') {
                chrome.tabs.sendMessage(tab.id, { action: 'getCheckerInfos' }, function(response) {
                    // console.log(JSON.parse(response))
                    setCheckerInfos(JSON.parse(response));
                });
            } else {
                timeoutError();
                setErrorMessages('Ouvrir la page https://fankai.fr/checkers');
            }
            return;
        });
    }, []);

    const handleSwitchChange = (event: any) => {
        const isChecked = event.target.checked;
        const newLanguage = isChecked ? 'VF' : 'VOSTFR';
        setLanguage(newLanguage);
    };

    const timeoutError = () => {
        setEntryError(true);
        setTimeout(() => {
            setEntryError(false);
        }, 3000);
    }

    return (
        <div className="container flex-column">
            <h1 id="title">Check TXT Converter</h1>
            <div id="text-container">
                <textarea value={text} onChange={handleTextChange} className="text-area" placeholder="Coller le check ici"></textarea>
            </div>
            <div>
                { entryError ? <p id="error-msg">{errorMessages}</p> : null }
                { isCheckValid ? <p id="success-msg">{successMessages}</p> : null}
            </div>
            <div className="flex-row">
                <div id="serie-select">
                    <SerieSelect setSerieCallback={(id: number) => { setSerieId(id) } } />
                </div>
                <div id="film-select">
                    <FilmSelect setFilmCallback={(filmData: FilmItem) => {setFilmItem(filmData)} } serieId={serieId} disabled={serieId === -1} />
                </div>
                <FormControlLabel
                    value="bottom"
                    control={<Switch color="primary" onChange={handleSwitchChange} />}
                    label={language}
                    labelPlacement="bottom"
                />
                { !isCheckValid ?
                    <Button variant="contained" onClick={performCheck}>Vérifier</Button>
                    : <Button variant="contained" onClick={sendCheck}>Envoyer</Button> 
                }
            </div>
        </div>
    );
}

export default App;
