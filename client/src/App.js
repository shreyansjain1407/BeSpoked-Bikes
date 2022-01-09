import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Menu from './components/Menu'
import Salesperson from './components/Salesperson';
import Axios from 'axios'
import Products from './components/Products';
import Customers from './components/Customers';
import Heading from './components/Heading';
import Sales from './components/Sales';
import CreateSale from './components/CreateSale';
import QtrReport from './components/QtrReport';

function App() {
  const [dispSP, setDispSP] = useState(false);
  const [dispProd, setDispProd] = useState(false);
  const [dispCust, setDispCust] = useState(false);
  const [dispSales, setDispSales] = useState(false);
  const [dispCreate, setDispCreate] = useState(false);
  const [dispReports, setDispReports] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [salesPerson, setSalesPerson] = useState([]);   // Display & Update Salesperson
  const [products, setProducts] = useState([]);         // Display & Update Products
  const [customers, setCustomers] = useState([]);       // Display Customers
  const [saleRecords, setSaleRecords] = useState([]);   // Display Sales
  // Display Sales
  // Create Sale
  // Quarterly Report
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getSalesPerson = () => {
    Axios.get('http://localhost:3001/dispSalesPerson').then((response) => {
      setSalesPerson(response.data);
    });
    setDispSP(true);
    setDispProd(false);
    setDispCust(false);
    setDispSales(false);
    setDispCreate(false);
    setDispReports(false);
  };

  const updateSP = async (salesPerson) => {
    const duplicateSP = await Axios.post('http://localhost:3001/fetchSP',{
      f_name: salesPerson.f_name,
      phone: salesPerson.phone,
    }).then((response) => {
      return response.data;
    })
    if(duplicateSP.length > 0){
      alert("The details entered are duplicate, salesperson cannot be modified")
      return;
    }

    // console.log(salesPerson);
    Axios.post('http://localhost:3001/updSalesPerson',{
      sp: salesPerson,
    }).then(() => {
      console.log("Successfully updated sales person");
    })
  };

  const getProducts = () => {
    Axios.get('http://localhost:3001/dispProducts').then((response) => {
      setProducts(response.data);
    });
    setDispSP(false);
    setDispProd(true);
    setDispCust(false);
    setDispSales(false);
    setDispCreate(false);
    setDispReports(false);
  };

  const updateProd = async (updProduct) => {
    const name = updProduct.name;
    const manufacturer = updProduct.manufacturer;

    const duplicateCheck = await Axios.post('http://localhost:3001/fetchDup', {
      name: name,
      manufacturer: manufacturer,
    }).then((response) => {
      return response.data;
    })

    if(duplicateCheck.length > 0){
      alert("Duplicate Entries are not allowed please refresh page");
      return;
    }
    // console.log(duplicateCheck);
    console.log(updProduct);
    Axios.post('http://localhost:3001/updProduct', {
      prod: updProduct,
    }).then(() => {
      console.log("Product successfully Updated");
    })
  };

  const getCustomers = () => {
    Axios.get('http://localhost:3001/dispCust').then((response) => {
      setCustomers(response.data);
    });
    setDispSP(false);
    setDispProd(false);
    setDispCust(true);
    setDispSales(false);
    setDispCreate(false);
    setDispReports(false);
  };

  const getSaleRecords = () => {
    Axios.get('http://localhost:3001/dispSales').then((response) => {
      // console.log(response.data);
      setSaleRecords(response.data);
    })
    setDispSP(false);
    setDispProd(false);
    setDispCust(false);
    setDispSales(true);
    setDispCreate(false);
    setDispReports(false);
  };

  const addNewSale = () => {
    setDispSP(false);
    setDispProd(false);
    setDispCust(false);
    setDispSales(false);
    setDispCreate(true);
    setDispReports(false);
  };

  const addSaleRecord = async (sale) => {
    console.log(sale)
    const fName = sale.fName;
    const custPhone = sale.custPhone;
    // console.log(fName, custPhone);
    const customer = await Axios.post('http://localhost:3001/fetchduplicateCust',{
      fName: fName,
      custPhone: custPhone,
    }).then((result) => {
      return result.data;
    });
    console.log(customer);

    var cust_id = "";
    var secOutput = "";
    if(customer.length > 0){
      cust_id = customer.cust_id;
    }else{
      cust_id = Math.floor(Math.random() * 10000) +1;
      secOutput = await Axios.post('http://localhost:3001/createCustomer',{
        cust_id, cust_id,
        saleData: sale,
      }).then((result) => {
        console.log(result);
      });
    }
    console.log(customer.cust_id);

    if(secOutput.data == "Duplicate Entry"){
      alert("The entry for customer has a duplicate phone please correct and try again")
      return;
    }

    const dupSP = await Axios.post('http://localhost:3001/fetchSPID', {
      phone: sale.salesPhone,
    }).then((response) => {
      return response.data;
    })
    if(dupSP.length == 0){
      alert("No such salesperson exists");
      return;
    }
    const sp_id =  dupSP.sp_id;
    console.log(customer);

    const product = await Axios.post('http://localhost:3001/fetchDup', {
      name: sale.prod,
      manufacturer: sale.manufacturer,
    }).then((response) => {
      return response.data;
    })
    if(product.length == 0){
      alert("No such product exists, please check details");
      return;
    }
    if(product.quantity == 0){
      alert("Product not in stock");
      return;
    }

    var product_id = product.product_id;
    console.log("Product: ", product_id, cust_id, sp_id);
    Axios.post('http://localhost:3001/addSale',{
      custID: cust_id,
      spID: sp_id,
      prodID: product_id,
      date: sale.date,
    }).then((response) => {
      console.log(response);
    });
  };

  const addSalesperson = (sperson) => {
    const duplicateSP = Axios.post('http://localhost:3001/fetchSP',{
      f_name: sperson.f_name,
      phone: sperson.phone,
    }).then((response) => {
      return response.data;
    })
    if(duplicateSP.length > 0){
      alert("The details entered are duplicate, salesperson cannot be modified")
      return;
    }

    Axios.post('http://localhost:3001/addSP', {
      sperson: sperson,
    }).then((response) => {
      console.log(response);
    })
    console.log("LINE 137");
  };

  const getReports = () => {
    setDispSP(false);
    setDispProd(false);
    setDispCust(false);
    setDispSales(false);
    setDispCreate(false);
    setDispReports(true);
  }

  return (
    <div className="flex flex-col">
      <div><Navbar onClick={toggleMenu} /></div>
      {showMenu && <Menu sp={getSalesPerson} prod={getProducts} cust={getCustomers} sale={getSaleRecords} newSale={addNewSale} report={getReports} /> }
      {!showMenu && <Heading value="Welcome to Bespoked Bikes" /> }
      {dispSP && <Salesperson data={salesPerson} update={updateSP} addSP={addSalesperson} />}
      {dispProd && <Products data={products} update={updateProd} />}
      {dispCust && <Customers data={customers} />}
      {dispSales && <Sales data={saleRecords} />}
      {dispCreate && <CreateSale addSale={addSaleRecord} />}
      {dispReports && <QtrReport />}
    </div>
  );
}

export default App;

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