const { response } = require('express');
const Employee = require('../models/empmodel');

//to get all the data in DB
const findAll = (req, res, next)=>{
    Employee.find()//.exec()
    .then(response =>{
        res.status(200).json({
            response
        });
    })
    .catch(err=>{
        res.status(500).json({
            message: "an error occured \n" +err
        });
    })
};

//to get individual data
const findone =(req,res,next) =>{
    let employeeId = req.params.id
    Employee.findById(employeeId)
    .then(response =>{
        res.status(200).json({response});
    })
    .catch(error =>{
        res.status(500).json({
            message: "employee not with this id try another"
        });
    })
};

//to post the data
const insert = (req, res,next)=>{
    let employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    employee.save()
    .then(response =>{
        res.status(200).json({response});
    })
    .catch(err=>{
        res.status(500).json({
            message: "an eroor occured \n"+err
        });
    })
};

//update the data
const update = (req, res, next)=>{
    Employee.updateOne({_id: req.params.id},{$set:{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone}})
    .then(response=>{
        res.status(200).json({
            message: response
        });
    })
    .catch(err=>{
        res.status(500).json({
            message : "an error occured"
        });
    })
};

//delete the data
const unlink = (req,res,next)=>{
    let id = req.params.id
    Employee.deleteOne({_id:id})
    .then(response=>{
        res.status(200).json({
            message: `Employee deleted successfully`
        });
    })
    .catch(()=>{
        res.status(500).json({
            message: `An error occured`
        });
    })
};

module.exports ={
    findAll, findone, insert, update, unlink
}