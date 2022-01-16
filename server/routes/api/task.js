const uuid = require('uuid');
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Connect to Database
async function loadTask() {
    try {
        const client = await mongodb.MongoClient.connect(process.env.dbURL, {useNewUrlParser: true});
        collection = client.db('TaskDB').collection('tasks');
        console.log('DB CONNECTED SUCCESSFULLY');
        return collection;   
    } catch(err){
        console.log('DB CANNOT BE CONNECTED');
    }
}

//Get task
router.get('/', async (req, res) => {
    const tasks = await loadTask();
    res.send(await tasks.find().toArray());
});


//Add task
router.post('/', async (req, res) => {
    const tasks = await loadTask();
    let newTask = {
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder,
    };
    if (!newTask.text || !newTask.day) {
        res.status(400).send('Please enter text and day');
    } else {
        await tasks.insertOne(newTask);
        res.status(201).json("added successfully");
    }
});

//Delete task
router.delete('/:id', async (req, res) => {
    const tasks = await loadTask();
    await tasks.deleteOne({_id: mongodb.ObjectId(req.params.id)});
    res.status(200).send('delete successfully');
});

//Update reminder of task
router.put('/reminder/:id', async (req, res) => {
    const tasks = await loadTask();
    const task = await tasks.findOne({_id: mongodb.ObjectId(req.params.id)});
    await tasks.updateOne(
        {_id: mongodb.ObjectId(req.params.id)},
        {
            $set: {
                reminder: !task.reminder
            }        
        }
    );
    res.status(201).json(`updated successfully`);
});


module.exports = router;

