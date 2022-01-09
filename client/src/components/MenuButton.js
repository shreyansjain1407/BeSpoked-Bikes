const MenuButton = ({value, onClick}) => {
    return (
        <button className="bg-gray-700 border-2 border-purple-500 p-2 rounded-full text-white text-2xl m-4 hover:border-orange-500" onClick={onClick}>{value}</button>
    )
};

export default MenuButton