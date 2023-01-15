const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();

mongoose.set("strictQuery", true);

app.use(express.json());

mongoose.connect("mongodb+srv://Nish54321:Nish54321@rajnishcalifornium.qhqnlpb.mongodb.net/RajnishCalifornium",
    { useNewUrlParser: true }
)
    .then(() => console.log("DB is connected."))
    .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, function () {
    console.log("Express app is running on port " + 3000);
});