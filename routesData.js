var express = require("express");
var passport = require("passport");
var path = require("path");

var User = require("./models/user");
var router = express.Router();

const myDatabase = require('./myDatabase');    //added
let db = new myDatabase();

const Data = require('./Data');


//function ensureAuthenticated(req, res, next) {
//  if (req.isAuthenticated()) {
//    next();
//  } else {
//    req.flash("info", "You must be logged in to see this page.");
//    res.redirect("/login");
//  }
//}

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


router.get("/userInfo",function(req,res){
  console.log("get userInfo");
     if (req.isAuthenticated()) {
  console.log("req isAuthenticated");
  console.log("valueJY = " + req.user.valueJY);    /* user defined value */
console.log("userInfo = " + req.user.username)
    db.getData(req.user.username,res);

//    res.json({username:req.user.username});
  }
  else {
  console.log("req is not Authenticated");
    res.json(null);
  }
});

router.get("/adminInfo",function(req,res){

  if (req.isAuthenticated()) {

        if (req.user.username == "admin")
        {
            initAdmin(req,res);
        }
        else
          res.json(null);          

  }
  else {
    res.json(null);
  }
});
function initAdmin(req,res) {
  console.log("initAdmin");
//  console.log(req.user.ident);
  console.log(req.user.username);

  db.getUsers(res);

}


router.post('/create', function(req, res){ 
    if (req.user.username == "admin") {
      res.json(null);
      return;
    }

  if (req.isAuthenticated()) {
      let obj = new Data(req.user.username,req.body.grade);     
      return(db.postData(obj,res));    
  } else {
    res.json(null);
  }
});

router.get("/read", function(req, res) {
  if (req.isAuthenticated()) {  
    return(db.getData(req.user.username,res));
  } else {
    res.json(null);
  }
});

router.put("/update", function(req, res) {
	if (req.isAuthenticated()) {	
    	let obj = new Data(req.user.username,req.body.grade);     
    	return(db.putData(obj,res));
  	} else {
  		res.json(null);
  	}
});



/*
router.get("/update", function(req, res) {
	if (req.isAuthenticated()) {	
  		console.log("update grade is " + req.query.grade);
  		res.json(null);
  	} else {
  		res.json(null);
  	}
});
*/
/*
router.put('/update', function(req, res){

	if (req.isAuthenticated()) {

		if (req.body.name == "") {
			res.json(null);
			return;
		}
//added below for mongo		
	let obj = new Student(req.user.ident,req.user.username,req.body.grade,req.body.volleyball,req.body.basketball,req.body.soccer);
		return(db.putStudent(obj,res));

	}
	else
		res.json(null);
});
*/


module.exports = router;

