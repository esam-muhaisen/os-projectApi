const express = require("express");
const connectToDB = require('./configurations/connectToDb');
require("dotenv").config() 
const { createError } = require('http-errors')

const app = express();
// connection to database
connectToDB();

// middlewares 
app.use(express.json());

// Routes
const routes = require("./routes/routes");
routes(app);

app.use((req,res,next)=>{
    const error = createError(404);
    next(error);
})

app.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: "there is an error" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV}`);
});
