import {useState} from "react";

export default function Form({onAddItem}) {
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        if(!item) return;

        const newItem = {description: item, quantity, packed: false, id: Date.now()};
        onAddItem(newItem);

        setQuantity(1);
        setItem('');
    }

    return (<form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for trip? 😍</h3>
        <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
            {Array.from({length: 20}, (_,i) => i+1)
                .map(num => <option value={+num} key={+num}>{num}</option> )}
        </select>
        <input type="text" value={item} placeholder="Item..." onChange={(e) => setItem(e.target.value)}/>
        <button>Add</button>
    </form>)
}