const { JSDOM } = require("jsdom");
const { validateForm, storeData, saveLocal, loadData, renderSummaryData, deleteVolunteerEntry } = require("./volunteer")

test("when inputs are correct, then the storeData object data matches the input data", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="volunteer-hours-tracker"></form>
    <input id="charity" />
    <input id="hours" />
    <input id="date" />
    <input id="rating" />
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("charity").value = "Ronald McDonald House";
    document.getElementById("hours").value = "7";
    document.getElementById("date").value = "2025-10-25";
    document.getElementById("rating").value = "5";

    if (validateForm()){
        storeData.charity = document.getElementById("charity").value;
        storeData.hours = document.getElementById("hours").value;
        storeData.date = document.getElementById("date").value;
        storeData.rating = document.getElementById("rating").value;
    }

    testData = {
        charity: "Ronald McDonald House",
        hours: "7",
        date: "2025-10-25",
        rating: "5"
    }

    expect(storeData).toStrictEqual(testData);
});

test("when inputs are correct, then validateForm returns true", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="volunteer-hours-tracker"></form>
    <input id="charity" />
    <input id="hours" />
    <input id="date" />
    <input id="rating" />
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("charity").value = "Ronald McDonald House";
    document.getElementById("hours").value = "7";
    document.getElementById("date").value = "2025-10-25";
    document.getElementById("rating").value = "5";

    const result = validateForm();

    expect(result).toBe(true);
});

test("when charity name is blank, then validateForm returns false thus failing", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="volunteer-hours-tracker"></form>
    <input id="charity" />
    <input id="hours" />
    <input id="date" />
    <input id="rating" />
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("charity").value = "";
    document.getElementById("hours").value = "7";
    document.getElementById("date").value = "2025-10-25";
    document.getElementById("rating").value = "5";

    const result = validateForm();

    expect(result).toBe(false);
})

test("when hours are set to zero or less, then validateForm returns false", () =>{
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="volunteer-hours-tracker"></form>
    <input id="charity" />
    <input id="hours" />
    <input id="date" />
    <input id="rating" />
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("charity").value = "Ronald McDonald House";
    document.getElementById("hours").value = "0";
    document.getElementById("date").value = "2025-10-25";
    document.getElementById("rating").value = "5";

    const result = validateForm();

    expect(result).toBe(false);
})

test("when date isn't set to anything, then validateForm returns false", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="volunteer-hours-tracker"></form>
    <input id="charity" />
    <input id="hours" />
    <input id="date" />
    <input id="rating" />
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("charity").value = "Ronald McDonald House";
    document.getElementById("hours").value = "3";
    document.getElementById("date").value = "";
    document.getElementById("rating").value = "5";

    const result = validateForm();

    expect(result).toBe(false);
})

test("when rating isn't in the 5 point range, then validateForm returns false", () =>{
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="volunteer-hours-tracker"></form>
    <input id="charity" />
    <input id="hours" />
    <input id="date" />
    <input id="rating" />
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("charity").value = "Ronald McDonald House";
    document.getElementById("hours").value = "3";
    document.getElementById("date").value = "2025-10-25";
    document.getElementById("rating").value = "-1";

    const result = validateForm();

    expect(result).toBe(false);
})

test("check that the local storage saving functionality works as intended, checking the length of the array pulled", () => {
    localStorage.clear()

    const testVolunteerData = [
        {"charity": "Charity One", "hours": 15, "date": "2025-05-02", "rating": 3},
        {"charity": "Charity Two", "hours": 7, "date": "2025-02-03", "rating": 2}
    ]

    saveLocal(testVolunteerData);

    let storedData = loadData()
    expect(storedData.length).toBe(2)
})

test("check to see that the table updates properly when localstorage saves the data provided", () => {
    localStorage.clear()

    const testVolunteerData = [
        {"charity": "Charity One", "hours": 15, "date": "2025-05-02", "rating": 3},
        {"charity": "Charity Two", "hours": 7, "date": "2025-02-03", "rating": 2}
    ]

    saveLocal(testVolunteerData)

    const volunteerDataTable = document.querySelector('#volunteer-table tbody')
    expect(volunteerDataTable.children.length).toBe(2)
})

test("check to see that the volunteer hours are updating correctly with the function", () =>{
    localStorage.clear()

    const testVolunteerData = [
        {"charity": "Charity One", "hours": 15, "date": "2025-05-02", "rating": 3},
        {"charity": "Charity Two", "hours": 7, "date": "2025-02-03", "rating": 2}
    ]

    saveLocal(testVolunteerData)

    expect(renderSummaryData()).toBe(22)
})

test("check to see that delete button functions as intended, changing both the table and dataset", () => {
    localStorage.clear()

    const testVolunteerData = [
        {"charity": "Charity One", "hours": 15, "date": "2025-05-02", "rating": 3},
        {"charity": "Charity Two", "hours": 7, "date": "2025-02-03", "rating": 2}
    ]

    saveLocal(testVolunteerData)
    deleteVolunteerEntry(0)

    let updatedData = loadData()
    expect(updatedData.length).toBe(1)

    const volunteerDataTable = document.querySelector('#volunteer-table tbody')
    expect(volunteerDataTable.children.length).toBe(1)
})

test("check to see that the volunteer hours update when a record is deleted", () => {
    localStorage.clear()

    const testVolunteerData = [
        {"charity": "Charity One", "hours": 15, "date": "2025-05-02", "rating": 3},
        {"charity": "Charity Two", "hours": 7, "date": "2025-02-03", "rating": 2},
        {"charity": "Charity Three", "hours": 9, "date": "2025-01-07", "rating": 5}
    ]

    saveLocal(testVolunteerData)
    deleteVolunteerEntry(0)

    expect(renderSummaryData()).toBe(16)
})

