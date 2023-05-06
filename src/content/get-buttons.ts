chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('getButtonInfo');  
    if (request.action === 'getButtonInfo') {
      const button = document.getElementsByClassName('css-ff6ys9');
      console.log(button);
      if (button) {
        sendResponse({ button });
      } else {
        sendResponse({ error: 'Button not found' });
      }
    }
  });
  