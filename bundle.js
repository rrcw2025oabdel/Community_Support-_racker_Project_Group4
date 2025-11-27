(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        showInputError(charityName, "Please enter a charity name")
        isValid = false;
    }

    // Validator for the Hours Volunteered number input
    if (volunteerHours.value <= 0) {
        showInputError(volunteerHours, "Value must be higher than zero")
        isValid = false;
    }

    // Validator for the Volunteering Date Field
    const dateCheck = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateCheck.test(dateVolunteered.value)){
        showInputError(dateVolunteered, "Please select a date");
        isValid = false;
    }

    // Validator for the 1-5 point rating of the volunteering experience
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
form.addEventListener("submit", (event) =>{
    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages) {
        el.remove();
    }

    event.preventDefault();

    if (validateForm()) {
        let storeData = {
            charity: charityName.value, 
            hours: volunteerHours.value, 
            date: dateVolunteered.value, 
            rating: volunteerRating.value
        };
        form.submit();
        console.log(storeData)
        console.log("success!!")
    } else {
        console.log("temp-fail")
    }
})
},{}]},{},[1]);
