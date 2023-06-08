// Função para verificar se a palavra está completa
function checkWord(word, path) {
    const wordArray = word.split("");
    const pathArray = path.split(",");
  
    if (wordArray.length !== pathArray.length) {
      return false;
    }
  
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] !== pathArray[i]) {
        return false;
      }
    }
  
    return true;
  }
  
  // Função para adicionar a classe de destaque à célula
  function highlightCell(element) {
    element.classList.add("highlight");
    element.style.backgroundColor = "#00ff55";
  }
  
  // Função para remover a classe de destaque da célula
  function unhighlightCell(element) {
    element.classList.remove("highlight");
    element.style.backgroundColor = "#d1fe41";
  }
  
  // Função para tratar o evento de clique ou toque na célula
  function handleCellEvent(event) {
    const element = event.target;
  
    if (element && element.tagName === "TD") {
      const form = document.getElementById("search");
      const searchInput = form.querySelector("input[data-js='search']");
      const path = searchInput.dataset.jsPath || "";
  
      if (path.includes(`${element.dataset.jsX},${element.dataset.jsY}`)) {
        // Se a célula já estiver selecionada, remover da palavra em construção
        const newPath = path.replace(`${element.dataset.jsX},${element.dataset.jsY},`, "");
        searchInput.dataset.jsPath = newPath;
        unhighlightCell(element);
      } else {
        // Adicionar a célula à palavra em construção
        const newPath = `${path}${element.dataset.jsX},${element.dataset.jsY},`;
        searchInput.dataset.jsPath = newPath;
        highlightCell(element);
      }
  
      const word = searchInput.value.trim().toLowerCase();
      const constructedPath = searchInput.dataset.jsPath.slice(0, -1);
      const pathArray = constructedPath.split(",");
      const table = document.getElementById("table");
      const cells = Array.from(table.querySelectorAll("td"));
  
      cells.forEach(cell => {
        if (pathArray.includes(`${cell.dataset.jsX},${cell.dataset.jsY}`)) {
          highlightCell(cell);
        } else {
          unhighlightCell(cell);
        }
      });
  
      if (checkWord(word, constructedPath)) {
        console.log("Palavra encontrada:", word);
      }
    }
  }
  
  // Função para inicializar o jogo
  function initializeGame() {
    const form = document.getElementById("search");
    const searchInput = form.querySelector("input[data-js='search']");
    const table = document.getElementById("table");
    const cells = Array.from(table.querySelectorAll("td"));
  
    cells.forEach(cell => {
      cell.addEventListener("click", handleCellEvent);
      cell.addEventListener("touchstart", handleCellEvent);
    });
  
    searchInput.addEventListener("input", function(event) {
      const value = event.target.value.trim().toLowerCase();
  
      cells.forEach(cell => {
        const text = cell.textContent.trim().toLowerCase();
  
        if (value !== "" && text.startsWith(value)) {
          cell.classList.add("highlight");
        } else {
          cell.classList.remove("highlight");
        }
      });
    });
  }
  
  // Chamar a função para inicializar o jogo
  initializeGame();
  