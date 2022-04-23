const { passwords, assignments } = require("./tables.js");
const { password, assignment } = require("./element.js");
const enquirer = require("enquirer");

module.exports = async () => {
    const answers = await enquirer.prompt({
        name: "prompt",
        type: "select",
        message: "What would you like to do?",
        choices: [
            "Add a new password",
            "Add a new assignment",
            "View all passwords",
            "View all assignments",
            "Exit the program"
        ]
    });

    switch (answers.prompt) {
        case "Add a new password": {
            password();
            break;
        }
        case "Add a new assignment": {
            assignment();
            break;
        }
        case "View all passwords": {
            passwords();
            break;
        }
        case "View all assignments": {
            assignments();
            break;
        }
        default: {
            console.log("Goodbye!");
            process.exit();
        }
    };
};