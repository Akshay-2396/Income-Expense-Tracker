let entries = JSON.parse(localStorage.getItem("entries")) || [];

    function updateDisplay() {
      const list = document.getElementById("entryList");
      const filter = document.querySelector('input[name="filter"]:checked').value;
      list.innerHTML = "";

      let income = 0, expense = 0;

      entries.forEach((entry, index) => {
        if (filter === "all" || filter === entry.type) {
          const li = document.createElement("li");
          li.className = "flex justify-between items-center bg-gray-200 p-2 rounded";

          li.innerHTML = `
            <span>${entry.description} - \u20b9 ${entry.amount} (${entry.type})</span>
            <div class="space-x-2">
              <button onclick="editEntry(${index})" class="text-blue-600">Edit</button>
              <button onclick="deleteEntry(${index})" class="text-red-600">Delete</button>
            </div>
          `;
          list.appendChild(li);
        }

        if (entry.type === "income") income += Number(entry.amount);
        else expense += Number(entry.amount);
      });

      document.getElementById("totalIncome").textContent = `\u20b9 ${income}`;
      document.getElementById("totalExpense").textContent = `\u20b9 ${expense}`;
      document.getElementById("netBalance").textContent = `\u20b9 ${income - expense}`;
    }

    function addEntry() {
      const description = document.getElementById("descInput").value.trim();
      const amount = parseFloat(document.getElementById("amountInput").value);
      const type = document.getElementById("typeInput").value;

      if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
      }

      entries.push({ description, amount, type });
      localStorage.setItem("entries", JSON.stringify(entries));
      updateDisplay();
      resetForm();
    }

    function resetForm() {
      document.getElementById("descInput").value = "";
      document.getElementById("amountInput").value = "";
      document.getElementById("descInput").focus(); 

      
      document.querySelector('input[value="all"]').checked = true;

      updateDisplay();
    }

    function filterEntries() {
      updateDisplay();
    }

    function deleteEntry(index) {
      entries.splice(index, 1);
      localStorage.setItem("entries", JSON.stringify(entries));
      updateDisplay();
    }

    function editEntry(index) {
      const entry = entries[index];
      document.getElementById("descInput").value = entry.description;
      document.getElementById("amountInput").value = entry.amount;
      document.getElementById("typeInput").value = entry.type;
      entries.splice(index, 1); 
    }

    updateDisplay();