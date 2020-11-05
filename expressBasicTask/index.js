const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.json());

const students = JSON.parse(fs.readFileSync('./student.json'));

//middleware
const checkValue= (req, res, next)=>{
    if(!req.body.name || !req.body.age){
        return res.status(404).json({
            status: 'fail',
            message: 'Incomplete Information'
          });
    }
    next();

}


//get all students
app.get('/students', (req, res)=>{
    res.status(200).json({
        status: 'success',
        results: students.length,
        data:{
            students
        }
    })

});

//get info through name params
app.get('/student/:name',  (req, res)=>{
    const { name } = req.params;
    const details = students.filter(x=> x.name.toLowerCase() === name)

    if(details.length === 0){ 
        res.status(404).json({
            status:'fail',
            message:'Sorry! No one is there by that name'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            details
        }

    })
});

//get info through age query or gender
app.get('/student', (req, res)=>{
    const { age, gender} = req.query;

    const detail = students.filter(x=> x.age === age ||  x.gender == gender);
  
    if(detail.length === 0){ 
        res.status(404).json({
            status:'fail',
            message:'Sorry! No one by that age'
        })
    }

    res.status(200).json({
        status:"success",
        data:{
            detail
        }
    })
});

//add new student to the json
 app.post('/student', checkValue, (req, res)=>{
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