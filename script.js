const WORDS = [
  { word:"GRAVITY",    category:"Science",         hint:"Force that pulls objects downward" },
  { word:"PHOTON",     category:"Science",         hint:"A particle of light" },
  { word:"MOLECULE",   category:"Science",         hint:"Smallest unit of a substance" },
  { word:"NEUTRON",    category:"Science",         hint:"Neutral particle in the nucleus" },
  { word:"OSMOSIS",    category:"Science",         hint:"Water passing through a membrane" },
  { word:"JAVASCRIPT", category:"Web Development", hint:"Language that powers interactivity" },
  { word:"FLEXBOX",    category:"Web Development", hint:"A CSS layout system" },
  { word:"CALLBACK",   category:"Web Development", hint:"Function passed as an argument" },
  { word:"PROMISE",    category:"Web Development", hint:"An async JavaScript object" },
  { word:"VIEWPORT",   category:"Web Development", hint:"Visible area of a webpage" },
  { word:"THEOREM",    category:"Math",            hint:"A proven mathematical statement" },
  { word:"FRACTION",   category:"Math",            hint:"Part of a whole number" },
  { word:"VARIABLE",   category:"Math",            hint:"Symbol representing an unknown value" },
  { word:"EXPONENT",   category:"Math",            hint:"Power a base number is raised to" },
  { word:"POLYGON",    category:"Math",            hint:"Closed shape with straight sides" },
];

let chosen, guessed, wrong;

function renderWord() {
  const display = document.getElementById("word-display");
  display.innerHTML = "";
  chosen.word.split("").forEach(l => {
    const box = document.createElement("div");
    box.className = "letter-box";
    box.textContent = guessed.includes(l) ? l : "_";
    if (guessed.includes(l)) box.classList.add("revealed");
    display.appendChild(box);
  });
}

function guess(letter) {
  if (guessed.includes(letter)) return;
  guessed.push(letter);
  console.log("Guessed:", letter, "| All guesses so far:", guessed);

  const key = document.getElementById("key-" + letter);
  key.classList.add("used");

  if (chosen.word.includes(letter)) {
    key.classList.add("correct");
    console.log("CORRECT! Letter", letter, "is in", chosen.word);
    renderWord();
    if (chosen.word.split("").every(l => guessed.includes(l))) showModal(true);
  } else {
    key.classList.add("wrong");
    wrong++;
    console.log("WRONG! Mistakes:", wrong, "/ 6");
    document.getElementById("p" + (wrong - 1)).style.display = "block";
    document.getElementById("mistakes").textContent = "Mistakes: " + wrong + " / 6";
    if (wrong >= 6) showModal(false);
  }
}

function showModal(won) {
  console.log(won ? "GAME WON!" : "GAME OVER! Word was: " + chosen.word);
  document.getElementById("modal-icon").textContent  = won ? "🏆" : "😵";
  document.getElementById("modal-title").textContent = won ? "You Win!" : "Sorry, you lose!";
  document.getElementById("modal-word").innerHTML    = won
    ? "Awesome! The word was <strong>" + chosen.word + "</strong>"
    : "The word was: <strong>" + chosen.word + "</strong>";
  document.getElementById("modal").classList.add("show");
}

function newGame() {
  chosen = WORDS[Math.floor(Math.random() * WORDS.length)];
  guessed = []; wrong = 0;
  console.log("New game started. Word:", chosen.word, "| Category:", chosen.category);

  document.getElementById("modal").classList.remove("show");
  document.getElementById("category-badge").textContent = "Category: " + chosen.category;
  document.getElementById("hint").textContent = "Hint: " + chosen.hint;
  document.getElementById("mistakes").textContent = "Mistakes: 0 / 6";

  for (let i = 0; i < 6; i++) document.getElementById("p" + i).style.display = "none";
  document.querySelectorAll(".key").forEach(k => k.classList.remove("correct", "wrong", "used"));
  renderWord();
}

newGame();