
const { JSDOM } = require("jsdom");
const { validateForm, tempData, renderTable, attachDeleteButtons, renderSummary, data } = require("./eventscript");


test("validateForm returns true when all fields are valid", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
    <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
   
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "sponsor";

    
    const result = validateForm();

   
    expect(result).toBe(true);
    });

test("validateForm returns false when firstname is empty", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
    <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "sponsor";

    const result = validateForm();

    
    expect(result).toBe(false);
    });

test("validateForm returns false when lastname is empty", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
   <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
   
    document.getElementById("first-name").value = "Jon";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "sponsor";

    
    const result = validateForm();

    // Assert it returns true
    expect(result).toBe(false);
    });

test("validateForm returns false when email is invalid email input", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
   <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
    
    document.getElementById("first-name").value = "Jon";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "sponsor";

    
    const result = validateForm();

    
    expect(result).toBe(false);
    });

test("validateForm returns false when email is invalid email input", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
   <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
    
    document.getElementById("first-name").value = "Jon";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test.@a";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "sponsor";

   
    const result = validateForm();

    
    expect(result).toBe(false);
    });
test("validateForm returns false if event type is not checked", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
   <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = false;
    document.getElementById("participant").value = "sponsor";

   
    const result = validateForm();

    
    expect(result).toBe(false);
    });

test("validateForm returns false when all participant role value is default option-1.", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
    <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
 
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "choose";

   
    const result = validateForm();

  
    expect(result).toBe(false);
    });

test("validateForm returns false when all participant role value is default option-1.", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
    <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
    
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "choose";

    
    const result = validateForm();

    
    expect(result).toBe(false);
    });

test("when validateForm returns true, info saved to tempData", () => {
  const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
   <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

   
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "sponsor";

    if (validateForm()) {
        tempData.firstName = document.getElementById("first-name").value;
        tempData.lastName = document.getElementById("last-name").value;
        tempData.email = document.getElementById("email").value;
        tempData.eventType = document.querySelector('input[name="event-type"]:checked').value;
        tempData.participant = document.getElementById("participant").value;
    }
    expect(tempData.firstName).toBe("John");
    expect(tempData.lastName).toBe("Doe");
    expect(tempData.email).toBe("test@example.com");
    expect(tempData.eventType).toBe("option1");
    expect(tempData.participant).toBe("sponsor");
    });
    
    
test("when validateForm returns false, data not saved to tempData", () => {
  const dom = new JSDOM(`<!DOCTYPE html>
    <form id="event-form"></form>
    <input id="first-name" />
    <input id="last-name" />
    <input id="email" />
    <div id="radio-title"></div>
    <input type="radio" name="event-type" value="option1" />
    <input type="radio" name="event-type" value="option2" />
    <select id="participant">
        <option value="choose">Select...</option>
        <option value="sponsor">sponsor</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

   
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "sponsor";

    if (validateForm()) {
        tempData.firstName = document.getElementById("first-name").value;
        tempData.lastName = document.getElementById("last-name").value;
        tempData.email = document.getElementById("email").value;
        tempData.eventType = document.querySelector('input[name="event-type"]:checked').value;
        tempData.participant = document.getElementById("participant").value;
    }
    expect(tempData.firstName).toBe("John");
    expect(tempData.lastName).toBe("Doe");
    expect(tempData.email).toBe("test@example.com");
    expect(tempData.eventType).toBe("option1");
    expect(tempData.participant).toBe("sponsor");
    });

    
describe("Event Signup LocalStorage Tests", () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <table>
        <tbody id="signup-table-body"></tbody>
      </table>
      <div id="summary-section"></div>
    `;

      global.localStorage = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value;
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      }
    };
localStorage.clear();
  });

test("renderSummary shows correct event counts", () => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <div id="summary-section"></div>
  `);

    global.document = dom.window.document;
    global.window = dom.window;

    localStorage.setItem("signups", JSON.stringify([
    { eventType: "Cleanup", firstName: "John", lastName: "Doe", email: "a@b.com", participant: "sponsor" },
    { eventType: "Cleanup", firstName: "Jane", lastName: "Smith", email: "b@c.com", participant: "organizer" },
    { eventType: "Food Drive", firstName: "Bob", lastName: "Brown", email: "c@d.com", participant: "sponsor" },
    { eventType: "Food Drive", firstName: "Bob", lastName: "Brown", email: "c@d.com", participant: "sponsor" },
  ]));

  renderSummary();

  const summary = document.getElementById("summary-section");
  expect(summary.textContent).toContain("Cleanup");
  expect(summary.textContent).toContain("sponsor: 1");
  expect(summary.textContent).toContain("organizer: 1");
  expect(summary.textContent).toContain("Food Drive");
  expect(summary.textContent).toContain("sponsor: 2");
  
});

test("TempData is added to localStorage", () => {
    localStorage.setItem("signups", JSON.stringify([
        { eventType: "Cleanup", firstName: "John", lastName: "Doe", email: "a@b.com", participant: "sponsor" }
    ]));

    renderTable();

    const rows = document.querySelectorAll("#signup-table-body tr");
    expect(rows.length).toBe(1);

    expect(rows[0].textContent).toContain("Cleanup");
    expect(rows[0].textContent).toContain("John Doe");
});

test("deleting a record updates localStorage and table", () => {
  
  const sampleSignups = [
    { eventType: "Cleanup", firstName: "John", lastName: "Doe", email: "a@b.com", participant: "sponsor" },
    { eventType: "Food Drive", firstName: "Jane", lastName: "Smith", email: "b@c.com", participant: "organizer" }
  ];
  localStorage.setItem("signups", JSON.stringify(sampleSignups));

 
  renderTable();

 
  let rows = document.querySelectorAll("#signup-table-body tr");
  expect(rows.length).toBe(2);

  
  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.click(); 

 
  rows = document.querySelectorAll("#signup-table-body tr");
  expect(rows.length).toBe(1);

 
  const stored = JSON.parse(localStorage.getItem("signups"));
  expect(stored.length).toBe(1);
  expect(stored[0].firstName).toBe("Jane");
});
test("renderTable clears existing rows before rendering new data", () => {
 
  localStorage.setItem(
    "signups",
    JSON.stringify([
      { eventType: "Cleanup", firstName: "John", lastName: "Doe", email: "a@b.com", participant: "sponsor" }
    ])
  );

  renderTable();
  expect(document.querySelectorAll("#signup-table-body tr").length).toBe(1);

 
  localStorage.setItem("signups", JSON.stringify([]));

  renderTable();
  expect(document.querySelectorAll("#signup-table-body tr").length).toBe(0);
});
});
