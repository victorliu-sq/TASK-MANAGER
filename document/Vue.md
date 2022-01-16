# Vue

## commands to initiate

1. install vue

   ```
   npm install -g @vue/cli
   ```

2. create vue project

   ```
   vue create task-manager
   ```

3. run serve

   ```
   npm run serve
   ```

4. navigate to serve/ localhost page

   ```
   http://localhost:8080
   ```



## Basic Structure

```vue
<template>
	...
</template>


<script>
    ...
</script>


<style>
    ...
</style>
```

### 1.template

Similar to int main() in C / C++

operations of content of current node and descendants

```vue
<template>
	<div class="container">
        ...
    </div>
</template>
```



#### call current node

```vue
#a is prop of current node
1. call outside<>
{{a}}

2. call inside <>
"a"
```



#### call decendants

```vue
<C p = ...> 
#C is one Component and prop is its pros
```



#### v-bind: p - > c

we can use v-bind to give prop of current node to prop of its component.

```vue
<C v-bind:p= "P">
<C :p="P">
C is one Component
p is prop of Component
P is prop of current node
```



#### v-for

we can use v-for to iterate props

Notice that we need v-bind:key to keep each p unique

```vue
<div :key="idx" v-for="(p, idx) in P">
	...
</div>
#P is prop of current node
#p is temp variable
```



#### v-on: c -> p

we can use v-on and $emit to pass prop to parent / ancestors



v-on:event="func(p)"

func will use emit to pass p to its parent

p is prop of current node -> n

```vue
<...v-on:click="func(p)" ...>
    or
<...@click="func(p)">
    
export default{
    
    func(p){
    	this.$emit('cus-event', p)
    }
}
```

In the parent, it can use v-on / @ like this:

```vue
<n @cut-event:"func">
generally this is where we bind children
    
export default{
    
    func(p){
    	this.$emit('cus-event', p)
    }
}
```



### 2.script

#### root:

new Vue --> similar to class

el + data + methods

```vue
<script>
	new Vue({
        el: '#app',
        data (){
            return {
                a : A,
            }
        },
        methods: {
            funA() {
                return ...
            }
        },
    })
</script>
```



#### node:

export default --> similar to class

name + data / prop + methods

```vue
<script>
    import component1 from './path of component1'
    
	export default {
        name: A,
        components:{
            component1,
            component2,...
        }
        prop: {
            A: B
        },
        method: {
            funcA(param1...){
                return...
            }
        }
    }
</script>
```



components are name of children of current node



### 3.style

css template



