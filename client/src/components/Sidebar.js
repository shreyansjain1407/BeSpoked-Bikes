import { FaFire, FaBars } from 'react-icons/fa'

//Sidebar written to provide any additional functionality but never used 
const Sidebar = () => {
    return (
        <div>
            <div className="h-screen bg-slate-900 text-white shadow">
                    {/* <i className="text-3xl">Bespoked Bikes</i>
                    <SidebarIcon icon={ <FaFire size="28" /> } />
                    <i>Display Salesperson</i>
                    <i>Update Salesperson</i>
                    <i>Display Products</i>
                    <i>Bespoked Bikes</i> */}
                
                <ul>
                    <li><button className="text-white text-3xl m-4">Bespoked Bikes</button></li>
                    <hr className='bg-white border-2'></hr>
                    <li><button className="text-white text-2xl m-4">Display Salesperson</button></li>
                    <li><button className="text-white text-2xl m-4">Update Salesperson</button></li>
                    <li><button className="text-white text-2xl m-4">Display Products</button></li>
                    <li><button className="text-white text-2xl m-4">Update Products</button></li>
                    <li><button className="text-white text-2xl m-4">Display Customers</button></li>
                    <li><button className="text-white text-2xl m-4">Display Sales</button></li>
                    <li><button className="text-white text-2xl m-4">Create Sale</button></li>
                    <li><button className="text-white text-2xl m-4">Quarterly Report</button></li>
                </ul>
                
            </div>
        </div>
    )
};

const SidebarIcon = ({icon}) => {
    return (
        <div className="sidebar-icon">
            {icon}
        </div>
    )
};

export default Sidebar;