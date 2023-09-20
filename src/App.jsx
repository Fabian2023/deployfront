import "./App.css";
import LandingPage from "./Views/LandingPage/LandingPage";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
import Form from "./Views/Form/Form";
import Navbar from "./Components/NavBar/Navbar";
import About from "./Views/About/About";
import FormUser from "./Views/FormUser/FormUser";

import Favorites from "./Components/Favorites/Favorites";
import Admin from "./Views/Admin/Admin";
import FormLogin from "./Views/FormLogin/FormLogin";

function App() {
  return (
    <Router>
      <div className="test">
        <Navbar />
        <main className="background">
          <Routes>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/Form" element={<Form />}></Route>
            <Route exact path="/Detail/:idCar" element={<Detail />}></Route>
            <Route exact path="/About" element={<About />}></Route>
            <Route exact path="/registro" element={<FormUser />}></Route>
            <Route exact path="/Favorites" element={<Favorites />}></Route>
            <Route exact path="/Admin" element={<Admin />}></Route>
            <Route exact path="/login" element={<FormLogin />}></Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
