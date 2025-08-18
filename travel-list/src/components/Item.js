export default  function Item({item, onItemChecked, onItemDelete}) {

    return (<>
        {!item.packed && <input type="checkbox" value={item.packed} onChange={() => onItemChecked(item.id)} />} &nbsp;
        <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
            {item.quantity}  {item.description} 
        </span>
        <button onClick={() => onItemDelete(item.id)}> ❌ </button>
    </>)
}