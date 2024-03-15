import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./registration.jsx";
import CategoryPage from "./categoryPage.jsx";
import WelcomePage from "./welcome.jsx";
import DisplayData from "./displayData.jsx";
import LoginPage from "./login.jsx";
import UserRegistration from "./userRegistration.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/Category" element={<CategoryPage />}></Route>
        <Route path="/Display" element={<DisplayData />}></Route>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/UserRegistration" element={<UserRegistration />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
