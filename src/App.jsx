import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import FiveDayWeatherPreview from "./components/FiveDayWeatherPreview";
import Header from "./components/Header";
import Weather from "./components/Weather";
import Footer from "./components/Footer";
import ContextProvider from "./context/ContextProvider";
import Input from "./components/Input";
function App() {
    return (
        <div className="container">
            <Header />

            <ContextProvider>
                <Input />
                <CurrentWeather />
                <Weather />
                <FiveDayWeatherPreview />
            </ContextProvider>
            <Footer />
        </div>
    );
}

export default App;
