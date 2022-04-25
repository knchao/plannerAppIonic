const express = require('express');
const app = express();
const config = require('./config');
const Task = require('./models/Task');
const cors =  require('cors');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes or endpoints
app.get('/tasks', function(req, res){
    Task.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.post('/tasks', function(req, res){
console.log("action post")

    let task = req.body;
    Task.create(task).then(function(result){
        res.redirect('/tasks');
    }).catch(function(err){
        res.send(err);
    })
});

app.patch('/tasks/:id', function(req, res){

   
    let taskId = req.params.id;

    console.log("req.params.id"  + req.params.id);
    console.log("req"  + req.body);
    


    //Find the task 
    Task.findByPk(taskId).then(function(result){
        //Check if found
        if(result){
            //Update  record
            result.name = req.body.name;
            result.description = req.body.description;
            result.date_of_start = req.body.date_of_start;
            result.date_of_end = req.body.date_of_end;
            result.status = req.body.status;
            result.completion_date = req.body.completion_date;
            result.weekly_task = req.body.weekly_task;
            result.monthly_goal = req.body.monthly_goal;
            result.hasNote = req.body.hasNote;
            result.noteHeader = req.body.noteHeader;
            result.noteDetail = req.body.noteDetail;
            result.noteImportance = req.body.noteImportance;
        
            //Save changes to DB
            result.save().then(function(result){
                res.status(200).send(result);
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Record not found');
        }

    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.delete('/tasks/:id', function(req, res){
    let id = req.params.id;
    Task.findByPk(id).then((result) => {
        result.destroy().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err);
        });
    }).catch((err) => {
        res.send(err);
    });
});


app.listen(3000, function(){
    console.log('Server running on port 3000...');
});