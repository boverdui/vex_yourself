const Request = require('../helpers/request.js');

const leaderboardRequest = new Request('./db/leaderboard');

const ResultView = function (container) {
  this.container = container;
}

ResultView.prototype.renderResult = function (result) {
  this.container.innerHTML = "";


  const text = document.createElement('h3');
  text.classList.add('result-text');
  text.textContent = `Congratulations, ${result.name}! You got ${result.score} out of 10!`;
  this.container.appendChild(text);

  const table = document.createElement('table');
  table.classList.add('results-table');
  this.container.appendChild(table);

  const row = table.insertRow(0);
  const nameHeader = row.insertCell(0);
  const scoreHeader = row.insertCell(1);
  nameHeader.innerHTML = 'Name';
  scoreHeader.innerHTML = 'Score';

  const getScoresRequestComplete = function (allScores) {
    for (let i = 0; i < allScores.length; i++) {
      const resultsRow = table.insertRow(i + 1);
      const playerName = resultsRow.insertCell(0);
      const playerScore = resultsRow.insertCell(1);
      playerName.innerHTML = `${allScores[i].name}`;
      playerScore.innerHTML = `${allScores[i].score}`;
    }
  }

  leaderboardRequest.get(getScoresRequestComplete);

};

module.exports = ResultView;
