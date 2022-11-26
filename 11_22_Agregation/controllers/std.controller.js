const Students = require('../models/stdModel');
const {response}  = require('express');

const insert = (req,res,next)=>{
    let students = new Students({
        //id : req.body.id,
        name : req.body.name,
        branch: req.body.branch,
        year: req.body.year
    })
    students.save()
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}
const findone = (req,res,next)=>{
    let id = req.params.id;
    Students.findById(id)
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

const findAll = (req,res,next)=>{
    Students.find()
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const unlink = (req,res,next)=>{
    let id = req.params.id;
    Students.deleteOne({_id:id})
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{ 
        res.status(500).json(err);
    })
}

const unlinkAll = (req,res,next)=>{
    Students.deleteMany({})
    .then(response=>{
        res.status(200).json(response.deletedCount+' DELETED SUCCESSFULLY')
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const update = (req,res,next)=>{
    Students.updateOne({_id:req.params.id},{$set:{
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
    Students.updateMany({},{$set:{
        name: req.body.name,
        branch: req.body.branch,
        year:req.body.year
    }})
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

// const findAggregation = (req,res,next)=>{
//     Students.aggregate([
//         {
//           $lookup:
//           {
//             from: ' ',
//             localField: 'prod_id',
//             foreignField: '_id',
//             as: 'orderdetails'
          
//     .then(response=>{
//         res.status(200).json(response);
//     })
//     .catch(err=>{
//         res.status(500).json(err)
//     })
// }

module.exports ={
    insert,findone,findAll,update,unlink,unlinkAll,updateAll} 