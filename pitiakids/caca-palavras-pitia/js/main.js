document.addEventListener("DOMContentLoaded", () => {

  const $form = document.querySelector('[data-js="form"]');
  const $search = document.querySelector('[data-js="search"]');
  const $tbody = document.querySelector('[data-js="tbody"]');
  const $message = document.querySelector('[data-js="message"]');
  const $newGameButton = document.querySelector('[data-js="new-game-button"]');

  let counter = 0;

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

  const lines = letters.map(function (item, index) {
    return document.querySelector(`[data-js="line${index}"]`);
  });

  letters.forEach(function (item, index) {
    letters[index].forEach(function (item) {
      lines[index].insertAdjacentHTML("beforeend", `<td>${item}</td>`);
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

  function getIndex(name) {
    if (gameWords.indexOf(name) > -1) {
      const i = gameWords.indexOf(name);
      return indexes[i];
    }

    $search.value = "";

    return false;
  }

  $form.addEventListener("submit", function (event) {
    event.preventDefault();
    const valueSearch = $search.value;
    const getIndexes = getIndex(valueSearch);
    if (getIndexes) {
      for (let i = 0; i < getIndexes.length; i++) {
        selectTd(getIndexes[i][0], getIndexes[i][1]);
      }
      counter++;
      alert(counter)
      if (counter == 6) {
        document.getElementById("popup").classList.add("active");
        document.getElementById("popup").addEventListener("click", () => {
          document.getElementById("popup").classList.remove("active");
        });
      }
    }
  });

  function selectTd(line, column) {
    const tr = $tbody.children[line];
    const td = tr.children[column];
    td.classList.add("color");
    td.style.backgroundColor = "#00ff55";
    $search.value = "";

    const foundWords = Array.from($tbody.querySelectorAll(".color")).map(
      function (td) {
        return td.innerText;
      }
    );

    const allWordsFound = gameWords.every(function (word) {
      return foundWords.includes(word);
    });
  }

  function restartGame() {
    Array.from($tbody.querySelectorAll("td")).forEach(function (td) {
      td.classList.remove("color");
    });
  }
});
