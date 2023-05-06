chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('getButtonInfo');  
  if (request.action === 'getButtonInfo') {
    const button = document.getElementsByClassName('css-ff6ys9');
    console.log(button);
    if (button !== undefined) {
      console.log('button found : ' + button[0]);

      button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      
      sendResponse({ button });
    } else {
      sendResponse({ button })
      // sendResponse({ error: 'Button not found' });
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
