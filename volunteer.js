// Functions for storage
const saveLocal = (data) => {
    localStorage.setItem("volunteer_list", JSON.stringify(data));
}

const loadData = () => {
    return JSON.parse(localStorage.getItem("volunteer_list"));
}

// Function that handles displaying the error messages
const showInputError = (inputElement, message) => {
    const errorDisplay = document.createElement("span");
    errorDisplay.innerText = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role", "alert");

    inputElement.parentElement.appendChild(errorDisplay);
}

// Function used to render the table data using the localstorage
const renderDataTable = () => {
    const volunteerTable = document.querySelector('#volunteer-table tbody');
    let volunteerList = loadData() || [];

    volunteerTable.html = ""

    volunteerList.forEach((entry, current) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.charity}</td>
            <td>${entry.hours}</td>
            <td>${entry.date}</td>
            <td>${entry.rating}</td>
            <td>
                <button class="delete-volunteer" ${current}>Delete</button>
            </td>
        `;
        volunteerTable.appendChild(row)
    })    
};

// Function used to render the summary data section
const renderSummaryData = () =>  {
    const volunteerSummary = document.getElementById("summary-total")
    let volunteerList = loadData() || [];
    let total = 0;
    
    volunteerList.forEach((entry) => {
        total += parseInt(entry.hours)
        volunteerSummary.textContent = total;
    })
};

// The function that will be called to perform the form input validaitons
const validateForm = () =>{
    let isValid = true;

    // Validator for the Charity Name Text Field
    const charityName = document.getElementById("charity");

    if (charityName.value === "") {
        showInputError(charityName, "Please enter a charity name");
        isValid = false;
    }

    // Validator for the Hours Volunteered number input
    const volunteerHours = document.getElementById("hours");

    if (volunteerHours.value == 0) {
        showInputError(volunteerHours, "Value cannot be zero");
        isValid = false;
    } else if (volunteerHours.value < 0) {
        showInputError(volunteerHours, "Value cannot be negative.")
        isValid = false;
    } else if (volunteerHours.value === "") {
        showInputError(volunteerHours, "Cannot be blank")
        isValid = false;
    }

    // Validator for the Volunteering Date Field
    const dateVolunteered = document.getElementById("date");

    const dateCheck = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateCheck.test(dateVolunteered.value)){
        showInputError(dateVolunteered, "Please select a date");
        isValid = false;
    }

    // Validator for the 1-5 point rating of the volunteering experience
    const volunteerRating = document.getElementById("rating");

    if (1 > volunteerRating.value || volunteerRating.value > 5) {
        showInputError(volunteerRating, "Must be in the 1-5 range.");
        isValid = false;
    } else if (volunteerRating.value === "") {
        showInputError(volunteerRating, "Please select a rating");
        isValid = false;
    }

    return isValid;
}

if (typeof window !== undefined) {
    const form = document.getElementById("volunteer-hours-tracker");
    const volunteerTable = document.getElementById("volunteer-table");
    const volunteerSummary = document.getElementById("volunteer-summary")

    volunteerTable.style.display = "none";
    volunteerSummary.style.display = "none";

    // Event listening for Form Submission
    form.addEventListener("submit", (event) =>{
        const errorMessages = document.querySelectorAll(".error-message");
        for (const el of errorMessages) {
            el.remove();
        }

        event.preventDefault();

        if (validateForm()) {
            // Data storing in an object, then being inserted into the dataset array

            volunteer = {
                charity: document.getElementById("charity").value, 
                hours: document.getElementById("hours").value, 
                date: document.getElementById("date").value, 
                rating: document.getElementById("rating").value
            };
            
            const volunteerData = loadData() || [];
            volunteerData.push(volunteer);
            saveLocal(volunteerData);

            // Form Submission
            if (volunteerData.length > 0){
            volunteerSummary.style.display = 'block';
            volunteerTable.style.display = 'block';
            renderDataTable();
            renderSummaryData();
            form.reset();
            }

        } else {
            console.log("temp-fail");
        }
    });

} else {
    module.exports = { validateForm, storeData, showInputError };
}
