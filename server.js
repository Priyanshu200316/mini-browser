const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/browse", async (req, res) => {
    let url = req.body.url;

    if (!url.startsWith("http")) {
        url = "http://" + url;
    }

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.send(`
            <h2 style="color:red;">Invalid URL or Failed to Load</h2>
            <a href="/">Go Back</a>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});