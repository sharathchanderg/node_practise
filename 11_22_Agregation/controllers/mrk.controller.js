const Marks = require('../models/marksModel');
const {response}  = require('express');
const mongoose = require('mongoose');

const insert = (req,res,next)=>{
    let marks = new Marks({
        name : req.body.name, 
        st_id : req.body.st_id,
        m_1 : req.body.m_1, 
        physics: req.body.physics,
        chemistry: req.body.chemistry
    })
    marks.save()
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}
module.exports ={
    insert}