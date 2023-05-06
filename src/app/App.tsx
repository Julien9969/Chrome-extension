import React from "react";
import "./App.css";

const App = () => {
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

    return (
        <div className="container flex-column">
            <h1 id="title"> hello world </h1>
            <button onClick={getbuttons}>get buttons</button>
            <div id="text-container">
                <textarea className="text-area" placeholder="Coller le check ici"></textarea>
            </div>
        </div>
    );
}

export default App;
