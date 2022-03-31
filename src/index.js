const express=require("express");
const path=require("path");
const fs=require("fs");
const hbs=require("hbs");
const requests=require("requests");
const app=express();
const port=3000;
const temp=28.7;
const templatePath=path.join(__dirname,"/templates/views");
const partialsPath=path.join(__dirname,"/templates/partials");

//setting hbs as view engine
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);

app.get("/",(req,res)=>{
    requests("http://api.openweathermap.org/data/2.5/weather?q=bettiah&appid=89ee55175df4d4deaadd3db29425eb65")
    .on("data",(chunk)=>{
        
        fs.writeFileSync("api.json",chunk);

    })
    .on("end",(err)=>{
        if(err) return console.log("connection closed due to error",err);
        res.end();
    });
    const data=fs.readFileSync("api.json","utf-8");
    const orgobj=JSON.parse(data);
    const arrdata=[orgobj];
    console.log(arrdata[0].main.temp);
    const temp=Number(arrdata[0].main.temp-273).toFixed(1);

    res.render("home",{
        tempval:temp,
        tempmin:Number(arrdata[0].main.temp_min-273).toFixed(1),
        tempmax:Number(arrdata[0].main.temp_max-273).toFixed(1),
        location:arrdata[0].name,
        country:arrdata[0].sys.country,
        tempstatus:arrdata[0].weather[0].main,
    });
});
app.listen(port,()=>{
    console.log(`welcome to port no ${port}`);
});