const express = require("express");
const app = express();

app.get('/', function(req, res) {
    res.json({
        msg: "app' works",
        data: null
    });
});

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log("node-docker-kube template app' listening at http://%s:%s", host, port);
});