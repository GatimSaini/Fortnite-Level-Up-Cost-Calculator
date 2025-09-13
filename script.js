let lastRawCost = 0; // store last unrounded cost

function calculate() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const desiredLevel = parseInt(document.getElementById("desiredLevel").value);
  const costText = document.getElementById("costText");
  const advanceText = document.getElementById("advanceText");
  const lvlText = document.getElementById("lvlText");
  const errorMsg = document.getElementById("errorMsg");
  const resultsBox = document.getElementById("resultsBox");
  const discountBox = document.getElementById("discountBox");
  const discountSwitch = document.getElementById("discountSwitch");

  // Reset previous results
  costText.textContent = "-";
  advanceText.textContent = "-";
  lvlText.textContent = "-";
  errorMsg.textContent = "";
  discountBox.style.display = "none";
  discountSwitch.checked = false;
  lastRawCost = 0;
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

  const levelDifference = (desiredLevel - currentLevel) + 1;

  if (levelDifference < 0) {
    errorMsg.textContent = "Desired level cannot be less than current level";
    errorMsg.style.animation = "shake 0.4s";
    setTimeout(() => errorMsg.style.animation = "", 400);
    return;
  }

  // Show results smoothly
  resultsBox.classList.add("show");

  if (levelDifference > 0 && levelDifference < 10) {
    costText.textContent = "0";
    advanceText.textContent = "0";
    lvlText.textContent = "N/A";
    lastRawCost = 0;
  } else {
    const cost = levelDifference * 5;      // unrounded cost
    lastRawCost = cost;                    // store unrounded cost
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

function toggleDiscount() {
  const discountBox = document.getElementById("discountBox");
  const discountText = document.getElementById("discountText");
  const discountSwitch = document.getElementById("discountSwitch");

  if (discountSwitch.checked && lastRawCost > 0) {
    // Use half of the unrounded cost, then round THAT result to nearest 100
    const discountedCost = Math.round((lastRawCost * 0.5) / 100) * 100;
    discountText.textContent = discountedCost;
    discountBox.style.display = "block";
  } else {
    discountBox.style.display = "none";
  }
}
