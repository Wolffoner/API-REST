require(`./config/config.js`);
const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use( require(`./routes/user.js`));

// Middlewares

mongoose.connect(
    process.env.URLDB,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, res) => {
        if (err) throw err;
        console.log("base de datos ONLINE");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`);
});
