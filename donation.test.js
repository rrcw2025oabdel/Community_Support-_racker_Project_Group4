/* Student Name : Abdelhamid OUGHANEM
Version : V 1.0.0 */

/**
 * @jest-environment jsdom
 */

const { donations, handleDonationSubmit } = require("./donation");
// test setup
describe("Donation Form Integration Test", () => {

  beforeEach(() => {
    donations.length = 0;

    document.body.innerHTML = `
      <form id="donationForm">
        <input type="text" name="charityName" />
        <input type="text" name="donationAmount" />
        <input type="text" name="donationDate" />
        <textarea name="donorMessage"></textarea>
      </form>
    `;
  });

  // Integration test 1 : testing that Valid Submission adds donation to donations array 
  test("Submitting valid form data adds donation to donations array", () => {
    const form = document.getElementById("donationForm");

    const charityNameInput = form.querySelector('input[name="charityName"]');
    const donationAmountInput = form.querySelector('input[name="donationAmount"]');
    const donationDateInput = form.querySelector('input[name="donationDate"]');
    const donorMessageInput = form.querySelector('textarea[name="donorMessage"]');

    charityNameInput.value = "red river";
    donationAmountInput.value = "2000";
    donationDateInput.value = "2025-11-25";
    donorMessageInput.value = "good bless you!";

    const testEvent = {
      preventDefault: () => {},
      target: form,
    };

    handleDonationSubmit(testEvent);

    expect(donations.length).toBe(1);
    expect(donations[0]).toEqual({
      charityName: "red river",
      donationAmount: "2000",
      donationDate: "2025-11-25",
      donorMessage: "good bless you!",
    });
  });

  // Integration test 2 : testing that invalid Submission display error in the DOM 
  test("Submitting invalid or incomplete form data displays validation errors in the DOM", () => {
    const form = document.getElementById("donationForm");

    const charityNameInput = form.querySelector('input[name="charityName"]');
    const donationAmountInput = form.querySelector('input[name="donationAmount"]');
    const donationDateInput = form.querySelector('input[name="donationDate"]');
    const donorMessageInput = form.querySelector('textarea[name="donorMessage"]');

    charityNameInput.value = "";
    donationAmountInput.value = "Abdel";
    donationDateInput.value = "";
    donorMessageInput.value = "";

    const testEvent = {
      preventDefault: () => {},
      target: form,
    };

    handleDonationSubmit(testEvent);

    expect(donations.length).toBe(0);

    const errors = form.querySelectorAll(".error-message");
    expect(errors.length).toBeGreaterThanOrEqual(3);

    const errorTexts = Array.from(errors).map((el) => el.textContent);

    expect(errorTexts).toEqual(
      expect.arrayContaining([
        "Charity name is required.",
        "Please enter numbers only.",
        "Please enter a valid donation date in YYYY-MM-DD format."
      ])
    );
  });
});

// Unit test 1 : testing that Empty required fields are identified  
test("Identifies empty required fields (charity name, amount, date)", () => {
    // Creating DOM elements
    document.body.innerHTML = `
        <form id="donationForm">
            <input name="charityName" value="" />
            <input name="donationAmount" value="" />
            <input name="donationDate" value="" />
            <textarea name="donorMessage"></textarea>
        </form>
    `;

    const form = document.getElementById("donationForm");
    const event = { preventDefault: jest.fn(), target: form };

    handleDonationSubmit(event);

    // Getting all error messages
    const errors = form.querySelectorAll(".error-message");
    const errorTexts = Array.from(errors).map(e => e.textContent);

    // verifying specific error messages are returned
    expect(errorTexts).toEqual(
        expect.arrayContaining([
            "Charity name is required.",
            "Donation amount is required.",
            "Please enter a valid donation date in YYYY-MM-DD format."
        ])
    );

    expect(donations.length).toBe(0);
});

// Unit test 3 : testing that Valid data is processed correctly and temporary data object is returned
  test("Processes valid data and returns correct temporary data object", () => {
    // Creating form in DOM
    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" name="charityName" />
      <input type="text" name="donationAmount" />
      <input type="text" name="donationDate" />
      <textarea name="donorMessage"></textarea>
    `;
    document.body.appendChild(form);

    // Seting valid values
    form.elements.charityName.value = "Helping Hands";
    form.elements.donationAmount.value = "150";
    form.elements.donationDate.value = "2025-12-01";
    form.elements.donorMessage.value = "Keep up the good work!";

    const event = { preventDefault: jest.fn(), target: form };

    // Calling the submit handler
    handleDonationSubmit(event);

    // Checking donations array
    expect(donations.length).toBe(1);

    expect(donations[0]).toEqual({
      charityName: "Helping Hands",
      donationAmount: "150",
      donationDate: "2025-12-01",
      donorMessage: "Keep up the good work!"
    });

    // Checking that form was reset
    expect(form.elements.charityName.value).toBe("");
    expect(form.elements.donationAmount.value).toBe("");
    expect(form.elements.donationDate.value).toBe("");
    expect(form.elements.donorMessage.value).toBe("");

    // Clearing the DOM
    document.body.innerHTML = "";
});

// Unit test 4 : testing that Invalid donation amounts are flagged (non-numeric and negative)
test("Flags invalid donation amounts (non-numeric and negative)", () => {
    // Create a fresh form in DOM
    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" name="charityName" />
      <input type="text" name="donationAmount" />
      <input type="text" name="donationDate" />
      <textarea name="donorMessage"></textarea>
    `;
    document.body.appendChild(form);

    // Resetting donations array
    donations.length = 0;

    const charityInput = form.elements.charityName;
    const amountInput = form.elements.donationAmount;
    const dateInput = form.elements.donationDate;

    // Testing non-numeric amount
    charityInput.value = "red river";
    amountInput.value = "Abdel";  
    dateInput.value = "2025-11-25";

    let event = { preventDefault: jest.fn(), target: form };
    handleDonationSubmit(event);

    expect(donations.length).toBe(0);
    const errorsNonNumeric = form.querySelectorAll(".error-message");
    const errorTextsNonNumeric = Array.from(errorsNonNumeric).map(el => el.textContent);
    expect(errorTextsNonNumeric).toEqual(
        expect.arrayContaining(["Please enter numbers only."])
    );

    // Clearing errors before next test
    form.querySelectorAll(".error-message").forEach(e => e.remove());

    // Testing negative amount
    charityInput.value = "red river";
    amountInput.value = "-100";  
    dateInput.value = "2025-11-25";

    donations.length = 0; 
    event = { preventDefault: jest.fn(), target: form };
    handleDonationSubmit(event);

    expect(donations.length).toBe(0);
    const errorsNegative = form.querySelectorAll(".error-message");
    const errorTextsNegative = Array.from(errorsNegative).map(el => el.textContent);
    expect(errorTextsNegative).toEqual(
        expect.arrayContaining(["Amount must be positive."])
    );

    // Cleaning the DOM
    document.body.innerHTML = "";
});