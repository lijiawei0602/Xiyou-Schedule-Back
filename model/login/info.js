var request = require("request");
var cheerio = require("cheerio");

var info = function(session,callback){
	if(!session){
		callback(true,"重新登录");
		return;
	}
	session = unescape(session);
	var options = {
		url:"http://jwkq.xupt.edu.cn:8080/User/Schedule",
		method:"GET",
		headers:{
			"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Encoding":"gzip, deflate, sdch",
			"Accept-Language":"zh-CN,zh;q=0.8",
			"Connection":"keep-alive",
			"Cookie":session,
			"Host":"jwkq.xupt.edu.cn:8080",
			"Referer":"http://jwkq.xupt.edu.cn:8080/User/Schedule",
			"Upgrade-Insecure-Requests":"1",
			"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"	
		}
	};

	request(options,function(err,res,body){
		if(err){
			callback(true,err);
			return;
		}
		// console.log(body);
		var ifSuccess = body.indexOf("课表信息");
		if(ifSuccess == -1){
			callback(true,"重新登陆");
			return;
		}
		var $ = cheerio.load(body);
		var semester = $(".kebiaobox h2").text();
		var firstIndex = semester.indexOf("2");
		semester = semester.substr(firstIndex,11);
		// var reg = /^[1-9]{4}-[1-9{4}-{1-2}{1}$/g;
		// semester = reg.exec(semester);
		// console.log(semester);
		getStuSchedule(session,semester,callback);
	});
};

var getStuSchedule = function(session,semester,callback){
	var options = {
		url:"http://jwkq.xupt.edu.cn:8080/User/GetStuClass",
		method:"POST",
		form:{
			term_no:semester,
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
			"Referer":"http://jwkq.xupt.edu.cn:8080/User/Schedule",
			"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
			"X-Requested-With":"XMLHttpRequest"
		}
	};
	// console.log(semester);
	request(options,function(err,res,body){
		if(err){
			callback(true,err);
			return;
		}
		// console.log(body);
		var jsonBody = JSON.parse(body);
		var arr = [{"1-2":"","3-4":"","5-6":"","7-8":""},{"1-2":"","3-4":"","5-6":"","7-8":""},{"1-2":"","3-4":"","5-6":"","7-8":""},{"1-2":"","3-4":"","5-6":"","7-8":""},{"1-2":"","3-4":"","5-6":"","7-8":""}];
		// console.log(jsonBody);
		for(var key in jsonBody){
			if(key == "Obj"){
				var array = jsonBody[key];
				for(var i=0;i<array.length;i++){
					var p = array[i];
					switch(p["WEEKNUM"]){
						case 1: if(p["JT_NO"] == "1-2"){var data = {weekNum:"1",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[0]["1-2"] = data}
								if(p["JT_NO"] == "3-4"){var data = {weekNum:"1",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[0]["3-4"] = data}
								if(p["JT_NO"] == "5-6"){var data = {weekNum:"1",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[0]["5-6"] = data}
								if(p["JT_NO"] == "7-8"){var data = {weekNum:"1",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[0]["7-8"] = data}
								
								break;
						case 2: if(p["JT_NO"] == "1-2"){var data = {weekNum:"2",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[1]["1-2"] = data}
								if(p["JT_NO"] == "3-4"){var data = {weekNum:"2",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[1]["3-4"] = data}
								if(p["JT_NO"] == "5-6"){var data = {weekNum:"2",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[1]["5-6"] = data}
								if(p["JT_NO"] == "7-8"){var data = {weekNum:"2",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[1]["7-8"] = data}
								
								break;
						case 3: if(p["JT_NO"] == "1-2"){var data = {weekNum:"3",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[2]["1-2"] = data}
								if(p["JT_NO"] == "3-4"){var data = {weekNum:"3",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[2]["3-4"] = data}
								if(p["JT_NO"] == "5-6"){var data = {weekNum:"3",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[2]["5-6"] = data}
								if(p["JT_NO"] == "7-8"){var data = {weekNum:"3",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[2]["7-8"] = data}
								
								break;
						case 4: if(p["JT_NO"] == "1-2"){var data = {weekNum:"4",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[3]["1-2"] = data}
								if(p["JT_NO"] == "3-4"){var data = {weekNum:"4",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[3]["3-4"] = data}
								if(p["JT_NO"] == "5-6"){var data = {weekNum:"4",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[3]["5-6"] = data}
								if(p["JT_NO"] == "7-8"){var data = {weekNum:"4",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[3]["7-8"] = data}
								
								break;
						case 5: if(p["JT_NO"] == "1-2"){var data = {weekNum:"5",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[4]["1-2"] = data}
								if(p["JT_NO"] == "3-4"){var data = {weekNum:"5",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[4]["3-4"] = data}
								if(p["JT_NO"] == "5-6"){var data = {weekNum:"5",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[4]["5-6"] = data}
								if(p["JT_NO"] == "7-8"){var data = {weekNum:"5",scheduleName:p["S_Name"],classRoom:p["RoomNum"]}; arr[4]["7-8"] = data}
								
								break;
						default:
							break;
					}
				}

				callback(false,arr);
				break;	
			}
		}
	});
};

module.exports = info;