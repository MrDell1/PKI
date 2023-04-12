(function () {
  const messages = document.querySelector("#messages");
  const wsButton = document.querySelector("#wsButton");
  const wsSendButton = document.querySelector("#wsSendButton");
  const logout = document.querySelector("#logout");

  function showMessage(message) {
    messages.textContent += `\n${message}`;
    messages.scrollTop = messages.scrollHeight;
  }

  let ws;

  wsButton.onclick = function () {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }
    const roomId = document.getElementById("roominput").value;
    if(!roomId){
      showMessage("Choose your room");
    }
    ws = new WebSocket(`ws:/${location.host}/room?roomId=${roomId}`);
    ws.onerror = function () {
      showMessage("WebSocket error");
    };
    ws.onopen = function () {
      showMessage("WebSocket connection established");
    };
    ws.onmessage = async function (data) {
      const msg = await data.data.text();
      showMessage(`Recived ${msg}`);
    };
    ws.onclose = function () {
      showMessage("WebSocket connection closed");
      ws = null;
    };
  };

  wsSendButton.onclick = function () {
    if (!ws) {
      showMessage("No WebSocket connection");
      return;
    }
    const message = document.getElementById("messageinput").value;
    ws.send(message);
    showMessage(`Sent ${message}`);
  };

  logout.onclick = function () {
    ws.close();
  };
})();
