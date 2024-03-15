import { Link } from "react-router-dom";
const WelcomePage = () => {
  return (
    <>
      <div>Welcome To Shopping</div>
      <p>
        <Link to="/login" className="link-underline-secondary">
          Login
        </Link>
      </p>
      <p>
        <Link to="/Registration" className="link-underline-secondary">
          Item Registration
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
      <p>
        <Link to="UserRegistration" className="link-underline-secondary">
          User Registration
        </Link>
      </p>
    </>
  );
};

export default WelcomePage;
