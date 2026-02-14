// function login(cb){
//     setTimeout(()=>{
//         console.log("Login success");
//         cb();
//     },2000)
// }



//Instead of this we can use Promise  promise has 3 states :
/*
Pending
Fulfilled
rejected
 */
const login =()=> new Promise(fullfilled=>{
    setTimeout(()=>{
        console.log("Login success");
        fullfilled();
    },2000)
});

const fetchProfile =()=> new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Profile fetched");
        resolve();
    },2000)
});

const fetchOrders =()=> new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Orders fetched");
        resolve();
    },2000)
});

login()
.then(()=>fetchProfile())
 .then(()=>fetchOrders())
 .then(()=>console.log("All done"))
 

