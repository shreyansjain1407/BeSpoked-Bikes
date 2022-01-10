const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Qwerty@123",
    database: "profisee"
});

//Endopint to get the list of all salespersons in the database
app.get('/dispSalesPerson', (req, res) => {
    db.query(
        "SELECT * FROM salesperson",
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    )
});

//Endpoint to get the list of all Products in the database
app.get('/dispProducts', (req, res) => {
    db.query(
        "SELECT * FROM products",
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    )
});

//Endpoint to get the list of all Customers in the database
app.get('/dispCust', (req, res) => {
    db.query(
        "SELECT * FROM customer",
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    )
});

//Endpoint to get the list of all Sales in the database
app.get('/dispSales', (req, res) => {
    db.query(
        "SELECT * FROM sale_disc_records",
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    )
});

//Endpoint to update the details of a sales person after verification has been completed in the front end
app.post('/updSalesPerson', (req, res) => {
    // console.log(req);
    const id = req.body.sp.id;
    const f_name = req.body.sp.f_name;
    const l_name = req.body.sp.l_name;
    const address = req.body.sp.address;
    const phone = req.body.sp.phone;
    const start_date = req.body.sp.start_date;
    const termination_date = (req.body.sp.termination_date == "")?null:req.body.sp.termination_date;
    const manager = req.body.sp.manager;

    db.query("UPDATE profisee.salesperson SET f_name = (?), l_name=(?), address=(?), phone=(?), start_date=(?),termination_date=(?),manager=(?) WHERE sp_id=(?)",[f_name, l_name, address, phone, start_date, termination_date, manager, id], (err, result) => {
        if(err) {
            console.log(err);
        }else{
            res.send("Values Successfully Inserter");
        }
    })
});

//Endpoint to update the details of a product after verification has been completed in the front end
app.post('/updProduct', (req, res) => {

    const product_id = req.body.prod.product_id;
    const name = req.body.prod.name;
    const manufacturer = req.body.prod.manufacturer;
    const purchase_price = req.body.prod.purchase_price;
    const sale_price = req.body.prod.sale_price;
    const quantity = req.body.prod.quantity;
    const commission = req.body.prod.commission;

    db.query("UPDATE profisee.products SET name=(?), manufacturer=(?), purchase_price=(?), sale_price=(?),quantity=(?),commission=(?) WHERE product_id=(?)",[name, manufacturer, purchase_price, sale_price, quantity, commission, product_id], (err, result) => {
        if(err) {
            console.log(err);
        }else{
            res.send("Values Successfully Inserter into Products");
        }
    });
});

// Endpoint to add a sale to the database
app.post('/addSale', (req, res) => {
    const custID = req.body.custID;
    const spID = req.body.spID;
    const prodID = req.body.prodID;
    var date = req.body.date;
    if(date == ''){
        db.query("INSERT INTO sales(product_id, sp_id, cust_id) VALUES (?,?,?)", [prodID, spID, custID], 
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send("Insert Successful");
            }
        });
    }else{
        db.query("INSERT INTO sales(product_id, sp_id, cust_id, sale_date) VALUES (?,?,?,?)", [prodID, spID, custID, date], 
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send("Insert Successful");
            }
        });
    }
});

// Endpoint to add a new sales person to the database
app.post('/addSP', (req, res) => {
    const f_name = req.body.sperson.f_name;
    const l_name = req.body.sperson.l_name;
    const address = req.body.sperson.address;
    const phone = req.body.sperson.phone;
    const start_date = req.body.sperson.start_date;
    var termination_date = req.body.sperson.termination_date;
    if(termination_date == ' ' || termination_date == ''){
        termination_date = null;
    }
    const manager = req.body.sperson.manager;
    console.log(f_name, l_name, address, phone, start_date, termination_date, manager);
    db.query("INSERT INTO `profisee`.`salesperson` (`f_name`, `l_name`, `address`, `phone`, `start_date`, `termination_date`, `manager`) VALUES (?,?,?,?,?,?,?)", 
    [f_name, l_name, address, phone, start_date, termination_date, manager], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Salesperson Successfully Inserted");
        }
    });
});

// Endpoint to get the commission report of the sales reps
app.post('/getReport', (req,res) => {
    const start = req.body.start;
    const end = req.body.end;

    db.query("SELECT REP.Salesperson, SUM(Commission) as Commission FROM (SELECT Z.name as product_name, Z.disc_price as sale_price, Z.c_name as Customer_Name, Z.sale_date, concat(SP.f_name, ' ' , SP.l_name) as Salesperson, (Z.disc_price*Z.commission)/100 as Commission FROM (SELECT Y.name, Y.sale_price, Y.c_name, Y.sale_date, Y.sp_id, Y.commission, case when Y.sale_date between Y.begin_date and Y.end_date then (Y.sale_price*(100-Y.discount)/100) else Y.sale_price end as disc_price FROM (SELECT X.name, X.commission, X.sale_price , X.sp_id, concat(X.f_name, ' ', X.l_name) as c_name, X.sale_date, X.product_id, D.begin_date, D.end_date, D.discount FROM (SELECT S.name, S.sale_price, S.commission, S.sp_id, C.f_name, C.l_name , S.sale_date ,S.product_id FROM customer C, (SELECT name, sale_price, commission, sp_id, sale_date, cust_id, product_id FROM products Natural Join sales) S WHERE S.cust_id = C.cust_id ) X  LEFT OUTER JOIN discount D ON X.product_id = D.product_id) Y) Z, salesperson SP WHERE SP.sp_ID = Z.sp_id) REP WHERE REP.sale_date BETWEEN (?) AND (?) GROUP BY REP.Salesperson",
    [start, end], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    });
});

//=============VALIDATION ENDPOINTS======================
//Endpoint to fetch duplicate products used for validation of data
app.post('/fetchDup', (req, res) => {
    const name = req.body.name;
    const manufacturer = req.body.manufacturer;

    db.query("SELECT * FROM products where name=(?) and manufacturer=(?)",
    [name, manufacturer],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//Endpoint to fetch duplicate customers used for validation of data
app.post('/fetchduplicateCust', (req, res) => {
    const fName = req.body.fName;
    const custPhone = req.body.custPhone;
    db.query("SELECT * FROM customer WHERE f_name=(?) and phone=(?)",
    [fName, custPhone], 
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//Endpoint to create a new customer
app.post('/createCustomer', (req, res) => {
    const cust_id = req.body.cust_id;
    const fName = req.body.saleData.fName;
    const lName = req.body.saleData.lName;
    const add = req.body.saleData.add;
    const custPhone = req.body.saleData.custPhone;
    console.log(fName, lName, add, custPhone);
    db.query("INSERT INTO `profisee`.`customer` (`cust_id`, `f_name`, `l_name`, `address`, `phone`) VALUES (?,?,?,?,?)", 
    [cust_id, fName, lName, add, custPhone],
    (err, result) => {
        if(err){
            console.log(err);
            res.send("Duplicate Entry");
        }else{
            res.send("Insert Successful");
        }
    });
});

// Endpoint to get the details of a sales person based on the phone provided
app.post('/fetchSPID', (req, res) => {
    const salesPhone = req.body.phone;
    db.query("SELECT * FROM salesperson where phone=(?)", 
    [salesPhone],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Endpoint to fetch the details of a sales person based on phone as well as first name
app.post('/fetchSP', (req,res) => {
    const f_name = req.body.f_name;
    const phone = req.body.phone;

    db.query("SELECT * FROM salesperson where f_name=(?) and phone=(?)", 
    [f_name, phone],
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("The server is fully operational on 3001")
})



