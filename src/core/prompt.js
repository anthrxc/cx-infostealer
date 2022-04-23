const { passwords, assignments } = require("./tables.js");
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
        ]
    });

    switch (answers.prompt) {
        case "Add a new password":
            return "password";
        case "Add a new assignment":
            return "assignment";
        case "View all passwords": {
            passwords();
            break;
        }
        case "View all assignments": {
            assignments();
            break;
        }
    };
};