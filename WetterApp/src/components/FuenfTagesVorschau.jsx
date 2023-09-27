import { useContext } from "react";
import { ContextWetter } from "../context/ContextProvider";
const FuenfTagesVorschau = () => {
    const {iconWetter, wetterDataTag, sprache, wochenTageAr, wochenTageDe, wochenTageEn } =
        useContext(ContextWetter);
    
    console.log(wetterDataTag);
    
    const filteredWetterData = wetterDataTag?.list
        .slice(0, 42)
        .filter((_, index) => index % 8 === 0);
    const getDayOfWeek = (dateString) => {

        // die Tage werden mit sprituperetur aus gebackt da die von anderen data kommen 
        const daysOfWeek =
            sprache === "en"
                ? [...wochenTageEn]
                : sprache === "de"
                ? [...wochenTageDe]
                : [...wochenTageAr];
        const date = new Date(dateString);
        return daysOfWeek[date.getDay()];
    };
    return (
        <div className="fuenftageslink display">
            <div className="wetterdata-countener">
                {filteredWetterData?.map((wetterData, index) => (
                    <div key={index} className="wetterdata">
                        <div className="wetterdata-item">
                            <p>{getDayOfWeek(wetterData.dt_txt)}</p>
                        </div>
                        <img
                            className="img_fuenf_tage"
                            src={`${iconWetter(wetterData.weather[0].icon)}`}
                            
                        />
                        <div className="wetterdata-item">
                            <p>{wetterData.main.temp.toFixed()} °C</p>
                        </div>
                        <div className="wetterdata-item">
                            <p className="fuenf">{wetterData.weather[0].description}</p>
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
export default FuenfTagesVorschau;
