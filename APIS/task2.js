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

let arr=[];
app.get('/zomato/restaurants/all',(req,res)=>{
    const sql="select * from zomato2";
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        arr=result.map(res=> res.Restaurant_ID);
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
app.get('/zomato/city/:City',(req,res)=>{
    const City=req.params.City;
    const sql='select * from zomato2 where LOWER(TRIM(City))=LOWER(?)';
    conn.query(sql,[City],(err,result)=>{
        if(err){
            throw err;
        }
        res.json(result);
    })
});
app.get('/zomato/random', (req, res) => {
    const sql = 'SELECT * FROM zomato2 ORDER BY RAND() LIMIT 1';
    conn.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        
        // Log the entire result for debugging
        console.log(result);

        // Check if result is empty
        if (result.length === 0) {
            return res.status(404).json({ message: 'No restaurant found' });
        }

        res.json(result[0]);
    });
});

app.get('/zomato/people/:people',(req,res)=>{
    const people=req.params.people;
    const sql='select * from zomato2 where Average_Cost_2=?';
    conn.query(sql,[people],(err,result)=>{
        if(err){
            throw err;
        }
        res.json(result);
    })
});
app.get('/zomato/cuisine/:cuisine',(req,res)=>{
    const cuisine =req.params.cuisine;
    const sql='select * from zomato2 where Lower(Trim(Cuisines)) =lower(?)';
    conn.query(sql,[cuisine],(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})