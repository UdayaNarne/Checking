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
//console.log("Hello");
app.get('/zomato', (req, res) => {
    console.log("Hello");
    const sql = 'SELECT * FROM zomato2 ORDER BY RAND() LIMIT 1';
    console.log("Hello");
    conn.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        console.log("Hello");
        // Log the entire result for debugging
        console.log(result);

        // Check if result is empty
        if (result.length === 0) {
            return res.status(404).json({ message: 'No restaurant found' });
        }

        res.json(result[0]);
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

