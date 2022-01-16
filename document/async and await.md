# Timer of Function

```js
function get1() {
    return new Promise((resolve, reject) => {
        setTimeout(fun, 2500);
    });
}

function get2() {
    return new Promise((resolve, reject) => {
        fun;
    });
}
```

get1 will take some time to execute fun whereas get2 will  make operation immediately. In fact, there is a timer in get1. It is assumed that get1 has been executed once timer has been start instead of execution of fun.



# Async and sync

Assume now we have fun1, fun2 and fun3. All of them will take some time to execute fun inside. 

```js
function test1() {
    fun1;
    fun2;
    fun3;
}

async function test2() {
    await fun1;
    await fun2;
    await fun3;
}
```

In test1, timer of all fun1 will start at the same time --> that's reason why it is called synchronized function

In test, timer of fun2 will start after execution of fun1



# Await

assume we have fun, ffun1, ffun2

```js
fffun(){
	return new Permission --> set time out
}

async ffun1(){
    await fffun()
}

async ffun2(){
    await fffun()
}
```



Even though ffun1 and ffun2 has awaited fffun, to execute ffun1 and ffun2 in order, it's necessary to await them

```js
async fun(){
	await ffun1();
	await ffun2();
}
```