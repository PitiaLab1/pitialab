const form = document.querySelector('[data-js="form"]');
const search = document.querySelector('[data-js="search"]');
const tbody = document.querySelector('[data-js="tbody"]');
const message = document.querySelector('[data-js="message"]');
const popup = document.getElementById("popup");
const popupCloseButton = document.querySelector(".popup-btn");
let counter = 0;
let selectedCells = [];

const gameWords = [
  "pitia",
  "casarao",
  "araripe",
  "cultura",
  "historia",
  "museu",
];

const letters = [
  ["w", "s", "p", "i", "t", "i", "a", "o", "i", "v"],
  ["v", "a", "l", "p", "a", "m", "u", "s", "e", "u"],
  ["u", "t", "a", "g", "b", "a", "n", "a", "o", "i"],
  ["u", "c", "a", "s", "a", "r", "a", "o", "u", "b"],
  ["a", "l", "c", "o", "g", "e", "e", "u", "a", "r"],
  ["c", "u", "l", "t", "u", "r", "a", "p", "l", "a"],
  ["z", "b", "a", "s", "s", "n", "o", "r", "i", "s"],
  ["n", "a", "r", "a", "r", "i", "p", "e", "b", "e"],
  ["g", "h", "i", "s", "t", "o", "r", "i", "a", "v"],
  ["f", "p", "e", "q", "t", "a", "m", "l", "o", "j"],
];

const lines = letters.map((item, index) =>
  document.querySelector(`[data-js="line${index}"]`)
);

// Preenche a tabela com as letras
letters.forEach(function (item, index) {
  letters[index].forEach(function (item) {
    lines[index].innerHTML += `<td>${item}</td>`;
  });
});

const indexes = [
  [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ],
  [
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ],
  [
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [7, 7],
  ],
  [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
  ],
  [
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 6],
    [8, 7],
    [8, 8],
  ],
  [
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
  ],
];

const directions = [
  [0, 1], // direita
  [1, 0], // baixo
  [1, 1], // diagonal baixo-direita
  [-1, 1], // diagonal cima-direita
];

// Função para verificar se a palavra está correta
function checkWord() {
  const word = search.value.toLowerCase();

  if (gameWords.includes(word)) {
    message.textContent = `Palavra encontrada: ${word}`;
    message.classList.remove("error");
    message.classList.add("success");
    counter++;
    if (counter === gameWords.length) {
      popup.classList.add("active");
    }
  } else {
    message.textContent = "Palavra não encontrada";
    message.classList.remove("success");
    message.classList.add("error");
  }
}

// Função para limpar a seleção de células
function clearSelection() {
  selectedCells.forEach((cell) => {
    cell.classList.remove("selected");
  });
  selectedCells = [];
}

// Função para selecionar células arrastadas
function selectCells(startCell, endCell) {
  const startRowIndex = parseInt(startCell.parentElement.getAttribute("data-index"));
  const startCellIndex = parseInt(startCell.getAttribute("data-index"));
  const endRowIndex = parseInt(endCell.parentElement.getAttribute("data-index"));
  const endCellIndex = parseInt(endCell.getAttribute("data-index"));

  const direction = [
    Math.sign(endRowIndex - startRowIndex),
    Math.sign(endCellIndex - startCellIndex),
  ];

  let rowIndex = startRowIndex;
  let cellIndex = startCellIndex;
  let currentCell = lines[rowIndex].children[cellIndex];

  while (currentCell && currentCell !== endCell) {
    selectedCells.push(currentCell);
    currentCell.classList.add("selected");
    rowIndex += direction[0];
    cellIndex += direction[1];
    currentCell = lines[rowIndex].children[cellIndex];
  }

  selectedCells.push(currentCell);
  currentCell.classList.add("selected");
}

// Função para lidar com o evento de arrastar o dedo sobre as células
function handleCellDrag(event) {
  const cell = event.target;

  if (cell.tagName === "TD") {
    if (!selectedCells.length || selectedCells.includes(cell)) {
      selectedCells.push(cell);
      cell.classList.add("selected");
    } else {
      clearSelection();
      selectedCells.push(cell);
      cell.classList.add("selected");
    }
  }
}

// Função para lidar com o evento de soltar o dedo
function handleCellDrop(event) {
  const cell = event.target;

  if (cell.tagName === "TD") {
    if (selectedCells.length > 1 && selectedCells.includes(cell)) {
      const startCell = selectedCells[0];
      const endCell = selectedCells[selectedCells.length - 1];

      selectCells(startCell, endCell);
      checkWord();
    } else {
      clearSelection();
    }
  }
}

// Adiciona os ouvintes de eventos de arrastar e soltar às células
lines.forEach((line) => {
  line.addEventListener("mousedown", handleCellDrag);
  line.addEventListener("mouseover", handleCellDrag);
  line.addEventListener("mouseup", handleCellDrop);
});

// Adiciona o ouvinte de evento de clique ao botão de busca
searchBtn.addEventListener("click", checkWord);