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

// As the name implies, the form inputs will be validated to ensure data is correct.
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

// Event listening for Form Submission
if (typeof window !== undefined) {
    const form = document.getElementById("volunteer-hours-tracker")

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
            form.submit();

        } else {
            console.log("temp-fail")
        }
    });

} else {
    module.exports = { validateForm, storeData, showInputError };
}
