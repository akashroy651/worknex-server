const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
//  conect mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// midleware
app.use(cors());
app.use(express.json());

// db user: worknex_db
// bd pass: hgH8UNSIXTr3zXYz
const uri =
  "mongodb+srv://worknex_db:hgH8UNSIXTr3zXYz@cluster0.d3mrlwo.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("worknex-db");
    const worknexcollection = db.collection("models");

    // all ar jonono
    app.get("/models", async (req, res) => {
      const result = await worknexcollection.find().toArray();
      res.send(result);
    });

    // only akta datar view ar jonno
    app.get("/models/:id", async (req, res) => {
      const { id } = req.params;

      //    const objectId -= new objectId(id)
      // const result = await worknexcollection.findOne({_id: ObjectId})
      // short cur use kore
      const result = await worknexcollection.findOne({ _id: new ObjectId(id) });
      res.send({ succes: true, result });
    });

    //  post method
    app.post("/models", async (req, res) => {
      const data = req.body;
      const result = await worknexcollection.insertOne(data);
      res.send({ success: true, result });
    });

    // update ar jonno PUT method use kore thaki
    //  updateOne
    // updateMany

    app.put("/models/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      // console.log(data)
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const update = {
        $set: data,
      };
      const result = await worknexcollection.updateOne(filter, update);
      res.send({ success: true, result });
    });

    // delete korar jonno
    app.delete("/models/:id", async (req, res) => {
      const { id } = req.params;
      // const objectId = new ObjectId(id)
      //const filter = {_id: objectId}
      const result = await worknexcollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send({ success: true, result });
    });

    // latest home data
    app.get("/modelscard", async (req, res) => {
      const result = await worknexcollection.find().limit(9).toArray();
      console.log(result);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" simple worknex server is running");
});

app.listen(port, () => {
  console.log(`simple worknex server is running on port ${port}`);
});
