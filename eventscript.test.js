
const { JSDOM } = require("jsdom");
const { validateForm, tempData } = require("./eventscript");


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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
   
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-2";

    
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-2";

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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
   
    document.getElementById("first-name").value = "Jon";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-2";

    
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
    
    document.getElementById("first-name").value = "Jon";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-2";

    
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
    
    document.getElementById("first-name").value = "Jon";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test.@a";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-2";

   
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = false;
    document.getElementById("participant").value = "option-2";

   
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
 
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-1";

   
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;
    
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-1";

    
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

   
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-2";

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
    expect(tempData.participant).toBe("option-2");
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
        <option value="option-1">Select...</option>
        <option value="option-2">Option 2</option>
    </select>
`);

    global.document = dom.window.document;
    global.window = dom.window;

   
    document.getElementById("first-name").value = "John";
    document.getElementById("last-name").value = "Doe";
    document.getElementById("email").value = "test@example.com";
    document.getElementsByName("event-type")[0].checked = true;
    document.getElementById("participant").value = "option-2";

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
    expect(tempData.participant).toBe("option-2");
    });
    
    