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
  }

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
  const updateSP = (salesPerson) => {
    console.log(salesPerson);
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
  const updateProd = (updProduct) => {
    // console.log(updProduct);
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
  }

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

  return (
    <div className="flex flex-col">
      <div><Navbar onClick={toggleMenu} /></div>
      {showMenu && <Menu sp={getSalesPerson} prod={getProducts} cust={getCustomers} sale={getSaleRecords} /> }
      {/* // Default Display */}
      {!showMenu && <Heading value="Welcome to Bespoked Bikes" /> }
      {/* // Display Salesperson */}
      {dispSP && <Salesperson data={salesPerson} update={updateSP} />}
      {dispProd && <Products data={products} update={updateProd} />}
      {dispCust && <Customers data={customers} />}
      {dispSales && <Sales data={saleRecords} />}
      {/* // Update Products */}
      {/* // Display Customers */}
      {/* // Display Sales */}
      {/* // Create Sale */}
      {/* // Quarterly Report */}
    </div>
  );
}

export default App;

