import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import "./App.css";
import Companies from "./components/companies/Companies";
import Residency from "./components/residency/Residency";
import AccordianInterface from "./components/accordianInterface/AccordianInterface";
import Contact from "./components/contact/Contact";
import GetStarted from "./components/getStarted/GetStarted";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <div>
        <div className="">
          <Header />
          <Hero />
        </div>
      </div>
      <Companies />
      <Residency />
      <AccordianInterface />
      <Contact />
      <GetStarted />
      <Footer />
    </div>
  );
}

export default App;
