

const Products = ({data}) => {
    return (
        <>
            {data.length ?
            (<table className="table-auto border-2">
            <thead>
                <tr className="border-4">
                <th className="px-4 py-4 border-2">ID</th>
                {/* ID to be put somewhere hidden */}
                <th className="px-4 py-4 border-2">Name</th>
                <th className="px-4 py-4 border-2">Manufacturer</th>
                <th className="px-4 py-4 border-2">Purchase Price</th>
                <th className="px-4 py-4 border-2">Sale Price</th>
                <th className="px-4 py-4 border-2">Quantity</th>
                <th className="px-4 py-4 border-2">Commission</th>
                <th className="px-4 py-4 border-2">Update</th>
                </tr>
            </thead>
            <tbody>
                {data.map((prod, index) => (
                    <tr key={index} className="border-2">
                    <td className="px-4 py-1 border-2">{prod.product_id}</td>
                    <td className="px-4 py-1 border-2">{prod.name}</td>
                    <td className="px-4 py-1 border-2">{prod.manufacturer}</td>
                    <td className="px-4 py-1 border-2">{prod.purchase_price}</td>
                    <td className="px-4 py-1 border-2">{prod.sale_price}</td>
                    <td className="px-4 py-1 border-2">{prod.quantity}</td>
                    <td className="px-4 py-1 border-2">{prod.commission}</td>
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

export default Products