/*
Javascript Form assignment 7 part 1
Paige Bender
November 20th, 2025
*/
const validateForm = () => {
        let isValid = true;
        const firstName = document.getElementById("first-name");

        if(firstName.value ===""){
            showInputError(firstName, "First name is required");
            isValid = false;
            console.error("first name must be filled out.");
        }

        const lastName = document.getElementById("last-name");

        if(lastName.value ===""){
            showInputError(lastName, "Last name is required");
            isValid = false;
            console.error("last name must be filled out.");
        }

        const emailInput = document.getElementById("email");
        const complexEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!complexEmailPattern.test(emailInput.value)){
            console.error("please enter complex email address");
            showInputError(emailInput, "Please enter a valid email address");
            isValid = false;
        }

        const selectRadio = document.getElementsByName("event-type");
        let isRadio = false;

        for (let i = 0; i < selectRadio.length; i++) {
            if (selectRadio[i].checked) {
                isRadio = true;
                break;
            }
        }
        if (!isRadio) {
            console.error("please select one option");
            showInputError(document.getElementById("radio-title"), "Please select one option");
            isValid = false;

        }
        
        const eventDropdown = document.getElementById("participant");
        if(eventDropdown.value ==="choose") {
            showInputError(eventDropdown, "An option must be selected");
            isValid = false;
            console.error("an option must be selected.");
        }
        
    return isValid;
    };

    const showInputError = (inputElement, message ) => {
        const errorDisplay = document.createElement("span");
        errorDisplay.innerText = message;
        errorDisplay.className = "error-message";
        errorDisplay.setAttribute("role", "alert");

        inputElement.parentElement.appendChild(errorDisplay);
    };
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
let tempData = {};

if (typeof window !== "undefined") {

    window.addEventListener("DOMContentLoaded", () => {
        renderTable();
        renderSummary();

        const form = document.getElementById("event-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const errorMessages = document.querySelectorAll(".error-message");
            for (const el of errorMessages) {
                el.remove();
            }

            if (validateForm()) {
                // form.submit();
                tempData = {
                    firstName: document.getElementById("first-name").value,
                    lastName: document.getElementById("last-name").value,
                    email: document.getElementById("email").value,
                    eventType: document.querySelector('input[name="event-type"]:checked').value,
                    participant: document.getElementById("participant").value
                };

                const stored = JSON.parse(localStorage.getItem("signups")) || [];
                stored.push(tempData);
                localStorage.setItem("signups", JSON.stringify(stored));

                window.location.href = "event-signup-table.html";

                console.log(tempData.firstName);
                console.log("validation successful");
            } else {
                console.log("validation not successful");
            }
        });
    }); 
} else {
    module.exports = { validateForm, tempData, showInputError, renderTable, attachDeleteHandlers, renderSummary };
}