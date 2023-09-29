import { useContext } from "react";
import { contextWeather } from "../context/ContextProvider";
const FiveDayWeatherPreview = () => {
    const {
        iconWetter,
        weatherDataDay,
        language,
        weeklyDaysAr,
        weeklyDaysDe,
        weeklyDaysEn,
    } = useContext(contextWeather);

    console.log(weatherDataDay);

    const filteredWetterData = weatherDataDay?.list
        .slice(0, 42)
        .filter((_, index) => index % 8 === 0);
    const getDayOfWeek = (dateString) => {
        // die Tage werden mit Spread Operator ausgepackt da die von der anderen data kommen
        const daysOfWeek =
            language === "en"
                ? [...weeklyDaysEn]
                : language === "de"
                ? [...weeklyDaysDe]
                : [...weeklyDaysAr];
        const date = new Date(dateString);
        return daysOfWeek[date.getDay()];
    };
    return (
        <div className="display">
            <div className="five-day-weather-section">
                {filteredWetterData?.map((wetterData, index) => (
                    <div key={index} className="wetterdata">
                        <div className="wetterdata-item">
                            <p>{getDayOfWeek(wetterData.dt_txt)}</p>
                        </div>
                        <img
                            className="five-day-weather-image"
                            src={`${iconWetter(wetterData.weather[0].icon)}`}
                        />
                        <div className="wetterdata-item">
                            <p>{wetterData.main.temp.toFixed()} °C</p>
                        </div>
                        <div className="wetterdata-item">
                            <p className="five-day-weather">
                                {wetterData.weather[0].description}
                            </p>
                        </div>
                        <div className="wetterdata-item">
                            <p className="windspeed">
                                {wetterData.wind.speed} km/h
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default FiveDayWeatherPreview;
