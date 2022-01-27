const express = require("express");
const app = express();
const fileData = require("./data.json");
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post("/checkTail", async (req, res) => {
    const {id} = req.body.input.arg1;
    let info = {};
    for (let i = 0; i < fileData.length; i++) {
        const item = fileData[i];
        if (id === item.id) {
            info = item;
            break;
        }
    }
    res.status(200).json(info);
})

app.listen(3003, () => console.log(`Node server listening on port ${3003}!`));