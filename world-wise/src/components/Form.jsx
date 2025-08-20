import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import ButtonBack from "./ButtonBack.jsx";
import useURLPosition from "../hooks/useURLPosition.js";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [lat,lng] = useURLPosition();
    const { createCity, isLoading } = useCities();
    const navigate = useNavigate();

    const [isGeoCodeLoading, setIsGeoCodeLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodeError, setGeoCodeError] = useState('');
  const [emoji, setEmoji] = useState('');

    useEffect(() => {
        if(!lat && !lng) return;
        async function fetchCity() {
            try {
                setIsGeoCodeLoading(true);
                setGeoCodeError("");
                
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();

                if(!data.countryCode) throw new Error( "That doesn't seem to be a city. Click somewhere else 😉")
                
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
                
            } catch (e) {
                setGeoCodeError(e.message);
            } finally {
                setIsGeoCodeLoading(false);
            }
        }
        fetchCity();
    }, [lat, lng]);

    async function handleCitySubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };

        await createCity(newCity);
        navigate("/app/cities");
    }
    
    if(isGeoCodeLoading) return <Spinner />
    if(!lat && !lng) return <Message message="Start by clicking on the map"/>
    if(geoCodeError) return <Message message={geoCodeError}/>
    
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleCitySubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span> 
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
          <DatePicker onChange={(date) => setDate(date)} selected={date} id="date" dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
