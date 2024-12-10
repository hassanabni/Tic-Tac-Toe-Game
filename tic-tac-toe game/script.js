

let boxes = document.querySelectorAll('.btn');
let reset = document.querySelector('#reset-btn');
let msgContainer = document.querySelector('.msg-container');
let NewGameBtn = document.querySelector(".new-game-btn");
let msg = document.querySelector(".msg");

let turnO = true; // Player O starts
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Resets the game
function resetGame() {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  NewGameBtn.classList.add("hide");
}

// To handle each box click
boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (turnO) {
      box.innerText = 'O';
    } else {
      box.innerText = 'X';
    }
    box.classList.add('disabled'); // Adds a custom class for disabled styling
    box.style.pointerEvents = 'none'; // Prevent further clicks on this box
    turnO = !turnO; // Switch turn
    checkWinner(); // Check if there’s a winner or draw
  });
});

// Disables all boxes after a win or draw
function disableBoxes() {
  boxes.forEach(box => {
    box.style.pointerEvents = 'none';
  });
}

// Enables all boxes to start a new game
function enableBoxes() {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove('disabled');
    box.style.pointerEvents = 'auto';
  });
}

// Shows the winner message
function showWinner(winner) {
  msg.innerText = `Congratulations! The winner is ${winner}.`;
  msgContainer.classList.remove("hide");
  NewGameBtn.classList.remove("hide");
  disableBoxes();
}

// Checks for a winner or draw
function checkWinner() {
  let isDraw = true;

  for (let pattern of winPatterns) {
    let pos0Value = boxes[pattern[0]].innerText;
    let pos1Value = boxes[pattern[1]].innerText;
    let pos2Value = boxes[pattern[2]].innerText;

    if (pos0Value && pos0Value === pos1Value && pos1Value === pos2Value) {
      showWinner(pos0Value);
      return;
    }

    // Check if there are any empty boxes for draw
    if (!pos0Value || !pos1Value || !pos2Value) {
      isDraw = false;
    }
  }

  // If all boxes are filled and no winner, it's a draw
  if (isDraw) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    NewGameBtn.classList.remove("hide");
  }
}

NewGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
