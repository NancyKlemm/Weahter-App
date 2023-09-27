import "./App.css";
import AktuellesWetter from "./components/AktuellesWetter";
import FuenfTagesVorschau from "./components/FuenfTagesVorschau";
import Header from "./components/Header";
import Wetter from "./components/Wetter";
import Footer from "./components/Footer";
import ContextProvider from "./context/ContextProvider";
import Input from "./components/Input";
function App() {
    return (
        <div className="container">
            <Header />

            <ContextProvider>
                <Input />
                <AktuellesWetter />
                <Wetter />
                <FuenfTagesVorschau />
            </ContextProvider>
            <Footer />
        </div>
    );
}

export default App;
