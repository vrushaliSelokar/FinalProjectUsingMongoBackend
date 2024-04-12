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
  .collection("room")
  //.find().sort({ name: 1 }).toArray(); //1:ascending, -1:descending
  //.find({email:"mark_fhh@gh.es"})  //email:/^m/  email start with m
  .find().sort({name:1}).toArray();
  console.log("data >> ", data);
  res.json(data);

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "cart_app",
  // });

  // con.connect(function (err) {
  //   if (err) throw err;
  //   con.query("SELECT * FROM users", function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //     res.json(result);
  //   });
  // });
});

router.post("/", async function (req, res) {
  let dbo = await client.db("testdb");
  var myobj = req.body;
  let data = await dbo.collection("room").insertOne(myobj);
  console.log(data);
  res.json({ message: "1 record inserted" });

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "cart_app",
  // });
  console.log(req.body);

  const user = req.body;

  // con.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   var sql = `INSERT INTO users (username,password,email,first_name,last_name) 
  //     VALUES ('${user.username}',
  //     '${user.password}',
  //     '${user.email}',
  //     '${user.first_name}',
  //     '${user.last_name}')`;
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("1 record inserted");
  //     res.json({ message: "1 record inserted" });
  //   });
  // });
});

router.get("/:id", async function (req, res) {  //to access only single data at a time
  console.log("i am id= ",req.params.id);

      let dbo = await client.db("testdb");
      let data = await dbo.collection("room")
      .find({_id:new ObjectId("" +req.params.id +"")})
      .toArray();   //find({}).toArray() to access total data
      console.log("data >>",data);
      res.json(data[0]);

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "cart_app",
  // });

  // con.connect(function (err) {
  //   if (err) throw err;
  //   con.query(`SELECT * FROM users where id=${req.params.id}`,
  //    function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //     res.json(result[0]);
  //   });
  //});
  // console.log("id=== " + req.params.id);
  // res.json({ message: "Data Found" });
});

router.put("/:id",async function (req, res) {
  console.log("i am id= ",req.params.id);
  console.log(req.body);
  const user = req.body;

  var myquery = { _id:new ObjectId(req.params.id)};
  var newvalues = { $set:  req.body };

  let dbo = await client.db("testdb");
      let data = await dbo.collection("room").updateOne(myquery,newvalues);
  

  res.json({ message: "1 record updated" });

});

router.delete("/:id",async function (req, res) {  //to access only single data at a time
  console.log("i am id= ",req.params.id);
  
  console.log(req.body);
  const user = req.body;

  var myquery = { _id: new ObjectId((req.params.id).trim())};

  let dbo = await client.db("testdb");
      let data = await dbo.collection("room").deleteOne(myquery);
  
   res.json({ message: "1 record deleted" });
  
});
//Routes will go here
module.exports = router;
