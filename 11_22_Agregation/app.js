const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port = process.env.PORT || 3500;
const EmpRout = require('./routers/emp.route');
const StdRout = require('./routers/std.route');
const MrkRoute = require('./routers/mrk.route');
const student = require('./models/stdModel');
//const marks = require('./models/marksModel');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


const db = mongoose.connect(`mongodb+srv://sharath:sharath@cluster0.pjpq8wz.mongodb.net/?retryWrites=true&w=majority`) 
.then(()=>{
    console.log('DB is connected');
})
.catch(err=>{
    console.log('DB not connected '+err);
});
app.get('/',(req,res)=>{
    res.json('hello server');  
});

student.aggregate([
    {
      $lookup: {
        from: "Marks",
        localField: "_id",
        foreignField: "st_id",
        as: "marks"
      }
    }
  ])
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

app.use('/',EmpRout);
app.use('/std',StdRout);
app.use('/mrk',MrkRoute);

app.use
//for not found
app.use((req, res, next)=>{
    const error = new error('not found');
    error.status = 404;
    next(error);
});

//other error
app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
});

app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`);
});
