import React, { useState } from "react";
import { Button } from "@mui/material";
import InputChecker from "../check-input";
import "./App.css";
import  CheckLines from "../interfaces/check-line";

const App = () => {
    const [text, setText] = useState('');
    const [errorMessages, setErrorMessages] = useState<string>('');
    const [successMessages, setSuccessMessages] = useState<string>('');
    const [entryError, setEntryError] = useState(false);
    const [validCheckLines, setValidLines] = useState<CheckLines[]>([]);
    const [isCheckValid, setIsCheckValid] = useState(false);

    const getbuttons = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.id === undefined) return;
            console.log(tab.url)
            chrome.tabs.sendMessage(tab.id, { action: 'getButtonInfo' }, function(response) {
                console.log("reponse : " + JSON.stringify(response))
                
                if (response && response.button) {
                    // Do something with the button, e.g. add an event listener
                    const button = response.button;
                    console.log(button);
                    // button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
                } else {
                    console.log('Button not found');
                }
            });
        });
    }

    const sendCheck = () => {
        console.log(validCheckLines);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.id === undefined) return;
            console.log(tab.url)
            chrome.tabs.sendMessage(tab.id, { action: 'fillCheck', payload: validCheckLines }, function(response) {
                console.log("reponse : " + JSON.stringify(response))
                if (response.success) {
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
        const newValidLines: CheckLines[] = [];

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
            { !isCheckValid ?
                <Button variant="contained" onClick={performCheck}>Véfier</Button>
                : <Button variant="contained" onClick={sendCheck}>Convertir</Button> 
            }
        </div>
    );
}

export default App;
