var express = require("express");
var router = express.Router();

const Score = {
  Wins: 0,
  Losses: 0,
  Ties: 0,
}

router.get("/", function (req, res) {
  res.json(Score);
});

router.put("/:wins&:losses&:ties", function(req,res){
  const wins = req.params.wins;
  const losses = req.params.losses;
  const ties = req.params.ties;
  Score.Wins = Number(wins);
  Score.Losses = Number(losses);
  Score.Ties = Number(ties);
  res.json(Score);
})

router.post("/wins", function(res,res){
  Score.Wins++;
  res.json(Score.Wins);
})

router.post("/losses", function(res,res){
  Score.Losses++;
  res.json(Score.Losses);
})

router.post("/ties", function(res,res){
  Score.Ties++;
  res.json(Score.Ties);
})



module.exports = router;
