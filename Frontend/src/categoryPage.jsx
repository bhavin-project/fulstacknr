import axios from "axios";
import { useRef } from "react";

const CategoryPage = () => {
  const inputref = useRef(null);
  const handleClick = async () => {
    let value = inputref.current.value;
    console.log(value);
    const response = await axios.post("http://localhost:3000/api/setCategory", {
      name: value,
    });
    alert("Item saved successfully");
    console.log("Response:", response.data.data.name);
  };
  return (
    <div className="card" style={{ width: "35rem" }}>
      <div className="card-body">
        <h5 className="card-title">Category Page</h5>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            ref={inputref}
            aria-describedby="emailHelp"
            placeholder="Enter Category"
          />
          <div id="emailHelp" className="form-text">
            Enroll category in database
          </div>
          <div className="text-center">
            <button
              type="button"
              id="submitbtn"
              className="btn btn-success"
              onClick={handleClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
