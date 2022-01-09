import MenuButton from "./MenuButton";

//Menu Element that houses all the buttons that provide functionality to the application and takes function input as props that need to be called from the respective buttons for display of objects/sections
const Menu = ({sp, prod, cust, sale, newSale, report}) => {
    return (
        <div className="flex flex-wrap flex-row">
            <MenuButton value="Display and Update SalesPerson" onClick={sp} />
            <MenuButton value="Display and Update Products" onClick={prod} />
            <MenuButton value="Display Customer Details" onClick={cust} />
            <MenuButton value="Display Product Sales" onClick={sale}/>
            <MenuButton value="Create New Sale" onClick={newSale} />
            <MenuButton value="Quarterly Reports" onClick={report}/>
        </div>
    )
};

export default Menu