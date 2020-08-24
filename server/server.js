require(`./config/config.js`);
const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: false }));
//Config Routes
app.use( require(`./routes/index.js`));

mongoose.connect(
    process.env.URLDB,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err, res) => {
        if (err) throw err;
        console.log("base de datos ONLINE");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`);
});
