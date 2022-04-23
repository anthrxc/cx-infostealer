const enquirer = require("enquirer");
const { readFileSync, writeFileSync, closeSync } = require("fs");
const path = require("path");

module.exports.password = async () => {
    const url = await enquirer.prompt({
        name: "url",
        type: "input",
        message: "What website is this password for? (URL)"
    });

    const username = await enquirer.prompt({
        name: "username",
        type: "input",
        message: "What is the username?"
    });

    const password = await enquirer.prompt({
        name: "password",
        type: "input",
        message: "What is the password?"
    });

    const data = {
        url: url.url,
        username: username.username,
        password: password.password
    };

    // Read the file so that we can append the new password (I dont know how else to do this)
    let passwords = readFileSync(path.join(__dirname, "../data/passwords.json"), { encoding: "utf-8" });
    const pass = JSON.parse(passwords);
    
    // stores element names ("_0", "_1", "_2", etc.), so when I append a new password,
    // I take the last element and increment the number by 1 (so if the last element is "_0", the next element will be "_1")
    let elem = [];

    // stores the element names in the "elem" array
    for(let prop in pass) {
        elem.push(prop);
    };

    // if there are no stored passwords, then we know that the element name is "_0", so we write the password to the file accordingly
    // and we don't need to append the element, instead we just create the file contents
    if (elem.length === 0) {
        writeFileSync(path.join(__dirname, "../data/passwords.json"), JSON.stringify({ "_0": data  }), { encoding: "utf-8" });
    }
    else {
        // if there are stored passwords, then we take the last element name in the "elem" array and increment the number by 1
        let name = elem.pop();
        let num = parseInt(name.slice(1));
        let newData = JSON.stringify({ [`_${num + 1}`]: data });

        passwords = JSON.parse(JSON.stringify(passwords));

        // replace the open brace ("{") with a comma (",")
        newData = newData.replace("{", ",");

        // remove the last character in the string (because it's JSON we know that it will ALWAYS be a closing brace ("}")
        passwords = passwords.slice(0, -1);
        
        // append the new password to the file
        passwords = passwords.concat(newData);

        // write the file with the new password
        writeFileSync(path.join(__dirname, "../data/passwords.json"), passwords, { encoding: "utf-8" });
    };

    // Close the file
    closeSync(0);
};