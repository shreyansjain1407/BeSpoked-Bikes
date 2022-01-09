import Product from "./Product"
import Heading from "./Heading"

//The main products section that passes JSON to singular product element which houses more functionality, gets the master data from App.js as prop as well as the function to update products which is passed to the singular elements
const Products = ({data, update}) => {
    return (
        <>
            <Heading value="List of all Products" />
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
                    <Product key={index} prod={prod} update={update} />
                ))}
            </tbody>
            </table>):
            (<Heading value="No Data to Display"/>)
        }
        </>
    )
}

export default Products