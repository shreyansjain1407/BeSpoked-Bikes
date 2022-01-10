// ================================================================================================================ 
// ====================================EXTRA NON FUNCTIONAL CODE ================================================== 
// ================================================================================================================

//App.js
//Auxilary Function
  // const fetchDetailsForSale = () => {
  //   console.log("Logging from fetchDetails")
  //   Axios.get('http://localhost:3001/dispSalesPerson').then((response) => {
  //     setSalesPerson(response.data);
  //   });
  //   Axios.get('http://localhost:3001/dispProducts').then((response) => {
  //     setProducts(response.data);
  //   });
  //   Axios.get('http://localhost:3001/dispCust').then((response) => {
  //     setCustomers(response.data);
  //   });
  // }

//Future Implementation 
// const addSaleRecord = async (sale) => {
//   console.log(sale);
//   const customer_id = await Axios.post('http://localhost:3001/fetchCustID',{
//     saleData: sale,
//   }).then((result) => {
//     return result.data;
//   });
//   if(customer_id.length == 0){
//     await Axios.post('http://localhost:3001/createCustomer',{
//       saleData: sale,
//     }).then((result) => {
//       console.log(result);
//     });
//   }
//   const final_custID = 
//   console.log("LINE 128: ",customer_id);
// }

  //Function to add sale to the 
  // const addSaleRecord = (sale) => {
  //   console.log(sale);
  //   Axios.post('http://localhost:3001/addSale',{
  //     saleData: sale,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };


  //CreateSale.js
  // Additional Functionality

/* <div className="my-4">
    <label className="mx-4">Returning Customer ?</label>
    <input type="checkbox" className="p-4 border-2 border-teal-900 mx-auto" onChange={fetchDetails}/>
</div> */
    // const [existCust, setExistCust] = useState(false);
    // const [customer, setCustomer] = useState(cust);
    // const [salesperson, setSalesPerson] = useState(sp);
    // const [products, setProducts] = useState(prod);
    // const [curCust, setCurCust] = useState("")


    // const fetchDetails = async (e) => {
    //     setExistCust(e.currentTarget.checked);
    //     // await fetch()
    //     setCustomer(cust)
    //     setSalesPerson(sp)
    //     setProducts(prod)
    //     console.log(customer);
    // }

// Server/index.js
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

// SQL
// #Automatically handled by sql due to foreign key constraints
// CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`sales_checkCustSalespAtInsert` BEFORE INSERT ON `sales` FOR EACH ROW
// BEGIN
// 	declare msg varchar(100);
//     if NEW.cust_id NOT IN (SELECT cust_id from customer) then
// 		set msg = concat('Customer does not exist');
//         signal sqlstate '45000' set message_text = msg;
// 	elseif NEW.sp_id NOT IN (SELECT sp_id from salesperson) then
// 		set msg = concat('Salesperson does not exist');
//         signal sqlstate '45000' set message_text = msg;
// 	end if;
// END

// #===================TRIGGER TO BE IMPLEMENTED=============================
// CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`sales_ValidateSalesperson` BEFORE INSERT ON `sales` FOR EACH ROW
// BEGIN
// 	declare msg varchar(100);
//     if ((SELECT start_date FROM salesperson WHERE sp_id = NEW.sp_id) > NEW.sale_date) then
// 		set msg = concat('Salesperson not an employee yet');
//         signal sqlstate '45000' set message_text = msg;
// 	elseif ((SELECT termination_date FROM salesperson WHERE sp_id = NEW.sp_id) < NEW.sale_date) then
// 		set msg = concat('Salesperson no longer an employee');
//         signal sqlstate '45000' set message_text = msg;
// 	end if;
// END
// #=============================================================================================

// #VIEW FOR SALES
// SELECT X.name, X.sale_price, concat(X.f_name, ' ', X.l_name) as Customer_Name, X.sale_date, concat(SP.f_name, " ", sp.l_name) as Salesperson, (X.sale_price*X.commission)/100 as Commission
// FROM salesperson SP,
// (SELECT S.name, S.sale_price, S.commission, S.sp_id, C.f_name, C.l_name , S.sale_date 
// FROM customer C, (SELECT name, sale_price, commission, sp_id, sale_date, cust_id FROM products Natural Join sales) S
// WHERE S.cust_id = C.cust_id ) X
// WHERE SP.sp_id = X.sp_id;

// #============================================================================================

// -- Trigger to prevent duplicates in products
// -- Try 1
// CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`products_check_duplicate` BEFORE INSERT ON `products` FOR EACH ROW
// BEGIN
// 	DECLARE msg varchar(100);
// 	IF NEW.name IN (select `name` from `products` where `manufacturer` = NEW.manufacturer) THEN
// 		set msg = concat('Duplicate Entry');
//         signal sqlstate '45000' set message_text = msg;		
// 	end if;
// END
// -- Try 2
// CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`products_check_duplicates` BEFORE INSERT ON `products` FOR EACH ROW
// BEGIN
// 	DECLARE msg varchar(100);
//     IF (SELECT count(name) from `profisee`.`products` WHERE `manufacturer` = NEW.manufacturer AND `name` = NEW.name) > 0 THEN
// 		set msg = contat("Duplicate Product");
//         signal sqlstate '45000' set message_text = msg;
// 	END IF;
// END
// -- Try 3
// CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`products_check_duplicates` BEFORE INSERT ON `products` FOR EACH ROW
// BEGIN
// 	DECLARE msg varchar(100);
//     IF Exists (SELECT * from `profisee`.`products` WHERE `manufacturer` = NEW.manufacturer AND `name` = NEW.name) THEN
// 		set msg = contat("Duplicate Product");
//         signal sqlstate '45000' set message_text = msg;
// 	END IF;
// END

// #View
// SELECT X.name, X.sale_price, concat(X.f_name, ' ', X.l_name) as Customer_Name, X.sale_date, concat(SP.f_name, " ", sp.l_name) as Salesperson, (X.sale_price*X.commission)/100 as Commission
// FROM salesperson SP,
// (SELECT S.name, S.sale_price, S.commission, S.sp_id, C.f_name, C.l_name , S.sale_date ,S.product_id
// FROM customer C, (SELECT name, sale_price, commission, sp_id, sale_date, cust_id, product_id FROM products Natural Join sales) S
// WHERE S.cust_id = C.cust_id ) X
// WHERE SP.sp_id = X.sp_id;