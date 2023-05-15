import React, { useState } from "react";
import { Button } from "@mui/material";
import InputChecker from "../check-input";
import SerieSelect from "../serie-select/serie-select";
import FilmSelect from "../film-select/film-select";
import "./App.css";
import  CheckLine from "../interfaces/check-line";
import { FilmItem } from "../interfaces/film-item";
import { CheckerInfos } from "../interfaces/checker-infos";

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

    const sendCheck = () => {
        console.log(validCheckLines);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.id === undefined) return;
            console.log(tab.url)
            chrome.tabs.sendMessage(tab.id, { action: 'fillCheck', payload: validCheckLines }, function(response) {
                console.log("reponse : " + JSON.stringify(response))
                if (response && response.success) {
                    setSuccessMessages(`Check entré avec succès`);
                } else {
                    setEntryError(true);
                    setErrorMessages(`Erreur lors de l'entrée du check\n ${response.msg}`);
                }
            });
        });
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
                setEntryError(true);
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

    const test = () => {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.id === undefined) return;
            console.log(tab.url)
            if (tab.url === 'https://fankai.fr/checkers') {
                chrome.tabs.sendMessage(tab.id, { action: 'getCheckerInfos' }, function(response) {
                    console.log(JSON.parse(response))
                    setCheckerInfos(JSON.parse(response));
                });
            } else {
                console.log('Ouvrir la page https://fankai.fr/checkers');
                timeoutError();
                setErrorMessages('Ouvrir la page https://fankai.fr/checkers');
            }
            return;
        });

        console.log(serieId);
        console.log(filmItem);
    }

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
                <SerieSelect setSerieCallback={(id: number) => { setSerieId(id) } } />
                <FilmSelect setFilmCallback={(filmData: FilmItem) => {setFilmItem(filmData)} } serieId={serieId} disabled={serieId === -1} />
                { !isCheckValid ?
                    <Button variant="contained" onClick={performCheck}>Véfier</Button>
                    : <Button variant="contained" onClick={sendCheck}>Convertir</Button> 
                }
                <Button variant="contained" onClick={test}>Test</Button>
            </div>
        </div>
    );
}

export default App;
