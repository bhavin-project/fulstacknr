import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./registration.jsx";
import CategoryPage from "./categoryPage.jsx";
import WelcomePage from "./welcome.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/Category" element={<CategoryPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;