# Initialization of Git

1. right click app folder and git bash it

1. initialize git

   ```
   git init
   ```

   

3. set config

   ```
   git config --global user.name 'victor-sq'
   git config --global user.email 'jiaxinliu.victor@gmail.com'
   ```

4. add all, commit with operation name and check status

   ```
   git add .
   git commit -m 'initialization'
   git status
   ```

5. create new repository in github

6. push it into github

   ```
   git remote add origin https://github.com/victorliu-sq/task-manager.git
   git push -u origin main
   ```

   





# Initialization of packages

1. initialize package.json

   ```
   npm init
   ```

   

2. install express cors, body-parser, mongodb

   ```
   npm i express cors body-parser mongodb
   ```

   

3. install install nodemon and add it to "script" of package

   ```
   npm i -D nodemon
   
   package json:
   "scripts": {
       "starts": "node server/index",
       "dev": "nodemon server/index"
     },
         
   npm run dev
   ```

4. create index in serve

   ```
   mkdir server
   cd serve
   touch index
   ```



# Structure of BackEnd

## server

1. import modules

   ```js
   const express = require('express');
   const bodyParser = require('body-parser');
   const cors = require('cors');
   ```

   

2. use middleware

   ```js
   app.use(bodyParser.json());
   app.use(cors());
   
   const task = require('./routes/api/task');
   
   app.use('/api/task', task);
   ```

   

3. handle production

   ```js
   if (process.env.NODE_ENV === 'production') {
     // Static folder
     app.use(express.static(__dirname + '/public/'));
   
     // Handle SPA
     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
   }
   
   ```

   

4. listen to port

   ```js
   const port = process.env.PORT || 5000;
   
   app.listen(port, () => console.log(`Server started on port ${port}`));
   ```

   

## API-task（database connects and database）

All operations on database take time to finish. In this way, we need to add async and await to them except res.send back

1. load collection in database

   URL stored in config.env

   ```
   DATABASE_URL="mongodb+srv://virtuous:312528@cluster0.g1fqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
   ```

   

   ```js
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
   ```

   

2. GET task

   ```js
   router.get('/', callback(req, res))
   ```

   if server receives GET + ‘/’， we perform callback funtion on database

   ```js
   router.get('/', async (req, res) => {
       tasks = await loadTask();
       res.send(tasks.find().toArray())
   })
   ```

   - load collection

   - send back all items in collection

   - res sends back information

     

3. ADD task

   ```js
   router.post('/', callback(req, res))
   ```

   if server receives POST + '/', we perform callback funtion on database

   ```js
   router.post('/', async (req, res) => {
       tasks = await loadTask();
       let new tasks = ...;
       await tasks.status(201).insertOne(newTask)
   })
   ```

   - load collection
   - create new task with information in req
   - insert new task into collection
   - res sends back inforamtion

   

4. DELETE task

   if server receives DELETE + '/:id':

   - load task
   - delete task with _id == objectID(id)

   ```js
   router.delete('/:id', async (req, res) => {
       const tasks = await loadTask();
       await tasks.deleteOne({_id: mongodb.ObjectId(req.params.id)});
       res.status(200).send('delete successfully');
   });
   ```

5. UPDATE (reminder of) task

   if server receices PUT + ':id':

   - load task
   - find task that we want to update
   - update information of that task
   - res sends back information

   ```js
   router.put('/:id', async (req, res) => {
       const tasks = await loadTask();
       const task = await tasks.findOne({_id: objectID(id)});
       await tasks.updateOne(
       	{_id:objectID(id)},
          $set:{
           	reminder: !tasks.reminder
           }
       );
   })
   ```

   

6. export router

   module.exports = router





# Structure of FrontEnd

## sketch

### 	header

### 	Tasks

#### 			Form of new task and Add Button

##### 			switch button

#### 			Task and Delete Button

### 	footer



## Function of App

### 1. App:

script:

```vue
<script>
import header, footer, tasks

export default{
	name: 'App',
	Component:{
		Header,
        Tasks,
		Footer,
	},
    data(){
        return tasks
    }
    create(){
        self.tasks = [...]
    }
}
</script>
```

template:

```vue
<template>
	<Header/>
	<Tasks/>
	<Footer/>
</template>
```



### 2. Show Task

#### (1)  data is stored in App

```vue
<script>
	data(){
        return tasks
    }
    create(){
        this.tasks = [
            ...
        ]
    }
</script>
```



#### (2) pass data from App to Tasks

```vue
<template>
	<Tasks tasks="tasks"/>
</template>
```

Tasks is component of App,

tasks is props of Tasks,

"tasks" is props of App



#### (3) pass data from Tasks to Task one by one

```vue
<template>
	<div :key="task.id" v-for="task in tasks">
        <Task :task="task"/>
    </div>
</template>
```



#### (4) show data in Task

```vue
<template>
	<div>
        <h2> {{task.text}}</h2>
        <p>{{task.day}}</p>
    </div>
</template>
```



### 3. Delete Task by botton

#### (1) In Task

@click -> fun_delete1 

```vue
<template>
	<div>
        <i @click="fun_del1(task.id)"></i>
    </div>
</template>
```

fun_delete -> event_delete1

```vue
<script>
	methods: {
        fun_del1(id){
            this.$emit('event_del1', id)
        }
    }
    emits: ['event_del1']
</script>
```

emits is an array storing all events

#### (2) In Tasks 

@event_delete1 -> fun_delete2

```vue
<template>
	<div>
        <Task @event_del1="fun_del2"/>
    </div>
</template>
Notice that we do not need to assign id to fun_del2 here since event_del1 will return id
```

