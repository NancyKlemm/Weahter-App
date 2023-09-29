import { useContext, useEffect, useState } from "react";
import { contextWeather } from "../context/ContextProvider";
import { iconWetter } from "../actions/globalVariable"; //icon Funktion
import {
    faLocationDot,
    faSortUp,
    faSun,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CurrentWeather = () => {
    const {
        language,
        weatherDataDay,
        weeklyDaysAr,
        weeklyDaysDe,
        weeklyDaysEn,
        isError,
    } = useContext(contextWeather);
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const sunriseDate = new Date(sunrise * 1000); // Rechnung von Millisekunden von SonnenAufgang Unix-Zeitstempel-Format
    const sunsetDate = new Date(sunset * 1000); // Rechnung von Millisekunden von Sonnenuntergang
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
        <>
            {/* isError**  wenn keine data vorhanden ist  */}
            {!isError ? (
                <>
                    <div className="main-weather-display display">
                        <p className="date">
                            {/* Tag und Datum  */}
                            {weekdayDe}{" "}
                            {sunriseDate
                                .toLocaleDateString("de-DE")
                                .slice(0, 5)}
                        </p>
                        <p className="location">
                            <FontAwesomeIcon icon={faLocationDot} />{" "}
                            {weatherDataDay.city.name}
                        </p>
                        <p className="temperature">
                            {" "}
                            {weatherDataDay.list[0].main.temp.toFixed()}
                            <span> °C</span>
                        </p>
                        <span>
                            {" "}
                            <img
                                className="main-weather-image"
                                src={`${iconWetter(
                                    weatherDataDay.list[0]?.weather[0].icon
                                )}`}
                                // iconWetter ist eine Function der den link von Icon ändert
                            />
                        </span>
                    </div>
                    <section className="main-weather-display-info display">
                        <p className="main-weather">
                            {" "}
                            {weatherDataDay.list[0].weather[0].description}
                        </p>

                        <div className="suntime">
                            {sunriseDate.toLocaleTimeString()}{" "}
                            <FontAwesomeIcon
                                icon={faSortUp}
                                className="fa-2xs"
                            />{" "}
                            <FontAwesomeIcon icon={faSun} />{" "}
                            <FontAwesomeIcon
                                icon={faSortDown}
                                className="fa-2xs"
                            />{" "}
                            {sunsetDate.toLocaleTimeString()}
                        </div>
                    </section>
                </>
            ) : (
                <p>location is unknown</p>
            )}
        </>
    );
};
export default CurrentWeather;
