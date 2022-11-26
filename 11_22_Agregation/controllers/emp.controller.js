const Employees = require('../models/empModel');
const {response}  = require('express');

const insert = (req,res,next)=>{
    let employee = new Employees({
        name : req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    employee.save()
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

const findone = (req,res,next)=>{
    let id = req.params.id;
    Employees.findById(id)
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

const findAll = (req,res,next)=>{
    Employees.find()
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const unlink = (req,res,next)=>{
    let id = req.params.id;
    Employees.deleteOne({_id:id})
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{ 
        res.status(500).json(err);
    })
}

const unlinkAll = (req,res,next)=>{
    Employees.deleteMany({})
    .then(response=>{
        res.status(200).json(response.deletedCount+' DELETED SUCCESSFULLY')
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const update = (req,res,next)=>{
    Employees.updateOne({_id:req.params.id},{$set:{
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone
    }})
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const updateAll = (req,res,next)=>{
    Employees.updateMany({},{$set:{
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone
    }})
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}


module.exports ={
    insert,findone,findAll,update,unlink,unlinkAll,updateAll}