fun_delete2 -> event_delete2

```vue
<script>
    methods: {
        fun_del2(id){
            this.$emit('event_del2', id)
        }
    }
    emits: ['event_del2']
</script>
```



#### (3) In App

@event_delete2 -> fun_delete3

```vue
<template>
	<Tasks @event_del2='fun_del3'/>
</template>
```

fun_delete3 -> delete id from data

```vue
<script>
    methods: {
        fun_del3(id){
      		this.tasks = this.tasks.filter((task)->(task.id !== id))      
        }
    }
</script>

we delete task in tasks by filters
Array.filter((element) -> (condition))
if condition = True, keep
else delete
```



When we have connected data in database

```js
async fun_delete(id){
	await TaskAPI.deleteTask(id);
	this.tasks = await TaskAPI.getTasks();
}
```



### 4. Add Task

##### 1. Form of AddTask

```vue
<template>
	<form>
        input of text
        <label> comments </label>
        <input type='text' name='.' placeholder='.'>
        
        
        input of boolean
        <input type='checkbox' name='.'>
        
        
        button to submit all inputs
        <input type='submit' value='SUBMIT THIS'>
    </form>
</template>
```



##### 2.Add Task

###### 1.model input to data of AddTask

#Notice we cannot use props here

```vue
<template>
	<div>
        <input v-model="a"
    </div>
</template>

<script>
	data(){
        return {
            a: ""
        }
    }
</script>

a is a key word in data of AddTask
```



###### 2.add new task to data in App

1. In AddTask

   @submit -> fun_add1

   ```vue
   <template>
   	<form @submit="fun_add1">
   	</form>
   </template>
   ```

   fun_add1 -> emit event_add1, return data of new task to Tasks and clean data in AddTask

   (1) event submit --> recevied by function and prevent it from default

   (2) create a new class with data of AddTask 

   (3) initialize data of AddTask

   (4) emit new class to Tasks

   ```vue
   <script>
   	methods: {
           fun_add1(event){
           	event.preventDefault();
               
               const newTask={
               	a : this.a
               }
               
               this.a=""
               
               this.$emit('event', newTask)
           }
       }
   </script>
   ```

   

2. In Tasks

   @event_add1 -> fun_add2

   fun_add2 -> emit event_add2 and return data of new task to App

   

3. In App

   @event_add2 -> fun_add3

   fun_add3 -> add new task to this.tasks

   ```vue
   this.tasks = [...this.tasks, newTask]
   ...--> original
   ```


​		

​		To achieve this with API

```js
async fun_add3(newTask){
      await TaskAPI.insertTask(newTask);
      this.tasks = await TaskAPI.getTasks();
    },
```



### 5. Switch Reminder

1. In Task, Double click whole div to return id of task

   ```vue
   <div @dbclick="fun_reminder">
       
   </div>
   ```

   

2. In Tasks, return id of tasks

3. In App, find task with returned id and set its reminder to opponent

``` vue
<script>
	given id of target reminder
    fun(id):{
        this.tasks = this.tasks.map(
        (task) => task.id === id? {...task, reminder: !task.reminder} : task
      )
    }
</script>
```



### 6.Switch ON/OFF

1. pass click event from Switch to Tasks

   ```vue
   <script>
   	fun_switch1(event) {
       	event.preventDefault();
       	this.$emit('event_switch1')
       }
   </script>
   ```

   

2. pass empty event from Tasks to App

   Notice empty event does not need preventDefault()

   ```vue
   <script>
   	fun_switch2(){
   		this.$emit('event_switch2')
   	}
   </script>
   ```

   

3. switch isShowTask in data of App

   ```vue
   <script>
   	fun_switch2(){
   		this.isShowTask = !this.isShowTask
   	},
   </script>
   ```


​		

​		To achieve this with API

```js
async fun_reminder3(id){
      await TaskAPI.putTask_reminder(id);
      this.tasks = await TaskAPI.getTasks();
    }
```



## TaskAPI(frontend connects server)

Overall structure

1. Send permission by axios(just like postman)
2. return data back to frontend



url: '/api/task/'

APIs:

1. Get Task

   ```js
   static async getTask() {
       const res = await axios.get('/')
       try{
           const data = res.data;
           return data
       } catch (err) {
           retrun err
       }
   }
   ```

   

2. Create Task

   post function (param1: url, param 2: body)

   ```
   static async createTask(newTask) {
   	const res = await axios.post('/', newTask)
   }
   ```

   

3. Delete Task

   ```js
   static async deleteTask(id){
   	const res = await
   	axios.delete(`${url}/${id}`);
   	try {
           const data = res.data;
               return data;
           } catch (err) {
           	return err;
           }
   }
   ```

   

4. Switch reminder of Task

   ```js
   static async putTask_reminder(id) {
         const res = await axios.put(`${url}/reminder/${id}`)
         try {
           const data = res.data;
           return data;
         } catch (err) {
           return err;
         }
       }
   ```

5. export module

   ```js
   export default TaskAPI
   ```

To export all APIs at the same time, we define them in class TaskAPI. To avoid definition of class, we set all API function as static



## Build static app

we want to export app into '/server/public'

- create a file named 'vue.config.js' in client

- change path of url in TaskAPI

- change path of export

  ```js
  const path = require('path');
  const port = process.env.PORT || 5000;
  
  module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
      proxy: {
        '/api': {
          target: `http://localhost:${port}`
        }
      }
    }
  }
  ```

- export app

  

# Create App in Heroku

1. install heroku
2. git operation
3. log in
4. create app
5. remote
6. push into heroku
