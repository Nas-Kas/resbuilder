require('dotenv').config()
const Sequelize = require('sequelize')
const { CONNECTION_STRING } = process.env


const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized:false
        }
    }
})

module.exports = {
  seed: (req,res) => {
    sequelize.query(`
    drop table if exists resumes;
    drop table if exists resumeItems;

    create table resumes (
      jsonResume TEXT
    );

    create table resumeItems (
      resume_id serial primary key,
      companyname varchar,
      location varchar,
      startdate varchar,
      enddate varchar,
      summary1 varchar,
      summary2 varchar,
      summary3 varchar
  );

    `).then(() => {
      console.log("seeded database")
      res.sendStatus(200)
    }).catch(err => console.log('error seeding database', err))
  },

  saveResume: (req, res) => {
    const { jsonResume } = req.body;
    console.log("jsonresume in controller:" + jsonResume);
    sequelize.query(`
      INSERT INTO resumes (jsonResume)
      VALUES ($1)
    `, {
      bind: [jsonResume]
    }).then(() => {
      console.log("Resume saved successfully");
      res.sendStatus(200);
    }).catch(err => {
      console.log("Error saving resume", err);
      res.sendStatus(500);
    });
  },

  getResume: (req, res) => {
    sequelize.query(`
      SELECT *
      FROM resumes
      LIMIT 1
    `).then(([results]) => {
      const resume = results[0];
      console.log("grabbed values successfully", resume);
      res.status(200).json({ resume });
    }).catch(err => {
      console.log("Error grabbing resume data", err);
      res.sendStatus(500);
    });
  }
  
}