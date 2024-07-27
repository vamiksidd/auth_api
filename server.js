require('dotenv').config()
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')

const connectDb = require('./config/dbConnection')

const app = express()

connectDb();
const port = process.env.PORT || 8000;

app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).json({ msg: "root page" })
})

app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api/users', require("./routes/userRoutes"))
app.use(errorHandler);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})