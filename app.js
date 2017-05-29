var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var router = express.Router();
var app = express();

app.listen(4000);

var verCode = require("./model/login/verCode.js");
var login = require("./model/login/login.js");
var info = require("./model/login/info.js");
var attend = require("./model/login/attend.js");

var json = function(err,res,result){
	if(err){
		res.jsonp({
			err:true,
			result:result
		});
	}else{
		res.jsonp({
			error:false,
			result:result
		});
	}
};
router.use(cookieParser());
router.use(session({
	secret:'secret',
	name:"session from power",
	cookie:{maxAge:8000000},
	resave:true,
	saveUninitialized:false
}));

app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

router.use("/verCode",function(req,res){
	verCode(function(err,result){
		json(err,res,result);
	});
});

router.use("/login",function(req,res){
	var userid = req.param("userid");
	var password = req.param("password");
	var session = req.param("session");
	var verCode = req.param("verCode");
	login(userid,password,session,verCode,function(err,result){
		json(err,res,result);
	});
});

router.use("/info",function(req,res){
	var session = req.param("session");
	info(session,function(err,result){
		json(err,res,result);
	});
});

router.use("/attend",function(req,res){
	var session = req.param("session");
	attend(session,function(err,result){
		json(err,res,result);
	});
});

app.use("/",router);
