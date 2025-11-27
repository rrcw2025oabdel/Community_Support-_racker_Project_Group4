
/* Student Name : Abdelhamid OUGHANEM
Version : V 1.0.0 */

// Temporary object to store donations details
let donations = [];

// Clearing previous error messages
function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.remove();
    });
}

// Showing error message
function showError(input, message) {
    console.log('showError called for:', input.name, message);
    const errorText = document.createElement('p');
    errorText.classList.add('error-message'); 
    errorText.textContent = message;
    input.insertAdjacentElement('afterend', errorText);
}

// function that validate Date input field
function isValidDateFormat(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
}

// function that validate inputs after submission button clicked 
function handleDonationSubmit(event) {
    event.preventDefault(); 

    const form = event.target;
    clearErrors(form); 

    // Collecting form data into an object
    const formData = {
    charityName: form.elements.charityName.value.trim(),
    donationAmount: form.elements.donationAmount.value.trim(),
    donationDate: form.elements.donationDate.value,
    donorMessage: form.elements.donorMessage.value.trim(),
    };

    let isValid = true; 
    console.log('Validating date:', formData.donationDate, form.elements['donationDate'].value);
    // Validating Charity Name
    if (!formData.charityName) {
        showError(form.elements['charityName'], "Charity name is required.");
        isValid = false;
    }

    // Validating Donation Amount
    if (formData.donationAmount === "") {     
    showError(form.elements['donationAmount'], "Donation amount is required.");
    isValid = false;

    } else if (isNaN(formData.donationAmount)) {  
    showError(form.elements['donationAmount'], "Please enter numbers only.");
    isValid = false;

    } else if (Number(formData.donationAmount) <= 0) {  
    showError(form.elements['donationAmount'], "Amount must be positive.");
    isValid = false;
    }

    // Validate Date
    if (formData.donationDate.trim() === "" || !isValidDateFormat(formData.donationDate)) {
    showError(form.elements['donationDate'], "Please enter a valid donation date in YYYY-MM-DD format.");
    isValid = false;
}

    if (!isValid) {
        return;
    }

    donations.push(formData);

    // Displaying data temporary in the console 
    console.log(
  `Donation added: ${formData.charityName} - $${formData.donationAmount} on ${formData.donationDate}` + 
  (formData.donorMessage ? ` | Comment: ${formData.donorMessage}` : '')
);

    form.reset();
}

// Attaching event listener to the form
function attachFormListener() {
    const form = document.getElementById('donationForm');
    if (form) {
        form.addEventListener('submit', handleDonationSubmit);
    }
}


if (typeof window !== "undefined") {
    window.onload = attachFormListener;
}

module.exports = { donations, isValidDateFormat, showError, handleDonationSubmit };

