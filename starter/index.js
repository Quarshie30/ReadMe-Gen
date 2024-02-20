const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'Title',
        message: 'What\'s the title of your project?'
    },
    {
        type: 'input',
        name: 'Description',
        message: 'Type in a description of your project:'
    },
    {
        type: 'input',
        name: 'Installation',
        message: 'Enter installation process:'
    },
    {
        type: 'input',
        name: 'Usage',
        message: 'Enter usage information:'
    },
    {
        type: 'list',
        name: 'License',
        message: 'Choose a License for your project:',
        choices: ['MIT', 'GPL 3.0', 'BSD 3', 'Eclipse Public License 2.0', 'None']
    },
    {
        type: 'input',
        name: 'Contribution guidelines',
        message: 'Enter contribution guidelines:'
    },
    {
        type: 'input',
        name: 'Tests',
        message: 'Enter test process:'
    },
    {
        type: 'input',
        name: 'Github',
        message: 'Enter Github username:'
    },
    {
        type: 'input',
        name: 'Email',
        message: 'Enter email address:'
    }
];

// function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve('README.md created successfully!');
            }
        });
    });
}

// function to initialize program
function init() {
    console.log('Provide the following information:');
    inquirer.prompt(questions)
        .then(userData => {
            const markdownContent = generateMarkdown(userData);
            const outputPath = path.join(__dirname, 'ReadMe.md');
            return writeToFile(outputPath, markdownContent);
        })
        .then(message => {
            console.log(message);
        })
        .catch(error => {
            console.error('An error has occurred:', error);
        });
}


// function call to initialize program
init();
