import MenuButton from "./MenuButton";

const Menu = ({sp, prod, cust, sale, newSale, reoprt}) => {
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