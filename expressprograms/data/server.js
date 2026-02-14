        const express = require('express');
               const app = express();


        const morgan = require("morgan");
        app.use(morgan("dev"))
        // earlier for parsing we were writing below code:
        /*const bodyParser = require("body-parser")
        app.use(bodyParser.json());
         */ 
        app.use(express.json()); // built in middleware that parses JSON Body from  post & Put 

        app.set("view engine" ,"ejs");


      app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[LOG] ${timestamp} | Method: ${req.method} | URL: ${req.url}`);
    
    next(); 
});

function auth(req, res, next) {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

        //custom middleware
        app.use((err,req,res,next)=>{
            console.log("Middleware :" , req.method, req.url)
            console.log(err.message)
            res.status(500).send("internal server error")
            next(); //it is used to pass the control to route
        })

      

        //Routes
        //http://localhost:3000/user
        const products = [
            { id: 1, name: "Shoe", price: 500 },
            { id: 2, name: "Mobile", price: 20000 },
            { id: 3, name: "chair", price: 1000 }
          ];
        
       


        app.get("/productList"  ,(req,res)=>{

            res.render("productList",{products});
        })

        
         app.get("/error",(req,res)=>{
            throw new Error("Something went wrong!");
        })

        app.use((err, req, res, next) => {
         res.status(500);
         res.render("error", { message: err.message });
         });

        app.get("/user"  ,(req,res)=>{

            res.send("User fetched");
        })
        app.post("/userpost" ,auth , (req,res)=>{

            res.send("User data posted ");
        })
        app.put("/userput" , auth, (req,res)=>{

            res.send("User updated");
        })

        app.delete("/userdelete" ,auth,  (req,res)=>{

            res.send("User deleted");
        })

        app.listen(3000,()=>{
            console.log("Server running")
        })
        