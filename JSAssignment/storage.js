let localScore = Number(localStorage.getItem("localScore")) || 0;
const localScoreDisplay = document.getElementById("local-score");
localScoreDisplay.textContent = localScore;
let sessionScore = Number(sessionStorage.getItem("sessionScore")) || 0;
const sessionScoreDisplay = document.getElementById("session-score");
sessionScoreDisplay.textContent = sessionScore;
const incrementBtn = document.getElementById("increment-btn");
incrementBtn.addEventListener("click", () => {
  localScoreDisplay.textContent = localScore;
  sessionStorage.setItem("sessionScore", ++sessionScore);
  sessionScoreDisplay.textContent = sessionScore;
  localStorage.setItem("localScore", ++localScore);
});
