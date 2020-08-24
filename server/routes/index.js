const express = require(`express`);
app = express();

app.use(require(`./user.js`));
app.use(require(`./login.js`));

module.exports = app;
