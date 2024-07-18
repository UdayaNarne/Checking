const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('./config');
const mysql2=require('mysql2');

const port=3000;

const conn=mysql2.createConnection(db.database);
conn.connect(err=>{
    if(err) throw err;
    console.log("Database connection successful.");
});

app.get('/zomato/:id',(req,res)=>{
    const id=req.params.id;
    const sql='select * from zomato where Restaurant_ID=?';
    conn.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

