// Função para tratar o evento de mover o mouse sobre as células
function handleMouseMove(event) {
    const element = event.target;
    const table = document.getElementById("table");
  
    if (element && element.tagName === "TD" && table.contains(element)) {
      const form = document.getElementById("search");
      const searchInput = form.querySelector("input[data-js='search']");
      const tbody = table.querySelector("tbody[data-js='tbody']");
      const cells = Array.from(tbody.querySelectorAll("td"));
  
      const startCell = cells.find(cell => cell.dataset.jsX === searchInput.dataset.jsStartX && cell.dataset.jsY === searchInput.dataset.jsStartY);
      const endCell = element;
  
      const startX = parseInt(startCell.dataset.jsX);
      const startY = parseInt(startCell.dataset.jsY);
      const endX = parseInt(endCell.dataset.jsX);
      const endY = parseInt(endCell.dataset.jsY);
  
      let path = "";
  
      if (startX === endX) {
        const startYIndex = Math.min(startY, endY);
        const endYIndex = Math.max(startY, endY);
  
        for (let yIndex = startYIndex; yIndex <= endYIndex; yIndex++) {
          const cell = cells.find(cell => parseInt(cell.dataset.jsX) === startX && parseInt(cell.dataset.jsY) === yIndex);
          path += cell.textContent.trim();
          highlightCell(cell);
        }
      } else if (startY === endY) {
        const startXIndex = Math.min(startX, endX);
        const endXIndex = Math.max(startX, endX);
  
        for (let xIndex = startXIndex; xIndex <= endXIndex; xIndex++) {
          const cell = cells.find(cell => parseInt(cell.dataset.jsX) === xIndex && parseInt(cell.dataset.jsY) === startY);
          path += cell.textContent.trim();
          highlightCell(cell);
        }
      } else if (Math.abs(startX - endX) === Math.abs(startY - endY)) {
        const stepX = startX < endX ? 1 : -1;
        const stepY = startY < endY ? 1 : -1;
  
        let xIndex = startX;
        let yIndex = startY;
  
        while (xIndex !== endX && yIndex !== endY) {
          const cell = cells.find(cell => parseInt(cell.dataset.jsX) === xIndex && parseInt(cell.dataset.jsY) === yIndex);
          path += cell.textContent.trim();
          highlightCell(cell);
          xIndex += stepX;
          yIndex += stepY;
        }
  
        path += endCell.textContent.trim();
        highlightCell(endCell);
      }
  
      if (checkWord(searchInput.value, path)) {
        console.log("Palavra encontrada:", searchInput.value);
      }
    }
  }
  
  // Função para tratar o evento de clique do mouse nas células
  function handleMouseClick(event) {
    const element = event.target;
    const table = document.getElementById("table");
  
    if (element && element.tagName === "TD" && table.contains(element)) {
      const form = document.getElementById("search");
      const searchInput = form.querySelector("input[data-js='search']");
      const tbody = table.querySelector("tbody[data-js='tbody']");
      const cells = Array.from(tbody.querySelectorAll("td"));
  
      cells.forEach(cell => unhighlightCell(cell));
  
      searchInput.value = "";
      searchInput.dataset.jsStartX = "";
      searchInput.dataset.jsStartY = "";
  
      element.classList.add("highlight");
      searchInput.dataset.jsStartX = element.dataset.jsX;
      searchInput.dataset.jsStartY = element.dataset.jsY;
    }
  }
  
  // Função para inicializar o jogo
  function initializeGame() {
    const form = document.getElementById("search");
    const searchInput = form.querySelector("input[data-js='search']");
    const tbody = document.querySelector("tbody[data-js='tbody']");
    const cells = Array.from(tbody.querySelectorAll("td"));
  
    cells.forEach(cell => {
      cell.addEventListener("mousemove", handleMouseMove);
      cell.addEventListener("click", handleMouseClick);
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
  