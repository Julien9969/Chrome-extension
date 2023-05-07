import React, { useState } from "react";
import { Button } from "@mui/material";
import "./App.css";

const App = () => {
    const [text, setText] = useState('');
    let isCheckValid = false;
    let entryError = false;

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

    const performCheck = () => {
        const lines = text.split('\n');
        console.log(lines);
    }

    const handleTextChange = (event: any) => {
        setText(event.target.value);
        const lines = text.split('\n');
        console.log(lines);
        isCheckValid = false;
    }

    return (
        <div className="container flex-column">
            <h1 id="title">Check TXT Converter</h1>
            <div id="text-container">
                <textarea value={text} onChange={handleTextChange} className="text-area" placeholder="Coller le check ici"></textarea>
            </div>
            <div>
                { entryError ? <p id="error-msg">TODO error messages</p> : null }

            </div>
            <Button variant="contained" onClick={performCheck}>Véfier</Button>
            {/* <Button variant="contained" onClick={getbuttons}>get buttons</Button> */}
        </div>
    );
}

export default App;
