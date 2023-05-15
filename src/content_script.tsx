import { CheckerInfos } from "./interfaces/checker-infos";

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  switch (request.action) {
    case 'getCheckerInfos':
      const checkerInfos = await getCheckerInfos();
      sendResponse(JSON.stringify(checkerInfos));
      break;
    default:
      console.log('default');
      break;
  }
});

async function getCheckerInfos(): Promise<CheckerInfos | undefined> {
  const appStore = sessionStorage.getItem('appStore');
  if (appStore) {
    const appStoreObj = JSON.parse(appStore);
    console.log(JSON.stringify(appStoreObj));
    return { name: appStoreObj.user.name, id: appStoreObj.user.id };
  }
}


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

// chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
//   console.log('fillCheck');
//   if (request.action === 'fillCheck') {
//     const checkLines = request.payload;
//     const button = document.getElementsByClassName('css-ff6ys9');
//     if (!button || button.length === 0) {
//       sendResponse({success: false, msg: 'Vous n\'êtes pas sur une bonne page' });
//       return;
//     }
//     checkLines.forEach(async () => {
//       button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
//     });

//     const linesList = document.getElementsByClassName('css-1inm7gi')[1].children as HTMLCollection;
//     // while (linesList.length === 0) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     // }
//     let number = linesList.length;

//     if (number !== checkLines.length) {
//       number = linesList.length - (linesList.length - checkLines.length);
//     }

//     console.log('number : ' + number);
//     console.log('linesList : ');
//     console.log(linesList);

//     for (let index = 0; index < number; index++) {
//       console.log('index : ' + index);
//       let line = linesList[index]; 
//       // timing input
//       console.log(checkLines[index].timing);
//       while (!line || !line.children[0].children[0].children[0].children) {
//         await new Promise(resolve => setTimeout(resolve, 100));
//       }
//       console.log(line);

//       console.log(line.children[0].children[0].children[0].children);
//       await dispatchPasteEvent(line.children[0].children[0].children[0].children, checkLines[index].timing);

//       // description input
//       console.log(checkLines[index].description);
//       console.log(line.children[1].children[0].children[0].children[0]);
//       (line.children[1].children[0].children[0].children[0] as HTMLTextAreaElement).value = checkLines[index].description ? checkLines[index].description : '';

//       // category input
//     }
//     console.log('Terminé avec succes');
//     sendResponse({ success: true, msg: 'Terminé avec succes' });
//   }
// });

// async function dispatchPasteEvent(b: HTMLCollection, textData: string) {
//   let input = b[0];
//   if (input) {
//     let pasteEvent = new ClipboardEvent('paste', {
//       bubbles: true,
//       clipboardData: new DataTransfer()
//     });

//     (pasteEvent.clipboardData as any).setData('text/plain', textData);

//     input.dispatchEvent(pasteEvent);
//   } else {
//     setTimeout(() => dispatchPasteEvent(b, textData), 100);
//   }
// }

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.color) {
//     console.log("Receive color = " + msg.color);
//     document.body.style.backgroundColor = msg.color;
//     sendResponse("Change color to " + msg.color);
//   } else {
//     sendResponse("Color message is none.");
//   }
// });


