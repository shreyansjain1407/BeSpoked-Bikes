import Heading from "./Heading"
import Sale from "./Sale"

//The main sales element that gets the data from App.js and then further passes it down to the singular element
const Sales = ({data}) => {
    return (
        <>
            <Heading value="List of all Sales" />
            {data.length ?
                (<table className="table-auto border-2">
                <thead>
                    <tr className="border-4">
                        <th className="px-4 py-4 border-2">S. No</th>
                        {/* ID to be put somewhere hidden */}
                        <th className="px-4 py-4 border-2">Product Name</th>
                        <th className="px-4 py-4 border-2">Sale Pricee</th>
                        <th className="px-4 py-4 border-2">Customer</th>
                        <th className="px-4 py-4 border-2">Sale Date</th>
                        <th className="px-4 py-4 border-2">Sales Person</th>
                        <th className="px-4 py-4 border-2">Commission</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((sale, index) => (
                        <Sale key={index} sale={sale} index={index} />
                    ))}
                </tbody>
                </table>):
                (<Heading value="No Data to Display"/>)
            }
        </>
    )
}
export default Sales