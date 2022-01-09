import Sperson from "./Sperson"
import Heading from "./Heading"
import { useState } from "react"

const Salesperson = ({data, update, addSP}) => {
    const [editable, setEditable] = useState(false)
    const [f_name, setF_name] = useState("")
    const [l_name, setL_name] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [start_date, setStart_date] = useState("")
    const [termination_date, setTermination_date] = useState("")
    const [manager, setManager] = useState("")

    const sendDetails = (e) => {
        e.preventDefault()
        if(!f_name) {
            alert("Please enter First Name")
        }
        if(!l_name) {
            alert("Please enter Last Name")
        }
        if(!address) {
            alert("Please enter Address")
        }
        if(!phone) {
            alert("Please enter Phone Number")
        }
        if(!start_date) {
            alert("Please enter Start Date")
        }
        if(!manager) {
            alert("Please enter Manager Name")
        }
        addSP({f_name, l_name, address, phone, start_date, termination_date, manager});
    }

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
                {/* Add New SalesPerson */}
                <tr className="border-2">
                    <td className="px-4 py-1 border-2"><form id="add" onSubmit={sendDetails}>
                        <input form="add" type="text" value="X" className="px-2 py-1 w-6" disabled /> 
                        </form>
                    </td>
                    <td className="px-4 py-1 border-2">
                        <input 
                            disabled={!editable}
                            form="add"
                            type="text" 
                            value={f_name} 
                            className="px-2 py-1 w-24 border-2" 
                            onChange={
                                (e) => setF_name((e.target.value))
                            } 
                        /> 
                    </td>
                    <td className="px-4 py-1 border-2">
                        <input
                            disabled={!editable}
                            form="add"
                            type="text"
                            value={l_name}
                            className="px-2 py-1 w-24 border-2"
                            onChange={
                                (e) => setL_name((e.target.value))
                            } 
                        />
                    </td>
                    <td className="px-4 py-1 border-2">
                        <input
                            disabled={!editable}
                            form="add"
                            type="text"
                            value={address}
                            className="px-2 py-1 w-32 border-2"
                            onChange={
                                (e) => setAddress((e.target.value))
                            } 
                        />
                    </td>
                    <td className="px-4 py-1 border-2">
                        <input
                            disabled={!editable}
                            form="add"
                            type="text"
                            value={phone}
                            className="px-2 py-1 w-32 border-2"
                            onChange={
                                (e) => setPhone((e.target.value))
                            }
                        />
                    </td>
                    <td className="px-4 py-1 border-2">
                        <input
                            disabled={!editable}
                            form="add"
                            type="text"
                            value={start_date}
                            className="px-2 py-1 w-32 border-2"
                            onChange={
                                (e) => setStart_date((e.target.value))
                            } 
                            placeholder="YYYY-MM-DD"
                        />
                    </td>
                    <td className="px-4 py-1 border-2">
                        <input
                            disabled={!editable}
                            form="add"
                            type="text"
                            value={termination_date?termination_date:''}
                            className="px-2 py-1 w-28 border-2"
                            onChange={
                                (e) => setTermination_date((e.target.value))
                            } 
                        />
                    </td>
                    <td className="px-4 py-1 border-2">
                        <input
                            disabled={!editable}
                            form="add"
                            type="text"
                            value={manager}
                            className="px-2 py-1 w-40 border-2"
                            onChange={
                                (e) => setManager((e.target.value))
                            } 
                        />
                    </td>
                    <td className="px-4 py-1 border-2">
                        {editable && <input type="submit" form="add" className="bg-gray-200 px-4 py-1 mr-2" value="Submit" />}
                        {!editable && <button className="bg-gray-200 px-4 py-1" onClick={() => {setEditable(!editable)}}>Add?</button>}
                        {editable && <button className="bg-gray-200 px-4 py-1" onClick={() => {setEditable(!editable)}}>Cancel</button>}
                    </td>
                </tr>
            </tbody>
            </table>):
            (<Heading value="No Data to Display"/>)
        }
        </>
    )
}

export default Salesperson