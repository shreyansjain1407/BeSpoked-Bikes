import { FaFire, FaBars } from 'react-icons/fa'
const Navbar = ({ onClick }) => {
    //The topmost bar that houses the company name and space for future implementation of any other pages that might need links
    return (
        <div className="flex top w-screen bg-slate-900">
            <button className="text-white text-3xl m-4">Bespoked Bikes</button>
            <button onClick={onClick} className="text-white text-2xl my-auto ml-auto mr-4 flex"><FaBars /> </button>
            
            <div className="drop-content text-white absolute hidden min-w-min">
                <a>Display Salesperson</a>
                <a>Update Salesperson</a>
                <a>Display Products</a>
                <a>Update Products</a>
                <a>Display Customers</a>
                <a>Display Sales</a>
                <a>Create Sale</a>
                <a>Quarterly Report</a>
            </div>

        </div>
    )
};


export default Navbar;