const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080;
const arr = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here


app.get("/api/student", (req, res) => {
    try {

        res.json({
            status: "success",
            arr
        })

    } catch (e) {
        res.json({
            status: "failed",
            msg: e.message
        })
    }
}
)


app.get("/api/student/:id", (req, res) => {
    try {
        let id = req.params.id;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                res.json({
                    status: "success",
                    data: arr[i]
                })
            }
            res.json({
                status: "failure",
                message: "not found id"
            })
        }
    } catch (e) {
        res.json({
            status: "failed",
            msg: e.message
        })
    }
})


app.post("/api/student", (req, res) => {
    try {
        if (req.body.name == "" || req.body.currentClass == "" || req.body.divison == "") {
            res.status(400).json(
                {
                    status: "failure",
                    message: "empty data"
                }
            )
        }
        else {
            let id = parseInt(arr.length) + 1;
            let new_data = { id: id, currentClass: req.body.currentClass, name: req.body.name, division: req.body.division }

            arr.push(new_data);
            res.json(
                {
                    status: "sucess",
                    arr
                }

            )

        }


    } catch (e) {
        res.json({
            status: "failed",
            msg: e.message
        })
    }
})

app.put('/api/student/:id', (req, res) => {
    try {

        let id = req.params.id;
        if (id < arr.length) {
            let new_data = { id: id, currentClass: req.body.currentClass, name: req.body.name, division: req.body.division }

            arr[id - 1] = new_data;
            res.json({ msg: "ok", new_data: arr[id - 1] });
        }

        else {

            res.status(404).json({
                status: "failed",
                msg: e.message
            })
        }



    } catch (e) {
        res.json({
            status: "failed",
            msg: e.message
        })
    }
})




app.delete('/api/student/:id', (req, res) => {
    try {

        let id = req.params.id;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                let data = arr[i];
                arr.splice(i, 1);
                res.json({
                    status: "ok", deleted_data: data
                });
            }

        }




    } catch (e) {
        res.json({
            status: "failed",
            msg: e.message
        })
    }
})







app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   