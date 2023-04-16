import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
    methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);
    if (req.method === "GET") {
        const experience = [
            {
                companyName: "Frontiers",
                companyWebsite: "https://www.frontiersin.org/",
                title: "Senior Data Engineer",
                description: "Current Data Engineer at ABN AMRO Clearing based in Amsterdam, operating in the financial domain. 2+ years experience specializing in the creation of scalable ETL pipelines in the cloud, infrastructure automation, and design of complex data product. Interested in devising a better problem-solving method for challenging tasks, and learning new technologies and tools if the need arises.",
                stack: ["Python", "Airflow", "dbt", "Kafka", "Airbyte", "BigQuery", "Azure DevOps", "GCP", "Terraform", "Docker", "SQL"],
                place: {city: "Amsterdam", country: "the Netherlands"},
                startDate: "Dec. 2020",
                endDate: "Present"
            },
            // {
            //     companyName: "ABN AMRO Clearing Bank",
            //     title: "Data Engineer",
            //     description: "Current Data Engineer at ABN AMRO Clearing based in Amsterdam, operating in the financial domain. 2+ years experience specializing in the creation of scalable ETL pipelines in the cloud, infrastructure automation, and design of complex data product. Interested in devising a better problem-solving method for challenging tasks, and learning new technologies and tools if the need arises.",
            //     stack: "AWS(Glue, IAM, DirectConnect, DataSync, EMR, MWAA, lambda, Athena), CDK, Spark, Kafka, Flume, Scala, Python, Bash scripting",
            //     place: "Amsterdam, the Netherlands",
            //     startDate: "Jan. 2022",
            //     endDate: "Dec. 2022"
            // },
            // {
            //     companyName: "DPG Media",
            //     title: "Data Engineer",
            //     description: "Working in the data engineering team operating within B2B with a significant focus on digital advertisement. Building, owning, and maintaining scalable ETL pipelines using Airflow, Spark, Scala (up to several TBs of data per day per pipeline). Extracting data from many different sources via APIs and integrating them seamlessly into the data landscape. Creation of several data products that satisfy different business needs (yielding, audience targeting and inventory, revenue reports, etc). Storing and updating data products in different data warehouses (Snowflake, Redshift, Athena).",
            //     stack: "AWS(Glue, EKS, CodeBuild/Pipeline, Lambda, EMR, IAM, etc.), Terraform, Airflow, Concourse, Spark, Scala, Python, Snowflake, SQL, Bash scripting",
            //     place: "Amsterdam, the Netherlands",
            //     startDate: "Sep. 2020",
            //     endDate: "Jan. 2022"
            // },
            // {
            //     companyName: "Electrolux",
            //     title: "DATA SCIENCE AND ENGINEERING - FULL TIME",
            //     description: "Responsible for finding a suitable data solution to spot malfunctioning appliances using sensor data. Deployment of the Elastic Stack up to scale (hundreds GBs per day). Creation of an ETL pipeline using Logstash that reads from Azure Blob Storage and indexes data into Elasticsearch. Tested different data models using the Anomaly Detection service by Elastic and representing the results in Kibana. Implementation of an Anomaly Detection model using Spark/Scala on Databricks to use as a baseline.",
            //     stack: "Elastic Stack, Logstash, Azure Blob Storage, Elasticsearch, Kibana, Spark, Scala, Databricks",
            //     place: "",
            //     startDate: "",
            //     endDate: ""
            // },
            // {
            //     companyName: "Department of Electrical Engineering and Computer Science - KTH",
            //     title: "Teaching Assistant for Interaction Programming and The Dynamic Web - part time",
            //     description: "Responsible for the Labs for a Bachelor course in Dynamic Web Programming. Preparing and editing the course material in coordination with the professor. Assisting, coordinating, and assessing laboratories and coding projects.",
            //     stack: "JavaScript, DOM APIs, HTML5, CSS3, MVC, Redux, React",
            //     place: "",
            //     startDate: "",
            //     endDate: ""
            // },
            // {
            //     companyName: "NXP Semiconductors",
            //     title: "SOFTWARE DEVELOPER - FULL TIME INTERNSHIP",
            //     description: "Developing a GUI application which enables hardware testers to generate configuration files",
            //     place: "",
            //     startDate: "",
            //     endDate: ""
            // },

        ];

        return res.json(experience);
    } else {
        return res.status(400).json({message: "Only GET request allowed"});
    }
}
