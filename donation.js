
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
        charityName: form.charityName.value.trim(),
        donationAmount: form.donationAmount.value.trim(),
        donationDate: form.donationDate.value,
        donorMessage: form.donorMessage.value.trim(),
    };

    let isValid = true; 

    // Validating Charity Name
    if (!formData.charityName) {
        showError(form.charityName, "Charity name is required.");
        isValid = false;
    }

    // Validating Donation Amount
    if (formData.donationAmount === "") {     
    showError(form.donationAmount, "Donation amount is required.");
    isValid = false;

    } else if (isNaN(formData.donationAmount)) {  
    showError(form.donationAmount, "Please enter numbers only.");
    isValid = false;

    } else if (Number(formData.donationAmount) <= 0) {  
    showError(form.donationAmount, "Amount must be positive.");
    isValid = false;
    }

    // Validate Date
    if (!formData.donationDate || !isValidDateFormat(formData.donationDate)) {
    showError(form.donationDate, "Please enter a valid donation date in DD-MM-YYY format.");
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
document.getElementById('donationForm').addEventListener('submit', handleDonationSubmit);