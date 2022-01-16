const posts = [
    {
        title: 'post 1',
        body: 'this is post 1',
    },

    {
        title: 'post 2',
        body: 'this is post 2',
    }
]

function get() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let output='';
            posts.forEach((post, index) => {
                output += `<li>${post.title}</li>`;
            });
            document.body.innerHTML = output;

            const error = false;

            if (!error) {
                resolve();
            } else {
                reject('Error')
            }
        }, 2500);
    });
}

function create(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            
            const error = false;

            if (!error) {
                resolve();
            } else {
                reject('Error')
            }
        }, 5000);
    });
}

async function init(){
    //await create({title: 'post 3', body: 'this is post 3'});
    
    await get()
}

async function helper() {
    init();
    let output='';
    posts.forEach((post, index) => {
        output += `<li>${post.body}</li>`;
    });
    document.body.innerHTML = output;
}

helper();