

const Customers = ({data}) => {
    return (
        <>
            {data.length ?
            (<table className="table-auto border-2">
            <thead>
                <tr className="border-4">
                <th className="px-4 py-4 border-2">ID</th>
                {/* ID to be put somewhere hidden */}
                <th className="px-4 py-4 border-2">First Name</th>
                <th className="px-4 py-4 border-2">Last Name</th>
                <th className="px-4 py-4 border-2">Address</th>
                <th className="px-4 py-4 border-2">Phone</th>
                <th className="px-4 py-4 border-2">Start Date</th>
                <th className="px-4 py-4 border-2">Update</th>
                </tr>
            </thead>
            <tbody>
                {data.map((cust, index) => (
                    <tr key={index} className="border-2">
                    <td className="px-4 py-1 border-2">{cust.cust_id}</td>
                    <td className="px-4 py-1 border-2">{cust.f_name}</td>
                    <td className="px-4 py-1 border-2">{cust.l_name}</td>
                    <td className="px-4 py-1 border-2">{cust.address}</td>
                    <td className="px-4 py-1 border-2">{cust.phone}</td>
                    <td className="px-4 py-1 border-2">{cust.start_date.split('T')[0]}</td>
                    <td className="px-4 py-1 border-2"><button className="bg-gray-200 px-4 py-1">Edit</button></td>
                    
                    </tr>
                ))}
            </tbody>
            </table>):
            (<h1>No Data to Display</h1>)
        }
        </>
    )
}

export default Customers