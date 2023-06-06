document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  var $form = document.querySelector('[data-js="form"]');
  var $search = document.querySelector('[data-js="search"]');
  var $tbody = document.querySelector('[data-js="tbody"]');
  var $message = document.querySelector('[data-js="message"]');
  var $newGameButton = document.querySelector('[data-js="new-game-button"]');

  let counter = 0;

  function getIndex(name) {
    if (gameWords.indexOf(name) > -1) {
      var i = gameWords.indexOf(name);
      return indexes[i];
    }

    $search.value = "";

    return false;
  }

  var letters = [
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

  var lines = [];

  letters.map(function (item, index) {
    lines[index] = document.querySelector('[data-js="line' + index + '"]');
  });

  letters.forEach(function (item, index) {
    letters[index].forEach(function (item) {
      lines[index].insertAdjacentHTML("beforeend", "<td>" + item + "</td>");
    });
  });

  var indexes = [
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

  var gameWords = [
    "pitia",
    "casarao",
    "araripe",
    "cultura",
    "historia",
    "museu",
  ];

  $form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      var valueSearch = $search.value;
      var getIndexes = getIndex(valueSearch);
      if (getIndexes) {
        for (var i = 0; i < getIndexes.length; i++) {
          selectTd(getIndexes[i][0], getIndexes[i][1]);
        }
        counter++;
        console.log(counter);

        if (counter == 6) {
          document.getElementById("popup").classList.add("active");
          document.getElementById("popup").addEventListener("click", () => {
            document.getElementById("popup").classList.remove("active");
          });
        }
      }
    },
    false
  );

  function selectTd(line, column) {
    var tr = $tbody.children[line];
    var td = tr.children[column];
    td.classList.add("color");
    $search.value = "";

    var foundWords = Array.from($tbody.querySelectorAll(".color")).map(
      function (td) {
        return td.innerText;
      }
    );

    var allWordsFound = gameWords.every(function (word) {
      return foundWords.includes(word);
    });

    if (allWordsFound) {
      $message.style.display = "block"; // Exibe a mensagem de parabéns
      $newGameButton.style.display = "block";
      alert("Parabéns! Você concluiu o caça-palavras."); // Comentado, pois não é necessário exibir um alerta
    }
  }

  function restartGame() {
    Array.from($tbody.querySelectorAll("td")).forEach(function (td) {
      td.classList.remove("color");
    });
  }
});
