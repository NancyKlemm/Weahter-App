import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { iconWetter,weeklyDaysAr,
    weeklyDaysDe,
    weeklyDaysEn, } from './../actions/globalVariable'

export const contextWeather = React.createContext();
// eslint-disable-next-line react/prop-types
function ContextProvider({ children }) {
    const [isError, setError] = useState(false);
    const [weatherDataDay, setWetterDataTag] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [language, setLanguage] = useState("de");
    const [location, setLocation] = useState("Berlin");
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=${language}&appid=33a793b29df1394a38e1a1b8c9bc0eda&units=metric`;

   
    const fetchData = useCallback(
        async function fetchWetter() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setIsLoading(false);
                setError(false);
              
                //Wenn die Daten nicht geladen werden können,
                // wird ein Objekt zurückgegeben, das den Code 404 enthält
                if (data.cod !== "404") {
                    setWetterDataTag(data);
                    setIsLoading(false);
                } else {
                    // Error-Funktion zum Überspringen des nächsten Fetch
                    throw new Error();
                }
               
            } catch (error) {
                setError(true);
                console.error(error, "location ist nicht bekannt");
            }
        },
        [url]
    );
// Update der Ergebnisse alle 30 Minuten und bei Änderung des Links.
    useEffect(() => {
        const updateFunction = () => {
            fetchData()
        }
        fetchData()
       // Callback, Zeit wird in Millisekunden berechnet
       // setInterval - JavaScript-Funktion 
       //zum periodischen Ausführen von asynchronen
       // Funktionen zu bestimmten Zeiten
        const interval = setInterval(updateFunction, 30 * 60 * 1000);
        //Zurücksetzen der Interval-Funktion
        return () => clearInterval(interval);
    }, [fetchData]);


//Loding Spinner
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <contextWeather.Provider
            value={{
                setLocation,
                setLanguage,
                iconWetter,
                weeklyDaysAr,
                weeklyDaysDe,
                weeklyDaysEn,
                weatherDataDay,
                isLoading,
                location,
                language,
                isError,
            }}
        >
            {children}
        </contextWeather.Provider>
    );
}

export default ContextProvider;
