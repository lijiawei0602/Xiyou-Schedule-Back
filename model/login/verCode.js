var request = require("request");

var getVer = function(callback){
	var time = new Date().getTime();
	var url = "http://jwkq.xupt.edu.cn:8080/Common/GetValidateCode?time=" + time;
	var options = {
		url:url,
		method:"GET",
		encoding:null,
		Accept:"image/webp,image/*,*/*;q=0.8",
		headers:{
			Referer:"http://jwkq.xupt.edu.cn:8080/Account/Login"
		}
	};
	request(options,function(err,res,body){
		if(err){
			callback("server error",err);
			// console.log(err);
			return;
		}
		var session = res.headers["set-cookie"][0];

		session = session.substr(0,session.indexOf(";"));

		var imgBuf = body.toString("base64");
		imgBuf = "data:image/Gif;base64,"+imgBuf;
		callback(false,{
			session:session,
			verCode:imgBuf
		});
	});
};

module.exports = getVer;