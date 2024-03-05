import { useState, useEffect } from "react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productimage: "",
    price: "",
    stock: "",
    category: "",
    // owner: "Mohit",
  });
  const [categorydata, setcategorydata] = useState([]);

  const { name, description, productimage, price, stock, category } = formData;

  const onchange = (e) => {
    if (e.target.type === "file") {
      // If the target is a file input
      setFormData({ ...formData, productimage: e.target.files[0] });
    } else {
      // For other input types (text inputs, etc.)
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getCategory"
        );
        setcategorydata(response.data.data);
      } catch (error) {
        console.log("error in fetching Data", error);
      }
    };
    fetchCategory();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", productimage);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dr1orjiil/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: "ml_default",
          },
        }
      );

      if (response && response.data && response.data.public_id) {
        const imageUrl = response.data.secure_url; // Use secure_url provided by Cloudinary
        // console.log("Uploaded image URL: ", imageUrl);
        // console.log("Response: ", response);
        // console.log("Response.data: ", response.data);
        // console.log("Response.data.public_id: ", response.data.public_id);
        // Add imageUrl to formData
        const newData = {
          productimage: imageUrl,
          name,
          description,
          price,
          stock,
          category,
        };

        await axios.post("http://localhost:3000/api/items", newData);
        alert("Item submitted successfully");
        // Clear form fields after submission if needed
        document.getElementById("productimage").value = "";
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
        });
      } else {
        console.error("Error uploading image:", response);
        alert("Error uploading image");
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server Error");
    }
  };

  return (
    <>
      <div className="card" style={{ width: "35rem" }}>
        <div className="card-body">
          <h3 className="h3-style">Item Form</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Name"
                id="name"
                name="name"
                value={name}
                onChange={onchange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We ll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={description}
                onChange={onchange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                className="form-control"
                id="productimage"
                name="productimage"
                onChange={onchange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                placeholder="Enter Price"
                value={price}
                onChange={onchange}
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="text"
                className="form-control"
                id="stock"
                name="stock"
                placeholder="Enter Stock"
                value={stock}
                onChange={onchange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control mb-2"
                id="category"
                name="category"
                value={category}
                onChange={onchange}
              >
                <option value="">Select category</option>
                {categorydata.length > 0 &&
                  categorydata.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>Owner</label>
            </div>
            <div className="form-check form-check-inline mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="owner"
                id="exampleRadios1"
                value="Mohit"
                // checked={owner === "Mohit"}
                // onChange={onchange}
              />
              <label className="form-check-label">Mohit</label>
            </div>
            <div className="form-check form-check-inline mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="owner"
                id="exampleRadios2"
                value="Suresh"
                // checked={owner === "Suresh"}
                // onChange={onchange}
              />
              <label className="form-check-label">Suresh</label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label">Check me out</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Registration;
