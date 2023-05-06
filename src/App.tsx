import React from "react";

const App = () => {
    const getbuttons = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.id === undefined) return;
            chrome.tabs.sendMessage(tab.id, { action: 'getButtonInfo' }, function(response) {
            if (response && response.button) {
                // Do something with the button, e.g. add an event listener
                console.log(JSON.stringify(response.button));
                const button = response.button;
                console.log('Button found:', JSON.stringify(button));
                button.addEventListener('click', () => {
                    console.log('Button clicked!');
                });
            } else {
                console.log('Button not found');
            }
            });
        });
    }

    return (
        <div>
            <h1>hello world</h1>
            <button onClick={getbuttons}>get buttons</button>
        </div>
    );
}

export default App;
