function calculate() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const desiredLevel = parseInt(document.getElementById("desiredLevel").value);
  const costText = document.getElementById("costText");
  const advanceText = document.getElementById("advanceText");
  const lvlText = document.getElementById("lvlText");
  const errorMsg = document.getElementById("errorMsg");
  const resultsBox = document.getElementById("resultsBox");

  // Reset previous results
  costText.textContent = "-";
  advanceText.textContent = "-";
  lvlText.textContent = "-";
  errorMsg.textContent = "";
  resultsBox.classList.remove("show");

  if (isNaN(currentLevel) || isNaN(desiredLevel) || currentLevel === 0 || desiredLevel === 0) {
    errorMsg.textContent = "Please enter both current and desired levels";
    errorMsg.style.animation = "shake 0.4s";
    setTimeout(() => errorMsg.style.animation = "", 400);
    return;
  }

  if (currentLevel < 0 || desiredLevel < 0) {
    errorMsg.textContent = "Levels cannot be negative";
    errorMsg.style.animation = "shake 0.4s";
    setTimeout(() => errorMsg.style.animation = "", 400);
    return;
  }

  const levelDifference = desiredLevel - currentLevel;

  if (levelDifference < 0) {
    errorMsg.textContent = "Desired level cannot be less than current level";
    errorMsg.style.animation = "shake 0.4s";
    setTimeout(() => errorMsg.style.animation = "", 400);
    return;
  }

  // Show results smoothly
  resultsBox.classList.add("show");

  if (levelDifference > 0 && levelDifference <= 7) {
    costText.textContent = "0";
    advanceText.textContent = "0";
    lvlText.textContent = "N/A";
  } else {
    const cost = levelDifference * 7;
    const roundedCost = Math.round(cost / 100) * 100;
    costText.textContent = roundedCost;

    if (roundedCost >= 1000) {
      const advance = cost * 0.2;
      const roundedAdvance = Math.round(advance / 100) * 100;
      const lvl = roundedAdvance / 5;
      advanceText.textContent = roundedAdvance;
      lvlText.textContent = lvl;
    } else {
      advanceText.textContent = "0";
      lvlText.textContent = "N/A";
    }
  }
}
