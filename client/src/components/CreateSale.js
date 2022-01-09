import Heading from "./Heading";
import { useEffect, useState } from "react";
import axios from "axios";

const CreateSale = ({addSale}) => {
    const [custID, setCustID] = useState("")
    const [spID, setSpID] = useState("")
    const [prodID, setProdID] = useState("")
    const [date, setDate] = useState("")

    const confirmSale = (e) => {
        e.preventDefault()
        if(!custID) {
            alert('Please enter Customer ID')
            return
        }
        if(!spID) {
            alert('Please enter Salesperson ID')
            return
        }
        if(!prodID) {
            alert('Please enter Product ID')
            return
        }


        addSale({custID, spID, prodID, date});
    }

    return (
        <>
            <Heading value="Create New Sale" />
            <div className="h-screen  w-auto mx-4 p-4">
                <form className="">
                    <div>
                        <div className="my-4 ">
                            <label className="mx-4 w-36">Customer ID</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="Customer ID" onChange={(e) => setCustID(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Product ID</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="Product ID" onChange={(e) => setProdID(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">SalesPerson ID</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="SalesPerson ID" onChange={(e) => setSpID(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Sale Date</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="YYYY-MM-DD" onChange={(e) => setDate(e.target.value)}/>
                        </div>
                        <div>
                            <input className="p-4 border-2 border-black bg-zinc-200 hover:bg-teal-800" type="submit" onClick={confirmSale} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CreateSale



// Additional Functionality

/* <div className="my-4">
    <label className="mx-4">Returning Customer ?</label>
    <input type="checkbox" className="p-4 border-2 border-teal-900 mx-auto" onChange={fetchDetails}/>
</div> */
    // const [existCust, setExistCust] = useState(false);
    // const [customer, setCustomer] = useState(cust);
    // const [salesperson, setSalesPerson] = useState(sp);
    // const [products, setProducts] = useState(prod);
    // const [curCust, setCurCust] = useState("")


    // const fetchDetails = async (e) => {
    //     setExistCust(e.currentTarget.checked);
    //     // await fetch()
    //     setCustomer(cust)
    //     setSalesPerson(sp)
    //     setProducts(prod)
    //     console.log(customer);
    // }
    // const [fName, setFName] = useState("")
    // const [lName, setLName] = useState("")
    // const [add, setAdd] = useState("")
    // const [custPhone, setCustPhone] = useState("")
    // const [prod, setProd] = useState("")
    // const [salesPhone, setSalesPhone] = useState("")
    // const [date, setDate] = useState("")

{/*                     <div>
                        <div className="my-4 ">
                            <label className="mx-4 w-36">First Name</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="First Name" onChange={(e) => setFName(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Last Name</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="Last Name" onChange={(e) => setLName(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Address</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="Address" onChange={(e) => setAdd(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Phone</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="Phone Number" onChange={(e) => setCustPhone(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Product Name</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="Product Name" onChange={(e) => setProd(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Sales Person's Phone</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="Sales person's phone" onChange={(e) => setSalesPhone(e.target.value)}/>
                        </div>
                        <div className="my-4">
                            <label className="mx-4 w-36">Sale Date</label>
                            <input className="p-4 border-2 border-teal-900 mx-auto" type="text" placeholder="YYYY-MM-DD" onChange={(e) => setDate(e.target.value)}/>
                        </div>
                        <div>
                            <input className="p-4 border-2 border-black bg-zinc-200 hover:bg-teal-800" type="submit" onClick={confirmSale} />
                        </div>
                    </div> */}