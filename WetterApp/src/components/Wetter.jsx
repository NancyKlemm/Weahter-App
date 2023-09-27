import {
    faWind,
    faUmbrella,
    faTemperatureArrowUp,
    faTemperatureArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ContextWetter } from "../context/ContextProvider";

const Wetter = () => {
    const { isError,wetterDataTag} = useContext(ContextWetter);
    return (
        <div className="wetterdisplay2">
            { !isError ? (
                <>
                    <p>
                        <FontAwesomeIcon icon={faWind} />{" "}
                        {wetterDataTag.list[0].wind.speed} km/h
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faUmbrella} />{" "}
                        {wetterDataTag.list[0].main.humidity} %
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faTemperatureArrowUp} />{" "}
                        {wetterDataTag.list[0].main.temp_max.toFixed(0)} °C
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faTemperatureArrowDown} />{" "}
                        {wetterDataTag.list[0].main.temp_min.toFixed(0)} °C
                    </p>
                </>
            ) : (
                <p>Ort ist nicht bekannt</p>
            )}
        </div>
    );
};

export default Wetter;
