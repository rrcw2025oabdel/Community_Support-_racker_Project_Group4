

function renderTable() {
    const tableBody = document.getElementById("signup-table-body");
    tableBody.innerHTML = ""; 

    const data = JSON.parse(localStorage.getItem("signups")) || [];

    data.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.eventType}</td>
            <td>${item.firstName} ${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.participant}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}