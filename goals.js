let goals = JSON.parse(localStorage.getItem("goals")) || [];

function addGoal(event) {
  event.preventDefault();
  const goalName = document.getElementById("goalName").value;
  const goalAmount = parseFloat(document.getElementById("goalAmount").value);

  if (!goalName || isNaN(goalAmount)) return;

  goals.push({ name: goalName, amount: goalAmount });
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

function renderGoals() {
  const list = document.getElementById("goalsList");
  list.innerHTML = "";

  goals.forEach(goal => {
    const li = document.createElement("li");
    li.textContent = `${goal.name}: ${goal.amount}€`;
    list.appendChild(li);
  });
}

document.getElementById("goalForm").addEventListener("submit", addGoal);
renderGoals();
