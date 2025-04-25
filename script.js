let financeData = JSON.parse(localStorage.getItem("financeData")) || [];

function updateUI() {
  let earned = 0, spent = 0, savings = 0;
  const earnedElem = document.getElementById("earned");
  const spentElem = document.getElementById("spent");
  const savingsElem = document.getElementById("savings");

  financeData.forEach(item => {
    if (item.type === "earned") earned += item.amount;
    if (item.type === "spent") spent += item.amount;
  });

  savings = earned + spent;

  earnedElem.textContent = earned.toFixed(2);
  spentElem.textContent = Math.abs(spent).toFixed(2);
  savingsElem.textContent = savings.toFixed(2);

  renderChart();
}

function addTransaction(event) {
  event.preventDefault();

  const name = document.getElementById("entryName").value;
  const amount = parseFloat(document.getElementById("entryAmount").value);
  const type = document.getElementById("entryType").value;

  if (!name || isNaN(amount)) return;

  financeData.push({ name, amount, type, date: new Date().toISOString() });
  localStorage.setItem("financeData", JSON.stringify(financeData));
  updateUI();
}

function renderChart() {
  const ctx = document.getElementById("financeChart").getContext("2d");

  const dailyData = {};
  financeData.forEach(entry => {
    const date = entry.date.split('T')[0];
    dailyData[date] = (dailyData[date] || 0) + entry.amount;
  });

  const labels = Object.keys(dailyData);
  const data = Object.values(dailyData);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Движение средств",
        data: data,
        borderColor: "#1e2a47",
        tension: 0.3,
        fill: false
      }]
    },
    options: {
      plugins: {
        annotation: {
          annotations: {
            coinImage: {
              type: 'image',
              image: new Image(),
              xValue: labels[labels.length - 1],
              yValue: data[data.length - 1],
              backgroundColor: 'yellow',
              width: 40,
              height: 40,
              imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRclMdJZu_fuKHY07rEhZa98Cp669S7Yq_T4wyb5LKx7Q&s' // Замени на ссылку на свою картинку монеты
            }
          }
        }
      }
    }
  });
}

document.getElementById("entryForm").addEventListener("submit", addTransaction);

updateUI();
