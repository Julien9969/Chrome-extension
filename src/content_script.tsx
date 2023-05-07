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

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  console.log('fillCheck');
  if (request.action === 'fillCheck') {
    const checkLines = request.payload;
    const button = document.getElementsByClassName('css-ff6ys9');
    if (!button || button.length === 0) {
      sendResponse({success: false, msg: 'Vous n\'êtes pas sur une bonne page' });
      return;
    }
    checkLines.forEach(async () => {
      button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const linesList = document.getElementsByClassName('css-1inm7gi')[1].children as HTMLCollection;

    let errorOccured = false;
    for (let index = 0; index < linesList.length; index++) {
      let line = linesList[index]; 
      // timing input
      // const pasteEvent = await createPasteEvent(checkLines[index].timing);
      console.log(checkLines[index].timing);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // console.log(pasteEvent);
      console.log(line.children[0].children[0].children[0].children);
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatchPasteEvent(line.children[0].children[0].children[0].children, checkLines[index].timing);

      // if (pasteEvent !== null) {
      // } else {
      //   errorOccured = true;
      // }
      // category input

    }
  }
});

function dispatchPasteEvent(b: HTMLCollection, textData: string) {
  let input = b[0];
  if (input) {
    let pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      clipboardData: new DataTransfer()
    });

    (pasteEvent.clipboardData as any).setData('text/plain', textData);

    input.dispatchEvent(pasteEvent);
  } else {
    setTimeout(() => dispatchPasteEvent(b, textData), 100);
  }
}


// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.color) {
//     console.log("Receive color = " + msg.color);
//     document.body.style.backgroundColor = msg.color;
//     sendResponse("Change color to " + msg.color);
//   } else {
//     sendResponse("Color message is none.");
//   }
// });
