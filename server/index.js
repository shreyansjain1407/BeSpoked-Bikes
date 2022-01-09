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
                // console.log("Salesperson display");
                // console.log(result);
                res.send(result);
            }
        }
    )
});

app.get('/dispProducts', (req, res) => {
    db.query(
        "SELECT * FROM products",
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                // console.log(result);
                res.send(result);
            }
        }
    )
});

app.get('/dispCust', (req, res) => {
    db.query(
        "SELECT * FROM customer",
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                // console.log(result);
                res.send(result);
            }
        }
    )
});

app.get('/dispSales', (req, res) => {
    db.query(
        "SELECT * FROM sales_record",
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                // console.log(result);
                res.send(result);
            }
        }
    )
});

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

app.post('/fetchduplicateCust', (req, res) => {
    // console.log(req);
    const fName = req.body.fName;
    const custPhone = req.body.custPhone;
    console.log(fName, custPhone)
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


//Future Implementation
// app.post('/fetchCustID', (req, res) => {
//     const fName = req.body.saleData.fName;
//     const lName = req.body.saleData.lName;
//     const add = req.body.saleData.add;
//     const custPhone = req.body.saleData.custPhone;
//     const prod = req.body.saleData.prod;
//     const salesPhone = req.body.saleData.salesPhone;
//     const date = req.body.saleData.date;
//     // console.log(fName, lName, add, custPhone, prod, salesPhone, date);
//     var cust_id = "";

//     db.query("SELECT cust_id from customer WHERE phone=(?) AND f_name=(?)", [custPhone, fName], 
//     (err, result) => {
//         if(err) {
//             console.log(err)
//         }else{
//             res.send(result);
//         }
//     });
// });

