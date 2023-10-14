let express = require("express");
let fs = require('node:fs');

const avengersData = {
    avengers: [
    
    ]
  };

  try {
    const data = fs.readFileSync("simple.json", "utf-8");
    if (data) {
        avengersData.avengers = JSON.parse(data).avengers;
    }
} catch (error) {
    console.error("Error reading file:", error);
}

let app = express();
app.use(express.urlencoded({extended :  true}))

app.get("/",(req,res)=>{
    res.render("home.pug", { avengersData})

})

app.post("/",(req,res)=>{
    req.body = {
        ...req.body,
        ...avengersData
      };
    const { ntitle, nfirstname, nlastname, ncity, npower } = req.body;
    avengersData.avengers.push({
    title: ntitle,
    firstname: nfirstname,
    lastname: nlastname,
    city: ncity,
    power: npower
  });

  

  fs.writeFileSync("simple.json", JSON.stringify(avengersData, null, 2), "utf-8");
  console.log(avengersData);
  res.redirect("/");

})
app.listen(3030, "localhost",error=>{
    if(error){
        console.log("Error : ", error)
    }
    else{
        console.log("successful")
    }
})