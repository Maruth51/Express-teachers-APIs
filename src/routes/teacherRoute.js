const express = require("express");
const teacher = require("../models/data_teachers");
const teachersRoute = express.Router();

teachersRoute
  .get("/:empId", (req, res) => {
    const id = req.params.empId;
    const requestedTeacher = teacher.find(ele => {
      return parseInt(id, 10) === ele.empNo;
    });
    //console.log(req.params);
    if (requestedTeacher) {
      res.status(200).json({ requestedTeacher });
    } else {
      res.status(400).send("bad request");
    }
  })
  .post("/", (req, res) => {
    if (req.body.empNo && req.body.name) {
      teacher.push(req.body);
      res.status(200).send("update success");
    } else {
      res.status(400).send("Bad Request");
    }
    //console.log(teacher);
  })
  .delete("/:empNumber", (req, res) => {
    const empNumber = req.params.empNumber;
    const indexTeacher = teacher.findIndex(
      elem => elem.empNo === parseInt(empNumber, 10)
    );
    if (indexTeacher !== -1) {
      teacher.splice(indexTeacher, 1);
      console.log(teacher);
      res.status(200).send(`Employe number ${empNumber} removed`);
    } else {
      res.status(400).send(`Employe number ${empNumber} not found`);
    }
    //console.log(empNumber, indexTeacher);
  });

module.exports = teachersRoute;
