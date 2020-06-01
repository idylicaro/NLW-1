import express from 'express';

const app = express();

app.get('/users',(req,res) => {
    console.log("Welcome");
    res.send("Welcome");
})

app.listen(3333);
