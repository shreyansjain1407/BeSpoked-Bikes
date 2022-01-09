const Sale = ({sale, index}) => {
    return (
        <tr className="border-2">
            <td className="px-4 py-1 border-2">{index+1}</td>
            <td className="px-4 py-1 border-2">{sale.product_name}</td>
            <td className="px-4 py-1 border-2">{sale.sale_price}</td>
            <td className="px-4 py-1 border-2">{sale.Customer_Name}</td>
            <td className="px-4 py-1 border-2">{sale.sale_date.split('T')[0]}</td>
            <td className="px-4 py-1 border-2">{sale.Salesperson}</td>
            <td className="px-4 py-1 border-2">{sale.Commission}</td>
        </tr>
    )
}
export default Sale