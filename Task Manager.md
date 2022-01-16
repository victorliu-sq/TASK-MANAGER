# Task Manager

## <u>App</u>

### 	<u>header</u>

### 	<u>Tasks</u>

#### 		<u>Form of new task</u>

##### 				<u>Button to add</u>

#### 		<u>Task</u>

##### 				<u>Button to delete</u>

### 	<u>footer</u>



## App:

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

