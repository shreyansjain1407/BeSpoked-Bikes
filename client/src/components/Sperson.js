import {useState} from 'react'

const Sperson = ({sp, update}) => {
    const [editable, setEditable] = useState(false)
    const [id] = useState(sp.sp_id)
    const [f_name, setF_name] = useState(sp.f_name)
    const [l_name, setL_name] = useState(sp.l_name)
    const [address, setAddress] = useState(sp.address)
    const [phone, setPhone] = useState(sp.phone)
    const [start_date, setStart_date] = useState(sp.start_date.split('T')[0])
    const [termination_date, setTermination_date] = useState(sp.termination_date? sp.termination_date.split('T')[0]: "")
    const [manager, setManager] = useState(sp.manager)

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
        update({id, f_name, l_name, address, phone, start_date, termination_date, manager});
    }


    return(
        <tr className="border-2">
            <td className="px-4 py-1 border-2"><form id={id} onSubmit={sendDetails}>
                <input form={id} type="text" value={id} className="px-2 py-1 w-6" disabled /> 
                </form>
            </td>
            <td className="px-4 py-1 border-2">
                <input 
                    disabled={!editable}
                    form={id}
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
                    form={id}
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
                    form={id}
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
                    form={id}
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
                    form={id}
                    type="text"
                    value={start_date}
                    className="px-2 py-1 w-32 border-2"
                    onChange={
                        (e) => setStart_date((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                <input
                    disabled={!editable}
                    form={id}
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
                    form={id}
                    type="text"
                    value={manager}
                    className="px-2 py-1 w-40 border-2"
                    onChange={
                        (e) => setManager((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                {editable && <input type="submit" form={id} className="bg-gray-200 px-4 py-1 mr-2" value="Submit" />}
                {!editable && <button className="bg-gray-200 px-4 py-1" onClick={() => {setEditable(!editable)}}>Edit</button>}
                {editable && <button className="bg-gray-200 px-4 py-1" onClick={() => {setEditable(!editable)}}>Cancel</button>}
            </td>
        </tr>
    )
}

export default Sperson