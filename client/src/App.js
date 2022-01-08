import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Menu from './components/Menu'
import Salesperson from './components/Salesperson';
import Axios from 'axios'
import Products from './components/Products';
import Customers from './components/Customers';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [salesPerson, setSalesPerson] = useState([]);   // Display Salesperson
  // Update Salesperson
  const [products, setProducts] = useState([]);         // Display Products
  // Update Products
  const [customers, setCustomers] = useState([]);       // Display Customers
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
  };

  const getCustomers = () => {
    Axios.get('http://localhost:3001/dispCust').then((response) => {
      setCustomers(response.data);
    });
  }

  return (
    <div className="flex flex-col">
      <div><Navbar onClick={toggleMenu} /></div>
      {showMenu && <Menu sp={getSalesPerson} prod={getProducts} cust={getCustomers} /> }
      {/* // Default Display */}
      {!showMenu && <>Welcome to Bespoked Bikes</> }
      {/* // Display Salesperson */}
      <div className="">
        List of all Salesperson
        <Salesperson data={salesPerson} update={updateSP} />
      </div>
      <div className="">
        List of all Products
        <Products data={products} />
      </div>
      <div className="">
        List of all Customers
        <Customers data={customers} />
      </div>
      {/* // Update Products */}
      {/* // Display Customers */}
      {/* // Display Sales */}
      {/* // Create Sale */}
      {/* // Quarterly Report */}
    </div>
  );
}

export default App;

