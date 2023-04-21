import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';

const COMMANDS = [
  {
    command: 'about',
    description: 'About Me',
  },
  {
    command: 'skills',
    description: 'My Tech Skills',
  },
  {
    command: 'experience',
    description: 'My Working Experience',
  },
  {
    command: 'education',
    description: 'My Education',
  },
  {
    command: 'learning',
    description: 'Currently Learning',
  },
  {
    command: 'contact',
    description: 'Contact Me',
  },
  {
    command: 'shortcuts',
    description: 'Keyboard shortcuts',
  },
  {
    command: 'help',
    description: 'List of commands',
  },
  {
    command: 'clear',
    description: 'Clear terminal',
  },
];

const getExperience = async () => {
  const experience = await (await fetch('/api/experience')).json();

  const parseDate = dateString => {
    return new Date(`1 ${dateString}`);
  };

  const computeYearsAndMonths = (startDate, endDate) => {
    const start = parseDate(startDate);
    const end = endDate === 'Present' ? new Date() : parseDate(endDate);
    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth() +
      1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const yearsString = `${years}y`;
    const monthsString = months > 0 ? `${months}m` : ``;

    return years > 0 ? `${yearsString} ${monthsString}` : `${monthsString}`;
  };

  return (
    `<h3>My Working Experience (You can scroll)</h3>` +
    `<br>` +
    experience
      .map(
        exp => `
    <div class="command">
        <div style="display: flex; justify-content: space-between;">
            <span><strong><a href="${
              exp.companyWebsite
            }" target="_blank"><b class="command">${
          exp.companyName
        }</b></a></strong>, <strong>${exp.title}</strong></span>
            <span><em>${exp.place.city}</em>, ${computeYearsAndMonths(
          exp.startDate,
          exp.endDate
        )}</span>
        </div>      
       
        <br>
        <strong>${exp.stack.join(', ')}</strong>
        <br><br>
        ${exp.description.replace(/\n/g, '<br>')}
        <br><br><hr><br>
 
    </div>`
      )
      .join('')
  );
};

const getContacts = async () => {
  const contactMediums = await (await fetch('/api/contacts')).json();

  const getIconSVG = medium => {
    switch (medium) {
      case 'github':
        return ReactDOMServer.renderToStaticMarkup(<FaGithub />);
      case 'email':
        return ReactDOMServer.renderToStaticMarkup(<FaEnvelope />);
      case 'linkedin':
        return ReactDOMServer.renderToStaticMarkup(<FaLinkedin />);
      case 'telegram':
        return ReactDOMServer.renderToStaticMarkup(<FaTelegram />);
      default:
        return '';
    }
  };

  return contactMediums
    .map(
      contact => `<div style="display: flex; justify-content: space-between;">
      <p style="font-size: 15px">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${getIconSVG(
        contact.medium
      )}</a>
    </div>`
    )
    .join('');
};

export const CONTENTS = {
  help: () =>
    COMMANDS.map(
      command => `<div style="display: flex; justify-content: space-between;">
        <p>${command.command}</p>
        <p>${command.description}</p>
      </div>`
    ).join('') +
    `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>`,

  about: () => `My name is Davide, but everybody calls me Dima. I am ${getAge(
    'October 04, 1994'
  )} and I\'m a Data Engineer based in Amsterdam. I currently work at <a href="https://frontiersin.org/" target="_blank">Frontiers</a> as a Senior Data Engineer.
    <br /><br />
    I love solving problems, automating, and fixing things. I am a big fan of Software Engineering principles and I am always looking for ways to improve my code.
    <br /><br />
    I am passionate about the infrastructure side of Data Applications and I love experimenting with new technologies.
    
  `,

  education:
    () => `I hold a double degree MSc in Data Science and Engineering from both the <a href="https://kth.se/en">Royal Institute of Technology</a> and the <a href="https://tue.nl/en/">Eindhoven University of Technology</a>. I graduated <i>cum laude</i>, and my MSc thesis on <a href="https://www.diva-portal.org/smash/get/diva2:1651780/FULLTEXT01.pdf" target="_new">Energy-Efficient Private Forecasting
on Health Data using Spiking Neural Networks</a> was awarded an A grade.
    
    <br /><br/>
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
  
  I do have some experience in Web Development using Javascript, ReactJS, NextJS.
  `,

  experience: getExperience,

  contact: getContacts,

  learning: () =>
    `I am currently learning Rust by following <a href="https://app.pluralsight.com/library/courses/fundamentals-rust/table-of-contents" target="_blank">Rust Fundamentals by Edward Curren</a>.`,

  shortcuts: () =>
    SHORTCUTS.map(
      shortcut => `<div style="display: flex; justify-content: space-between;">
      <p>${shortcut.name}</p>
        <p>${shortcut.keyCombination || shortcut.link}</p>
    </div>`
    ).join(''),

  _error: input =>
    `<div class="help-command">sh: command not found: ${input}</div><div class="help-command">See \`help\` for info`,
};

const SHORTCUTS = [
  {
    name: 'clear',
    keyCombination: '⌃ + L',
  },
  {
    name: 'navigate command history',
    link: '↑ or ↓',
  },
  {
    name: 'autocomplete commands',
    link: '⇥',
  }
];

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
