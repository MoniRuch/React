import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import ButtonBack from "./ButtonBack.jsx";
import useURLPosition from "../hooks/useURLPosition.js";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx"; 

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

    const [isGeoCodeLoading, setIsGeoCodeLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodeError, setGeoCodeError] = useState('');
  const [emoji, setEmoji] = useState('');

    useEffect(() => {
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
    
    if(isGeoCodeLoading) return <Spinner />
    if(geoCodeError) return <Message message={geoCodeError}/>
    
  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
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
