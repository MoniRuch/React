import {createContext, useContext, useEffect, useState} from "react";

const BASE_URL = "http://localhost:8000/cities"

const CitiesContext = createContext(null);

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities(){
            try {
                setIsLoading(true);
                const res = await fetch(BASE_URL);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                throw new Error(e.message);
            } finally {
                setIsLoading(false)
            }
        }
        fetchCities();
    }, [])
    
    
    async function getCity(id){
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        }catch (e) {
            throw new Error(e.message);
        }finally {
            setIsLoading(false);
        }
    }
    
    return <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity}}>
        {children}
    </CitiesContext.Provider>
}

function useCities() {
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error('useCities is being used outside of CitiesProvider');
    return context;
}

export {CitiesProvider, useCities}