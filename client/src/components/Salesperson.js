import Sperson from "./Sperson"
import Heading from "./Heading"

const Salesperson = ({data, update}) => {
    return (
        <>
            <Heading value="List of all Salespersons" />
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
                <th className="px-4 py-4 border-2">Termination</th>
                <th className="px-4 py-4 border-2">Manager</th>
                <th className="px-4 py-4 border-2">Update</th>
                </tr>
            </thead>
            <tbody>
                {data.map((sp, index) => (
                    <Sperson key={index} sp={sp} update={update} />
                ))}
            </tbody>
            </table>):
            (<Heading value="No Data to Display"/>)
        }
        </>
    )
}

export default Salesperson