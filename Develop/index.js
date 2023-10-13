// //GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate README content
const generateREADME = ({ title, description, installation, usage, license, contributing, tests, author, github, linkedin }) =>
  `# ${title}

## Description
${description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Author](#author)

## Installation
${installation}

## Usage
${usage}

## License
This project is licensed under ${license} license.

## Contributing
${contributing}

## Tests
${tests}

## Author
- **${author}**
  - GitHub: [${github}](https://github.com/${github})
  - LinkedIn: [LinkedIn Profile](${linkedin})
`;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of your project:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a brief description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Provide installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide usage information:',
    },
    {
      type: 'input',
      name: 'license',
      message: 'Enter the license for your project:',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Provide contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide test instructions:',
    },
    {
      type: 'input',
      name: 'author',
      message: "Enter the project author's name:",
    },
    {
      type: 'input',
      name: 'github',
      message: "Enter the project author's GitHub username:",
    },
    {
      type: 'input',
      name: 'linkedin',
      message: "Enter the project author's LinkedIn URL:",
    },
  ])
  .then((answers) => {
    const readmeContent = generateREADME(answers);

    fs.writeFile('README.md', readmeContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!')
    );
  });
