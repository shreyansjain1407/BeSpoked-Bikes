import { useState } from "react"
import Heading from "./Heading"

//Section used to display the commission reports of each salesperson who had sales in the specified quarter of the specified year
const QtrReport = ({getData, data}) => {
    const [quarter, setQuarter] = useState();
    const [year, setYear] = useState();
    const fetchQtrRep = (e) => {
        e.preventDefault()
        if(!year){
            alert("Please enter Year")
            return;
        }
        if(!quarter){
            alert("Please enter Quarter")
            return;
        }
        getData({year, quarter});
    }
    return (
        <>
            <Heading value="Quarterly Reports for each Salesperson" />
            <form onSubmit={fetchQtrRep}>
                <label className="p-4 ">Year of Report</label>
                <input type="text" className="p-4 border-2 border-black m-4" placeholder="YYYY" onChange={(e) => setYear(e.target.value)}/>
                <label className="p-4 ">Quarter of year</label>
                <input type="text" className="p-4 border-2 border-black m-4" placeholder="(1-4)" onChange={(e) => setQuarter(e.target.value)}/>
                <input type="submit" className="p-4 border-2 border-black m-4 hover:bg-cyan-200" value="Get Reports" />
            </form>
            {data.length ?
            (<table className="table-auto border-2">
            <thead>
                <tr className="border-4">
                <th className="px-4 py-4 border-2">S. No</th>
                <th className="px-4 py-4 border-2">Salesperson</th>
                <th className="px-4 py-4 border-2">Commission</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <tr key={index} className="border-2">
                    <td className="px-4 py-1 border-2">{index+1}</td>
                    <td className="px-4 py-1 border-2">{entry.Salesperson}</td>
                    <td className="px-4 py-1 border-2">{entry.Commission}</td>
                    </tr>
                ))}
            </tbody>
            </table>):
            (<Heading value="No Data to Display"/>)
        }
        </>
    )
}

export default QtrReport