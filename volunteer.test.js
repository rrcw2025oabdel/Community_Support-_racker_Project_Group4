const { JSDOM } = require("jsdom");
const { validateForm, storeData } = require("./volunteer")

test("when inputs are correct, then validateForm returns true thus updating the temporary data object", () => {
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

    expect(storeData.charity).toBe("Ronald McDonald House");
    expect(storeData.hours).toBe("7");
    expect(storeData.date).toBe("2025-10-25");
    expect(storeData.rating).toBe("5");
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


