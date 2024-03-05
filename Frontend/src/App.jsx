import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./registration.jsx";
import CategoryPage from "./categoryPage.jsx";
import WelcomePage from "./welcome.jsx";
import DisplayData from "./displayData.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/Category" element={<CategoryPage />}></Route>
        <Route path="/Display" element={<DisplayData />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
