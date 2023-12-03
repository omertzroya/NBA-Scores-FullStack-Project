import express, { response } from "express";
import axios from "axios";


// Server setup 
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware 
app.use(express.static("public"));


// Routes 
app.get('/', async(req, res) => {

  const options = {
    method: 'GET',
    url: 'https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores',
    params: {daysFrom: '3'},
    headers: {
      'X-RapidAPI-Key': 'e72d352152mshe86eb15637dfdf6p1aadc5jsn58d74e3fae7d',
      'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    var length = response.data.length; 
    console.log(length);
    var arrGames = [];
    for(var i = 0; i < length; i++){
    if(response.data[i].completed === true){
    // Object called game to push into the array
    var game = {
      team1: response.data[i].home_team,
      team2: response.data[i].away_team,
      score1: response.data[i].scores[0].score,
      score2: response.data[i].scores[1].score,
      date: response.data[i].commence_time.slice(0,10),
    }
    arrGames.push(game);
  }
  }
  } 
  catch (error) {
    console.error(error);
  }
  res.render('index.ejs', {
    arrGames:arrGames,
});
});
