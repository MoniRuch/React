import '../App.css';
import {useState} from "react";
import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Footer from "./Footer";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
    const [items, setItems] = useState(initialItems);
    
    function handleAddItem(item){
        setItems([...items, item])
    }
    
    function handleItemChecked(packedItemId) {
        setItems(items => items.map(item => item.id === packedItemId ? {...item, packed: !item.packed} : item));
    }
    
    function handleItemDelete(deletedItemId) {
        setItems(items => items.filter(item => item.id !== deletedItemId))
    }
    
    function handleListClear() {
        setItems([]);
    }

  return (
      <div className="app">
          <Header />
          <Form onAddItem={handleAddItem}/>
          <PackingList itemList={items} onItemChecked={handleItemChecked} onItemDelete={handleItemDelete} onListClear={handleListClear}/>
          <Footer items={items} />
      </div>
  );
}

export default App;
