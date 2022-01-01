const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());
// Port
const port = process.env.PORT || 9000;
//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.td49h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//
async function run() {
  try {
    await client.connect();

    const database = client.db("heroRide");
    const rideCollection = database.collection("rideUser");
    const learnerCollection = database.collection("learnerUser");
    const adminCollection = database.collection("admin");

    //rideUser Get & Post & Delete
    ///get
    app.get("/rideUser", async (req, res) => {
      const cursor = rideCollection.find({});
      const ridrsInfo = await cursor.toArray();
      res.json(ridrsInfo);
    });
    //post
    app.post("/rideUser", async (req, res) => {
      const rideRegister = req.body;
      const result = await rideCollection.insertOne(rideRegister);
      res.json(result);
    });
    //delete
    app.delete("/rideUser/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await rideCollection.deleteOne(query);
      res.json(result);
    });
    //
    ////  learner Get & Post & Delete
    //get
    app.get("/learnerUser", async (req, res) => {
      const cursor = learnerCollection.find({});
      const learnersInfo = await cursor.toArray();
      res.json(learnersInfo);
    });
    //post
    app.post("/learnerUser", async (req, res) => {
      const learnerRegister = req.body;
      const result = await learnerCollection.insertOne(learnerRegister);
      res.json(result);
    });
    //detele
    app.delete("/learnerUser/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await learnerCollection.deleteOne(query);
      res.json(result);
    });

    // admin get
    app.get("/admin", async (req, res) => {
      const cursor = adminCollection.find({});
      const adminInfo = await cursor.toArray();
      res.json(adminInfo);
    });
    //
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
//

app.get("/", (req, res) => {
  res.send("Hero Ride");
});

app.listen(port, () => {
  console.log(`localhost : ${port}`);
});
