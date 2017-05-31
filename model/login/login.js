var request = require("request");
var iconv = require("iconv-lite");
var cheerio = require("cheerio");

function login(userid,password,session,verCode,callback){
	if(!userid || !password){
		callback("Account error");
		alert("学号/密码输入有误");
		return;
	}

	var url = "http://jwkq.xupt.edu.cn:8080/Account/Login";
	var data = {
		'UserName':userid,
		'UserPassword':password,
		'ValiCode':verCode
	};
	// var jsonString  = '{';
	// for(var key in data){
	// 	var abc = '\"' + key + '\"' + ':' + '\"' + data[key] + '\"' + ',';
	// 	jsonString += abc;
	// }
	// jsonString =jsonString.substring(0,jsonString.length-1) + "}";
	var  jsonString = JSON.stringify(data);
	request({
		url:url,
		method:"POST",
		form:jsonString,
		headers:{
			"Accept":"application/json, text/javascript, */*; q=0.01",
			"Accept-Encoding":"gzip, deflate",
			"Accept-Language":"zh-CN,zh;q=0.8",
			"Proxy-Connection":"keep-alive",
			// "Content-Length":100,
			"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
			"Host":"jwkq.xupt.edu.cn:8080",
			"Origin":"http://jwkq.xupt.edu.cn:8080",
			"Referer":"http://jwkq.xupt.edu.cn:8080/Account/Login",
			"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
			"X-Requested-With":"XMLHttpRequest",
			"Cookie":session
		}
	},
	function(err,res,body){
		if(err){
			callback(true,err);
			return;
		}

    	var json = JSON.parse(body);
    	console.log(json);
    	var cookie,className,name,flag=0,t=0;
    	for(var key in json){
    		if(key == "IsSucceed" && json[key] === true){
    			var setCookie = res.headers["set-cookie"][0];
    			var index = setCookie.indexOf(";");
    			cookie = setCookie.substr(0 , index);
    			flag = 1;
    		}
 			if(key == "Obj" && flag === 1){
    			var j = json[key];
    			t=1;
    			for(var k in j){
    				if(k == "BJ"){
    					className=j[k];
    				}
    				if(k == "NAME"){
    					name = j[k];
    				}
    			}
    		}
    	}
    	if(t === 1){
    		var obj = {
			    class:className,
			    name:name,
			    cookie:cookie
			};
			callback(false,obj);
    	}else{
    		callback(true,json["Msg"]);
    	}
	})
}

module.exports = login;
