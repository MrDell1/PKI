var express = require('express');
var router = express.Router();

router.ws('/echo', function(ws, req) {
  ws.on('message', (msg) => {
    ws.send(msg);
  });
});

module.exports = router;
