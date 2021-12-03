let blackjackGame = {
  you: { scoreSpan: "#your-score", div: "#your-box", score: 0 },
  dealer: { scoreSpan: "#dealer-score", div: "#dealer-box", score: 0 },
  cards: [
    "2_of_diamonds",
    "3_of_diamonds",
    "4_of_diamonds",
    "5_of_diamonds",
    "6_of_diamonds",
    "7_of_diamonds",
    "8_of_diamonds",
    "9_of_diamonds",
    "10_of_diamonds",
    "king_of_diamonds",
    "queen_of_diamonds",
    "jack_of_diamonds",
    "ace_of_diamonds",
    "2_of_spades",
    "3_of_spades",
    "4_of_spades",
    "5_of_spades",
    "6_of_spades",
    "7_of_spades",
    "8_of_spades",
    "9_of_spades",
    "10_of_spades",
    "king_of_spades",
    "queen_of_spades",
    "jack_of_spades",
    "ace_of_spades",
    "2_of_hearts",
    "3_of_hearts",
    "4_of_hearts",
    "5_of_hearts",
    "6_of_hearts",
    "7_of_hearts",
    "8_of_hearts",
    "9_of_hearts",
    "10_of_hearts",
    "king_of_hearts",
    "queen_of_hearts",
    "jack_of_hearts",
    "ace_of_hearts",
    "2_of_clubs",
    "3_of_clubs",
    "4_of_clubs",
    "5_of_clubs",
    "6_of_clubs",
    "7_of_clubs",
    "8_of_clubs",
    "9_of_clubs",
    "10_of_clubs",
    "king_of_clubs",
    "queen_of_clubs",
    "jack_of_clubs",
    "ace_of_clubs",
  ],
  cardsMap: {
    "2_of_diamonds": 2,
    "3_of_diamonds": 3,
    "4_of_diamonds": 4,
    "5_of_diamonds": 5,
    "6_of_diamonds": 6,
    "7_of_diamonds": 7,
    "8_of_diamonds": 8,
    "9_of_diamonds": 9,
    "10_of_diamonds": 10,
    king_of_diamonds: 10,
    queen_of_diamonds: 10,
    jack_of_diamonds: 10,
    ace_of_diamonds: [1, 11],
    "2_of_spades": 2,
    "3_of_spades": 3,
    "4_of_spades": 4,
    "5_of_spades": 5,
    "6_of_spades": 6,
    "7_of_spades": 7,
    "8_of_spades": 8,
    "9_of_spades": 9,
    "10_of_spades": 10,
    king_of_spades: 10,
    queen_of_spades: 10,
    jack_of_spades: 10,
    ace_of_spades: [1, 11],
    "2_of_hearts": 2,
    "3_of_hearts": 3,
    "4_of_hearts": 4,
    "5_of_hearts": 5,
    "6_of_hearts": 6,
    "7_of_hearts": 7,
    "8_of_hearts": 8,
    "9_of_hearts": 9,
    "10_of_hearts": 10,
    king_of_hearts: 10,
    queen_of_hearts: 10,
    jack_of_hearts: 10,
    ace_of_hearts: [1, 11],
    "2_of_clubs": 2,
    "3_of_clubs": 3,
    "4_of_clubs": 4,
    "5_of_clubs": 5,
    "6_of_clubs": 6,
    "7_of_clubs": 7,
    "8_of_clubs": 8,
    "9_of_clubs": 9,
    "10_of_clubs": 10,
    king_of_clubs: 10,
    queen_of_clubs: 10,
    jack_of_clubs: 10,
    ace_of_clubs: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const lossSound = new Audio("sounds/aww.mp3");

document.querySelector("#hit-button").addEventListener("click", blackjackHit);
document.querySelector("#deal-button").addEventListener("click", blackjackDeal);
document.querySelector("#stand-button").addEventListener("click", dealerLogic);

//functions

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnOver"] === true) {
    blackjackGame["turnOver"] = false;

    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-score").textContent = 0;
    document.querySelector("#dealer-score").textContent = 0;
    document.querySelector("#your-score").style.color = "white";
    document.querySelector("#dealer-score").style.color = "white";
    document.querySelector("#blackjack-message").textContent = "Let's Play";
    document.querySelector("#blackjack-message").style.color = "black";
    blackjackGame["isStand"] = false;
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 52);
  return blackjackGame["cards"][randomIndex];
}

function updateScore(card, activePlayer) {
  if (
    card === "ace_of_hearts" ||
    card === "ace_of_clubs" ||
    card === "ace_of_spades" ||
    card === "ace_of_diamonds"
  ) {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  if (blackjackGame["turnOver"] === false) {
    blackjackGame["isStand"] = true;

    while (
      DEALER["score"] < YOU["score"] &&
      blackjackGame["isStand"] === true
    ) {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
      await sleep(700);
    }
    showResult(computeWinner());
    blackjackGame["turnOver"] = true;
  }
}

function computeWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] == DEALER["score"]) {
      blackjackGame["draws"]++;
    }
  } else if (DEALER["score"] <= 21 && YOU["score"] > 21) {
    blackjackGame["losses"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }

  return winner;
}

function showResult(winner) {
  if ((blackjackGame["turnOver"] = true)) {
    let message, messageColor;
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You Lost";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You Drew";
      messageColor = "brown";
    }

    document.querySelector("#blackjack-message").textContent = message;
    document.querySelector("#blackjack-message").style.color = messageColor;
  }
}
