const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const employee = require('./models/empmodel.js');
const port = process.env.PORT || 3000;

const EmpRouter = require('./routes/empRoutes');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
//connected with mangoDB with cluster from website
mongoose.connect('mongodb+srv://sharath:sharath@cluster0.9yjjbme.mongodb.net/?retryWrites=true&w=majority',)
.then(()=>console.log('DATABASE is connected...')
).catch(err=>console.log('error '+err))

app.get('/', (req,res)=>{
  res.send('message :  I am connected with db');
});

app.use('/',EmpRouter);

//For not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//For any other type error
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});
