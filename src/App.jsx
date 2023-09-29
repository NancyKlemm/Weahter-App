import CurrentWeather from "./components/CurrentWeather";
import FiveDayWeatherPreview from "./components/FiveDayWeatherPreview";
import Header from "./components/Header";
import WeatherInfo from "./components/WeatherInfo";
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
                <WeatherInfo />
                <FiveDayWeatherPreview />
            </ContextProvider>
            <Footer />
        </div>
    );
}

export default App;
