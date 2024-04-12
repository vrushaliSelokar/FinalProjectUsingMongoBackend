var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var app = express();
var MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
 /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
 const uri =
 "mongodb+srv://vrushali4kharabe:llHD5Rezvfb4wkAd@vrushali.3qnhohs.mongodb.net/?retryWrites=true&w=majority&appName=vrushali";


 
const client = new MongoClient(uri);

router.get("/", async function (req, res) {
  let dbo = await client.db("testdb");
  let data = await dbo
  .collection("users")
  //.find().sort({ name: 1 }).toArray(); //1:ascending, -1:descending
  //.find({email:"mark_fhh@gh.es"})  //email:/^m/  email start with m
  .find().sort({name:1}).toArray();
  console.log("data >> ", data);
  res.json(data);

});

router.post("/", async function (req, res) {
  let dbo = await client.db("testdb");
  var myobj = req.body;
  let data = await dbo.collection("users").insertOne(myobj);
  console.log(data);
  res.json({ message: "1 record inserted" });

  console.log(req.body);

  const user = req.body;

});

router.get("/:id", async function (req, res) {  //to access only single data at a time
  console.log("i am id= ",req.params.id);

      let dbo = await client.db("testdb");
      let data = await dbo.collection("users")
      .find({_id:new ObjectId("" +req.params.id +"")})
      .toArray();   //find({}).toArray() to access total data
      console.log("data >>",data);
      res.json(data[0]);

});

router.put("/:id",async function (req, res) {
  console.log("i am id= ",req.params.id);
  console.log(req.body);
  const user = req.body;

  var myquery = { _id:new ObjectId(req.params.id)};
  var newvalues = { $set:  req.body };

  let dbo = await client.db("testdb");
      let data = await dbo.collection("users").updateOne(myquery,newvalues);
  

  res.json({ message: "1 record updated" });

});

router.delete("/:id",async function (req, res) {  //to access only single data at a time
  console.log("i am id= ",req.params.id);
  
  console.log(req.body);
  const user = req.body;

  var myquery = { _id: new ObjectId((req.params.id).trim())};

  let dbo = await client.db("testdb");
      let data = await dbo.collection("users").deleteOne(myquery);
  
   res.json({ message: "1 record deleted" });
 
});

router.post("/login", async function (req, res) {
  let dbo = await client.db("testdb");
  var myobj = req.body;
  var query = req.body;
  let data = await dbo.collection("users").find(query).toArray();
  console.log(data);
  //res.json({ message: req.body, response:data });

  //console.log(req.body);

  //const user = req.body;
  if(data.length>0){
    res.json({message_code:1001, message:"Login Successfully"});
  }else{
    res.json({error_code:-1001, error_message:"Please check username or passwprd"});
  }

});
//Routes will go here
module.exports = router;
