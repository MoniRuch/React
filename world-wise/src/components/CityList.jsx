import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import styles from "./CityList.module.css"
import CityItem from "./CityItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

export default function CityList() {
    const {cities, isLoading} = useCities();
    
    if(isLoading) return <Spinner />
    
    if(!cities.length) return <Message message="Add your first country by clicking on the map" />
    else
        return <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id} /> )}
        </ul>
}