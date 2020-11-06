const express = require('express');
const fs = require('fs');
const AppError = require('./utils/appError');

const app = express();

const students = JSON.parse(fs.readFileSync('./student.json'));

//middleware
app.use(express.json());

const checkValue= (req, res, next)=>{
    if(!req.body.name || !req.body.age || !req.body.gender){
        return res.status(404).json({
            status: 'fail',
            message: 'Incomplete Information'
          });
    }
    next();

}

const checkQuery= (req, res, next)=>{
    if(!req.query.length || !req.params.length){
        return res.status(404).json({
            status: 'success',
            message: 'To get more information provide additional details'
          });
    }
    next();

}


//get all students
app.get('/students', (req, res, next)=>{
    res.status(200).json({
        status: 'success',
        results: students.length,
        data:{
            students
        }
    })

});

//get info through name params
app.get('/student/:name', checkQuery, (req, res, next)=>{
    const { name } = req.params;
    const details = students.filter(x=> x.name.toLowerCase() === name)

    if (details.length === 0) {
        return next(new AppError('No student found with that name', 404));
      }

    res.status(200).json({
        status:'success',
        data:{
            details
        }

    })
});

//get info through age query or gender
app.get('/student', checkQuery, (req, res, next)=>{
    const { age, gender} = req.query;
    
    const detail = students.filter(x=> x.age === age || x.gender === gender);
    if (detail.length === 0) {
        return next(new AppError('No student found with that details', 404));
      }
  
     res.status(200).json({
            status:"success",
            data:{
                detail
            }
        })
});

//add new student to the json
 app.post('/student', checkValue, (req, res, next)=>{
    const newStudent = Object.assign(req.body);
  
    students.push(newStudent);
  
    fs.writeFile(
      './student.json',
      JSON.stringify(students),
      err => {
        res.status(201).json({
          status: 'success',
          data: {
            student: newStudent
          }
        });
      }
    );
 }) ;


//server
const PORT = 3000

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})