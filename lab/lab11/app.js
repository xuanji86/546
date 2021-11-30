const express = require('express')
const app = express();
const path = require('path');
console.log(__dirname)
const static  = express.static(__dirname + "/public")

app.get('/', function(req, res){
	res.sendFile("main.html", {root: path.join(__dirname)}, function (err){
		if(err){
			next(err)
		} else{
			console.log("in route")
		}
	})
})

app.use("/public", static)
app.listen(3000, function(err){
	if(err) console.log(err)
	console.log("on localhost:3000")
})