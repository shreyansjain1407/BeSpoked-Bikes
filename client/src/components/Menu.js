const Menu = ({sp, prod, cust}) => {
    return (
        <div className="flex flex-wrap flex-row">
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500" onClick={sp}>Display Salesperson</button>
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500">Update Salesperson</button>
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500" onClick={prod}>Display Products</button>
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500">Update Products</button>
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500" onClick={cust}>Display Customers</button>
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500">Display Sales</button>
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500">Create Sale</button>
            <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500">Quarterly Report</button>
        </div>
    )
};

export default Menu