const express=require('express');
const app=express();
const cors=require('cors');
const port=3000;
const db=require('./config');
const mysql2=require('mysql2');
app.use(cors());
const conn=mysql2.createConnection(db.database);
conn.connect(err=>{
    if(err) throw err;
    console.log("Database connection successful");
});
const totalRows=9551;
app.get('/zomato/restaurants',(req,res)=>{
    const page=parseInt(req.query.page)||getLastPage();
    const limit=50;
    const offset=(page-1)*limit;
    
    const sql="select * from zomato2 limit ? offset ?";
    conn.query(sql,[limit,offset],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
    function getLastPage(){
        return Math.ceil(totalRows/limit); 
    }
});
app.get('/zomato/restaurants/all',(req,res)=>{
    const sql="select * from zomato2";
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.get('/zomato/:id',(req,res)=>{
    const id=req.params.id;
    const sql='select * from zomato2 where Restaurant_ID=?';
    conn.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})