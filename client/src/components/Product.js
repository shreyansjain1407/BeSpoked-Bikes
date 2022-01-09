import { useState } from "react";
//Tha single product element displayed in the products section, takes single JSON object as prop and also houses the form that is needed to update the products
const Product = ({ prod, update }) => {
    const [editable, setEditable] = useState(false)
    const [product_id] = useState(prod.product_id)
    const [name, setName] = useState(prod.name)
    const [manufacturer, setManufacturer] = useState(prod.manufacturer)
    const [purchase_price, setPurchase_price] = useState(prod.purchase_price)
    const [sale_price, setSale_price] = useState(prod.sale_price)
    const [quantity, setQuantity] = useState(prod.quantity)
    const [commission, setCommission] = useState(prod.commission)
    const sendDetails = (e) => {
        e.preventDefault()
        if(!name) {
            alert("Please enter Product Name")
        }
        if(!manufacturer) {
            alert("Please enter Manufacturer")
        }
        if(!purchase_price) {
            alert("Please enter Purchase Price")
        }
        if(!sale_price) {
            alert("Please enter Sale Price")
        }
        if(!quantity) {
            alert("Please enter Quantity")
        }
        if(!commission) {
            alert("Please enter Commission Percentage")
        }
        
        update({product_id, name, manufacturer, purchase_price, sale_price, quantity, commission});
    }

    return (
        <tr className="border-2">
            <td className="px-4 py-1 border-2"><form id={product_id} onSubmit={sendDetails}>
                <input className="px-2 py-1 w-6" type="text" form={product_id} value={product_id} disabled />
                </form>
            </td>
            <td className="px-4 py-1 border-2">
                <input 
                    disabled={!editable}
                    form={product_id}
                    type="text" 
                    value={name}
                    className="px-2 py-1 w-40 border-2" 
                    onChange={
                        (e) => setName((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                <input 
                    disabled={!editable}
                    form={product_id}
                    type="text" 
                    value={manufacturer}
                    className="px-2 py-1 w-24 border-2" 
                    onChange={
                        (e) => setManufacturer((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                <input 
                    disabled={!editable}
                    form={product_id}
                    type="text" 
                    value={purchase_price}
                    className="px-2 py-1 w-24 border-2" 
                    onChange={
                        (e) => setPurchase_price((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                <input 
                    disabled={!editable}
                    form={product_id}
                    type="text" 
                    value={sale_price}
                    className="px-2 py-1 w-24 border-2" 
                    onChange={
                        (e) => setSale_price((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                <input 
                    disabled={!editable}
                    form={product_id}
                    type="text" 
                    value={quantity}
                    className="px-2 py-1 w-24 border-2" 
                    onChange={
                        (e) => setQuantity((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                <input 
                    disabled={!editable}
                    form={product_id}
                    type="text" 
                    value={commission}
                    className="px-2 py-1 w-24 border-2" 
                    onChange={
                        (e) => setCommission((e.target.value))
                    } 
                />
            </td>
            <td className="px-4 py-1 border-2">
                {editable && <input type="submit" form={product_id} className="bg-gray-200 px-4 py-1 mr-2" value="Submit" />}
                {!editable && <button className="bg-gray-200 px-4 py-1" onClick={() => {setEditable(!editable)}}>Edit</button>}
                {editable && <button className="bg-gray-200 px-4 py-1" onClick={() => {setEditable(!editable)}}>Cancel</button>}
            </td>
        </tr>
    )
};

export default Product