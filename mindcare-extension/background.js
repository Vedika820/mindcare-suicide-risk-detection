chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.text) {

    fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: request.text
      })
    })
    .then(res => res.json())
    .then(data => {
      sendResponse(data);
    })
    .catch(err => {
      console.log("API error:", err);
      sendResponse(null);
    });

    return true;
  }

});