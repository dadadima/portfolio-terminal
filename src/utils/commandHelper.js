const COMMANDS = [
    {
        command: "about",
        description: "About Me",
    },
    {
        command: "skills",
        description: "My Tech Skills",
    },
    {
        command: "experience",
        description: "My Working Experience",
    },
    {
        command: "education",
        description: "My Education",
    },
    {
        command: "learning",
        description: "Currently Learning",
    },
    {
        command: "contact",
        description: "Contact Me",
    },
    {
        command:
        // 'clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span>',
            "clear",
        description: "Clear terminal",
    },
];

const getExperience = async () => {
    const experience = await (await fetch("/api/experience")).json();
    const experienceHTML =
        `<h3>My Working Experience (You can scroll)</h3>` +
        experience
            .map(
                (experience) => `<div class="command">
        <a href="${experience.link}" target="_blank"><b class="command">${
                    experience.name
                }</b></a> - <b>${experience.stack.join(", ")}</b>
        <p class="meaning">${experience.description}</p>
      </div>`
            )
            .join("");
    return experienceHTML;
};

const getContacts = async () => {
    const contactMediums = await (await fetch("/api/contacts")).json();
    return contactMediums
        .map(
            (contact) => `<div style="display: flex; justify-content: space-between;">
      <p style="font-size: 15px">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`
        )
        .join("");
};

export const CONTENTS = {
    help: () =>
        COMMANDS.map(
            (command) => `<div style="display: flex; justify-content: space-between;">
        <p style="font-size: 15px">${command.command}</p>
        <p>${command.description}</p>
      </div>`
        ).join("") +
        `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>`,

    about: () => `My name is Davide, but everybody calls me Dima. I am ${getAge(
        "October 04, 1994"
    )} and I\'m a Data Engineer.
    <br/><br/>
    I love coding in Javascript, Typescript and Python, and have worked with frameworks like ReactJS, VueJS, Express, and Django. I currently use RemixJS, NextJS, Laravel, and NodeJS in a lot of my projects.
    <br /><br />
    I am a developer at <a href="https://tricycle.life" target="_blank">Tricycle</a> and President at <a href="https://exunclan.com" target="_blank">Exun Clan</a>, and a student at <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a>
    <br />
    I am also the Chapter Officer at the <a href="https://new-delhi-space-society.github.io" target="_blank">New Delhi Space Society</a>, a chapter of the <a href="https://space.nss.org" target="_blank">National Space Society</a>. I am a core maintainer of <a href="https://typewind.vercel.app" target="_new">Typewind</a>
  `,

    education:
        () => `I hold a double degree MSc in Data Science and Engineering from both the <a href="https://kth.se/en">Royal Institute of Technology</a> and the <a href="https://tue.nl/en/">Eindhoven University of Technology</a>. I graduated <i>cum laude</i>, and my MSc thesis on <a href="https://www.diva-portal.org/smash/get/diva2:1651780/FULLTEXT01.pdf" target="_new">Energy-Efficient Private Forecasting
on Health Data using Spiking Neural Networks</a> was awarded an A grade.
    
    <br />
    I also studied Computer and Electronic Engineering at  <a href="https://units.it/en">University of Trieste</a> and Computer Science at <a href="https://tugraz.at/en/home/">Graz University of Technology</a>.
    `,

    skills: () => `
  I am an experienced Data Engineer who is enthusiastic about Automation and upholding Software Engineering principles.
  
  <br /><br />
  
  <div class="skill"><b>programming</b>: Scala, Python, SQL, Bash, Java<br /></div>
  <div class="skill"><b>data</b>: Spark, Airflow, dbt, Pandas, Kafka, Docker, K8s<br /></div>
  <div class="skill"><b>database</b>: BigQuery, Snowflake, Redshift, Databricks, Elasticsearch, Postgres<br /></div>
  <div class="skill"><b>infrastructure</b>: Terraform, CDK<br /></div>
  <div class="skill"><b>ci/cd</b>: AWS CodePipeline, Azure DevOps, Concourse, Jenkins<br /></div>
  <div class="skill"><b>cloud</b>: AWS, GCP, Azure<br /></div>
  
  <br />
  
  I also have knowledge of Data Science core principles and experience building neural networks models with Tensorflow.
  <br /><br />
  
  I also have experience in Web Development using Javascript, ReactJS, NextJS.
  `,

    experience: getExperience,

    contact: getContacts,

    learning: () => `I am currently learning Rust by following <a href="https://app.pluralsight.com/library/courses/fundamentals-rust/table-of-contents" target="_blank">Rust Fundamentals by Edward Curren</a>.`,

    error: (input) =>
        `<div class="help-command">sh: command not found: ${input}</div><div class="help-command">See \`help\` for info`,
};

function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    return age;
}


// learning: () => {
//   window.open("website", "_blank");
//   return "";
// },