# Initialize:

1. create a jason package

   ```
   npm init -y
   ```

2. install express

   ```
   npm i express
   ```

3. run root node:

   ```
   node 'name of root'
   ```

4. install nodemon, set it as dev dependency and run dev:

   now we can update result as soon as we save file

   ```javascript
   npm i -D nodemon
   
   package json:
   "scripts": {
       "starts": "node index",
       "dev": "nodemon index"
     },
         
   npm run dev
   ```

   

# Structure:

## App

1. import router/malware by require
2. app use/malware router
3. set port of web that this app will listen to /

​		determine where will we show the app

```javascript
const express = require('express');

const app = express();

app.use('path', call back funtion);

app.listen(PORT, () => ...);
```



## router(mini App)

1. import modules by require
2. Malware1 -> Malware2 -> Malware3 by next()
3. export route

```javascript
const express = require('express');

const router = express.Router();

router.get/put/post/delete();

module.exports = router;
```



# Malware

## import data from file

1. setup and export data

   ```js
   const dada = [...];
   
   module.export = data / 'name of exported file';
   ```

   

2. import data into app

   ```js
   const data = require('path of data')
   ```

   

3. return all data in js version with respond

   ```js
   app.get('/../data', (res, res))=>{
       res.json(data);
   };
   ```

   

4. Get single member

   ```js
   app.get('/tasks/:id', (req, res) => {
       res.json(tasks.filter((task) => task.id == req.params.id));
   });
   
   pareseInt(req.param.id)
   
   ':id' means id is parameter and we can grab it by req.param, but notice grabbed id is string
   ```

## import malware

1. install moment to deal with date

   ```js
   npm i moment
   ```

   

2. function logger in another file

   ```js
   const moment = require('moment')
   
   const logger = (req, res, next) => {
    	console.log('data: ${moment().format()}')
       
       next()
   };
   ```

   

3. call logger in main

   ```js
   app.use(logger)
   ```

   

## Get (read) data:

Get all data

```js
router.get('./../data', (req, res) => {
    res.json(data)
});
```



Get specific data

router:

```js
const express = require('express');
const router = express.Router();
const Tasks = require('../../Tasks');

router.get('/:id', (req, res) => {
//Notice that we only reserve :id
//other parts are in main function
    var found = Tasks.some((task) => task.id == req.params.id)
    
    or
    
    var found = Tasks.some((task) => {
        return task.id == req.params.id;
    })
    if (found) {
        res.json(Tasks.filter((task) => task.id == req.params.id));
    } else {
        res.status(400).json({
            msg: `Member not found ${req.params.id}`
        });
    }
});

module.exports = router;

Notice
1.params, not param
2.` ` not ''
3.tasks.some / tasks.filter => there is no {}
4. '..' means last dir, '.' means cur dir
```

main function:

```js
const express = require('express');
const task = require('./routes/api/task');

const app = express();
app.use('/api/task', task);
// first part is half path
const PORT = 5000;
app.listen(PORT, () => console.log("server runs successfully"))
```



## POST (create) data

body of request:

```js
key: "text"
value: 'aaa'

key: "day"
value: 'day5'
```



read body(urlencoded or json) of request

```js
app.use(express.json());
app.use(express.urlencoded({extended: false}));
```

router

```js
router.post('/', (req, res) => {
    //same end as get's, no affection
    let newTask = {
        id: uuid.v4(),
        text: req.body.text,
        day: req.body.day,
        
        //body not params
        reminder: req.body.reminder === 'true' ? true: false,
        // there is only str in body, no boolean
    };
    if (!newTask.text || !newTask.day) {
        return res.status(400).json("Please include text and day")
    } else {
        Tasks.push(newTask);
        return res.json(Tasks);
    }
});
```



## PUT(update) data

body of request:

```js
Key: "id"
Value: "2"

Key: "text"
Value: ?

Key: "day"
Value: ?
```



router:

```js
router.put('/:id', (req, res) => {
    var found = Tasks.some((task) => {
        return task.id == req.params.id;
    });
    if (found) {
        Tasks.forEach(task => {
            if (task.id == req.params.id) {
                task.text = req.body.text ? req.body.text : task.text;
                task.day = req.body.day ? req.body.day : task.day;
            }
        });

        res.json(Tasks.filter((task) => task.id == req.params.id));
    } else {
        res.status(400).json({
            msg: `Member not found ${req.params.id}`
        });
    }
});
```



## DELETE data

router:

```js
router.delete('/:id', (req, res) => {
    var found = Tasks.some((task) => {
        return task.id == req.params.id;
    });
    if (found) {
        res.json({
            msg: "Task Deleted",
            Tasks: Tasks.filter(task => (task.id != req.params.id)),
        });
    } else {
        res.status(400).json({
            msg: `Member not found ${req.params.id}`
        });
    }
});
```

