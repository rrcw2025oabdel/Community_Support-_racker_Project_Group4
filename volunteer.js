// Form obtained through DOM as a constant
const form = document.getElementById("volunteer-hours-tracker")

const charityName = document.getElementById("charity");
const volunteerHours = document.getElementById("hours");
const dateVolunteered = document.getElementById("date");
const volunteerRating = document.getElementById("rating");


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
    if (charityName.value === "") {
        isValid = false;
    }

    // Validator for the Hours Volunteered number input
    if (volunteerHours.value <= 0) {
        isValid = false;
    }

    // Validator for the Volunteering Date Field
    if (dateVolunteered.value === "") {

    }

    // Validator for the 1-5 point rating of the volunteering experience
    if (1 <= volunteerRating.value >= 5) {
        isValid = false;
    }

    return isValid;
}

// Event listening for Form Submission
form.addEventListener("submit", (event) =>{
    event.preventDefault();

    if (validateForm()) {
        let storeData = {charity: charityName.value, hours: volunteerHours.value, date: dateVolunteered.value, rating: volunteerRating.value};
        console.log(`Charity Name: ${storeData.charity}, Hours: ${storeData.hours}, Date: ${storeData.date}, Rating: ${storeData.rating}`);
        form.submit();
    } else {
        console.log("temp-fail")
    }
})