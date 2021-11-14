const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors({
    origin: '*'
}));
	
app.use(express.json());  

app.get('/', function(req, res) {
    res.json({
        msg: "app' works",
        data: null
    });
});

app.post('/', function(req, res) {
    console.log(req.body);
    res.send("OK");
});

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log("node-docker-kube template app' listening at http://%s:%s", host, port);
});