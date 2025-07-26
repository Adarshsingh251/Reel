require("dotenv").config();;
let express = require("express");
let app = express();
let {v4:uuidv4} = require("uuid");
let mysql2 = require("mysql2");

let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

const connection = mysql2.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_ROOT,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})  
app.get("/home",(req,res)=>{
    let q = "select * from videos order by sortById desc";
    connection.query(q,(err,result)=>{
        if(err){
            console.log(`err message from /home : ${err.message}`);
           return; 
        }
        else{
            res.render("index.ejs",{result})
            // console.log(result);            
        }
    })
})
app.get("/newVideo",(req,res)=>{
    res.render("addVideo.ejs")
})
app.post("/dedo",(req,res)=>{
    let id = uuidv4();
    let {link} = req.body;
    let linkShort = link.replace("shorts","embed").split("").splice(0,41).join("");
    // console.log(linkShort);
    
    let data  = [id,linkShort];
    let q = `insert into videos (id,link) value (?)`;
    connection.query(q,[data],(err,result)=>{
        if(err){
            console.log(`err found in /dedo : ${err.message}`);
            return;
        }
        else{
            console.log(result);
            res.redirect("/home");
        }
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`port ${process.env.PORT} is listening Continously`);
    
})