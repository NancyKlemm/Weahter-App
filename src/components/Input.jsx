import { useContext, useState } from "react";
import { contextWeather } from "../context/ContextProvider";

function Input() {
    const { language, setLocation, location, setLanguage } =
        useContext(contextWeather);
    const [input, setInput] = useState(location);
    const searchHandler = (event) => {
        event.preventDefault();
        setLocation(input);
    };

    return (
        <div className="search-section">
            <form>
                <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                >
                    <option value="de">DE</option>
                    <option value="en">EN</option>
                    <option value="ar">AR</option>
                </select>

                <input
                    type="text"
                    name="location"
                    id="location"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit" onClick={searchHandler}>
                    Suche
                </button>
            </form>
        </div>
    );
}

export default Input;
