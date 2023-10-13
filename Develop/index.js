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

const inquirer = require("inquirer");
const fs = require("fs");

function generateLicenseBadge(license) {
  let badge = "";
  switch (license) {
    case "MIT":
      badge =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      break;
    case "Apache":
      badge =
        "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      break;
    case "GNU":
      badge =
        "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      break;
    default:
      badge = "";
  }
  return badge;
}

// Function to generate README content
const generateREADME = ({
  title,
  description,
  installation,
  usage,
  license,
  contributing,
  tests,
  author,
  github,
  linkedin,
}) => {
  const licenseBadge = generateLicenseBadge(license);

  return `# ${title}

${licenseBadge}  

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
Refer to the [License file](LICENSE).

## Credits
${contributing}

## Tests
${tests}

## Author
- **${author}**
  - GitHub: [${github}](https://github.com/${github})
  - LinkedIn: [LinkedIn Profile](${linkedin})
`;
};
inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of your project:",
    },
    {
      type: "input",
      name: "description",
      message: "Provide a brief description of your project:",
    },
    {
      type: "input",
      name: "installation",
      message: "Provide installation instructions:",
    },
    {
      type: "input",
      name: "usage",
      message: "Provide examples of usage for the project:",
    },
    {
      type: "list",
      name: "license",
      message: "Choose a license for your project:",
      choices: ["MIT", "Apache", "GNU"],
    },
    {
      type: "input",
      name: "contributing",
      message: "Provide any credits for the project",
    },
    {
      type: "input",
      name: "tests",
      message: "Provide test instructions:",
    },
    {
      type: "input",
      name: "author",
      message: "Enter the project author's name:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter the project author's GitHub username:",
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter the project author's LinkedIn URL:",
    },
  ])
  .then((answers) => {
    const outputDirectory = "./Output"; 

   
    const outputFile = `${outputDirectory}/README.md`;


    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    const readmeContent = generateREADME(answers);

    fs.writeFile(outputFile, readmeContent, (err) =>
      err ? console.log(err) : console.log("Successfully created README.md!")
    );
  });
