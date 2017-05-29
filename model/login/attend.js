var request = require("request");
var cheerio = require("cheerio");

var attend = function(session,callback){
	var session = unescape(session);
	var options = {
		url:"http://jwkq.xupt.edu.cn:8080/User/GetAttendRepList",
		method:"POST",
		form:{
			json:true
		},
		headers:{
			"Accept":"application/json, text/javascript, */*; q=0.01",
			"Accept-Encoding":"gzip, deflate",
			"Accept-Language":"zh-CN,zh;q=0.8",
			"Connection":"keep-alive",
			"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
			"Cookie":session,
			"Host":"jwkq.xupt.edu.cn:8080",
			"Origin":"http://jwkq.xupt.edu.cn:8080",
			"Referer":"http://jwkq.xupt.edu.cn:8080/User",
			"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
			"X-Requested-With":"XMLHttpRequest"
		}
	};
	request(options,function(err,res,body){
		if(err){
			callback(true,err);
			return;
		}
		console.log(body);
		callback(false,body);
	});
};

module.exports = attend;