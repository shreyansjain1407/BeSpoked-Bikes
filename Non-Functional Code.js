//=============================================================================================================================
//==========================================EXTRA NON FUNCTIONAL CODE==========================================================
//=============================================================================================================================

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
