//  Here package-lock.json keep track of dependencies which can be initalised by using npm install
// importing express
const express=require('express');
const path=require('path');//for dealing with file path
const { title } = require('process');
const port=8000;
// creating an app which contain all the functionalities of the express library
const app=express();

// Setting up template engine ejs
app.set('view engine','ejs'); //app.set()-> setting the value for a property

//setting views to file via path
app.set('views',path.join(__dirname,'views'));//dirname->display the directory from where server started,'filename'

app.use(express.urlencoded())// this is a middleware.A middleware is a function which has acces to request and response and it can analyze/reporcess the data present in request and response anf convert the data into key value pair  and put it in request.data  ,also it can retuen the response, This will read only form data not the params

// making middleware for using static files
app.use(express.static('./assets'));// It will find the folder name asstes for different files like css js images

/*
// MAKING OUR OWN MIDDLEWARE
app.use(function(req,res,next){// next passes on the changes done and call next middleware if not then passes to controller 
  console.log("MIDDLEWARE 1 CALLED");
  req.myName="yash";
  next(); // after this next the page starts to render as it pass it to next middleware or controller   
})

// MIDDLEWARE 2
app.use(function(req,res,next){// next passes on the changes done and call next middleware if not then passes to controller 
  console.log("Name from MW 1 is ",req.myName);
  next();    
})

*/
var contactList=[
    {
        name:"Yash",
        phone:"88606XXXXX"
    },
    {
        name:"Tracy",
        phone:"90606XXXXX"
    },
    {
        name:"Steve",
        phone:"9909XXXXX"
    }
]




app.post('/create-contact',function(req,res){
    // console.log(req.body);
    // console.log(req.body.name);
    contactList.push({
        name:req.body.name,
        phone:req.body.phone
    })
    // return res.redirect('/') // tells the browser to go to that route
    // same as above 
    return res.redirect('back') 
})



// all switch cases converted to this .get() function
app.get('/',function(req,res){
    // console.log(req.myName);
    
    // here it will automatically detect html like we have create res.writeHead but here no need of that 
    return  res.render('home',{
        title:"My Contact List", //file name in views
        contact_list:contactList
    })
    //last statement in the controller and it is rendering or sending some response then we must return it 
})

app.get('/about',function(req,res){
    return res.render('about',{
        title:'About'
    })
})

/*
param -> /delete-contact/10 ->this '10' is param,here we have to tell the controller and make the varibale to handel the number
Querryparam -> /delete-contact/?phone=234/?id=12 ->this '?' is Querryparam and we can chain it ?phone&name&etc.....
*/

/*
// STRING PARAM here '/:phone' is a variable
app.get('/delete-contact/:phone',function(req,res){
    console.log(req.params);
    let phone=req.params.phone
})
*/

// Querryparam here
app.get('/delete-contact',function(req,res){
    // console.log(req.query); this contain both name and phone as passed by the route
    let phone=req.query.phone
    // findindex is javascript index it'll iterate over each element in the index
    let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
})

// RUN THE SERVER
app.listen(port,function(error){
    if(error){
        console.log("error");
       return;
    }
    console.log("Express server is running on port ",port);
})