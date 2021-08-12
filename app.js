

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

const bcrypt = require("bcryptjs");
// const userProfile = require('./models/sindhureg');
// const sindhureg = userProfile.find({});
require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");
// const display = require('./models/sindhureg')


const port = process.env.PORT || 3000;




const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");



app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);



app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get("/", (req, res) => {
    res.render("index");
});


app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/logout", (req, res) =>{
    res.render("login");
});
app.get("/home" , (req, res)=>{
    res.render("index")
})

app.get("/profile" , (req, res) =>{
    // res.render("database");
    
    Register.find({},  (err, data)=>{
        if(err){
            res.json(err);
        }else{

            res.render("database", {records : data})
        }

    })
})
app.get("/Register/:email" , (req, res) =>{
    // res.render("database");
    
    Register.find({email:req.params.email},  (err, data)=>{
        if(err){
            res.json(err);
        }else{

            res.render("show", {records : data[0]})
        }

    })
})


// ..............................................................
// Create User...
app.post("/register", async(req, res) => {
    try{
        
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password === confirmPassword) {

            const registerEmployee = new Register({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmPassword: password
            })

            // Secure Password using Hashing...

            const registered = await registerEmployee.save();
 
            res.status(201).render("login");

        }else{
            res.send("Password are not matching");
        }

    }catch(e){
        res.status(400).send(e);
        console.log("the error part page");
    };
});
// ..............................................................

//LOGINNN

app.get("/login", (req, res) => {
    res.render("login");
});

//..............................................................
//Get User
app.post("/login", async(req, res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;
        const userLogin = await Register.findOne({email});

        const isMatch = await bcrypt.compare(password, userLogin.password);

        


        if(isMatch) {
            res.status(201).render("index");
        }else{
        
            res.status(400).send("Invalid login Details");
        }

    }catch(e){

        res.status(400).send("Invalid login Details");
    }
    // res.render("index");
});
// ..............................................................


// app.get("/about", (req, res) => {
//     res.render("about");
// });

// app.get("/contact", (req, res) => {
//     res.render("contact");
// });


// Listening Port..........................................
app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
});