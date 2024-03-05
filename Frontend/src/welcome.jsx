import { Link } from "react-router-dom";
const WelcomePage = () => {
  return (
    <>
      <div>Welcome To Shopping</div>
      <p>
        <Link to="/Registration" className="link-underline-secondary">
          Registration
        </Link>
      </p>
      <p>
        <Link to="Category" className="link-underline-secondary">
          CategoryPage
        </Link>
      </p>
      <p>
        <Link to="Display" className="link-underline-secondary">
          Display Data
        </Link>
      </p>
    </>
  );
};

export default WelcomePage;
