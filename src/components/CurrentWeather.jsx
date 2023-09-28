import { useContext, useEffect, useState } from "react";
import { contextWeather } from "../context/ContextProvider";
import {iconWetter} from '../actions/globalVariable'//icon Funktion
import {
    faLocationDot,
    faSortUp,
    faSun,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CurrentWeather = () => {
    const { language,weatherDataDay, weeklyDaysAr, weeklyDaysDe, weeklyDaysEn,isError } =
        useContext(contextWeather);
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const sunriseDate = new Date(sunrise * 1000);// rechnung von Millisekunden von SonnenAufgang Unix-Zeitstempel-Format
    const sunsetDate = new Date(sunset * 1000);// rechnung von Millisekunden von Sonnenuntergang
    //Bearbeitung die Tage in verschiedene Sprachen
    const weekdayDe =
        language === "de"
            ? weeklyDaysDe[sunriseDate.getDay()]
            : language === "en"
            ? weeklyDaysEn[sunriseDate.getDay()]
            : weeklyDaysAr[sunriseDate.getDay()];
    // Sonnen-Zeiten 
    function sunTime() {
        setSunrise(weatherDataDay.city.sunrise);
        setSunset(weatherDataDay.city.sunset);
    }
    useEffect(() => {
        sunTime();
    }, [sunrise]);


    return (
        <div className="display">
            
            {/* isError**  wenn keine data vorhanden ist  */}
            {!isError ? (
                <>
                    <div className="wetterdisplay">
                        <p>
                            {/* Tag und Datum  */}
                            {weekdayDe}{" "}
                            {sunriseDate
                                .toLocaleDateString("de-DE")
                                .slice(0, 5)}
                        </p>
                        <p className="gebiet">
                            <FontAwesomeIcon icon={faLocationDot} />{" "}
                            {weatherDataDay.city.name}
                        </p>
                        <p className="temperatur">
                            {" "}
                            {weatherDataDay.list[0].main.temp.toFixed()}
                            <span> °C</span>
                        </p>
                        <span>
                            {" "}
                            <img
                                className="img_tags_schau"
                                src={`${iconWetter(weatherDataDay.list[0]?.weather[0].icon)}`}
                                // iconWetter ist ein Function der den link von Icon ändert
                            />
                        </span>
                        <p className="wetter">
                            {" "}
                            {weatherDataDay.list[0].weather[0].description}
                        </p>
                    </div>
                    <div className="sonne">
                        {sunriseDate.toLocaleTimeString()}{" "}
                        <FontAwesomeIcon icon={faSortUp} className="fa-2xs" />{" "}
                        <FontAwesomeIcon icon={faSun} />{" "}
                        <FontAwesomeIcon icon={faSortDown} className="fa-2xs" />{" "}
                        {sunsetDate.toLocaleTimeString()}
                    </div>
                </>
            ) : (
               <p>location ist nicht bekannt</p>
            )}
        </div>
    );
};
export default CurrentWeather;
