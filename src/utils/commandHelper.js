import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';

import { COMMANDS } from './commands';
import { THEMES } from './themes';
import { SHORTCUTS } from './shortcuts';

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
       <br><br>
       <hr>
       <br>
    </div>`
      )
      .join('')
  );
};

const getPublications = async () => {
  const publications = await (await fetch('/api/publications')).json();

  return (
    `<h3>My Publications</h3>` +
    `<br>` +
    publications
      .map(
        pub => `
    <div class="command">
       <span><strong><a href="${pub.link}" target="_blank"><b class="command">${
          pub.title
        }</b></a></strong></span>
       <br>
       <br>
       <strong>${pub.authors.join(', ')}</strong>
       <br>
       <br>
       <span><em>${pub.year}, ${pub.Conference}</em></span>
       <br>
       <br>
       ${pub.abstract.replace(/\n/g, '<br>')}
       <br><br>
       <hr>
       <br>
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

const getAge = dateString => {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
};

const getSourceCode = async () => {
  try {
    const response = await fetch('/api/sourceCode');
    if (response.ok) {
      const { fileContents } = await response.json();
      return fileContents;
    } else {
      const errorResponse = await response.json();
      console.error('Error fetching source code:', errorResponse);
      return {
        error: `An error occurred while fetching the source code: ${errorResponse.error}`,
      };
    }
  } catch (error) {
    console.error('Error in source command:', error);
    return { error: 'An error occurred while fetching the source code.' };
  }
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
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span>.</div>`,

  about: () =>
    `<br />
    <img src="/images/dima.png" alt="Davide Di Matteo" style="display: block; margin: auto; width:300px;height:auto;border-radius:50%; border: 3px solid var(--secondary);">
    <br /><br />
    My name is Davide Di Matteo, <i>but everybody calls me Dima</i>. I am ${getAge(
      'October 04, 1994'
    )} and I\'m a Data Engineer based in Amsterdam. I currently work at <a href="https://frontiersin.org/" target="_blank">Frontiers</a> as a Senior Data Engineer.
    <br /><br />
    I love solving problems, automating, and fixing things. I am a big fan of Software Engineering principles and I am always looking for ways to improve the codebase.
    <br /><br />
    I am passionate about the infrastructure side of Data Applications and I love experimenting with new technologies. 
  `,

  education: () =>
    `I hold a double degree MSc in Data Science and Engineering from both the <a href="https://kth.se/en">Royal Institute of Technology</a> and the <a href="https://tue.nl/en/">Eindhoven University of Technology</a>. I graduated <i>cum laude</i>, and my MSc thesis on <a href="https://www.diva-portal.org/smash/get/diva2:1651780/FULLTEXT01.pdf" target="_new">Energy-Efficient Private Forecasting
on Health Data using Spiking Neural Networks</a> was awarded an A grade.
    
    <br /><br/>
    I also studied Computer and Electronic Engineering at  <a href="https://units.it/en">University of Trieste</a> and Computer Science at <a href="https://tugraz.at/en/home/">Graz University of Technology</a>.
    `,

  skills: () => `
  I am an experienced Data Engineer who is enthusiastic about Automation and upholding Software Engineering principles. I really like to collaborate and improve the development lifecycle of the team.
  
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

  publications: getPublications,

  experience: getExperience,

  contact: getContacts,

  learning: () => `
  I am currently learning Rust by following <a href="https://app.pluralsight.com/library/courses/fundamentals-rust/table-of-contents" target="_blank">Rust Fundamentals by Edward Curren</a>.
  <br /> <br />
  Lately, I am experimenting a lot with different LLMs prompts, and I am trying to understand how to use them to solve repetitive development tasks and speed up my coding.
  `,

  source: getSourceCode,

  theme: (...args) => {
    if (args[0] === '--help') {
      return `Usage: theme <theme_name>\nAvailable themes: ${Object.keys(THEMES)
        .map(theme => `<b>${theme}</b>`)
        .join(', ')}`;
    }

    const theme = args[0];
    if (Object.keys(THEMES).includes(theme)) {
      const newThemeProperties = THEMES[theme];
      const root = document.documentElement;

      Object.entries(newThemeProperties).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      return `Theme set to ${theme}`;
    } else {
      return `Invalid theme. Please use one of the following: ${Object.keys(
        THEMES
      )
        .map(theme => `<b>${theme}</b>`)
        .join(', ')}`;
    }
  },

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
