
const fs=require("fs");
const homeFile=fs.readFileSync("home.html","utf-8");
const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const port=3000;

const replaceVal=(tempVal,orgVal)=>{
    let temprature= tempVal.replace("{%tempval%}",orgVal.main.temp);
    temprature= tempVal.replace("{%tempmin%}",orgVal.main.temp_min);
    temprature= tempVal.replace("{%tempmax%}",orgVal.main.temp_max);
    temprature= tempVal.replace("{%location%}",orgVal.name);
    temprature= tempVal.replace("{%country%}",orgVal.sys.country);
    temprature= tempVal.replace("{%tempstatus%}",orgVal.weather[0].main);
    console.log(orgVal.main.temp);
    console.log(orgVal.main.temp_min);
    console.log(orgVal.main.temp_max);
    console.log(orgVal.name);
    console.log(orgVal.sys.country);
    console.log(orgVal.weather[0].main);

 
    return temprature;

}

const server=http.createServer((req,res)=>{
    if(req.url == "/"){

    requests("http://api.openweathermap.org/data/2.5/weather?q=patna&appid=89ee55175df4d4deaadd3db29425eb65")
    .on("data",(chunk)=>{
        const objdata=JSON.parse(chunk);
        const arrdata=[objdata];
        console.log(arrdata[0].main.temp);

        const realTimeData=arrdata.map((val)=>replaceVal(homeFile,val)).join("");
        res.write(realTimeData);
    })
    .on("end",(err)=>{
        if(err) return console.log("connection closed due to error",err);
        res.end();
    });
}

});

server.listen(3000,"127.0.0.1");