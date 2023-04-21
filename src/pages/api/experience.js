import Cors from 'cors';
import runMiddleware from '../../utils/runMiddleware';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === 'GET') {
    const experience = [
      {
        companyName: 'Frontiers',
        companyWebsite: 'https://frontiersin.org/',
        title: 'Senior Data Engineer',
        description:
          'Working full-remote for the largest open-access scientific publisher. Part of the data engineering team responsible for building the company data-lake from the ground.', // todo add more
        stack: [
          'Python',
          'Airflow',
          'dbt',
          'Kafka',
          'Airbyte',
          'BigQuery',
          'GCP',
          'Terraform',
          'Docker',
          'SQL',
        ],
        place: { city: 'Amsterdam', country: 'the Netherlands' },
        startDate: 'Dec. 2022',
        endDate: 'Present',
      },
      {
        companyName: 'ABN AMRO Clearing Bank',
        companyWebsite: 'https://abnamro.com/clearing/en/home',
        title: 'Data Engineer',
        description:
          'Working in the finance industry as a consultant part of cross-functional team responsible for migrating the entire data platform to AWS. Responsibilities and tasks with lots of overlapping with Cloud Engineering.',
        stack: [
          'Python',
          'CDK',
          'AWS',
          'Scala',
          'Spark',
          'Airflow',
          'Kafka',
          'Hadoop',
          'Athena',
          'Bash',
        ],
        place: { city: 'Amsterdam', country: 'the Netherlands' },
        startDate: 'Jan. 2022',
        endDate: 'Dec. 2022',
      },
      {
        companyName: 'DPG Media',
        companyWebsite: 'https://dpgmediagroup.com/en-NL',
        title: 'Data Engineer',
        description:
          'Working in a large media company in the data engineering team operating on digital advertisement. Building and maintaining high-volume ETL pipelines creating data products exposed in Redshift and Snowflake.',
        stack: [
          'Scala',
          'Spark',
          'Airflow',
          'AWS',
          'Terraform',
          'Python',
          'SQL',
          'Snowflake',
          'Redshift',
        ],
        place: { city: 'Amsterdam', country: 'the Netherlands' },
        startDate: 'Sep. 2020',
        endDate: 'Jan. 2022',
      },
      {
        companyName: 'Electrolux',
        companyWebsite: 'https://electrolux.com/en/',
        title: 'Data Scientist',
        description:
          'Working in the Data Science team and closely collaborating with the Data Platform Team. Responsible for building a ML model to spot malfunctioning appliances using sensor data in order to improve the R&D process.',
        stack: [
          'Scala',
          'Spark',
          'MLLib',
          'Elasticsearch',
          'Logstash',
          'Kibana',
          'Azure',
          'Databricks',
        ],
        place: { city: 'Stockholm', country: 'Sweden' },
        startDate: 'Jan. 2020',
        endDate: 'Jul. 2020',
      },
      {
        companyName: 'Royal University of Technology',
        companyWebsite:
          'https://kth.se/en/eecs/skolan-for-elektroteknik-och-datavetenskap-1.760855',
        title: 'Teaching Assistant',
        description:
          'Working in the Department of Electrical Engineering and Computer Science. Responsible for the Labs for a course in Dynamic Web Programming. Preparing, coordinating, and assessing laboratories and coding projects.',
        stack: ['JavaScript', 'DOM APIs', 'HTML5', 'CSS3', 'Redux', 'React'],
        place: { city: 'Stockholm', country: 'Sweden' },
        startDate: 'Oct. 2019',
        endDate: 'Jan. 2020',
      },
      {
        companyName: 'NXP Semiconductors',
        companyWebsite: 'https://nxp.com/',
        title: 'Software Developer Intern',
        description:
          'Working in the Hardware Verification and Validation team. Developing a GUI application which enables hardware testers to generate configuration files for an on-chip oscilloscope.',
        stack: ['Java', 'JavaFX', 'MySQL', 'Approval Tests'],
        place: { city: 'Graz', country: 'Austria' },
        startDate: 'May 2018',
        endDate: 'Aug. 2018',
      },
    ];

    return res.json(experience);
  } else {
    return res.status(400).json({ message: 'Only GET request allowed' });
  }
}
