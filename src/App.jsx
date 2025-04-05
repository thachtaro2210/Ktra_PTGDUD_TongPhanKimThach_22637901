import "./App.css";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./Components/Pages/Dashboard";
import Projects from "./Components/Pages/Project";
import Teams from "./Components/Pages/Teams";
import Analytics from "./Components/Pages/Analytics";
import Messages from "./Components/Pages/Messages";
import Integrations from "./Components/Pages/Integrations";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="header">
          <Header />
        </div>

        <div className="menu">
          <Menu />
        </div>

        <div className="content">
          <Routes>
          <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/integrations" element={<Integrations />} />
             
          </Routes>
        </div>

        {/* <div className="footer">
          <Footer />
        </div> */}
      </div>
    </Router>
  );
}

export default App;