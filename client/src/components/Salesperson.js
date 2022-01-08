import Sperson from "./Sperson"

const Salesperson = ({data, update}) => {
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
            (<h1>No Data to Display</h1>)
        }
        </>
    )
}

export default Salesperson