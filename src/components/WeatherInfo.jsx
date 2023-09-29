import {
    faWind,
    faUmbrella,
    faTemperatureArrowUp,
    faTemperatureArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { contextWeather } from "../context/ContextProvider";

const WeatherInfo = () => {
    const { isError, weatherDataDay } = useContext(contextWeather);
    return (
        <div className="weather-info">
            {!isError ? (
                <>
                    <p>
                        <FontAwesomeIcon icon={faWind} />{" "}
                        {weatherDataDay.list[0].wind.speed} km/h
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faUmbrella} />{" "}
                        {weatherDataDay.list[0].main.humidity} %
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faTemperatureArrowUp} />{" "}
                        {weatherDataDay.list[0].main.temp_max.toFixed(0)} °C
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faTemperatureArrowDown} />{" "}
                        {weatherDataDay.list[0].main.temp_min.toFixed(0)} °C
                    </p>
                </>
            ) : (
                <p>location is unknown</p>
            )}
        </div>
    );
};

export default WeatherInfo;
