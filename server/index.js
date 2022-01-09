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
    const termination_date = (req.body.sp.termination_date.length ? res.body.termination_date : null);
    if(termination_date == 'NA'){
        termination_date = null;
    }
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
    })
})

app.listen(3001, () => {
    console.log("The server is fully operational on 3001")
})