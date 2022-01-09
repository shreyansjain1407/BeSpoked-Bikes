import MenuButton from "./MenuButton";

const Menu = ({sp, prod, cust, sale}) => {
    return (
        <div className="flex flex-wrap flex-row">
            <MenuButton value="Display and Update SalesPerson" onClick={sp} />
            <MenuButton value="Display and Update Products" onClick={prod} />
            <MenuButton value="Display Customer Details" onClick={cust} />
            <MenuButton value="Display Product Sales" onClick={sale}/>
            <MenuButton value="Create New Sale" />
            <MenuButton value="Quarterly Reports" />
        </div>
    )
};

export default Menu