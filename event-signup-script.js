function renderSummary() {
    const container = document.getElementById("summary-section");
    container.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("signups")) || [];
    
    const events = {};

    
    data.forEach(item => {
        if (!events[item.eventType]) {
            events[item.eventType] = {};
        }
        if (!events[item.eventType][item.participant]) {
            events[item.eventType][item.participant] = 0;
        }
        events[item.eventType][item.participant] += 1;
    });

 
    for (const event in events) {
        const eventDiv = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = event;
        eventDiv.appendChild(title);

        for (const participant in events[event]) {
            const p = document.createElement("p");
            p.textContent = `${participant}: ${events[event][participant]}`;
            eventDiv.appendChild(p);
        }

        container.appendChild(eventDiv);
    }
}

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

    attachDeleteHandlers(); 
}

function attachDeleteHandlers() {
    const buttons = document.querySelectorAll(".delete-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            const data = JSON.parse(localStorage.getItem("signups")) || [];
            data.splice(index, 1); 
            localStorage.setItem("signups", JSON.stringify(data));

            renderTable();    
            renderSummary();  
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    renderTable();
    renderSummary();
});
