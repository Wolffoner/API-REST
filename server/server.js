require(`./config/config.js`);

const express = require(`express`);
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.get(`/user`, (req, res) => {
    res.json(`get Usuario`);
});

app.post(`/user`, (req, res) => {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
    OK: false,
            message: `name is necessary`
        });
    } else {
        res.json({
            user: body
        });
    }
});

app.put(`/user/:id`, (req, res) => {
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete(`/user`, (req, res) => {
    res.json(`delete Usuario`);
});

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`);
});
