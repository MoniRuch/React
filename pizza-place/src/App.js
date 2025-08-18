import './App.css';
import {pizzaData} from "./assets/data";

function App() {
  return (
      <div className="container">
          <Header />
          <Menu />
          <Footer />
      </div>
  );
}

function Header() {
    return <header className="header">
        <h1>fast react pizza co.</h1>
    </header>
}

function Menu() {
    const isPizza = pizzaData.length > 0;
    return (
        <div className="menu">
            <h2>Our Menu</h2>
            {isPizza ? (<>
                <p>Authentic, Italian cuisine, 6 creative dishes to choose from. All from our stove oven, all organic, all delicious.</p>
                <ul className="pizzas">
                    {pizzaData.map(pizza => <li key={pizza.name}>
                            <Pizza pizza={pizza}/>
                        </li>
                    )}
                </ul>
            </>) : (<p>We are working on our menu.</p>)}

        </div>
    )
}

function Pizza({pizza}) {
    return (
        <div className={`pizza ${pizza.soldOut && 'sold-out'}`}>
            <img src={pizza.photoName} alt={pizza.name} />
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span>{pizza.soldOut ? 'SOLD OUT' : pizza.price}</span>
            </div>
        </div>
    )
}

function Footer() {
    const openHour = 12;
    const closingHour = 22;
    const hourNow = new Date().getHours();
    const isOpen = hourNow>=openHour && hourNow<=closingHour;
    
    return (<footer>
        {isOpen ? (
            <div className="order">
            <p>We are open till {closingHour}:00. Come visit us or order online.</p>
            <button className="btn">Order Now</button>
        </div>) : (<p>Sorry we're closed now! Please come in between {openHour}:00 and {closingHour}:00</p>)}
    </footer>)
}

export default App;
