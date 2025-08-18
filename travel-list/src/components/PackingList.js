import {useState} from "react";
import Item from "./Item";

export default function PackingList({itemList, onItemChecked, onItemDelete, onListClear}) {
    const [sortBy, setSortBy] = useState('input');

    let sortedItems;

    if(sortBy === 'input'){
        sortedItems = itemList
    }
    else if(sortBy === 'description'){
        sortedItems = itemList.slice().sort((a,b) => a.description.localeCompare(b.description))
    }
    else if(sortBy === 'packed'){
        sortedItems = itemList.slice().sort((a,b) => +a.packed - +b.packed)
    }


    return (<div className="list">
        <ul>
            {sortedItems.map(item => <li key={item.id}>
                <Item item={item} onItemChecked={onItemChecked} onItemDelete={onItemDelete}/>
            </li>)}
        </ul>
        <div className="actions">
            <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="input">Sort by Input Order</option>
                <option value="description">Sort by Description</option>
                <option value="packed">Sort by Packed Status</option>
            </select>
            <button onClick={onListClear}>Clear List</button>
        </div>
    </div>)
}