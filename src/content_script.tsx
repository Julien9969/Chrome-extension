// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log('getButtonInfo');  
//   if (request.action === 'getButtonInfo') {
//     const button = document.getElementsByClassName('css-ff6ys9');
//     console.log(button);
//     if (button !== undefined) {
//       console.log('button found : ' + button[0]);

//       button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      
//       sendResponse({ button });
//     } else {
//       sendResponse({ button })
//       // sendResponse({ error: 'Button not found' });
//     }
//   }
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('fillCheck');
  if (request.action === 'fillCheck') {
    const checkLines = request.payload;
    const button = document.getElementsByClassName('css-ff6ys9');
    if (!button || button.length === 0) {
      sendResponse({success: false, msg: 'Vous n\'êtes pas sur une bonne page' });
      return;
    }
    checkLines.forEach(() => {
      button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const linesList = document.getElementsByClassName('css-1inm7gi')[1].children as HTMLCollection;

    for (let index = 0; index < linesList.length; index++) {
      let line = linesList[index]; 
      // Time input
      (line.children[0].children[0].children[0].children[0] as HTMLInputElement).value = checkLines[index].time;
    }
  }
});

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.color) {
//     console.log("Receive color = " + msg.color);
//     document.body.style.backgroundColor = msg.color;
//     sendResponse("Change color to " + msg.color);
//   } else {
//     sendResponse("Color message is none.");
//   }
// });
