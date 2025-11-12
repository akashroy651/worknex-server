const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
//  conect mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");

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

    app.get("/models", async (req, res) => {
      const result = await worknexcollection.find().toArray();
      res.send(result);
    });

//  post method
app.post('/models',async (req,res) => {
    const data =req.body
     const result = await worknexcollection.insertOne(data)
    res.send({success: true,
        result
    })
})


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
